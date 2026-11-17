// Web Audio API procedural cinematic sound synthesizer for the black hole journey
class CinematicSoundEngine {
  private ctx: AudioContext | null = null
  private droneOsc: OscillatorNode | null = null
  private droneGain: GainNode | null = null

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Play deep ambient cosmic drone on start
  startAmbientDrone() {
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(48, this.ctx.currentTime)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(120, this.ctx.currentTime)

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 2.0)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      this.droneOsc = osc
      this.droneGain = gain
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Gravitational pull sound effect: pitch rise and increasing tension
  playGravitationalPull() {
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime

      // Pitch sweep
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(55, now)
      osc.frequency.exponentialRampToValueAtTime(320, now + 4.5)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(160, now)
      filter.frequency.exponentialRampToValueAtTime(800, now + 4.5)

      gain.gain.setValueAtTime(0.01, now)
      gain.gain.linearRampToValueAtTime(0.2, now + 3.0)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 5.0)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 5.0)
    } catch {
      // Audio fallback
    }
  }

  // Wormhole dimensional leap: bass drop & white noise rush
  playWormholeBurst() {
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime

      // 1. Heavy sub-bass drop
      const subOsc = this.ctx.createOscillator()
      const subGain = this.ctx.createGain()
      subOsc.type = 'sine'
      subOsc.frequency.setValueAtTime(90, now)
      subOsc.frequency.exponentialRampToValueAtTime(28, now + 1.8)

      subGain.gain.setValueAtTime(0.35, now)
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2)

      subOsc.connect(subGain)
      subGain.connect(this.ctx.destination)

      subOsc.start(now)
      subOsc.stop(now + 2.2)

      // 2. Filtered noise rush
      const bufferSize = this.ctx.sampleRate * 2
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const noise = this.ctx.createBufferSource()
      noise.buffer = buffer

      const noiseFilter = this.ctx.createBiquadFilter()
      noiseFilter.type = 'bandpass'
      noiseFilter.frequency.setValueAtTime(600, now)
      noiseFilter.frequency.exponentialRampToValueAtTime(2400, now + 1.2)
      noiseFilter.Q.setValueAtTime(2.0, now)

      const noiseGain = this.ctx.createGain()
      noiseGain.gain.setValueAtTime(0.01, now)
      noiseGain.gain.linearRampToValueAtTime(0.25, now + 0.8)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0)

      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(this.ctx.destination)

      noise.start(now)
      noise.stop(now + 2.0)
    } catch {
      // Audio fallback
    }
  }

  stopAll() {
    try {
      if (this.droneGain && this.ctx) {
        this.droneGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5)
      }
      setTimeout(() => {
        if (this.droneOsc) {
          this.droneOsc.stop()
          this.droneOsc.disconnect()
        }
      }, 500)
    } catch {
      // Audio fallback
    }
  }
}

export const cinematicAudio = new CinematicSoundEngine()

