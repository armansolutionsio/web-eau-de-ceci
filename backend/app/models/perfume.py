"""
Perfume database model
"""
from sqlalchemy import Column, Integer, String, Float, ARRAY, JSON, Text
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from app.db.session import Base


class Perfume(Base):
    """Perfume model"""

    __tablename__ = "perfumes"

    id = Column(String, primary_key=True, index=True)
    brand = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=False)
    image = Column(String, nullable=False)
    rating_avg = Column(Float, default=0.0)
    votes = Column(Integer, default=0)

    # Notes
    notes_top = Column(ARRAY(String), nullable=False)
    notes_middle = Column(ARRAY(String), nullable=False)
    notes_base = Column(ARRAY(String), nullable=False)

    # Attributes
    gender = Column(String, nullable=False)  # unisex, male, female
    season = Column(ARRAY(String), nullable=False)  # spring, summer, fall, winter
    popularity_score = Column(Integer, default=0)
    release_year = Column(Integer, nullable=False)

    # Characteristics
    longevity = Column(Integer, default=50)  # 0-100
    sillage = Column(Integer, default=50)  # 0-100
    accords = Column(ARRAY(String), nullable=False)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        """Convert to dictionary"""
        return {
            "id": self.id,
            "brand": self.brand,
            "name": self.name,
            "description": self.description,
            "image": self.image,
            "ratingAvg": self.rating_avg,
            "votes": self.votes,
            "notesTop": self.notes_top,
            "notesMiddle": self.notes_middle,
            "notesBase": self.notes_base,
            "gender": self.gender,
            "season": self.season,
            "popularityScore": self.popularity_score,
            "releaseYear": self.release_year,
            "longevity": self.longevity,
            "sillage": self.sillage,
            "accords": self.accords,
        }
