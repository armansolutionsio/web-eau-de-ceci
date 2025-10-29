# Dockerfile for Render deployment
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements.txt ./backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy entire project
COPY . .

# Set working directory to backend
WORKDIR /app/backend

# Expose port (Render will set $PORT)
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/api/health')" || exit 1

# Run migrations and start server
# Note: Set DATABASE_URL explicitly for Render PostgreSQL
ENV DATABASE_URL=postgresql://arman_user:dwNYglIlqrPrXEWwto4mA98pfHOJxBO7@dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com/arman_travel

CMD alembic upgrade head && \
    uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
