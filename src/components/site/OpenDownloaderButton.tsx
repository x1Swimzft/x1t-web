"use client";

import { ExternalLink } from "lucide-react";
import { getCopy } from "@/lib/content";
import type { Lang } from "@/lib/theme";

interface OpenDownloaderButtonProps {
  lang: Lang;
  size?: "md" | "sm";
}

export function OpenDownloaderButton({ lang, size = "md" }: OpenDownloaderButtonProps) {
  const copy = getCopy(lang).ud;

  function openPopup() {
    const url = "/downloader/";

    // Small screens get a normal tab so the UI is usable.
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      window.open(url, "_blank");
      return;
    }

    const width = 1280;
    const height = 860;
    const left = Math.max(0, Math.round((window.screen.availWidth - width) / 2));
    const top = Math.max(0, Math.round((window.screen.availHeight - height) / 2));
    const features = [
      "popup=yes",
      `width=${width}`,
      `height=${height}`,
      `top=${top}`,
      `left=${left}`,
      "resizable=yes",
      "scrollbars=yes",
    ].join(",");

    const popup = window.open(url, "ud-web", features);

    if (!popup) {
      // Popup was blocked; fall back to a tab.
      const tab = window.open(url, "_blank");
      if (!tab) {
        window.location.assign(url);
      }
      return;
    }

    // Detach the opener so the marketing page cannot be navigated by the popup.
    try {
      popup.opener = null;
    } catch {
      // Ignore cross-origin restrictions if any.
    }
  }

  const isSmall = size === "sm";

  return (
    <button
      type="button"
      onClick={openPopup}
      className={
        isSmall
          ? "btn btn-ghost btn-sm"
          : "btn btn-ghost shrink-0"
      }
      aria-label={copy.openWebApp}
      title={copy.webAppHint}
    >
      <ExternalLink className={isSmall ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {copy.openWebApp}
    </button>
  );
}
