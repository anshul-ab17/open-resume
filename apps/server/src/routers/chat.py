from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.schemas import ChatRequest, ChatResponse, ChatHistoryResponse
from src.models import ChatHistory
from src.services.chat_service import process_chat

router = APIRouter(prefix="/chat", tags=["Chat"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    reply = await process_chat(db, request.message)
    return ChatResponse(reply=reply)


@router.get("/history", response_model=list[ChatHistoryResponse])
def get_chat_history(db: Session = Depends(get_db)):
    return db.query(ChatHistory).all()


@router.delete("/history")
def clear_chat_history(db: Session = Depends(get_db)):
    db.query(ChatHistory).delete()
    db.commit()
    return {"message": "Chat history cleared"}