"""
Perfume Pydantic schemas
"""
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class PerfumeBase(BaseModel):
    """Base perfume schema"""

    brand: str
    name: str
    description: str
    image: str
    notes_top: List[str]
    notes_middle: List[str]
    notes_base: List[str]
    gender: str
    season: List[str]
    release_year: int
    accords: List[str]
    longevity: int = 50
    sillage: int = 50
    popularity_score: int = 0


class PerfumeCreate(PerfumeBase):
    """Schema for creating perfume"""

    id: str


class PerfumeUpdate(BaseModel):
    """Schema for updating perfume"""

    brand: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    notes_top: Optional[List[str]] = None
    notes_middle: Optional[List[str]] = None
    notes_base: Optional[List[str]] = None
    gender: Optional[str] = None
    season: Optional[List[str]] = None
    release_year: Optional[int] = None
    accords: Optional[List[str]] = None
    longevity: Optional[int] = None
    sillage: Optional[int] = None
    popularity_score: Optional[int] = None


class PerfumeResponse(PerfumeBase):
    """Schema for perfume response"""

    id: str
    rating_avg: float
    votes: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
