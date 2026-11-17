import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SpaceshipProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  thrusterIntensity?: number
}

export function Spaceship({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1.0,
  thrusterIntensity = 1.0,
}: SpaceshipProps) {
  const groupRef = useRef<THREE.Group>(null)
  const thrusterPlumeRef1 = useRef<THREE.Mesh>(null)
  const thrusterPlumeRef2 = useRef<THREE.Mesh>(null)
  const thrusterLightRef = useRef<THREE.PointLight>(null)
  const wakeParticlesRef = useRef<THREE.Points>(null)
  const solarPanelGroupRef = useRef<THREE.Group>(null)

  // Photorealistic aerospace PBR materials
  const titaniumHullMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4D8DD', // Brushed aerospace titanium
        metalness: 0.92,
        roughness: 0.22,
      }),
    []
  )

  const mliGoldFoilMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D97706', // Kapton / Gold Multi-Layer Insulation (MLI)
        metalness: 0.85,
        roughness: 0.35,
      }),
    []
  )

  const solarCellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E293B', // Deep navy photovoltaic silicon cells
        metalness: 0.95,
        roughness: 0.12,
      }),
    []
  )

  const solarFrameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#475569',
        metalness: 0.8,
        roughness: 0.4,
      }),
    []
  )

  const darkThermalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#121316', // Carbon-carbon thermal tiles
        metalness: 0.25,
        roughness: 0.8,
      }),
    []
  )

  const glassCanopyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#A5C4E8',
        transparent: true,
        opacity: 0.7,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.52,
      }),
    []
  )

  const ionGlowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#60A5FA', // Luminous blue-cyan ion plasma
      }),
    []
  )

  const rcsGlowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#E0F2FE',
      }),
    []
  )

  // Trailing ion engine wake particles
  const wakeParticles = useMemo(() => {
    const count = 220
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 0.3
      pos[i3 + 1] = (Math.random() - 0.5) * 0.3
      pos[i3 + 2] = 1.3 + Math.random() * 5.0
      spd[i] = 2.0 + Math.random() * 3.0
    }

    return { pos, spd }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // Thruster pulsing flame animation
    const p = 1.0 + Math.sin(t * 24) * 0.15
    if (thrusterPlumeRef1.current) {
      thrusterPlumeRef1.current.scale.set(p, p, p * thrusterIntensity)
    }
    if (thrusterPlumeRef2.current) {
      thrusterPlumeRef2.current.scale.set(p, p, p * thrusterIntensity)
    }

    if (thrusterLightRef.current) {
      thrusterLightRef.current.intensity = (2.8 + Math.sin(t * 20) * 0.7) * thrusterIntensity
    }

    // Solar panels micro-tracking flex
    if (solarPanelGroupRef.current) {
      solarPanelGroupRef.current.rotation.x = Math.sin(t * 0.4) * 0.03
    }

    // Animate trailing wake particles
    if (wakeParticlesRef.current) {
      const posAttr = wakeParticlesRef.current.geometry.attributes.position
      const currentPos = posAttr.array as Float32Array

      for (let i = 0; i < 220; i++) {
        const i3 = i * 3
        currentPos[i3 + 2] += wakeParticles.spd[i] * delta * 9.0 * thrusterIntensity

        if (currentPos[i3 + 2] > 7.0) {
          currentPos[i3] = (Math.random() - 0.5) * 0.25
          currentPos[i3 + 1] = (Math.random() - 0.5) * 0.25
          currentPos[i3 + 2] = 1.3 + Math.random() * 0.3
        }
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* ======================================================== */}
      {/* 1. CENTRAL PRESSURIZED HABITAT & SERVICE CORE            */}
      {/* ======================================================== */}
      {/* Forward Aerodynamic Nose / Berthing Collar */}
      <mesh position={[0, 0, -2.1]} rotation={[-Math.PI / 2, 0, 0]} material={titaniumHullMaterial} castShadow>
        <coneGeometry args={[0.38, 1.2, 28]} />
      </mesh>
      {/* Berthing / Docking Adapter Ring */}
      <mesh position={[0, 0, -2.7]} rotation={[Math.PI / 2, 0, 0]} material={darkThermalMaterial}>
        <torusGeometry args={[0.22, 0.04, 16, 28]} />
      </mesh>

      {/* Main Pressurized Fuselage Cylinder */}
      <mesh position={[0, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]} material={titaniumHullMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.62, 2.2, 28]} />
      </mesh>

      {/* Gold MLI Thermal Foil Blanket Segment (ISS Style) */}
      <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]} material={mliGoldFoilMaterial}>
        <cylinderGeometry args={[0.58, 0.58, 0.65, 28]} />
      </mesh>

      {/* Ventral Heat Shield (Dark Underbelly) */}
      <mesh position={[0, -0.42, -0.6]} material={darkThermalMaterial} receiveShadow>
        <boxGeometry args={[1.05, 0.08, 2.3]} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. DOCKING CUPOLA & VISIBLE ASTRONAUT PILOT              */}
      {/* ======================================================== */}
      <group position={[0, 0.42, -1.0]}>
        {/* Transparent Pressurized Observation Dome */}
        <mesh material={glassCanopyMaterial} castShadow>
          <sphereGeometry args={[0.36, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        </mesh>
        {/* Cockpit Retaining Collar */}
        <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]} material={darkThermalMaterial}>
          <torusGeometry args={[0.36, 0.03, 12, 28]} />
        </mesh>

        {/* Interior Cockpit Console Glow */}
        <mesh position={[0, 0, -0.15]} material={ionGlowMaterial}>
          <boxGeometry args={[0.26, 0.05, 0.12]} />
        </mesh>
        <pointLight position={[0, 0.1, -0.05]} color="#93C5FD" intensity={1.2} distance={1.4} />

        {/* Detailed Pilot Inside Cockpit */}
        <group position={[0, -0.06, 0.04]} scale={[0.32, 0.32, 0.32]}>
          {/* Helmet */}
          <mesh position={[0, 0.35, 0]} material={titaniumHullMaterial}>
            <sphereGeometry args={[0.36, 20, 20]} />
          </mesh>
          {/* Gold Reflective Visor */}
          <mesh position={[0, 0.38, -0.17]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.25, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#F59E0B" metalness={0.96} roughness={0.05} />
          </mesh>
          {/* Torso */}
          <mesh position={[0, 0, 0]} material={darkThermalMaterial}>
            <boxGeometry args={[0.55, 0.6, 0.35]} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 3. EXTENDED DUAL SOLAR ARRAY WINGS (High Realism)        */}
      {/* ======================================================== */}
      <group ref={solarPanelGroupRef} position={[0, 0, -0.2]}>
        {/* Left Solar Panel Truss Boom */}
        <mesh position={[-0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={solarFrameMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 12]} />
        </mesh>
        {/* Left Solar Array Panels */}
        <group position={[-2.35, 0, 0]}>
          {/* Panel Backing Frame */}
          <mesh material={solarFrameMaterial} castShadow>
            <boxGeometry args={[2.0, 0.03, 1.1]} />
          </mesh>
          {/* Photovoltaic Cells (Front Surface) */}
          <mesh position={[0, 0.02, 0]} material={solarCellMaterial}>
            <boxGeometry args={[1.92, 0.01, 1.02]} />
          </mesh>
        </group>

        {/* Right Solar Panel Truss Boom */}
        <mesh position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={solarFrameMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 12]} />
        </mesh>
        {/* Right Solar Array Panels */}
        <group position={[2.35, 0, 0]}>
          {/* Panel Backing Frame */}
          <mesh material={solarFrameMaterial} castShadow>
            <boxGeometry args={[2.0, 0.03, 1.1]} />
          </mesh>
          {/* Photovoltaic Cells (Front Surface) */}
          <mesh position={[0, 0.02, 0]} material={solarCellMaterial}>
            <boxGeometry args={[1.92, 0.01, 1.02]} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. RCS (REACTION CONTROL SYSTEM) ATTITUDE THRUSTER QUADS */}
      {/* ======================================================== */}
      {/* Forward Port RCS */}
      <group position={[-0.6, 0.15, -1.8]}>
        <mesh material={darkThermalMaterial}><boxGeometry args={[0.08, 0.08, 0.08]} /></mesh>
        <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={rcsGlowMaterial}>
          <coneGeometry args={[0.025, 0.05, 8]} />
        </mesh>
      </group>
      {/* Forward Starboard RCS */}
      <group position={[0.6, 0.15, -1.8]}>
        <mesh material={darkThermalMaterial}><boxGeometry args={[0.08, 0.08, 0.08]} /></mesh>
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={rcsGlowMaterial}>
          <coneGeometry args={[0.025, 0.05, 8]} />
        </mesh>
      </group>
      {/* Aft Port RCS */}
      <group position={[-0.6, 0.15, 0.4]}>
        <mesh material={darkThermalMaterial}><boxGeometry args={[0.08, 0.08, 0.08]} /></mesh>
        <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={rcsGlowMaterial}>
          <coneGeometry args={[0.025, 0.05, 8]} />
        </mesh>
      </group>
      {/* Aft Starboard RCS */}
      <group position={[0.6, 0.15, 0.4]}>
        <mesh material={darkThermalMaterial}><boxGeometry args={[0.08, 0.08, 0.08]} /></mesh>
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={rcsGlowMaterial}>
          <coneGeometry args={[0.025, 0.05, 8]} />
        </mesh>
      </group>

      {/* High-Gain Dish Antenna */}
      <group position={[0, 0.65, 0.2]} rotation={[-0.3, 0.4, 0]}>
        <mesh material={solarFrameMaterial}><cylinderGeometry args={[0.02, 0.02, 0.35, 8]} /></mesh>
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 4, 0, 0]} material={titaniumHullMaterial}>
          <sphereGeometry args={[0.22, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 5. DUAL HIGH-IMPULSE ION PROPULSION ENGINES              */}
      {/* ======================================================== */}
      <group position={[0, 0, 0.55]}>
        {/* Left Ion Nozzle */}
        <group position={[-0.22, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={darkThermalMaterial} castShadow>
            <cylinderGeometry args={[0.18, 0.25, 0.4, 20]} />
          </mesh>
          <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]} material={ionGlowMaterial}>
            <cylinderGeometry args={[0.14, 0.18, 0.08, 20]} />
          </mesh>
          <mesh ref={thrusterPlumeRef1} position={[0, 0, 0.6]} rotation={[-Math.PI / 2, 0, 0]} material={ionGlowMaterial}>
            <coneGeometry args={[0.18, 0.9, 16]} />
          </mesh>
        </group>

        {/* Right Ion Nozzle */}
        <group position={[0.22, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={darkThermalMaterial} castShadow>
            <cylinderGeometry args={[0.18, 0.25, 0.4, 20]} />
          </mesh>
          <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]} material={ionGlowMaterial}>
            <cylinderGeometry args={[0.14, 0.18, 0.08, 20]} />
          </mesh>
          <mesh ref={thrusterPlumeRef2} position={[0, 0, 0.6]} rotation={[-Math.PI / 2, 0, 0]} material={ionGlowMaterial}>
            <coneGeometry args={[0.18, 0.9, 16]} />
          </mesh>
        </group>

        {/* Dynamic Thruster Light */}
        <pointLight
          ref={thrusterLightRef}
          position={[0, 0, 0.8]}
          color="#60A5FA"
          distance={7}
          intensity={3.0}
        />

        {/* Trailing Ion Plasma Particles */}
        <points ref={wakeParticlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[wakeParticles.pos, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.065}
            color="#BAE6FD"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  )
}
