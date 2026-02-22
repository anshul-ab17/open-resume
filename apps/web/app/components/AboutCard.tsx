import { Resume } from "../types/resume"

export default function AboutCard({ resume }: { resume: Resume }) {
  return (
    <section id="about" className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-10 shadow-xl">
      <h2 className="text-3xl font-bold">{resume.name}</h2>

      <p className="text-orange-400 mt-2 text-lg">
        {resume.content.title}
      </p>
    </section>
  )
}