import {
  Brain,
  Layers,
  Sparkles,
  Bot,
  Database,
  Code2,
  LucideIcon,
} from 'lucide-react'

/* ==========================================================================
   RESUME PROFILE CONFIGURATION
   ========================================================================== */
export interface PersonalProfile {
  name: string
  title: string
  subtitle: string
  email: string
  location: string
  availability: string
  bioShort: string
  bioDetailed: string
  resumeUrl: string // Path to your resume PDF or Google Drive link
  socials: {
    github: string
    linkedin: string
    twitter: string
    email: string
  }
  stats: {
    label: string
    value: string
    metric: string
  }[]
}

export const personalProfile: PersonalProfile = {
  name: 'Gaurav Rajawat',
  title: 'AI & FULL-STACK SOFTWARE ENGINEER',
  subtitle: 'ARCHITECTING HIGH-PERFORMANCE INTELLIGENCE & DISTRIBUTED SYSTEMS',
  email: 'gauravsingh288393@gmail.com',
  location: 'India // Open to Remote & Global Relocation',
  availability: 'OPEN TO OPPORTUNITIES // READY TO INTERVIEW',
  bioShort:
    'Full-stack and AI software engineer with a deep passion for building high-throughput cloud architectures, generative AI pipelines, and immersive real-time 3D web applications.',
  bioDetailed:
    'I specialize in bridging cutting-edge machine learning models with production-grade engineering. From optimizing neural network inference to designing resilient microservices and low-latency frontend user experiences, I focus on building software that is fast, resilient, and beautifully designed.',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/ssh-gaurav',
    linkedin: 'https://linkedin.com/in/gaurav-rajawat',
    twitter: 'https://x.com',
    email: 'mailto:gauravsingh288393@gmail.com',
  },
  stats: [
    { label: 'YEARS OF BUILDING', value: '3+', metric: 'CONTINUOUS CRAFT' },
    { label: 'PRODUCTION PROJECTS', value: '20+', metric: 'DEPLOYED & LIVE' },
    { label: 'CODE COMMITS', value: '1,500+', metric: 'OPEN SOURCE & LAB' },
    { label: 'TECH STACK NODES', value: '24+', metric: 'LANGUAGES & TOOLS' },
  ],
}

/* ==========================================================================
   PROJECTS DATA
   ==========================================================================
   HOW TO ADD YOUR OWN PROJECTS:
   Simply add a new object to this array with your project details!
   ========================================================================== */
export interface ResumeProject {
  id: string
  title: string
  category: string
  description: string
  techStack: string[]
  stats: string
  year: string
  link: string
  github: string
  visualStyle: string
}

export const resumeProjects: ResumeProject[] = [
  {
    id: 'agentic-ai-platform',
    title: 'Aura Intelligence',
    category: 'AUTONOMOUS MULTI-AGENT ORCHESTRATION',
    description:
      'High-throughput distributed multi-agent system orchestrating collaborative task execution, automated code synthesis, and retrieval-augmented reasoning with sub-20ms message bus propagation.',
    techStack: ['TypeScript', 'Next.js', 'PyTorch', 'FastAPI', 'Redis', 'Docker'],
    stats: '10k+ Concurrent Tasks // Sub-20ms Event Bus',
    year: '2026',
    link: 'https://github.com/ssh-gaurav',
    github: 'https://github.com/ssh-gaurav',
    visualStyle: 'bg-gradient-to-br from-[#1a1c22] via-[#101116] to-[#07080a]',
  },
  {
    id: 'neural-3d-engine',
    title: 'HyperSplat 3D',
    category: 'REAL-TIME 3D & SPATIAL GAUSSIAN RADIANCE',
    description:
      'Interactive WebGL & WebGPU-accelerated spatial viewer rendering photorealistic 3D Gaussian Splats at 120 FPS directly in the browser with adaptive LOD octrees and zero lag.',
    techStack: ['Three.js', 'WebGPU', 'GLSL', 'React 19', 'TypeScript', 'CUDA'],
    stats: '120 FPS Rendering // 2.5M Gaussian Points',
    year: '2025',
    link: 'https://github.com/ssh-gaurav',
    github: 'https://github.com/ssh-gaurav',
    visualStyle: 'bg-gradient-to-br from-[#181a20] via-[#0e1014] to-[#060709]',
  },
  {
    id: 'distributed-microservices',
    title: 'NexusCore Gateway',
    category: 'DISTRIBUTED SYSTEMS & INFRASTRUCTURE',
    description:
      'Resilient low-latency API gateway and distributed stream processor with automated rate-limiting, JWT authentication, gRPC interfaces, and Prometheus metric exporters.',
    techStack: ['Node.js', 'Go', 'gRPC', 'PostgreSQL', 'Kafka', 'Kubernetes'],
    stats: '99.99% Uptime // 35k RPS Peak Throughput',
    year: '2025',
    link: 'https://github.com/ssh-gaurav',
    github: 'https://github.com/ssh-gaurav',
    visualStyle: 'bg-gradient-to-br from-[#1d1f26] via-[#121319] to-[#07080a]',
  },
  {
    id: 'generative-rag-engine',
    title: 'OmniMind Search',
    category: 'SEMANTIC VECTOR SEARCH & EMBEDDINGS',
    description:
      'Enterprise-grade RAG pipeline ingesting unstructured multimodal documentation into hybrid dense-sparse vector indexes with dynamic re-ranking and hallucination guardrails.',
    techStack: ['Python', 'LangChain', 'Qdrant', 'FastAPI', 'Llama-3', 'Tailwind'],
    stats: '94.8% Retrieval Precision // <150ms P95',
    year: '2026',
    link: 'https://github.com/ssh-gaurav',
    github: 'https://github.com/ssh-gaurav',
    visualStyle: 'bg-gradient-to-br from-[#191b22] via-[#0f1115] to-[#050608]',
  },
]

/* ==========================================================================
   TECHNICAL DOMAINS / SKILL PILLARS
   ========================================================================== */
export interface DomainSkill {
  id: string
  title: string
  category: string
  dimension: string
  description: string
  coreTech: string[]
  icon: LucideIcon
  visualGeometry: string
}

export const skillDomains: DomainSkill[] = [
  {
    id: 'ai_ml',
    title: 'AI, LLMs & Generative Systems',
    category: 'MACHINE INTELLIGENCE & REASONING',
    dimension: 'DIMENSION 01 // INTELLIGENCE',
    description:
      'Architecting production LLM pipelines, autonomous agent swarms, fine-tuning foundation models (LoRA/QLoRA), dense vector search, and multi-modal synthesis.',
    coreTech: ['PyTorch', 'Transformers', 'LangChain', 'RAG Pipelines', 'Ollama', 'FastAPI'],
    icon: Sparkles,
    visualGeometry: 'TORUS_KNOT',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Architecture',
    category: 'MODERN WEB & SCALABLE UI',
    dimension: 'DIMENSION 02 // APPLICATION',
    description:
      'Building responsive, accessible, ultra-performant modern applications with Next.js App Router, React 19, TypeScript, micro-frontends, and robust state management.',
    coreTech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'REST APIs'],
    icon: Code2,
    visualGeometry: 'HYPERCUBE',
  },
  {
    id: 'graphics_3d',
    title: '3D Web & Creative Computing',
    category: 'REAL-TIME SHADERS & VISUALS',
    dimension: 'DIMENSION 03 // GRAPHICS',
    description:
      'Designing immersive cinematic web experiences, procedural geometry, GLSL fragment and vertex shaders, physics engines, and GPU-driven particle simulations.',
    coreTech: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGL', 'GSAP', 'Framer Motion'],
    icon: Layers,
    visualGeometry: 'ICOSAHEDRON',
  },
  {
    id: 'backend_systems',
    title: 'Backend & Distributed Systems',
    category: 'HIGH-CONCURRENCY INFRASTRUCTURE',
    dimension: 'DIMENSION 04 // PROTOCOLS',
    description:
      'Engineering low-latency backend microservices, caching topologies, websocket real-time channels, and event-driven distributed message queues.',
    coreTech: ['Node.js', 'Python', 'Go', 'gRPC', 'WebSockets', 'Redis', 'Kafka'],
    icon: Bot,
    visualGeometry: 'GYROSCOPE',
  },
  {
    id: 'databases_cloud',
    title: 'Databases & Cloud DevOps',
    category: 'DATA PERSISTENCE & DEPLOYMENT',
    dimension: 'DIMENSION 05 // PERSISTENCE',
    description:
      'Managing relational and vector datastores, automated CI/CD pipelines, container orchestration with Docker/K8s, and cloud deployments on AWS & Vercel.',
    coreTech: ['PostgreSQL', 'Prisma ORM', 'Qdrant / Pinecone', 'Docker', 'AWS', 'Git / GitHub CI'],
    icon: Database,
    visualGeometry: 'OCTAHEDRON',
  },
  {
    id: 'cs_theory',
    title: 'Computer Science Foundations',
    category: 'ALGORITHMS & OPTIMIZATION',
    dimension: 'DIMENSION 06 // COMPLEXITY',
    description:
      'Deep foundation in algorithmic complexity, data structure design, system design principles, memory optimization, and asynchronous event loops.',
    coreTech: ['Data Structures & Algorithms', 'System Design', 'Memory Optimization', 'Concurrency'],
    icon: Brain,
    visualGeometry: 'DODECAHEDRON',
  },
]

/* ==========================================================================
   WORK EXPERIENCE & MILESTONES
   ========================================================================== */
export interface CareerMilestone {
  id: string
  title: string
  role: string
  type: 'FULL-TIME' | 'INTERNSHIP' | 'OPEN SOURCE' | 'HACKATHON' | 'FELLOWSHIP'
  period: string
  location: string
  status: 'CURRENT' | 'COMPLETED' | 'AWARD WINNER'
  description: string
  highlights: string[]
  link?: string
}

export const careerMilestones: CareerMilestone[] = [
  {
    id: 'ai-software-engineer',
    title: 'Software Engineer (Full-Stack & AI Systems)',
    role: 'Core Engineering & Architecture',
    type: 'FULL-TIME',
    period: '2025 — PRESENT',
    location: 'Remote / Global',
    status: 'CURRENT',
    description:
      'Leading end-to-end development of scalable SaaS products and enterprise AI workflows. Engineered high-throughput backend services and interactive client-facing dashboards with Next.js and PyTorch.',
    highlights: [
      'Architected distributed inference microservices reducing P95 latency by 42%',
      'Spearheaded modern web app migration to Next.js 16 with zero production downtime',
      'Implemented automated CI/CD delivery pipeline cutting build and deployment cycles in half',
    ],
    link: 'https://github.com/ssh-gaurav',
  },
  {
    id: 'fullstack-engineer-intern',
    title: 'Full-Stack Developer',
    role: 'Web Applications & Microservices',
    type: 'INTERNSHIP',
    period: '2024 — 2025',
    location: 'Hybrid',
    status: 'COMPLETED',
    description:
      'Developed modular React and Node.js components, integrated PostgreSQL database layers via Prisma, and implemented responsive UI systems with Tailwind CSS.',
    highlights: [
      'Engineered real-time data sync using WebSockets for collaborative user workspaces',
      'Optimized database queries and added Redis caching, boosting throughput by 3.5x',
      'Maintained 95%+ unit and integration test coverage across critical user flows',
    ],
    link: 'https://github.com/ssh-gaurav',
  },
  {
    id: 'national-hackathon',
    title: 'Winner & Best Technical Architecture',
    role: 'Team Lead & Principal Builder',
    type: 'HACKATHON',
    period: '2024',
    location: 'National Tech Summit',
    status: 'AWARD WINNER',
    description:
      'Conceived, engineered, and deployed an autonomous emergency dispatch routing and computer vision triaging prototype in a 36-hour continuous build sprint.',
    highlights: [
      'Awarded 1st Place out of 300+ competing engineering teams nationwide',
      'Implemented on-device edge AI model inference with real-time GPS telemetry',
    ],
    link: 'https://github.com/ssh-gaurav',
  },
  {
    id: 'open-source-contributor',
    title: 'Open Source Contributor & Creator',
    role: 'Autonomous Tooling & WebGL Libraries',
    type: 'OPEN SOURCE',
    period: '2023 — PRESENT',
    location: 'GitHub Global',
    status: 'CURRENT',
    description:
      'Actively publishing and maintaining open-source developer tooling, React hooks, Three.js shaders, and modern starter kits for creative coders.',
    highlights: [
      'Over 1,500+ GitHub contributions with community stars and active forks',
      'Authored reusable npm packages and full-stack documentation templates',
    ],
    link: 'https://github.com/ssh-gaurav',
  },
]

/* ==========================================================================
   EDUCATION, CERTIFICATIONS & HONORS
   ========================================================================== */
export interface EducationOrHonor {
  id: string
  title: string
  institution: string
  periodOrYear: string
  category: 'EDUCATION' | 'CERTIFICATION' | 'HONOR'
  description: string
  badge: string
}

export const educationAndHonors: EducationOrHonor[] = [
  {
    id: 'degree-cs',
    title: 'Bachelor of Technology in Computer Science',
    institution: 'University Engineering Institute',
    periodOrYear: 'Graduated / Senior Cohort',
    category: 'EDUCATION',
    description:
      'Comprehensive curriculum encompassing Distributed Systems, Neural Networks, Database Architecture, Discrete Mathematics, and Compiler Design. Graduated with high honors.',
    badge: 'B.TECH CSE',
  },
  {
    id: 'cert-cloud',
    title: 'Cloud & Solutions Architecture Certified',
    institution: 'AWS / Cloud Computing Specialist',
    periodOrYear: '2025',
    category: 'CERTIFICATION',
    description:
      'Certified proficiency in designing highly available, fault-tolerant, cost-optimized distributed systems and automated serverless architectures.',
    badge: 'SOLUTIONS ARCHITECT',
  },
  {
    id: 'cert-deeplearning',
    title: 'Deep Learning & Neural Networks Specialization',
    institution: 'DeepLearning.AI / Coursera',
    periodOrYear: '2024',
    category: 'CERTIFICATION',
    description:
      'Rigorous mastery of backpropagation calculus, Convolutional Networks, Transformer Attention, Sequence Modeling, and Hyperparameter Optimization.',
    badge: 'DL SPECIALIST',
  },
  {
    id: 'award-coding',
    title: 'Competitive Coding & Algorithmic Excellence',
    institution: 'LeetCode & Competitive Programming Forums',
    periodOrYear: '2024 — 2026',
    category: 'HONOR',
    description:
      'Solved 600+ algorithmic and data structure problems with top percentile ratings across dynamic programming, graph traversal, and bitwise optimization.',
    badge: 'TOP 5% RATING',
  },
]
