import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../ui/Icons'
import { personalProfile } from '../../data/resumeData'

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
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-60" />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] text-[#BFC2C5] uppercase">
            07 // Get in touch
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
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[0.98] max-w-6xl">
              Have a project <br />
              in mind? <br />
              <span className="font-normal text-[#c5b79c]">Let’s talk.</span>
            </h2>
          </motion.div>

          {/* Prominent GET RESUME / HIRE Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <button
              onClick={onOpenJoin}
              className="group px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-black font-mono text-sm font-semibold tracking-widest uppercase flex items-center gap-4 transition-all duration-300 hover:bg-[#E5E7EB] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Resume & contact</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
            </button>

            <a
              href={`mailto:${personalProfile.email}`}
              className="px-6 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>DIRECT EMAIL</span>
            </a>

            <span className="font-mono text-xs tracking-widest text-[#BFC2C5] uppercase">
              // {personalProfile.availability}
            </span>
          </motion.div>
        </div>

        {/* Footer Navigation & Social Links */}
        <div className="pt-20 mt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          {/* Left: Brand & Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-white rotate-45" />
              <span className="font-mono text-sm font-semibold tracking-[0.25em] text-white uppercase">
                {personalProfile.name} // PORTFOLIO
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] max-w-sm font-light leading-relaxed">
              AI & ML student at MITS Gwalior. Building research tools, backend applications, and this little corner of the web.
            </p>
            <p className="font-mono text-[10px] tracking-widest text-[#BFC2C5] uppercase">
              {personalProfile.location}
            </p>
          </div>

          {/* Middle: Navigation shortcuts */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[#BFC2C5]">
            <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors cursor-pointer">
              [ ORIGIN ]
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              [ PROFILE ]
            </button>
            <button onClick={() => onNavigate('domains')} className="hover:text-white transition-colors cursor-pointer">
              [ STACK ]
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors cursor-pointer">
              [ PROJECTS ]
            </button>
            <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors cursor-pointer">
              [ EXPERIENCE ]
            </button>
            <button onClick={() => onNavigate('community')} className="hover:text-white transition-colors cursor-pointer">
              [ EDUCATION ]
            </button>
          </div>

          {/* Right: Social & System Tag */}
          <div className="md:col-span-3 flex md:flex-col md:items-end justify-between gap-4">
            <div className="flex items-center gap-4 text-[#BFC2C5]">
              <a
                href={personalProfile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalProfile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalProfile.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
                title="X / Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>

            <span className="font-mono text-[9px] tracking-widest text-[#777777] uppercase">
              © 2026 {personalProfile.name.toUpperCase()}. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
