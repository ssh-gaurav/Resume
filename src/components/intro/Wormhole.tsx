import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface WormholeProps {
  speed?: number
  brightness?: number
}

export function Wormhole({ speed = 1.0, brightness = 1.0 }: WormholeProps) {
  const tunnelPointsRef = useRef<THREE.Points>(null)
  const helixLinesRef = useRef<THREE.LineSegments>(null)
  const exitGlowRef1 = useRef<THREE.Mesh>(null)
  const exitGlowRef2 = useRef<THREE.Mesh>(null)
  const exitGlowRef3 = useRef<THREE.Mesh>(null)

  // Hyper-speed warp tunnel particles (5,500 points stretching down a cylinder)
  const { positions, colors, speeds, radii, angles } = useMemo(() => {
    const count = 5500
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const rad = new Float32Array(count)
    const ang = new Float32Array(count)

    const colorWhite = new THREE.Color('#FFFFFF')
    const colorCyan = new THREE.Color('#38BDF8')
    const colorIndigo = new THREE.Color('#818CF8')
    const colorSilver = new THREE.Color('#E2E8F0')
    const temp = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      // Radial variation with higher core concentration
      const r = 1.4 + Math.pow(Math.random(), 1.6) * 6.2
      const z = (Math.random() - 0.5) * 110

      pos[i3] = r * Math.cos(theta)
      pos[i3 + 1] = r * Math.sin(theta)
      pos[i3 + 2] = z

      rad[i] = r
      ang[i] = theta
      // Core particles rush faster
      spd[i] = (25 + Math.random() * 45) * (1.0 + (3.0 / r) * 0.4)

      const rand = Math.random()
      if (rand > 0.65) temp.copy(colorWhite)
      else if (rand > 0.35) temp.copy(colorCyan)
      else if (rand > 0.15) temp.copy(colorIndigo)
      else temp.copy(colorSilver)

      col[i3] = temp.r
      col[i3 + 1] = temp.g
      col[i3 + 2] = temp.b
    }

    return {
      positions: pos,
      colors: col,
      speeds: spd,
      radii: rad,
      angles: ang,
    }
  }, [])

  // Swirling helical warp light lines (relativistic geodesics)
  const helixGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const coils = 8
    const totalPts = 280
    for (let c = 0; c < coils; c++) {
      const offset = (c / coils) * Math.PI * 2
      for (let i = 0; i < totalPts - 1; i++) {
        const t1 = (i / totalPts) * Math.PI * 18 + offset
        const t2 = ((i + 1) / totalPts) * Math.PI * 18 + offset
        const z1 = (i / totalPts) * 90 - 45
        const z2 = ((i + 1) / totalPts) * 90 - 45
        const r = 2.8 + Math.sin(i * 0.1) * 0.4

        pts.push(new THREE.Vector3(Math.cos(t1) * r, Math.sin(t1) * r, z1))
        pts.push(new THREE.Vector3(Math.cos(t2) * r, Math.sin(t2) * r, z2))
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (tunnelPointsRef.current) {
      const posAttr = tunnelPointsRef.current.geometry.attributes.position
      const currentPos = posAttr.array as Float32Array

      for (let i = 0; i < radii.length; i++) {
        const i3 = i * 3
        // Swirl around z axis while rushing backward
        angles[i] += delta * 2.2 * speed
        const a = angles[i]
        const r = radii[i]

        currentPos[i3] = r * Math.cos(a)
        currentPos[i3 + 1] = r * Math.sin(a)

        // Relativistic forward rush (camera moving into -Z, so particles travel to +Z)
        currentPos[i3 + 2] += speeds[i] * delta * speed

        // Loop back to far end of wormhole
        if (currentPos[i3 + 2] > 20) {
          currentPos[i3 + 2] = -90
        }
      }
      posAttr.needsUpdate = true
    }

    // Spin helical warp curves
    if (helixLinesRef.current) {
      helixLinesRef.current.rotation.z += delta * 2.6 * speed
    }

    // Pulse exit singularity flare
    if (exitGlowRef1.current) {
      const s = 1.0 + Math.sin(t * 12) * 0.12
      exitGlowRef1.current.scale.set(s, s, s)
    }
    if (exitGlowRef2.current) {
      const s = 1.0 + Math.cos(t * 14) * 0.15
      exitGlowRef2.current.scale.set(s, s, s)
    }
  })

  return (
    <group>
      {/* 1. Volumetric Relativistic Particle Swarm */}
      <points ref={tunnelPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.88 * brightness}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 2. Swirling Helical Light Streaks */}
      <lineSegments ref={helixLinesRef} geometry={helixGeometry}>
        <lineBasicMaterial
          color="#67E8F9"
          transparent
          opacity={0.45 * brightness}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 3. Multi-layered Exit Singularity Glow (Arrival Portal) */}
      <group position={[0, 0, -82]}>
        <mesh ref={exitGlowRef1}>
          <circleGeometry args={[7.5, 48]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.9 * brightness}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={exitGlowRef2}>
          <circleGeometry args={[14, 48]} />
          <meshBasicMaterial
            color="#38BDF8"
            transparent
            opacity={0.5 * brightness}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={exitGlowRef3}>
          <circleGeometry args={[26, 48]} />
          <meshBasicMaterial
            color="#818CF8"
            transparent
            opacity={0.25 * brightness}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <pointLight color="#FFFFFF" intensity={18 * brightness} distance={75} />
      </group>
    </group>
  )
}
