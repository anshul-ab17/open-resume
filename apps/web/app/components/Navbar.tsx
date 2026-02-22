"use client"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-[#1f1f1f] z-50">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold tracking-tight">
          <span className="text-orange-500">Anshul</span> Bharat
        </h1>

        <nav className="flex gap-8 text-sm text-gray-400">
          <a href="#about" className="hover:text-white transition">
            About
          </a>

          <a href="#skills" className="hover:text-white transition">
            Skills
          </a>

          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>

          <a
            href="/resume.pdf"
            download
            className="text-orange-500 hover:text-orange-400 transition"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  )
}