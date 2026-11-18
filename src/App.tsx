'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Lenis from 'lenis'
import { IntroCinematicExperience } from './components/intro/IntroCinematicExperience'
import { Navbar } from './components/ui/Navbar'
import { MenuOverlay } from './components/ui/MenuOverlay'
import { ContactModal } from './components/ui/ContactModal'
import { JoinModal } from './components/ui/JoinModal'
import { CustomCursor } from './components/ui/CustomCursor'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { DomainsSection } from './components/sections/DomainsSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { EventsSection } from './components/sections/EventsSection'
import { CommunitySection } from './components/sections/CommunitySection'
import { JoinSection } from './components/sections/JoinSection'

export function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTalkOpen, setIsTalkOpen] = useState(false)
  const [isJoinOpen, setIsJoinOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // Initialize high-performance, fast smooth scrolling with Lenis only after entering
  useEffect(() => {
    if (!hasEntered) return

    const lenis = new Lenis({
      duration: 0.65, // Snappy fast scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -14 * t)), // Fast responsive exponential curve
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.85, // Faster scroll velocity per mouse-wheel step
      touchMultiplier: 2.2, // Accelerated swipe scrolling
      autoRaf: false,
    })

    lenisRef.current = lenis

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    lenis.on('scroll', handleScroll)

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [hasEntered])

  // Fast smooth scroll navigation handler
  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: 0, duration: 0.75 })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  const handleEnterSite = () => {
    setHasEntered(true)
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#BFC2C5] select-none md:select-auto">
      {/* 1. Cinematic Space Journey: Deep Space → Spaceship → Black Hole → Wormhole → Main Website */}
      {!hasEntered && <IntroCinematicExperience onEnterMainSite={handleEnterSite} />}

      {/* Custom Monochromatic Cursor */}
      <CustomCursor />

      {/* Right Edge Minimal Scroll Indicator */}
      {hasEntered && <ScrollProgress />}

      {/* Minimal Floating Navigation */}
      {hasEntered && (
        <Navbar
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenTalk={() => setIsTalkOpen(true)}
          onOpenResume={() => setIsJoinOpen(true)}
        />
      )}

      {/* Main Experience Viewports - Kept 100% untouched */}
      {hasEntered && (
        <main className="relative w-full">
          {/* SECTION 1: 100vh Hero Viewport (Astronaut, Glowing Nebula, Lunar Mountains) */}
          <HeroSection scrollY={scrollY} />

          {/* SECTION 2: About Us (Latent Neural Network Transition) */}
          <AboutSection />

          {/* SECTION 3: Technical Domains (Interactive 3D Prisms) */}
          <DomainsSection />

          {/* SECTION 4: Student Projects (Visual Panels & Benchmarks) */}
          <ProjectsSection />

          {/* SECTION 5: Events & Convergence */}
          <EventsSection />

          {/* SECTION 6: Our Community & Mentors */}
          <CommunitySection />

          {/* SECTION 7: Join Us & Master Footer */}
          <JoinSection
            onOpenJoin={() => setIsJoinOpen(true)}
            onNavigate={handleNavigate}
          />
        </main>
      )}

      {/* Fullscreen Overlay Menu */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Let's Talk Inquiry Dialog */}
      <ContactModal
        isOpen={isTalkOpen}
        onClose={() => setIsTalkOpen(false)}
      />

      {/* Join The Club Application Dialog */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />
    </div>
  )
}

export default App
