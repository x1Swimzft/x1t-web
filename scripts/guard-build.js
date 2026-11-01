"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");

function readLines(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  } catch {
    return [];
  }
}

function loadTokens() {
  const tokens = [];
  const envFiles = fs
    .readdirSync(root)
    .filter((name) => /^\.env/.test(name) && name !== ".env.example");

  for (const file of envFiles) {
    for (const line of readLines(path.join(root, file))) {
      const match = line.match(/^\s*(UD_APP_TOKEN|APP_SESSION_TOKEN)\s*=\s*(.+?)\s*$/);
      if (match && match[2]) {
        tokens.push(match[2]);
      }
    }
  }
  return tokens;
}

function scanDir(dir, tokens, relative = "") {
  let found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    const rel = relative ? `${relative}/${name}` : name;
    const full = path.join(dir, name);
    if (entry.isDirectory()) {
      found = found.concat(scanDir(full, tokens, rel));
    } else if (entry.isFile()) {
      const text = fs.readFileSync(full, "utf8");
      for (const token of tokens) {
        if (text.includes(token)) {
          found.push({ file: rel, token: token.slice(0, 8) + "..." });
        }
      }
    }
  }
  return found;
}

function main() {
  const tokens = loadTokens();
  if (!fs.existsSync(outDir)) {
    console.log("guard-build: out/ does not exist yet; nothing to scan.");
    process.exit(0);
  }

  const leaks = scanDir(outDir, tokens);
  if (leaks.length > 0) {
    console.error("guard-build: token leak detected in out/");
    for (const leak of leaks) {
      console.error(`  - ${leak.file} (token prefix ${leak.token})`);
    }
    process.exit(1);
  }

  console.log("guard-build: no tokens found in out/.");
  process.exit(0);
}

main();
