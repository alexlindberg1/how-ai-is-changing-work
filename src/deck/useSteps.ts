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
      if (!PROGRESSIVE_REVEAL) {
        if (prev.slideIndex < slides.length - 1) {
          return { ...prev, slideIndex: prev.slideIndex + 1, stepIndex: 0 }
        }
        return prev
      }

      const slide = slides[prev.slideIndex]
      const max = slide?.steps ?? 1
      if (prev.stepIndex < max - 1) {
        return { ...prev, stepIndex: prev.stepIndex + 1 }
      }
      if (prev.slideIndex < slides.length - 1) {
        return { ...prev, slideIndex: prev.slideIndex + 1, stepIndex: 0 }
      }
      return prev
    })
  }, [])

  const prev = useCallback(() => {
    setState((prev) => {
      if (!PROGRESSIVE_REVEAL) {
        if (prev.slideIndex > 0) {
          return { ...prev, slideIndex: prev.slideIndex - 1, stepIndex: 0 }
        }
        return prev
      }

      if (prev.stepIndex > 0) {
        return { ...prev, stepIndex: prev.stepIndex - 1 }
      }
      if (prev.slideIndex > 0) {
        const prevSlide = slides[prev.slideIndex - 1]
        return {
          ...prev,
          slideIndex: prev.slideIndex - 1,
          stepIndex: (prevSlide?.steps ?? 1) - 1,
        }
      }
      return prev
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
