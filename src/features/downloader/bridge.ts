"use client";

const TOKEN_KEY = "ud_app_token";
const API_BASE_KEY = "ud_api_base";
const CONFIG_PATH = "/ud-config.json";

export interface BridgeConfig {
  apiBase: string;
  token: string;
}

function isLocalHost(host: string): boolean {
  const name = host.split(":")[0]?.toLowerCase() ?? "";
  return name === "127.0.0.1" || name === "localhost";
}

function getServerPort(): number {
  if (typeof window === "undefined") return 3000;
  return Number(window.location.port) || (window.location.protocol === "https:" ? 443 : 80);
}

export function storeToken(token: string): void {
  try {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    // sessionStorage may be unavailable in private contexts.
  }
}

export function getStoredToken(): string | null {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearStoredToken(): void {
  try {
    window.sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore.
  }
}

export function storeApiBase(base: string): void {
  try {
    window.sessionStorage.setItem(API_BASE_KEY, base);
  } catch {
    // Ignore.
  }
}

export function getStoredApiBase(): string | null {
  try {
    return window.sessionStorage.getItem(API_BASE_KEY);
  } catch {
    return null;
  }
}

export function clearStoredApiBase(): void {
  try {
    window.sessionStorage.removeItem(API_BASE_KEY);
  } catch {
    // Ignore.
  }
}

async function fetchConfig(): Promise<BridgeConfig | null> {
  try {
    const response = await fetch(CONFIG_PATH, {
      method: "GET",
      credentials: "same-origin",
    });
    if (!response.ok) return null;
    const data = (await response.json()) as Partial<BridgeConfig>;
    if (
      typeof data.apiBase === "string" &&
      data.apiBase.startsWith("http") &&
      typeof data.token === "string" &&
      data.token.length > 0
    ) {
      return { apiBase: data.apiBase.replace(/\/$/, ""), token: data.token };
    }
    return null;
  } catch {
    return null;
  }
}

function getCandidateBases(): string[] {
  const bases = new Set<string>();
  if (typeof window !== "undefined") {
    bases.add("http://127.0.0.1:8000");
    for (let port = 8000; port <= 8010; port++) {
      bases.add(`http://127.0.0.1:${port}`);
    }
  }
  return Array.from(bases);
}

async function checkHealth(apiBase: string, token: string): Promise<boolean> {
  try {
    const response = await fetch(`${apiBase}/health`, {
      method: "GET",
      headers: { "X-App-Token": token },
      mode: "cors",
      credentials: "omit",
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function validateToken(apiBase: string, token: string): Promise<boolean> {
  try {
    // Use a dummy file UUID; a valid token returns 404, while a missing/invalid token returns 403.
    const response = await fetch(`${apiBase}/api/file/00000000-0000-0000-0000-000000000000`, {
      method: "GET",
      headers: { "X-App-Token": token },
      mode: "cors",
      credentials: "omit",
    });
    return response.status === 404;
  } catch {
    return false;
  }
}

export interface BridgeStatus {
  state: "checking" | "online" | "offline";
  apiBase: string | null;
  token: string | null;
  error: string | null;
}

export async function probeBridge(): Promise<BridgeStatus> {
  // 1. Try the same-origin config endpoint first. It carries the token without putting it in the URL.
  const config = await fetchConfig();
  if (config) {
    storeToken(config.token);
    storeApiBase(config.apiBase);
    const healthy = await checkHealth(config.apiBase, config.token);
    const valid = healthy && (await validateToken(config.apiBase, config.token));
    if (valid) {
      return { state: "online", apiBase: config.apiBase, token: config.token, error: null };
    }
    clearStoredToken();
    clearStoredApiBase();
    return {
      state: "offline",
      apiBase: config.apiBase,
      token: null,
      error: "The bridge returned an invalid token. Restart the local app.",
    };
  }

  // 2. Fall back to a stored token and common local ports.
  const storedToken = getStoredToken();
  if (storedToken) {
    for (const base of getCandidateBases()) {
      const healthy = await checkHealth(base, storedToken);
      if (!healthy) continue;
      const valid = await validateToken(base, storedToken);
      if (valid) {
        storeApiBase(base);
        return { state: "online", apiBase: base, token: storedToken, error: null };
      }
    }
    clearStoredToken();
    clearStoredApiBase();
  }

  return {
    state: "offline",
    apiBase: null,
    token: null,
    error: "Universal Downloader is not running on this machine.",
  };
}

/**
 * Verify the current Host header is served by the local x1t server.
 * The /ud-config.json endpoint already enforces this, but this helper
 * lets the UI reject clearly non-local origins before requesting config.
 */
export function isLocalOrigin(): boolean {
  if (typeof window === "undefined") return false;
  return isLocalHost(window.location.hostname);
}
