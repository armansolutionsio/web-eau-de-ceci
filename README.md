# Eau de Ceci - MVP Estático

**Eau de Ceci** es un sitio web estático de perfumes inspirado en Fragrantica, construido completamente con HTML, CSS y JavaScript vanilla (sin frameworks). Este proyecto representa el primer hito del desarrollo: un MVP totalmente funcional que puede ejecutarse sin servidor ni dependencias externas.

---

## 🎯 Características Principales

- ✅ **Home** con buscador con typeahead y secciones destacadas (Tendencias, Novedades, Más Valorados)
- ✅ **Catálogo** con filtros avanzados (género, estación, notas), ordenamiento y paginación
- ✅ **Ficha de perfume** con pirámide olfativa, características, reseñas y sugerencias
- ✅ **Comunidad** con sistema de posts y comentarios (localStorage)
- ✅ **Noticias** con artículos expandibles
- ✅ **Login mock** (solo UI, sin funcionalidad real)
- ✅ **Diseño responsive** optimizado para mobile, tablet y desktop
- ✅ **Accesibilidad** con ARIA labels, navegación por teclado y contraste adecuado
- ✅ **32 perfumes de ejemplo** con datos completos
- ✅ **Persistencia local** usando localStorage para reseñas, posts y comentarios

---

## 📂 Estructura del Proyecto

```
eau-de-ceci-frontend/
├─ index.html           # Página principal con buscador y destacados
├─ catalog.html         # Catálogo con filtros y paginación
├─ perfume.html         # Detalle de perfume
├─ community.html       # Comunidad (posts y comentarios)
├─ news.html            # Noticias y artículos
├─ login.html           # Mock de login
├─ /css/
│  ├─ base.css          # Reset, variables CSS, tipografía, utilidades
│  ├─ layout.css        # Header, footer, grids, layouts responsivos
│  └─ components.css    # Cards, modales, toasts, filtros, forms
├─ /js/
│  ├─ data.js           # Dataset de 32 perfumes
│  ├─ app.js            # Lógica común, navegación, utilidades
│  ├─ ui.js             # Componentes UI (toast, modal, helpers)
│  ├─ search.js         # Buscador con typeahead
│  ├─ catalog.js        # Filtros, ordenamiento, paginación
│  ├─ perfume.js        # Detalle de perfume, reseñas
│  ├─ community.js      # Posts y comentarios (localStorage)
│  └─ news.js           # Artículos de noticias
├─ /assets/
│  ├─ logo.svg
│  ├─ placeholder-bottle.svg
│  └─ og-image.png
└─ README.md
```

---

## 🚀 Cómo Ejecutar

### Opción 1: Doble clic (más simple)

1. Descarga o clona el proyecto
2. Abre `index.html` directamente en tu navegador
3. ¡Listo! El sitio funciona sin necesidad de servidor

> **Nota:** Algunas funcionalidades de módulos ES6 pueden requerir un servidor local en ciertos navegadores por políticas CORS.

### Opción 2: Servidor local (recomendado)

Si tienes **Node.js** instalado:

```bash
npx serve
```

O con **Python**:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

O con la extensión **Live Server** de VSCode:
- Instala la extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

Luego abre tu navegador en `http://localhost:8000` (o el puerto que elijas).

---

## 🎨 Diseño y Branding

### Paleta de Colores

```css
--cec-bg: #ffffff;           /* Fondo principal */
--cec-text: #1f2937;         /* Texto principal (gris 800) */
--cec-muted: #6b7280;        /* Texto secundario (gris 500) */
--cec-rose: #B56576;         /* Color de marca (rosa oscuro) */
--cec-rose-700: #9f4c60;     /* Rosa oscuro hover */
--cec-border: #e5e7eb;       /* Bordes */
```

### Tipografía

- **Playfair Display** (serif) para títulos
- **Lato** (sans-serif) para texto de cuerpo

Ambas fuentes se cargan desde Google Fonts.

---

## 🧩 Módulos JavaScript

### data.js
- **32 perfumes** con datos completos: marca, nombre, descripción, notas (top/middle/base), género, estación, ratings, etc.
- Funciones auxiliares: `getPerfumeById()`, `getAllNotes()`, `getSuggestions()`

### app.js
- Inicialización global
- Navegación activa
- Menú mobile
- Helpers: `getQueryParam()`, `setQueryParam()`, `navigateTo()`, `formatNumber()`

### ui.js
- Sistema de **toasts** (notificaciones)
- Gestión de **modales**
- Helpers: `formatStars()`, `formatDate()`, `debounce()`, `scrollToElement()`, etc.

### search.js
- **Typeahead** inteligente con sugerencias en tiempo real
- Búsqueda por marca, nombre y notas
- Navegación por teclado (flechas, Enter, Escape)

### catalog.js
- Filtros: texto, género, estación, notas
- Ordenamiento: popularidad, rating, más nuevos, nombre
- Paginación client-side (12 items por página)
- Estado en URL hash para navegación con back/forward

### perfume.js
- Renderizado de detalle completo
- Pirámide olfativa visual
- Características (longevidad, sillage, acuerdos)
- Sistema de reseñas con localStorage
- Sugerencias basadas en notas similares
- Schema.org structured data para SEO

### community.js
- CRUD de posts (crear, leer, eliminar)
- Comentarios por post
- Persistencia en localStorage
- Datos dummy incluidos

### news.js
- 5 artículos de ejemplo
- Vista expandible por artículo
- Categorías y fechas

---

## 📱 Responsive Design

El sitio está optimizado para:
- **Mobile**: 360px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

Breakpoints principales en CSS:
```css
@media (max-width: 480px)  { /* Mobile pequeño */ }
@media (max-width: 640px)  { /* Mobile */ }
@media (max-width: 768px)  { /* Tablet */ }
@media (max-width: 1024px) { /* Tablet grande */ }
```

---

## ♿ Accesibilidad

- ✅ Etiquetas ARIA (`aria-label`, `aria-live`, `aria-expanded`)
- ✅ Navegación por teclado (Tab, Enter, Escape)
- ✅ `:focus-visible` para indicadores de foco
- ✅ Contraste de color WCAG AA
- ✅ Textos alternativos en imágenes
- ✅ Títulos jerárquicos (`h1` único por página)
- ✅ Roles semánticos (`role="alert"`, `role="listbox"`)

---

## 🔍 SEO

- ✅ Meta tags descriptivos
- ✅ Open Graph para redes sociales
- ✅ Schema.org (Product + AggregateRating) en fichas de perfume
- ✅ Títulos únicos por página
- ✅ URLs amigables con query params
- ✅ Estructura semántica HTML5

---

## 💾 Persistencia (localStorage)

El sitio usa `localStorage` para:
- **Reseñas de perfumes**: `reviews:<perfumeId>`
- **Posts de comunidad**: `posts`
- **Comentarios**: `comments:<postId>`

Para resetear los datos:
```javascript
localStorage.clear()
```

---

## 🔧 Extensiones Futuras

Este MVP está diseñado para ser fácilmente extensible:

### Backend (Python/FastAPI + PostgreSQL)
- API REST para perfumes, usuarios, reseñas
- Autenticación JWT
- Base de datos relacional

### Imágenes (Cloudinary)
- Upload y optimización de imágenes
- CDN para mejor performance

### Features Adicionales
- Sistema de favoritos
- Comparador de perfumes
- Recomendaciones con ML
- Sistema de puntos y gamificación
- Integración con redes sociales
- Newsletter

---

## 📊 Performance

El sitio está optimizado para:
- **Sin dependencias externas** (excepto Google Fonts)
- **Carga rápida** (HTML/CSS/JS vanilla)
- **Lazy loading** de imágenes
- **Debounce** en búsquedas
- **CSS optimizado** con variables
- Target: **Lighthouse 90+** en Performance y Best Practices

---

## 🐛 Logging y Debugging

Todos los módulos incluyen logs en consola:
```javascript
console.log('[moduleName] Action: details')
console.warn('[moduleName] Warning: details')
console.error('[moduleName] Error: details')
```

Para ver los logs:
1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Filtra por `[data]`, `[search]`, `[catalog]`, etc.

---

## 📋 Checklist de Funcionalidades

### ✅ Completadas
- [x] Home con buscador typeahead
- [x] Catálogo con filtros y paginación
- [x] Ficha de perfume con reseñas
- [x] Comunidad con posts y comentarios
- [x] Noticias con artículos
- [x] Login mock (solo UI)
- [x] Diseño responsive
- [x] Accesibilidad básica
- [x] 32 perfumes de datos
- [x] Sistema de toasts
- [x] Modales
- [x] Persistencia localStorage

### 🔜 Pendientes (Futuro)
- [ ] Integración con backend API
- [ ] Autenticación real
- [ ] Sistema de favoritos
- [ ] Comparador de perfumes
- [ ] Subida de imágenes
- [ ] Sistema de usuarios
- [ ] Admin panel
- [ ] Tests automatizados
- [ ] PWA (Progressive Web App)
- [ ] Dark mode

---

## 👨‍💻 Tecnologías Utilizadas

- **HTML5** (semántico)
- **CSS3** (variables, grid, flexbox)
- **JavaScript ES6+** (módulos, async/await, destructuring)
- **localStorage** (persistencia)
- **Google Fonts** (Playfair Display, Lato)

**Sin frameworks, sin bundlers, sin dependencias npm** ✨

---

## 📖 Atajos Rápidos

| Página | URL | Descripción |
|--------|-----|-------------|
| Home | `index.html` | Página principal con buscador |
| Catálogo | `catalog.html` | Listado completo con filtros |
| Detalle | `perfume.html?id=p001` | Ficha de perfume específico |
| Comunidad | `community.html` | Posts y discusiones |
| Noticias | `news.html` | Artículos y guías |
| Login | `login.html` | Mock de autenticación |

---

## 📄 Licencia

Este proyecto es un MVP demostrativo para fines educativos.

---

## 🙋 Soporte

Para preguntas o sugerencias sobre este MVP, consulta el código fuente o abre un issue en el repositorio.

**¡Disfruta explorando Eau de Ceci!** 🌸✨
