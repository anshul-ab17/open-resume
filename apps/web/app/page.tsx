"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./components/Hero";
import ResumeSection from "./components/ResumeSection";
import ChatWidget from "./components/ChatWidget";
import { Resume } from "./types/resume";

export default function Home() {
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/resume/")
      .then((res) => {
        setResume(res.data[0]); // IMPORTANT
      })
      .catch((err) => console.error(err));
  }, []);

  if (!resume) return <div style={{ padding: "40px" }}>Loading...</div>;

  return (
    <>
      <Hero />
      <ResumeSection resume={resume} />
      <ChatWidget />
    </>
  );
}