"""
Application configuration
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""

    # APP CONFIG
    APP_NAME: str = "Eau de Ceci API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # DATABASE
    DATABASE_URL: str = "postgresql://arman_user:dwNYglIlqrPrXEWwto4mA98pfHOJxBO7@dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com/arman_travel"

    # CORS
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8000", "*"]

    # JWT CONFIG
    JWT_SECRET_KEY: str = "tu-secreto-super-seguro-cambialo-en-produccion-12345"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
