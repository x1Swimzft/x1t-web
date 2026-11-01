"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Download, Zap } from "lucide-react";
import { getCopy, RELEASES } from "@/lib/content";
import type { Lang } from "@/lib/theme";

interface ToolCardsProps {
  lang: Lang;
}

export function ToolCards({ lang }: ToolCardsProps) {
  const copy = getCopy(lang);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Only arm the boot scan once the pair is actually on screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        section.dataset.boot = "true";
        observer.disconnect();
      },
      { threshold: 0.45 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const products = [
    {
      ...copy.tools[0],
      icon: Zap,
      href: "#fps-patcher",
      release: RELEASES.fps,
    },
    {
      ...copy.tools[1],
      icon: Download,
      href: "#universal-downloader",
      release: RELEASES.ud,
    },
  ];

  return (
    <section id="apps" ref={sectionRef} className="section">
      <div className="shell">
        <div className="max-w-3xl">
          <h2 className="h2">{copy.apps.title}</h2>
          <p className="lede mt-5">{copy.apps.lede}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <article
                key={product.name}
                className="app-card group relative isolate flex flex-col overflow-hidden rounded-[var(--r-card)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-dim-border)] focus-within:-translate-y-0.5 focus-within:border-[var(--accent-dim-border)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="app-icon flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border)] bg-[var(--raised)] text-[var(--accent-light)] transition-colors duration-200 group-hover:border-[var(--accent-dim-border)] group-hover:bg-[var(--accent-dim)] group-focus-within:border-[var(--accent-dim-border)] group-focus-within:bg-[var(--accent-dim)]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--text)]">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-[12px] text-[var(--muted)]">
                        v{product.release.version} · Windows 10/11 x64
                      </p>
                    </div>
                  </div>
                  <span className="chip">Free</span>
                </div>

                <p className="mt-6 text-[15px] font-medium text-[var(--text2)]">
                  {product.tagline}
                </p>
                <p className="mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-[var(--muted)]">
                  {product.body}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {product.chips.map((chip) => (
                    <span key={chip} className="chip">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
                  <a
                    href={product.href}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-light)] transition-colors hover:text-[var(--text)]"
                  >
                    {product.explore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5" />
                  </a>
                  <a href="#downloads" className="btn btn-ghost btn-sm">
                    <Download className="h-3.5 w-3.5" />
                    {product.download}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
