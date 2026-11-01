"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { getCopy } from "@/lib/content";
import type { Lang } from "@/lib/theme";

interface OpenDownloaderButtonProps {
  lang: Lang;
  size?: "md" | "sm";
}

export function OpenDownloaderButton({
  lang,
  size = "md",
}: OpenDownloaderButtonProps) {
  const copy = getCopy(lang).ud;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    try {
      if (!dialog.open) dialog.showModal();
      dialog.focus();
    } catch {
      setOpen(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function closeModal() {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  const isSmall = size === "sm";

  return (
    <>
      <a
        ref={triggerRef}
        href="/downloader/"
        onClick={(event) => {
          if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }
          event.preventDefault();
          setOpen(true);
        }}
        className={isSmall ? "btn btn-ghost btn-sm" : "btn btn-ghost shrink-0"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="ud-modal"
        aria-label={copy.openWebApp}
        title={copy.webAppHint}
      >
        <ExternalLink className={isSmall ? "h-3.5 w-3.5" : "h-4 w-4"} />
        {copy.openWebApp}
      </a>

      {open ? (
        <dialog
          ref={dialogRef}
          id="ud-modal"
          className="ud-modal"
          tabIndex={-1}
          aria-labelledby="ud-modal-title"
          onClose={() => setOpen(false)}
          onCancel={(event) => {
            event.preventDefault();
            closeModal();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="ud-modal__bar">
            <div className="ud-modal__heading">
              <span className="ud-modal__title" id="ud-modal-title">
                {copy.modalTitle}
              </span>
              <span className="ud-modal__badge">{copy.modalBadge}</span>
            </div>

            <div className="ud-modal__actions">
              <a
                href="/downloader/"
                target="_blank"
                rel="noopener noreferrer"
                className="ud-modal__link"
                aria-label={copy.openInTab}
                title={copy.openInTab}
              >
                <span>{copy.openInTab}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                className="ud-modal__close"
                onClick={closeModal}
                aria-label={copy.modalClose}
                title={copy.modalClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="ud-modal__body">
            <iframe
              src="/downloader/"
              title={copy.modalTitle}
              loading="eager"
            />
          </div>
        </dialog>
      ) : null}
    </>
  );
}
