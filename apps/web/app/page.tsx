export const runtime = "edge"
export const dynamic = "force-dynamic"

import Navbar from "./components/Navbar"
import AboutCard from "./components/AboutCard"
import SkillsCard from "./components/SkillsCard"
import ProjectsCard from "./components/ProjectsCard"
import ChatWidget from "./components/ChatWidget"
import { Resume } from "./types/resume"

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getResume(): Promise<Resume | null> {
  try {
    const res = await fetch(`${API_URL}resume/`, {
      cache: "no-store",
    })

    if (!res.ok) return null

    const data = await res.json()

    if (Array.isArray(data) && data.length > 0) {
      return data[0]
    }

    return null
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}

export default async function Home() {
  const resume = await getResume()

  if (!resume) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        No resume found
      </div>
    )
  }

  return (
    <>
            <div style={{color: "white"}}>Edge Working Test</div>

    {/* //   <Navbar />
    //   <main className="pt-24 px-6 max-w-5xl mx-auto space-y-12">
    //     <AboutCard resume={resume} />
    //     <SkillsCard resume={resume} />
    //     <ProjectsCard resume={resume} />
    //   </main>
    //   <ChatWidget resume={resume} /> */}
    </>
  )
}