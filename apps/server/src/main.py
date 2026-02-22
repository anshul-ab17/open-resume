from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

from src.database import engine, Base
from src.routers import chat, resume
from src.services.limiter import limiter

# Create tables automatically in Supabase
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Open Resume API")

# CORS 
origins = [
    "http://localhost:3000",
    "https://open-resume-web.vercel.app",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate Limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Include routers
app.include_router(chat.router)
app.include_router(resume.router)

@app.get("/")
def root():
    return {"status": "server Running"}