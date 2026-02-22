import { Resume } from "../types/resume";

export default function ResumeSection({ resume }: { resume: Resume }) {
  return (
    <div style={{ padding: "40px" }}>
      <div className="section-card">
        <h2>{resume.name}</h2>
        <p style={{ color: "#aaa" }}>{resume.content.title}</p>
      </div>

      <div className="section-card">
        <h3>Skills</h3>
        {Object.entries(resume.content.skills).map(([category, items]) => (
          <div key={category} style={{ marginTop: "16px" }}>
            <strong>{category}</strong>
            <div style={{ marginTop: "8px" }}>
              {(items as string[]).join(", ")}
            </div>
          </div>
        ))}
      </div>

      <div className="section-card">
        <h3>Projects</h3>
        {resume.content.projects.map((project) => (
          <div key={project} style={{ marginTop: "8px" }}>
            {project}
          </div>
        ))}
      </div>

      <div className="section-card">
        <h3>Education</h3>
        {resume.content.education.map((edu) => (
          <div key={edu.degree} style={{ marginTop: "8px" }}>
            {edu.degree} — {edu.institution} ({edu.year})
          </div>
        ))}
      </div>
    </div>
  );
}