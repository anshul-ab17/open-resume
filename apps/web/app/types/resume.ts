export interface Project {
  name: string
  description: string
  tech_stack: string[]
  highlights: string[]
  category: string
}

export interface ResumeContent {
  title: string
  summary: string
  contact: {
    email: string
  }
  education: {
    degree: string
    institution: string
    duration: string
  }[]
  skills: {
    languages: string[]
    frameworks: string[]
    databases: string[]
    ORM: string[]
    tools: string[]
  }
  projects: Project[]
  achievements: string[]
}

export interface Resume {
  id: number
  name: string
  content: ResumeContent
}