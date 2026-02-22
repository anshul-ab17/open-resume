from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.models import Resume
from src.schemas import ResumeCreate, ResumeResponse
import json

router = APIRouter(prefix="/resume", tags=["Resume"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ResumeResponse)
def create_resume(data: ResumeCreate, db: Session = Depends(get_db)):
    resume = Resume(
        name=data.name,
        content=json.dumps(data.content)  # convert dict → string
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "id": resume.id,
        "name": resume.name,
        "content": data.content  # return original dict
    }

import json

@router.get("/", response_model=list[ResumeResponse])
def get_resumes(db: Session = Depends(get_db)):
    resumes = db.query(Resume).all()

    result = []
    for resume in resumes:
        result.append({
            "id": resume.id,
            "name": resume.name,
            "content": json.loads(resume.content)  # convert string → dict
        })

    return result

@router.put("/{resume_id}", response_model=ResumeResponse)
def update_resume(resume_id: int, data: ResumeCreate, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume.name = data.name
    resume.content = data.content
    db.commit()
    db.refresh(resume)
    return resume


@router.delete("/{resume_id}")
def delete_resume(resume_id: int, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    db.delete(resume)
    db.commit()
    return {"message": "Resume deleted"}