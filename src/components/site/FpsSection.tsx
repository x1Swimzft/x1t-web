"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  CheckCheck,
  Copy,
  Download,
  ExternalLink,
  FileCheck2,
  Github,
  Info,
  Terminal,
  Zap,
} from "lucide-react";
import { getCopy, RELEASES } from "@/lib/content";
import type { Lang } from "@/lib/theme";
import { cn } from "@/lib/utils";

const SHOTS = [
  { id: "queue", src: "/shots/fps/queue.png", width: 1120, height: 760 },
  { id: "settings", src: "/shots/fps/settings.png", width: 920, height: 640 },
  { id: "main", src: "/shots/fps/main.png", width: 1120, height: 760 },
] as const;

interface FpsSectionProps {
  lang: Lang;
}

export function FpsSection({ lang }: FpsSectionProps) {
  const copy = getCopy(lang).fps;
  const shared = getCopy(lang).downloads;
  const [shot, setShot] = useState(0);
  const [preset, setPreset] = useState(copy.presets[0]?.id ?? "zilem");
  const [copied, setCopied] = useState(false);

  const activeShot = SHOTS[shot] ?? SHOTS[0];
  const activePreset =
    copy.presets.find((item) => item.id === preset) ?? copy.presets[0];
  const caption =
    copy.shots.find((item) => item.id === activeShot.id)?.caption ?? "";

  async function copyCli() {
    try {
      await navigator.clipboard.writeText(copy.cli);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="fps-patcher"
      className="section border-t border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip-accent">
                <Zap className="h-3.5 w-3.5" />
                {copy.badge}
              </span>
              <span className="chip">Python 3.11 · PySide6</span>
              <span className="chip">Windows 10/11 x64</span>
            </div>
            <h2 className="h2 mt-5">{copy.title}</h2>
            <p className="lede mt-5">{copy.lede}</p>
          </div>

          <a
            href="#downloads"
            className="btn btn-primary shrink-0"
          >
            <Download className="h-4 w-4" />
            {copy.cta}
          </a>
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
                sizes="(max-width: 1180px) 100vw, 1120px"
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
                <h3 className="h3">{copy.presetsTitle}</h3>
                <p className="mt-2 max-w-[38ch] text-[12.5px] leading-relaxed text-[var(--muted)]">
                  {copy.presetsHint}
                </p>
              </div>
              <FileCheck2 className="h-5 w-5 shrink-0 text-[var(--accent-light)]" />
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {copy.presets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPreset(item.id)}
                  aria-pressed={preset === item.id}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition-colors",
                    preset === item.id
                      ? "border-[var(--accent-dim-border)] bg-[var(--accent-dim)] text-[var(--accent-light)]"
                      : "border-[var(--border)] bg-[var(--raised)] text-[var(--muted)] hover:text-[var(--text)]"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <dl className="mt-6 space-y-3 border-t border-[var(--border)] pt-5">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11.5px] text-[var(--muted)]">
                  {copy.presetLabels.target}
                </dt>
                <dd className="max-w-[62%] text-right text-[12.5px] font-medium text-[var(--text2)]">
                  {activePreset?.target}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11.5px] text-[var(--muted)]">
                  {copy.presetLabels.audio}
                </dt>
                <dd className="max-w-[62%] text-right text-[12.5px] font-medium text-[var(--text2)]">
                  {activePreset?.audio}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11.5px] text-[var(--muted)]">
                  {copy.presetLabels.container}
                </dt>
                <dd className="max-w-[62%] text-right text-[12.5px] font-medium text-[var(--text2)]">
                  {activePreset?.container}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-[11.5px] text-[var(--muted)]">
                  {copy.presetLabels.mobile}
                </dt>
                <dd className="max-w-[62%] text-right text-[12.5px] font-medium text-[var(--accent-light)]">
                  {activePreset?.mobile}
                </dd>
              </div>
            </dl>

            <p className="mt-5 border-t border-[var(--border)] pt-4 text-[12px] leading-relaxed text-[var(--muted)]">
              {activePreset?.note}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <h3 className="h3">{copy.gatesTitle}</h3>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {copy.gates.map((gate, index) => (
                <li
                  key={gate.name}
                  className="rounded-[var(--r-control)] border border-[var(--border)] bg-[var(--surface)] p-3.5"
                >
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-light)]">
                    {copy.gate} {index + 1}
                  </span>
                  <p className="mt-1 text-[13px] font-semibold text-[var(--text)]">
                    {gate.name}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">
                    {gate.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[var(--accent-light)]" />
              <h3 className="h3">{copy.cliTitle}</h3>
            </div>
            <p className="mt-2 text-[12.5px] text-[var(--muted)]">
              {copy.cliLabel}
            </p>
            <div className="relative mt-4">
              <pre className="code-block pr-24">
                <code>{copy.cli}</code>
              </pre>
              <button
                type="button"
                onClick={copyCli}
                className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--raised)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--text2)] transition-colors hover:text-[var(--text)]"
              >
                {copied ? (
                  <CheckCheck className="h-3.5 w-3.5 text-[var(--success)]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? copy.copied : copy.copy}
              </button>
            </div>

            <div className="mt-5 flex gap-3 rounded-[var(--r-control)] border border-[var(--accent-dim-border)] bg-[var(--accent-dim)] p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-light)]" />
              <p className="text-[12.5px] leading-relaxed text-[var(--text2)]">
                {copy.disclaimer}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={RELEASES.fps.repo}
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
