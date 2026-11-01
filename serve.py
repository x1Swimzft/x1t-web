"""Serve the built X1T site on a fixed local port.

This server also exposes /ud-config.json for the Universal Downloader local
bridge. That endpoint is intentionally same-origin only: it carries the session
token and must never be sent with CORS headers.
"""

from __future__ import annotations

import argparse
import http.server
import os
import webbrowser
from functools import partial
from pathlib import Path

TOKEN = os.environ.get("UD_APP_TOKEN", "")
UD_API_BASE = os.environ.get("UD_API_BASE", "http://127.0.0.1:8000")


class X1THandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, server_port: int, **kwargs):
        self.server_port = server_port
        super().__init__(*args, **kwargs)

    def log_message(self, format: str, *args) -> None:
        # Keep the local server quiet.
        pass

    def _is_local_host(self, host: str) -> bool:
        if not host:
            return False
        host_name = host.split(":")[0].lower()
        return host_name in ("127.0.0.1", "localhost")

    def _send_json(self, status: int, data: dict) -> None:
        body = (__import__("json").dumps(data)).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        # Intentionally no Access-Control-Allow-Origin header.
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        if self.path == "/ud-config.json":
            host = self.headers.get("Host", "")
            if not self._is_local_host(host):
                self._send_json(403, {"detail": "Forbidden"})
                return

            port_part = host.split(":")[1] if ":" in host else ""
            if port_part and int(port_part) != self.server_port:
                self._send_json(403, {"detail": "Forbidden"})
                return

            if not TOKEN:
                self._send_json(503, {"detail": "UD_APP_TOKEN is not configured"})
                return

            self._send_json(200, {"apiBase": UD_API_BASE, "token": TOKEN})
            return

        super().do_GET()


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the built X1T site.")
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.environ.get("X1T_PORT", "4173")),
        help="Port to listen on (default: 4173 or X1T_PORT).",
    )
    args = parser.parse_args()

    root = Path(__file__).resolve().parent / "out"
    if not (root / "index.html").is_file():
        raise SystemExit(
            "out/index.html not found. Run `npm run build` in this folder first."
        )

    handler = partial(
        X1THandler,
        directory=str(root),
        server_port=args.port,
    )
    with http.server.ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        port = server.server_address[1]
        url = f"http://127.0.0.1:{port}/"
        print(f"X1T site: {url}")
        print("Press Ctrl+C to stop.")
        webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
