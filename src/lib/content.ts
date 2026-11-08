import type { Lang } from "./theme";

export const RELEASES = {
  fps: {
    name: "FPS Patcher Studio",
    version: "2.0.4",
    repo: "https://github.com/x1Swimzft/FPS-Patcher-Studio",
    releasePage:
      "https://github.com/x1Swimzft/FPS-Patcher-Studio/releases/tag/v2.0.4",
    installer: {
      file: "FPSPatcherStudio-v2.0.4-Setup.exe",
      url: "https://github.com/x1Swimzft/FPS-Patcher-Studio/releases/download/v2.0.4/FPSPatcherStudio-v2.0.4-Setup.exe",
      size: "84.3 MB",
      bytes: 88_407_137,
      sha: "eb7b487f552b7871f8190ddeedc4f4ff56ea9e8063758e6af10057a45b27f788",
    },
    portable: {
      file: "FPSPatcherStudio-v2.0.4-win64.zip",
      url: "https://github.com/x1Swimzft/FPS-Patcher-Studio/releases/download/v2.0.4/FPSPatcherStudio-v2.0.4-win64.zip",
      size: "117.5 MB",
      bytes: 123_253_698,
      sha: "e9ecad2712c19d1dc7a6e1038d69756e886644c2756de666b24e23b911e7d6a7",
    },
    checksums:
      "https://github.com/x1Swimzft/FPS-Patcher-Studio/releases/download/v2.0.4/FPSPatcherStudio-v2.0.4.sha256",
  },
  ud: {
    name: "Universal Downloader",
    version: "1.0.0",
    repo: "https://github.com/x1Swimzft/universal-downloader",
    releasePage:
      "https://github.com/x1Swimzft/universal-downloader/releases/tag/v1.0.0",
    installer: {
      file: "Universal-Downloader-Setup-1.0.0.exe",
      url: "https://github.com/x1Swimzft/universal-downloader/releases/download/v1.0.0/Universal-Downloader-Setup-1.0.0.exe",
      size: "244 MB",
      bytes: 255_614_296,
      sha: "202EB77E8D00325AE45E7CBBB564FEE8A6A73D3A21E4685FD6AED1EC0BEC8820",
    },
    portable: {
      file: "Universal.Downloader-1.0.0-win.zip",
      url: "https://github.com/x1Swimzft/universal-downloader/releases/download/v1.0.0/Universal.Downloader-1.0.0-win.zip",
      size: "311 MB",
      bytes: 326_074_731,
      sha: "1AE42614DB2A8B55F6502E95E57DD0B7CDB4ADDC1855FA266EED7020169C281F",
    },
    checksums:
      "https://github.com/x1Swimzft/universal-downloader/releases/download/v1.0.0/SHA256SUMS-1.0.0.txt",
  },
} as const;

const en = {
  nav: {
    apps: "Apps",
    fps: "FPS Patcher",
    downloader: "Downloader",
    downloads: "Downloads",
    faq: "FAQ",
    github: "GitHub",
    cta: "Download",
  },
  hero: {
    eyebrow: "FPS v2.0.4 · Downloader v1.0.0 · Windows 10/11",
    title: "X1T",
    subtitle:
      "Two desktop tools for people who care about every frame and every file. Patch MP4/MOV container timing without re-encoding, or build TikTok-ready MPEG-TS with X1T Remux and lossy re-encodes. Pull media from 15 sites into one local queue.",
    primary: "Download for Windows",
    secondary: "Explore the apps",
    trust: "No telemetry · No uploads · MIT source",
  },
  stats: [
    {
      value: "Lossless",
      label: "video remux",
      desc: "X1T Remux copies the H.264 bitstream; the 60fps/1080p presets are clearly marked lossy re-encodes.",
    },
    {
      value: "<30 MB",
      label: "peak memory",
      desc: "8 MB chunked writer on files over 10 GB.",
    },
    {
      value: "15",
      label: "sites",
      desc: "Video, social, and music links in one queue.",
    },
    {
      value: "0",
      label: "telemetry",
      desc: "Files stay on your PC. No accounts, no cloud.",
    },
  ],
  apps: {
    title: "Two tools. One local workflow.",
    lede: "Both apps share the same Obsidian-and-crimson desktop language. Neither sends your media to a server.",
  },
  tools: [
    {
      name: "FPS Patcher Studio",
      tagline: "MP4/MOV timing + TikTok TS presets",
      body: "Rewrite MP4/MOV container headers without touching samples, or produce TikTok-ready MPEG-TS with X1T Remux and lossy H.264/AAC presets.",
      chips: ["X1T Remux", "Auto-update", "CLI"],
      explore: "Explore FPS Patcher",
      download: "Download",
    },
    {
      name: "Universal Downloader",
      tagline: "Every link, downloaded locally",
      body: "A native Windows downloader for video, audio, photos, and carousels. One queue, bundled FFmpeg, no browser tabs.",
      chips: ["15 sites", "Photo mode", "1–5 queue"],
      explore: "Explore Downloader",
      download: "Download",
    },
  ],
  fps: {
    badge: "FPS Patcher Studio · v2.0.4",
    title: "Fix the timing, not the pixels.",
    lede: "FPS Patcher Studio rewrites MP4 and MOV container headers at the atom level without touching samples. For TikTok-style MPEG-TS, X1T Remux copies an existing H.264 bitstream and re-encodes only audio; X1T 60fps and X1T 1080p are lossy re-encodes for AV1/HEVC or arbitrary sources.",
    featuresTitle: "What it does",
    features: [
      {
        title: "Bit-exact by design",
        desc: "MP4/MOV atoms are rewritten; the mdat payload is preserved bit-for-bit. X1T Remux also copies the H.264 bitstream.",
      },
      {
        title: "X1T presets",
        desc: "X1T Remux (default), X1T 60fps and X1T 1080p. Remux preserves the source video; the re-encode presets are lossy.",
      },
      {
        title: "Six-gate verification",
        desc: "MP4/MOV: chunk offsets, sample tables, playback metadata, Rec.709 color, mdat SHA-256 and audio. TS presets check sync, codec, frame rate and duration.",
      },
      {
        title: "Batch queue",
        desc: "Drop multiple clips, override timescale or preset per item, and patch only what you select.",
      },
      {
        title: "System tray and startup",
        desc: "Close the window and keep patching; optionally launch with Windows and start in the tray.",
      },
      {
        title: "Crimson Graphite UI",
        desc: "Four Settings tabs, a hero drop state, and a light mode built alongside dark.",
      },
      {
        title: "Bitrate preview and target",
        desc: "Queue rows and the Inspector show the source and estimated output bitrate. The cap is adjustable from 1 to 24 Mbps.",
      },
      {
        title: "Startup update check",
        desc: "Enabled by default: check GitHub Releases, show notes and ask before downloading. Unsigned builds use SHA-256 verification.",
      },
      {
        title: "Forensic inspector",
        desc: "Inspect the atom tree, color parameters, timescale, FPS, and A/V sync before patching.",
      },
      {
        title: "Headless CLI",
        desc: "patch, probe, and score commands with JSON output and predictable exit codes.",
      },
    ],
    presetsTitle: "X1T presets",
    presetsHint: "Pick a preset. X1T Remux preserves the source H.264 bitstream; X1T 60fps and 1080p re-encode for other sources.",
    presetLabels: {
      target: "Target",
      audio: "Audio",
      container: "Container",
      mobile: "Video",
    },
    gate: "Gate",
    openShot: "Open full size",
    presets: [
      {
        id: "remux",
        name: "X1T Remux",
        badge: "Default",
        target: "Already-H.264 1080p60 source",
        audio: "Re-encoded to AAC 128k, 48 kHz stereo",
        container: "MPEG-TS, .mp4 extension",
        mobile: "Video copied",
        note: "Preserves the source H.264 bitstream; matches the reference video MD5.",
      },
      {
        id: "60fps",
        name: "X1T 60fps",
        badge: "AV1 / HEVC",
        target: "AV1, HEVC, or arbitrary sources",
        audio: "AAC 128k, 48 kHz stereo",
        container: "MPEG-TS, source resolution, 60 fps",
        mobile: "Re-encode",
        note: "Lossy H.264 Main/CAVLC re-encode. Requires Windows Media Foundation.",
      },
      {
        id: "1080p",
        name: "X1T 1080p",
        badge: "1080p60",
        target: "1080p60 deliverables",
        audio: "AAC 128k, 48 kHz stereo",
        container: "MPEG-TS, 1920x1080 letterbox, 60 fps",
        mobile: "Re-encode",
        note: "Lossy H.264 re-encode with letterboxing. Requires Windows Media Foundation.",
      },
    ],
    gatesTitle: "Six gates for MP4/MOV; TS presets use their own check",
    gates: [
      { name: "chunk offsets", desc: "stco / co64 boundaries and faststart layout" },
      { name: "sample tables", desc: "stts / ctts timing validity" },
      { name: "playback metadata", desc: "container structure for AVPlayer and MediaCodec" },
      { name: "color guard", desc: "Rec.709 colr / nclx parameters" },
      { name: "mdat payload", desc: "SHA-256 before and after patching" },
      { name: "audio payload", desc: "priming samples and ghost frames" },
    ],
    cliTitle: "Headless when you need it",
    cliLabel: "Run from PowerShell or cmd",
    cli: 'FPSPatcherStudio.exe --cli patch "clip.mp4" --preset 60 --strategy tiktok-ts-remux --output out --json',
    copy: "Copy command",
    copied: "Copied",
    disclaimer:
      "X1T Remux does not re-encode video; X1T 60fps and X1T 1080p are lossy re-encodes. Container timing does not create new frames, and platform ingest behavior can change without notice. TikTok upload behavior is not guaranteed.",
    shotsTitle: "Inside the app",
    shots: [
      { id: "queue", label: "Batch queue", caption: "Queue with per-item overrides and verification state." },
      { id: "settings", label: "Settings", caption: "Four-tab Settings with Advanced sections for naming, visual, and lossy options." },
      { id: "main", label: "Empty state", caption: "Drop MP4 or MOV files, or add a folder." },
    ],
    cta: "Download FPS Patcher",
  },
  ud: {
    badge: "Universal Downloader · v1.0.0",
    title: "Everything you copy, on your PC.",
    lede: "A native Windows downloader for video, audio, photos, and carousels. One queue, bundled FFmpeg, and no browser tabs or terminal windows.",
    featuresTitle: "What it does",
    features: [
      {
        title: "Clipboard watcher",
        desc: "Copy a media link and the app offers to fetch it.",
      },
      {
        title: "Live queue",
        desc: "SSE progress, speed, pause/resume/retry, and 1–5 concurrent downloads.",
      },
      {
        title: "Bundled pipeline",
        desc: "yt-dlp plus FFmpeg for MP4, MP3, M4A, and OPUS.",
      },
      {
        title: "Photos and carousels",
        desc: "Public Instagram posts and TikTok photo mode, saved as JPGs or a ZIP.",
      },
      {
        title: "Creator workflow",
        desc: "Trim, H.264 edit-ready output, loudness normalization, and drag-out to editors.",
      },
      {
        title: "Cookie import",
        desc: "Bring browser cookies for sign-in-gated links and update yt-dlp in-app.",
      },
    ],
    platformsTitle: "15 supported sites",
    platformsHint: "Public links. No DRM. Login-gated links may need browser cookies.",
    openShot: "Open full size",
    platforms: [
      "YouTube",
      "TikTok",
      "Instagram",
      "Facebook",
      "X / Twitter",
      "Twitch",
      "Kick",
      "Bilibili",
      "Vimeo",
      "Reddit",
      "Pinterest",
      "Spotify",
      "Apple Music",
      "SoundCloud",
      "Bandcamp",
    ],
    shotsTitle: "Inside the app",
    shots: [
      { id: "download", label: "Download", caption: "Paste a link, preview the media, pick a format." },
      { id: "settings", label: "Settings", caption: "Output folders, cookie import, and engine updates." },
    ],
    disclaimer:
      "Universal Downloader does not bypass DRM. Public links only; sign-in-gated links need cookies. You are responsible for complying with each platform's terms and copyright law.",
    cta: "Download Universal Downloader",
    openWebApp: "Open web app",
    webAppHint: "Open the downloader in an in-page window.",
    modalTitle: "Universal Downloader",
    modalBadge: "Local bridge",
    modalClose: "Close",
    openInTab: "Open in new tab",
    connecting: "Connecting to Universal Downloader…",
    offlineTitle: "Universal Downloader is not running",
    offlineBody:
      "Start the local app and make sure the bridge is running, then retry.",
    offlineHelp: "If you just launched it, wait a few seconds and retry.",
    retry: "Retry",
    downloadApp: "Download app",
    openLocalApp: "Open local app",
  },
  downloads: {
    eyebrow: "Official Windows releases",
    title: "Download for Windows.",
    lede: "Windows 10/11 x64. Installer or portable. Both builds are unsigned, so verify the SHA-256 before you run them.",
    unsignedTitle: "Unsigned builds, by design.",
    unsignedBody:
      "Windows SmartScreen may show “Windows protected your PC” on first run. That is expected for unsigned installers. Compare the file hash with the value on this page or the release checksum file before launching.",
    verifyTitle: "Verify before you run",
    verifyBody:
      "Open PowerShell in your Downloads folder, run Get-FileHash, and compare the output with the official hash.",
    installer: "Installer",
    portable: "Portable ZIP",
    size: "Size",
    version: "Version",
    platform: "Platform",
    copyHash: "Copy SHA-256",
    copied: "Copied",
    releaseNotes: "Release notes",
    source: "Source",
    checksums: "Checksums",
    windows: "Windows 10/11 x64",
    free: "Free",
  },
  faq: {
    eyebrow: "Before you install",
    title: "The honest questions.",
    items: [
      {
        q: "Why does Windows warn me before running the installer?",
        a: "The current Windows builds are not Authenticode-signed, so SmartScreen cannot verify the publisher. Check the SHA-256 against the release checksum before you run the file. Signed builds may arrive later.",
      },
      {
        q: "Why does auto-update fail when upgrading from v2.0.1–v2.0.3?",
        a: "Those builds only accept Authenticode-signed installers. The current builds are unsigned, so install v2.0.4 manually once. If the update was already downloaded, run FPSPatcherStudio-v2.0.4-Setup.exe from %TEMP%\\FPSPatcherStudioUpdate. Later updates use the published SHA-256 checksum.",
      },
      {
        q: "Does FPS Patcher re-encode my video?",
        a: "X1T Remux copies an existing H.264 bitstream without re-encoding video. X1T 60fps and X1T 1080p are lossy H.264/AAC re-encodes for AV1/HEVC or arbitrary sources. The legacy X1T presets are container-only patches.",
      },
      {
        q: "Does Universal Downloader bypass DRM?",
        a: "No. It works with public links and can import browser cookies for sign-in-gated content. Spotify and Apple Music links resolve to matching audio through yt-dlp search, not a DRM bypass.",
      },
      {
        q: "Is anything uploaded?",
        a: "Media files are processed or downloaded directly on your PC. There is no telemetry or analytics. FPS Patcher checks GitHub Releases for updates on startup by default (you can disable it in Settings); FFmpeg auto-download is opt-in. Downloader contacts media sites to fetch links.",
      },
    ],
  },
  footer: {
    tagline: "Two local-first Windows tools for creators who care about the details.",
    product: "Products",
    resources: "Resources",
    legal: "Legal & privacy",
    source: "Source code",
    releases: "Releases",
    issues: "Issue tracker",
    license: "MIT License",
    privacy: "Privacy",
    builtBy: "Built by x1Swimzft",
    noTelemetry: "No telemetry. No cloud uploads.",
  },
};

const th: typeof en = {
  nav: {
    apps: "แอป",
    fps: "FPS Patcher",
    downloader: "Downloader",
    downloads: "ดาวน์โหลด",
    faq: "คำถาม",
    github: "GitHub",
    cta: "ดาวน์โหลด",
  },
  hero: {
    eyebrow: "FPS v2.0.4 · Downloader v1.0.0 · Windows 10/11",
    title: "X1T",
    subtitle:
      "สองเครื่องมือเดสก์ท็อปสำหรับคนที่ใส่ใจทุกเฟรมและทุกไฟล์ แพตช์ไทม์มิ่ง MP4/MOV โดยไม่เรนเดอร์ใหม่ หรือสร้าง MPEG-TS สำหรับ TikTok ด้วย X1T Remux และพรีเซ็ต re-encode และดาวน์โหลดสื่อจาก 15 แพลตฟอร์มเข้าคิวเดียวบนเครื่องคุณ",
    primary: "ดาวน์โหลดสำหรับ Windows",
    secondary: "ดูรายละเอียดแอป",
    trust: "ไม่เก็บ telemetry · ไม่อัปโหลดไฟล์ · ซอร์ส MIT",
  },
  stats: [
    {
      value: "Lossless",
      label: "รีมักซ์วิดีโอ",
      desc: "X1T Remux คัดลอกบิตสตรีม H.264; พรีเซ็ต 60fps/1080p เป็น re-encode แบบ lossy ที่ระบุชัดเจน",
    },
    {
      value: "<30 MB",
      label: "หน่วยความจำสูงสุด",
      desc: "เขียนแบบ chunk 8 MB รองรับไฟล์เกิน 10 GB",
    },
    {
      value: "15",
      label: "แพลตฟอร์ม",
      desc: "วิดีโอ โซเชียล และเพลง รวมอยู่ในคิวเดียว",
    },
    {
      value: "0",
      label: "เก็บข้อมูล",
      desc: "ไฟล์อยู่บนเครื่องคุณ ไม่มีบัญชี ไม่มีคลาวด์",
    },
  ],
  apps: {
    title: "สองเครื่องมือ หนึ่งเวิร์กโฟลว์บนเครื่อง",
    lede: "ทั้งสองแอปใช้ภาษาภาพ Obsidian และ crimson เดียวกัน และไม่ส่งไฟล์สื่อของคุณขึ้นเซิร์ฟเวอร์",
  },
  tools: [
    {
      name: "FPS Patcher Studio",
      tagline: "แพตช์ไทม์มิ่ง MP4/MOV + พรีเซ็ต TikTok TS",
      body: "เขียนโครงสร้างคอนเทนเนอร์ MP4/MOV ใหม่โดยไม่แตะข้อมูลตัวอย่าง หรือสร้าง MPEG-TS สำหรับ TikTok ด้วย X1T Remux และพรีเซ็ต H.264/AAC แบบ lossy",
      chips: ["X1T Remux", "อัปเดตอัตโนมัติ", "CLI"],
      explore: "ดู FPS Patcher",
      download: "ดาวน์โหลด",
    },
    {
      name: "Universal Downloader",
      tagline: "ทุก링ก์ ดาวน์โหลดลงเครื่อง",
      body: "ดาวน์โหลดวิดีโอ เสียง รูปภาพ และอัลบั้มรูปบน Windows พร้อมคิวเดียวและ FFmpeg ในตัว ไม่ต้องเปิดแท็บเบราว์เซอร์",
      chips: ["15 แพลตฟอร์ม", "Photo mode", "คิว 1–5"],
      explore: "ดู Downloader",
      download: "ดาวน์โหลด",
    },
  ],
  fps: {
    badge: "FPS Patcher Studio · v2.0.4",
    title: "แก้ไทม์มิ่ง ไม่แตะพิกเซล",
    lede: "FPS Patcher Studio เขียนเฮดเดอร์ MP4/MOV ใหม่ที่ระดับ atom โดยไม่แตะข้อมูลตัวอย่าง สำหรับ MPEG-TS สไตล์ TikTok นั้น X1T Remux คัดลอกบิตสตรีม H.264 เดิมและแปลงเฉพาะเสียง ส่วน X1T 60fps และ X1T 1080p เป็น re-encode แบบ lossy สำหรับ AV1/HEVC หรือไฟล์ทั่วไป",
    featuresTitle: "ความสามารถหลัก",
    features: [
      {
        title: "bit-exact ตั้งแต่ต้น",
        desc: "เขียน atom ของ MP4/MOV ใหม่ แต่ข้อมูล mdat ยังคงเดิมทุกบิต; X1T Remux คัดลอกบิตสตรีม H.264 เช่นกัน",
      },
      {
        title: "พรีเซ็ต X1T",
        desc: "X1T Remux (ค่าเริ่มต้น), X1T 60fps และ X1T 1080p — Remux คงวิดีโอต้นฉบับ ส่วนพรีเซ็ต re-encode เป็น lossy",
      },
      {
        title: "ตรวจ 6 ด่าน",
        desc: "MP4/MOV: chunk offsets, sample tables, playback metadata, สี Rec.709, SHA-256 ของ mdat และเสียง; พรีเซ็ต TS ตรวจ sync, codec, frame rate และ duration",
      },
      {
        title: "คิวแบบแบตช์",
        desc: "ลากหลายคลิป ตั้ง timescale หรือ preset รายไฟล์ และเลือกแพตช์เฉพาะรายการที่ต้องการ",
      },
      {
        title: "System Tray และ Startup",
        desc: "ปิดหน้าต่างแล้วแพตช์ต่อ; เปิดพร้อม Windows และเริ่มแบบซ่อนใน tray ได้",
      },
      {
        title: "ดีไซน์ Crimson Graphite",
        desc: "Settings 4 แท็บ, หน้า drop แบบ hero และ light mode ที่ทำมาคู่กับ dark",
      },
      {
        title: "ดูบิตเรตและตั้งเป้า",
        desc: "แถวในคิวและ Inspector แสดงบิตเรตต้นฉบับและค่าประมาณหลังแพตช์ ปรับเป้าได้ 1-24 Mbps",
      },
      {
        title: "เช็กอัปเดตตอนเปิดแอป",
        desc: "เปิดเป็นค่าเริ่มต้น: เช็ก GitHub Releases แสดงบันทึก และถามก่อนดาวน์โหลด; บิลด์ unsigned ใช้ SHA-256 ตรวจสอบ",
      },
      {
        title: "Forensic inspector",
        desc: "ดู atom tree, ค่าสี, timescale, FPS และ A/V sync ก่อนแพตช์",
      },
      {
        title: "CLI แบบ headless",
        desc: "คำสั่ง patch, probe และ score พร้อม JSON และ exit code ที่คาดเดาได้",
      },
    ],
    presetsTitle: "พรีเซ็ต X1T",
    presetsHint: "เลือกพรีเซ็ต — X1T Remux คงบิตสตรีม H.264 เดิม; X1T 60fps/1080p เป็น re-encode สำหรับไฟล์อื่น",
    presetLabels: {
      target: "ปลายทาง",
      audio: "เสียง",
      container: "คอนเทนเนอร์",
      mobile: "วิดีโอ",
    },
    gate: "ด่าน",
    openShot: "เปิดภาพเต็ม",
    presets: [
      {
        id: "remux",
        name: "X1T Remux",
        badge: "ค่าเริ่มต้น",
        target: "ไฟล์ต้นฉบับ H.264 1080p60",
        audio: "แปลงเสียงเป็น AAC 128k, 48 kHz stereo",
        container: "MPEG-TS นามสกุล .mp4",
        mobile: "คัดลอกวิดีโอ",
        note: "คงบิตสตรีม H.264 เดิม; ตรงกับ video MD5 ของ reference",
      },
      {
        id: "60fps",
        name: "X1T 60fps",
        badge: "AV1 / HEVC",
        target: "AV1, HEVC หรือไฟล์ทั่วไป",
        audio: "AAC 128k, 48 kHz stereo",
        container: "MPEG-TS ความละเอียดต้นฉบับ 60 fps",
        mobile: "Re-encode",
        note: "เข้ารหัส H.264 Main/CAVLC ใหม่แบบ lossy ต้องใช้ Windows Media Foundation",
      },
      {
        id: "1080p",
        name: "X1T 1080p",
        badge: "1080p60",
        target: "งานส่งออก 1080p60",
        audio: "AAC 128k, 48 kHz stereo",
        container: "MPEG-TS 1920x1080 letterbox 60 fps",
        mobile: "Re-encode",
        note: "เข้ารหัส H.264 ใหม่แบบ lossy พร้อม letterbox ต้องใช้ Windows Media Foundation",
      },
    ],
    gatesTitle: "หกด่านสำหรับ MP4/MOV; พรีเซ็ต TS ใช้การตรวจของตัวเอง",
    gates: [
      { name: "chunk offsets", desc: "ขอบเขต stco / co64 และ layout แบบ faststart" },
      { name: "sample tables", desc: "ความถูกต้องของ stts / ctts" },
      { name: "playback metadata", desc: "โครงสร้างที่ AVPlayer และ MediaCodec อ่านได้" },
      { name: "color guard", desc: "ค่า Rec.709 colr / nclx" },
      { name: "mdat payload", desc: "SHA-256 ก่อนและหลังแพตช์" },
      { name: "audio payload", desc: "priming samples และ ghost frames" },
    ],
    cliTitle: "ใช้แบบ headless เมื่อต้องการ",
    cliLabel: "รันจาก PowerShell หรือ cmd",
    cli: 'FPSPatcherStudio.exe --cli patch "clip.mp4" --preset 60 --strategy tiktok-ts-remux --output out --json',
    copy: "คัดลอกคำสั่ง",
    copied: "คัดลอกแล้ว",
    disclaimer:
      "X1T Remux ไม่เข้ารหัสวิดีโอใหม่; X1T 60fps และ 1080p เป็น re-encode แบบ lossy การแก้ไทม์มิ่งไม่ได้สร้างเฟรมใหม่ และพฤติกรรมของแพลตฟอร์มอาจเปลี่ยนได้โดยไม่แจ้งล่วงหน้า ไม่รับประกันพฤติกรรมการอัปโหลด TikTok",
    shotsTitle: "ภายในแอป",
    shots: [
      { id: "queue", label: "คิวแบตช์", caption: "คิวพร้อมตัวเลือกต่อไฟล์และสถานะการตรวจสอบ" },
      { id: "settings", label: "ตั้งค่า", caption: "Settings 4 แท็บ พร้อม Advanced สำหรับการตั้งชื่อ หน้าตา และตัวเลือก lossy" },
      { id: "main", label: "หน้าแรก", caption: "ลากไฟล์ MP4 หรือ MOV หรือเพิ่มโฟลเดอร์" },
    ],
    cta: "ดาวน์โหลด FPS Patcher",
  },
  ud: {
    badge: "Universal Downloader · v1.0.0",
    title: "ทุกอย่างที่คุณ copy อยู่บนเครื่อง",
    lede: "ดาวน์โหลดวิดีโอ เสียง รูปภาพ และอัลบั้มรูปบน Windows พร้อมคิวเดียวและ FFmpeg ในตัว ไม่ต้องเปิดแท็บเบราว์เซอร์หรือหน้าต่างเทอร์มินัล",
    featuresTitle: "ความสามารถหลัก",
    features: [
      {
        title: "Clipboard watcher",
        desc: "copy ลิงก์สื่อแล้วแอปจะเสนอให้ดาวน์โหลดทันที",
      },
      {
        title: "คิวสด",
        desc: "ความคืบหน้าผ่าน SSE, ความเร็ว, pause/resume/retry และดาวน์โหลดพร้อมกัน 1–5 ไฟล์",
      },
      {
        title: "ไปป์ไลน์ในตัว",
        desc: "yt-dlp และ FFmpeg สำหรับ MP4, MP3, M4A และ OPUS",
      },
      {
        title: "รูปภาพและอัลบั้ม",
        desc: "โพสต์ Instagram สาธารณะและ TikTok photo mode บันทึกเป็น JPG หรือ ZIP",
      },
      {
        title: "เวิร์กโฟลว์ครีเอเตอร์",
        desc: "ตัดหัวท้าย, H.264 พร้อมตัดต่อ, ปรับ loudness และลากไฟล์ออกไปโปรแกรมตัดต่อ",
      },
      {
        title: "นำเข้าคุกกี้",
        desc: "ใช้คุกกี้เบราว์เซอร์สำหรับลิงก์ที่ต้องล็อกอิน และอัปเดต yt-dlp ได้ในแอป",
      },
    ],
    platformsTitle: "รองรับ 15 แพลตฟอร์ม",
    platformsHint: "ลิงก์สาธารณะ ไม่หลบ DRM ลิงก์ที่ต้องล็อกอินอาจต้องใช้คุกกี้เบราว์เซอร์",
    openShot: "เปิดภาพเต็ม",
    platforms: [
      "YouTube",
      "TikTok",
      "Instagram",
      "Facebook",
      "X / Twitter",
      "Twitch",
      "Kick",
      "Bilibili",
      "Vimeo",
      "Reddit",
      "Pinterest",
      "Spotify",
      "Apple Music",
      "SoundCloud",
      "Bandcamp",
    ],
    shotsTitle: "ภายในแอป",
    shots: [
      { id: "download", label: "ดาวน์โหลด", caption: "วางลิงก์ ดูตัวอย่างสื่อ และเลือกฟอร์แมต" },
      { id: "settings", label: "ตั้งค่า", caption: "โฟลเดอร์ปลายทาง นำเข้าคุกกี้ และอัปเดตเอนจิน" },
    ],
    disclaimer:
      "Universal Downloader ไม่หลบ DRM รองรับเฉพาะลิงก์สาธารณะ ลิงก์ที่ต้องล็อกอินอาจต้องใช้คุกกี้ และคุณต้องปฏิบัติตามเงื่อนไขของแต่ละแพลตฟอร์มและกฎหมายลิขสิทธิ์",
    cta: "ดาวน์โหลด Universal Downloader",
    openWebApp: "เปิดเว็บแอป",
    webAppHint: "เปิดตัวดาวน์โหลดในหน้าต่างซ้อนบนหน้าเว็บ",
    modalTitle: "Universal Downloader",
    modalBadge: "ต้องใช้ local bridge",
    modalClose: "ปิด",
    openInTab: "เปิดในแท็บใหม่",
    connecting: "กำลังเชื่อมต่อ Universal Downloader…",
    offlineTitle: "Universal Downloader ยังไม่ทำงาน",
    offlineBody:
      "เปิดแอปบนเครื่องและตรวจสอบว่า bridge ทำงานอยู่ แล้วลองใหม่",
    offlineHelp: "ถ้าเพิ่งเปิด รอสักครู่แล้วลองใหม่",
    retry: "ลองใหม่",
    downloadApp: "ดาวน์โหลดแอป",
    openLocalApp: "เปิดแอปบนเครื่อง",
  },
  downloads: {
    eyebrow: "release ทางการสำหรับ Windows",
    title: "ดาวน์โหลดสำหรับ Windows",
    lede: "Windows 10/11 x64 เลือก installer หรือ portable ทั้งสองไฟล์ยังไม่ได้เซ็นชื่อ กรุณาตรวจ SHA-256 ก่อนเปิดใช้งาน",
    unsignedTitle: "ไฟล์ยังไม่ได้เซ็นชื่อ",
    unsignedBody:
      "Windows SmartScreen อาจขึ้น “Windows protected your PC” ในการเปิดครั้งแรก ซึ่งเป็นเรื่องปกติของไฟล์ที่ยังไม่เซ็นชื่อ ให้เทียบค่าแฮชกับค่าบนหน้านี้หรือไฟล์ checksum ของ release ก่อนเปิดใช้งาน",
    verifyTitle: "ตรวจสอบก่อนรัน",
    verifyBody:
      "เปิด PowerShell ในโฟลเดอร์ Downloads รัน Get-FileHash แล้วเทียบผลลัพธ์กับค่าแฮชทางการ",
    installer: "ตัวติดตั้ง",
    portable: "พกพา (ZIP)",
    size: "ขนาด",
    version: "เวอร์ชัน",
    platform: "แพลตฟอร์ม",
    copyHash: "คัดลอก SHA-256",
    copied: "คัดลอกแล้ว",
    releaseNotes: "Release notes",
    source: "ซอร์สโค้ด",
    checksums: "Checksums",
    windows: "Windows 10/11 x64",
    free: "ฟรี",
  },
  faq: {
    eyebrow: "ก่อนติดตั้ง",
    title: "คำถามที่ควรตอบตรงๆ",
    items: [
      {
        q: "ทำไม Windows ขึ้นเตือนก่อนรัน installer?",
        a: "ไฟล์ build ปัจจุบันยังไม่ได้เซ็นชื่อ Authenticode ทำให้ SmartScreen ตรวจสอบผู้เผยแพร่ไม่ได้ ให้ตรวจ SHA-256 กับไฟล์ checksum ของ release ก่อนรัน",
      },
      {
        q: "ทำไมอัปเดตอัตโนมัติจาก v2.0.1–v2.0.3 ไม่สำเร็จ?",
        a: "build เหล่านั้นยอมรับเฉพาะ installer ที่เซ็นชื่อ Authenticode; build ปัจจุบันยังไม่เซ็นชื่อ จึงต้องติดตั้ง v2.0.4 ด้วยมือหนึ่งครั้ง ถ้าดาวน์โหลดไว้แล้ว ให้รัน FPSPatcherStudio-v2.0.4-Setup.exe จาก %TEMP%\\FPSPatcherStudioUpdate หลังจากนั้นระบบจะตรวจ SHA-256 ของ release ให้",
      },
      {
        q: "FPS Patcher เข้ารหัสวิดีโอใหม่ไหม?",
        a: "X1T Remux คัดลอกบิตสตรีม H.264 เดิมโดยไม่เข้ารหัสวิดีโอใหม่ ส่วน X1T 60fps และ X1T 1080p เป็น re-encode H.264/AAC แบบ lossy สำหรับ AV1/HEVC หรือไฟล์ทั่วไป พรีเซ็ต X1T เดิมเป็นการแพตช์คอนเทนเนอร์เท่านั้น",
      },
      {
        q: "Universal Downloader หลบ DRM ไหม?",
        a: "ไม่ รองรับลิงก์สาธารณะและนำเข้าคุกกี้เบราว์เซอร์สำหรับเนื้อหาที่ต้องล็อกอิน ลิงก์ Spotify และ Apple Music จะจับคู่เสียงผ่าน yt-dlp search ไม่ใช่การหลบ DRM",
      },
      {
        q: "มีข้อมูลถูกอัปโหลดออกไปไหม?",
        a: "ไฟล์สื่อประมวลผลหรือดาวน์โหลดบนเครื่องคุณโดยตรง ไม่มี telemetry หรือ analytics FPS Patcher จะเช็ก GitHub Releases ตอนเปิดแอปเป็นค่าเริ่มต้น (ปิดได้ใน Settings) และการดาวน์โหลด FFmpeg เป็นแบบ opt-in ส่วน Downloader จะติดต่อเว็บไซต์สื่อเพื่อดึงลิงก์",
      },
    ],
  },
  footer: {
    tagline: "สองเครื่องมือ Windows ที่ทำงานบนเครื่อง สำหรับครีเอเตอร์ที่ใส่ใจรายละเอียด",
    product: "ผลิตภัณฑ์",
    resources: "แหล่งข้อมูล",
    legal: "กฎหมายและความเป็นส่วนตัว",
    source: "ซอร์สโค้ด",
    releases: "Release",
    issues: "แจ้งปัญหา",
    license: "MIT License",
    privacy: "ความเป็นส่วนตัว",
    builtBy: "สร้างโดย x1Swimzft",
    noTelemetry: "ไม่มี telemetry และไม่มีการอัปโหลดขึ้นคลาวด์",
  },
};

export const COPY = { en, th };

export function getCopy(lang: Lang) {
  return COPY[lang];
}
