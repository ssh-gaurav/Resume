import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export function HeroContent() {
  return (
    <div className="relative w-full h-full pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 z-20">
      {/* Decorative Crosshair elements in corners (Lusion style) */}
      <div className="absolute top-24 left-10 text-white/40 font-mono text-xs select-none hidden md:block">
        <span className="inline-block animate-pulse-subtle">+</span>
      </div>
      <div className="absolute top-24 right-10 text-white/40 font-mono text-xs select-none hidden md:block">
        <span className="inline-block animate-pulse-subtle">+</span>
      </div>
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/30 font-mono text-xs select-none hidden lg:block">
        +
      </div>

      {/* Top spacer for navbar clearance */}
      <div className="h-20" />

      {/* Center ambient indicator */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.0 }}
        className="mx-auto flex flex-col items-center gap-2 select-none"
      >
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#BFC2C5] uppercase">
            SECTOR 01 // DEEP LUNAR HARMONICS
          </span>
        </div>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
      </motion.div>

      {/* Bottom Typography: Left and Right split (editorial, large uppercase modern sans) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-end justify-between pt-12 pb-4">
        {/* Bottom-left text */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-left"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-[1px] bg-white/40" />
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#777777] uppercase">
              WE ARE
            </p>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-[1.02]">
            NEXUS <span className="font-semibold text-gradient">AI CLUB</span>
          </h1>
          <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#BFC2C5] uppercase mt-3">
            A COMMUNITY OF <br className="hidden sm:inline" />
            INNOVATORS & BUILDERS
          </p>
        </motion.div>

        {/* Bottom-right text */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:items-end md:text-right"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white uppercase leading-[1.1]">
            BUILDING <span className="font-normal italic tracking-normal text-white">THE FUTURE</span> <br />
            OF <span className="font-light italic text-[#E0E2E5]">ARTIFICIAL</span> INTELLIGENCE
          </h2>
          <div className="mt-5 flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm text-[#BFC2C5] font-mono text-[10px] tracking-[0.25em] uppercase">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-white" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
