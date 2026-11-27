import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface Activity {
  rangeStart?: string
  rangeEnd?: string
  rolling?: boolean
  year: number
  years: number[]
  calendar: Record<string, number>
  levels?: Record<string, number>
  solved?: { difficulty: string; count: number }[]
  recent?: { id: string; title: string; titleSlug: string; timestamp: string }[]
}
const palettes = {
  leetcode: ['#ffffff12', '#60583f', '#968159', '#c6a66c', '#f2d39a'],
  github: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
}

export function ContributionCalendar({ source }: { source: 'leetcode' | 'github' }) {
  const [today] = useState(() => new Date().toISOString().slice(0, 10))
  const [year, setYear] = useState(() => Number(today.slice(0, 4)))
  const [years, setYears] = useState([year])
  const [activity, setActivity] = useState<Activity | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const isLeetCode = source === 'leetcode'
  const title = isLeetCode ? 'LeetCode' : 'GitHub'
  const unit = isLeetCode ? 'submissions' : 'contributions'
  const profile = isLeetCode ? 'https://leetcode.com/u/Gauravvv_rajawat/' : 'https://github.com/ssh-gaurav'
  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/${source === 'leetcode' ? 'leetcode' : 'github-activity'}?year=${year}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(); return response.json() })
      .then((data: Activity) => { setActivity(data); setYears(data.years); setStatus('ready') })
      .catch(error => { if (error.name !== 'AbortError') setStatus('error') })
    return () => controller.abort()
  }, [source, year, attempt])
  const rolling = activity?.rolling && activity.rangeStart && activity.rangeEnd
  const start = rolling ? Date.parse(activity.rangeStart!) : Date.UTC(year, 0, 1)
  const length = rolling ? (Date.parse(activity.rangeEnd!) - start) / 86400000 + 1 : (Date.UTC(year + 1, 0, 1) - start) / 86400000
  const offset = new Date(start).getUTCDay()
  const days = Array.from({ length }, (_, i) => new Date(start + i * 86400000).toISOString().slice(0, 10))
  const total = days.reduce((sum, day) => sum + (activity?.calendar[day] || 0), 0)
  const activeDays = days.filter(day => (activity?.calendar[day] || 0) > 0).length
  const colors = palettes[source]
  const columns = Math.ceil((offset + length) / 7)
  return (
    <article className="mt-8 border border-white/15 rounded-xl p-5 sm:p-8 bg-[#0b0c0a] min-w-0">
      <div className="flex flex-wrap justify-between gap-5 items-start mb-7">
        <div><h3 className="text-2xl text-white">{title} activity</h3><a href={profile} target="_blank" rel="noreferrer" className="mt-2 text-[#d0c3ac] text-sm inline-flex items-center gap-2">{isLeetCode ? 'Gauravvv_rajawat' : 'ssh-gaurav'} <ArrowUpRight size={14} /></a></div>
        <div className="flex items-center gap-4"><button type="button" disabled={status === 'loading'} onClick={() => { setStatus('loading'); setAttempt(value => value + 1) }} className="text-xs text-[#d0c3ac] underline disabled:opacity-40">Refresh</button><label className="text-sm text-[#aaa9a2] flex items-center gap-3">Year<select aria-label={`${title} activity year`} value={year} onChange={event => { setYear(Number(event.target.value)); setStatus('loading'); setActivity(null); setSelectedDay(null) }} className="bg-[#181a16] border border-white/20 rounded-md px-3 py-2 text-white focus-visible:outline-2 focus-visible:outline-[#c5b79c]">{years.map(value => <option key={value} value={value}>{value}</option>)}</select></label></div>
      </div>
      {status !== 'ready' || !activity ? <div role="status" className="py-10 text-sm text-[#aaa9a2]">{status === 'error' ? <><p>Activity is temporarily unavailable. Visit the profile to see the history.</p><button onClick={() => { setStatus('loading'); setAttempt(value => value + 1) }} className="mt-4 text-[#d0c3ac] underline">Try again</button></> : 'Loading activity…'}</div> : <>
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
          <div><span className="text-3xl text-white">{total.toLocaleString()}</span><p className="mt-1 text-xs text-[#aaa9a2]">{unit} {rolling ? 'in the last year' : year}</p></div>
          <div><span className="text-3xl text-white">{activeDays}</span><p className="mt-1 text-xs text-[#aaa9a2]">active days</p></div>
          {activity.solved?.map(item => <div key={item.difficulty}><span className="text-3xl text-white">{item.count}</span><p className="mt-1 text-xs text-[#aaa9a2]">{item.difficulty === 'All' ? 'Solved · all time' : `${item.difficulty} · all time`}</p></div>)}
        </div>
        <div className="overflow-x-auto pb-3" data-lenis-prevent>
          <div style={{ minWidth: 780 }}>
            <div className="relative h-6 ml-8 text-xs text-[#aaa9a2]">{days.map((day, index) => {
              if (index !== 0 && !day.endsWith('-01')) return null
              const week = Math.floor((offset + index) / 7)
              if (index > 0 && week < 2) return null
              return <span key={day} className="absolute" style={{ left: String(week / columns * 100) + '%' }}>{new Date(day + 'T00:00:00Z').toLocaleDateString('en', { month: 'short', timeZone: 'UTC' })}</span>
            })}</div>
            <div className="flex gap-2">
              <div className="w-6 shrink-0 grid grid-rows-7 gap-[3px] text-[10px] text-[#aaa9a2]">{['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => <span key={i} className="h-3">{label}</span>)}</div>
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] flex-1" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} aria-label={`${title} daily ${unit}, ${year}`}>
                {Array.from({ length: offset }, (_, i) => <span key={`pad-${i}`} />)}
                {days.map(day => { const future = day > today; const count = activity.calendar[day] || 0; const level = activity.levels?.[day] ?? (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4); return <button key={day} disabled={future} title={future ? `${day}: future date` : `${day}: ${count} ${unit}`} aria-label={`${day}: ${future ? 'future date' : `${count} ${unit}`}`} aria-pressed={selectedDay === day} onClick={() => setSelectedDay(day)} style={{ backgroundColor: colors[level] }} className={`h-3 rounded-[2px] focus-visible:outline-2 focus-visible:outline-white hover:ring-1 hover:ring-white/60 ${future ? 'opacity-20' : ''} ${selectedDay === day ? 'ring-1 ring-white' : ''}`} /> })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap justify-between gap-3 text-xs text-[#aaa9a2]">
          <p aria-live="polite">{selectedDay ? `${selectedDay}: ${activity.calendar[selectedDay] || 0} ${unit}` : 'Select a day to view its count. Dates shown in UTC.'}</p>
          <div className="flex items-center gap-1.5"><span>Less</span>{colors.map(color => <span key={color} style={{ backgroundColor: color }} className="w-3 h-3 rounded-sm" />)}<span>More</span></div>
        </div>
        <p className="mt-5 text-xs leading-5 text-[#85877f]">{isLeetCode ? 'Yearly submission activity from LeetCode. The list below shows only the latest public accepted submissions, across all years.' : 'Public GitHub contribution history. Signed-in GitHub totals may include private activity that is not visible here.'}</p>
        {isLeetCode && <div className="mt-7"><h4 className="text-sm text-white mb-3">Recent accepted submissions</h4>{!activity.recent?.length ? <p className="text-sm text-[#aaa9a2]">No public accepted submissions available.</p> : <ul>{activity.recent.map(item => <li key={item.id} className="border-t border-white/10 py-3"><a href={`https://leetcode.com/problems/${encodeURIComponent(item.titleSlug)}/`} target="_blank" rel="noreferrer" className="flex justify-between gap-4 text-sm hover:text-[#dfc99e]"><span>{item.title}</span><span className="shrink-0 text-xs text-[#aaa9a2]">{new Date(Number(item.timestamp) * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</span></a></li>)}</ul>}</div>}
      </>}
    </article>
  )
}
