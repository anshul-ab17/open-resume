from fastapi import FastAPI
from src.database import engine, Base
from src.routers import chat, resume

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Portfolio API")

app.include_router(chat.router)
app.include_router(resume.router)


@app.get("/")
def health():
    return {"status": "Backend running "}