import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { SpaceEnvironment } from './SpaceEnvironment'
import { BlackHole } from './BlackHole'
import { Spaceship } from './Spaceship'
import { Wormhole } from './Wormhole'
import { cinematicAudio } from '../../utils/cinematicAudio'

export type JourneyPhase = 'idle' | 'pull' | 'event_horizon' | 'wormhole' | 'emerge'

interface SpaceJourneySceneProps {
  phase: JourneyPhase
  onPhaseChange: (phase: JourneyPhase) => void
  onComplete: () => void
}

function JourneyDirector({
  phase,
  onPhaseChange,
  onComplete,
}: {
  phase: JourneyPhase
  onPhaseChange: (phase: JourneyPhase) => void
  onComplete: () => void
}) {
  const { camera } = useThree()
  const mousePos = useRef({ x: 0, y: 0 })

  // Spaceship flight state
  const shipPos = useRef(new THREE.Vector3(0, -0.4, 2.8))
  const shipRot = useRef(new THREE.Euler(0.08, 0, 0))
  const shipScale = useRef(0.9)
  const thrusterPower = useRef(1.0)

  // Black hole visual state
  const blackHolePos = useRef(new THREE.Vector3(0, 1.2, -45))
  const blackHoleIntensity = useRef(1.0)

  // Wormhole state
  const wormholeSpeed = useRef(1.0)
  const wormholeBrightness = useRef(0.0)

  // Track cursor for idle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Trigger cinematic sequence when phase moves from idle to pull
  useEffect(() => {
    if (phase === 'pull') {
      cinematicAudio.playGravitationalPull()

      const tl = gsap.timeline()

      // Phase 1: Spaceship starts moving toward black hole and accelerates
      tl.to(
        shipPos.current,
        {
          x: 1.2,
          y: 0.8,
          z: -18,
          duration: 3.2,
          ease: 'power2.in',
        },
        0
      )
      tl.to(
        shipRot.current,
        {
          x: -0.15,
          y: 0.25,
          z: -0.65, // Banking into the gravitational swirl
          duration: 3.2,
          ease: 'power1.inOut',
        },
        0
      )
      tl.to(
        thrusterPower,
        {
          current: 2.8,
          duration: 2.5,
        },
        0
      )

      // Camera pursues the accelerating spaceship
      tl.to(
        camera.position,
        {
          x: 0.5,
          y: 0.2,
          z: -10,
          duration: 3.2,
          ease: 'power2.in',
        },
        0
      )

      // Phase 2: Gravitational Spiral into Event Horizon
      tl.to(
        shipPos.current,
        {
          x: 0,
          y: 1.2,
          z: -42, // Enters singularity
          duration: 2.2,
          ease: 'power3.in',
          onStart: () => onPhaseChange('event_horizon'),
        },
        3.2
      )
      tl.to(
        shipRot.current,
        {
          z: -Math.PI * 2.5, // Violent relativistic roll
          x: 0.4,
          duration: 2.2,
          ease: 'power2.in',
        },
        3.2
      )
      tl.to(
        shipScale,
        {
          current: 0.01, // Spaghettification / shrinking into singularity
          duration: 1.8,
          ease: 'power3.in',
        },
        3.5
      )

      // Camera plunges into the singularity
      tl.to(
        camera.position,
        {
          x: 0,
          y: 1.2,
          z: -40,
          duration: 2.4,
          ease: 'power3.in',
        },
        3.2
      )

      // Phase 3: Wormhole Transition
      tl.call(
        () => {
          onPhaseChange('wormhole')
          cinematicAudio.playWormholeBurst()
        },
        undefined,
        5.5
      )

      tl.to(
        wormholeBrightness,
        {
          current: 1.0,
          duration: 0.4,
        },
        5.5
      )
      tl.to(
        wormholeSpeed,
        {
          current: 2.8,
          duration: 2.4,
          ease: 'power2.out',
        },
        5.5
      )

      // Camera rushes through the wormhole tunnel
      tl.to(
        camera.position,
        {
          z: -75,
          duration: 2.6,
          ease: 'power1.inOut',
        },
        5.5
      )

      // Phase 4: Emerge into Main AI Club Landing Page
      tl.call(
        () => {
          onPhaseChange('emerge')
          cinematicAudio.stopAll()
          setTimeout(() => {
            onComplete()
          }, 800)
        },
        undefined,
        8.0
      )
    }
  }, [phase, onPhaseChange, onComplete, camera])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // 1. Idle camera floating with subtle cursor parallax
    if (phase === 'idle') {
      const parallaxX = mousePos.current.x * 0.4
      const parallaxY = mousePos.current.y * 0.25

      camera.position.x = THREE.MathUtils.damp(camera.position.x, parallaxX, 3.0, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, parallaxY + 0.1, 3.0, delta)
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 6.2, 3.0, delta)

      // Spaceship idle drift
      shipPos.current.y = -0.4 + Math.sin(t * 1.5) * 0.08
      shipPos.current.x = Math.sin(t * 0.8) * 0.12
      shipRot.current.z = Math.sin(t * 1.0) * 0.04
      shipRot.current.x = 0.08 + Math.cos(t * 1.2) * 0.02
    }

    // Camera always maintains focus ahead toward black hole
    if (phase !== 'emerge') {
      const targetLookZ = phase === 'wormhole' ? -120 : blackHolePos.current.z
      camera.lookAt(0, phase === 'wormhole' ? 0 : 1.0, targetLookZ)
    }
  })

  return (
    <>
      {/* Deep Space Starfield & Cosmic Dust */}
      <SpaceEnvironment speedMultiplier={phase === 'pull' ? 3.0 : 1.0} />

      {/* Massive Black Hole with Accretion Disk & Gravitational Lensing */}
      {phase !== 'wormhole' && phase !== 'emerge' && (
        <BlackHole
          position={[blackHolePos.current.x, blackHolePos.current.y, blackHolePos.current.z]}
          radius={7.0}
          intensity={blackHoleIntensity.current}
        />
      )}

      {/* Futuristic Spaceship with Astronaut Pilot Inside */}
      {shipScale.current > 0.05 && (
        <Spaceship
          position={[shipPos.current.x, shipPos.current.y, shipPos.current.z]}
          rotation={[shipRot.current.x, shipRot.current.y, shipRot.current.z]}
          scale={shipScale.current}
          thrusterIntensity={thrusterPower.current}
        />
      )}

      {/* 3D Relativistic Wormhole Warp Tunnel */}
      {(phase === 'wormhole' || phase === 'emerge') && (
        <group position={[0, 0, -45]}>
          <Wormhole speed={wormholeSpeed.current} brightness={wormholeBrightness.current} />
        </group>
      )}

      {/* Atmospheric Lighting */}
      <ambientLight color="#181A20" intensity={0.65} />
      <directionalLight position={[10, 15, 10]} color="#FFFFFF" intensity={1.5} />
    </>
  )
}

export function SpaceJourneyScene({
  phase,
  onPhaseChange,
  onComplete,
}: SpaceJourneySceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 46, near: 0.1, far: 500 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      className="w-full h-full select-none"
    >
      <color attach="background" args={['#030305']} />
      <JourneyDirector
        phase={phase}
        onPhaseChange={onPhaseChange}
        onComplete={onComplete}
      />
    </Canvas>
  )
}

