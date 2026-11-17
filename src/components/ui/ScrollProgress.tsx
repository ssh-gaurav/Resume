import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setProgress(Math.min(100, Math.max(0, currentProgress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 pointer-events-none select-none">
      {/* Percentage indicator */}
      <span className="font-mono text-[9px] tracking-[0.25em] text-[#BFC2C5] uppercase rotate-90 mb-4">
        {Math.round(progress).toString().padStart(2, '0')}%
      </span>

      {/* Progress Track Line with glowing runner */}
      <div className="relative w-[2px] h-36 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-white via-white/80 to-[#BFC2C5] transition-all duration-150 ease-out shadow-[0_0_8px_#ffffff]"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Coordinates / Datum */}
      <span className="font-mono text-[8px] tracking-[0.3em] text-[#777777] uppercase mt-2">
        NEXUS
      </span>
    </div>
  )
}
