import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, Globe, Terminal, Sparkles } from 'lucide-react'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (sectionId: string) => void
}

const menuItems = [
  { id: 'hero', number: '01', title: 'ORIGIN', subtitle: 'LUNAR BASE & HERO' },
  { id: 'about', number: '02', title: 'ABOUT US', subtitle: 'WE EXPLORE THE UNKNOWN' },
  { id: 'domains', number: '03', title: 'DOMAINS', subtitle: 'INTELLIGENCE HAS MANY DIMENSIONS' },
  { id: 'projects', number: '04', title: 'PROJECTS', subtitle: 'IDEAS INTO REALITY' },
  { id: 'events', number: '05', title: 'EVENTS', subtitle: 'WHERE IDEAS COME TO LIFE' },
  { id: 'community', number: '06', title: 'OUR COMMUNITY', subtitle: 'BUILT BY CURIOUS MINDS' },
  { id: 'join', number: '07', title: 'JOIN US', subtitle: 'THE FUTURE IS NOT WAITING' },
]

export function MenuOverlay({ isOpen, onClose, onNavigate }: MenuOverlayProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 text-white selection:bg-white selection:text-black overflow-y-auto"
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] text-[#BFC2C5]">
                AI CLUB // NAVIGATION DIRECTORY
              </span>
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:bg-[#BFC2C5] active:scale-95"
            >
              <span>CLOSE</span>
              <X className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-300" />
            </button>
          </div>

          {/* Main Navigation Links */}
          <div className="my-auto py-12 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative cursor-pointer py-1.5"
                  onClick={() => {
                    onNavigate(item.id)
                    onClose()
                  }}
                >
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs tracking-widest text-[#777777] group-hover:text-white transition-colors duration-300">
                      {item.number}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#BFC2C5] group-hover:text-white transition-all duration-300 group-hover:translate-x-3">
                      {item.title}
                    </h2>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-300 text-white ml-auto" />
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-[#777777] uppercase ml-8 md:ml-12 group-hover:text-[#BFC2C5] transition-colors">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Sidebar info inside menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="md:col-span-4 border-l border-white/10 pl-8 hidden md:flex flex-col gap-8"
            >
              <div>
                <h4 className="font-mono text-[11px] tracking-widest text-[#777777] uppercase mb-2">
                  // IDENTITY
                </h4>
                <p className="text-sm font-light text-[#BFC2C5] leading-relaxed">
                  Nexus AI Club is an autonomous collegiate collective pushing the frontier of artificial intelligence, machine learning, and synthetic cognition.
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[11px] tracking-widest text-[#777777] uppercase mb-2">
                  // TELEMETRY
                </h4>
                <div className="font-mono text-xs text-[#777777] space-y-1">
                  <p className="flex justify-between">
                    <span>SYSTEM:</span>
                    <span className="text-white">ONLINE 99.98%</span>
                  </p>
                  <p className="flex justify-between">
                    <span>LOCATION:</span>
                    <span className="text-white">CAMPUS // LAB 404</span>
                  </p>
                  <p className="flex justify-between">
                    <span>LATENT COORD:</span>
                    <span className="text-white">0x7F // SECTOR 9</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[11px] tracking-widest text-[#777777] uppercase mb-2">
                  // NETWORK
                </h4>
                <div className="flex gap-4 font-mono text-xs text-[#BFC2C5]">
                  <a href="#github" className="hover:text-white transition-colors">GH</a>
                  <a href="#discord" className="hover:text-white transition-colors">DISCORD</a>
                  <a href="#x" className="hover:text-white transition-colors">X.COM</a>
                  <a href="#linkedin" className="hover:text-white transition-colors">LN</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer row */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-[#777777] gap-4">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-white" />
                TERMINAL READY
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                NEURAL R3F ACCELERATED
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <span>COLLEGE AI CLUB © 2026 // MONOCHROMATIC PROTOCOL</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

