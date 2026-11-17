import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BlackHoleProps {
  position?: [number, number, number]
  radius?: number
  intensity?: number
}

export function BlackHole({
  position = [0, 0, -42],
  radius = 6.5,
  intensity = 1.0,
}: BlackHoleProps) {
  const groupRef = useRef<THREE.Group>(null)
  const accretionParticlesRef = useRef<THREE.Points>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const photonSphereRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  // Accretion Disk Swirling Particles (8,000 points)
  const { positions, colors, speeds, radii, angles } = useMemo(() => {
    const count = 7500
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const rad = new Float32Array(count)
    const ang = new Float32Array(count)

    const colorCore = new THREE.Color('#FFFFFF')
    const colorMid = new THREE.Color('#E0E2E5')
    const colorOuter = new THREE.Color('#718096')
    const temp = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Distance from event horizon: from radius * 1.15 to radius * 4.2
      const r = radius * 1.18 + Math.pow(Math.random(), 1.6) * radius * 3.2
      const theta = Math.random() * Math.PI * 2

      rad[i] = r
      ang[i] = theta
      // Keplerian velocity: orbital speed proportional to 1 / sqrt(r)
      spd[i] = (1.8 / Math.sqrt(r)) * 1.2

      const x = r * Math.cos(theta)
      const y = (Math.random() - 0.5) * 0.45 * (1 + (r - radius) * 0.1)
      const z = r * Math.sin(theta)

      pos[i3] = x
      pos[i3 + 1] = y
      pos[i3 + 2] = z

      // Color mapping: super-hot white inner rim to cooler silver/grey outer
      const normR = (r - radius * 1.18) / (radius * 3.2)
      if (normR < 0.25) {
        temp.copy(colorCore)
      } else if (normR < 0.65) {
        temp.lerpColors(colorCore, colorMid, (normR - 0.25) / 0.4)
      } else {
        temp.lerpColors(colorMid, colorOuter, (normR - 0.65) / 0.35)
      }

      // Relativistic Doppler brightening on approaching side
      const doppler = Math.cos(theta) * 0.25 + 0.75
      col[i3] = Math.min(1.0, temp.r * doppler)
      col[i3 + 1] = Math.min(1.0, temp.g * doppler)
      col[i3 + 2] = Math.min(1.0, temp.b * doppler)
    }

    return { positions: pos, colors: col, speeds: spd, radii: rad, angles: ang }
  }, [radius])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      // Subtle black hole drift
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.05
    }

    if (accretionParticlesRef.current) {
      const posAttr = accretionParticlesRef.current.geometry.attributes.position
      const currentPos = posAttr.array as Float32Array

      for (let i = 0; i < radii.length; i++) {
        const i3 = i * 3
        angles[i] += speeds[i] * delta * 1.4
        const a = angles[i]
        const r = radii[i]

        currentPos[i3] = r * Math.cos(a)
        currentPos[i3 + 2] = r * Math.sin(a)
      }
      posAttr.needsUpdate = true
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.4
    }

    if (photonSphereRef.current) {
      photonSphereRef.current.rotation.y = t * 0.1
    }

    if (lightRef.current) {
      lightRef.current.intensity = (4.5 + Math.sin(t * 3.0) * 0.8) * intensity
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Central Event Horizon Sphere - 100% Light Absorbing Pitch Black */}
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Gravitational Lensing Halo / Photon Sphere (Bends background light) */}
      <mesh ref={photonSphereRef}>
        <sphereGeometry args={[radius * 1.06, 48, 48]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.32 * intensity}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Swirling Relativistic Accretion Ring Mesh (Tilted at 72 degrees) */}
      <group rotation={[1.25, 0.25, 0.45]}>
        {/* Continuous Inner Gas Sheen Ring */}
        <mesh ref={innerRingRef}>
          <ringGeometry args={[radius * 1.15, radius * 3.8, 64]} />
          <meshBasicMaterial
            color="#E2E8F0"
            transparent
            opacity={0.35 * intensity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Accretion Disk High-Energy Particles */}
        <points ref={accretionParticlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.065}
            vertexColors
            transparent
            opacity={0.92 * intensity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      </group>

      {/* Vertical Relativistic Light Ring (Curving over the top and bottom due to extreme gravity) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[radius * 1.08, radius * 1.45, 64]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.25 * intensity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Accretion Glow Light radiating onto the approaching spaceship */}
      <pointLight
        ref={lightRef}
        color="#F8FAFC"
        intensity={5.0 * intensity}
        distance={radius * 12}
        decay={1.8}
      />
    </group>
  )
}

