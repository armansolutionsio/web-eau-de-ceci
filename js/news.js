/* ========================================
   NEWS.JS - News Page Logic
   ======================================== */

import { formatDate, truncate } from './ui.js';

/**
 * Dummy news articles
 */
const articles = [
  {
    id: 'news-1',
    title: 'Las Tendencias de Perfumería para 2024',
    excerpt: 'Descubre las notas y familias olfativas que dominarán el año. Los perfumes amaderados y las composiciones unisex siguen en auge.',
    content: `
      <p>La perfumería contemporánea está experimentando una revolución. Las tendencias para 2024 muestran un claro movimiento hacia la sostenibilidad y la autenticidad.</p>
      <p>Los perfumes amaderados, especialmente aquellos con cedro y vetiver, continúan dominando el mercado. Las casas de perfumería están apostando por composiciones más naturales y menos sintéticas.</p>
      <p>Las fragancias unisex han dejado de ser una novedad para convertirse en el estándar. Los consumidores buscan expresarse más allá de las categorías tradicionales de género.</p>
      <p>Destacan también las notas de incienso, ámbar y especias orientales, que aportan profundidad y carácter a las nuevas creaciones.</p>
    `,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'assets/placeholder-bottle.svg',
    category: 'Tendencias'
  },
  {
    id: 'news-2',
    title: 'Cómo Elegir el Perfume Perfecto para Cada Estación',
    excerpt: 'Guía completa para seleccionar la fragancia ideal según el clima y la temporada del año.',
    content: `
      <p>Elegir el perfume adecuado para cada estación puede marcar la diferencia en cómo tu fragancia se proyecta y perdura.</p>
      <h3>Primavera</h3>
      <p>Opta por fragancias florales y cítricas. Las notas de jazmín, rosa y bergamota son ideales para esta temporada de renovación.</p>
      <h3>Verano</h3>
      <p>Los perfumes acuáticos y frescos son perfectos. Busca notas de limón, menta y sal marina para combatir el calor.</p>
      <h3>Otoño</h3>
      <p>Las especias y maderas empiezan a brillar. Canela, pachulí y ámbar crean la calidez perfecta para los días más frescos.</p>
      <h3>Invierno</h3>
      <p>Es el momento de los perfumes más intensos. Oud, vainilla, cuero y resinas dominan esta estación.</p>
    `,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'assets/placeholder-bottle.svg',
    category: 'Guías'
  },
  {
    id: 'news-3',
    title: 'El Arte de la Pirámide Olfativa',
    excerpt: 'Entendiendo la estructura de los perfumes: notas de salida, corazón y fondo.',
    content: `
      <p>La pirámide olfativa es la estructura fundamental de cualquier perfume. Comprender cómo funciona te ayudará a elegir y apreciar mejor tus fragancias.</p>
      <h3>Notas de Salida (Top Notes)</h3>
      <p>Son las primeras en percibirse, generalmente cítricas o aromáticas. Duran entre 15 minutos y 2 horas. Crean la primera impresión del perfume.</p>
      <h3>Notas de Corazón (Middle Notes)</h3>
      <p>El corazón del perfume emerge después de las notas de salida. Florales, frutales o especiadas, duran entre 3 y 5 horas y definen el carácter principal.</p>
      <h3>Notas de Fondo (Base Notes)</h3>
      <p>Las más duraderas, pueden permanecer 6 horas o más. Amaderadas, ambaradas o almizcladas, son las que dejan huella memorable.</p>
    `,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'assets/placeholder-bottle.svg',
    category: 'Educación'
  },
  {
    id: 'news-4',
    title: 'Los Ingredientes Más Caros del Mundo de la Perfumería',
    excerpt: 'Desde el oud hasta el iris: descubre qué hace que ciertos perfumes sean tan exclusivos.',
    content: `
      <p>El mundo de la perfumería de lujo está definido por ingredientes raros y costosos que justifican los precios elevados.</p>
      <h3>Oud (Agarwood)</h3>
      <p>También conocido como "oro líquido", el oud puede costar miles de euros por kilogramo. Se forma cuando ciertos árboles son infectados por hongos.</p>
      <h3>Iris</h3>
      <p>La raíz de iris debe envejecer durante 3-5 años antes de ser utilizada. Solo 1-2% de la raíz seca produce aceite esencial.</p>
      <h3>Rosa de Mayo (Grasse)</h3>
      <p>Cultivada en Grasse, Francia, esta rosa requiere ser cosechada a mano al amanecer. Se necesitan toneladas de pétalos para producir un litro de aceite.</p>
      <h3>Ámbar Gris</h3>
      <p>Originalmente encontrado en el océano, este subproducto de los cachalotes es extremadamente raro y valioso.</p>
    `,
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'assets/placeholder-bottle.svg',
    category: 'Ingredientes'
  },
  {
    id: 'news-5',
    title: 'Perfumería Sostenible: El Futuro es Verde',
    excerpt: 'Las marcas están adoptando prácticas eco-friendly sin comprometer la calidad.',
    content: `
      <p>La sostenibilidad ha dejado de ser una tendencia para convertirse en una necesidad en la industria de la perfumería.</p>
      <p>Las casas de perfumería están implementando:</p>
      <ul>
        <li>Ingredientes de origen ético y orgánico</li>
        <li>Envases reciclables y rellenables</li>
        <li>Procesos de producción con huella de carbono neutral</li>
        <li>Eliminación de ingredientes sintéticos controvertidos</li>
        <li>Apoyo a comunidades locales de cultivo</li>
      </ul>
      <p>El consumidor moderno busca lujo consciente, y las marcas están respondiendo con innovación y responsabilidad.</p>
    `,
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'assets/placeholder-bottle.svg',
    category: 'Sostenibilidad'
  }
];

/**
 * Initialize news page
 */
export function initNews() {
  try {
    console.log('[news] initNews: initializing news page');

    renderArticlesList();

    console.log('[news] initNews: news page initialized');
  } catch (error) {
    console.error('[news] initNews: error initializing', error);
  }
}

/**
 * Render articles list
 */
function renderArticlesList() {
  try {
    const container = document.querySelector('#news-container');
    if (!container) return;

    console.log(`[news] renderArticlesList: rendering ${articles.length} articles`);

    container.innerHTML = articles.map(article => `
      <article class="card mb-6" style="overflow: hidden;">
        <div class="grid" style="grid-template-columns: 200px 1fr; gap: 0;">
          <div style="background-color: var(--cec-bg-secondary); display: flex; align-items: center; justify-content: center;">
            <img src="${article.image}" alt="${article.title}" style="width: 120px; height: 120px; object-fit: contain;">
          </div>
          <div style="padding: var(--space-5);">
            <div class="mb-2">
              <span class="badge badge-rose">${article.category}</span>
              <span class="text-muted text-small ml-3">${formatDate(article.date)}</span>
            </div>
            <h3 class="mb-3">
              <a href="#" onclick="window.news.viewArticle('${article.id}'); return false;" style="color: var(--cec-text); text-decoration: none;">
                ${article.title}
              </a>
            </h3>
            <p class="text-muted mb-3">${article.excerpt}</p>
            <button class="btn btn-outline btn-sm" onclick="window.news.viewArticle('${article.id}')">
              Leer más →
            </button>
          </div>
        </div>
      </article>

      <div id="article-content-${article.id}" class="hidden mb-6"></div>
    `).join('');
  } catch (error) {
    console.error('[news] renderArticlesList: error rendering articles', error);
  }
}

/**
 * View full article
 */
export function viewArticle(articleId) {
  try {
    console.log(`[news] viewArticle: viewing article "${articleId}"`);

    const article = articles.find(a => a.id === articleId);
    if (!article) {
      console.warn(`[news] viewArticle: article "${articleId}" not found`);
      return;
    }

    const container = document.querySelector(`#article-content-${articleId}`);
    if (!container) return;

    if (!container.classList.contains('hidden')) {
      container.classList.add('hidden');
      return;
    }

    container.innerHTML = `
      <div class="card" style="padding: var(--space-6);">
        <div class="mb-4">
          <span class="badge badge-rose">${article.category}</span>
          <span class="text-muted text-small ml-3">${formatDate(article.date)}</span>
        </div>
        <h2 class="mb-5">${article.title}</h2>
        <div class="article-content">
          ${article.content}
        </div>
        <div class="mt-6">
          <button class="btn btn-ghost" onclick="window.news.closeArticle('${articleId}')">
            ← Volver a noticias
          </button>
        </div>
      </div>
    `;

    container.classList.remove('hidden');

    // Scroll to article
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    console.error('[news] viewArticle: error viewing article', error);
  }
}

/**
 * Close article
 */
export function closeArticle(articleId) {
  try {
    const container = document.querySelector(`#article-content-${articleId}`);
    if (container) {
      container.classList.add('hidden');
    }
  } catch (error) {
    console.error('[news] closeArticle: error closing article', error);
  }
}

// Expose functions for onclick handlers
window.news = { viewArticle, closeArticle };

console.log('[news] News module loaded');
