import * as THREE from 'three'

// Generates high-detail procedural lunar regolith normal map
export function createLunarNormalTexture(): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (!ctx) return new THREE.CanvasTexture(canvas)

  const imgData = ctx.createImageData(size, size)
  const data = imgData.data

  // Generate fractal Perlin-like height values first
  const heightMap = new Float32Array(size * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x
      const nx = x / size
      const ny = y / size

      // Multi-frequency noise
      let h = Math.sin(nx * 32) * Math.cos(ny * 32) * 0.4
      h += Math.sin(nx * 64 + ny * 32) * 0.25
      h += Math.sin(nx * 128 - ny * 64) * 0.15
      h += (Math.random() - 0.5) * 0.2 // regolith grain

      heightMap[idx] = h
    }
  }

  // Convert heightmap into normal vectors (RGB)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x
      const xLeft = heightMap[y * size + ((x - 1 + size) % size)]
      const xRight = heightMap[y * size + ((x + 1) % size)]
      const yUp = heightMap[((y - 1 + size) % size) * size + x]
      const yDown = heightMap[((y + 1) % size) * size + x]

      const dx = (xRight - xLeft) * 2.5
      const dy = (yDown - yUp) * 2.5
      const dz = 1.0

      // Normalize vector
      const len = Math.hypot(dx, dy, dz)
      const nx = dx / len
      const ny = dy / len
      const nz = dz / len

      const pIdx = idx * 4
      data[pIdx] = Math.floor((nx * 0.5 + 0.5) * 255)
      data[pIdx + 1] = Math.floor((ny * 0.5 + 0.5) * 255)
      data[pIdx + 2] = Math.floor((nz * 0.5 + 0.5) * 255)
      data[pIdx + 3] = 255
    }
  }

  ctx.putImageData(imgData, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(16, 16)
  return texture
}

// Generates high-detail spacesuit woven fabric normal map
export function createSpacesuitNormalTexture(): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (!ctx) return new THREE.CanvasTexture(canvas)

  const imgData = ctx.createImageData(size, size)
  const data = imgData.data

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4
      // Weave pattern: orthogonal interlacing threads
      const weaveX = Math.sin(x * 0.8)
      const weaveY = Math.cos(y * 0.8)
      const nx = weaveX * 0.4
      const ny = weaveY * 0.4
      const nz = 1.0 - (nx * nx + ny * ny) * 0.5

      data[idx] = Math.floor((nx * 0.5 + 0.5) * 255)
      data[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255)
      data[idx + 2] = Math.floor(nz * 255)
      data[idx + 3] = 255
    }
  }

  ctx.putImageData(imgData, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(24, 24)
  return texture
}

