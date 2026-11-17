import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createSpacesuitNormalTexture } from '../../utils/textureGenerators'

interface AstronautProps {
  position?: [number, number, number]
  scale?: number
}

export function Astronaut({ position = [0, -1.9, 1.8], scale = 0.55 }: AstronautProps) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const chestLightRef = useRef<THREE.PointLight>(null)
  const antennaLedRef = useRef<THREE.PointLight>(null)
  const helmetLightLeftRef = useRef<THREE.SpotLight>(null)
  const helmetLightRightRef = useRef<THREE.SpotLight>(null)

  // Procedural woven fabric normal texture
  const fabricNormal = useMemo(() => createSpacesuitNormalTexture(), [])

  // Monochromatic high-fidelity spacesuit materials
  const suitFabricMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D8DBDF', // Pressurized thermal micrometeroid garment
        roughness: 0.6,
        metalness: 0.12,
        normalMap: fabricNormal,
        normalScale: new THREE.Vector2(0.65, 0.65),
      }),
    [fabricNormal]
  )

  const suitAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E8EAED', // Clean white outer shell plates
        roughness: 0.45,
        metalness: 0.2,
      }),
    []
  )

  const carbonJointMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#161719', // Dark carbon/rubber flexible joint convolutes
        roughness: 0.8,
        metalness: 0.25,
      }),
    []
  )

  // Mirror-chrome / high-metallic gold-silver visor reflecting the nebula
  const visorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F0F2F5',
        roughness: 0.04,
        metalness: 0.98,
        envMapIntensity: 2.5,
      }),
    []
  )

  const hardwareMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9CA3AF', // Anodized aluminum & titanium fittings
        roughness: 0.35,
        metalness: 0.85,
      }),
    []
  )

  const glowScreenMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
    []
  )

  const redBeaconMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#E0E2E5', // Monochromatic silver-white beacon
      }),
    []
  )

  // Cursor tracking & physical inertia damping
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const { pointer } = state

    // Dynamic target angles based on cursor position
    const targetHeadYaw = pointer.x * 0.65 + Math.cos(t * 0.8) * 0.025
    const targetHeadPitch = -0.22 - pointer.y * 0.38 + Math.sin(t * 1.2) * 0.02
    const targetHeadRoll = -pointer.x * 0.12

    if (headRef.current) {
      const dampSpeed = 4.5
      headRef.current.rotation.y = THREE.MathUtils.damp(headRef.current.rotation.y, targetHeadYaw, dampSpeed, delta)
      headRef.current.rotation.x = THREE.MathUtils.damp(headRef.current.rotation.x, targetHeadPitch, dampSpeed, delta)
      headRef.current.rotation.z = THREE.MathUtils.damp(headRef.current.rotation.z, targetHeadRoll, dampSpeed, delta)
    }

    if (groupRef.current) {
      const targetTorsoYaw = pointer.x * 0.18 + Math.sin(t * 0.5) * 0.03
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetTorsoYaw, 3.0, delta)
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.02
    }

    if (chestLightRef.current) {
      chestLightRef.current.intensity = 0.45 + Math.sin(t * 3.5) * 0.15
    }

    if (antennaLedRef.current) {
      // Blinking communication beacon on backpack antenna
      antennaLedRef.current.intensity = Math.sin(t * 5.0) > 0.3 ? 0.8 : 0.05
    }
  })

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* ======================================================== */}
      {/* 1. HELMET & HEAD ASSEMBLY                                */}
      {/* ======================================================== */}
      <group ref={headRef} position={[0, 2.52, 0]}>
        {/* Outer Pressure Helmet Shell */}
        <mesh material={suitAccentMaterial} castShadow receiveShadow>
          <sphereGeometry args={[0.56, 36, 36]} />
        </mesh>

        {/* Visor Sun Shield Brow Housing */}
        <mesh position={[0, 0.34, 0.16]} rotation={[-0.2, 0, 0]} material={suitAccentMaterial} castShadow>
          <boxGeometry args={[0.62, 0.18, 0.38]} />
        </mesh>

        {/* Reflective Visor - High Specular Mirror Chrome */}
        <mesh position={[0, 0.06, 0.28]} rotation={[-0.14, 0, 0]} material={visorMaterial} castShadow>
          <sphereGeometry args={[0.39, 36, 28, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        </mesh>

        {/* Outer Visor Bezel Ring */}
        <mesh position={[0, 0.06, 0.27]} rotation={[-0.14, 0, 0]} material={hardwareMaterial}>
          <torusGeometry args={[0.39, 0.03, 16, 36, Math.PI * 1.3]} />
        </mesh>

        {/* Helmet Neck Disconnect Collar with Locking Latches */}
        <mesh position={[0, -0.44, 0]} material={hardwareMaterial} castShadow>
          <cylinderGeometry args={[0.49, 0.53, 0.16, 36]} />
        </mesh>
        <mesh position={[0.48, -0.44, 0]} material={hardwareMaterial}>
          <boxGeometry args={[0.08, 0.08, 0.1]} />
        </mesh>
        <mesh position={[-0.48, -0.44, 0]} material={hardwareMaterial}>
          <boxGeometry args={[0.08, 0.08, 0.1]} />
        </mesh>

        {/* Left Helmet Spotlight Assembly */}
        <group position={[-0.56, 0.04, 0.12]} rotation={[0, -0.25, 0]}>
          <mesh material={hardwareMaterial} castShadow>
            <cylinderGeometry args={[0.08, 0.11, 0.16, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.09]} material={glowScreenMaterial}>
            <circleGeometry args={[0.07, 16]} />
          </mesh>
          <spotLight
            ref={helmetLightLeftRef}
            position={[0, 0, 0.15]}
            target-position={[-0.8, -2.5, 6]}
            color="#FFFFFF"
            intensity={2.8}
            angle={0.45}
            penumbra={0.6}
            distance={14}
            castShadow
          />
        </group>

        {/* Right Helmet Spotlight Assembly */}
        <group position={[0.56, 0.04, 0.12]} rotation={[0, 0.25, 0]}>
          <mesh material={hardwareMaterial} castShadow>
            <cylinderGeometry args={[0.08, 0.11, 0.16, 16]} />
          </mesh>
          <mesh position={[0, 0, 0.09]} material={glowScreenMaterial}>
            <circleGeometry args={[0.07, 16]} />
          </mesh>
          <spotLight
            ref={helmetLightRightRef}
            position={[0, 0, 0.15]}
            target-position={[0.8, -2.5, 6]}
            color="#FFFFFF"
            intensity={2.8}
            angle={0.45}
            penumbra={0.6}
            distance={14}
            castShadow
          />
        </group>
      </group>

      {/* ======================================================== */}
      {/* 2. TORSO & HARD UPPER TORSO (HUT)                        */}
      {/* ======================================================== */}
      <group position={[0, 1.45, 0]}>
        {/* Main Pressurized Chest Body */}
        <mesh material={suitFabricMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.58, 0.49, 1.25, 28]} />
        </mesh>

        {/* Shoulder Yoke Protective Plates */}
        <mesh position={[0, 0.52, 0]} material={suitAccentMaterial} castShadow>
          <cylinderGeometry args={[0.62, 0.6, 0.18, 28]} />
        </mesh>

        {/* Chest Display and Control Module (DCM) */}
        <group position={[0, 0.08, 0.5]}>
          {/* DCM Aluminum Enclosure */}
          <mesh material={hardwareMaterial} castShadow>
            <boxGeometry args={[0.52, 0.48, 0.18]} />
          </mesh>

          {/* Telemetry Digital Screen */}
          <mesh position={[0, 0.12, 0.095]} material={glowScreenMaterial}>
            <planeGeometry args={[0.26, 0.09]} />
          </mesh>

          {/* DCM Status Light */}
          <pointLight
            ref={chestLightRef}
            position={[0, 0.12, 0.35]}
            color="#FFFFFF"
            distance={1.6}
            decay={2}
            intensity={0.45}
          />

          {/* Dials, Rotary Switches & Purge Valves */}
          <mesh position={[-0.15, -0.08, 0.095]} material={carbonJointMaterial}>
            <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
          </mesh>
          <mesh position={[0.15, -0.08, 0.095]} material={carbonJointMaterial}>
            <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
          </mesh>
          <mesh position={[0, -0.12, 0.095]} material={carbonJointMaterial}>
            <boxGeometry args={[0.12, 0.04, 0.03]} />
          </mesh>

          {/* Umbilical Hose Connectors on Bottom of DCM */}
          <mesh position={[-0.18, -0.26, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={hardwareMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
          </mesh>
          <mesh position={[0.18, -0.26, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={hardwareMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
          </mesh>
        </group>

        {/* Flexible Umbilical Cables curving around to backpack */}
        <mesh position={[-0.42, -0.1, 0.15]} rotation={[0.4, -0.6, 0]} material={carbonJointMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.65, 12]} />
        </mesh>
        <mesh position={[0.42, -0.1, 0.15]} rotation={[0.4, 0.6, 0]} material={carbonJointMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.65, 12]} />
        </mesh>

        {/* Waist Utility Harness & Equipment Belt */}
        <mesh position={[0, -0.58, 0]} material={carbonJointMaterial} castShadow>
          <cylinderGeometry args={[0.53, 0.53, 0.14, 28]} />
        </mesh>

        {/* Belt Utility Pouches & Carabiners */}
        <mesh position={[-0.46, -0.58, 0.18]} rotation={[0, 0.35, 0]} material={suitFabricMaterial} castShadow>
          <boxGeometry args={[0.2, 0.22, 0.14]} />
        </mesh>
        <mesh position={[0.46, -0.58, 0.18]} rotation={[0, -0.35, 0]} material={suitFabricMaterial} castShadow>
          <boxGeometry args={[0.2, 0.22, 0.14]} />
        </mesh>
        <mesh position={[0, -0.58, -0.52]} material={hardwareMaterial}>
          <boxGeometry args={[0.24, 0.12, 0.08]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. PORTABLE LIFE SUPPORT SYSTEM (PLSS BACKPACK)         */}
      {/* ======================================================== */}
      <group position={[0, 1.58, -0.46]}>
        {/* Main Contoured Backpack Housing */}
        <mesh material={suitAccentMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.86, 1.32, 0.44]} />
        </mesh>

        {/* Top Oxygen Purge System (OPS) Cap */}
        <mesh position={[0, 0.72, -0.04]} material={hardwareMaterial} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.16, 24]} />
        </mesh>

        {/* Dual Cryogenic Primary Oxygen Cylinders */}
        <mesh position={[-0.34, 0.12, -0.12]} material={hardwareMaterial} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.95, 18]} />
        </mesh>
        <mesh position={[0.34, 0.12, -0.12]} material={hardwareMaterial} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.95, 18]} />
        </mesh>

        {/* Heat Sublimation Radiator Vent Slats */}
        <mesh position={[0, 0.15, -0.23]} material={carbonJointMaterial}>
          <boxGeometry args={[0.45, 0.55, 0.03]} />
        </mesh>

        {/* High-Gain UHF Antenna Mast with Telemetry Beacon */}
        <mesh position={[0.34, 0.95, 0.06]} material={hardwareMaterial}>
          <cylinderGeometry args={[0.016, 0.02, 0.85, 10]} />
        </mesh>
        <mesh position={[0.34, 1.38, 0.06]} material={redBeaconMaterial}>
          <sphereGeometry args={[0.045, 14, 14]} />
        </mesh>
        <pointLight
          ref={antennaLedRef}
          position={[0.34, 1.38, 0.06]}
          color="#FFFFFF"
          distance={1.5}
          decay={2}
          intensity={0.8}
        />

        {/* Thruster / Sublimation Nozzles at Base */}
        <mesh position={[-0.22, -0.7, 0]} rotation={[Math.PI, 0, 0]} material={hardwareMaterial}>
          <coneGeometry args={[0.09, 0.14, 16]} />
        </mesh>
        <mesh position={[0.22, -0.7, 0]} rotation={[Math.PI, 0, 0]} material={hardwareMaterial}>
          <coneGeometry args={[0.09, 0.14, 16]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 4. ARMS, SCUPPERS & ARTICULATED GLOVES                   */}
      {/* ======================================================== */}
      {/* Left Arm Assembly */}
      <group position={[-0.68, 1.88, 0]}>
        {/* Shoulder Arm Scupper Ring */}
        <mesh material={suitAccentMaterial} castShadow>
          <sphereGeometry args={[0.26, 20, 20]} />
        </mesh>
        {/* Upper Arm Pressurized Bellows */}
        <mesh position={[-0.08, -0.34, 0.04]} rotation={[0, 0, 0.18]} material={suitFabricMaterial} castShadow>
          <cylinderGeometry args={[0.18, 0.16, 0.56, 18]} />
        </mesh>
        {/* Elbow Convolute Joint */}
        <mesh position={[-0.15, -0.66, 0.05]} material={carbonJointMaterial}>
          <sphereGeometry args={[0.17, 16, 16]} />
        </mesh>
        {/* Forearm & Wrist Disconnect Ring */}
        <mesh position={[-0.13, -0.96, 0.16]} rotation={[-0.32, 0, 0.1]} material={suitFabricMaterial} castShadow>
          <cylinderGeometry args={[0.16, 0.14, 0.52, 18]} />
        </mesh>
        <mesh position={[-0.12, -1.22, 0.26]} rotation={[-0.32, 0, 0.1]} material={hardwareMaterial}>
          <cylinderGeometry args={[0.15, 0.15, 0.06, 18]} />
        </mesh>
        {/* Pressurized Glove */}
        <mesh position={[-0.11, -1.34, 0.32]} material={carbonJointMaterial} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
      </group>

      {/* Right Arm Assembly */}
      <group position={[0.68, 1.88, 0]}>
        {/* Shoulder Arm Scupper Ring */}
        <mesh material={suitAccentMaterial} castShadow>
          <sphereGeometry args={[0.26, 20, 20]} />
        </mesh>
        {/* Upper Arm Pressurized Bellows */}
        <mesh position={[0.08, -0.34, 0.04]} rotation={[0, 0, -0.18]} material={suitFabricMaterial} castShadow>
          <cylinderGeometry args={[0.18, 0.16, 0.56, 18]} />
        </mesh>
        {/* Elbow Convolute Joint */}
        <mesh position={[0.15, -0.66, 0.05]} material={carbonJointMaterial}>
          <sphereGeometry args={[0.17, 16, 16]} />
        </mesh>
        {/* Forearm & Wrist Disconnect Ring */}
        <mesh position={[0.13, -0.96, 0.16]} rotation={[-0.32, 0, -0.1]} material={suitFabricMaterial} castShadow>
          <cylinderGeometry args={[0.16, 0.14, 0.52, 18]} />
        </mesh>
        <mesh position={[0.12, -1.22, 0.26]} rotation={[-0.32, 0, -0.1]} material={hardwareMaterial}>
          <cylinderGeometry args={[0.15, 0.15, 0.06, 18]} />
        </mesh>
        {/* Pressurized Glove */}
        <mesh position={[0.11, -1.34, 0.32]} material={carbonJointMaterial} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 5. LEGS, KNEE CONVOLUTES & HEAVY LUNAR BOOTS             */}
      {/* ======================================================== */}
      {/* Left Leg */}
      <group position={[-0.29, 0.8, 0]}>
        {/* Hip Joint Convolute */}
        <mesh material={carbonJointMaterial}>
          <sphereGeometry args={[0.19, 16, 16]} />
        </mesh>
        {/* Thigh */}
        <mesh position={[-0.04, -0.4, 0.02]} rotation={[0.05, 0, 0.06]} material={suitFabricMaterial} castShadow>
          <cylinderGeometry args={[0.22, 0.19, 0.74, 18]} />
        </mesh>
        {/* Knee Protective Bellows */}
        <mesh position={[-0.04, -0.84, 0.08]} material={carbonJointMaterial} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.16, 18]} />
        </mesh>
        {/* Calf / Lower Leg */}
        <mesh position={[-0.04, -1.24, 0.02]} rotation={[-0.04, 0, 0]} material={suitFabricMaterial} castShadow>
          <cylinderGeometry args={[0.2, 0.18, 0.68, 18]} />
        </mesh>
        {/* Heavy Lunar Overshoe Boot with Deep Tread Soles */}
        <group position={[-0.04, -1.64, 0.12]}>
          <mesh material={suitAccentMaterial} castShadow receiveShadow>
            <boxGeometry args={[0.3, 0.22, 0.58]} />
          </mesh>
          {/* Deep Silicone Tread Sole */}
          <mesh position={[0, -0.13, 0]} material={carbonJointMaterial} receiveShadow>
            <boxGeometry args={[0.32, 0.06, 0.62]} />
          </mesh>
          {/* Heel Lock Clamp */}
          <mesh position={[0, 0.04, -0.28]} material={hardwareMaterial}>
            <boxGeometry args={[0.24, 0.1, 0.06]} />
          </mesh>
        </group>
      </group>

      {/* Right Leg */}
      <group position={[0.29, 0.8, 0]}>
        {/* Hip Joint Convolute */}
        <mesh material={carbonJointMaterial}>
          <sphereGeometry args={[0.19, 16, 16]} />
        </mesh>
        {/* Thigh */}
        <mesh position={[0.04, -0.4, 0.02]} rotation={[0.05, 0, -0.06]} material={suitFabricMaterial} castShadow>
          <cylinderGeometry args={[0.22, 0.19, 0.74, 18]} />
        </mesh>
        {/* Knee Protective Bellows */}
        <mesh position={[0.04, -0.84, 0.08]} material={carbonJointMaterial} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.16, 18]} />
        </mesh>
        {/* Calf / Lower Leg */}
        <mesh position={[0.04, -1.24, 0.02]} rotation={[-0.04, 0, 0]} material={suitFabricMaterial} castShadow>
          <cylinderGeometry args={[0.2, 0.18, 0.68, 18]} />
        </mesh>
        {/* Heavy Lunar Overshoe Boot with Deep Tread Soles */}
        <group position={[0.04, -1.64, 0.12]}>
          <mesh material={suitAccentMaterial} castShadow receiveShadow>
            <boxGeometry args={[0.3, 0.22, 0.58]} />
          </mesh>
          {/* Deep Silicone Tread Sole */}
          <mesh position={[0, -0.13, 0]} material={carbonJointMaterial} receiveShadow>
            <boxGeometry args={[0.32, 0.06, 0.62]} />
          </mesh>
          {/* Heel Lock Clamp */}
          <mesh position={[0, 0.04, -0.28]} material={hardwareMaterial}>
            <boxGeometry args={[0.24, 0.1, 0.06]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
