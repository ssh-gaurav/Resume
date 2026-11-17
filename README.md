# NEXUS AI CLUB — Immersive 3D Experience (Lusion-Inspired)

A dark monochromatic, cinematic 3D web experience built for a premier collegiate AI Club, inspired by the high-end creative studio aesthetic of Lusion.

---

## 🌌 Visual Concept & Architecture

- **Dark Monochromatic Palette**: `#050505` (Deep Black), `#151515` (Charcoal), `#BFC2C5` (Silver), `#FFFFFF` (White), `#777777` (Muted Grey).
- **Hero Viewport (100vh Full Screen)**:
  - Vast lunar terrain with craters, rocky surface displacement, and rim lighting.
  - Flanking rocky mountain formations framing the left and right perspectives.
  - Articulated procedural 3D Astronaut standing near the center, gazing upward.
  - Massive glowing particle nebula (14,000+ particles) swirling overhead with real-time harmonic flow and dynamic point lights.
  - Drifting space dust motes and celestial starfield dome.
  - Subtle mouse-responsive camera parallax and cinematic floating drift.
  - Minimal floating navigation with "AI CLUB" wordmark, circular telemetry beacon, pill buttons (`LET'S TALK`, `MENU`), and full-screen overlay.
  - Editorial split typography: bottom-left club manifesto and bottom-right italic headline.
- **Section 2 — ABOUT US ("WE EXPLORE THE UNKNOWN")**:
  - Live interactive 3D synaptic neural network canvas.
  - Student skunkworks manifesto, research pillars, and live telemetry counters.
- **Section 3 — DOMAINS ("INTELLIGENCE HAS MANY DIMENSIONS")**:
  - Technical research tracks (GenAI, NLP, Computer Vision, Robotics, Deep Learning, ML Foundations).
  - Interactive 3D dimensional visualizer with wireframe geometric glyphs and toolchain pills.
- **Section 4 — PROJECTS ("IDEAS INTO REALITY")**:
  - Large visual panels featuring student lab breakthroughs (*NeuroMorph*, *Aetheria-7B*, *Synapse 3D*, *OmniSwarm*).
  - Benchmark metrics, tech stack tags, and direct GitHub links.
- **Section 5 — EVENTS ("WHERE IDEAS COME TO LIFE")**:
  - Flagship hackathons, low-level CUDA workshops, guest lectures, and bootcamps.
  - Interactive RSVP confirmation flow.
- **Section 6 — OUR COMMUNITY ("BUILT BY CURIOUS MINDS")**:
  - Clean monochromatic profile grid of student leads, researchers, and faculty mentors.
- **Section 7 — JOIN US & MASTER FOOTER**:
  - Monumental closing call to action: *"THE FUTURE IS NOT WAITING. WE BUILD IT."*
  - Interactive student recruitment dossier application modal (`JoinModal`).
  - Studio footer with coordinates and social links.

---

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router) + React 19 + TypeScript
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: Framer Motion, GSAP
- **Smooth Scrolling**: Lenis
- **Styling**: Tailwind CSS v4 + PostCSS
- **Package Manager**: **pnpm exclusively**

---

## 🚀 Development & Build Commands (pnpm only)

Install dependencies:
```bash
pnpm install
```

Start the development server:
```bash
pnpm dev
```

Build the production application:
```bash
pnpm build
```

Run the production server:
```bash
pnpm start
```

Run linter:
```bash
pnpm lint
```
