interface StageTileProps {
  label: string
  icon: string
  highlighted?: boolean
}

export function StageTile({ label, icon, highlighted = false }: StageTileProps) {
  return (
    <div
      className={`flex h-[3.4rem] items-center gap-3 rounded-xl border px-4 transition-colors duration-200 ${
        highlighted
          ? 'border-accent bg-accent text-white shadow-md'
          : 'border-border glass text-text'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base ${
          highlighted ? 'bg-white/20 text-white' : 'bg-accent-soft text-accent'
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 truncate font-display text-[1.05rem] font-medium leading-none">
        {label}
      </span>
    </div>
  )
}
