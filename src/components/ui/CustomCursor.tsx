import { useState, useEffect } from 'react'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only activate on devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement
      const clickable = target.closest('button, a, input, select, textarea, [data-cursor="interactive"], [role="button"]')
      setIsHovered(!!clickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    let animationFrameId: number
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }))
      animationFrameId = requestAnimationFrame(updateTrailing)
    }
    animationFrameId = requestAnimationFrame(updateTrailing)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [pos.x, pos.y, isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Sharp Glow Dot */}
      <div
        className="fixed w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      {/* Outer Smooth Trailing Precision Ring */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 border transition-[width,height,background-color,border-color,transform] duration-200 ease-out ${
          isHovered
            ? 'w-12 h-12 bg-white/10 border-white/80'
            : 'w-7 h-7 bg-white/[0.02] border-white/30'
        }`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      />
    </div>
  )
}
