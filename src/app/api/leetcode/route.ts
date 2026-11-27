export async function GET(request: Request) {
  const currentYear = new Date().getUTCFullYear()
  const raw = new URL(request.url).searchParams.get('year')
  const year = raw === null ? currentYear : Number(raw)
  if (!Number.isInteger(year) || year < 2011 || year > currentYear) return Response.json({ error: 'Invalid year' }, { status: 400 })
  try {
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query PortfolioActivity($username: String!, $year: Int!) {
          matchedUser(username: $username) {
            submitStatsGlobal { acSubmissionNum { difficulty count } }
            userCalendar(year: $year) { activeYears submissionCalendar }
          }
          recentAcSubmissionList(username: $username, limit: 6) { id title titleSlug timestamp }
        }`,
        variables: { username: 'Gauravvv_rajawat', year },
      }),
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) throw new Error('LeetCode unavailable')
    const result = await response.json()
    if (result.errors?.length || !result.data?.matchedUser) throw new Error('Profile unavailable')
    const user = result.data.matchedUser
    const rawCalendar = JSON.parse(user.userCalendar?.submissionCalendar || '{}')
    const calendar: Record<string, number> = {}
    for (const [timestamp, count] of Object.entries(rawCalendar)) {
      const date = new Date(Number(timestamp) * 1000)
      if (!Number.isNaN(date.getTime()) && typeof count === 'number') calendar[date.toISOString().slice(0, 10)] = count
    }
    return Response.json({
      year,
      years: [...new Set<number>([currentYear, ...(user.userCalendar.activeYears || [])])].sort((a, b) => b - a),
      solved: user.submitStatsGlobal.acSubmissionNum,
      calendar,
      recent: result.data.recentAcSubmissionList ?? [],
    })
  } catch {
    return Response.json({ error: 'LeetCode activity is temporarily unavailable.' }, { status: 503 })
  }
}
