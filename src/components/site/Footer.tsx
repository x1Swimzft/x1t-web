import { ArrowUpRight, Github, ShieldCheck } from "lucide-react";
import { getCopy, RELEASES } from "@/lib/content";
import type { Lang } from "@/lib/theme";

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const copy = getCopy(lang).footer;

  const products = [
    { label: "FPS Patcher Studio", href: "#fps-patcher" },
    { label: "Universal Downloader", href: "#universal-downloader" },
    { label: getCopy(lang).nav.downloads, href: "#downloads" },
    { label: getCopy(lang).nav.faq, href: "#faq" },
  ];

  const resources = [
    { label: copy.source, href: RELEASES.fps.repo },
    { label: "Universal Downloader · GitHub", href: RELEASES.ud.repo },
    { label: copy.releases, href: RELEASES.fps.releasePage },
    {
      label: copy.issues,
      href: "https://github.com/x1Swimzft/FPS-Patcher-Studio/issues",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-0 select-none text-[clamp(6rem,18vw,12rem)] font-semibold leading-none tracking-[-0.08em] text-white/[0.025]"
      >
        X1T
      </div>

      <div className="shell relative py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-[9px] text-[11px] font-bold text-white"
                style={{ background: "var(--accent)" }}
              >
                X1
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                X1T
              </span>
            </a>
            <p className="mt-4 max-w-[34ch] text-[13px] leading-relaxed text-[var(--muted)]">
              {copy.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-[12px] text-[var(--muted)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--success)]" />
              {copy.noTelemetry}
            </p>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              {copy.product}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {products.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-[var(--text2)] transition-colors hover:text-[var(--text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              {copy.resources}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] text-[var(--text2)] transition-colors hover:text-[var(--text)]"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 text-[var(--muted)]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-[11.5px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 x1Swimzft.{" "}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text2)] underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--text)]"
            >
              {copy.license}
            </a>
            .
          </p>
          <p className="flex items-center gap-2">
            <Github className="h-3.5 w-3.5" />
            {copy.builtBy}
          </p>
        </div>
      </div>
    </footer>
  );
}
