import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IntroScene } from './IntroScene'

interface IntroExperienceProps {
  onEnterMainSite: () => void
}

export function IntroExperience({ onEnterMainSite }: IntroExperienceProps) {
  const [transitioning, setTransitioning] = useState(false)

  // Prevent scrolling while intro is active
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleEnter = () => {
    setTransitioning(true)
    setTimeout(() => {
      onEnterMainSite()
    }, 1200)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 w-full h-full bg-[#F9FAFB] flex items-center justify-center overflow-hidden select-none"
      >
        {/* Fullscreen 3D Scene (Pure white studio, glossy black button, particle break-away) */}
        <div className="absolute inset-0 w-full h-full">
          <IntroScene onEnter={handleEnter} />
        </div>

        {/* Minimal Corner Technical Metadata */}
        <div className="absolute bottom-8 left-8 text-[10px] font-mono tracking-[0.25em] text-[#8E9298] uppercase pointer-events-none hidden sm:block">
          INITIATE // NEXUS AI CLUB
        </div>

        <div className="absolute bottom-8 right-8 text-[10px] font-mono tracking-[0.25em] text-[#8E9298] uppercase pointer-events-none hidden sm:block">
          TAP // ENTER TO EXPLORE
        </div>

        {/* Cinematic Transition Flash into the Dark Monochromatic World */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: transitioning ? 1 : 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#050505] pointer-events-none z-30"
        />
      </motion.div>
    </AnimatePresence>
  )
}

