import { ArrowUpRight, Github } from "lucide-react";
import { getCopy } from "@/lib/content";
import type { Lang } from "@/lib/theme";

interface FaqProps {
  lang: Lang;
}

export function Faq({ lang }: FaqProps) {
  const copy = getCopy(lang).faq;

  return (
    <section
      id="faq"
      className="section border-t border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {copy.eyebrow}
          </span>
          <h2 className="h2 mt-5">{copy.title}</h2>
          <a
            href="https://github.com/x1Swimzft/FPS-Patcher-Studio/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            <Github className="h-4 w-4" />
            {lang === "th" ? "เปิด issue บน GitHub" : "Open an issue on GitHub"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div>
          {copy.items.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
