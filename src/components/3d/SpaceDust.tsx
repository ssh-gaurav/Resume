import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SpaceDustProps {
  count?: number
  starCount?: number
}

export function SpaceDust({ count = 2200, starCount = 4500 }: SpaceDustProps) {
  const dustRef = useRef<THREE.Points>(null)
  const starsRef = useRef<THREE.Points>(null)
  const galacticRiftRef = useRef<THREE.Points>(null)

  // Floating ambient atmospheric dust motes
  const { dustPositions, dustColors, dustSpeeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const spd = new Float32Array(count)

    const colorWhite = new THREE.Color('#FFFFFF')
    const colorSilver = new THREE.Color('#BFC2C5')
    const colorCharcoal = new THREE.Color('#383838')
    const tempColor = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 48
      pos[i3 + 1] = Math.random() * 24 - 2.5
      pos[i3 + 2] = (Math.random() - 0.5) * 48

      const r = Math.random()
      if (r > 0.75) {
        tempColor.copy(colorWhite)
      } else if (r > 0.35) {
        tempColor.copy(colorSilver)
      } else {
        tempColor.copy(colorCharcoal)
      }

      col[i3] = tempColor.r
      col[i3 + 1] = tempColor.g
      col[i3 + 2] = tempColor.b

      spd[i] = 0.25 + Math.random() * 0.75
    }

    return { dustPositions: pos, dustColors: col, dustSpeeds: spd }
  }, [count])

  // Distant stars with varied apparent magnitudes
  const { starPositions, starColors } = useMemo(() => {
    const pos = new Float32Array(starCount * 3)
    const col = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.49
      const radius = 100 + Math.random() * 25

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = Math.max(1.5, radius * Math.cos(phi))
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      // Varied star brightness
      const brightness = Math.pow(Math.random(), 3.0) * 0.85 + 0.15
      col[i3] = brightness
      col[i3 + 1] = brightness
      col[i3 + 2] = brightness
    }

    return { starPositions: pos, starColors: col }
  }, [starCount])

  // Galactic Dust Rift: Monochromatic celestial band across the deep sky
  const galacticRift = useMemo(() => {
    const riftCount = 2000
    const pos = new Float32Array(riftCount * 3)
    const col = new Float32Array(riftCount * 3)

    for (let i = 0; i < riftCount; i++) {
      const i3 = i * 3
      // Distributed along an inclined galactic arc
      const t = (Math.random() - 0.5) * 120
      const spread = Math.pow(Math.random(), 1.5) * 12 - 6
      const angle = 0.65 // inclination

      const x = t * Math.cos(angle) - spread * Math.sin(angle)
      const y = 30 + Math.abs(t) * 0.35 + (Math.random() - 0.5) * 8
      const z = -60 + t * Math.sin(angle) + spread * Math.cos(angle)

      pos[i3] = x
      pos[i3 + 1] = y
      pos[i3 + 2] = z

      const shade = 0.12 + Math.random() * 0.35
      col[i3] = shade
      col[i3 + 1] = shade
      col[i3 + 2] = shade
    }

    return { pos, col }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (dustRef.current) {
      const posAttr = dustRef.current.geometry.attributes.position
      const currentPos = posAttr.array as Float32Array

      for (let i = 0; i < count; i += 2) {
        const i3 = i * 3
        const speed = dustSpeeds[i]

        currentPos[i3 + 1] += Math.sin(t * 0.4 + i) * 0.004 * speed
        currentPos[i3] += Math.cos(t * 0.25 + i) * 0.003 * speed

        if (currentPos[i3 + 1] > 22) currentPos[i3 + 1] = -2.2
        if (currentPos[i3 + 1] < -2.5) currentPos[i3 + 1] = 21.5
      }

      posAttr.needsUpdate = true
    }

    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.002
    }

    if (galacticRiftRef.current) {
      galacticRiftRef.current.rotation.y = t * 0.001
    }
  })

  return (
    <group>
      {/* Drifting Ambient Regolith Dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Deep Background Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.048}
          vertexColors
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Galactic Rift Dust Cloud */}
      <points ref={galacticRiftRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[galacticRift.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[galacticRift.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
