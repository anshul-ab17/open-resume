"use client"

import { useState } from "react"
import axios from "axios"
import { Resume } from "../types/resume"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ChatWidget({ resume }: { resume: Resume }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([])

  const sendMessage = async () => {
    if (!message.trim()) return

    const newMessages = [
      ...messages,
      { role: "user", content: message },
    ]
    setMessages(newMessages)
    setMessage("")

    try {
      const res = await axios.post(`${API_URL}/chat/`, {
        message,
      })

      setMessages([
        ...newMessages,
        { role: "assistant", content: res.data.reply },
      ])
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error connecting to AI." },
      ])
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-orange-500 text-black w-16 h-16 rounded-full shadow-lg font-bold"
      >
        AI
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-black border border-gray-800 rounded-xl shadow-2xl p-4">
          <div className="h-64 overflow-y-auto space-y-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "text-orange-400"
                    : "text-gray-300"
                }
              >
                {m.content}
              </div>
            ))}
          </div>

          <div className="mt-4 flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-900 text-white p-2 rounded-l-md border border-gray-700"
              placeholder="Ask about my resume..."
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 px-4 rounded-r-md text-black font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}