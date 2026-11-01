# X1T Web

Marketing site for **FPS Patcher Studio** and **Universal Downloader**.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3. The site is a
single static page with Thai/English copy and five accent presets. The hero uses
the canvas `SonarGrid` component.

## Open the built site

Double-click **`start-site.bat`**. It serves `out/` on a free local port and
opens the browser automatically. Close the console window (or press `Ctrl+C`)
to stop it.

Manual option:

```powershell
python -m http.server 4180 --directory out
```

Then open http://localhost:4180.

## Develop

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

```powershell
npm run typecheck
npm run build
```

`npm run build` writes the static site to `out/`. Serve it with any static host:

```powershell
python -m http.server 4173 --directory out
```

## Production URL

Set `NEXT_PUBLIC_SITE_URL` before building so Open Graph and Twitter image URLs
resolve absolutely:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://your-domain.com"
npm run build
```

Without it, Next falls back to `http://localhost:3000` for metadata only.

## Content rules

- Only claims from the two repositories' README/docs.
- `v1.0.0` for both apps.
- Builds are unsigned. The downloads section says so and publishes the real
  SHA-256 values.
- No fake reviews, API snippets, benchmark numbers, or "guaranteed bypass"
  claims.
- FPS Patcher does not create new frames; platform ingest behavior varies.
- Universal Downloader does not bypass DRM; login-gated links may need cookies.

## Screenshots

FPS Patcher Studio (v1.0.0, Crimson Gamer, dark, English):

```powershell
cd ..\fps-patcher-studio
uv run python tools/capture_qt_screens.py --scale 1.0
```

Copy from `images/after-qt/`:

- `crimson-gamer-dark-en-100-main-queue.png` → `public/shots/fps/queue.png`
- `crimson-gamer-dark-en-100-settings.png` → `public/shots/fps/settings.png`
- `crimson-gamer-dark-en-100-main.png` → `public/shots/fps/main.png`

Universal Downloader:

```powershell
cd ..\universal-downloader
.\launch.bat
```

Capture the Download and Settings views at 1440×840, then crop the bottom 60 px
to remove the app's version label before saving to `public/shots/ud/`.

## Deploy

The site is a static export. Deploy `out/` to Vercel, Netlify, Cloudflare Pages,
or GitHub Pages. If you use a subpath on GitHub Pages, add `basePath` to
`next.config.mjs`.
