import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2 } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Collaboration',
    message: '',
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
    setTimeout(() => {
      // Keep state clear after closing
    }, 2500)
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
            className="relative w-full max-w-lg bg-[#0d0d0f] border border-white/15 p-6 sm:p-8 rounded-2xl shadow-2xl text-white"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-[#777777] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#777777] uppercase block mb-1">
                // TRANSMISSION TERMINAL
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-white">
                LET'S TALK.
              </h3>
              <p className="text-xs text-[#BFC2C5] mt-1">
                Connect with our lab leads for research partnerships, hackathons, or sponsorships.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <CheckCircle2 className="w-12 h-12 text-white mb-4 animate-bounce" />
                <h4 className="font-display text-xl text-white mb-2">SIGNAL TRANSMITTED</h4>
                <p className="text-xs text-[#BFC2C5] max-w-xs font-mono">
                  Your message has reached the core server. Our team will decrypt and respond within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs tracking-wider uppercase hover:bg-[#BFC2C5] transition-colors"
                >
                  RETURN TO BASE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                    NAME / AFFILIATION
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. John Doe / Stanford AI Lab"
                    className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                    COMMUNICATION CHANNEL (EMAIL)
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@institution.edu"
                    className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                    TOPIC
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
                  >
                    <option value="Project Collaboration">Research Collaboration</option>
                    <option value="Sponsorship & Hackathon">Hackathon Sponsorship</option>
                    <option value="Guest Lecture">Guest Lecture & Mentorship</option>
                    <option value="General Inquiry">General Query</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#777777] mb-1.5">
                    MESSAGE PAYLOAD
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detail your inquiry or collaboration proposal..."
                    className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-full border border-white/15 text-xs font-mono tracking-wider uppercase text-[#BFC2C5] hover:text-white hover:border-white/30 transition-colors"
                  >
                    ABORT
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#BFC2C5] active:scale-95 transition-all"
                  >
                    <span>TRANSMIT</span>
                    <Send className="w-3.5 h-3.5" />
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
