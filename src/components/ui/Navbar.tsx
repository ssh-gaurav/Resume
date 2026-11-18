import { motion } from 'framer-motion'
import { personalProfile } from '../../data/resumeData'
import { FileText } from 'lucide-react'

interface NavbarProps {
  onOpenMenu: () => void
  onOpenTalk: () => void
  onOpenResume?: () => void
}

export function Navbar({ onOpenMenu, onOpenTalk, onOpenResume }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-5 pointer-events-none flex justify-center"
    >
      <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
        {/* Top-Left: Gaurav Rajawat wordmark capsule */}
        <a
          href="#hero"
          className="group flex items-center gap-3 px-4 py-2 rounded-full bg-[#08080a]/80 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        >
          {/* Animated geometric insignia */}
          <div className="w-2.5 h-2.5 bg-white rotate-45 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase">
            {personalProfile.name}
          </span>
          <span className="font-mono text-[9px] text-[#777777] tracking-widest hidden sm:inline">
            // RESUME
          </span>
        </a>

        {/* Top-Right: Telemetry status + Action Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Real-time telemetry status badge */}
          <div
            title="Availability: Open to Full-Time, Remote & Contract Roles"
            className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#08080a]/80 backdrop-blur-xl"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="absolute inset-0 rounded-full border border-emerald-400/40 animate-ping opacity-60" />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#BFC2C5] uppercase">
              OPEN TO WORK
            </span>
          </div>

          {/* RESUME button */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/15 hover:border-white/40 hover:bg-white/20 font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </button>
          )}

          {/* LET'S TALK button */}
          <button
            onClick={onOpenTalk}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-white/95 text-black font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.18)] cursor-pointer"
          >
            LET'S TALK
          </button>

          {/* MENU button */}
          <button
            onClick={onOpenMenu}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2 rounded-full bg-[#16171b] text-white border border-white/20 font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer"
          >
            MENU
          </button>
        </div>
      </div>
    </motion.header>
  )
}
