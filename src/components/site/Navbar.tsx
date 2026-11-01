"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Download,
  Github,
  Menu,
  X,
} from "lucide-react";
import { getCopy } from "@/lib/content";
import {
  ACCENTS,
  ACCENT_META,
  type AccentPreset,
  type Lang,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

interface NavbarProps {
  lang: Lang;
  accent: AccentPreset;
  onLangChange: (lang: Lang) => void;
  onAccentChange: (accent: AccentPreset) => void;
}

export function Navbar({
  lang,
  accent,
  onLangChange,
  onAccentChange,
}: NavbarProps) {
  const copy = getCopy(lang);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#apps", label: copy.nav.apps },
    { href: "#fps-patcher", label: copy.nav.fps },
    { href: "#universal-downloader", label: copy.nav.downloader },
    { href: "#downloads", label: copy.nav.downloads },
    { href: "#faq", label: copy.nav.faq },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-[9px] text-[11px] font-bold tracking-tight text-white shadow-[0_0_18px_var(--glow-soft)]"
            style={{ background: "var(--accent)" }}
          >
            X1
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--text)]">
              X1T
            </span>
            <span className="mt-1 hidden text-[10px] font-medium tracking-[0.08em] text-[var(--muted)] sm:block">
              CREATOR TOOLS
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[13px] font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <div
            className="flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-0.5"
            aria-label="Language"
          >
            {(["th", "en"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onLangChange(value)}
                aria-pressed={lang === value}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors",
                  lang === value
                    ? "bg-[var(--raised)] text-[var(--text)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                )}
              >
                {value.toUpperCase()}
              </button>
            ))}
          </div>

          <div
            className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5"
            aria-label="Accent theme"
          >
            {ACCENTS.map((key) => {
              const meta = ACCENT_META[key];
              return (
                <button
                  key={key}
                  type="button"
                  className="swatch"
                  style={{ background: meta.hex }}
                  aria-label={meta.label}
                  aria-pressed={accent === key}
                  title={meta.label}
                  onClick={() => onAccentChange(key)}
                />
              );
            })}
          </div>

          <a
            href="https://github.com/x1Swimzft"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>

          <a href="#downloads" className="btn btn-primary btn-sm">
            <Download className="h-3.5 w-3.5" />
            {copy.nav.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => onLangChange(lang === "th" ? "en" : "th")}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--text)]"
            aria-label="Switch language"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-[var(--border)] bg-[var(--bg)] px-5 pb-6 pt-4 md:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--text2)]"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 text-[var(--muted)]" />
              </a>
            ))}
          </nav>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5" aria-label="Accent theme">
              {ACCENTS.map((key) => {
                const meta = ACCENT_META[key];
                return (
                  <button
                    key={key}
                    type="button"
                    className="swatch"
                    style={{ background: meta.hex }}
                    aria-label={meta.label}
                    aria-pressed={accent === key}
                    onClick={() => onAccentChange(key)}
                  />
                );
              })}
            </div>
            <a
              href="https://github.com/x1Swimzft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--muted)]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <a
            href="#downloads"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-5 w-full"
          >
            <Download className="h-4 w-4" />
            {copy.nav.cta}
          </a>
        </div>
      ) : null}
    </header>
  );
}
