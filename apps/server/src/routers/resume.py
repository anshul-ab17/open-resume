from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.models import Resume
from src.schemas import ResumeCreate, ResumeResponse

router = APIRouter(prefix="/resume", tags=["Resume"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[ResumeResponse])
def get_resumes(db: Session = Depends(get_db)):
    return db.query(Resume).all()


@router.post("/", response_model=ResumeResponse)
def create_resume(data: ResumeCreate, db: Session = Depends(get_db)):
    resume = Resume(
        name=data.name,
        content=data.content
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return resume

@router.put("/{resume_id}")
def update_resume(resume_id: int, data: ResumeCreate, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    resume.name = data.name
    resume.content = data.content

    db.commit()
    db.refresh(resume)

    return resume