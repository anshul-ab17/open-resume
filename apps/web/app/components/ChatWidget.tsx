"use client";

import { useState } from "react";
import axios from "axios";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async () => {
    if (!message) return;

    try {
      const res = await axios.post("http://localhost:8000/chat/", {
        message,
      });

      setMessages((prev) => [
        ...prev,
        "You: " + message,
        "AI: " + res.data.reply,
      ]);

      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#f97316",
          color: "black",
          padding: "12px 20px",
          borderRadius: "50px",
          border: "none",
          cursor: "pointer",
        }}
      >
        AI
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "320px",
            backgroundColor: "#111",
            border: "1px solid #f97316",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                {msg}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", marginTop: "12px" }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about me..."
              style={{
                flex: 1,
                padding: "8px",
                background: "#222",
                border: "none",
                color: "white",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#f97316",
                border: "none",
                padding: "8px 12px",
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}