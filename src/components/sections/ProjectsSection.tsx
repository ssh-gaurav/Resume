import { motion } from 'framer-motion'
import { ArrowUpRight, Activity } from 'lucide-react'
import { GithubIcon } from '../ui/Icons'

interface Project {
  id: string
  title: string
  category: string
  description: string
  techStack: string[]
  stats: string
  year: string
  link: string
  github: string
  visualStyle: string
}

const projects: Project[] = [
  {
    id: 'neuromorph',
    title: 'NeuroMorph',
    category: 'ROBOTIC DIFFUSION & EMBODIED AI',
    description:
      'Real-time 3D conditional diffusion policy generator for dexterous robotic manipulation. Translates natural language directives into smooth 6-DoF trajectory manifolds in sub-12ms.',
    techStack: ['PyTorch', 'MuJoCo', 'Flow-Matching', 'CUDA', 'ROS 2'],
    stats: '12ms Latency // 98.4% Task Success',
    year: '2026',
    link: '#neuromorph',
    github: 'https://github.com',
    visualStyle: 'bg-gradient-to-br from-[#1a1c22] via-[#101116] to-[#07080a]',
  },
  {
    id: 'aetheria',
    title: 'Aetheria-7B',
    category: 'QUANTIZED EDGE REASONING ENGINE',
    description:
      'An ultra-low bit-width quantized foundation model optimized for mobile robotics and edge accelerators. Implements custom 2.3-bit ternary weight matrices with zero perplexity degradation.',
    techStack: ['Triton', 'C++20', 'FP8 Kernel', 'Llama Architecture'],
    stats: '142 tokens/sec on Raspberry Pi 5',
    year: '2025',
    link: '#aetheria',
    github: 'https://github.com',
    visualStyle: 'bg-gradient-to-br from-[#181a20] via-[#0e1014] to-[#060709]',
  },
  {
    id: 'synapse-vision',
    title: 'Synapse 3D',
    category: 'NEURAL RADIANCE & SPATIAL GAUSSIAN SPLATS',
    description:
      'Continuous volumetric neural scene understanding pipeline. Synthesizes full campus 3D scans into millimeter-accurate Gaussian splats in near-instantaneous flight sweeps.',
    techStack: ['3DGS', 'CUDA Kernels', 'WebGL', 'Three.js', 'PyTorch'],
    stats: '120 FPS Real-time WebGL Splatting',
    year: '2025',
    link: '#synapse',
    github: 'https://github.com',
    visualStyle: 'bg-gradient-to-br from-[#1d1f26] via-[#121319] to-[#07080a]',
  },
  {
    id: 'omniagent',
    title: 'OmniSwarm',
    category: 'AUTONOMOUS MULTI-AGENT COORDINATION',
    description:
      'Asynchronous peer-to-peer synthetic agent swarm capable of executing parallel scientific code synthesis, test verification, and automated peer review simulations.',
    techStack: ['TypeScript', 'Rust', 'Async Engine', 'Vector Embeddings'],
    stats: '10,000+ Concurrent Agent Nodes',
    year: '2026',
    link: '#omniagent',
    github: 'https://github.com',
    visualStyle: 'bg-gradient-to-br from-[#191b22] via-[#0f1115] to-[#050608]',
  },
]

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
            04 // STUDENT LAB ARTIFACTS
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase max-w-5xl leading-[1.02] mb-16"
        >
          IDEAS INTO <br />
          <span className="font-normal italic text-gradient">REALITY.</span>
        </motion.h2>

        {/* Large Visual Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((proj, idx) => (
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
                  <span className="font-mono text-xs text-white">ARCHIVE #{proj.year}</span>
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
                    className="p-2.5 rounded-full bg-white text-black hover:bg-[#E0E2E5] transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    title="Explore Project"
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Graphic Wireframe preview simulation */}
              <div className="relative z-10 h-44 w-full rounded-xl border border-white/10 bg-[#050507]/80 flex items-center justify-center p-6 mb-8 group-hover:border-white/25 transition-colors overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="flex items-center gap-2 font-mono text-xs text-white/90 mb-2">
                    <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
                    <span>BENCHMARK TELEMETRY</span>
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
      </div>
    </section>
  )
}
