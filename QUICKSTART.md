# 🚀 Quick Start Guide - Eau de Ceci

## ⚡ Inicio más rápido (Windows):

```bash
start.bat
```

Este script automáticamente:
- Limpia contenedores antiguos
- Construye las imágenes
- Levanta los servicios
- ¡Todo en un solo comando!

---

## 📋 Inicio manual (3 pasos):

### 1️⃣ Limpiar contenedores antiguos (si es necesario)

```bash
docker-compose down --remove-orphans
```

### 2️⃣ Construir los contenedores

```bash
docker-compose build
```

Este comando:
- Descarga la imagen de PostgreSQL 17
- Construye la imagen del backend con Python 3.11
- Instala todas las dependencias

⏱️ **Tiempo estimado**: 2-5 minutos (primera vez)

---

### 3️⃣ Levantar los servicios

```bash
docker-compose up
```

Esto iniciará:
- ✅ PostgreSQL en puerto **5433** (externo, para evitar conflictos)
- ✅ Backend + Frontend en puerto **8000**
- ✅ Migraciones automáticas
- ✅ Seed de datos (5 perfumes con imágenes reales)

⏱️ **Tiempo estimado**: 10-20 segundos

---

### 4️⃣ Abrir en el navegador

```
http://localhost:8000
```

**¡Listo!** El proyecto está corriendo con:
- Frontend completamente funcional
- API REST en `/api/*`
- PostgreSQL 17 con datos (puerto 5433 externo, 5432 interno)
- Hot-reload activado

---

## 🎯 Comandos útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y limpiar base de datos
docker-compose down -v

# Levantar en background
docker-compose up -d

# Ver documentación de API
# http://localhost:8000/docs
```

---

## 🐛 ¿Problemas?

### ⚠️ "Ports are not available" o "bind: Only one usage..."

**Problema**: Ya tienes PostgreSQL corriendo en el puerto 5432.

**Solución**: Ya está solucionado! El proyecto ahora usa el puerto **5433** externamente.

Si aún tienes problemas:
```bash
# 1. Limpia contenedores antiguos
docker-compose down --remove-orphans

# 2. Si persiste, detén tu PostgreSQL local
# Windows: Servicios → PostgreSQL → Detener
# O cambia el puerto en docker-compose.yml a 5434
```

### Puerto 8000 ocupado

```bash
# Edita docker-compose.yml, cambia la línea:
ports:
  - "8001:8000"  # Usar otro puerto
```

### Base de datos no conecta

```bash
# Espera unos segundos más y reinicia
docker-compose down
docker-compose up
```

### Contenedores huérfanos

```bash
# Usa el flag --remove-orphans
docker-compose down --remove-orphans
docker-compose up
```

### No se ven los cambios

```bash
# Reconstruye sin caché
docker-compose build --no-cache
docker-compose up
```

---

## 📚 Más información

- [README_DOCKER.md](README_DOCKER.md) - Documentación completa
- `http://localhost:8000/docs` - Documentación API interactiva

---

**¡Feliz desarrollo!** 🌸
