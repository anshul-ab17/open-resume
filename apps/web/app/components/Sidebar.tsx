"use client"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-[#1f1f1f] z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold tracking-tight">
          <span className="text-orange-500">Anshul</span> Bharat
        </h1>

        <nav className="hidden md:flex gap-8 text-sm text-gray-400">
          <a className="hover:text-white transition">About</a>
          <a className="hover:text-white transition">Projects</a>
          <a className="hover:text-orange-500 transition">AI Resume</a>
        </nav>
      </div>
    </header>
  )
}