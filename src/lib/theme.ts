export type Lang = "th" | "en";

export type AccentPreset = "crimson" | "violet" | "cyan" | "emerald" | "amber";

export const ACCENTS: AccentPreset[] = [
  "crimson",
  "violet",
  "cyan",
  "emerald",
  "amber",
];

export const ACCENT_META: Record<
  AccentPreset,
  { label: string; hex: string; light: string }
> = {
  crimson: { label: "Crimson Gamer", hex: "#c8283f", light: "#ff5a70" },
  violet: { label: "Midnight Violet", hex: "#7c3aed", light: "#a78bfa" },
  cyan: { label: "Cyber Cyan", hex: "#0e7490", light: "#67e8f9" },
  emerald: { label: "Emerald Terminal", hex: "#047857", light: "#6ee7b7" },
  amber: { label: "Amber Warm", hex: "#b45309", light: "#fcd34d" },
};
