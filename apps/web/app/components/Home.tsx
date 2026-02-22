"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/resume/`)
      .then((res) => {
        console.log("API response:", res.data); 
        setResume(res.data[0]);  
      })
      .catch((err) => console.error(err));
  }, []);

  if (!resume) return <div>Loading...</div>;

  return (
    <div>
      <h1>{resume.name}</h1>

      <h2>Languages:</h2>
      <p>
        {resume.content.skills.languages.join(", ")}
      </p>
    </div>
  );
}