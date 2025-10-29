# 🚀 Deploy en Render - Guía Completa

## 📋 Información de tu PostgreSQL existente

- **Database**: `arman_travel`
- **URL**: `postgresql://arman_user:dwNYglIlqrPrXEWwto4mA98pfHOJxBO7@dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com/arman_travel`
- **Region**: Oregon

---

## 🔧 Opción 1: Deploy Automático (Recomendado)

### Paso 1: Sube el código a GitHub

```bash
# Si aún no tienes un repositorio Git
git init
git add .
git commit -m "Initial commit - Eau de Ceci"

# Crea un repositorio en GitHub y súbelo
git remote add origin https://github.com/TU-USUARIO/eau-de-ceci.git
git push -u origin main
```

### Paso 2: Crear Web Service en Render

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configura:

| Campo | Valor |
|-------|-------|
| **Name** | `eau-de-ceci-api` |
| **Region** | Oregon (mismo que tu DB) |
| **Branch** | `main` |
| **Root Directory** | (dejar vacío) |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r backend/requirements.txt` |
| **Start Command** | `cd backend && alembic upgrade head && python seed_db.py && uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

### Paso 3: Variables de Entorno

En la sección **Environment**, agrega:

```env
DATABASE_URL=postgresql://arman_user:dwNYglIlqrPrXEWwto4mA98pfHOJxBO7@dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com/arman_travel

PYTHON_VERSION=3.11.0
DEBUG=false
APP_NAME=Eau de Ceci API
CORS_ORIGINS=["*"]
```

### Paso 4: Deploy

1. Click en **"Create Web Service"**
2. Render automáticamente:
   - ✅ Instalará las dependencias
   - ✅ Ejecutará las migraciones
   - ✅ Hará seed de datos (solo si la tabla está vacía)
   - ✅ Iniciará el servidor

⏱️ **Tiempo estimado**: 3-5 minutos

---

## 🔧 Opción 2: Deploy Manual (usando Dockerfile)

Si prefieres usar Docker en Render:

### Paso 1: Configuración del Web Service

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio
4. Configura:

| Campo | Valor |
|-------|-------|
| **Name** | `eau-de-ceci-api` |
| **Region** | Oregon |
| **Environment** | Docker |
| **Dockerfile Path** | `Dockerfile` |

### Paso 2: Variables de Entorno

```env
DATABASE_URL=postgresql://arman_user:dwNYglIlqrPrXEWwto4mA98pfHOJxBO7@dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com/arman_travel
```

---

## ✅ Verificar que Funcionó

Después del deploy, tu API estará disponible en:
```
https://eau-de-ceci-api.onrender.com
```

### Probar los endpoints:

```bash
# Health check
curl https://eau-de-ceci-api.onrender.com/api/health

# Listar perfumes
curl https://eau-de-ceci-api.onrender.com/api/perfumes

# Documentación interactiva
# Abre en el navegador:
https://eau-de-ceci-api.onrender.com/docs
```

---

## 🔄 Auto-Deploy

Render automáticamente hará deploy cuando:
- ✅ Hagas `git push` a la rama `main`
- ✅ Los cambios se detecten en GitHub
- ✅ El build sea exitoso

---

## 📁 Servir el Frontend

### Opción A: Desde el mismo servicio (FastAPI sirve estáticos)

Ya está configurado! FastAPI sirve los archivos HTML/CSS/JS automáticamente desde la raíz.

Tu sitio estará en:
```
https://eau-de-ceci-api.onrender.com/
```

### Opción B: Static Site separado (mejor performance)

1. Crea un nuevo **Static Site** en Render
2. Configura:
   - **Build Command**: `echo "No build needed"`
   - **Publish Directory**: `.`
3. En tu frontend, actualiza `js/config.js`:

```javascript
export const API_BASE_URL = 'https://eau-de-ceci-api.onrender.com';
```

---

## 🛠️ Comandos Útiles para Mantenimiento

### Ver logs en tiempo real

```bash
# Desde el Dashboard de Render:
# Services → eau-de-ceci-api → Logs
```

### Reiniciar el servicio

```bash
# Dashboard → Services → eau-de-ceci-api → Manual Deploy → Deploy latest commit
```

### Ejecutar migraciones manualmente

Si necesitas ejecutar migraciones sin redesplegar:

```bash
# Desde el Shell de Render:
# Dashboard → Services → eau-de-ceci-api → Shell

cd backend
alembic upgrade head
```

---

## 🔐 Configuración de CORS para Producción

Una vez tengas tu dominio, actualiza CORS:

```env
# En Render Environment Variables
CORS_ORIGINS=["https://tu-dominio.com", "https://www.tu-dominio.com"]
```

---

## 📊 Monitoreo

Render provee:
- ✅ Logs en tiempo real
- ✅ Métricas de CPU/Memoria
- ✅ Health checks automáticos
- ✅ Notificaciones de deploy

Configura notificaciones:
1. Dashboard → Settings → Notifications
2. Agrega tu email para alertas

---

## 🐛 Troubleshooting

### Error: "Module not found"

**Solución**: Verifica que `requirements.txt` esté en `backend/`

```bash
# Build command correcto:
pip install -r backend/requirements.txt
```

### Error: "Address already in use"

**Solución**: Render usa la variable `$PORT`. Asegúrate de usar:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Error: "Connection refused" (Database)

**Solución**:
1. Verifica que la URL de DB sea correcta
2. Asegúrate de que el Web Service esté en la misma región (Oregon)
3. Render PostgreSQL requiere SSL, usa `?sslmode=require` si es necesario

### Error: "Health check failed"

**Solución**: Verifica que el endpoint `/api/health` esté funcionando:

```bash
curl https://tu-app.onrender.com/api/health
```

Si falla, revisa los logs del servicio.

### Deploy muy lento

**Solución**: El plan Free de Render hiberna después de 15 min de inactividad.
- Primera request después de hibernación: ~30-60 segundos
- Requests subsecuentes: rápidas
- Para evitar hibernación: Upgrade a plan Starter ($7/mes)

---

## 🎯 Checklist de Deploy

- [ ] Código subido a GitHub
- [ ] Web Service creado en Render
- [ ] Variables de entorno configuradas (DATABASE_URL)
- [ ] Build command configurado
- [ ] Start command configurado
- [ ] Deploy exitoso (sin errores)
- [ ] Health check pasa: `/api/health`
- [ ] Perfumes visibles: `/api/perfumes`
- [ ] Documentación funciona: `/docs`
- [ ] Frontend carga correctamente
- [ ] CORS configurado para tu dominio

---

## 🚀 Próximos Pasos

1. **Custom Domain**:
   - Dashboard → Settings → Custom Domain
   - Agrega tu dominio y configura DNS

2. **SSL/HTTPS**:
   - Render provee SSL gratis automáticamente

3. **Backups**:
   - PostgreSQL en Render hace backups automáticos
   - Dashboard → Database → Backups

4. **Escalado**:
   - Upgrade a plan Starter para evitar hibernación
   - Upgrade a Pro para múltiples instancias

---

**¡Tu aplicación está lista para producción!** 🎉

URL de ejemplo: `https://eau-de-ceci-api.onrender.com`

Para soporte: [Render Documentation](https://render.com/docs)
