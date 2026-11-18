import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight, CheckCircle2, Briefcase, Award } from 'lucide-react'
import { careerMilestones } from '../../data/resumeData'

export function EventsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleAction = (id: string, link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    } else {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2500)
    }
  }

  return (
    <section id="events" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-16 bg-[#07070a] text-white border-t border-white/10 overflow-hidden">
      <div className="absolute top-12 left-10 text-white/20 font-mono text-xs">+</div>
      <div className="absolute top-12 right-10 text-white/20 font-mono text-xs">+</div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-50" />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] text-[#BFC2C5] uppercase">
            05 // EXPERIENCE & CAREER TRAJECTORY
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase max-w-5xl leading-[1.02] mb-16"
        >
          TRAJECTORY <br />
          <span className="font-normal italic text-gradient">& IMPACT.</span>
        </motion.h2>

        {/* Editorial Career Milestones List */}
        <div className="space-y-6">
          {careerMilestones.map((milestone, idx) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              className="group relative rounded-2xl border border-white/15 bg-[#0e0e14]/80 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-300 hover:border-white/40 hover:bg-[#12131b] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]"
            >
              {/* Left Column: Period & Type */}
              <div className="lg:w-1/4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                <span className="font-mono text-[11px] tracking-[0.25em] text-[#BFC2C5] uppercase flex items-center gap-1.5">
                  {milestone.type === 'HACKATHON' ? (
                    <Award className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5 text-white" />
                  )}
                  {milestone.type}
                </span>
                <p className="font-display text-2xl sm:text-3xl font-light text-white tracking-tight mt-2">
                  {milestone.period}
                </p>
                <div className="mt-4 inline-flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      milestone.status === 'CURRENT'
                        ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                        : 'bg-white/50'
                    }`}
                  />
                  <span className="font-mono text-[10px] tracking-widest text-[#BFC2C5] uppercase">
                    {milestone.status}
                  </span>
                </div>
              </div>

              {/* Middle Column: Details & Impact Highlights */}
              <div className="lg:w-1/2 space-y-3">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-normal text-white tracking-tight group-hover:text-white transition-colors">
                  {milestone.title}
                </h3>
                <p className="font-mono text-xs text-[#BFC2C5] tracking-wider uppercase">
                  // {milestone.role}
                </p>
                <p className="text-sm text-[#D1D5DB] font-light leading-relaxed">
                  {milestone.description}
                </p>

                {/* Bulleted Highlights */}
                <ul className="space-y-1.5 pt-2">
                  {milestone.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="text-xs text-[#9CA3AF] flex items-start gap-2">
                      <span className="text-white/60 font-mono mt-0.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 text-xs font-mono text-[#888890] pt-2">
                  <span className="flex items-center gap-1.5 text-[#BFC2C5]">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                    {milestone.location}
                  </span>
                </div>
              </div>

              {/* Right Column: Link / Action button */}
              <div className="lg:w-1/4 flex lg:justify-end items-center">
                {copiedId === milestone.id ? (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white font-mono text-xs text-white">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>VERIFIED RECORD</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAction(milestone.id, milestone.link)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#E5E7EB] hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer"
                  >
                    <span>EXPLORE WORK</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
