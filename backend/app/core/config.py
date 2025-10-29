"""
Application configuration
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""

    # App
    APP_NAME: str = "Eau de Ceci API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "postgresql://eaudececi:eaudececi123@db:5432/eaudececi"

    # Production database (Render PostgreSQL 17)
    PROD_DATABASE_URL: Optional[str] = None

    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8000", "*"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
