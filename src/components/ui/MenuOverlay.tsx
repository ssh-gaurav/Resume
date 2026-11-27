import { useScrollLock } from '../../hooks/useScrollLock'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Globe, Terminal, Sparkles, Mail } from 'lucide-react'
import { personalProfile } from '../../data/resumeData'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (sectionId: string) => void
}

const menuItems = [
  { id: 'hero', number: '01', title: 'ORIGIN', subtitle: 'LUNAR VOYAGE & HERO' },
  { id: 'about', number: '02', title: 'PROFILE', subtitle: 'PHILOSOPHY & BIOGRAPHY' },
  { id: 'domains', number: '03', title: 'TECH STACK', subtitle: 'SKILLS & SYSTEM ARCHITECTURE' },
  { id: 'projects', number: '04', title: 'PROJECTS', subtitle: 'FEATURED PRODUCTION BUILDS' },
  { id: 'events', number: '05', title: 'EXPERIENCE', subtitle: 'CAREER TRAJECTORY & IMPACT' },
  { id: 'community', number: '06', title: 'EDUCATION', subtitle: 'FOUNDATIONS & CERTIFICATIONS' },
  { id: 'join', number: '07', title: 'HIRE ME', subtitle: 'CONTACT & RESUME DOSSIER' },
]

export function MenuOverlay({ isOpen, onClose, onNavigate }: MenuOverlayProps) {
  useScrollLock(isOpen)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 text-white selection:bg-white selection:text-black overflow-y-auto overscroll-contain"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] text-[#BFC2C5]">
                {personalProfile.name.toUpperCase()} // RESUME DIRECTORY
              </span>
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:bg-[#BFC2C5] active:scale-95 cursor-pointer"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Navigation List */}
          <div className="my-auto py-10 max-w-5xl w-full mx-auto">
            <ul className="flex flex-col space-y-3 sm:space-y-4">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.5 }}
                >
                  <button
                    onClick={() => {
                      onNavigate(item.id)
                      onClose()
                    }}
                    className="group w-full flex items-center justify-between py-2 sm:py-3 border-b border-white/5 hover:border-white/40 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className="font-mono text-xs sm:text-sm text-[#777777] group-hover:text-white transition-colors">
                        [{item.number}]
                      </span>
                      <span className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#E5E7EB] group-hover:text-white group-hover:translate-x-3 transition-all duration-300 uppercase">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="hidden md:inline-block font-mono text-[10px] tracking-widest text-[#777777] group-hover:text-[#BFC2C5] uppercase">
                        {item.subtitle}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-white group-hover:bg-white flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#777777]">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[#BFC2C5]">
                <Globe className="w-3.5 h-3.5 text-white" />
                {personalProfile.location}
              </span>
              <a
                href={`mailto:${personalProfile.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {personalProfile.email}
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white">// {personalProfile.availability}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
