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

    # Database (defaults to Render production DB)
    DATABASE_URL: str = "postgresql://arman_user:dwNYglIlqrPrXEWwto4mA98pfHOJxBO7@dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com/arman_travel"

    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8000", "*"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
