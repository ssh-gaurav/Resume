import { motion } from 'framer-motion'
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../ui/Icons'

interface Member {
  name: string
  role: string
  focus: string
  avatarText: string
  category: 'LEADERSHIP' | 'RESEARCH' | 'SYSTEMS' | 'MENTOR'
  socials: { github?: string; twitter?: string; linkedin?: string }
}

const communityMembers: Member[] = [
  {
    name: 'Elena Rostova',
    role: 'CLUB PRESIDENT & RESEARCH LEAD',
    focus: 'Latent Diffusion, Generative Geometry',
    avatarText: 'ER',
    category: 'LEADERSHIP',
    socials: { github: 'https://github.com', twitter: 'https://x.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Marcus Vance',
    role: 'HEAD OF SYSTEMS & CUDA KERNELS',
    focus: 'Triton, Low-bit Quantization, Distributed ML',
    avatarText: 'MV',
    category: 'SYSTEMS',
    socials: { github: 'https://github.com', twitter: 'https://x.com' },
  },
  {
    name: 'Aria Thorne',
    role: 'ROBOTICS & EMBODIED AI LEAD',
    focus: '6-DoF Control, MuJoCo Sim-to-Real, ROS 2',
    avatarText: 'AT',
    category: 'RESEARCH',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Dr. Katherine Wells',
    role: 'FACULTY ADVISOR & RESEARCH MENTOR',
    focus: 'Computational Neuroscience & Alignment',
    avatarText: 'KW',
    category: 'MENTOR',
    socials: { twitter: 'https://x.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'David Chen',
    role: 'COMPUTER VISION RESEARCH FELLOW',
    focus: 'Gaussian Splats, Spatial NeRF Reconstruction',
    avatarText: 'DC',
    category: 'RESEARCH',
    socials: { github: 'https://github.com', twitter: 'https://x.com' },
  },
  {
    name: 'Zainab Al-Mansoor',
    role: 'NLP & MULTIMODAL ARCHITECT',
    focus: 'Agent Memory, Chain-of-Thought Quantization',
    avatarText: 'ZA',
    category: 'RESEARCH',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
  },
]

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
            06 // COLLECTIVE BRAIN TRUST
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase max-w-5xl leading-[1.02] mb-16"
        >
          BUILT BY <br />
          <span className="font-normal italic text-gradient">CURIOUS MINDS.</span>
        </motion.h2>

        {/* Clean Editorial Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {communityMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="group relative rounded-2xl border border-white/15 bg-[#0b0c10] p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-white/40 hover:bg-[#101217] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]"
            >
              {/* Top Row: Avatar Initials in Monochromatic Silver Ring & Category */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-full border border-white/20 bg-[#16171d] flex items-center justify-center font-display text-lg font-light text-white group-hover:scale-105 group-hover:border-white/80 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                    {member.avatarText}
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-[#BFC2C5] uppercase px-3 py-1 rounded-full border border-white/15 bg-white/5">
                    {member.category}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-white transition-colors">
                  {member.name}
                </h3>
                <p className="font-mono text-[10px] tracking-wider text-[#BFC2C5] uppercase mt-1">
                  {member.role}
                </p>
                <p className="text-xs text-[#9CA3AF] font-light mt-3 leading-relaxed">
                  Focus: {member.focus}
                </p>
              </div>

              {/* Bottom Row: Social Channels */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-widest text-[#777777] uppercase">
                  VERIFIED PROFILE
                </span>
                <div className="flex items-center gap-3">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-full text-[#BFC2C5] hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-full text-[#BFC2C5] hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-full text-[#BFC2C5] hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
