"use client";

export type DownloadFormat = "mp4" | "mp3" | "m4a" | "opus" | "images";

export interface DownloadOptions {
  startTime?: string;
  endTime?: string;
  preset?: string;
  socialBypass?: boolean;
  artist?: string;
  album?: string;
  trackNumber?: number;
  playlistTitle?: string;
  searchQuery?: string;
  thumbnail?: string;
  saveInSubfolder?: boolean;
}

export interface FormatOption {
  format_id: string;
  ext: string;
  resolution?: string;
  filesize?: number;
  note?: string;
}

export interface PreviewEntry {
  url: string;
  title: string;
  duration?: number;
  thumbnail?: string;
  platform?: string;
  media_type: string;
  artist?: string;
  album?: string;
  track_number?: number;
  search_query?: string;
}

export interface MediaInfo {
  title: string;
  thumbnail?: string;
  duration?: number;
  uploader?: string;
  platform?: string;
  formats: FormatOption[];
  images?: string[];
  entries?: PreviewEntry[];
  media_type: "video" | "image" | "carousel" | "playlist";
  artist?: string;
  album?: string;
  track_number?: number;
  search_query?: string;
}

export interface QueueItem {
  id: string;
  url: string;
  format: DownloadFormat;
  quality: string;
  title?: string;
  platform?: string;
  status: "queued" | "downloading" | "paused" | "completed" | "done" | "error";
  progress: number;
  speed?: number;
  filename?: string;
  error?: string;
  error_code?: string;
  retry_count?: number;
  start_time?: string;
  end_time?: string;
  preset?: string;
  social_bypass?: boolean;
}

export interface AppSettings {
  autoDetectClipboard: boolean;
  notifyWhenFinished: boolean;
  maxConcurrent: 1 | 2 | 3 | 4 | 5;
  saveFolder: string;
  socialBypass: boolean;
  autoDownloadToBrowser: boolean;
}

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  format: DownloadFormat;
  quality: string;
  label: string;
  platform?: string;
  filename?: string;
  completedAt: number;
  start_time?: string;
  end_time?: string;
  preset?: string;
  social_bypass?: boolean;
  status?: "completed" | "failed";
  error_code?: string;
}

export class ApiRequestError extends Error {
  code?: string;
  action?: string;

  constructor(message: string, code?: string, action?: string) {
    super(message);
    this.name = "ApiRequestError";
    this.code = code;
    this.action = action;
  }
}

function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function getApiBase(): string {
  const fromSession = readSession("ud_api_base");
  if (fromSession) return fromSession.replace(/\/$/, "");
  return "http://127.0.0.1:8000";
}

export function getAppToken(): string {
  return readSession("ud_app_token") || "";
}

function authHeaders(): Record<string, string> {
  const token = getAppToken();
  return token ? { "X-App-Token": token } : {};
}

export function clearBridgeSession(): void {
  try {
    window.sessionStorage.removeItem("ud_app_token");
    window.sessionStorage.removeItem("ud_api_base");
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent("ud:reconnect"));
  } catch {}
}

async function responseError(res: Response, fallback: string): Promise<ApiRequestError> {
  if (res.status === 403) {
    clearBridgeSession();
  }
  const data = await res.json().catch(() => ({}));
  const detail = data?.detail;
  if (detail && typeof detail === "object") {
    return new ApiRequestError(
      typeof detail.message === "string" && detail.message ? detail.message : fallback,
      typeof detail.code === "string" ? detail.code : undefined,
      typeof detail.action === "string" ? detail.action : undefined
    );
  }
  return new ApiRequestError(typeof detail === "string" && detail ? detail : fallback);
}

export async function fetchInfo(url: string): Promise<MediaInfo> {
  const res = await fetch(`${getApiBase()}/api/info`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw await responseError(res, "Failed to fetch info");
  return res.json();
}

export async function previewUrls(
  urls: string[]
): Promise<{ items: PreviewEntry[]; failed?: string[] }> {
  const res = await fetch(`${getApiBase()}/api/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ urls }),
  });
  if (!res.ok) throw await responseError(res, "Failed to preview links");
  return res.json();
}

function downloadPayload(
  url: string,
  format: DownloadFormat,
  quality: string,
  title?: string,
  options?: DownloadOptions
) {
  return {
    url,
    format,
    quality,
    title,
    start_time: options?.startTime || null,
    end_time: options?.endTime || null,
    preset: options?.preset || null,
    social_bypass: Boolean(options?.socialBypass),
    artist: options?.artist || null,
    album: options?.album || null,
    track_number: options?.trackNumber ?? null,
    playlist_title: options?.playlistTitle || null,
    search_query: options?.searchQuery || null,
    thumbnail: options?.thumbnail || null,
    save_in_subfolder: options?.saveInSubfolder ?? true,
  };
}

export async function enqueueDownload(
  url: string,
  format: DownloadFormat,
  quality: string,
  title?: string,
  options?: DownloadOptions
): Promise<{ job_ids: string[]; count: number }> {
  const res = await fetch(`${getApiBase()}/api/queue/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(downloadPayload(url, format, quality, title, options)),
  });
  if (!res.ok) {
    if (res.status === 403) clearBridgeSession();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to add to queue");
  }
  return res.json();
}

export async function cancelQueueItem(jobId: string): Promise<void> {
  const res = await fetch(`${getApiBase()}/api/queue/${encodeURIComponent(jobId)}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    if (res.status === 403) clearBridgeSession();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to cancel download");
  }
}

async function queueLifecycleAction(
  jobId: string,
  action: "pause" | "resume" | "retry",
  fallbackError: string
): Promise<void> {
  const res = await fetch(
    `${getApiBase()}/api/queue/${encodeURIComponent(jobId)}/${action}`,
    { method: "POST", headers: authHeaders() }
  );
  if (!res.ok) {
    if (res.status === 403) clearBridgeSession();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || fallbackError);
  }
}

export async function pauseQueueItem(jobId: string): Promise<void> {
  await queueLifecycleAction(jobId, "pause", "Failed to pause download");
}

export async function resumeQueueItem(jobId: string): Promise<void> {
  await queueLifecycleAction(jobId, "resume", "Failed to resume download");
}

export async function retryQueueItem(jobId: string): Promise<void> {
  await queueLifecycleAction(jobId, "retry", "Failed to retry download");
}

export async function clearFinishedQueue(): Promise<number> {
  const res = await fetch(`${getApiBase()}/api/queue/clear-finished`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) {
    if (res.status === 403) clearBridgeSession();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to clear finished downloads");
  }
  const data = await res.json().catch(() => ({}));
  return typeof data.cleared === "number" ? data.cleared : 0;
}

export async function fetchHistory(): Promise<HistoryItem[]> {
  try {
    const res = await fetch(`${getApiBase()}/api/history`, {
      headers: authHeaders(),
    });
    if (res.status === 403) {
      clearBridgeSession();
      return [];
    }
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const res = await fetch(`${getApiBase()}/api/history/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    if (res.status === 403) clearBridgeSession();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to delete history item");
  }
}

export async function clearHistory(): Promise<number> {
  const res = await fetch(`${getApiBase()}/api/history`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    if (res.status === 403) clearBridgeSession();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to clear history");
  }
  const data = await res.json().catch(() => ({}));
  return typeof data.cleared === "number" ? data.cleared : 0;
}

export function getQueueStreamUrl(): string {
  return `${getApiBase()}/api/queue/stream`;
}

export function createQueueEventSource(): EventSource {
  // EventSource cannot send custom headers. The UD stream endpoint does not
  // enforce the session token, so this is acceptable for local-only use.
  return new EventSource(getQueueStreamUrl());
}

export interface FileDownloadResult {
  jobId: string;
  filename: string;
}

export async function downloadFile(
  jobId: string,
  filename?: string
): Promise<void> {
  const res = await fetch(
    `${getApiBase()}/api/file/${encodeURIComponent(jobId)}`,
    { headers: authHeaders() }
  );
  if (!res.ok) {
    if (res.status === 403) clearBridgeSession();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to download file");
  }

  const blob = await res.blob();
  const suggestedName = filename || "download";

  if (typeof window !== "undefined" && "showSaveFilePicker" in window) {
    try {
      const handle = await (window as unknown as WindowWithFilePicker).showSaveFilePicker!({
        suggestedName,
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch {
      // User cancelled or picker unavailable — fall back to object URL.
    }
  }

  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = suggestedName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

interface WindowWithFilePicker extends Window {
  showSaveFilePicker?: (options?: {
    suggestedName?: string;
    types?: Array<{
      description?: string;
      accept?: Record<string, string[]>;
    }>;
  }) => Promise<{
    createWritable: () => Promise<{
      write: (data: Blob) => Promise<void>;
      close: () => Promise<void>;
    }>;
  }>;
}

export const DEFAULT_FALLBACK_SETTINGS: AppSettings = {
  autoDetectClipboard: false,
  notifyWhenFinished: false,
  maxConcurrent: 3,
  saveFolder: "Downloads\\Universal Downloader",
  socialBypass: false,
  autoDownloadToBrowser: false,
};

const WEB_SETTINGS_STORAGE_KEY = "ud_web_settings_v1";

function readWebSettings(): Partial<AppSettings> {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(WEB_SETTINGS_STORAGE_KEY) || "{}"
    );
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Partial<AppSettings>)
      : {};
  } catch {
    return {};
  }
}

function persistWebSettings(settings: AppSettings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WEB_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}

function settingsFromBackend(data: Record<string, unknown>): Partial<AppSettings> {
  return {
    maxConcurrent: (data.max_concurrent as AppSettings["maxConcurrent"]) || 3,
    saveFolder:
      typeof data.save_folder === "string"
        ? data.save_folder
        : DEFAULT_FALLBACK_SETTINGS.saveFolder,
  };
}

export async function getAppSettings(): Promise<AppSettings> {
  try {
    const res = await fetch(`${getApiBase()}/api/settings`, {
      headers: authHeaders(),
    });
    if (res.ok) {
      const data = (await res.json()) as Record<string, unknown>;
      return {
        ...DEFAULT_FALLBACK_SETTINGS,
        ...readWebSettings(),
        ...settingsFromBackend(data),
      };
    }
  } catch {}
  return { ...DEFAULT_FALLBACK_SETTINGS, ...readWebSettings() };
}

export async function updateAppSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
  const next = { ...(await getAppSettings()), ...patch };
  persistWebSettings(next);
  try {
    const res = await fetch(`${getApiBase()}/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({
        max_concurrent: patch.maxConcurrent,
        social_bypass: patch.socialBypass,
      }),
    });
    if (res.ok) {
      const data = (await res.json()) as Record<string, unknown>;
      const merged = { ...next, ...settingsFromBackend(data) };
      persistWebSettings(merged);
      return merged;
    }
  } catch {}
  return next;
}

export async function openSaveFolder(targetPath?: string): Promise<void> {
  const res = await fetch(`${getApiBase()}/api/open-folder`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ path: targetPath || null }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to open folder");
  }
}
