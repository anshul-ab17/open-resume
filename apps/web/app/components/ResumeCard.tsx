import { Resume } from "../types/resume"

interface ResumeCardProps {
  resume: Resume
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-10 shadow-xl">
      <h2 className="text-3xl font-bold text-white">
        {resume.name}
      </h2>

      <p className="text-orange-400 mt-2 text-lg">
        {resume.content.title}
      </p>

      <div className="mt-12 space-y-12">

        <section>
          <h3 className="text-sm uppercase text-gray-500 tracking-wider">
            Skills
          </h3>

          <div className="mt-6 space-y-3 text-gray-300 text-base">
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

        <section>
          <h3 className="text-sm uppercase text-gray-500 tracking-wider">
            Projects
          </h3>

          <div className="mt-6 space-y-3 text-gray-300 text-base">
            {resume.content.projects.map((p) => (
              <div key={p} className="hover:text-orange-400 transition">
                {p}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}