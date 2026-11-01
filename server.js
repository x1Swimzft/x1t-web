"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = Number(process.env.PORT || "3000");
const app = next({ dev });
const handle = app.getRequestHandler();

const TOKEN = process.env.UD_APP_TOKEN || loadDevToken();
const UD_API_BASE = process.env.UD_API_BASE || "http://127.0.0.1:8000";

function loadDevToken() {
  if (!dev) return "";
  const envPath = path.join(__dirname, ".env.development.local");
  try {
    const text = fs.readFileSync(envPath, "utf8");
    const match = text.match(/^UD_APP_TOKEN\s*=\s*(.+)$/m);
    return match ? match[1].trim() : "";
  } catch {
    return "";
  }
}

function isLocalHost(host) {
  const name = (host.split(":")[0] || "").toLowerCase();
  return name === "127.0.0.1" || name === "localhost";
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  // Intentionally no Access-Control-Allow-Origin header.
  res.end(body);
}

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    if (req.url === "/ud-config.json") {
      const host = req.headers.host || "";
      if (!isLocalHost(host)) {
        sendJson(res, 403, { detail: "Forbidden" });
        return;
      }
      const portPart = host.split(":")[1];
      if (portPart && Number(portPart) !== port) {
        sendJson(res, 403, { detail: "Forbidden" });
        return;
      }
      if (!TOKEN) {
        sendJson(res, 503, { detail: "UD_APP_TOKEN is not configured" });
        return;
      }
      sendJson(res, 200, { apiBase: UD_API_BASE, token: TOKEN });
      return;
    }

    handle(req, res);
  });

  server.listen(port, "127.0.0.1", (err) => {
    if (err) throw err;
    console.log(`> Ready on http://127.0.0.1:${port}`);
  });
});
