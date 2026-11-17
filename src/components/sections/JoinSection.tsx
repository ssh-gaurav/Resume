import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, TwitterIcon, LinkedinIcon, DiscordIcon } from '../ui/Icons'

interface JoinSectionProps {
  onOpenJoin: () => void
  onNavigate: (id: string) => void
}

export function JoinSection({ onOpenJoin, onNavigate }: JoinSectionProps) {
  return (
    <footer id="join" className="relative w-full bg-[#050505] text-white border-t border-white/10 pt-28 sm:pt-36 pb-16 px-6 sm:px-10 md:px-16 overflow-hidden">
      {/* Decorative Crosshairs */}
      <div className="absolute top-12 left-10 text-white/20 font-mono text-xs">+</div>
      <div className="absolute top-12 right-10 text-white/20 font-mono text-xs">+</div>
      <div className="absolute bottom-16 right-10 text-white/20 font-mono text-xs hidden sm:block">+</div>

      {/* Atmospheric Horizon Light Glow at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[70vh] relative z-10">
        {/* Top Tag */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-60" />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] text-[#BFC2C5] uppercase">
            07 // HORIZON CALL
          </span>
        </div>

        {/* Cinematic Headline */}
        <div className="my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white uppercase leading-[0.98] max-w-6xl">
              THE FUTURE <br />
              IS NOT WAITING. <br />
              <span className="font-normal italic text-gradient">WE BUILD IT.</span>
            </h2>
          </motion.div>

          {/* Prominent JOIN THE CLUB Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <button
              onClick={onOpenJoin}
              className="group px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-black font-mono text-sm font-semibold tracking-widest uppercase flex items-center gap-4 transition-all duration-300 hover:bg-[#E5E7EB] hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.25),0_0_100px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              <span>JOIN THE CLUB</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
            </button>

            <span className="font-mono text-xs tracking-widest text-[#BFC2C5] uppercase">
              // APPLICATIONS REVIEWED WEEKLY
            </span>
          </motion.div>
        </div>

        {/* Footer Navigation & Social Links */}
        <div className="pt-20 mt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          {/* Left: Brand & Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-white rotate-45 shadow-[0_0_8px_#ffffff]" />
              <span className="font-mono text-sm font-semibold tracking-[0.25em] text-white uppercase">
                AI CLUB // NEXUS
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] max-w-sm font-light leading-relaxed">
              An elite collegiate hub for artificial intelligence exploration, algorithmic research, and autonomous systems. Designed with cinematic monochromatic precision.
            </p>
            <p className="font-mono text-[10px] tracking-widest text-[#BFC2C5] uppercase">
              CAMPUS RESEARCH HUB // SECTOR 9 // LATENT GRID
            </p>
          </div>

          {/* Middle: Navigation shortcuts */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[#BFC2C5]">
            <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors cursor-pointer">
              [ ORIGIN ]
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              [ ABOUT ]
            </button>
            <button onClick={() => onNavigate('domains')} className="hover:text-white transition-colors cursor-pointer">
              [ DOMAINS ]
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">
              [ PROJECTS ]
            </button>
            <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors cursor-pointer">
              [ EVENTS ]
            </button>
            <button onClick={() => onNavigate('community')} className="hover:text-white transition-colors cursor-pointer">
              [ TEAM ]
            </button>
          </div>

          {/* Right: Social & System Tag */}
          <div className="md:col-span-3 flex md:flex-col md:items-end justify-between gap-4">
            <div className="flex items-center gap-4 text-[#BFC2C5]">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                title="Discord"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                title="X / Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <span className="font-mono text-[9px] tracking-widest text-[#777777] uppercase">
              © 2026 AI CLUB. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
