import { useEffect } from 'react'
import type { DeckControls } from './useSteps'
import { slides } from '../content/slides'

export function useKeyboardNav(deck: DeckControls) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          deck.next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          deck.prev()
          break
        case 'Home':
          e.preventDefault()
          deck.goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          deck.goToSlide(slides.length - 1)
          break
        case 'Escape':
          deck.closeOverlays()
          break
        case 'f':
        case 'F':
          deck.toggleFullscreen()
          break
        case 'o':
        case 'O':
          deck.toggleOverview()
          break
        default:
          if (e.key >= '1' && e.key <= '9') {
            const idx = parseInt(e.key, 10) - 1
            if (idx < slides.length) {
              deck.goToSlide(idx)
            }
          }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deck])
}
