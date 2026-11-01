"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { getCopy, RELEASES } from "@/lib/content";
import type { Lang } from "@/lib/theme";

interface DownloadsProps {
  lang: Lang;
}

export function Downloads({ lang }: DownloadsProps) {
  const copy = getCopy(lang).downloads;
  const [copied, setCopied] = useState<string | null>(null);

  async function copyHash(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  const products = [
    { key: "fps", release: RELEASES.fps, label: "FPS Patcher Studio" },
    { key: "ud", release: RELEASES.ud, label: "Universal Downloader" },
  ] as const;

  return (
    <section
      id="downloads"
      className="section border-t border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="shell">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {copy.eyebrow}
          </span>
          <h2 className="h2 mt-5">{copy.title}</h2>
          <p className="lede mt-5">{copy.lede}</p>
        </div>

        <div className="mt-10 flex gap-3 rounded-[var(--r-card)] border border-[var(--accent-dim-border)] bg-[var(--accent-dim)] p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-light)]" />
          <div>
            <p className="text-[13.5px] font-semibold text-[var(--text)]">
              {copy.unsignedTitle}
            </p>
            <p className="mt-1 max-w-[80ch] text-[12.5px] leading-relaxed text-[var(--text2)]">
              {copy.unsignedBody}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {products.map(({ key, release, label }) => (
            <article
              key={key}
              className="flex flex-col rounded-[var(--r-card)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                    {label}
                  </h3>
                  <p className="mt-1 text-[12px] text-[var(--muted)]">
                    v{release.version} · {copy.windows}
                  </p>
                </div>
                <span className="chip chip-accent">{copy.free}</span>
              </div>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                <a
                  href={release.installer.url}
                  className="btn btn-primary w-full"
                >
                  <Download className="h-4 w-4" />
                  {copy.installer}
                </a>
                <a
                  href={release.portable.url}
                  className="btn btn-ghost w-full"
                >
                  <FileCheck2 className="h-4 w-4" />
                  {copy.portable}
                </a>
              </div>

              <dl className="mt-5 space-y-2 border-t border-[var(--border)] pt-4 text-[12px]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--muted)]">{copy.version}</dt>
                  <dd className="font-medium text-[var(--text2)]">
                    {release.version}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--muted)]">{copy.platform}</dt>
                  <dd className="font-medium text-[var(--text2)]">
                    {copy.windows}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[var(--muted)]">{copy.size}</dt>
                  <dd className="font-medium text-[var(--text2)]">
                    {release.installer.size} · {release.portable.size}
                  </dd>
                </div>
              </dl>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    SHA-256 · {copy.installer}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      copyHash(`${key}-installer`, release.installer.sha)
                    }
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--accent-light)] transition-colors hover:text-[var(--text)]"
                  >
                    {copied === `${key}-installer` ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied === `${key}-installer`
                      ? copy.copied
                      : copy.copyHash}
                  </button>
                </div>
                <code className="mt-2 block break-all rounded-[8px] border border-[var(--border)] bg-[var(--raised)] p-2.5 font-mono text-[10.5px] leading-relaxed text-[var(--text2)]">
                  {release.installer.sha}
                </code>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-[12px]">
                <a
                  href={release.releasePage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                >
                  {copy.releaseNotes}
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={release.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                >
                  {copy.source}
                  <ExternalLink className="h-3 w-3" />
                </a>
                {"checksums" in release ? (
                  <a
                    href={release.checksums}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                  >
                    {copy.checksums}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[var(--r-card)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-4 w-4 text-[var(--accent-light)]" />
            <h3 className="text-[15px] font-semibold text-[var(--text)]">
              {copy.verifyTitle}
            </h3>
          </div>
          <p className="mt-2 max-w-[80ch] text-[12.5px] leading-relaxed text-[var(--muted)]">
            {copy.verifyBody}
          </p>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            <div className="min-w-0">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                FPS Patcher Studio
              </p>
              <pre className="code-block">
                <code>{`Get-FileHash .\\${RELEASES.fps.installer.file} -Algorithm SHA256`}</code>
              </pre>
            </div>
            <div className="min-w-0">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Universal Downloader
              </p>
              <pre className="code-block">
                <code>{`Get-FileHash .\\${RELEASES.ud.installer.file} -Algorithm SHA256`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-[var(--r-control)] border border-[var(--border)] bg-[var(--raised)] p-3.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
            <p className="text-[12px] leading-relaxed text-[var(--muted)]">
              {lang === "th"
                ? "ค่าแฮชไม่สนใจตัวพิมพ์เล็ก-ใหญ่ เทียบค่าที่ได้กับค่าบนการ์ดหรือไฟล์ SHA256SUMS ของ release"
                : "Hashes are case-insensitive. Compare the output with the card above or the release SHA256SUMS file."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
