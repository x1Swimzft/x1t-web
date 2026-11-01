import React from "react";
import { QueueItem } from "../api";

export interface DownloadCardProps {
  item: QueueItem;
  onCancel: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onRetry: (id: string) => void;
  onDownload?: (item: QueueItem) => void;
}

const ERROR_HINTS: Record<string, string> = {
  AUTH_403: "403 Forbidden - this link may need a signed-in session.",
  COOKIE_REQUIRED: "Sign-in required - this link needs a signed-in session.",
  RATE_LIMIT: "Rate limited by the site - wait a moment, then retry.",
  NETWORK_TRANSIENT: "Network problem - check your connection, then retry.",
  UNSUPPORTED_URL: "This link is unsupported or the media is unavailable.",
  LINK_EXPIRED: "This link has expired - request a fresh link and try again.",
  PLATFORM_CHANGED: "The site changed its page - update the app, then retry.",
};

export function DownloadCard({
  item,
  onCancel,
  onPause,
  onResume,
  onRetry,
  onDownload,
}: DownloadCardProps) {
  const isDone = item.status === "completed" || item.status === "done";
  const isActive = item.status === "queued" || item.status === "downloading";
  const isPaused = item.status === "paused";
  const isDownloading = item.status === "downloading";
  const qualityLabel = (() => {
    if (item.format === "m4a") return "M4A";
    if (item.format === "opus") return "OPUS";
    if (item.format === "mp3") {
      return item.quality ? `MP3 ${item.quality.replace(/k$/i, "")}k` : "MP3 320k";
    }
    if (!item.quality) return "";
    return `${item.quality.replace(/p$/i, "")}p`;
  })();
  const progressPercent = Math.min(100, Math.max(0, item.progress));
  const label = item.title || item.url;
  const errorText =
    (item.error_code && ERROR_HINTS[item.error_code]) || item.error || "Failed";

  const statusText = isDone
    ? "Saved"
    : isPaused
      ? "Paused"
      : item.status === "error"
        ? errorText
        : item.status === "queued"
          ? "Queued"
          : `${qualityLabel ? `${qualityLabel} · ` : ""}${(item.speed || 0).toFixed(1)} MB/s`;

  const statusClass = item.status === "error" ? "bad" : isPaused ? "warn" : "";

  return (
    <div
      className={`qrow ${isDone ? "done" : ""} ${isActive ? "active" : ""} ${isPaused ? "paused" : ""}`}
    >
      <div className="qline">
        <span className="chip">{item.platform || "Web"}</span>
        <span className="qtitle" title={label}>
          {label}
        </span>
        <span className="qpct">
          {isDone ? "100%" : item.status === "error" ? "—" : `${Math.round(item.progress)}%`}
        </span>
        <div className="qactions">
          {isDownloading && (
            <button
              type="button"
              className="chip"
              onClick={() => onPause(item.id)}
              aria-label={`Pause ${label}`}
            >
              Pause
            </button>
          )}
          {isPaused && (
            <button
              type="button"
              className="chip"
              onClick={() => onResume(item.id)}
              aria-label={`Resume ${label}`}
            >
              Resume
            </button>
          )}
          {item.status === "error" && (
            <button
              type="button"
              className="chip"
              onClick={() => onRetry(item.id)}
              aria-label={`Retry ${label}`}
            >
              Retry
            </button>
          )}
          {isDone && onDownload && (
            <button
              type="button"
              className="chip"
              onClick={() => onDownload(item)}
              aria-label={`Download ${label}`}
            >
              Download
            </button>
          )}
          <button
            type="button"
            className="chip"
            onClick={() => onCancel(item.id)}
            aria-label={isDone ? `Clear ${label} from queue` : `Remove ${label} from queue`}
          >
            {isDone ? "Done" : "Remove"}
          </button>
        </div>
      </div>

      <div className="qline">
        <div
          className="pg"
          role="progressbar"
          aria-label={`${label} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPercent)}
        >
          <i style={{ transform: `scaleX(${progressPercent / 100})` }} />
        </div>
        <span className={`qmeta ${statusClass}`} title={statusText}>
          {statusText}
        </span>
      </div>
    </div>
  );
}
