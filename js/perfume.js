/* ========================================
   PERFUME.JS - Perfume Detail Page
   ======================================== */

import { getPerfumeById, getSuggestions } from './data-loader.js';
import { getQueryParam, formatNumber } from './app.js';
import { formatStars, toast, formatDate, getInitials } from './ui.js';
import { renderPerfumeActions } from './perfume-actions.js';

/**
 * Initialize perfume detail page
 */
export function initPerfumeDetail() {
  try {
    console.log('[perfume] initPerfumeDetail: initializing detail page');

    const perfumeId = getQueryParam('id');

    if (!perfumeId) {
      console.warn('[perfume] initPerfumeDetail: no perfume ID provided');
      showError('No se especificó un perfume');
      return;
    }

    const perfume = getPerfumeById(perfumeId);

    if (!perfume) {
      console.warn(`[perfume] initPerfumeDetail: perfume "${perfumeId}" not found`);
      showError('Perfume no encontrado');
      return;
    }

    renderPerfumeDetail(perfume);
    renderNotesPyramid(perfume);
    renderCharacteristics(perfume);
    renderReviews(perfume.id);
    renderSuggestions(perfume.id);
    initReviewForm(perfume.id);

    console.log('[perfume] initPerfumeDetail: detail page initialized');
  } catch (error) {
    console.error('[perfume] initPerfumeDetail: error initializing', error);
    showError('Error al cargar el perfume');
  }
}

/**
 * Render perfume detail
 */
function renderPerfumeDetail(perfume) {
  try {
    console.log(`[perfume] renderPerfumeDetail: rendering "${perfume.name}"`);

    // Update page title
    document.title = `${perfume.brand} - ${perfume.name} | Eau de Ceci`;

    // Render main info
    const container = document.querySelector('#perfume-detail');
    if (!container) return;

    container.innerHTML = `
      <div class="detail-layout">
        <div class="detail-image">
          <img src="${perfume.image}" alt="${perfume.brand} - ${perfume.name}">
        </div>
        <div class="detail-info">
          <div class="perfume-card-brand">${perfume.brand}</div>
          <h1 class="hero-title">${perfume.name}</h1>

          <div class="perfume-card-rating mb-4">
            ${formatStars(perfume.ratingAvg, 5)}
            <span class="rating-count">${perfume.ratingAvg.toFixed(1)} (${formatNumber(perfume.votes)} valoraciones)</span>
          </div>

          <div class="mb-6">
            <span class="badge badge-rose">${translateGender(perfume.gender)}</span>
            <span class="badge badge-gray">${perfume.releaseYear}</span>
            ${perfume.season.map(s => `<span class="badge badge-gray">${translateSeason(s)}</span>`).join('')}
          </div>

          <p class="text-muted mb-6">${perfume.description}</p>

          ${renderPerfumeActions(perfume.id)}

          <div class="mb-6" id="notes-pyramid"></div>
          <div class="mb-6" id="characteristics"></div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="section-title">Reseñas</h2>
        <div id="reviews-container"></div>
        <div class="mt-6" id="review-form-container"></div>
      </div>

      <div class="mt-10">
        <h2 class="section-title">Te podría gustar</h2>
        <div id="suggestions-container" class="catalog-grid"></div>
      </div>
    `;

    // Schema.org structured data for SEO
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": perfume.name,
      "brand": {
        "@type": "Brand",
        "name": perfume.brand
      },
      "description": perfume.description,
      "image": perfume.image,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": perfume.ratingAvg,
        "reviewCount": perfume.votes
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

  } catch (error) {
    console.error('[perfume] renderPerfumeDetail: error rendering', error);
  }
}

/**
 * Render notes pyramid
 */
function renderNotesPyramid(perfume) {
  const container = document.querySelector('#notes-pyramid');
  if (!container) return;

  container.innerHTML = `
    <div class="notes-pyramid">
      <div class="notes-layer">
        <div class="notes-layer-title">
          <span class="notes-layer-icon">▴</span> Notas de Salida
        </div>
        <div class="notes-list">
          ${perfume.notesTop.map(note => `<span class="note-tag">${note}</span>`).join('')}
        </div>
      </div>
      <div class="notes-layer">
        <div class="notes-layer-title">
          <span class="notes-layer-icon">♦</span> Notas de Corazón
        </div>
        <div class="notes-list">
          ${perfume.notesMiddle.map(note => `<span class="note-tag">${note}</span>`).join('')}
        </div>
      </div>
      <div class="notes-layer">
        <div class="notes-layer-title">
          <span class="notes-layer-icon">▾</span> Notas de Fondo
        </div>
        <div class="notes-list">
          ${perfume.notesBase.map(note => `<span class="note-tag">${note}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render characteristics (longevity, sillage, accords)
 */
function renderCharacteristics(perfume) {
  const container = document.querySelector('#characteristics');
  if (!container) return;

  container.innerHTML = `
    <h3 class="mb-4">Características</h3>

    <div class="progress-bar-container">
      <div class="progress-bar-label">
        <span class="progress-bar-name">Longevidad</span>
        <span class="progress-bar-value">${perfume.longevity}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${perfume.longevity}%"></div>
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar-label">
        <span class="progress-bar-name">Estela (Sillage)</span>
        <span class="progress-bar-value">${perfume.sillage}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${perfume.sillage}%"></div>
      </div>
    </div>

    <div class="mt-4">
      <h4 class="mb-3">Acuerdos Dominantes</h4>
      <div class="flex flex-wrap gap-2">
        ${perfume.accords.map(accord => `<span class="chip">${accord}</span>`).join('')}
      </div>
    </div>
  `;
}

/**
 * Render reviews
 */
function renderReviews(perfumeId) {
  try {
    const container = document.querySelector('#reviews-container');
    if (!container) return;

    const reviews = getReviews(perfumeId);
    console.log(`[perfume] renderReviews: rendering ${reviews.length} reviews`);

    if (reviews.length === 0) {
      container.innerHTML = '<p class="text-muted">Aún no hay reseñas. ¡Sé el primero en escribir una!</p>';
      return;
    }

    container.innerHTML = reviews.map(review => `
      <div class="review-card">
        <div class="review-header">
          <div class="review-author">
            <div class="review-avatar">${getInitials(review.author)}</div>
            <div class="review-author-info">
              <div class="review-author-name">${review.author}</div>
              <div class="review-date">${formatDate(review.date)}</div>
            </div>
          </div>
          ${formatStars(review.rating, 5)}
        </div>
        <div class="review-content">${review.comment}</div>
      </div>
    `).join('');
  } catch (error) {
    console.error('[perfume] renderReviews: error rendering reviews', error);
  }
}

/**
 * Get reviews from localStorage
 */
function getReviews(perfumeId) {
  try {
    const key = `reviews:${perfumeId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('[perfume] getReviews: error reading reviews', error);
    return [];
  }
}

/**
 * Save review to localStorage
 */
function saveReview(perfumeId, review) {
  try {
    const reviews = getReviews(perfumeId);
    reviews.unshift(review);
    const key = `reviews:${perfumeId}`;
    localStorage.setItem(key, JSON.stringify(reviews));
    console.log(`[perfume] saveReview: review saved for perfume "${perfumeId}"`);
    return true;
  } catch (error) {
    console.error('[perfume] saveReview: error saving review', error);
    return false;
  }
}

/**
 * Initialize review form
 */
function initReviewForm(perfumeId) {
  const container = document.querySelector('#review-form-container');
  if (!container) return;

  container.innerHTML = `
    <div class="card" style="padding: var(--space-6);">
      <h3 class="mb-4">Escribe tu reseña</h3>
      <form id="review-form">
        <div class="form-group">
          <label class="form-label" for="review-author">Nombre</label>
          <input type="text" id="review-author" class="form-input" required placeholder="Tu nombre">
        </div>
        <div class="form-group">
          <label class="form-label" for="review-rating">Calificación</label>
          <select id="review-rating" class="form-select" required>
            <option value="">Selecciona una calificación</option>
            <option value="5">5 estrellas - Excelente</option>
            <option value="4">4 estrellas - Muy bueno</option>
            <option value="3">3 estrellas - Bueno</option>
            <option value="2">2 estrellas - Regular</option>
            <option value="1">1 estrella - Malo</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="review-comment">Comentario</label>
          <textarea id="review-comment" class="form-textarea" required placeholder="Cuéntanos tu experiencia con este perfume..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Publicar reseña</button>
      </form>
    </div>
  `;

  const form = document.querySelector('#review-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleReviewSubmit(perfumeId);
  });
}

/**
 * Handle review form submission
 */
function handleReviewSubmit(perfumeId) {
  try {
    const author = document.querySelector('#review-author').value.trim();
    const rating = parseInt(document.querySelector('#review-rating').value);
    const comment = document.querySelector('#review-comment').value.trim();

    if (!author || !rating || !comment) {
      toast('Por favor completa todos los campos', 'error');
      return;
    }

    const review = {
      author,
      rating,
      comment,
      date: new Date().toISOString()
    };

    if (saveReview(perfumeId, review)) {
      toast('¡Reseña publicada con éxito!', 'success');
      renderReviews(perfumeId);
      document.querySelector('#review-form').reset();
    } else {
      toast('Error al guardar la reseña', 'error');
    }
  } catch (error) {
    console.error('[perfume] handleReviewSubmit: error submitting review', error);
    toast('Error al publicar la reseña', 'error');
  }
}

/**
 * Render suggested perfumes
 */
function renderSuggestions(perfumeId) {
  const container = document.querySelector('#suggestions-container');
  if (!container) return;

  const suggestions = getSuggestions(perfumeId, 6);
  console.log(`[perfume] renderSuggestions: rendering ${suggestions.length} suggestions`);

  container.innerHTML = suggestions.map(perfume => `
    <a href="/perfume?id=${perfume.id}" class="perfume-card">
      <div class="perfume-card-image">
        <img src="${perfume.image}" alt="${perfume.name}">
      </div>
      <div class="perfume-card-body">
        <div class="perfume-card-brand">${perfume.brand}</div>
        <h3 class="perfume-card-title">${perfume.name}</h3>
        <div class="perfume-card-rating">
          ${formatStars(perfume.ratingAvg)}
          <span class="rating-count">(${formatNumber(perfume.votes)})</span>
        </div>
        <div class="perfume-card-notes">
          ${perfume.notesTop.slice(0, 3).map(note => `<span class="note-chip">${note}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

/**
 * Show error message
 */
function showError(message) {
  const container = document.querySelector('#perfume-detail');
  if (container) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h2 class="empty-state-title">${message}</h2>
        <p class="empty-state-text">
          <a href="/catalog" class="btn btn-primary">Ver catálogo</a>
        </p>
      </div>
    `;
  }
}

/**
 * Translation helpers
 */
function translateGender(gender) {
  const map = { male: 'Masculino', female: 'Femenino', unisex: 'Unisex' };
  return map[gender] || gender;
}

function translateSeason(season) {
  const map = { spring: 'Primavera', summer: 'Verano', fall: 'Otoño', winter: 'Invierno' };
  return map[season] || season;
}

console.log('[perfume] Perfume module loaded');
