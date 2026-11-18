import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpaceJourneyScene, type JourneyPhase } from './SpaceJourneyScene'
import { ArrowUpRight, FastForward, ShieldAlert } from 'lucide-react'
import { cinematicAudio } from '../../utils/cinematicAudio'
import { personalProfile } from '../../data/resumeData'

interface IntroCinematicExperienceProps {
  onEnterMainSite: () => void
}

export function IntroCinematicExperience({ onEnterMainSite }: IntroCinematicExperienceProps) {
  const [phase, setPhase] = useState<JourneyPhase>('idle')
  const [hasStarted, setHasStarted] = useState(false)

  // Prevent scrolling during the cinematic space intro
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      cinematicAudio.stopAll()
    }
  }, [])

  const handleStart = () => {
    if (hasStarted) return
    setHasStarted(true)
    cinematicAudio.startAmbientDrone()
    setPhase('pull')
  }

  const handleSkip = () => {
    cinematicAudio.stopAll()
    onEnterMainSite()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 w-full h-full bg-[#030305] text-white flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Fullscreen 3D Cinematic Scene */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <SpaceJourneyScene
            phase={phase}
            onPhaseChange={setPhase}
            onComplete={onEnterMainSite}
          />
        </div>

        {/* ======================================================== */}
        {/* TOP STATUS BAR                                           */}
        {/* ======================================================== */}
        <div className="relative z-20 w-full px-6 sm:px-10 py-6 flex items-center justify-between pointer-events-auto">
          {/* Mission Telemetry Indicator */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="font-mono text-xs tracking-[0.25em] text-[#BFC2C5] uppercase">
              {phase === 'idle' && `${personalProfile.name.toUpperCase()} // INTERACTIVE 3D RESUME`}
              {phase === 'pull' && 'SYNCHRONIZING // CORE ARCHITECTURE INGESTION'}
              {phase === 'event_horizon' && 'CROSSING // EVENT HORIZON TRANSIT'}
              {phase === 'wormhole' && 'DIMENSIONAL RELATIVITY // LOADING ASSETS'}
              {phase === 'emerge' && 'EMERGING INTO MAIN RESUME PORTAL'}
            </span>
          </div>

          {/* Quick Skip Button */}
          <button
            onClick={handleSkip}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 font-mono text-xs tracking-wider uppercase backdrop-blur-md cursor-pointer active:scale-95"
          >
            <span>ENTER RESUME DIRECTLY</span>
            <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* CENTER ALERTS DURING INGESTION SEQUENCE                 */}
        {/* ======================================================== */}
        {phase === 'pull' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 mx-auto text-center pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/30 text-white font-mono text-xs tracking-widest uppercase mb-2">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-white" />
              SYSTEM TRAJECTORY SYNCHRONIZED
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* BOTTOM MINIMAL INTERFACE (Prompt & Trigger Button)       */}
        {/* ======================================================== */}
        {phase === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-20 w-full max-w-4xl mx-auto pb-12 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto"
          >
            {/* Tagline */}
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] text-[#777777] uppercase mb-1">
                SECTOR 00 // {personalProfile.title}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-white tracking-tight uppercase">
                {personalProfile.name} // PORTFOLIO
              </h2>
            </div>

            {/* Initiate Button */}
            <button
              onClick={handleStart}
              className="group px-8 sm:px-10 py-4 rounded-full bg-white text-black font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase flex items-center gap-3 transition-all duration-300 hover:bg-[#BFC2C5] hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <span>ENTER EXPERIENCE</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        )}

        {/* Dimensional White Flash Transition Overlay on Wormhole Exit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'emerge' ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
          className="absolute inset-0 bg-white pointer-events-none z-40"
        />
      </motion.div>
    </AnimatePresence>
  )
}
