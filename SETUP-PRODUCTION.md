# 🚀 Setup de Producción - Render PostgreSQL

Esta guía te ayudará a configurar la base de datos de **producción** en Render PostgreSQL.

---

## 📋 Información de tu Base de Datos

- **Host**: `dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com`
- **Database**: `arman_travel`
- **User**: `arman_user`
- **Port**: 5432 (default PostgreSQL)
- **SSL**: Requerido (Render usa SSL por defecto)

---

## 🔧 Pasos para Configurar Producción

### Paso 1: Instalar dependencias de Python (si no las tienes)

```bash
# Navega a la carpeta backend
cd backend

# Instala las dependencias
pip install -r requirements.txt
```

### Paso 2: Ejecutar Migraciones en Producción

Este comando creará la tabla `perfumes` en tu base de datos de Render:

```bash
# Vuelve a la raíz del proyecto
cd ..

# Ejecuta las migraciones
migrate-production.bat
```

Esto ejecutará:
- ✅ `alembic upgrade head` contra la DB de producción
- ✅ Creará la tabla `perfumes` con todos los campos
- ✅ Creará los índices necesarios

### Paso 3: Agregar Datos Iniciales (Seed)

```bash
seed-production.bat
```

Esto agregará:
- ✅ 5 perfumes con imágenes reales
- ✅ Todos los datos completos (notas, ratings, etc.)

---

## 🗄️ Tabla que se creará: `perfumes`

```sql
CREATE TABLE perfumes (
    id VARCHAR PRIMARY KEY,
    brand VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR NOT NULL,
    rating_avg FLOAT DEFAULT 0.0,
    votes INTEGER DEFAULT 0,
    notes_top VARCHAR[],      -- Array de notas de salida
    notes_middle VARCHAR[],   -- Array de notas de corazón
    notes_base VARCHAR[],     -- Array de notas de fondo
    gender VARCHAR NOT NULL,
    season VARCHAR[],         -- Array de estaciones
    popularity_score INTEGER DEFAULT 0,
    release_year INTEGER NOT NULL,
    longevity INTEGER DEFAULT 50,
    sillage INTEGER DEFAULT 50,
    accords VARCHAR[],        -- Array de acuerdos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Índices para búsquedas rápidas
CREATE INDEX ix_perfumes_id ON perfumes(id);
CREATE INDEX ix_perfumes_brand ON perfumes(brand);
CREATE INDEX ix_perfumes_name ON perfumes(name);
```

---

## ✅ Verificar que funcionó

### Opción 1: Usando psql (línea de comandos)

```bash
# Conéctate a la base de datos
psql postgresql://arman_user:dwNYglIlqrPrXEWwto4mA98pfHOJxBO7@dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com/arman_travel

# Verifica que la tabla existe
\dt

# Ver los perfumes
SELECT id, brand, name FROM perfumes;

# Contar perfumes
SELECT COUNT(*) FROM perfumes;

# Salir
\q
```

### Opción 2: Usando pgAdmin o DBeaver

1. Crea una nueva conexión con estos datos:
   - Host: `dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com`
   - Port: `5432`
   - Database: `arman_travel`
   - User: `arman_user`
   - Password: `dwNYglIlqrPrXEWwto4mA98pfHOJxBO7`
   - SSL Mode: `require`

2. Navega a Tables → perfumes
3. Verifica que los datos están ahí

---

## 🔄 Flujo de Trabajo: Desarrollo → Producción

### Desarrollo Local (Docker)

```bash
# 1. Trabaja localmente con Docker
docker-compose up

# 2. Haz cambios en los modelos (backend/app/models/)

# 3. Crea una nueva migración
docker-compose exec backend alembic revision --autogenerate -m "descripción"

# 4. Aplica la migración localmente
docker-compose exec backend alembic upgrade head
```

### Aplicar Cambios a Producción

```bash
# 1. Asegúrate de que los cambios funcionan localmente

# 2. Ejecuta la migración en producción
migrate-production.bat

# 3. Verifica que funcionó
# (Conéctate con psql o pgAdmin)
```

---

## 🛠️ Comandos Útiles

### Ver el estado actual de las migraciones (Producción)

```bash
cd backend
alembic -c alembic.production.ini current
```

### Ver el historial de migraciones

```bash
cd backend
alembic -c alembic.production.ini history
```

### Rollback (deshacer última migración)

```bash
cd backend
alembic -c alembic.production.ini downgrade -1
```

### Limpiar datos de producción (⚠️ CUIDADO)

```bash
# Conéctate a la DB
psql postgresql://arman_user:...@dpg-...oregon-postgres.render.com/arman_travel

# Elimina todos los perfumes
DELETE FROM perfumes;

# O elimina la tabla completa
DROP TABLE perfumes CASCADE;

# Luego vuelve a ejecutar las migraciones
```

---

## 🔐 Seguridad

### ⚠️ IMPORTANTE: No commitees las credenciales

Los archivos con credenciales están en `.gitignore`:
- `backend/.env.production`
- `backend/alembic.production.ini`
- `seed-production.py`

**NO** los agregues a Git si vas a hacer un repositorio público.

### Para producción real, usa variables de entorno

En Render, configura estas variables:

```env
DATABASE_URL=postgresql://arman_user:...@dpg-...
APP_NAME=Eau de Ceci API
DEBUG=false
```

---

## 🐛 Troubleshooting

### Error: "relation 'perfumes' does not exist"

**Solución**: Ejecuta las migraciones primero
```bash
migrate-production.bat
```

### Error: "password authentication failed"

**Solución**: Verifica que la contraseña sea correcta. Render puede regenerarla.
1. Ve a tu Dashboard de Render
2. PostgreSQL → Connections
3. Copia la nueva URL de conexión
4. Actualiza `backend/.env.production` y `backend/alembic.production.ini`

### Error: "SSL connection required"

**Solución**: Render requiere SSL. Agrega `?sslmode=require` al final de la URL:
```
postgresql://user:pass@host:port/db?sslmode=require
```

### Error: "too many connections"

**Solución**: Render tiene límites de conexiones en el plan free.
- Cierra conexiones viejas
- Usa connection pooling (ya configurado en SQLAlchemy)

---

## 📊 Próximos Pasos

Después de configurar la base de datos:

1. ✅ **Deploy del Backend**: Sube el código a Render como Web Service
2. ✅ **Variables de Entorno**: Configura `DATABASE_URL` en Render
3. ✅ **Build Command**: `pip install -r requirements.txt`
4. ✅ **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. ✅ **Auto-Deploy**: Configura GitHub para deploy automático

---

## ✅ Checklist

- [ ] Instalé las dependencias (`pip install -r backend/requirements.txt`)
- [ ] Ejecuté `migrate-production.bat` exitosamente
- [ ] Ejecuté `seed-production.bat` (opcional)
- [ ] Verifiqué que la tabla `perfumes` existe
- [ ] Verifiqué que los datos están en la tabla
- [ ] La aplicación local puede conectarse a producción (opcional)

---

**¡Listo para producción!** 🎉

Tu base de datos en Render ahora tiene:
- ✅ Tabla `perfumes` creada
- ✅ Índices optimizados
- ✅ 5 perfumes de ejemplo (si ejecutaste el seed)
- ✅ Migraciones versionadas con Alembic

Para dudas o problemas, revisa la sección de Troubleshooting.
