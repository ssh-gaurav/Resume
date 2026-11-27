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
  name: 'Gaurav Singh Rajawat',
  title: 'AI & ML STUDENT / DEVELOPER',
  subtitle: 'ARCHITECTING HIGH-PERFORMANCE INTELLIGENCE & DISTRIBUTED SYSTEMS',
  email: 'gauravsingh288393@gmail.com',
  location: 'Gwalior, Madhya Pradesh, India',
  availability: 'Open to internships and collaborations',
  bioShort: 'I am studying Artificial Intelligence and Machine Learning at Madhav Institute of Science and Technology in Gwalior. I build research tools, machine learning experiments, and backend applications.',
  bioDetailed: 'My recent work includes RogueAI, a RAG research application, and Rail Setu, a railway maintenance coordination platform. Outside projects, I practice data structures and algorithms in C++. I also enjoy running and fitness.',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/ssh-gaurav',
    linkedin: 'https://www.linkedin.com/in/gaurav-singh-rajawat-44213b378/',
    twitter: 'https://x.com',
    email: 'mailto:gauravsingh288393@gmail.com',
  },
  stats: [
    { label: 'B.Tech AI & ML', value: '2029', metric: 'Expected graduation' },
    { label: 'CGPA', value: '8.02', metric: 'Through first year' },
    { label: 'Based in', value: 'Gwalior', metric: 'Madhya Pradesh' },
    { label: 'Currently learning', value: 'AI / ML', metric: 'Through hands-on projects' },
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
  {'id': 'rogueai', 'title': 'RogueAI', 'category': 'AI research application', 'description': 'A research assistant combining RAG, web search, webpage extraction, and document processing. Built a FastAPI backend and connected it to a React frontend.', 'techStack': ['Python', 'FastAPI', 'LangChain', 'Tavily', 'React'], 'stats': 'Jun - Aug 2026', 'year': '2026', 'link': 'https://github.com/ssh-gaurav', 'github': 'https://github.com/ssh-gaurav', 'visualStyle': 'bg-[#151613]'},
  {'id': 'rail-setu', 'title': 'Rail Setu', 'category': 'Railway maintenance coordination', 'description': 'A platform for reporting railway maintenance issues and coordinating between field personnel and administrative teams, with WebSocket communication.', 'techStack': ['FastAPI', 'WebSockets', 'React'], 'stats': 'Aug - Sep 2026', 'year': '2026', 'link': 'https://github.com/ssh-gaurav', 'github': 'https://github.com/ssh-gaurav', 'visualStyle': 'bg-[#151613]'},
  {'id': 'prediction', 'title': 'Insurance & Heart Disease Prediction', 'category': 'Machine learning', 'description': 'Regression and classification experiments covering preprocessing, feature engineering, model evaluation, and hyperparameter tuning.', 'techStack': ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'], 'stats': 'Jan - Apr 2026', 'year': '2026', 'link': 'https://github.com/ssh-gaurav', 'github': 'https://github.com/ssh-gaurav', 'visualStyle': 'bg-[#151613]'},
  {'id': 'schnorr', 'title': 'Schnorr Digital Signatures', 'category': 'Cryptography', 'description': 'Implemented key generation, signing, and verification with modular arithmetic in SageMath.', 'techStack': ['Python', 'SageMath', 'Jupyter'], 'stats': 'Jan - May 2026', 'year': '2026', 'link': 'https://github.com/ssh-gaurav', 'github': 'https://github.com/ssh-gaurav', 'visualStyle': 'bg-[#151613]'},
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
    id: 'degree-ai-ml',
    title: 'B.Tech in Artificial Intelligence & Machine Learning',
    institution: 'Madhav Institute of Science and Technology',
    periodOrYear: '2025 - 2029',
    category: 'EDUCATION',
    description: 'Gwalior, Madhya Pradesh. CGPA: 8.02 through first year.',
    badge: 'IN PROGRESS',
  },
]
