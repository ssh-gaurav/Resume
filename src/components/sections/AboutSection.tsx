import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { NeuralNetwork3D } from '../3d/NeuralNetwork3D'
import { Network, ShieldCheck, Zap } from 'lucide-react'

export function AboutSection() {
  const stats = [
    { label: 'STUDENT RESEARCHERS', value: '450+', metric: 'ACTIVE MINDS' },
    { label: 'MODELS DEPLOYED', value: '38', metric: 'PRODUCTION SOTA' },
    { label: 'COMPUTE CLUSTERS', value: '1.2 PF', metric: 'GPU ACCELERATION' },
    { label: 'PAPERS & AWARDS', value: '19', metric: 'CONFERENCE PEER' },
  ]

  return (
    <section id="about" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-16 bg-[#050505] text-white border-t border-white/10 overflow-hidden">
      {/* Subtle ambient grid and decorative crosshairs */}
      <div className="absolute top-12 left-10 text-white/20 font-mono text-xs">+</div>
      <div className="absolute top-12 right-10 text-white/20 font-mono text-xs">+</div>
      <div className="absolute bottom-12 left-10 text-white/20 font-mono text-xs">+</div>

      {/* Atmospheric subtle radial glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-50" />
          </div>
          <span className="font-mono text-xs tracking-[0.3em] text-[#BFC2C5] uppercase">
            02 // IDENTITY & REASONING
          </span>
        </div>

        {/* Oversized Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase max-w-5xl leading-[1.02] mb-12"
        >
          WE EXPLORE <br />
          <span className="font-normal italic text-gradient">THE UNKNOWN.</span>
        </motion.h2>

        {/* Asymmetrical Grid: 3D Neural Network Simulation & Editorial Manifestos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Neural Network Canvas with glowing ambient container */}
          <div className="lg:col-span-6 relative h-[440px] sm:h-[520px] rounded-2xl border border-white/15 bg-[#090a0d] overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.03)] hover:border-white/30 transition-all duration-500">
            <div className="absolute top-4 left-5 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_#ffffff]" />
              <span className="font-mono text-[10px] tracking-widest text-[#BFC2C5] uppercase">
                LATENT TOPOLOGY // LIVE R3F
              </span>
            </div>

            <div className="absolute bottom-4 right-5 z-10 font-mono text-[9px] text-[#777777] tracking-widest uppercase bg-black/40 px-2 py-0.5 rounded border border-white/5 backdrop-blur-sm">
              INTERACTIVE SYNAPTIC GRAPH
            </div>

            {/* Interactive 3D Canvas */}
            <Canvas
              camera={{ position: [0, 0, 7.2], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.8} color="#FFFFFF" />
              <pointLight position={[0, 0, 2]} intensity={2.2} color="#E0E2E5" />
              <NeuralNetwork3D position={[0, 0, 0]} scale={0.95} />
            </Canvas>
          </div>

          {/* Right Column: Editorial Vision, Mission, Community */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="font-mono text-xs tracking-[0.25em] text-[#BFC2C5] uppercase flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-white" />
                OUR CORE MANIFESTO
              </h3>
              <p className="text-base sm:text-lg text-[#D1D5DB] font-light leading-relaxed">
                Nexus is not a standard computer club or paper reading circle. We operate as an autonomous student skunkworks incubator, synthesizing cutting-edge theory into tangible models, autonomous agents, and embodied intelligence.
              </p>
              <p className="text-sm text-[#9CA3AF] font-light leading-relaxed">
                From deciphering the loss landscapes of billion-parameter transformers to designing low-power edge vision microcontrollers, our members bridge academic rigor with unconstrained hacker creativity.
              </p>
            </motion.div>

            {/* Pillars with subtle glow and hover depth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-5 rounded-xl border border-white/10 bg-[#0e0f13] hover:border-white/30 hover:bg-[#13141a] transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]">
                <Zap className="w-4 h-4 text-white mb-2" />
                <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-1">
                  AUTONOMOUS RESEARCH
                </h4>
                <p className="text-xs text-[#888890] leading-relaxed">
                  Undergrads driving publishable investigations in diffusion, alignment, and cognitive architectures.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/10 bg-[#0e0f13] hover:border-white/30 hover:bg-[#13141a] transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]">
                <ShieldCheck className="w-4 h-4 text-white mb-2" />
                <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-1">
                  PRODUCTION SYSTEMS
                </h4>
                <p className="text-xs text-[#888890] leading-relaxed">
                  Deploying resilient inference pipelines and distributed nodes for real collegiate and civic challenges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col border-l border-white/15 pl-5 hover:border-white transition-colors duration-300"
            >
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-[11px] tracking-wider uppercase text-[#BFC2C5] mt-1">
                {stat.label}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#777777] uppercase mt-0.5">
                {stat.metric}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
