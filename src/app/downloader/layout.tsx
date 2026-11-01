import type { Metadata } from "next";
import "@/features/downloader/downloader.css";

export const metadata: Metadata = {
  title: "Universal Downloader — X1T",
  description: "Local-first downloader bridge for Universal Downloader.",
};

export default function DownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {children}
    </div>
  );
}
