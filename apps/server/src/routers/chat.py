from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.schemas import ChatRequest, ChatResponse, ChatHistoryResponse
from src.models import ChatHistory
from src.services.chat_service import process_chat
from fastapi import Request
from src.services.limiter import limiter

router = APIRouter(prefix="/chat", tags=["Chat"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ChatResponse)
@limiter.limit("5/minute")  # stricter limit for AI endpoint
async def chat(
    request: Request,
    data: ChatRequest,
    db: Session = Depends(get_db)
):
    reply = await process_chat(db, data.message)
    return ChatResponse(reply=reply)


@router.get("/history", response_model=list[ChatHistoryResponse])
def get_chat_history(db: Session = Depends(get_db)):
    return db.query(ChatHistory).all()


@router.delete("/history")
def clear_chat_history(db: Session = Depends(get_db)):
    db.query(ChatHistory).delete()
    db.commit()
    return {"message": "Chat history cleared"}