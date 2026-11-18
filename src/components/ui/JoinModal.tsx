import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, CheckCircle2, Download, Mail, ExternalLink } from 'lucide-react'
import { personalProfile } from '../../data/resumeData'

interface JoinModalProps {
  isOpen: boolean
  onClose: () => void
}

const engagementTypes = [
  { id: 'fulltime', title: 'FULL-TIME SOFTWARE ENGINEER', desc: 'AI Systems, Backend Services, Full-Stack Architecture' },
  { id: 'contract', title: 'CONTRACT & HIGH-SPEED BUILD', desc: 'SaaS MVP Development, Next.js Platforms, WebGL 3D' },
  { id: 'advisory', title: 'AI & TECHNICAL ADVISORY', desc: 'LLM Fine-tuning, RAG System Design, Cloud Optimization' },
]

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [selectedType, setSelectedType] = useState('fulltime')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleOrProject: '',
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
      setSubmitted(false)
      onClose()
    }, 2800)
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
            className="relative w-full max-w-2xl bg-[#0c0d10] border border-white/15 p-6 sm:p-10 rounded-2xl shadow-2xl text-white max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:border-white text-[#BFC2C5] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-16 flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-white animate-bounce" />
                <h3 className="font-display text-3xl font-light text-white">
                  INQUIRY RECORDED
                </h3>
                <p className="text-sm text-[#BFC2C5] font-light max-w-md">
                  Thank you for your interest in collaborating with {personalProfile.name}. I will review your inquiry and follow up promptly.
                </p>
              </div>
            ) : (
              <div>
                {/* Header Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#BFC2C5] uppercase">
                    RESUME DOSSIER // HIRE INQUIRY
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">
                  GET RESUME & WORK TOGETHER
                </h2>

                <p className="text-xs sm:text-sm text-[#9CA3AF] font-light mt-2 leading-relaxed">
                  Download my official CV, explore my technical repositories, or submit a role or project opportunity directly.
                </p>

                {/* Direct Action Bar: Download PDF & GitHub */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 pt-4 border-t border-white/10">
                  <a
                    href={personalProfile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                      <div>
                        <span className="font-mono text-xs font-semibold block uppercase">
                          DOWNLOAD RESUME
                        </span>
                        <span className="text-[10px] text-[#888890] group-hover:text-black/70">
                          PDF Format // Up to date
                        </span>
                      </div>
                    </div>
                    <Download className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                  </a>

                  <a
                    href={personalProfile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLink className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                      <div>
                        <span className="font-mono text-xs font-semibold block uppercase">
                          GITHUB PROFILE
                        </span>
                        <span className="text-[10px] text-[#888890] group-hover:text-black/70">
                          @ssh-gaurav // Repositories
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                  </a>
                </div>

                {/* Engagement Type Selector */}
                <div className="space-y-2 mb-6">
                  <span className="font-mono text-[10px] tracking-widest text-[#BFC2C5] uppercase block mb-1">
                    SELECT ENGAGEMENT TYPE
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {engagementTypes.map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedType === type.id
                            ? 'bg-white/10 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                            : 'bg-white/[0.02] border-white/10 text-[#888890] hover:border-white/30'
                        }`}
                      >
                        <h4 className="font-mono text-[10px] uppercase font-semibold leading-tight mb-1 text-white">
                          {type.title}
                        </h4>
                        <p className="text-[10px] text-[#888890] leading-snug">
                          {type.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Inquiry Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] tracking-wider uppercase text-[#BFC2C5] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] tracking-wider uppercase text-[#BFC2C5] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-[#BFC2C5] mb-1">
                      Organization / Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Tech Inc. / Startup Labs"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] tracking-wider uppercase text-[#BFC2C5] mb-1">
                      Role Details or Project Scope
                    </label>
                    <textarea
                      rows={3}
                      value={formData.roleOrProject}
                      onChange={(e) => setFormData({ ...formData, roleOrProject: e.target.value })}
                      placeholder="Tell me a bit about the role, stack, or timeline..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white transition-colors font-mono resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a
                      href={`mailto:${personalProfile.email}`}
                      className="text-xs font-mono text-[#888890] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{personalProfile.email}</span>
                    </a>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#E5E7EB] transition-all cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
