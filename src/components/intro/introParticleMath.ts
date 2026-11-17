export interface ParticleData {
  // Initial positions on the button surface
  buttonPos: Float32Array
  // Target positions forming the AI Neural Symbol
  symbolPos: Float32Array
  // Explosion velocities
  explosionVel: Float32Array
  // Random phases for organic floating
  phases: Float32Array
  // Fragment scales
  scales: Float32Array
}

export function generateIntroParticles(count: number): ParticleData {
  const buttonPos = new Float32Array(count * 3)
  const symbolPos = new Float32Array(count * 3)
  const explosionVel = new Float32Array(count * 3)
  const phases = new Float32Array(count)
  const scales = new Float32Array(count)

  const buttonWidth = 3.6
  const buttonHeight = 1.05
  const buttonDepth = 0.28

  // 1. Generate button surface positions
  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // 70% along the perimeter/edges, 30% on the top face
    const onPerimeter = Math.random() < 0.65

    if (onPerimeter) {
      // Along perimeter of rounded rectangle
      const side = Math.floor(Math.random() * 4)
      const u = Math.random() - 0.5
      let x = 0
      let y = 0
      if (side === 0) {
        // top edge
        x = u * (buttonWidth - 0.4)
        y = buttonHeight * 0.5 + (Math.random() - 0.5) * 0.08
      } else if (side === 1) {
        // bottom edge
        x = u * (buttonWidth - 0.4)
        y = -buttonHeight * 0.5 + (Math.random() - 0.5) * 0.08
      } else if (side === 2) {
        // left edge
        x = -buttonWidth * 0.5 + (Math.random() - 0.5) * 0.08
        y = u * (buttonHeight - 0.4)
      } else {
        // right edge
        x = buttonWidth * 0.5 + (Math.random() - 0.5) * 0.08
        y = u * (buttonHeight - 0.4)
      }
      const z = buttonDepth * 0.5 + (Math.random() - 0.5) * 0.06

      buttonPos[i3] = x
      buttonPos[i3 + 1] = y
      buttonPos[i3 + 2] = z
    } else {
      // Dispersed across top face
      buttonPos[i3] = (Math.random() - 0.5) * (buttonWidth - 0.2)
      buttonPos[i3 + 1] = (Math.random() - 0.5) * (buttonHeight - 0.2)
      buttonPos[i3 + 2] = buttonDepth * 0.5 + Math.random() * 0.04
    }

    // 2. Generate AI Symbol Coordinates
    // An intricate 3D Neural Nexus: Central core sphere + orbiting dual halos + synaptic dendritic constellation
    const groupChoice = Math.random()

    if (groupChoice < 0.45) {
      // Central Sacred Neural Core (Fibonacci Sphere)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const goldenRatio = (1 + Math.sqrt(5)) / 2
      const theta = 2 * Math.PI * (i / goldenRatio)
      const r = 1.15 + (Math.random() - 0.5) * 0.18

      symbolPos[i3] = r * Math.sin(phi) * Math.cos(theta)
      symbolPos[i3 + 1] = 1.35 + r * Math.cos(phi) // Elevated above button
      symbolPos[i3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    } else if (groupChoice < 0.75) {
      // Orbital Ring 1: Inclined Gyroscopic Band
      const theta = Math.random() * Math.PI * 2
      const r = 1.9 + (Math.random() - 0.5) * 0.15
      const angle = Math.PI / 4 // 45 degree tilt

      const lx = r * Math.cos(theta)
      const ly = (Math.random() - 0.5) * 0.12
      const lz = r * Math.sin(theta)

      symbolPos[i3] = lx
      symbolPos[i3 + 1] = 1.35 + (ly * Math.cos(angle) - lz * Math.sin(angle))
      symbolPos[i3 + 2] = ly * Math.sin(angle) + lz * Math.cos(angle)
    } else {
      // Orbital Ring 2: Counter-inclined Gyroscopic Band
      const theta = Math.random() * Math.PI * 2
      const r = 2.3 + (Math.random() - 0.5) * 0.18
      const angle = -Math.PI / 4

      const lx = r * Math.sin(theta)
      const ly = (Math.random() - 0.5) * 0.15
      const lz = r * Math.cos(theta)

      symbolPos[i3] = lx
      symbolPos[i3 + 1] = 1.35 + (ly * Math.cos(angle) - lz * Math.sin(angle))
      symbolPos[i3 + 2] = ly * Math.sin(angle) + lz * Math.cos(angle)
    }

    // 3. Explosion vectors (radial tunnel outward with forward momentum)
    const dirX = (Math.random() - 0.5) * 2
    const dirY = (Math.random() - 0.5) * 2
    const dirZ = (Math.random() - 0.5) * 2 + 1.2
    const len = Math.hypot(dirX, dirY, dirZ) || 1

    const speed = 14 + Math.random() * 26
    explosionVel[i3] = (dirX / len) * speed
    explosionVel[i3 + 1] = (dirY / len) * speed
    explosionVel[i3 + 2] = (dirZ / len) * speed

    phases[i] = Math.random() * Math.PI * 2
    scales[i] = 0.02 + Math.random() * 0.035
  }

  return {
    buttonPos,
    symbolPos,
    explosionVel,
    phases,
    scales,
  }
}
