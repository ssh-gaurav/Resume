import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Activity, Plus, RefreshCw, Trash2, Loader2 } from 'lucide-react'
import { GithubIcon } from '../ui/Icons'
import { GitHubImportModal } from '../ui/GitHubImportModal'
import { personalProfile, resumeProjects, type ResumeProject } from '../../data/resumeData'
import {
  extractGitHubUsername,
  fetchUserGitHubRepos,
  mapGitHubRepoToProject,
} from '../../utils/githubProjects'

const STORAGE_KEY = 'resume_github_projects_v1'

function readSavedProjects(): ResumeProject[] | null {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null
    const parsed = JSON.parse(saved) as ResumeProject[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null
  } catch {
    return null
  }
}

export function ProjectsSection() {
  const githubUsername = extractGitHubUsername(personalProfile.socials.github)

  const [initialSaved] = useState<ResumeProject[] | null>(() => readSavedProjects())
  const [projects, setProjects] = useState<ResumeProject[]>(() => initialSaved ?? [])
  const [isLoading, setIsLoading] = useState<boolean>(() => initialSaved === null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [syncSource, setSyncSource] = useState<'github' | 'saved' | 'fallback'>(() =>
    initialSaved ? 'saved' : 'github'
  )

  const persistProjects = useCallback((next: ResumeProject[]) => {
    setProjects(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Ignore storage quota errors
    }
  }, [])

  const syncFromGitHub = useCallback(
    async (replaceExisting = true) => {
      setIsSyncing(true)
      try {
        const repos = await fetchUserGitHubRepos(githubUsername)
        const nonForks = repos.filter((r) => !r.fork)
        const selected = (nonForks.length > 0 ? nonForks : repos).slice(0, 4)

        if (selected.length > 0) {
          const mapped = selected.map((repo, idx) => mapGitHubRepoToProject(repo, idx))
          if (replaceExisting) {
            persistProjects(mapped)
          }
          setSyncSource('github')
        } else if (replaceExisting) {
          setProjects((prev) => (prev.length === 0 ? resumeProjects : prev))
          setSyncSource('fallback')
        }
      } catch {
        if (replaceExisting) {
          setProjects((prev) => (prev.length === 0 ? resumeProjects : prev))
          setSyncSource('fallback')
        }
      } finally {
        setIsLoading(false)
        setIsSyncing(false)
      }
    },
    [githubUsername, persistProjects]
  )

  useEffect(() => {
    if (initialSaved !== null) return
    void syncFromGitHub(true)
  }, [initialSaved, syncFromGitHub])

  const handleAddProject = useCallback(
    (project: ResumeProject) => {
      const exists = projects.some(
        (p) => p.id === project.id || p.github.toLowerCase() === project.github.toLowerCase()
      )
      if (exists) return
      persistProjects([project, ...projects])
      setSyncSource('saved')
    },
    [projects, persistProjects]
  )

  const handleRemoveProject = useCallback(
    (id: string) => {
      const next = projects.filter((p) => p.id !== id)
      persistProjects(next)
      setSyncSource('saved')
    },
    [projects, persistProjects]
  )

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen py-24 sm:py-32 px-6 sm:px-10 md:px-16 bg-[#050505] text-white border-t border-white/10 overflow-hidden"
    >
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
            04 // FEATURED WORKS &amp; GITHUB BUILDS
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
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

          <div className="flex flex-col sm:items-end gap-3">
            <p className="font-mono text-xs text-[#888890] max-w-sm tracking-wider uppercase sm:text-right">
              // LIVE REPOSITORIES SYNCED FROM GITHUB ({githubUsername})
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#E0E2E5] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD FROM GITHUB</span>
              </button>
              <button
                type="button"
                onClick={() => syncFromGitHub(true)}
                disabled={isSyncing}
                className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                title="Reset and sync top repositories from GitHub"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'SYNCING...' : 'SYNC GITHUB'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="h-64 rounded-2xl border border-white/10 bg-[#0b0c10] flex flex-col items-center justify-center gap-3 text-[#BFC2C5] font-mono text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
            <span>LOADING LIVE REPOSITORIES FROM GITHUB...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="h-64 rounded-2xl border border-white/10 bg-[#0b0c10] flex flex-col items-center justify-center gap-4 text-center p-6">
            <p className="font-mono text-xs text-[#888890] uppercase tracking-wider">
              No projects selected yet.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#E0E2E5] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ADD PROJECT FROM GITHUB</span>
            </button>
          </div>
        ) : (
          /* Large Visual Panels Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((proj, idx) => (
              <motion.article
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                className="group relative rounded-2xl border border-white/15 bg-[#0b0c10] p-8 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)] hover:-translate-y-1"
              >
                {/* Visual Panel Background Sheen */}
                <div
                  className={`absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none ${proj.visualStyle}`}
                />

                {/* Top metadata */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                  <div className="min-w-0 pr-3">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[#BFC2C5] uppercase block truncate">
                      {proj.category}
                    </span>
                    <span className="font-mono text-xs text-white">RELEASE #{proj.year}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(proj.id)}
                      className="p-2.5 rounded-full border border-white/10 hover:border-red-400/50 hover:bg-red-500/10 text-[#888890] hover:text-red-300 transition-all opacity-70 group-hover:opacity-100 cursor-pointer"
                      title="Remove project from resume"
                      aria-label={`Remove ${proj.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
                      <span>GITHUB TELEMETRY</span>
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
        )}

        {/* Bottom Action Bar */}
        <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-[#08090c]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              aria-label="Add project from GitHub"
            >
              <Plus className="w-4 h-4" />
            </button>
            <div>
              <p className="font-mono text-xs text-white uppercase tracking-wider">
                Direct GitHub Integration Active ({syncSource === 'fallback' ? 'Offline Fallback' : 'Live API'})
              </p>
              <p className="text-xs text-[#888890] mt-0.5">
                Click <span className="text-[#BFC2C5] font-mono">ADD FROM GITHUB</span> to import any repository by username or URL.
              </p>
            </div>
          </div>
          <a
            href={personalProfile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>VIEW ALL ON GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* GitHub Importer Modal */}
      <GitHubImportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultUsername={githubUsername}
        existingProjects={projects}
        onAddProject={handleAddProject}
        onRemoveProject={handleRemoveProject}
      />
    </section>
  )
}
