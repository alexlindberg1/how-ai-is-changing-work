import { slides } from '../content/slides'

interface ProgressBarProps {
  slideIndex: number
  canPrev: boolean
  canNext: boolean
  overviewOpen: boolean
  onPrev: () => void
  onNext: () => void
  onOverview: () => void
  onFullscreen: () => void
}

export function ProgressBar({
  slideIndex,
  canPrev,
  canNext,
  overviewOpen,
  onPrev,
  onNext,
  onOverview,
  onFullscreen,
}: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col gap-2 pl-44 sm:pl-48 pr-6 pt-4 pointer-events-none">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-kicker text-text-dim tracking-widest">
          {String(slideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>

        <div className="pointer-events-auto flex items-center gap-1.5" role="navigation" aria-label="Slide controls">
          <NavButton label="Prev" shortcut="←" onClick={onPrev} disabled={!canPrev} />
          <NavButton label="Next" shortcut="→" onClick={onNext} disabled={!canNext} />
          <NavButton
            label={overviewOpen ? 'Close' : 'Overview'}
            shortcut="O"
            onClick={onOverview}
            active={overviewOpen}
          />
          <NavButton label="Fullscreen" shortcut="F" onClick={onFullscreen} />
        </div>
      </div>

      <div className="flex gap-1">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
              i < slideIndex
                ? 'bg-accent/60'
                : i === slideIndex
                  ? 'bg-accent'
                  : 'bg-track'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function NavButton({
  label,
  shortcut,
  onClick,
  disabled = false,
  active = false,
}: {
  label: string
  shortcut: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active || undefined}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-kicker tracking-widest transition-colors ${
        active
          ? 'border-accent/40 bg-accent-soft text-accent'
          : 'border-border bg-surface text-text-dim hover:border-border-bright hover:bg-surface-hover hover:text-text'
      } disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border disabled:hover:bg-surface disabled:hover:text-text-dim`}
    >
      <span className="hidden sm:inline">{shortcut}</span>
      <span>{label}</span>
    </button>
  )
}
