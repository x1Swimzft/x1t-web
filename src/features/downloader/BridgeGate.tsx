"use client";

import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, RefreshCw } from "lucide-react";
import { getCopy, RELEASES } from "@/lib/content";
import { probeBridge, type BridgeStatus } from "./bridge";
import DownloaderApp from "./DownloaderApp";
import type { Lang } from "@/lib/theme";

interface BridgeGateProps {
  lang: Lang;
}

export function BridgeGate({ lang }: BridgeGateProps) {
  const copy = getCopy(lang).ud;
  const [status, setStatus] = useState<BridgeStatus>({
    state: "checking",
    apiBase: null,
    token: null,
    error: null,
  });
  const probing = useRef(false);

  async function runProbe() {
    if (probing.current) return;
    probing.current = true;
    setStatus((prev) => ({ ...prev, state: "checking", error: null }));
    const result = await probeBridge();
    setStatus(result);
    probing.current = false;
  }

  useEffect(() => {
    runProbe();

    // Re-check when the window regains focus in case the user started the local app.
    const onFocus = () => runProbe();
    window.addEventListener("focus", onFocus);

    // Re-probe if the app detects an auth failure or the backend went away.
    const onReconnect = () => runProbe();
    window.addEventListener("ud:reconnect", onReconnect);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("ud:reconnect", onReconnect);
    };
  }, []);

  if (status.state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"
            aria-hidden="true"
          />
          <p className="text-[15px] text-[var(--text2)]">{copy.connecting}</p>
        </div>
      </div>
    );
  }

  if (status.state === "offline") {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[var(--r-card)] border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
          <h1 className="h2 text-[18px] font-semibold">{copy.offlineTitle}</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--text2)]">
            {copy.offlineBody}
          </p>
          <p className="mt-2 text-[12px] text-[var(--muted)]">{copy.offlineHelp}</p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={runProbe}
              className="btn btn-primary w-full justify-center"
            >
              <RefreshCw className="h-4 w-4" />
              {copy.retry}
            </button>

            <a
              href={RELEASES.ud.installer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full justify-center"
            >
              <Download className="h-4 w-4" />
              {copy.downloadApp}
            </a>

            <a
              href={status.apiBase ?? "http://127.0.0.1:8000"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full justify-center"
            >
              <ExternalLink className="h-4 w-4" />
              {copy.openLocalApp}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <DownloaderApp />;
}
