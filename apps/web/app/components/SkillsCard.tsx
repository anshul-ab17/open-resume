import { Resume } from "../types/resume"

export default function SkillsCard({ resume }: { resume: Resume }) {
  return (
    <section
      id="skills"
      className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-10 shadow-xl"
    >
      <h3 className="text-xl font-semibold mb-8">Skills</h3>

      <div className="space-y-4 text-gray-300">
        {Object.entries(resume.content.skills).map(([k, v]) => (
          <div key={k}>
            <span className="capitalize font-semibold text-white">
              {k}:
            </span>{" "}
            {(v as string[]).join(", ")}
          </div>
        ))}
      </div>
    </section>
  )
}