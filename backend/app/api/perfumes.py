"""
Perfumes API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from typing import List, Optional
from app.db.session import get_db
from app.models.perfume import Perfume
from app.schemas.perfume import PerfumeResponse, PerfumeCreate, PerfumeUpdate

router = APIRouter(prefix="/api/perfumes", tags=["perfumes"])


@router.get("/", response_model=List[PerfumeResponse])
def get_perfumes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    search: Optional[str] = None,
    gender: Optional[str] = None,
    season: Optional[str] = None,
    sort_by: str = Query("popularity", regex="^(popularity|rating|newest|name)$"),
    db: Session = Depends(get_db),
):
    """
    Get all perfumes with optional filters
    """
    query = db.query(Perfume)

    # Search filter
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Perfume.brand.ilike(search_term),
                Perfume.name.ilike(search_term),
                Perfume.description.ilike(search_term),
            )
        )

    # Gender filter
    if gender:
        query = query.filter(
            or_(Perfume.gender == gender, Perfume.gender == "unisex")
        )

    # Season filter
    if season:
        query = query.filter(Perfume.season.contains([season]))

    # Sorting
    if sort_by == "popularity":
        query = query.order_by(Perfume.popularity_score.desc())
    elif sort_by == "rating":
        query = query.order_by(Perfume.rating_avg.desc())
    elif sort_by == "newest":
        query = query.order_by(Perfume.release_year.desc())
    elif sort_by == "name":
        query = query.order_by(Perfume.name.asc())

    perfumes = query.offset(skip).limit(limit).all()

    return perfumes


@router.get("/{perfume_id}", response_model=PerfumeResponse)
def get_perfume(perfume_id: str, db: Session = Depends(get_db)):
    """
    Get a single perfume by ID
    """
    perfume = db.query(Perfume).filter(Perfume.id == perfume_id).first()

    if not perfume:
        raise HTTPException(status_code=404, detail="Perfume not found")

    return perfume


@router.post("/", response_model=PerfumeResponse, status_code=201)
def create_perfume(perfume: PerfumeCreate, db: Session = Depends(get_db)):
    """
    Create a new perfume
    """
    # Check if perfume with same ID exists
    existing = db.query(Perfume).filter(Perfume.id == perfume.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Perfume with this ID already exists")

    db_perfume = Perfume(**perfume.model_dump())
    db.add(db_perfume)
    db.commit()
    db.refresh(db_perfume)

    return db_perfume


@router.put("/{perfume_id}", response_model=PerfumeResponse)
def update_perfume(
    perfume_id: str, perfume_update: PerfumeUpdate, db: Session = Depends(get_db)
):
    """
    Update a perfume
    """
    db_perfume = db.query(Perfume).filter(Perfume.id == perfume_id).first()

    if not db_perfume:
        raise HTTPException(status_code=404, detail="Perfume not found")

    # Update only provided fields
    update_data = perfume_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_perfume, field, value)

    db.commit()
    db.refresh(db_perfume)

    return db_perfume


@router.delete("/{perfume_id}", status_code=204)
def delete_perfume(perfume_id: str, db: Session = Depends(get_db)):
    """
    Delete a perfume
    """
    db_perfume = db.query(Perfume).filter(Perfume.id == perfume_id).first()

    if not db_perfume:
        raise HTTPException(status_code=404, detail="Perfume not found")

    db.delete(db_perfume)
    db.commit()

    return None


@router.get("/search/suggestions", response_model=List[PerfumeResponse])
def search_suggestions(
    q: str = Query(..., min_length=2),
    limit: int = Query(8, ge=1, le=20),
    db: Session = Depends(get_db),
):
    """
    Get search suggestions (typeahead)
    """
    search_term = f"%{q}%"

    perfumes = (
        db.query(Perfume)
        .filter(
            or_(
                Perfume.brand.ilike(search_term),
                Perfume.name.ilike(search_term),
            )
        )
        .order_by(Perfume.popularity_score.desc())
        .limit(limit)
        .all()
    )

    return perfumes
