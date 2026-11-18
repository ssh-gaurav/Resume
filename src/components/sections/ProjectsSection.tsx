import { motion } from 'framer-motion'
import { ArrowUpRight, Activity, Plus } from 'lucide-react'
import { GithubIcon } from '../ui/Icons'
import { resumeProjects } from '../../data/resumeData'

export function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-16 bg-[#050505] text-white border-t border-white/10 overflow-hidden">
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
            04 // FEATURED WORKS & BUILDS
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase max-w-5xl leading-[1.02]"
          >
            ENGINEERED <br />
            <span className="font-normal italic text-gradient">INTO EXISTENCE.</span>
          </motion.h2>

          <p className="font-mono text-xs text-[#888890] max-w-sm tracking-wider uppercase">
            // SELECT PRODUCTION BUILDS, OPEN-SOURCE ENGINES & PROVABLE BENCHMARKS
          </p>
        </div>

        {/* Large Visual Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {resumeProjects.map((proj, idx) => (
            <motion.article
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              className="group relative rounded-2xl border border-white/15 bg-[#0b0c10] p-8 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)] hover:-translate-y-1"
            >
              {/* Visual Panel Background Sheen */}
              <div
                className={`absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none ${proj.visualStyle}`}
              />

              {/* Top metadata */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#BFC2C5] uppercase block">
                    {proj.category}
                  </span>
                  <span className="font-mono text-xs text-white">RELEASE #{proj.year}</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-white/15 hover:border-white hover:bg-white/15 transition-all text-[#BFC2C5] hover:text-white"
                    title="View Source on GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white text-black hover:bg-[#E0E2E5] transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    title="Explore Live Project"
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Graphic Wireframe preview simulation with telemetry */}
              <div className="relative z-10 h-44 w-full rounded-xl border border-white/10 bg-[#050507]/80 flex items-center justify-center p-6 mb-8 group-hover:border-white/25 transition-colors overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="flex items-center gap-2 font-mono text-xs text-white/90 mb-2">
                    <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
                    <span>PRODUCTION TELEMETRY</span>
                  </div>
                  <span className="font-mono text-sm sm:text-base text-white font-medium tracking-tight bg-black/40 px-3 py-1 rounded-md border border-white/10">
                    {proj.stats}
                  </span>
                </div>
              </div>

              {/* Project Title & Description */}
              <div className="relative z-10 space-y-4">
                <h3 className="font-display text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-white transition-colors">
                  {proj.title}
                </h3>
                <p className="text-sm text-[#D1D5DB] font-light leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[11px] text-[#BFC2C5] group-hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Tip Box for adding projects */}
        <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-[#08090c]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 border border-white/20 text-white">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <p className="font-mono text-xs text-white uppercase tracking-wider">
                Easily Add Your Own Projects
              </p>
              <p className="text-xs text-[#888890] mt-0.5">
                Add your repositories and descriptions to <code className="text-[#BFC2C5] font-mono">src/data/resumeData.ts</code>.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/ssh-gaurav"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>VIEW ALL ON GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
