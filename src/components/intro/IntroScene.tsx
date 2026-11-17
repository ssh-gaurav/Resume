import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { generateIntroParticles } from './introParticleMath'

interface IntroSceneProps {
  onEnter: () => void
}

function ButtonMesh({
  hoverProgress,
  isClicked,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  hoverProgress: { current: number }
  isClicked: boolean
  onClick: () => void
  onPointerOver: () => void
  onPointerOut: () => void
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [pressed, setPressed] = useState(false)

  // Rounded box geometry created procedurally
  const buttonGeometry = useMemo(() => {
    const width = 3.6
    const height = 1.05
    const radius = 0.52
    const depth = 0.28
    const shape = new THREE.Shape()

    const x = -width / 2
    const y = -height / 2
    const w = width
    const h = height
    const r = Math.min(radius, w / 2, h / 2)

    shape.moveTo(x + r, y)
    shape.lineTo(x + w - r, y)
    shape.quadraticCurveTo(x + w, y, x + w, y + r)
    shape.lineTo(x + w, y + h - r)
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    shape.lineTo(x + r, y + h)
    shape.quadraticCurveTo(x, y + h, x, y + h - r)
    shape.lineTo(x, y + r)
    shape.quadraticCurveTo(x, y, x + r, y)

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    }

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geom.center()
    return geom
  }, [])

  // Create canvas texture for crisp physical button typography
  const textTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 320
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#080809'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Crisp white/silver typography
      ctx.fillStyle = '#E8EAED'
      ctx.font = '500 48px "Space Grotesk", -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.letterSpacing = '12px'
      ctx.fillText('ENTER THE UNKNOWN', canvas.width / 2, canvas.height / 2)
    }
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  // Luscious glossy black ceramic lacquer material
  const buttonMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#09090b',
        roughness: 0.15,
        metalness: 0.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        reflectivity: 0.9,
      }),
    []
  )

  const textDecalMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: textTexture,
        transparent: true,
        opacity: 0.92,
      }),
    [textTexture]
  )

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const { pointer } = state

    // Subtle 3D mouse parallax tilt
    const targetRotX = -pointer.y * 0.22
    const targetRotY = pointer.x * 0.32
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 4, delta)
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 4, delta)

    // Button elevation & depression
    let targetZ = 0
    let targetScale = 1.0

    if (isClicked || pressed) {
      targetZ = -0.35
      targetScale = 0.94
    } else if (hoverProgress.current > 0.01) {
      targetZ = hoverProgress.current * 0.15
      targetScale = 1.0 + hoverProgress.current * 0.03
    }

    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 6, delta)
    meshRef.current.scale.setScalar(
      THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 6, delta)
    )
  })

  return (
    <group
      ref={meshRef}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => {
        setPressed(false)
        onClick()
      }}
    >
      {/* Glossy Physical Button Body */}
      <mesh geometry={buttonGeometry} material={buttonMaterial} castShadow receiveShadow />

      {/* Button Typography Decal Plane */}
      <mesh position={[0, 0, 0.23]}>
        <planeGeometry args={[3.2, 0.95]} />
        <primitive object={textDecalMaterial} attach="material" />
      </mesh>

      {/* Subtle Rim Highlight Light */}
      <pointLight position={[0, 0, 1.2]} color="#FFFFFF" intensity={0.65} distance={3.5} />
    </group>
  )
}

function ParticleField({
  particleCount = 3000,
  hoverProgress,
  isExploding,
  explodeProgress,
}: {
  particleCount?: number
  hoverProgress: { current: number }
  isExploding: boolean
  explodeProgress: { current: number }
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const particles = useMemo(() => generateIntroParticles(particleCount), [particleCount])

  // Current dynamic positions and colors array
  const currentPositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    arr.set(particles.buttonPos)
    return arr
  }, [particles, particleCount])

  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3)
    const colorCharcoal = new THREE.Color('#121214')
    const colorSilver = new THREE.Color('#C4C7CB')
    const colorWhite = new THREE.Color('#FFFFFF')
    const temp = new THREE.Color()

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const r = Math.random()
      if (r > 0.8) {
        temp.copy(colorWhite)
      } else if (r > 0.4) {
        temp.copy(colorSilver)
      } else {
        temp.copy(colorCharcoal)
      }
      col[i3] = temp.r
      col[i3 + 1] = temp.g
      col[i3 + 2] = temp.b
    }
    return col
  }, [particleCount])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes.position
    const posArr = posAttr.array as Float32Array

    const h = hoverProgress.current
    const exp = explodeProgress.current

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const bx = particles.buttonPos[i3]
      const by = particles.buttonPos[i3 + 1]
      const bz = particles.buttonPos[i3 + 2]

      const sx = particles.symbolPos[i3]
      const sy = particles.symbolPos[i3 + 1]
      const sz = particles.symbolPos[i3 + 2]

      const phase = particles.phases[i]

      // Organic turbulent breathing when hovering
      const waveX = Math.sin(t * 1.5 + phase) * 0.08 * h
      const waveY = Math.cos(t * 1.8 + phase) * 0.08 * h
      const waveZ = Math.sin(t * 2.0 + phase) * 0.08 * h

      if (!isExploding) {
        // Morph from button to AI symbol based on hover
        posArr[i3] = bx + (sx - bx) * h + waveX
        posArr[i3 + 1] = by + (sy - by) * h + waveY
        posArr[i3 + 2] = bz + (sz - bz) * h + waveZ
      } else {
        // Explosive outward radial surge on click
        const vx = particles.explosionVel[i3]
        const vy = particles.explosionVel[i3 + 1]
        const vz = particles.explosionVel[i3 + 2]

        const currentOriginX = bx + (sx - bx) * h
        const currentOriginY = by + (sy - by) * h
        const currentOriginZ = bz + (sz - bz) * h

        posArr[i3] = currentOriginX + vx * exp
        posArr[i3 + 1] = currentOriginY + vy * exp
        posArr[i3 + 2] = currentOriginZ + vz * exp
      }
    }

    posAttr.needsUpdate = true

    // Rotate symbol when assembled
    if (h > 0.05 && !isExploding) {
      pointsRef.current.rotation.y = t * 0.25 * h
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.92}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function StudioEnvironment() {
  return (
    <>
      {/* Pure White / Off-White Studio Floor */}
      <mesh position={[0, 0, -0.2]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.12} />
      </mesh>

      {/* Main Studio Key Light */}
      <directionalLight
        position={[8, 14, 10]}
        intensity={1.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Soft Ambient Fill */}
      <ambientLight color="#FFFFFF" intensity={1.1} />

      {/* Cool Rim Light */}
      <directionalLight position={[-8, -6, 6]} color="#E5E7EB" intensity={0.6} />
    </>
  )
}

function SceneContainer({ onEnter }: IntroSceneProps) {
  const { camera } = useThree()
  const hoverProgress = useRef(0)
  const explodeProgress = useRef(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // GSAP tween for hover particle break-away and symbol assembly
  useEffect(() => {
    if (isClicked) return

    gsap.to(hoverProgress, {
      current: isHovered ? 1.0 : 0.0,
      duration: isHovered ? 1.2 : 0.8,
      ease: isHovered ? 'power3.out' : 'power2.inOut',
    })
  }, [isHovered, isClicked])

  // GSAP orchestrated sequence on click
  const handleClick = () => {
    if (isClicked) return
    setIsClicked(true)

    const tl = gsap.timeline({
      onComplete: () => {
        onEnter()
      },
    })

    // 1. Tactile haptic compression & particle explosion
    tl.to(explodeProgress, {
      current: 1.0,
      duration: 1.35,
      ease: 'power4.out',
    })

    // 2. Camera zooms forward into the particle singularity
    tl.to(
      camera.position,
      {
        z: -1.2,
        duration: 1.35,
        ease: 'power3.in',
      },
      '<'
    )
  }

  return (
    <>
      <StudioEnvironment />

      {/* 3D Glossy Physical Black Button */}
      <ButtonMesh
        hoverProgress={hoverProgress}
        isClicked={isClicked}
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      />

      {/* Dynamic Detaching Particles forming AI Neural Nexus Symbol */}
      <ParticleField
        particleCount={3200}
        hoverProgress={hoverProgress}
        isExploding={isClicked}
        explodeProgress={explodeProgress}
      />
    </>
  )
}

export function IntroScene({ onEnter }: IntroSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5.2], fov: 45, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      className="w-full h-full cursor-pointer select-none"
    >
      <color attach="background" args={['#F9FAFB']} />
      <SceneContainer onEnter={onEnter} />
    </Canvas>
  )
}

