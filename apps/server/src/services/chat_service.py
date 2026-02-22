import os
import json
import httpx
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from src.models import Resume, ChatHistory

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def extract_relevant_section(resume_dict: dict, question: str):
    question = question.lower()

    if "skill" in question or "technology" in question:
        return resume_dict.get("skills")

    if "project" in question:
        return resume_dict.get("projects")

    if "education" in question or "degree" in question:
        return resume_dict.get("education")

    if "achievement" in question:
        return resume_dict.get("achievements")

    return resume_dict  # fallback


async def call_openrouter(prompt: str):
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "mistralai/mistral-7b-instruct",
                "messages": [
                    {"role": "system", "content": "You are a resume assistant."},
                    {"role": "user", "content": prompt},
                ],
            },
        )

        data = response.json()

        if "choices" not in data:
            return f"OpenRouter Error: {data}"

        return data["choices"][0]["message"]["content"]

async def process_chat(db: Session, user_message: str):

    resume = db.query(Resume).first()
    if not resume:
        return "No resume found in database."

    resume_dict = json.loads(resume.content)

    relevant_data = extract_relevant_section(resume_dict, user_message)

    prompt = f"""
Answer the question using ONLY the resume data below.
If the answer is not found, say:
"I couldn't find that in Anshul's resume."

Resume Data:
{json.dumps(relevant_data, indent=2)}

Question:
{user_message}
"""

    ai_response = await call_openrouter(prompt)

    chat_entry = ChatHistory(
        user_message=user_message,
        ai_response=ai_response
    )

    db.add(chat_entry)
    db.commit()

    return ai_response