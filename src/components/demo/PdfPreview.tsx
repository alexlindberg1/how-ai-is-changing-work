interface PdfPreviewProps {
  /** Public URL of the PDF to embed. */
  file: string
}

/**
 * Embeds the source PDF using the browser's native viewer (reliable in the
 * Chromium/WebKit browsers this deck presents from), with a fallback link.
 */
export function PdfPreview({ file }: PdfPreviewProps) {
  return (
    <object
      data={`${file}#view=FitH`}
      type="application/pdf"
      className="h-full w-full"
      aria-label="Proposal PDF preview"
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="font-body text-body text-text-muted">
          This browser could not embed the PDF.
        </p>
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border bg-surface px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent"
        >
          Open PDF in a new tab
        </a>
      </div>
    </object>
  )
}
