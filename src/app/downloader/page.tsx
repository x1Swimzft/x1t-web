"use client";

import { useEffect, useState } from "react";
import { BridgeGate } from "@/features/downloader/BridgeGate";
import type { Lang } from "@/lib/theme";

export default function DownloaderPage() {
  const [lang, setLang] = useState<Lang>("th");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedLang = window.localStorage.getItem("x1t-lang");
      if (savedLang === "en" || savedLang === "th") {
        setLang(savedLang);
      }
    } catch {
      // localStorage can be unavailable in private contexts.
    }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"
          aria-hidden="true"
        />
      </div>
    );
  }

  return <BridgeGate lang={lang} />;
}
