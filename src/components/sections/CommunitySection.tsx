import { motion } from 'framer-motion'
import { GraduationCap, Award, CheckCircle } from 'lucide-react'
import { educationAndHonors } from '../../data/resumeData'

export function CommunitySection() {
  return (
    <section id="community" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-16 bg-[#050505] text-white border-t border-white/10 overflow-hidden">
      <div className="absolute top-12 left-10 text-white/20 font-mono text-xs">+</div>
      <div className="absolute top-12 right-10 text-white/20 font-mono text-xs">+</div>

      {/* Floating subtle ambient blurs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-50" />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] text-[#BFC2C5] uppercase">
            06 // EDUCATION & CREDENTIALS
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase max-w-5xl leading-[1.02] mb-16"
        >
          FOUNDATIONS <br />
          <span className="font-normal italic text-gradient">& EXCELLENCE.</span>
        </motion.h2>

        {/* Clean Editorial Education and Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {educationAndHonors.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="group relative rounded-2xl border border-white/15 bg-[#0b0c10] p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-white/40 hover:bg-[#101217] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]"
            >
              {/* Top Row: Icon Badge & Category */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-full border border-white/20 bg-[#16171d] flex items-center justify-center text-white group-hover:scale-105 group-hover:border-white/80 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                    {item.category === 'EDUCATION' ? (
                      <GraduationCap className="w-6 h-6 text-white" />
                    ) : item.category === 'CERTIFICATION' ? (
                      <Award className="w-6 h-6 text-white" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-[#BFC2C5] uppercase px-3 py-1 rounded-full border border-white/15 bg-white/5">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-light text-white tracking-tight group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-xs tracking-wider text-[#BFC2C5] uppercase mt-1">
                  {item.institution}
                </p>
                <p className="text-xs text-[#9CA3AF] font-light mt-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Row: Period / Year & Verification */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-white uppercase">
                  {item.periodOrYear}
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#777777] uppercase">
                  AUTHENTICATED RECORD
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
