"""
FastAPI main application
"""
import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.api import perfumes

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(perfumes.router)

# Serve static files (frontend) - only if directory exists
# In production (Render), frontend is at /app root
# In development (Docker), we mount it differently
frontend_dir = Path("/app/frontend")
frontend_root = Path("/app")

# Try /app/frontend first (Docker), then /app (Render)
if frontend_dir.exists() and (frontend_dir / "index.html").exists():
    app.mount("/", StaticFiles(directory="/app/frontend", html=True), name="frontend")
elif (frontend_root / "index.html").exists():
    app.mount("/", StaticFiles(directory="/app", html=True), name="frontend")


@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["/app"],
    )
