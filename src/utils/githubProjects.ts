import type { ResumeProject } from '../data/resumeData'

export interface GitHubRepoRaw {
  id: number
  name: string
  full_name: string
  html_url: string
  homepage: string | null
  description: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  forks_count: number
  fork: boolean
  updated_at: string
  created_at: string
}

const VISUAL_STYLES = [
  'bg-gradient-to-br from-[#1a1c22] via-[#101116] to-[#07080a]',
  'bg-gradient-to-br from-[#181a20] via-[#0e1014] to-[#060709]',
  'bg-gradient-to-br from-[#1d1f26] via-[#121319] to-[#07080a]',
  'bg-gradient-to-br from-[#191b22] via-[#0f1115] to-[#050608]',
]

export function extractGitHubUsername(githubUrl: string): string {
  try {
    const cleaned = githubUrl.trim().replace(/\/+$/, '')
    const parts = cleaned.split('/')
    return parts[parts.length - 1] || 'ssh-gaurav'
  } catch {
    return 'ssh-gaurav'
  }
}

export function parseGitHubRepoInput(input: string): { owner: string; repo: string } | null {
  const trimmed = input.trim().replace(/\.git$/i, '').replace(/\/+$/, '')
  if (!trimmed) return null

  // Match full URL like https://github.com/owner/repo or github.com/owner/repo
  const urlMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([^/\s]+)\/([^/\s]+)/i)
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2] }
  }

  // Match shorthand owner/repo
  const shortMatch = trimmed.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/)
  if (shortMatch) {
    return { owner: shortMatch[1], repo: shortMatch[2] }
  }

  return null
}

function formatRepoTitle(name: string): string {
  return name.replace(/[-_]+/g, ' ').trim()
}

export function mapGitHubRepoToProject(
  repo: GitHubRepoRaw,
  index = 0,
  extraLanguages: string[] = []
): ResumeProject {
  const yearSource = repo.updated_at || repo.created_at
  const year = yearSource ? new Date(yearSource).getFullYear().toString() : '2026'

  const techSet = new Set<string>()
  if (repo.language) techSet.add(repo.language)
  for (const lang of extraLanguages) {
    if (lang) techSet.add(lang)
  }
  if (Array.isArray(repo.topics)) {
    for (const topic of repo.topics) {
      if (topic) techSet.add(topic)
    }
  }
  if (techSet.size === 0) {
    techSet.add('GitHub')
  }

  const techStack = Array.from(techSet).slice(0, 6)
  const primaryLang = (repo.language || techStack[0] || 'SOFTWARE').toUpperCase()
  const category = `${primaryLang} // GITHUB REPOSITORY`

  const description =
    repo.description?.trim() ||
    `Open-source ${repo.language || 'software'} project (${repo.full_name}) built and maintained on GitHub.`

  const starsLabel = `${repo.stargazers_count} ${repo.stargazers_count === 1 ? 'Star' : 'Stars'}`
  const forksLabel = `${repo.forks_count} ${repo.forks_count === 1 ? 'Fork' : 'Forks'}`
  const stats = `${starsLabel} // ${forksLabel} // ${repo.language || 'Open Source'}`

  const liveLink =
    repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage.trim() : repo.html_url

  return {
    id: `gh-${repo.id}`,
    title: formatRepoTitle(repo.name),
    category,
    description,
    techStack,
    stats,
    year,
    link: liveLink,
    github: repo.html_url,
    visualStyle: VISUAL_STYLES[index % VISUAL_STYLES.length],
  }
}

export async function fetchUserGitHubRepos(username: string): Promise<GitHubRepoRaw[]> {
  const cleanUser = username.trim()
  if (!cleanUser) throw new Error('GitHub username is required.')

  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=updated&per_page=30`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    }
  )

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`GitHub user "${cleanUser}" not found.`)
    }
    if (res.status === 403) {
      throw new Error('GitHub API rate limit reached. Please try again in a minute.')
    }
    throw new Error(`Failed to fetch repositories (HTTP ${res.status}).`)
  }

  const data = (await res.json()) as GitHubRepoRaw[]
  // Prefer non-forked repos sorted by stars then recent update
  return data.sort((a, b) => {
    if (a.fork !== b.fork) return a.fork ? 1 : -1
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })
}

export async function fetchSingleGitHubRepo(
  owner: string,
  repo: string
): Promise<{ repo: GitHubRepoRaw; languages: string[] }> {
  const res = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    }
  )

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Repository "${owner}/${repo}" was not found or is private.`)
    }
    if (res.status === 403) {
      throw new Error('GitHub API rate limit reached. Please try again in a minute.')
    }
    throw new Error(`Failed to fetch repository (HTTP ${res.status}).`)
  }

  const repoData = (await res.json()) as GitHubRepoRaw

  let languages: string[] = []
  try {
    const langRes = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      }
    )
    if (langRes.ok) {
      const langObj = (await langRes.json()) as Record<string, number>
      languages = Object.keys(langObj)
    }
  } catch {
    // Non-fatal if languages endpoint fails
  }

  return { repo: repoData, languages }
}
