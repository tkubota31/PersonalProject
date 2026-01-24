from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
import models
import schemas
from database import get_db

router = APIRouter(prefix="/api/tournaments", tags=["tournaments"])

@router.get("/", response_model=list[schemas.TournamentResponse])
def list_tournaments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tournaments = db.query(models.Tournament).offset(skip).limit(limit).all()
    return tournaments

@router.get("/{tournament_id}", response_model=schemas.TournamentResponse)
def get_tournament(tournament_id: int, db: Session = Depends(get_db)):
    tournament = db.query(models.Tournament).filter(models.Tournament.id == tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return tournament

@router.post("/", response_model=schemas.TournamentResponse)
def create_tournament(tournament: schemas.TournamentCreate, db: Session = Depends(get_db)):
    db_tournament = models.Tournament(
        name=tournament.name,
        description=tournament.description,
        location=tournament.location,
        start_date=tournament.start_date,
        end_date=tournament.end_date,
        max_teams=tournament.max_teams,
        registration_deadline=tournament.registration_deadline,
        fee=tournament.fee
    )
    db.add(db_tournament)
    db.commit()
    db.refresh(db_tournament)
    return db_tournament

@router.put("/{tournament_id}", response_model=schemas.TournamentResponse)
def update_tournament(
    tournament_id: int,
    tournament_update: schemas.TournamentUpdate,
    db: Session = Depends(get_db)
):
    db_tournament = db.query(models.Tournament).filter(models.Tournament.id == tournament_id).first()
    if not db_tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")

    update_data = tournament_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_tournament, field, value)

    db.commit()
    db.refresh(db_tournament)
    return db_tournament

@router.delete("/{tournament_id}", status_code=204)
def delete_tournament(tournament_id: int, db: Session = Depends(get_db)):
    db_tournament = db.query(models.Tournament).filter(models.Tournament.id == tournament_id).first()
    if not db_tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")

    db.delete(db_tournament)
    db.commit()
