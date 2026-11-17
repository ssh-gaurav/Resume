import { useMemo } from 'react'
import * as THREE from 'three'
import { createLunarNormalTexture } from '../../utils/textureGenerators'

// Multi-octave Fractional Brownian Motion for geological realism
function fbmNoise(x: number, y: number): number {
  let val = 0
  let amp = 0.55
  let freq = 0.12

  for (let i = 0; i < 4; i++) {
    const s1 = Math.sin(x * freq + y * freq * 0.8)
    const c1 = Math.cos(x * freq * 0.7 - y * freq)
    val += (s1 + c1) * amp
    freq *= 2.1
    amp *= 0.48
  }
  return val
}

function craterFunction(x: number, y: number, cx: number, cy: number, radius: number, depth: number): number {
  const dist = Math.hypot(x - cx, y - cy)
  if (dist > radius * 1.8) return 0
  const normDist = dist / radius
  // Raised rim around crater edge, depressed bowl
  if (normDist <= 1.0) {
    return -depth * (1.0 - normDist * normDist)
  } else {
    const rimDist = (normDist - 1.0) / 0.8
    return depth * 0.4 * Math.sin(rimDist * Math.PI)
  }
}

export function Terrain() {
  const lunarNormal = useMemo(() => createLunarNormalTexture(), [])

  // Main lunar ground geometry
  const groundGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(160, 160, 140, 140)
    geom.rotateX(-Math.PI / 2)

    const pos = geom.attributes.position
    const count = pos.count

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)

      // FBM geological undulations
      let y = fbmNoise(x, z) * 1.2
      y += fbmNoise(x * 2.5, z * 2.5) * 0.35

      // Realistic impact crater basins
      y += craterFunction(x, z, -4, 4, 3.8, 0.9)
      y += craterFunction(x, z, 8, 12, 5.2, 1.2)
      y += craterFunction(x, z, -14, -9, 6.0, 1.4)
      y += craterFunction(x, z, 3.5, -7, 3.2, 0.7)
      y += craterFunction(x, z, -8, 18, 7.0, 1.6)

      // Subtle landing plateau for astronaut footing
      const centerDist = Math.hypot(x, z - 1.8)
      if (centerDist < 4.0) {
        y *= (centerDist / 4.0) * 0.25
      }

      y -= 1.85
      pos.setY(i, y)
    }

    geom.computeVertexNormals()
    return geom
  }, [])

  // Left rocky mountain range (towering lunar peaks)
  const leftMountainGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(60, 130, 56, 80)
    geom.rotateX(-Math.PI / 2)

    const pos = geom.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)

      const edgeFactor = Math.min(1.0, Math.pow(Math.abs(x) / 28, 1.4))
      let h = fbmNoise(x * 0.6, z * 0.5) * 6.5
      h += Math.abs(fbmNoise(x * 1.5, z * 1.3)) * 3.5
      h += Math.sin(x * 0.8 + z * 0.4) * 1.8

      const peakHeight = Math.max(0, h + 3.0) * edgeFactor * 2.6 - 1.6
      pos.setY(i, peakHeight)
    }

    geom.computeVertexNormals()
    return geom
  }, [])

  // Right rocky mountain range
  const rightMountainGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(60, 130, 56, 80)
    geom.rotateX(-Math.PI / 2)

    const pos = geom.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)

      const edgeFactor = Math.min(1.0, Math.pow(Math.abs(x) / 28, 1.4))
      let h = fbmNoise((x + 35) * 0.55, (z - 25) * 0.5) * 6.8
      h += Math.abs(fbmNoise(x * 1.6, z * 1.4)) * 3.8
      h += Math.cos(x * 0.7 - z * 0.5) * 2.0

      const peakHeight = Math.max(0, h + 3.2) * edgeFactor * 2.8 - 1.6
      pos.setY(i, peakHeight)
    }

    geom.computeVertexNormals()
    return geom
  }, [])

  // Procedural Boulder Field: Faceted realistic lunar rocks scattered across ground
  const boulders = useMemo(() => {
    const count = 48
    const items = []
    const rng = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      const angle = rng(i * 3 + 1) * Math.PI * 2
      const dist = 3.5 + rng(i * 7 + 2) * 28
      const x = Math.cos(angle) * dist
      const z = Math.sin(angle) * dist

      // Calculate approximate ground height
      let y = fbmNoise(x, z) * 1.2 - 1.85
      const scale = 0.15 + Math.pow(rng(i * 11 + 3), 2.2) * 1.4

      items.push({
        position: [x, y + scale * 0.4, z] as [number, number, number],
        rotation: [rng(i * 13) * Math.PI, rng(i * 17) * Math.PI, rng(i * 19) * Math.PI] as [
          number,
          number,
          number,
        ],
        scale: [scale, scale * (0.6 + rng(i * 23) * 0.6), scale * (0.8 + rng(i * 29) * 0.4)] as [
          number,
          number,
          number,
        ],
      })
    }
    return items
  }, [])

  // High-contrast monochromatic materials with realistic roughness and normal detail
  const terrainMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#131417',
        roughness: 0.85,
        metalness: 0.2,
        normalMap: lunarNormal,
        normalScale: new THREE.Vector2(1.2, 1.2),
        flatShading: false,
      }),
    [lunarNormal]
  )

  const mountainMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0d0e10',
        roughness: 0.8,
        metalness: 0.28,
        flatShading: true, // Crisp crystalline facets catching rim lights
      }),
    []
  )

  const boulderMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#18191c',
        roughness: 0.75,
        metalness: 0.35,
        flatShading: true,
      }),
    []
  )

  return (
    <group>
      {/* Vast Lunar Regolith Plane */}
      <mesh geometry={groundGeometry} material={terrainMaterial} receiveShadow />

      {/* Scattered Realistic Lunar Boulders */}
      {boulders.map((b, i) => (
        <mesh
          key={i}
          position={b.position}
          rotation={b.rotation}
          scale={b.scale}
          material={boulderMaterial}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 1]} />
        </mesh>
      ))}

      {/* Flanking Left Rocky Mountain Range */}
      <mesh
        position={[-38, 0, -6]}
        geometry={leftMountainGeometry}
        material={mountainMaterial}
        castShadow
        receiveShadow
      />

      {/* Flanking Right Rocky Mountain Range */}
      <mesh
        position={[38, 0, -6]}
        geometry={rightMountainGeometry}
        material={mountainMaterial}
        castShadow
        receiveShadow
      />
    </group>
  )
}
