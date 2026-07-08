import { AnimatePresence, motion } from 'motion/react'
import { PROGRESSIVE_REVEAL, useSteps } from './useSteps'
import { slides } from '../content/slides'
import { useKeyboardNav } from './useKeyboardNav'
import { ProgressBar } from './ProgressBar'
import { OverviewGrid } from './OverviewGrid'
import { slideTransition } from './transitions'
import { Slide01Opening } from '../slides/Slide01Opening'
import { Slide02TraditionalWork } from '../slides/Slide02TraditionalWork'
import { Slide03AiConnectionLayer } from '../slides/Slide03AiConnectionLayer'
import { Slide04AgenticComparison } from '../slides/Slide04AgenticComparison'
import { Slide05ArtifactSpectrum } from '../slides/Slide05ArtifactSpectrum'
import { Slide05DemoDashboard } from '../slides/Slide05DemoDashboard'
import { Slide06DemoProposal } from '../slides/Slide06DemoProposal'
import { Slide06BusinessSystems } from '../slides/Slide06BusinessSystems'
import { Slide08ValueChain } from '../slides/Slide08ValueChain'
import { Slide09StartSmall } from '../slides/Slide09StartSmall'
import { Slide10Questions } from '../slides/Slide10Questions'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { CompanyLogo } from '../components/CompanyLogo'
import { LaserPointer } from '../components/LaserPointer'

const slideComponents = [
  Slide01Opening,
  Slide02TraditionalWork,
  Slide03AiConnectionLayer,
  Slide04AgenticComparison,
  Slide05ArtifactSpectrum,
  Slide05DemoDashboard,
  Slide06DemoProposal,
  Slide06BusinessSystems,
  Slide08ValueChain,
  Slide09StartSmall,
  Slide10Questions,
]

export function DeckController() {
  const deck = useSteps()
  useKeyboardNav(deck)

  const ActiveSlide = slideComponents[deck.slideIndex]
  const currentSlide = slides[deck.slideIndex]
  const displayStep = PROGRESSIVE_REVEAL
    ? deck.stepIndex
    : (currentSlide?.steps ?? 1) - 1

  return (
    <div className="relative h-full w-full overflow-hidden gradient-mesh">
      <AnimatedBackground variant={deck.slideIndex} />
      <CompanyLogo />
      <ProgressBar slideIndex={deck.slideIndex} />

      <div className="relative h-full w-full pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={deck.slideIndex}
            className="absolute inset-0 pt-16"
            {...slideTransition}
          >
            {ActiveSlide && <ActiveSlide step={displayStep} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <OverviewGrid
        visible={deck.showOverview}
        currentIndex={deck.slideIndex}
        onSelect={deck.goToSlide}
        onClose={deck.closeOverlays}
      />

      <LaserPointer />

      <div className="grain-overlay" aria-hidden="true" />
    </div>
  )
}
