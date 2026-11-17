import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Eye,
  MessageSquare,
  Bot,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
} from 'lucide-react'

interface DomainItem {
  id: string
  title: string
  category: string
  dimension: string
  description: string
  coreTech: string[]
  icon: any
  visualGeometry: string
}

const domains: DomainItem[] = [
  {
    id: 'genai',
    title: 'Generative AI & Diffusion',
    category: 'SYNTHESIS & LATENT MANIFOLDS',
    dimension: 'DIMENSION 01 // LATENT',
    description:
      'Exploring conditional score-based diffusion, latent consistency models, flow matching, and autoregressive multi-modal architectures for rapid creative synthesis.',
    coreTech: ['Flow Matching', 'SDXL', 'Latent Diffusion', 'Transformer Decoders'],
    icon: Sparkles,
    visualGeometry: 'TORUS_KNOT',
  },
  {
    id: 'llm_nlp',
    title: 'Natural Language Processing',
    category: 'SEMANTIC REASONING',
    dimension: 'DIMENSION 02 // EMBEDDINGS',
    description:
      'Developing quantized reasoning pipelines, parameter-efficient fine-tuning (LoRA/QLoRA), retrieval-augmented generation (RAG), and agentic memory buffers.',
    coreTech: ['Llama-3 Fine-tuning', 'Vector Indices', 'FlashAttention-3', 'Chain-of-Thought'],
    icon: MessageSquare,
    visualGeometry: 'HYPERCUBE',
  },
  {
    id: 'cv',
    title: 'Computer Vision & NeRFs',
    category: 'SPATIAL RECONSTRUCTION',
    dimension: 'DIMENSION 03 // VOXELS',
    description:
      'Transforming 2D imagery into continuous 3D neural radiance fields, 3D Gaussian Splatting, zero-shot segmentation, and real-time edge object tracking.',
    coreTech: ['Gaussian Splatting', 'Segment Anything 2', 'NeRFs', 'Spatial Pose Estimators'],
    icon: Eye,
    visualGeometry: 'ICOSAHEDRON',
  },
  {
    id: 'robotics',
    title: 'Autonomous Robotics',
    category: 'EMBODIED COGNITION',
    dimension: 'DIMENSION 04 // ACTUATION',
    description:
      'Synthesizing computer vision with reinforcement learning to orchestrate legged robotics, robotic manipulators, and autonomous micro-drones.',
    coreTech: ['ROS 2', 'MuJoCo Sim', 'PPO Reinforcement', 'Jetson Orin Compute'],
    icon: Bot,
    visualGeometry: 'GYROSCOPE',
  },
  {
    id: 'deep_learning',
    title: 'Deep Learning & CUDA',
    category: 'HIGH-PERFORMANCE COMPUTE',
    dimension: 'DIMENSION 05 // TENSORS',
    description:
      'Benchmarking custom Triton and CUDA kernels, tensor parallel training rigs, FP8 quantization schemes, and gradient descent optimization research.',
    coreTech: ['PyTorch 2.5', 'CUDA 12', 'Triton Kernels', 'Distributed FSDP'],
    icon: Layers,
    visualGeometry: 'OCTAHEDRON',
  },
  {
    id: 'ml_ai',
    title: 'Machine Learning Theory',
    category: 'STATISTICAL FOUNDATIONS',
    dimension: 'DIMENSION 06 // PROBABILITY',
    description:
      'Investigating loss surface geometries, generalization bounds, information theory in representations, and interpretable mechanistic interpretability.',
    coreTech: ['Information Theory', 'Mechanistic Circuits', 'Bayesian ML', 'Kernel Methods'],
    icon: Brain,
    visualGeometry: 'DODECAHEDRON',
  },
]

export function DomainsSection() {
  const [activeDomain, setActiveDomain] = useState<DomainItem>(domains[0])

  return (
    <section id="domains" className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-16 bg-[#060709] text-white border-t border-white/10 overflow-hidden">
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
            03 // TECHNICAL RESEARCH TRACKS
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase max-w-5xl leading-[1.02] mb-12"
        >
          INTELLIGENCE HAS <br />
          <span className="font-normal italic text-gradient">MANY DIMENSIONS.</span>
        </motion.h2>

        {/* Interactive Dimensional Environment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Domain Navigation List */}
          <div className="lg:col-span-5 flex flex-col space-y-2.5">
            {domains.map((item, idx) => {
              const Icon = item.icon
              const isActive = activeDomain.id === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveDomain(item)}
                  className={`group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-white/[0.08] border-white/80 text-white shadow-[0_0_35px_rgba(255,255,255,0.08)] translate-x-1'
                      : 'bg-[#0e0f14]/60 border-white/5 text-[#BFC2C5] hover:border-white/25 hover:bg-[#13141a] hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#777777] group-hover:text-white transition-colors">
                        0{idx + 1}
                      </span>
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-[#777777] group-hover:text-white'}`} />
                      <h4 className="font-display text-lg sm:text-xl font-normal tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? 'translate-x-1 text-white opacity-100'
                          : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-[#777777] uppercase mt-1 pl-7">
                    {item.category}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Right: 3D Holographic Dimension Visualizer for the Selected Domain */}
          <div className="lg:col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-[#111218] to-[#08090c] p-8 sm:p-10 shadow-2xl overflow-hidden"
              >
                {/* Visual coordinate badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                    <span className="font-mono text-xs tracking-widest text-white uppercase">
                      {activeDomain.dimension}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#777777] uppercase">
                    RENDER PROTOCOL // ACTIVE
                  </span>
                </div>

                {/* Holographic Wireframe Geometric Centerpiece */}
                <div className="relative h-64 sm:h-72 w-full flex items-center justify-center border border-white/10 rounded-xl bg-[#06070a]/90 mb-8 overflow-hidden">
                  {/* Decorative dimensional rings */}
                  <div className="absolute w-52 h-52 rounded-full border border-white/15 animate-[spin_24s_linear_infinite]" />
                  <div className="absolute w-68 h-68 rounded-full border border-dashed border-white/10 animate-[spin_40s_linear_infinite_reverse]" />
                  <div className="absolute w-36 h-36 rounded-full border border-white/20 animate-pulse" />

                  {/* Wireframe geometric polyhedron glyph */}
                  <div className="relative z-10 flex flex-col items-center">
                    <activeDomain.icon className="w-16 h-16 text-white stroke-[1.2] drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] animate-bounce" />
                    <span className="font-mono text-[11px] tracking-[0.3em] text-[#BFC2C5] uppercase mt-4">
                      {activeDomain.visualGeometry} // GEOMETRIC CORE
                    </span>
                  </div>

                  {/* Subtle corner crosshairs */}
                  <div className="absolute top-3 left-3 text-white/30 font-mono text-[10px]">+</div>
                  <div className="absolute top-3 right-3 text-white/30 font-mono text-[10px]">+</div>
                  <div className="absolute bottom-3 left-3 text-white/30 font-mono text-[10px]">+</div>
                  <div className="absolute bottom-3 right-3 text-white/30 font-mono text-[10px]">+</div>
                </div>

                {/* Detailed Domain Insights */}
                <div className="space-y-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-white">
                    {activeDomain.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#D1D5DB] font-light leading-relaxed">
                    {activeDomain.description}
                  </p>

                  <div className="pt-4 border-t border-white/10">
                    <h5 className="font-mono text-[10px] tracking-widest text-[#BFC2C5] uppercase mb-3 flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-white" />
                      SPECIALIZED TOOLCHAIN & PRIMITIVES
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {activeDomain.coreTech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-[#E5E7EB] hover:border-white/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
