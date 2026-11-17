import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SpaceEnvironmentProps {
  speedMultiplier?: number
}

export function SpaceEnvironment({ speedMultiplier = 1 }: SpaceEnvironmentProps) {
  const starsRef = useRef<THREE.Points>(null)
  const cosmicDustRef = useRef<THREE.Points>(null)
  const nebulaGasRef = useRef<THREE.Points>(null)

  // Starfield: 4,500 3D points dispersed in a massive spherical volume
  const { starPositions, starColors } = useMemo(() => {
    const count = 4500
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const colorWhite = new THREE.Color('#FFFFFF')
    const colorSilver = new THREE.Color('#BFC2C5')
    const colorBlue = new THREE.Color('#88B0E8') // Subtle cosmic blue

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Distribute in a deep sphere (radius 40 to 180)
      const r = 40 + Math.random() * 140
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = r * Math.cos(phi)

      const rand = Math.random()
      let c = colorWhite
      if (rand > 0.75) c = colorSilver
      else if (rand > 0.9) c = colorBlue

      col[i3] = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b
    }

    return { starPositions: pos, starColors: col }
  }, [])

  // Foreground cosmic dust motes
  const { dustPositions, dustColors } = useMemo(() => {
    const count = 1200
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 60
      pos[i3 + 1] = (Math.random() - 0.5) * 40
      pos[i3 + 2] = (Math.random() - 0.5) * 80

      const b = 0.3 + Math.random() * 0.5
      col[i3] = b
      col[i3 + 1] = b
      col[i3 + 2] = b
    }
    return { dustPositions: pos, dustColors: col }
  }, [])

  // Deep space subtle galactic dust cloud
  const nebulaParticles = useMemo(() => {
    const count = 1800
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const rad = 25 + Math.random() * 45
      pos[i3] = Math.cos(angle) * rad + 15
      pos[i3 + 1] = (Math.random() - 0.5) * 15 + 8
      pos[i3 + 2] = Math.sin(angle) * rad - 30

      col[i3] = 0.15 + Math.random() * 0.2 // Soft silver
      col[i3 + 1] = 0.2 + Math.random() * 0.25 // Subtle blue
      col[i3 + 2] = 0.35 + Math.random() * 0.35
    }
    return { pos, col }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.003 * speedMultiplier
      starsRef.current.rotation.x = Math.sin(t * 0.002) * 0.02
    }

    if (cosmicDustRef.current) {
      cosmicDustRef.current.rotation.y = t * 0.01 * speedMultiplier
    }

    if (nebulaGasRef.current) {
      nebulaGasRef.current.rotation.z = t * 0.005
    }
  })

  return (
    <group>
      {/* 3D Deep Space Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Foreground Drifting Dust */}
      <points ref={cosmicDustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Subtle Distant Nebula Veil */}
      <points ref={nebulaGasRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaParticles.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[nebulaParticles.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
