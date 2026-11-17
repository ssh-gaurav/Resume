import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react'

interface EventItem {
  id: string
  title: string
  type: 'HACKATHON' | 'WORKSHOP' | 'COMPETITION' | 'BOOTCAMP' | 'GUEST LECTURE'
  date: string
  location: string
  capacity: string
  status: 'REGISTRATIONS OPEN' | 'UPCOMING' | 'ARCHIVED'
  description: string
  speakerOrHost: string
}

const events: EventItem[] = [
  {
    id: 'hackathon-2026',
    title: 'SYNTHESIS 2026: 48H Autonomous AI Hackathon',
    type: 'HACKATHON',
    date: 'NOV 14 - 16, 2026',
    location: 'CAMPUS INNOVATION ARENA + DISCORD',
    capacity: '600 HACKERS // $25,000 PRIZE POOL',
    status: 'REGISTRATIONS OPEN',
    description:
      'Our flagship 48-hour build sprint. Teams build unconstrained autonomous multi-agent swarms, embodied vision systems, and edge LLMs with direct cloud compute sponsorship.',
    speakerOrHost: 'Organized with Google DeepMind & NVIDIA Fellows',
  },
  {
    id: 'transformers-scratch',
    title: 'Transformers & FlashAttention from Scratch in CUDA',
    type: 'WORKSHOP',
    date: 'DEC 02, 2026',
    location: 'AUDITORIUM LAB 302',
    capacity: '120 ATTENDEES',
    status: 'UPCOMING',
    description:
      'Intensive low-level systems engineering workshop. Write memory-coalesced CUDA kernels, implement fused attention, and profile warp divergence with Nsight Compute.',
    speakerOrHost: 'Host: Systems Architecture Lead',
  },
  {
    id: 'guest-lecture-alignment',
    title: 'Mechanistic Interpretability & Latent Geometry',
    type: 'GUEST LECTURE',
    date: 'DEC 12, 2026',
    location: 'HYBRID // TURING HALL & STREAM',
    capacity: '400 ATTENDEES',
    status: 'UPCOMING',
    description:
      'Exploring how representations form in transformer hidden layers, sparse autoencoders, and dictionary learning methods for model steerability.',
    speakerOrHost: 'Guest Speaker: Senior Research Scientist, AI Alignment Lab',
  },
  {
    id: 'bootcamp-foundations',
    title: 'Winter Neural Foundations Bootcamp',
    type: 'BOOTCAMP',
    date: 'JAN 08 - 15, 2027',
    location: 'AI CLUB LAB + VIRTUAL WORKSTATIONS',
    capacity: '80 SELECTED COHORT',
    status: 'UPCOMING',
    description:
      'A 1-week intensive bridge for freshmen and sophomores covering PyTorch fundamentals, backprop calculus, CNNs, and attention mechanics.',
    speakerOrHost: 'Mentored by Senior Nexus Researchers',
  },
]

export function EventsSection() {
  const [rsvpSuccess, setRsvpSuccess] = useState<string | null>(null)

  const handleRsvp = (id: string) => {
    setRsvpSuccess(id)
    setTimeout(() => setRsvpSuccess(null), 3000)
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
            05 // CONVERGENCE & FORUMS
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase max-w-5xl leading-[1.02] mb-16"
        >
          WHERE IDEAS <br />
          <span className="font-normal italic text-gradient">COME TO LIFE.</span>
        </motion.h2>

        {/* Editorial Events List */}
        <div className="space-y-6">
          {events.map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              className="group relative rounded-2xl border border-white/15 bg-[#0e0e14]/80 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-300 hover:border-white/40 hover:bg-[#12131b] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]"
            >
              {/* Left Column: Date & Type */}
              <div className="lg:w-1/4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                <span className="font-mono text-[11px] tracking-[0.25em] text-[#BFC2C5] uppercase">
                  {ev.type}
                </span>
                <p className="font-display text-2xl sm:text-3xl font-light text-white tracking-tight mt-2">
                  {ev.date}
                </p>
                <div className="mt-4 inline-flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${ev.status === 'REGISTRATIONS OPEN' ? 'bg-white shadow-[0_0_8px_#ffffff] animate-pulse' : 'bg-white/40'}`} />
                  <span className="font-mono text-[10px] tracking-widest text-[#BFC2C5] uppercase">
                    {ev.status}
                  </span>
                </div>
              </div>

              {/* Middle Column: Details & Manifesto */}
              <div className="lg:w-1/2 space-y-3">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-normal text-white tracking-tight group-hover:text-white transition-colors">
                  {ev.title}
                </h3>
                <p className="text-sm text-[#D1D5DB] font-light leading-relaxed">
                  {ev.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#888890] pt-2">
                  <span className="flex items-center gap-1.5 text-[#BFC2C5]">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                    {ev.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#BFC2C5]">
                    <Users className="w-3.5 h-3.5 text-white" />
                    {ev.capacity}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#A1A1AA]">
                  // {ev.speakerOrHost}
                </p>
              </div>

              {/* Right Column: RSVP / Action button */}
              <div className="lg:w-1/4 flex lg:justify-end items-center">
                {rsvpSuccess === ev.id ? (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white font-mono text-xs text-white">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>SEAT CONFIRMED</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRsvp(ev.id)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#E5E7EB] hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer"
                  >
                    <span>RSVP ACCESS</span>
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
