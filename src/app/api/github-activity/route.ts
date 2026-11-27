export async function GET(request: Request) {
  const currentYear = new Date().getUTCFullYear()
  const raw = new URL(request.url).searchParams.get('year')
  const year = raw === null ? currentYear : Number(raw)
  if (!Number.isInteger(year) || year < 2008 || year > currentYear) return Response.json({ error: 'Invalid year' }, { status: 400 })
  try {
    const [profileResponse, response] = await Promise.all([
      fetch('https://api.github.com/users/ssh-gaurav', { headers: { 'User-Agent': 'Gaurav-Portfolio' }, next: { revalidate: 86400 }, signal: AbortSignal.timeout(10000) }),
      fetch(year === currentYear ? 'https://github.com/users/ssh-gaurav/contributions' : `https://github.com/users/ssh-gaurav/contributions?from=${year}-01-01&to=${year}-12-31`, { cache: 'no-store', signal: AbortSignal.timeout(10000) }),
    ])
    if (!profileResponse.ok || !response.ok) throw new Error('Unavailable')
    const profile = await profileResponse.json()
    const firstYear = new Date(profile.created_at).getUTCFullYear()
    if (!Number.isInteger(firstYear)) throw new Error('Invalid profile')
    const html = await response.text()
    const counts = new Map<string, number>()
    for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
      const id = match[1].match(/\bfor="([^"]+)"/)?.[1]
      const text = match[2].replace(/<[^>]+>/g, '').trim()
      const count = text.startsWith('No contributions') ? 0 : Number(text.match(/^([\d,]+) contributions?/)?.[1]?.replaceAll(',', ''))
      if (id && Number.isFinite(count)) counts.set(id, count)
    }
    const calendar: Record<string, number> = {}
    const levels: Record<string, number> = {}
    for (const match of html.matchAll(/<td\b[^>]*data-date="([^"]+)"[^>]*>/g)) {
      const id = match[0].match(/\bid="([^"]+)"/)?.[1]
      if ((year === currentYear || match[1].startsWith(`${year}-`)) && id && counts.has(id)) {
        calendar[match[1]] = counts.get(id)!
        levels[match[1]] = Number(match[0].match(/data-level="(\d)"/)?.[1] || 0)
      }
    }
    if (!Object.keys(calendar).length) throw new Error('Calendar unavailable')
    const dates = Object.keys(calendar).sort()
    return Response.json({ rangeStart: dates[0], rangeEnd: dates[dates.length - 1], rolling: year === currentYear, year, years: Array.from({ length: currentYear - firstYear + 1 }, (_, i) => currentYear - i), calendar, levels })
  } catch {
    return Response.json({ error: 'GitHub activity is temporarily unavailable.' }, { status: 503 })
  }
}
