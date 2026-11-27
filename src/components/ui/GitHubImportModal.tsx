import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Plus, Check, Loader2, Link2, Star, GitFork, AlertCircle } from 'lucide-react'
import { GithubIcon } from './Icons'
import type { ResumeProject } from '../../data/resumeData'
import {
  fetchUserGitHubRepos,
  fetchSingleGitHubRepo,
  mapGitHubRepoToProject,
  parseGitHubRepoInput,
  type GitHubRepoRaw,
} from '../../utils/githubProjects'

interface GitHubImportModalProps {
  isOpen: boolean
  onClose: () => void
  defaultUsername: string
  existingProjects: ResumeProject[]
  onAddProject: (project: ResumeProject) => void
  onRemoveProject: (id: string) => void
}

export function GitHubImportModal({
  isOpen,
  onClose,
  defaultUsername,
  existingProjects,
  onAddProject,
  onRemoveProject,
}: GitHubImportModalProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'url'>('browse')

  // Browse tab state
  const [username, setUsername] = useState(defaultUsername)
  const [repos, setRepos] = useState<GitHubRepoRaw[]>([])
  const [loadingRepos, setLoadingRepos] = useState(false)
  const [browseError, setBrowseError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // URL tab state
  const [repoInput, setRepoInput] = useState('')
  const [loadingUrl, setLoadingUrl] = useState(false)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [draftProject, setDraftProject] = useState<ResumeProject | null>(null)

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

  const hasLoadedInitialRef = useRef(false)

  const loadReposForUser = useCallback(async (targetUser: string) => {
    setLoadingRepos(true)
    setBrowseError(null)
    try {
      const fetched = await fetchUserGitHubRepos(targetUser)
      setRepos(fetched)
    } catch (err) {
      setBrowseError(err instanceof Error ? err.message : 'Failed to load repositories.')
      setRepos([])
    } finally {
      setLoadingRepos(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen && !hasLoadedInitialRef.current) {
      hasLoadedInitialRef.current = true
      void loadReposForUser(defaultUsername)
    }
  }, [isOpen, defaultUsername, loadReposForUser])

  const handleFetchByUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    setUrlError(null)
    const parsed = parseGitHubRepoInput(repoInput)
    if (!parsed) {
      setUrlError('Enter a valid GitHub URL (https://github.com/owner/repo) or owner/repo.')
      return
    }

    setLoadingUrl(true)
    try {
      const { repo, languages } = await fetchSingleGitHubRepo(parsed.owner, parsed.repo)
      const mapped = mapGitHubRepoToProject(repo, existingProjects.length, languages)
      setDraftProject(mapped)
    } catch (err) {
      setUrlError(err instanceof Error ? err.message : 'Failed to fetch repository.')
      setDraftProject(null)
    } finally {
      setLoadingUrl(false)
    }
  }

  const handleAddDraft = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draftProject) return
    onAddProject(draftProject)
    setDraftProject(null)
    setRepoInput('')
    onClose()
  }

  const isRepoAdded = (repo: GitHubRepoRaw) =>
    existingProjects.some(
      (p) => p.id === `gh-${repo.id}` || p.github.toLowerCase() === repo.html_url.toLowerCase()
    )

  const filteredRepos = repos.filter((r) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      r.name.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.language && r.language.toLowerCase().includes(q))
    )
  })

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
            className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#0d0d0f] border border-white/15 p-6 sm:p-8 rounded-2xl shadow-2xl text-white"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:border-white text-[#BFC2C5] hover:text-white transition-colors cursor-pointer"
              aria-label="Close GitHub importer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-10">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#BFC2C5] uppercase block mb-1">
                LIVE REPOSITORY SYNC // GITHUB API
              </span>
              <h3 className="font-display text-2xl font-light text-white flex items-center gap-2.5">
                <GithubIcon className="w-5 h-5" />
                <span>IMPORT PROJECT FROM GITHUB</span>
              </h3>
              <p className="text-xs text-[#888890] mt-1 font-light">
                Pick any repository from your GitHub profile or paste a repository URL to add it directly to your resume.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-5">
              <button
                type="button"
                onClick={() => setActiveTab('browse')}
                className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'browse'
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#BFC2C5] hover:text-white'
                }`}
              >
                Browse GitHub Repos
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#BFC2C5] hover:text-white'
                }`}
              >
                Paste Repo URL
              </button>
            </div>

            {/* Tab 1: Browse GitHub Repos */}
            {activeTab === 'browse' && (
              <div className="flex flex-col flex-1 min-h-0 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      loadReposForUser(username)
                    }}
                    className="flex gap-2 flex-1"
                  >
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="GitHub username (e.g. ssh-gaurav)"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white font-mono"
                    />
                    <button
                      type="submit"
                      disabled={loadingRepos}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white hover:text-black border border-white/15 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loadingRepos ? 'Loading...' : 'Fetch'}
                    </button>
                  </form>

                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-[#888890] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter repos..."
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white font-mono"
                    />
                  </div>
                </div>

                {browseError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-200 flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{browseError}</span>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-[240px] max-h-[420px]">
                  {loadingRepos ? (
                    <div className="h-48 flex flex-col items-center justify-center text-[#888890] gap-2 font-mono text-xs">
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>FETCHING REPOSITORIES FROM GITHUB...</span>
                    </div>
                  ) : filteredRepos.length === 0 ? (
                    <div className="h-40 flex items-center justify-center text-[#888890] font-mono text-xs">
                      No matching public repositories found.
                    </div>
                  ) : (
                    filteredRepos.map((repo, idx) => {
                      const added = isRepoAdded(repo)
                      return (
                        <div
                          key={repo.id}
                          className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/25 transition-all flex items-start justify-between gap-4"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-mono text-sm text-white font-medium truncate">
                                {repo.name}
                              </span>
                              {repo.language && (
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-[#BFC2C5]">
                                  {repo.language}
                                </span>
                              )}
                              {repo.fork && (
                                <span className="px-2 py-0.5 rounded-full border border-white/10 text-[10px] font-mono text-[#888890]">
                                  FORK
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#9CA3AF] line-clamp-2 font-light">
                              {repo.description || 'No description provided on GitHub.'}
                            </p>
                            <div className="flex items-center gap-3 mt-2 font-mono text-[10px] text-[#888890]">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" /> {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork className="w-3 h-3" /> {repo.forks_count}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (added) {
                                onRemoveProject(`gh-${repo.id}`)
                              } else {
                                onAddProject(
                                  mapGitHubRepoToProject(repo, existingProjects.length + idx)
                                )
                              }
                            }}
                            className={`px-3.5 py-2 rounded-full font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                              added
                                ? 'bg-white text-black font-semibold hover:bg-red-100'
                                : 'border border-white/20 text-white hover:bg-white hover:text-black'
                            }`}
                          >
                            {added ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Paste Repo URL */}
            {activeTab === 'url' && (
              <div className="space-y-4 overflow-y-auto pr-1">
                <form onSubmit={handleFetchByUrl} className="flex gap-2">
                  <div className="relative flex-1">
                    <Link2 className="w-4 h-4 text-[#888890] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={repoInput}
                      onChange={(e) => setRepoInput(e.target.value)}
                      placeholder="https://github.com/ssh-gaurav/RogueAI or owner/repo"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loadingUrl}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#E0E2E5] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loadingUrl ? 'Fetching...' : 'Fetch'}
                  </button>
                </form>

                {urlError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-200 flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{urlError}</span>
                  </div>
                )}

                {draftProject && (
                  <form
                    onSubmit={handleAddDraft}
                    className="p-5 rounded-xl border border-white/15 bg-white/[0.03] space-y-3.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#BFC2C5] mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          required
                          value={draftProject.title}
                          onChange={(e) =>
                            setDraftProject({ ...draftProject, title: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#BFC2C5] mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          required
                          value={draftProject.category}
                          onChange={(e) =>
                            setDraftProject({ ...draftProject, category: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-[#BFC2C5] mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={draftProject.description}
                        onChange={(e) =>
                          setDraftProject({ ...draftProject, description: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#BFC2C5] mb-1">
                          Telemetry / Stats Badge
                        </label>
                        <input
                          type="text"
                          value={draftProject.stats}
                          onChange={(e) =>
                            setDraftProject({ ...draftProject, stats: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-[#BFC2C5] mb-1">
                          Live URL
                        </label>
                        <input
                          type="url"
                          value={draftProject.link}
                          onChange={(e) =>
                            setDraftProject({ ...draftProject, link: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#E0E2E5] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project to Resume</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
