"""
FastAPI main application
"""
import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.api import perfumes, auth

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc
)

# ============================================
# MIDDLEWARES
# ============================================

# CORS middleware (debe ir primero)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# No middleware de auth - simple system

# ============================================
# ROUTERS
# ============================================

# Include routers
app.include_router(auth.router)  # /api/auth/*
app.include_router(perfumes.router)  # /api/perfumes/*

# Determine frontend directory
frontend_dir = Path("/app/frontend")
frontend_root = Path("/app")

if frontend_dir.exists() and (frontend_dir / "index.html").exists():
    FRONTEND_DIR = "/app/frontend"
elif (frontend_root / "index.html").exists():
    FRONTEND_DIR = "/app"
else:
    FRONTEND_DIR = None

# Clean URL routes - serve HTML pages without .html extension
if FRONTEND_DIR:
    from fastapi.responses import FileResponse, RedirectResponse

    @app.get("/")
    async def index():
        return FileResponse(f"{FRONTEND_DIR}/index.html")

    @app.get("/catalog")
    async def catalog():
        return FileResponse(f"{FRONTEND_DIR}/catalog.html")

    @app.get("/perfume")
    async def perfume():
        return FileResponse(f"{FRONTEND_DIR}/perfume.html")

    @app.get("/community")
    async def community():
        return FileResponse(f"{FRONTEND_DIR}/community.html")

    @app.get("/news")
    async def news():
        return FileResponse(f"{FRONTEND_DIR}/news.html")

    @app.get("/login")
    async def login():
        return FileResponse(f"{FRONTEND_DIR}/login.html")

    # Redirects from .html URLs to clean URLs
    @app.get("/index.html")
    async def redirect_index():
        return RedirectResponse(url="/", status_code=301)

    @app.get("/catalog.html")
    async def redirect_catalog():
        return RedirectResponse(url="/catalog", status_code=301)

    @app.get("/perfume.html")
    async def redirect_perfume():
        return RedirectResponse(url="/perfume", status_code=301)

    @app.get("/community.html")
    async def redirect_community():
        return RedirectResponse(url="/community", status_code=301)

    @app.get("/news.html")
    async def redirect_news():
        return RedirectResponse(url="/news", status_code=301)

    @app.get("/login.html")
    async def redirect_login():
        return RedirectResponse(url="/login", status_code=301)

    # Mount static assets (CSS, JS, images)
    app.mount("/css", StaticFiles(directory=f"{FRONTEND_DIR}/css"), name="css")
    app.mount("/js", StaticFiles(directory=f"{FRONTEND_DIR}/js"), name="js")
    app.mount("/assets", StaticFiles(directory=f"{FRONTEND_DIR}/assets"), name="assets")


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
