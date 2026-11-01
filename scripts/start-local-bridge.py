"""Launch the Universal Downloader local bridge together with the X1T site.

Usage:
    python scripts/start-local-bridge.py
    python scripts/start-local-bridge.py --ud-port 8000 --x1t-port 4173

The script generates a one-off session token, starts the UD backend bound to
127.0.0.1, starts the X1T static server, and opens the browser. Press Ctrl+C
to stop both processes.
"""

from __future__ import annotations

import argparse
import os
import signal
import subprocess
import sys
import time
import urllib.request
from pathlib import Path


def find_backend(root: Path) -> Path | None:
    """Look for the UD backend next to x1t-web."""
    candidates = [
        root.parent / "universal-downloader-web" / "backend",
        root.parent / "universal-downloader" / "backend",
    ]
    for candidate in candidates:
        if (candidate / "run_server.py").is_file():
            return candidate
    return None


def load_dev_token(x1t_root: Path) -> str | None:
    """Read UD_APP_TOKEN from .env.development.local so the bridge matches npm run dev."""
    env_path = x1t_root / ".env.development.local"
    try:
        text = env_path.read_text(encoding="utf-8")
        for line in text.splitlines():
            line = line.strip()
            if line.startswith("#") or not line:
                continue
            if line.startswith("UD_APP_TOKEN="):
                return line.split("=", 1)[1].strip()
    except FileNotFoundError:
        return None
    return None


def wait_for_health(url: str, timeout: float = 30.0) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=1.0) as response:
                if response.status == 200:
                    return True
        except Exception:
            pass
        time.sleep(0.25)
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Start the UD local bridge + X1T site.")
    parser.add_argument("--ud-port", type=int, default=8000)
    parser.add_argument("--x1t-port", type=int, default=4173)
    parser.add_argument(
        "--dev",
        action="store_true",
        help="Start only the UD backend for use with `npm run dev`.",
    )
    args = parser.parse_args()

    x1t_root = Path(__file__).resolve().parent.parent
    backend_root = find_backend(x1t_root)
    if backend_root is None:
        print("Could not find universal-downloader-web/backend. Is the repo beside x1t-web?")
        return 1

    out_dir = x1t_root / "out"
    if not (out_dir / "index.html").is_file():
        print("out/index.html not found. Run `npm run build` first.")
        return 1

    token = load_dev_token(x1t_root)
    if not token:
        print("UD_APP_TOKEN not found in .env.development.local. Generate one with:")
        print("  python -c \"import secrets; print(secrets.token_hex(32))\" >> .env.development.local")
        return 1
    frontend_origin = f"http://127.0.0.1:{args.x1t_port},http://localhost:{args.x1t_port}"
    ud_env = {
        **os.environ,
        "APP_SESSION_TOKEN": token,
        "FRONTEND_ORIGIN": frontend_origin,
        "PYTHONUNBUFFERED": "1",
    }
    python_exe = str(backend_root / ".venv" / "Scripts" / "python.exe")
    if not Path(python_exe).is_file():
        print(f"UD virtual environment not found at {python_exe}")
        return 1

    print(f"Starting UD backend on 127.0.0.1:{args.ud_port} ...")
    ud_proc = subprocess.Popen(
        [python_exe, "run_server.py", "--port", str(args.ud_port)],
        cwd=str(backend_root),
        env=ud_env,
    )

    health_url = f"http://127.0.0.1:{args.ud_port}/health"
    if not wait_for_health(health_url):
        print("UD backend did not start. Check the console output.")
        ud_proc.terminate()
        return 1
    print("UD backend is healthy.")

    if args.dev:
        print(f"UD backend ready for `npm run dev` at http://127.0.0.1:{args.ud_port}/")
        print("Press Ctrl+C to stop.")

        def shutdown_dev(signum, frame):
            print("\nShutting down...")
            ud_proc.terminate()
            try:
                ud_proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                ud_proc.kill()
            sys.exit(0)

        signal.signal(signal.SIGINT, shutdown_dev)
        signal.signal(signal.SIGTERM, shutdown_dev)

        try:
            ud_proc.wait()
        except KeyboardInterrupt:
            shutdown_dev(None, None)
        return 0

    x1t_env = {
        **os.environ,
        "UD_APP_TOKEN": token,
        "UD_API_BASE": f"http://127.0.0.1:{args.ud_port}",
        "X1T_PORT": str(args.x1t_port),
    }
    serve_script = str(x1t_root / "serve.py")
    print(f"Starting X1T site on http://127.0.0.1:{args.x1t_port}/ ...")
    x1t_proc = subprocess.Popen(
        [sys.executable, serve_script, "--port", str(args.x1t_port)],
        cwd=str(x1t_root),
        env=x1t_env,
    )

    url = f"http://127.0.0.1:{args.x1t_port}/"
    print(f"Bridge ready: {url}")
    print("Press Ctrl+C to stop.")

    def shutdown(signum, frame):
        print("\nShutting down...")
        x1t_proc.terminate()
        ud_proc.terminate()
        try:
            x1t_proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            x1t_proc.kill()
        try:
            ud_proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            ud_proc.kill()
        sys.exit(0)

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    try:
        x1t_proc.wait()
    except KeyboardInterrupt:
        shutdown(None, None)

    return 0


if __name__ == "__main__":
    sys.exit(main())
