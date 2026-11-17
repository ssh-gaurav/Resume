import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Astronaut } from './Astronaut'
import { Nebula } from './Nebula'
import { Terrain } from './Terrain'
import { SpaceDust } from './SpaceDust'

interface CameraControllerProps {
  scrollY: number
}

function CameraController({ scrollY }: CameraControllerProps) {
  const { camera } = useThree()
  const mousePos = useRef({ x: 0, y: 0 })
  const targetLookAt = useRef(new THREE.Vector3(0, 0.6, 0))
  const currentLookAt = useRef(new THREE.Vector3(0, 0.6, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const heroScroll = Math.min(1.2, scrollY / (window.innerHeight || 800))

    const parallaxX = mousePos.current.x * 0.7
    const parallaxY = mousePos.current.y * 0.4

    const driftX = Math.sin(t * 0.25) * 0.15
    const driftY = Math.cos(t * 0.35) * 0.12

    const targetX = parallaxX + driftX
    const targetY = 0.4 + parallaxY + driftY + heroScroll * 2.2
    const targetZ = 7.8 - heroScroll * 3.5

    const lerpSpeed = 1.0 - Math.pow(0.001, delta)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpSpeed * 1.5)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, lerpSpeed * 1.5)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpSpeed * 1.5)

    targetLookAt.current.set(
      parallaxX * 0.3,
      0.6 + heroScroll * 1.5 + Math.sin(t * 0.2) * 0.05,
      -heroScroll * 2.0
    )
    currentLookAt.current.lerp(targetLookAt.current, lerpSpeed * 2.0)
    camera.lookAt(currentLookAt.current)
  })

  return null
}

interface SceneProps {
  scrollY: number
}

export function Scene({ scrollY }: SceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0.4, 7.8], fov: 42, near: 0.1, far: 300 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 2]}
      >
        {/* Monochromatic Deep Space Background & Soft Atmospheric Fog */}
        <color attach="background" args={['#050505']} />
        <fogExp2 attach="fog" args={['#050505', 0.019]} />

        {/* Ambient Charcoal Lighting - prevents pitch-black shadow loss */}
        <ambientLight color="#1c1d22" intensity={0.8} />

        {/* Key Unfiltered Deep Space Sunlight with Soft Shadows */}
        <directionalLight
          position={[14, 24, 12]}
          color="#FFFFFF"
          intensity={2.3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={60}
          shadow-camera-left={-18}
          shadow-camera-right={18}
          shadow-camera-top={18}
          shadow-camera-bottom={-18}
          shadow-bias={-0.00015}
        />

        {/* Cool Silver Back Rim Light */}
        <directionalLight
          position={[-16, 16, -14]}
          color="#C8CCD0"
          intensity={1.4}
        />

        {/* Atmospheric Cool Blue-Silver Fill */}
        <pointLight
          position={[0, 4, 3]}
          color="#8BA4C4"
          intensity={0.7}
          distance={16}
        />

        {/* Low Lunar Regolith Bounce Fill Light */}
        <directionalLight
          position={[0, -5, 8]}
          color="#3c3d44"
          intensity={0.45}
        />

        {/* Dynamic Camera Controller */}
        <CameraController scrollY={scrollY} />

        {/* Photorealistic Vast Lunar Landscape & Flanking Mountain Peaks */}
        <Terrain />

        {/* High-Fidelity Astronaut with Head Cursor Tracking & Dual Helmet Spotlights */}
        <Astronaut position={[0, -1.9, 1.8]} scale={0.52} />

        {/* Massive Glowing Particle Nebula floating above */}
        <Nebula position={[0, 2.3, 0]} particleCount={14000} />

        {/* Atmospheric Floating Regolith Dust, Stars & Galactic Rift */}
        <SpaceDust count={2000} starCount={4000} />
      </Canvas>
    </div>
  )
}
