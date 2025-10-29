# Eau de Ceci - Full Stack Application 🌸

**Eau de Ceci** es una aplicación full-stack de perfumes inspirada en Fragrantica, construida con:

- **Frontend**: HTML, CSS y JavaScript vanilla (ESM modules)
- **Backend**: FastAPI (Python 3.11)
- **Database**: PostgreSQL 17
- **Containerización**: Docker & Docker Compose
- **Hot-reload**: Desarrollo con recarga automática
- **Migraciones**: Alembic con soporte para producción (Render PostgreSQL 17)

---

## 🚀 Quick Start con Docker

### Prerrequisitos

- Docker Desktop instalado
- Docker Compose instalado
- Puerto 8000 y 5432 disponibles

### Levantar el Proyecto

```bash
# 1. Clonar/descargar el proyecto
cd eau-de-ceci

# 2. Construir y levantar los contenedores
docker-compose build
docker-compose up

# El proyecto estará disponible en:
# - Frontend + API: http://localhost:8000
# - PostgreSQL: localhost:5432
```

### Comandos Útiles

```bash
# Levantar en background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver logs solo del backend
docker-compose logs -f backend

# Detener contenedores
docker-compose down

# Detener y eliminar volúmenes (resetea DB)
docker-compose down -v

# Reconstruir después de cambios en requirements.txt
docker-compose build --no-cache backend
docker-compose up

# Ejecutar comandos en el contenedor del backend
docker-compose exec backend bash

# Ejecutar migraciones manualmente
docker-compose exec backend alembic upgrade head

# Reseedear la base de datos
docker-compose exec backend python seed_db.py
```

---

## 📁 Estructura del Proyecto

```
eau-de-ceci/
├─ backend/                  # Backend FastAPI
│  ├─ app/
│  │  ├─ api/
│  │  │  └─ perfumes.py      # Endpoints de perfumes
│  │  ├─ models/
│  │  │  └─ perfume.py       # Modelo SQLAlchemy
│  │  ├─ schemas/
│  │  │  └─ perfume.py       # Schemas Pydantic
│  │  ├─ core/
│  │  │  └─ config.py        # Configuración
│  │  ├─ db/
│  │  │  └─ session.py       # Sesión de DB
│  │  └─ main.py             # FastAPI app
│  ├─ alembic/               # Migraciones
│  │  ├─ versions/
│  │  │  └─ 001_initial...py # Migración inicial
│  │  ├─ env.py
│  │  └─ script.py.mako
│  ├─ Dockerfile
│  ├─ requirements.txt
│  ├─ alembic.ini
│  └─ seed_db.py             # Script de seed
├─ css/                      # Estilos frontend
│  ├─ base.css
│  ├─ layout.css
│  ├─ components.css
│  └─ scroll-effects.css     # ⭐ Nuevo: efectos de scroll
├─ js/                       # JavaScript modular
│  ├─ config.js              # ⭐ Nuevo: configuración API
│  ├─ api.js                 # ⭐ Nuevo: cliente API
│  ├─ scroll-effects.js      # ⭐ Nuevo: animaciones scroll
│  ├─ data.js                # (Deprecado, ahora usa API)
│  ├─ app.js
│  ├─ ui.js
│  ├─ search.js
│  ├─ catalog.js
│  ├─ perfume.js
│  ├─ community.js
│  └─ news.js
├─ assets/                   # Recursos estáticos
├─ *.html                    # Páginas frontend
├─ docker-compose.yml        # Configuración Docker
├─ .dockerignore
├─ .gitignore
└─ README_DOCKER.md          # Este archivo
```

---

## 🎨 Nuevas Características

### 1. Efectos de Scroll Fade

Las tarjetas de perfumes ahora tienen un **efecto de difuminado profesional** basado en su posición en el viewport:

- **Difuminado** cuando están lejos del centro
- **Transición suave** al acercarse al centro
- **Completamente visible** cuando están centradas
- **Respeta `prefers-reduced-motion`** para accesibilidad

Implementado en [`css/scroll-effects.css`](css/scroll-effects.css) y [`js/scroll-effects.js`](js/scroll-effects.js)

### 2. Imágenes Reales de Perfumes

El proyecto ahora usa imágenes reales de perfumes desde URLs externas:

- `https://fimgs.net/mdimg/perfume-thumbs/375x500.*.avif`
- Formato AVIF para mejor rendimiento
- 5 perfumes iniciales con imágenes reales

### 3. Backend API REST

FastAPI con endpoints completos:

- `GET /api/perfumes` - Listar con filtros y paginación
- `GET /api/perfumes/{id}` - Obtener por ID
- `GET /api/perfumes/search/suggestions` - Typeahead
- `POST /api/perfumes` - Crear perfume
- `PUT /api/perfumes/{id}` - Actualizar
- `DELETE /api/perfumes/{id}` - Eliminar
- `GET /api/health` - Health check

Documentación automática en: `http://localhost:8000/docs`

### 4. PostgreSQL 17

Base de datos relacional con:

- Tabla `perfumes` con todos los campos
- Índices en `brand`, `name`, `id`
- Arrays de PostgreSQL para notas y estaciones
- Timestamps automáticos

### 5. Hot Reload Automático

Los cambios se reflejan automáticamente:

- **Backend**: Uvicorn con `--reload`
- **Frontend**: Monta volúmenes de archivos HTML/CSS/JS
- **No requiere reconstruir** para cambios de código

---

## 🔧 Desarrollo

### Modificar Backend

```bash
# Los cambios en backend/ se reflejan automáticamente
# Edita archivos en backend/app/ y guarda

# Ver logs para verificar recarga
docker-compose logs -f backend
```

### Modificar Frontend

```bash
# Los cambios en HTML/CSS/JS se reflejan inmediatamente
# Solo recarga el navegador (F5)
```

### Agregar Dependencias Python

```bash
# 1. Agrega la dependencia a backend/requirements.txt
echo "nueva-libreria==1.0.0" >> backend/requirements.txt

# 2. Reconstruye el contenedor
docker-compose build backend
docker-compose up -d
```

### Crear Nueva Migración

```bash
# Ejecutar dentro del contenedor
docker-compose exec backend alembic revision --autogenerate -m "descripcion del cambio"

# Aplicar migración
docker-compose exec backend alembic upgrade head
```

---

## 🌐 Producción (Render PostgreSQL 17)

### Configurar para Producción

1. Crea una base de datos PostgreSQL 17 en Render

2. Obtén la URL de conexión (formato: `postgresql://user:pass@host:port/database`)

3. Configura la variable de entorno:

```bash
# En producción (Render, Heroku, etc.)
export PROD_DATABASE_URL="postgresql://user:pass@host:port/database"
```

4. Ejecuta migraciones en producción:

```bash
# Localmente contra producción
DATABASE_URL=$PROD_DATABASE_URL alembic upgrade head

# O desde el servidor de producción
python -m alembic upgrade head
```

### Variables de Entorno de Producción

```env
# .env (producción)
APP_NAME=Eau de Ceci API
DEBUG=false
DATABASE_URL=postgresql://user:pass@render-host:5432/eaudececi
CORS_ORIGINS=["https://eaudececi.com"]
```

---

## 🗄️ Base de Datos

### Schema de Perfumes

```sql
CREATE TABLE perfumes (
    id VARCHAR PRIMARY KEY,
    brand VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR NOT NULL,
    rating_avg FLOAT DEFAULT 0.0,
    votes INTEGER DEFAULT 0,
    notes_top VARCHAR[] NOT NULL,
    notes_middle VARCHAR[] NOT NULL,
    notes_base VARCHAR[] NOT NULL,
    gender VARCHAR NOT NULL,  -- 'unisex', 'male', 'female'
    season VARCHAR[] NOT NULL,  -- ['spring', 'summer', 'fall', 'winter']
    popularity_score INTEGER DEFAULT 0,
    release_year INTEGER NOT NULL,
    longevity INTEGER DEFAULT 50,  -- 0-100
    sillage INTEGER DEFAULT 50,  -- 0-100
    accords VARCHAR[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX ix_perfumes_brand ON perfumes(brand);
CREATE INDEX ix_perfumes_name ON perfumes(name);
CREATE INDEX ix_perfumes_id ON perfumes(id);
```

### Conectar Directamente a PostgreSQL

```bash
# Desde tu máquina
psql postgresql://eaudececi:eaudececi123@localhost:5432/eaudececi

# Desde Docker
docker-compose exec db psql -U eaudececi -d eaudececi
```

### Resetear Base de Datos

```bash
# Detener y eliminar volúmenes
docker-compose down -v

# Levantar de nuevo (recreará DB)
docker-compose up

# Las migraciones y seed se ejecutan automáticamente
```

---

## 🧪 Testing

### Probar API

```bash
# Health check
curl http://localhost:8000/api/health

# Listar perfumes
curl http://localhost:8000/api/perfumes

# Obtener perfume específico
curl http://localhost:8000/api/perfumes/p001

# Buscar (typeahead)
curl "http://localhost:8000/api/perfumes/search/suggestions?q=rose&limit=5"

# Con filtros
curl "http://localhost:8000/api/perfumes?gender=female&sort_by=rating"
```

### Documentación Interactiva

Visita `http://localhost:8000/docs` para:
- Ver todos los endpoints
- Probar requests directamente
- Ver schemas de request/response

---

## 🐛 Troubleshooting

### Puerto 8000 ya en uso

```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8001:8000"  # Usa 8001 en lugar de 8000
```

### Base de datos no se conecta

```bash
# Verificar que el contenedor de DB está running
docker-compose ps

# Ver logs de DB
docker-compose logs db

# Intentar conectar manualmente
docker-compose exec db psql -U eaudececi -d eaudececi
```

### Cambios no se reflejan

```bash
# Backend: verificar que uvicorn detecta cambios
docker-compose logs -f backend

# Frontend: hacer hard refresh
# Windows/Linux: Ctrl + F5
# Mac: Cmd + Shift + R

# Si persiste, reconstruir
docker-compose build --no-cache
docker-compose up
```

### Error de migraciones

```bash
# Ver estado de migraciones
docker-compose exec backend alembic current

# Ver historial
docker-compose exec backend alembic history

# Rollback
docker-compose exec backend alembic downgrade -1

# Upgrade
docker-compose exec backend alembic upgrade head
```

---

## 📊 Performance

### Optimizaciones Implementadas

- ✅ **Scroll effects optimizados** con throttle y IntersectionObserver
- ✅ **Imágenes AVIF** para menor peso
- ✅ **Índices de DB** en campos searchables
- ✅ **Connection pooling** en SQLAlchemy
- ✅ **Respeta prefers-reduced-motion** para accesibilidad

### Lighthouse Scores Esperados

- **Performance**: 85-95
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

---

## 🚢 Deployment

### Docker Hub

```bash
# Build production image
docker build -t eaudececi/backend:latest ./backend

# Push to Docker Hub
docker push eaudececi/backend:latest
```

### Render (recomendado)

1. **Base de datos**: PostgreSQL 17 en Render
2. **Backend**: Web Service con Dockerfile
3. **Frontend**: Static Site o sirve desde FastAPI

```bash
# Build command (Render)
docker build -t backend ./backend

# Start command
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## 📝 Licencia

Proyecto demostrativo/educativo.

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

**¡Disfruta desarrollando Eau de Ceci!** 🌸✨

Para más información:
- Backend API docs: `http://localhost:8000/docs`
- Swagger UI: `http://localhost:8000/redoc`
