import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NeuralNetwork3DProps {
  position?: [number, number, number]
  scale?: number
}

export function NeuralNetwork3D({ position = [0, 0, 0], scale = 1 }: NeuralNetwork3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pulsesRef = useRef<THREE.Points>(null)

  // Generate multi-layer neural network node coordinates & synapse connections
  const { nodePositions, linePositions, pulsePoints, pulseOriginals } = useMemo(() => {
    const layers = [4, 8, 12, 10, 6, 2]
    const layerSpacing = 2.4
    const nodeCoords: THREE.Vector3[] = []
    const layerNodes: THREE.Vector3[][] = []

    layers.forEach((count, lIdx) => {
      const z = (lIdx - (layers.length - 1) / 2) * layerSpacing
      const currentLayer: THREE.Vector3[] = []

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        const radius = 1.2 + (i % 2) * 0.8 + (Math.random() - 0.5) * 0.4
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3

        const v = new THREE.Vector3(x, y, z)
        nodeCoords.push(v)
        currentLayer.push(v)
      }
      layerNodes.push(currentLayer)
    })

    // Connect nodes between adjacent layers with probability
    const lines: number[] = []
    const pulses: { start: THREE.Vector3; end: THREE.Vector3; progress: number; speed: number }[] = []

    for (let l = 0; l < layerNodes.length - 1; l++) {
      const fromLayer = layerNodes[l]
      const toLayer = layerNodes[l + 1]

      fromLayer.forEach((fromNode) => {
        toLayer.forEach((toNode) => {
          // Connect with 45% density
          if (Math.random() > 0.55) {
            lines.push(fromNode.x, fromNode.y, fromNode.z)
            lines.push(toNode.x, toNode.y, toNode.z)

            if (Math.random() > 0.6) {
              pulses.push({
                start: fromNode.clone(),
                end: toNode.clone(),
                progress: Math.random(),
                speed: 0.4 + Math.random() * 0.8,
              })
            }
          }
        })
      })
    }

    const linePos = new Float32Array(lines)
    const nodePos = new Float32Array(nodeCoords.length * 3)
    nodeCoords.forEach((v, i) => {
      nodePos[i * 3] = v.x
      nodePos[i * 3 + 1] = v.y
      nodePos[i * 3 + 2] = v.z
    })

    const pulsePos = new Float32Array(pulses.length * 3)
    pulses.forEach((p, i) => {
      const cur = p.start.clone().lerp(p.end, p.progress)
      pulsePos[i * 3] = cur.x
      pulsePos[i * 3 + 1] = cur.y
      pulsePos[i * 3 + 2] = cur.z
    })

    return {
      nodePositions: nodePos,
      linePositions: linePos,
      pulsePoints: pulsePos,
      pulseOriginals: pulses,
    }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.1
    }

    if (pulsesRef.current) {
      const posAttr = pulsesRef.current.geometry.attributes.position
      const currentPos = posAttr.array as Float32Array

      pulseOriginals.forEach((p, i) => {
        p.progress += delta * p.speed
        if (p.progress > 1) p.progress = 0

        const cur = p.start.clone().lerp(p.end, p.progress)
        currentPos[i * 3] = cur.x
        currentPos[i * 3 + 1] = cur.y
        currentPos[i * 3 + 2] = cur.z
      })

      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Synapse Network Connection Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#BFC2C5" transparent opacity={0.22} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Neural Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#FFFFFF"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Firing Action Potentials / Signal Pulses */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePoints, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#FFFFFF"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

