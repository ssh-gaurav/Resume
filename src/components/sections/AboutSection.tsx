import { personalProfile } from '../../data/resumeData'

export function AboutSection() {
  return (
    <section id="about" className="px-6 sm:px-10 md:px-16 py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-20">
        <div className="lg:col-span-4">
          <p className="text-sm text-[#b3a58e] mb-5">01 / A little about me</p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-white leading-tight">Learning by<br />building things.</h2>
        </div>
        <div className="lg:col-span-8 max-w-2xl">
          <p className="text-xl sm:text-2xl leading-relaxed text-[#e0ddd5]">{personalProfile.bioShort}</p>
          <p className="mt-6 text-base leading-8 text-[#a7a59e]">{personalProfile.bioDetailed}</p>
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-7">
            <div><p className="text-white text-lg">Python &amp; FastAPI</p><p className="mt-2 text-sm text-[#a7a59e]">My usual starting point for backend projects.</p></div>
            <div><p className="text-white text-lg">RAG &amp; machine learning</p><p className="mt-2 text-sm text-[#a7a59e]">What I am spending most of my time exploring.</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
