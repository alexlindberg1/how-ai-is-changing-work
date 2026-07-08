import type { ReactNode } from 'react'

interface SlideShellProps {
  children: ReactNode
  className?: string
  align?: 'center' | 'start'
  /** Use a wider content container (e.g. for full-stage diagrams). */
  wide?: boolean
}

export function SlideShell({
  children,
  className = '',
  align = 'center',
  wide = false,
}: SlideShellProps) {
  return (
    <section
      className={`flex h-full w-full flex-col pb-12 ${
        wide ? 'px-6 sm:px-10 lg:px-14' : 'px-6 sm:px-12 lg:px-20'
      } ${align === 'center' ? 'justify-center' : 'justify-start pt-8'} ${className}`}
    >
      <div className={`mx-auto w-full ${wide ? 'max-w-[92rem]' : 'max-w-6xl'}`}>{children}</div>
    </section>
  )
}
