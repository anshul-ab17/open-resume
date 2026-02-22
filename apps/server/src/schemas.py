from pydantic import BaseModel
from datetime import datetime
from typing import Dict,Any


#  Resume 

class ResumeCreate(BaseModel):
    name: str
    content: Dict[str, Any]


class ResumeResponse(BaseModel):
    id: int
    name: str
    content: Dict[str, Any]

    class Config:
        from_attributes = True


#  Chat 

class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


class ChatHistoryResponse(BaseModel):
    id: int
    user_message: str
    ai_response: str
    timestamp: datetime

    class Config:
        from_attributes = True