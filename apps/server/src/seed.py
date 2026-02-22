from src.database import SessionLocal, engine, Base
from src.models import Resume

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        db.query(Resume).delete()
        db.commit()

        resume = Resume(
                name="Anshul Bharat",
                content={
                    "title": "Full Stack Developer",
                    "summary": "Computer Science Engineering student passionate about scalable backend systems and distributed architecture.",
                    "contact": {
                        "email": "anshul.ab17x@gmail.com",
                    },
                    "education": [
                        {
                            "degree": "Bachelor of Engineering in Computer Science",
                            "institution": "Chandigarh University",
                            "duration": "2021-2025"
                        }
                    ],
                    "skills": {
                        "languages": ["Python", "JavaScript", "C++", "Rust", "Go"],
                        "frameworks": ["FastAPI", "React.js", "Next.js", "Express.js", "Hono.js"],
                        "databases": ["PostgreSQL", "Redis", "SQLite"],
                        "ORM": ["Prisma"],
                        "tools": ["Docker", "Git", "Kafka", "K8s"]
                    },
                    "projects": [
                        {
                            "name": "AI-based Fraud Detection System",
                            "description": "Built a fraud detection system using feature encoding and compressed binary transformation achieving 75% data reduction while maintaining prediction accuracy.",
                            "tech_stack": ["Python", "Scikit-learn", "Pandas", "PostgreSQL"],
                            "highlights": [
                                "Feature engineering and anomaly detection",
                                "Binary compression optimization",
                                "Precision-recall model evaluation"
                            ],
                            "category": "Machine Learning"
                        },
                        {
                            "name": "TwoD Verse",
                            "description": "Real-time 2D metaverse platform inspired by Gather.town with spatial interaction and live multiplayer synchronization.",
                            "tech_stack": ["TypeScript", "WebSockets", "PostgreSQL", "Prisma"],
                            "highlights": [
                                "Real-time multiplayer engine",
                                "Concurrent state synchronization",
                                "Optimized WebSocket broadcasting"
                            ],
                            "category": "Real-Time Systems"
                        },
                        {
                            "name": "Moneo",
                            "description": "Centralized crypto exchange (CEX) with order matching engine and real-time bid/ask synchronization.",
                            "tech_stack": ["FastAPI", "PostgreSQL", "Redis", "WebSockets"],
                            "highlights": [
                                "Order matching engine implementation",
                                "Real-time order book updates",
                                "Secure trade execution"
                            ],
                            "category": "FinTech"
                        },
                        {
                            "name": "Updawg",
                            "description": "Rust-based distributed uptime monitoring system with concurrent async health checks.",
                            "tech_stack": ["Rust", "Tokio", "PostgreSQL"],
                            "highlights": [
                                "Async monitoring engine",
                                "Distributed scheduler design",
                                "Efficient metric storage"
                            ],
                            "category": "Systems Programming"
                        },
                        {
                            "name": "Canvas",
                            "description": "Collaborative whiteboard with multi-user real-time drawing synchronization.",
                            "tech_stack": ["Next.js", "Golang", "WebSockets"],
                            "highlights": [
                                "Real-time drawing sync",
                                "Event broadcasting backend",
                                "Conflict resolution system"
                            ],
                            "category": "Collaboration Tools"
                        }
                    ],
                    "achievements": [
                        "Top 20 in Smart India Hackathon internal selection",
                        "Top 2% globally in Full Stack Development (Coursera)"
                    ]
                }
            )

        db.add(resume)
        db.commit()

        print(" Database seeded successfully!")

    except Exception as e:
        db.rollback()
        print(" Error while seeding:", str(e))

    finally:
        db.close()


if __name__ == "__main__":
    seed()