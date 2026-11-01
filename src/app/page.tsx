"use client";

import { useEffect, useState } from "react";
import { DownloaderSection } from "@/components/site/DownloaderSection";
import { Downloads } from "@/components/site/Downloads";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { FpsSection } from "@/components/site/FpsSection";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { ToolCards } from "@/components/site/ToolCards";
import type { AccentPreset, Lang } from "@/lib/theme";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("th");
  const [accent, setAccent] = useState<AccentPreset>("crimson");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedLang = window.localStorage.getItem("x1t-lang");
      const savedAccent = window.localStorage.getItem("x1t-accent");
      if (savedLang === "en" || savedLang === "th") setLang(savedLang);
      if (
        savedAccent === "crimson" ||
        savedAccent === "violet" ||
        savedAccent === "cyan" ||
        savedAccent === "emerald" ||
        savedAccent === "amber"
      ) {
        setAccent(savedAccent);
      }
    } catch {
      // localStorage can be unavailable in private contexts.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.accent = accent;
    if (!ready) return;
    try {
      window.localStorage.setItem("x1t-lang", lang);
      window.localStorage.setItem("x1t-accent", accent);
    } catch {
      // Persisting the preference is best-effort.
    }
  }, [lang, accent, ready]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <a
        href="#apps"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {lang === "th" ? "ข้ามไปเนื้อหา" : "Skip to content"}
      </a>

      <Navbar
        lang={lang}
        accent={accent}
        onLangChange={setLang}
        onAccentChange={setAccent}
      />

      <main>
        <Hero lang={lang} accent={accent} />
        <ToolCards lang={lang} />
        <FpsSection lang={lang} />
        <DownloaderSection lang={lang} />
        <Downloads lang={lang} />
        <Faq lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
