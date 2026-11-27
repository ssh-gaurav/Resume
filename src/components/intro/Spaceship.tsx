import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SpaceshipProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  thrusterIntensity?: number
}

// Original heavy-lift vehicle inspired by real orbital launchers.
// The local +Y axis is rotated toward -Z to match the flight director.
export function Spaceship({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, thrusterIntensity = 1 }: SpaceshipProps) {
  const exhaust = useRef<THREE.Group>(null)
  const light = useRef<THREE.PointLight>(null)
  const fairing = useMemo(() => new THREE.LatheGeometry([
    new THREE.Vector2(0.46, 0), new THREE.Vector2(0.46, 0.35),
    new THREE.Vector2(0.44, 0.65), new THREE.Vector2(0.35, 0.95),
    new THREE.Vector2(0.21, 1.23), new THREE.Vector2(0.07, 1.42),
    new THREE.Vector2(0, 1.48),
  ], 48), [])
  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.elapsedTime * 38) * 0.055
    if (exhaust.current) exhaust.current.scale.y = pulse * Math.max(0.4, thrusterIntensity)
    if (light.current) light.current.intensity = pulse * thrusterIntensity * 4
  })
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/* White cryogenic core and ogive payload fairing. */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.35, 3.3, 48]} />
          <meshStandardMaterial color="#eceee9" metalness={0.18} roughness={0.48} />
        </mesh>
        <mesh position={[0, 1.75, 0]} geometry={fairing} castShadow>
          <meshStandardMaterial color="#f4f3ed" metalness={0.12} roughness={0.42} />
        </mesh>
        {/* Stage adapters and visible circumferential separation joints. */}
        {[-1.48, -0.55, 0.65, 1.65].map(y => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[0.357, 0.357, 0.065, 48]} />
            <meshStandardMaterial color="#323a40" metalness={0.65} roughness={0.38} />
          </mesh>
        ))}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.355, 0.355, 0.32, 48]} />
          <meshStandardMaterial color="#d78b42" metalness={0.25} roughness={0.65} />
        </mesh>
        {/* External cable raceways along the core. */}
        {[0, Math.PI].map(angle => (
          <mesh key={angle} position={[Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35]}>
            <boxGeometry args={[0.045, 2.9, 0.045]} />
            <meshStandardMaterial color="#c9cec9" roughness={0.6} />
          </mesh>
        ))}
        {/* Paired solid boosters with tapered noses, attachment struts and engine bells. */}
        {[-0.62, 0.62].map(x => (
          <group key={x} position={[x, -0.25, 0]}>
            <mesh castShadow><cylinderGeometry args={[0.23, 0.23, 2.65, 32]} /><meshStandardMaterial color="#e3e5e1" roughness={0.55} metalness={0.15} /></mesh>
            <mesh position={[0, 1.56, 0]}><coneGeometry args={[0.23, 0.47, 32]} /><meshStandardMaterial color="#eeeee7" roughness={0.5} /></mesh>
            {[-1.2, -0.6, 0.3, 1.15].map(y => (
              <mesh key={y} position={[0, y, 0]}><cylinderGeometry args={[0.237, 0.237, 0.065, 32]} /><meshStandardMaterial color="#49515a" metalness={0.6} roughness={0.4} /></mesh>
            ))}
            {[-0.9, 0.8].map(y => (
              <mesh key={y} position={[-x / 2, y, 0]}><boxGeometry args={[0.3, 0.1, 0.15]} /><meshStandardMaterial color="#70777d" metalness={0.7} roughness={0.45} /></mesh>
            ))}
            <mesh position={[0, -1.48, 0]}><cylinderGeometry args={[0.12, 0.23, 0.3, 32, 1, true]} /><meshStandardMaterial color="#343039" metalness={0.75} roughness={0.5} side={THREE.DoubleSide} /></mesh>
          </group>
        ))}
        <mesh position={[0, -1.72, 0]}><cylinderGeometry args={[0.15, 0.29, 0.4, 32, 1, true]} /><meshStandardMaterial color="#3f3535" metalness={0.8} roughness={0.4} side={THREE.DoubleSide} /></mesh>
        {/* Layered translucent combustion plumes, anchored at each nozzle. */}
        <group ref={exhaust} position={[0, -1.88, 0]}>
          {[-0.62, 0, 0.62].map(x => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, -1.15, 0]} rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.24, 2.3, 32]} />
                <meshBasicMaterial color="#ff8b37" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
              <mesh position={[0, -0.65, 0]} rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.14, 1.3, 24]} />
                <meshBasicMaterial color="#fff2c9" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
            </group>
          ))}
        </group>
        <pointLight ref={light} position={[0, -2.3, 0]} color="#ffb36a" intensity={4} distance={8} />
      </group>
    </group>
  )
}
