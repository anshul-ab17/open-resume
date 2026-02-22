import { Resume } from "../types/resume"

export default function ProjectsCard({ resume }: { resume: Resume }) {
  return (
    <section
      id="projects"
      className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-10 shadow-xl"
    >
      <h3 className="text-xl font-semibold mb-8">Projects</h3>

      <div className="space-y-6 text-gray-300">
        {resume.content.projects.map((p, index) => (
          <div
            key={`${p.name}-${index}`}
            className="hover:text-orange-400 transition cursor-pointer"
          >
            <h4 className="text-lg font-medium text-white">
              {p.name}
            </h4>

            <p className="text-sm text-gray-400 mt-1">
              {p.description}
            </p>

            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {p.tech_stack.map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="bg-[#2a2a2a] px-2 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}