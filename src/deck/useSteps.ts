import { useCallback, useState } from 'react'
import { slides } from '../content/slides'

/** When false, each slide shows fully on load; arrows only change slides. */
export const PROGRESSIVE_REVEAL = false

export interface DeckState {
  slideIndex: number
  stepIndex: number
  showOverview: boolean
}

export function useSteps() {
  const [state, setState] = useState<DeckState>({
    slideIndex: 0,
    stepIndex: 0,
    showOverview: false,
  })

  const currentSlide = slides[state.slideIndex]
  const maxSteps = currentSlide?.steps ?? 1

  const next = useCallback(() => {
    setState((prev) => {
      const base = { ...prev, showOverview: false }
      if (!PROGRESSIVE_REVEAL) {
        if (base.slideIndex < slides.length - 1) {
          return { ...base, slideIndex: base.slideIndex + 1, stepIndex: 0 }
        }
        return { ...prev, showOverview: false }
      }

      const slide = slides[base.slideIndex]
      const max = slide?.steps ?? 1
      if (base.stepIndex < max - 1) {
        return { ...base, stepIndex: base.stepIndex + 1 }
      }
      if (base.slideIndex < slides.length - 1) {
        return { ...base, slideIndex: base.slideIndex + 1, stepIndex: 0 }
      }
      return { ...prev, showOverview: false }
    })
  }, [])

  const prev = useCallback(() => {
    setState((prev) => {
      const base = { ...prev, showOverview: false }
      if (!PROGRESSIVE_REVEAL) {
        if (base.slideIndex > 0) {
          return { ...base, slideIndex: base.slideIndex - 1, stepIndex: 0 }
        }
        return { ...prev, showOverview: false }
      }

      if (base.stepIndex > 0) {
        return { ...base, stepIndex: base.stepIndex - 1 }
      }
      if (base.slideIndex > 0) {
        const prevSlide = slides[base.slideIndex - 1]
        return {
          ...base,
          slideIndex: base.slideIndex - 1,
          stepIndex: (prevSlide?.steps ?? 1) - 1,
        }
      }
      return { ...prev, showOverview: false }
    })
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setState((prev) => ({
        ...prev,
        slideIndex: index,
        stepIndex: 0,
        showOverview: false,
      }))
    }
  }, [])

  const toggleOverview = useCallback(() => {
    setState((prev) => ({ ...prev, showOverview: !prev.showOverview }))
  }, [])

  const closeOverlays = useCallback(() => {
    setState((prev) => ({ ...prev, showOverview: false }))
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  return {
    ...state,
    currentSlide,
    maxSteps,
    totalSlides: slides.length,
    next,
    prev,
    goToSlide,
    toggleOverview,
    closeOverlays,
    toggleFullscreen,
  }
}

export type DeckControls = ReturnType<typeof useSteps>
