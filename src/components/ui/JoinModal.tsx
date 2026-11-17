import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Rocket, CheckCircle2 } from 'lucide-react'

interface JoinModalProps {
  isOpen: boolean
  onClose: () => void
}

const tracks = [
  { id: 'research', title: 'AI RESEARCH', desc: 'LLMs, Diffusion, Latent Architectures, Papers' },
  { id: 'engineering', title: 'SYSTEMS & MLOPS', desc: 'CUDA, Distributed Training, Edge Deployment' },
  { id: 'cv_robotics', title: 'VISION & ROBOTICS', desc: 'Spatial AI, Sensor Fusion, Embodied Agents' },
  { id: 'creative', title: 'CREATIVE & COMPUTE', desc: 'Generative Media, 3D Web, Shader Engineering' },
]

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [selectedTrack, setSelectedTrack] = useState('research')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    year: 'Sophomore',
    github: '',
    statement: '',
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#050505]/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#0c0d0f] border border-white/15 p-6 sm:p-8 rounded-2xl shadow-2xl text-white max-h-[92vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-[#777777] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#777777] uppercase block mb-1">
                // INITIATION PROTOCOL // BATCH 2026-27
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-white">
                JOIN THE AI CLUB.
              </h3>
              <p className="text-xs text-[#BFC2C5] mt-1">
                Step into the frontier. Open to all students passionate about machine intelligence.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <CheckCircle2 className="w-12 h-12 text-white mb-4 animate-bounce" />
                <h4 className="font-display text-xl text-white mb-2">APPLICATION LOGGED</h4>
                <p className="text-xs text-[#BFC2C5] max-w-xs font-mono">
                  Your profile has been queued in the evaluation pipeline. Check your inbox for the technical challenge invitation.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs tracking-wider uppercase hover:bg-[#BFC2C5] transition-colors"
                >
                  DISMISS
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Track selection */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-2">
                    SELECT SPECIALIZATION DOMAIN
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tracks.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTrack(t.id)}
                        className={`text-left p-3 rounded-xl border transition-all text-xs ${
                          selectedTrack === t.id
                            ? 'bg-white text-black border-white'
                            : 'bg-[#151515] text-[#BFC2C5] border-white/10 hover:border-white/30'
                        }`}
                      >
                        <p className="font-mono font-medium">{t.title}</p>
                        <p className={`text-[10px] mt-0.5 ${selectedTrack === t.id ? 'text-black/70' : 'text-[#777777]'}`}>
                          {t.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                      FULL NAME
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Alan Turing"
                      className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                      COLLEGE EMAIL
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@univ.edu"
                      className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                      ACADEMIC YEAR
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                    >
                      <option value="Freshman">Freshman (1st Year)</option>
                      <option value="Sophomore">Sophomore (2nd Year)</option>
                      <option value="Junior">Junior (3rd Year)</option>
                      <option value="Senior">Senior (4th Year)</option>
                      <option value="Graduate / PhD">Graduate / Postgrad / PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                      GITHUB / PORTFOLIO URL
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="https://github.com/username"
                      className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                    WHAT DO YOU WANT TO BUILD OR RESEARCH?
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    placeholder="Briefly describe your interests, projects, or papers you want to explore..."
                    className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-full border border-white/15 text-xs font-mono tracking-wider uppercase text-[#BFC2C5] hover:text-white hover:border-white/30 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#BFC2C5] active:scale-95 transition-all"
                  >
                    <span>SUBMIT DOSSIER</span>
                    <Rocket className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
