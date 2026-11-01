"use client";

import { ArrowRight, Download } from "lucide-react";
import { getCopy } from "@/lib/content";
import { ACCENT_META, type AccentPreset, type Lang } from "@/lib/theme";
import { SonarGrid } from "@/components/ui/sonar-grid";

interface HeroProps {
  lang: Lang;
  accent: AccentPreset;
}

export function Hero({ lang, accent }: HeroProps) {
  const copy = getCopy(lang);
  const meta = ACCENT_META[accent];

  return (
    <section id="top" className="relative">
      <SonarGrid
        color={meta.light}
        spacing={18}
        dotRadius={1.5}
        baseOpacity={0.22}
        ringWidth={104}
        speed={240}
        amplitude={2.6}
        pingEvery={2.8}
        maxRings={6}
        seedPing
        pingArea={[0.18, 0.12, 0.82, 0.78]}
        className="flex min-h-[calc(100svh-4rem)] w-full flex-col bg-[var(--bg)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 44% 40% at 50% 44%, var(--bg) 0%, color-mix(in srgb, var(--bg) 86%, transparent) 52%, transparent 100%)",
          }}
        />

        <div className="shell relative z-10 flex flex-1 flex-col items-center justify-center py-24 text-center sm:py-28">
          <p className="eyebrow hero-rise">
            <span className="eyebrow-dot animate-soft-pulse" aria-hidden="true" />
            {copy.hero.eyebrow}
          </p>

          <h1 className="display hero-rise hero-rise-1 mt-7 text-[var(--text)]">
            {copy.hero.title}
          </h1>

          <p className="lede hero-rise hero-rise-2 mt-7 max-w-2xl text-balance text-[var(--text2)]">
            {copy.hero.subtitle}
          </p>

          <div className="hero-rise hero-rise-3 mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#downloads" className="btn btn-primary">
              <Download className="h-4 w-4" />
              {copy.hero.primary}
            </a>
            <a href="#apps" className="btn btn-ghost">
              {copy.hero.secondary}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <p className="hero-rise hero-rise-4 mt-7 text-[12px] font-medium tracking-[0.02em] text-[var(--muted)]">
            {copy.hero.trust}
          </p>
        </div>

        <div className="shell relative z-10 pb-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[var(--border)] pt-8 md:grid-cols-4">
            {copy.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--text)]">
                  {stat.value}
                </dd>
                <dd className="mt-2 max-w-[22ch] text-[12px] leading-relaxed text-[var(--muted)]">
                  {stat.desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </SonarGrid>
    </section>
  );
}
