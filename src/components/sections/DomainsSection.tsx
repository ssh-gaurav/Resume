const skills = [
  ['Languages', 'Python, C++, SQL, JavaScript, HTML & CSS'],
  ['Machine learning', 'Scikit-learn, Pandas, NumPy, TensorFlow, Keras, Matplotlib & Seaborn'],
  ['LLM applications', 'RAG, LangChain, LangGraph, Hugging Face, Tavily & LLM APIs'],
  ['Backend & web', 'FastAPI, REST APIs, WebSockets, PostgreSQL, Streamlit & React basics'],
  ['Everyday tools', 'Git, GitHub, Jupyter Notebook, Google Colab, VS Code & SageMath'],
]

export function DomainsSection() {
  return (
    <section id="domains" className="py-20 sm:py-24 px-6 sm:px-10 md:px-16 border-t border-white/10 bg-[#0b0c0a]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-20">
        <div className="lg:col-span-4"><p className="text-sm text-[#b3a58e] mb-5">02 / My toolkit</p><h2 className="text-4xl sm:text-5xl font-display tracking-tight text-white">Tools I<br />work with.</h2><p className="mt-6 text-[#aaa9a2] leading-7 max-w-sm">Mostly Python, with the right libraries for the problem. These are the tools I have used in projects and coursework.</p></div>
        <dl className="lg:col-span-8">{skills.map(([name,tools]) => <div key={name} className="py-5 first:pt-0 border-b border-white/10 grid sm:grid-cols-[160px_1fr] gap-3"><dt className="text-white">{name}</dt><dd className="text-[#aaa9a2] leading-7">{tools}</dd></div>)}</dl>
      </div>
    </section>
  )
}
