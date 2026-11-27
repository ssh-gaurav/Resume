import { LeetCodeActivity } from '../ui/LeetCodeActivity'

export function EventsSection() {
  return (
    <section id="events" className="py-20 sm:py-24 px-6 sm:px-10 md:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        <div><p className="text-sm text-[#b3a58e] mb-5">Beyond the projects</p><h2 className="text-4xl sm:text-5xl font-display tracking-tight text-white">Still figuring things out.<br /><span className="text-[#c5b79c]">Always building.</span></h2></div>
        <div className="space-y-7 text-[#aaa9a2] leading-8">
          <div><h3 className="text-white text-lg mb-2">Problem solving</h3><p>I practice on LeetCode in C++, working through data structures, algorithms, and complexity analysis.</p></div>
          <div className="border-t border-white/10 pt-6"><h3 className="text-white text-lg mb-2">Working with others</h3><p>I participate in hackathons and collaborative projects. I am looking for internships and opportunities to learn from an engineering team.</p></div>
          <a href="mailto:gauravsingh288393@gmail.com" className="inline-block text-[#d0c3ac] border-b border-[#d0c3ac]/50">Get in touch about an opportunity</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto"><LeetCodeActivity /></div>
    </section>
  )
}
