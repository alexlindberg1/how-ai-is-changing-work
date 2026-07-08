import { slides } from '../content/slides'

interface ProgressBarProps {
  slideIndex: number
}

export function ProgressBar({ slideIndex }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col gap-2 pl-44 sm:pl-48 pr-6 pt-4 pointer-events-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-kicker text-text-dim tracking-widest">
          {String(slideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <span className="font-mono text-kicker text-text-dim tracking-widest hidden sm:block">
          → NEXT · ← PREV · O OVERVIEW · F FULLSCREEN
        </span>
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
