import { Scene } from '../3d/Scene'
import { HeroContent } from '../ui/HeroContent'

interface HeroSectionProps {
  scrollY: number
}

export function HeroSection({ scrollY }: HeroSectionProps) {
  return (
    <section id="hero" className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#050505]">
      {/* 3D Scene covering the entire screen */}
      <Scene scrollY={scrollY} />

      {/* Hero Typography & Minimal Split Editorial Content */}
      <HeroContent />
    </section>
  )
}

