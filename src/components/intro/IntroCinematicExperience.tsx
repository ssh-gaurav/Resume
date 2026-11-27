import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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
  const reducedMotion = useReducedMotion()
  const stages = ['idle', 'pull', 'event_horizon', 'wormhole', 'emerge']
  const stageIndex = stages.indexOf(phase)

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
    if (reducedMotion) {
      onEnterMainSite()
      return
    }
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

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/90" />

        {/* ======================================================== */}
        {/* TOP STATUS BAR                                           */}
        {/* ======================================================== */}
        <div className="relative z-20 w-full px-5 sm:px-10 py-5 sm:py-7 flex items-center justify-between gap-4 pointer-events-auto">
          {/* Mission Telemetry Indicator */}
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.6)]" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] text-white/60 uppercase">
              {phase === 'idle' && 'GAURAV RAJAWAT / FLIGHT DECK'}
              {phase === 'pull' && 'LAUNCH SEQUENCE / DEPARTING'}
              {phase === 'event_horizon' && 'IN TRANSIT / EVENT HORIZON'}
              {phase === 'wormhole' && 'WARP DRIVE / APPROACHING DESTINATION'}
              {phase === 'emerge' && 'ARRIVAL / WELCOME ABOARD'}
            </span>
          </div>

          {/* Quick Skip Button */}
          <button
            onClick={handleSkip}
            className="group shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 font-mono text-xs tracking-wider uppercase backdrop-blur-md cursor-pointer active:scale-95"
          >
            <span>Skip intro</span>
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
              FLIGHT IN PROGRESS
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
            className="relative z-20 w-full max-w-7xl mx-auto pb-8 sm:pb-12 px-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pointer-events-auto"
          >
            {/* Tagline */}
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] text-[#777777] uppercase mb-1">
                WELCOME TO MY ORBIT
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08]">
                Ideas. Code.<br />A little exploration.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">I'm {personalProfile.name}. Explore my work in AI, machine learning, and the web.</p>
            </div>

            {/* Initiate Button */}
            <button
              onClick={handleStart}
              className="group shrink-0 px-7 sm:px-8 py-4 rounded-full bg-white text-black font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase flex items-center gap-3 transition-all duration-300 hover:bg-[#BFC2C5] hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <span>{reducedMotion ? 'Explore portfolio' : 'Launch experience'}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        )}

        {hasStarted && (
          <div className="relative z-20 mx-6 sm:mx-10 mb-10" aria-live="polite">
            <div className="flex justify-between mb-3 font-mono text-[10px] tracking-widest text-white/60 uppercase">
              <span>Journey to the portfolio</span><span>{stageIndex} / 4</span>
            </div>
            <div className="flex gap-2">
              {stages.slice(1).map((stage, index) => (
                <div key={stage} className={`h-0.5 flex-1 rounded-full transition-colors duration-700 ${index < stageIndex ? 'bg-emerald-300' : 'bg-white/15'}`} />
              ))}
            </div>
          </div>
        )}

        {/* Dimensional White Flash Transition Overlay on Wormhole Exit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'emerge' ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
          className="absolute inset-0 bg-[#030305] pointer-events-none z-40"
        />
      </motion.div>
    </AnimatePresence>
  )
}
