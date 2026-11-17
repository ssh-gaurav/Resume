import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NebulaProps {
  position?: [number, number, number]
  particleCount?: number
}

export function Nebula({ position = [0, 2.2, 0], particleCount = 14000 }: NebulaProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const innerCoreRef = useRef<THREE.Points>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const secondaryLightRef = useRef<THREE.PointLight>(null)
  const ringRef1 = useRef<THREE.LineSegments>(null)
  const ringRef2 = useRef<THREE.LineSegments>(null)

  // Pre-generate particle coordinates, colors, and phases
  const { positions, colors, initialPositions, phases } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const initPos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    const ph = new Float32Array(particleCount)

    // Palette: Monochromatic shades of silver and pure white
    const colorWhite = new THREE.Color('#FFFFFF')
    const colorSilver = new THREE.Color('#BFC2C5')
    const colorLightSilver = new THREE.Color('#E0E2E5')
    const colorCharcoal = new THREE.Color('#555555')
    const tempColor = new THREE.Color()

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Distribute particles: Core cluster, spiral arms, and volumetric halo
      const r = Math.pow(Math.random(), 1.8) * 3.8 + 0.15
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI * 0.95

      // Add spiral wave modulation
      const spiralOffset = r * 1.4
      const x = r * Math.cos(theta + spiralOffset) * Math.cos(phi)
      const y = (r * 0.45) * Math.sin(phi) + Math.sin(theta * 3) * 0.2
      const z = r * Math.sin(theta + spiralOffset) * Math.cos(phi)

      pos[i3] = x
      pos[i3 + 1] = y
      pos[i3 + 2] = z

      initPos[i3] = x
      initPos[i3 + 1] = y
      initPos[i3 + 2] = z

      // Particle Color: White/Silver core fading to charcoal at the outer rim
      const distFromCenter = Math.sqrt(x * x + y * y + z * z)
      const ratio = distFromCenter / 4.2
      if (ratio < 0.25) {
        tempColor.lerpColors(colorWhite, colorLightSilver, ratio / 0.25)
      } else if (ratio < 0.65) {
        tempColor.lerpColors(colorLightSilver, colorSilver, (ratio - 0.25) / 0.4)
      } else {
        tempColor.lerpColors(colorSilver, colorCharcoal, (ratio - 0.65) / 0.35)
      }

      col[i3] = tempColor.r
      col[i3 + 1] = tempColor.g
      col[i3 + 2] = tempColor.b

      ph[i] = Math.random() * Math.PI * 2
    }

    return {
      positions: pos,
      initialPositions: initPos,
      colors: col,
      phases: ph,
    }
  }, [particleCount])

  // Core dense glowing center points
  const coreParticles = useMemo(() => {
    const count = 2500
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.pow(Math.random(), 2.5) * 1.1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5
      pos[i3 + 2] = radius * Math.cos(phi)

      // Intense white core
      col[i3] = 1.0
      col[i3 + 1] = 1.0
      col[i3 + 2] = 1.0
    }

    return { pos, col }
  }, [])

  // Create delicate orbital wireframe rings around the nebula
  const orbitalGeometry1 = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const segments = 96
    const radius = 2.8
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta * 2) * 0.3, Math.sin(theta) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  const orbitalGeometry2 = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const segments = 96
    const radius = 3.5
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.sin(theta) * radius, Math.cos(theta * 3) * 0.4, Math.cos(theta) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  // Animate the nebula particles in real-time
  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (pointsRef.current) {
      // Slow majestic rotation
      pointsRef.current.rotation.y = t * 0.08
      pointsRef.current.rotation.z = Math.sin(t * 0.05) * 0.05

      // Vertex breathing wave simulation
      const posAttr = pointsRef.current.geometry.attributes.position
      const currentPositions = posAttr.array as Float32Array

      for (let i = 0; i < particleCount; i += 3) {
        // Step by 3 to maintain high 60fps performance
        const i3 = i * 3
        const initX = initialPositions[i3]
        const initY = initialPositions[i3 + 1]
        const initZ = initialPositions[i3 + 2]
        const phase = phases[i]

        const wave = Math.sin(t * 1.2 + phase) * 0.08
        const swirlAngle = t * 0.04

        const cosS = Math.cos(swirlAngle)
        const sinS = Math.sin(swirlAngle)

        currentPositions[i3] = (initX * cosS - initZ * sinS) * (1.0 + wave)
        currentPositions[i3 + 1] = initY * (1.0 + Math.cos(t * 0.9 + phase) * 0.12)
        currentPositions[i3 + 2] = (initX * sinS + initZ * cosS) * (1.0 + wave)
      }
      posAttr.needsUpdate = true
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.15
      innerCoreRef.current.rotation.x = Math.sin(t * 0.1) * 0.1
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.y = t * 0.06
      ringRef1.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.05) * 0.1
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y = -t * 0.05
      ringRef2.current.rotation.z = Math.PI / 6 + Math.cos(t * 0.04) * 0.08
    }

    if (lightRef.current) {
      // Dynamic breathing light that casts silver photons on the astronaut below
      lightRef.current.intensity = 4.2 + Math.sin(t * 2.0) * 0.8
    }

    if (secondaryLightRef.current) {
      secondaryLightRef.current.intensity = 2.0 + Math.cos(t * 1.5) * 0.5
    }
  })

  return (
    <group position={position}>
      {/* Dynamic central point light illuminating astronaut & landscape */}
      <pointLight
        ref={lightRef}
        color="#FFFFFF"
        intensity={4.5}
        distance={28}
        decay={2}
      />
      {/* Secondary cooler silver fill light */}
      <pointLight
        ref={secondaryLightRef}
        position={[0, -0.5, 0]}
        color="#BFC2C5"
        intensity={2.2}
        distance={18}
        decay={2}
      />

      {/* Main Nebula Volumetric Particle Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
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

      {/* Intense Glowing Core */}
      <points ref={innerCoreRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[coreParticles.pos, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[coreParticles.col, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Orbital Delicate Mathematical Rings */}
      <lineSegments ref={ringRef1} geometry={orbitalGeometry1}>
        <lineBasicMaterial color="#E0E2E5" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <lineSegments ref={ringRef2} geometry={orbitalGeometry2}>
        <lineBasicMaterial color="#BFC2C5" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  )
}
