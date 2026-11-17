import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AIBirdProps {
  position?: [number, number, number]
  scale?: number
}

// Helper to create a 3D tube geometry from waypoints
function createTraceGeometry(points: [number, number, number][], radius = 0.024) {
  const vectors = points.map((p) => new THREE.Vector3(...p))
  const curve = new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.2)
  return new THREE.TubeGeometry(curve, points.length * 8, radius, 8, false)
}

export function AIBird({ position = [0, -1.5, 1.8], scale = 0.85 }: AIBirdProps) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const pulsesRef = useRef<THREE.Points>(null)
  const eyeLightRef = useRef<THREE.SpotLight>(null)
  const corePointLightRef = useRef<THREE.PointLight>(null)

  // Monochromatic & circuit metallic materials inspired by the reference logo
  const silverCircuitMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E2E8F0', // Clean silver/white PCB trace
        metalness: 0.9,
        roughness: 0.2,
      }),
    []
  )

  const cyanCircuitMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#38BDF8', // Cyan neural data trace
        emissive: '#0284C7',
        emissiveIntensity: 0.6,
        metalness: 0.85,
        roughness: 0.25,
      }),
    []
  )

  const goldBeakMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F59E0B', // Amber/gold conductive trace for the beak
        emissive: '#B45309',
        emissiveIntensity: 0.5,
        metalness: 0.92,
        roughness: 0.18,
      }),
    []
  )

  const darkBaseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0A0A0C', // Matte black substrate
        metalness: 0.4,
        roughness: 0.8,
      }),
    []
  )

  const viaPadMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FFFFFF', // High-intensity solder via pads
        emissive: '#FFFFFF',
        emissiveIntensity: 0.85,
        metalness: 0.95,
        roughness: 0.1,
      }),
    []
  )

  const rockMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#121316',
        roughness: 0.88,
        metalness: 0.22,
        flatShading: true,
      }),
    []
  )

  // Detailed 3D Circuit Eagle Traces based on the AI Club reference logo
  const { traces, viaNodes, pulseData } = useMemo(() => {
    const list: {
      geom: THREE.TubeGeometry
      type: 'silver' | 'cyan' | 'gold'
      points: [number, number, number][]
    }[] = []

    const nodes: [number, number, number, 'silver' | 'cyan' | 'gold'][] = []

    // 1. BEAK CIRCUIT TRACES (Amber/Gold conduits)
    const beakUpper: [number, number, number][] = [
      [0, 0.15, 0.45],
      [0.08, 0.12, 0.65],
      [0.18, 0.05, 0.95],
      [0.22, -0.08, 1.25],
      [0.18, -0.28, 1.45],
      [0.06, -0.42, 1.4],
    ]
    list.push({ geom: createTraceGeometry(beakUpper, 0.032), type: 'gold', points: beakUpper })
    nodes.push([0.06, -0.42, 1.4, 'gold'])

    const beakLower: [number, number, number][] = [
      [0, -0.15, 0.5],
      [0.12, -0.18, 0.85],
      [0.16, -0.26, 1.15],
      [0.08, -0.36, 1.28],
    ]
    list.push({ geom: createTraceGeometry(beakLower, 0.028), type: 'gold', points: beakLower })
    nodes.push([0.08, -0.36, 1.28, 'gold'])

    const beakNaresTrace: [number, number, number][] = [
      [0.08, 0.08, 0.55],
      [0.14, 0.02, 0.78],
      [0.14, -0.1, 0.88],
    ]
    list.push({ geom: createTraceGeometry(beakNaresTrace, 0.022), type: 'gold', points: beakNaresTrace })
    nodes.push([0.14, -0.1, 0.88, 'gold'])

    // Mirror beak traces for symmetrical 3D volume
    const beakUpperL: [number, number, number][] = beakUpper.map(([x, y, z]) => [-x, y, z])
    list.push({ geom: createTraceGeometry(beakUpperL, 0.032), type: 'gold', points: beakUpperL })
    nodes.push([-0.06, -0.42, 1.4, 'gold'])

    const beakLowerL: [number, number, number][] = beakLower.map(([x, y, z]) => [-x, y, z])
    list.push({ geom: createTraceGeometry(beakLowerL, 0.028), type: 'gold', points: beakLowerL })
    nodes.push([-0.08, -0.36, 1.28, 'gold'])

    // 2. EYE CIRCUIT & BROW CONTOUR (Amber / Cyan)
    const eyeUpper: [number, number, number][] = [
      [0.18, 0.22, 0.42],
      [0.26, 0.18, 0.52],
      [0.32, 0.08, 0.62],
      [0.34, -0.04, 0.55],
    ]
    list.push({ geom: createTraceGeometry(eyeUpper, 0.026), type: 'gold', points: eyeUpper })
    nodes.push([0.34, -0.04, 0.55, 'gold'])

    const eyeLower: [number, number, number][] = [
      [0.18, 0.02, 0.42],
      [0.24, -0.02, 0.48],
      [0.32, -0.06, 0.54],
    ]
    list.push({ geom: createTraceGeometry(eyeLower, 0.024), type: 'cyan', points: eyeLower })
    nodes.push([0.18, 0.02, 0.42, 'cyan'])

    // Left eye
    const eyeUpperL: [number, number, number][] = eyeUpper.map(([x, y, z]) => [-x, y, z])
    list.push({ geom: createTraceGeometry(eyeUpperL, 0.026), type: 'gold', points: eyeUpperL })
    nodes.push([-0.34, -0.04, 0.55, 'gold'])

    const eyeLowerL: [number, number, number][] = eyeLower.map(([x, y, z]) => [-x, y, z])
    list.push({ geom: createTraceGeometry(eyeLowerL, 0.024), type: 'cyan', points: eyeLowerL })
    nodes.push([-0.18, 0.02, 0.42, 'cyan'])

    // 3. FOREHEAD & CROWN CIRCUIT TRACES (Cyan & Silver)
    const crown1: [number, number, number][] = [
      [0.15, 0.32, 0.45],
      [0.22, 0.38, 0.3],
      [0.24, 0.42, 0.05],
      [0.2, 0.45, -0.25],
      [0.12, 0.42, -0.48],
    ]
    list.push({ geom: createTraceGeometry(crown1, 0.025), type: 'cyan', points: crown1 })
    nodes.push([0.12, 0.42, -0.48, 'cyan'])

    const crown2: [number, number, number][] = [
      [0, 0.35, 0.42],
      [0.08, 0.44, 0.15],
      [0.09, 0.48, -0.15],
      [0.05, 0.46, -0.42],
    ]
    list.push({ geom: createTraceGeometry(crown2, 0.028), type: 'silver', points: crown2 })
    nodes.push([0.05, 0.46, -0.42, 'silver'])

    const crown1L: [number, number, number][] = crown1.map(([x, y, z]) => [-x, y, z])
    list.push({ geom: createTraceGeometry(crown1L, 0.025), type: 'cyan', points: crown1L })
    nodes.push([-0.12, 0.42, -0.48, 'cyan'])

    const crown2L: [number, number, number][] = crown2.map(([x, y, z]) => [-x, y, z])
    list.push({ geom: createTraceGeometry(crown2L, 0.028), type: 'silver', points: crown2L })
    nodes.push([-0.05, 0.46, -0.42, 'silver'])

    // 4. CHEEK & AURICULAR CIRCUIT BUS (Cyan)
    const cheek1: [number, number, number][] = [
      [0.28, 0.12, 0.35],
      [0.38, 0.08, 0.18],
      [0.42, 0.02, -0.05],
      [0.38, -0.06, -0.28],
    ]
    list.push({ geom: createTraceGeometry(cheek1, 0.026), type: 'cyan', points: cheek1 })
    nodes.push([0.38, -0.06, -0.28, 'cyan'])

    const cheek2: [number, number, number][] = [
      [0.24, -0.02, 0.32],
      [0.34, -0.08, 0.12],
      [0.36, -0.16, -0.12],
    ]
    list.push({ geom: createTraceGeometry(cheek2, 0.024), type: 'cyan', points: cheek2 })
    nodes.push([0.36, -0.16, -0.12, 'cyan'])

    const cheek1L: [number, number, number][] = cheek1.map(([x, y, z]) => [-x, y, z])
    list.push({ geom: createTraceGeometry(cheek1L, 0.026), type: 'cyan', points: cheek1L })
    nodes.push([-0.38, -0.06, -0.28, 'cyan'])

    const cheek2L: [number, number, number][] = cheek2.map(([x, y, z]) => [-x, y, z])
    list.push({ geom: createTraceGeometry(cheek2L, 0.024), type: 'cyan', points: cheek2L })
    nodes.push([-0.36, -0.16, -0.12, 'cyan'])

    // 5. CASCADING THROAT & NAPE FEATHER CIRCUIT TRACES (Logo signature style)
    // Vertical bus tracks ending in circular solder nodes
    const neckTracesDef: [number, number, number, number, 'silver' | 'cyan'][] = [
      [0.36, -0.15, -0.05, 0.75, 'cyan'],
      [0.32, -0.22, 0.08, 0.9, 'cyan'],
      [0.26, -0.28, 0.18, 1.05, 'silver'],
      [0.18, -0.32, 0.28, 1.15, 'cyan'],
      [0.09, -0.35, 0.35, 1.25, 'silver'],
      [0.0, -0.38, 0.38, 1.35, 'silver'],
      [0.38, -0.05, -0.22, 0.65, 'silver'],
      [0.42, 0.02, -0.35, 0.55, 'cyan'],
    ]

    neckTracesDef.forEach(([startX, startY, startZ, length, type]) => {
      // Trace steps down vertically and angles inward
      const p1: [number, number, number] = [startX, startY, startZ]
      const p2: [number, number, number] = [startX * 0.9, startY - length * 0.45, startZ - 0.05]
      const p3: [number, number, number] = [startX * 0.75, startY - length, startZ - 0.1]
      const tracePts: [number, number, number][] = [p1, p2, p3]

      list.push({ geom: createTraceGeometry(tracePts, 0.022), type, points: tracePts })
      nodes.push([p3[0], p3[1], p3[2], type])

      if (startX !== 0) {
        const p1L: [number, number, number] = [-p1[0], p1[1], p1[2]]
        const p2L: [number, number, number] = [-p2[0], p2[1], p2[2]]
        const p3L: [number, number, number] = [-p3[0], p3[1], p3[2]]
        const tracePtsL: [number, number, number][] = [p1L, p2L, p3L]
        list.push({ geom: createTraceGeometry(tracePtsL, 0.022), type, points: tracePtsL })
        nodes.push([p3L[0], p3L[1], p3L[2], type])
      }
    })

    // Setup action potential pulses along each trace
    const pulses = list.map((item) => ({
      curve: new THREE.CatmullRomCurve3(item.points.map((p) => new THREE.Vector3(...p))),
      progress: Math.random(),
      speed: 0.35 + Math.random() * 0.65,
    }))

    return { traces: list, viaNodes: nodes, pulseData: pulses }
  }, [])

  // Pulse points array for real-time rendering
  const pulsePositions = useMemo(() => {
    return new Float32Array(pulseData.length * 3)
  }, [pulseData])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const { pointer } = state

    // Predatory Head Tracking matching user cursor
    const targetHeadYaw = pointer.x * 0.82 + Math.cos(t * 0.9) * 0.02
    const targetHeadPitch = -0.22 - pointer.y * 0.48 + Math.sin(t * 1.3) * 0.025
    const targetHeadRoll = -pointer.x * 0.22

    if (headRef.current) {
      const dampSpeed = 5.5
      headRef.current.rotation.y = THREE.MathUtils.damp(headRef.current.rotation.y, targetHeadYaw, dampSpeed, delta)
      headRef.current.rotation.x = THREE.MathUtils.damp(headRef.current.rotation.x, targetHeadPitch, dampSpeed, delta)
      headRef.current.rotation.z = THREE.MathUtils.damp(headRef.current.rotation.z, targetHeadRoll, dampSpeed, delta)
    }

    if (groupRef.current) {
      // Subtle hovering breathing
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.035
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, pointer.x * 0.16, 3.2, delta)
    }

    // Animate glowing data packets along the circuit pathways
    if (pulsesRef.current) {
      const posAttr = pulsesRef.current.geometry.attributes.position
      const currentPos = posAttr.array as Float32Array

      pulseData.forEach((p, i) => {
        p.progress += delta * p.speed
        if (p.progress > 1) p.progress = 0

        const pt = p.curve.getPointAt(p.progress)
        currentPos[i * 3] = pt.x
        currentPos[i * 3 + 1] = pt.y
        currentPos[i * 3 + 2] = pt.z
      })

      posAttr.needsUpdate = true
    }

    if (eyeLightRef.current) {
      eyeLightRef.current.intensity = 2.8 + Math.sin(t * 2.5) * 0.5
    }

    if (corePointLightRef.current) {
      corePointLightRef.current.intensity = 1.6 + Math.sin(t * 4.0) * 0.4
    }
  })

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* ======================================================== */}
      {/* 0. LUNAR BASALT CRAG PERCH                               */}
      {/* ======================================================== */}
      <mesh position={[0, -1.8, 0]} material={rockMaterial} castShadow receiveShadow>
        <dodecahedronGeometry args={[1.3, 1]} />
      </mesh>

      {/* Internal Core Glow Light radiating through circuit lattice */}
      <pointLight
        ref={corePointLightRef}
        position={[0, 0.1, 0.15]}
        color="#38BDF8"
        intensity={1.8}
        distance={3.5}
        decay={2}
      />

      {/* ======================================================== */}
      {/* 1. DYNAMIC CIRCUIT EAGLE HEAD (Tracks Mouse)             */}
      {/* ======================================================== */}
      <group ref={headRef} position={[0, 0, 0]}>
        {/* Dark Aerodynamic Substrate Core (Matte silhouette backing) */}
        <mesh position={[0, 0.02, -0.05]} material={darkBaseMaterial} castShadow>
          <sphereGeometry args={[0.42, 28, 28]} />
        </mesh>
        <mesh position={[0, -0.4, -0.08]} rotation={[-0.2, 0, 0]} material={darkBaseMaterial} castShadow>
          <cylinderGeometry args={[0.38, 0.28, 0.9, 24]} />
        </mesh>

        {/* Central Focused Cybernetic Eye Apertures */}
        <group position={[0.26, 0.06, 0.48]} rotation={[0, 0.4, 0]}>
          <mesh material={cyanCircuitMaterial}>
            <ringGeometry args={[0.04, 0.09, 24]} />
          </mesh>
          <mesh position={[0, 0, 0.01]} material={viaPadMaterial}>
            <circleGeometry args={[0.035, 24]} />
          </mesh>
        </group>

        <group position={[-0.26, 0.06, 0.48]} rotation={[0, -0.4, 0]}>
          <mesh material={cyanCircuitMaterial}>
            <ringGeometry args={[0.04, 0.09, 24]} />
          </mesh>
          <mesh position={[0, 0, 0.01]} material={viaPadMaterial}>
            <circleGeometry args={[0.035, 24]} />
          </mesh>
        </group>

        {/* Active Eye Spotlight tracking cursor */}
        <spotLight
          ref={eyeLightRef}
          position={[0, 0.06, 0.6]}
          target-position={[0, -2, 8]}
          color="#38BDF8"
          intensity={3.2}
          angle={0.52}
          penumbra={0.7}
          distance={18}
          castShadow
        />

        {/* 3D Extruded Circuit Traces (Gold beak, cyan neural lines, silver bus) */}
        {traces.map((trace, i) => (
          <mesh
            key={i}
            geometry={trace.geom}
            material={
              trace.type === 'gold'
                ? goldBeakMaterial
                : trace.type === 'cyan'
                ? cyanCircuitMaterial
                : silverCircuitMaterial
            }
            castShadow
            receiveShadow
          />
        ))}

        {/* Terminal Solder Nodes / Vias (White & Colored circular pads from logo) */}
        {viaNodes.map(([vx, vy, vz, vType], idx) => (
          <mesh
            key={idx}
            position={[vx, vy, vz]}
            material={vType === 'gold' ? goldBeakMaterial : vType === 'cyan' ? cyanCircuitMaterial : viaPadMaterial}
          >
            <sphereGeometry args={[0.042, 12, 12]} />
          </mesh>
        ))}

        {/* Glowing Data Packets Pulsing Along Traces */}
        <points ref={pulsesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.075}
            color="#FFFFFF"
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
      </group>
    </group>
  )
}
