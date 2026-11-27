import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { personalProfile } from '../../data/resumeData'

export function HeroContent() {
  return (
    <div className="relative z-20 h-full flex flex-col justify-end px-6 sm:px-10 md:px-16 pb-12 sm:pb-16 pt-28 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none">
      <div className="max-w-7xl w-full mx-auto">
        <p className="text-sm text-[#d0c3ac] mb-5">Gwalior, India / AI &amp; ML student</p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[1.04] tracking-tight text-white">Gaurav Singh<br /><span className="text-[#c5b79c]">Rajawat.</span></h1>
        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="max-w-lg text-lg sm:text-xl leading-relaxed text-[#c2c0b9]">I build tools with Python, experiment with machine learning, and learn by making things work.</p>
          <div className="flex flex-wrap gap-5 pointer-events-auto text-sm">
            <a href="#projects" className="flex items-center gap-3 text-white border-b border-[#c5b79c] pb-2">Explore my work <ArrowDown size={16} /></a>
            <a href={personalProfile.resumeUrl} download="Gaurav-Rajawat-Resume.pdf" className="flex items-center gap-3 text-[#c2c0b9] border-b border-white/20 pb-2">Download resume <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
