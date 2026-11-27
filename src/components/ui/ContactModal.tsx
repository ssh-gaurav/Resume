import { useScrollLock } from '../../hooks/useScrollLock'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Mail } from 'lucide-react'
import { personalProfile } from '../../data/resumeData'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-time / Project Opportunity',
    message: '',
  })

  useScrollLock(isOpen)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-lenis-prevent
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
            className="relative max-h-[90dvh] overflow-y-auto overscroll-contain w-full max-w-lg bg-[#0d0d0f] border border-white/15 p-6 sm:p-8 rounded-2xl shadow-2xl text-white"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:border-white text-[#BFC2C5] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-white animate-bounce" />
                <h3 className="font-display text-2xl font-light text-white">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="text-sm text-[#BFC2C5] font-light max-w-sm">
                  Thank you for reaching out. I usually review and respond to inquiries within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#BFC2C5] uppercase block mb-1">
                    Get in touch
                  </span>
                  <h3 className="font-display text-2xl font-light text-white">
                    LET'S CONNECT
                  </h3>
                  <p className="text-xs text-[#888890] mt-1 font-light">
                    Have an opportunity, proposal, or want to discuss technical systems? Send a message directly to {personalProfile.name}.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-[#BFC2C5] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe / Engineering Team"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-[#BFC2C5] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-[#BFC2C5] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#13141a] border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors font-mono"
                    >
                      <option>Full-Time Engineering Role</option>
                      <option>Contract / Consulting Project</option>
                      <option>AI / Machine Learning Collaboration</option>
                      <option>Technical Advisory</option>
                      <option>General Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-[#BFC2C5] mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Brief overview of the project, role, or discussion topic..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors font-mono resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href={`mailto:${personalProfile.email}`}
                    className="text-xs font-mono text-[#888890] hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Or email directly</span>
                  </a>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#E5E7EB] transition-all cursor-pointer active:scale-95"
                  >
                    <span>TRANSMIT MESSAGE</span>
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
