"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Info,
  Layers,
} from "lucide-react";
import { OpenDownloaderButton } from "@/components/site/OpenDownloaderButton";
import { getCopy, RELEASES } from "@/lib/content";
import type { Lang } from "@/lib/theme";

const SHOTS = [
  { id: "download", src: "/shots/ud/download.png", width: 1440, height: 780 },
  { id: "settings", src: "/shots/ud/settings.png", width: 1440, height: 780 },
] as const;

interface DownloaderSectionProps {
  lang: Lang;
}

export function DownloaderSection({ lang }: DownloaderSectionProps) {
  const copy = getCopy(lang).ud;
  const shared = getCopy(lang).downloads;
  const [shot, setShot] = useState(0);

  const activeShot = SHOTS[shot] ?? SHOTS[0];
  const caption =
    copy.shots.find((item) => item.id === activeShot.id)?.caption ?? "";

  return (
    <section
      id="universal-downloader"
      className="section border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_38%,var(--bg))]"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip-accent">
                <Layers className="h-3.5 w-3.5" />
                {copy.badge}
              </span>
              <span className="chip">Electron · FastAPI · Next.js</span>
              <span className="chip">Windows 10/11 x64</span>
            </div>
            <h2 className="h2 mt-5">{copy.title}</h2>
            <p className="lede mt-5">{copy.lede}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <OpenDownloaderButton lang={lang} />
            <a href="#downloads" className="btn btn-primary shrink-0">
              <Download className="h-4 w-4" />
              {copy.cta}
            </a>
          </div>
        </div>

        <div className="mt-12">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="tablist"
            aria-label={copy.shotsTitle}
          >
            {copy.shots.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={shot === index}
                data-active={shot === index}
                className="tab"
                onClick={() => setShot(index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <div className="shot-frame">
              <Image
                src={activeShot.src}
                width={activeShot.width}
                height={activeShot.height}
                alt={caption}
                className="h-auto w-full"
                sizes="(max-width: 1180px) 100vw, 1180px"
                loading="eager"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[12px] text-[var(--muted)]">{caption}</p>
              <a
                href={activeShot.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--accent-light)] transition-colors hover:text-[var(--text)]"
              >
                {copy.openShot}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <h3 className="h3">{copy.featuresTitle}</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {copy.features.map((feature) => (
                <li key={feature.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-dim)] text-[var(--accent-light)]">
                    <Check className="h-3 w-3" strokeWidth={2.4} />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-[var(--text)]">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
                      {feature.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 rounded-[var(--r-card)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="h3">{copy.platformsTitle}</h3>
                <p className="mt-2 max-w-[42ch] text-[12.5px] leading-relaxed text-[var(--muted)]">
                  {copy.platformsHint}
                </p>
              </div>
              <Globe2 className="h-5 w-5 shrink-0 text-[var(--accent-light)]" />
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {copy.platforms.map((platform) => (
                <span key={platform} className="chip">
                  {platform}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-5">
              <p className="text-[12.5px] font-semibold text-[var(--text)]">
                TikTok Photo Mode
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
                {lang === "th"
                  ? "บันทึกสไลด์รูปภาพเป็น ZIP ความละเอียดเต็ม พร้อมแยกเพลงประกอบ"
                  : "Save photo carousels as a full-resolution ZIP, with the background track extracted separately."}
              </p>
            </div>

            <div className="mt-5 flex gap-3 rounded-[var(--r-control)] border border-[var(--accent-dim-border)] bg-[var(--accent-dim)] p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-light)]" />
              <p className="text-[12.5px] leading-relaxed text-[var(--text2)]">
                {copy.disclaimer}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={RELEASES.ud.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <Github className="h-3.5 w-3.5" />
                {shared.source}
              </a>
              <a href="#downloads" className="btn btn-primary btn-sm">
                <Download className="h-3.5 w-3.5" />
                {copy.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
