/* ========================================
   CATALOG.JS - Catalog Page Logic
   ======================================== */

import { perfumes, getAllNotes } from './data.js';
import { getHashParams, setHashParams, formatNumber } from './app.js';
import { formatStars, showLoading, showEmptyState } from './ui.js';

let currentFilters = {
  query: '',
  gender: [],
  season: [],
  notes: [],
  sort: 'popularity'
};

let currentPage = 1;
const itemsPerPage = 12;

/**
 * Initialize catalog page
 */
export function initCatalog() {
  try {
    console.log('[catalog] initCatalog: initializing catalog');

    // Load filters from hash
    loadFiltersFromHash();

    // Initialize filter controls
    initFilterControls();

    // Initialize sorting
    initSorting();

    // Initial render
    applyFiltersAndRender();

    // Listen for hash changes (back/forward navigation)
    window.addEventListener('hashchange', () => {
      loadFiltersFromHash();
      applyFiltersAndRender();
    });

    console.log('[catalog] initCatalog: catalog initialized');
  } catch (error) {
    console.error('[catalog] initCatalog: error initializing catalog', error);
  }
}

/**
 * Load filters from URL hash
 */
function loadFiltersFromHash() {
  try {
    const params = getHashParams();
    console.log('[catalog] loadFiltersFromHash: loading from hash', params);

    currentFilters.query = params.q || '';
    currentFilters.gender = params.gender ? params.gender.split(',') : [];
    currentFilters.season = params.season ? params.season.split(',') : [];
    currentFilters.notes = params.notes ? params.notes.split(',') : [];
    currentFilters.sort = params.sort || 'popularity';
    currentPage = parseInt(params.page) || 1;

    // Update UI to reflect loaded filters
    updateFilterUI();

    console.log('[catalog] loadFiltersFromHash: filters loaded', currentFilters);
  } catch (error) {
    console.error('[catalog] loadFiltersFromHash: error loading filters', error);
  }
}

/**
 * Save filters to URL hash
 */
function saveFiltersToHash() {
  try {
    const params = {
      q: currentFilters.query || undefined,
      gender: currentFilters.gender.length ? currentFilters.gender.join(',') : undefined,
      season: currentFilters.season.length ? currentFilters.season.join(',') : undefined,
      notes: currentFilters.notes.length ? currentFilters.notes.join(',') : undefined,
      sort: currentFilters.sort !== 'popularity' ? currentFilters.sort : undefined,
      page: currentPage > 1 ? currentPage : undefined
    };

    setHashParams(params);
    console.log('[catalog] saveFiltersToHash: filters saved to hash');
  } catch (error) {
    console.error('[catalog] saveFiltersToHash: error saving filters', error);
  }
}

/**
 * Initialize filter controls
 */
function initFilterControls() {
  try {
    // Text search
    const searchInput = document.querySelector('#catalog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentFilters.query = e.target.value.trim();
        currentPage = 1;
        applyFiltersAndRender();
      });
    }

    // Gender filters
    document.querySelectorAll('input[name="gender"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const value = checkbox.value;
        if (checkbox.checked) {
          currentFilters.gender.push(value);
        } else {
          currentFilters.gender = currentFilters.gender.filter(g => g !== value);
        }
        currentPage = 1;
        applyFiltersAndRender();
      });
    });

    // Season filters
    document.querySelectorAll('input[name="season"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const value = checkbox.value;
        if (checkbox.checked) {
          currentFilters.season.push(value);
        } else {
          currentFilters.season = currentFilters.season.filter(s => s !== value);
        }
        currentPage = 1;
        applyFiltersAndRender();
      });
    });

    // Notes filters
    document.querySelectorAll('input[name="notes"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const value = checkbox.value;
        if (checkbox.checked) {
          currentFilters.notes.push(value);
        } else {
          currentFilters.notes = currentFilters.notes.filter(n => n !== value);
        }
        currentPage = 1;
        applyFiltersAndRender();
      });
    });

    // Clear filters
    const clearBtn = document.querySelector('#clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearFilters);
    }

    console.log('[catalog] initFilterControls: filter controls initialized');
  } catch (error) {
    console.error('[catalog] initFilterControls: error initializing filters', error);
  }
}

/**
 * Initialize sorting controls
 */
function initSorting() {
  try {
    const sortSelect = document.querySelector('#sort-select');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', (e) => {
      currentFilters.sort = e.target.value;
      currentPage = 1;
      applyFiltersAndRender();
    });

    console.log('[catalog] initSorting: sorting initialized');
  } catch (error) {
    console.error('[catalog] initSorting: error initializing sorting', error);
  }
}

/**
 * Update filter UI to reflect current filters
 */
function updateFilterUI() {
  try {
    // Update search input
    const searchInput = document.querySelector('#catalog-search');
    if (searchInput) {
      searchInput.value = currentFilters.query;
    }

    // Update checkboxes
    document.querySelectorAll('input[name="gender"]').forEach(checkbox => {
      checkbox.checked = currentFilters.gender.includes(checkbox.value);
    });

    document.querySelectorAll('input[name="season"]').forEach(checkbox => {
      checkbox.checked = currentFilters.season.includes(checkbox.value);
    });

    document.querySelectorAll('input[name="notes"]').forEach(checkbox => {
      checkbox.checked = currentFilters.notes.includes(checkbox.value);
    });

    // Update sort select
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) {
      sortSelect.value = currentFilters.sort;
    }

    console.log('[catalog] updateFilterUI: UI updated');
  } catch (error) {
    console.error('[catalog] updateFilterUI: error updating UI', error);
  }
}

/**
 * Apply filters and render results
 */
function applyFiltersAndRender() {
  try {
    console.log('[catalog] applyFiltersAndRender: applying filters', currentFilters);

    const container = document.querySelector('#catalog-results');
    if (!container) return;

    showLoading(container);

    // Filter perfumes
    let filtered = filterPerfumes(perfumes, currentFilters);

    // Sort perfumes
    filtered = sortPerfumes(filtered, currentFilters.sort);

    // Update results count
    updateResultsCount(filtered.length);

    // Paginate
    const paginated = paginateResults(filtered, currentPage, itemsPerPage);

    // Render
    setTimeout(() => {
      if (filtered.length === 0) {
        showEmptyState(container, 'No se encontraron perfumes con los filtros seleccionados', '🔍');
      } else {
        renderPerfumes(container, paginated);
        renderPagination(filtered.length);
      }

      // Save filters to hash
      saveFiltersToHash();
    }, 100);

    console.log(`[catalog] applyFiltersAndRender: displaying ${paginated.length} of ${filtered.length} results`);
  } catch (error) {
    console.error('[catalog] applyFiltersAndRender: error rendering', error);
  }
}

/**
 * Filter perfumes based on criteria
 */
function filterPerfumes(perfumes, filters) {
  return perfumes.filter(perfume => {
    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchText = `${perfume.brand} ${perfume.name} ${perfume.description}`.toLowerCase();
      const allNotes = [...perfume.notesTop, ...perfume.notesMiddle, ...perfume.notesBase].join(' ').toLowerCase();

      if (!searchText.includes(query) && !allNotes.includes(query)) {
        return false;
      }
    }

    // Gender filter
    if (filters.gender.length > 0) {
      if (!filters.gender.includes(perfume.gender) && perfume.gender !== 'unisex') {
        return false;
      }
    }

    // Season filter
    if (filters.season.length > 0) {
      const hasMatchingSeason = filters.season.some(s => perfume.season.includes(s));
      if (!hasMatchingSeason) {
        return false;
      }
    }

    // Notes filter
    if (filters.notes.length > 0) {
      const perfumeNotes = [...perfume.notesTop, ...perfume.notesMiddle, ...perfume.notesBase];
      const hasMatchingNote = filters.notes.some(n => perfumeNotes.includes(n));
      if (!hasMatchingNote) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort perfumes by criteria
 */
function sortPerfumes(perfumes, sortBy) {
  const sorted = [...perfumes];

  switch (sortBy) {
    case 'popularity':
      sorted.sort((a, b) => b.popularityScore - a.popularityScore);
      break;
    case 'rating':
      sorted.sort((a, b) => b.ratingAvg - a.ratingAvg);
      break;
    case 'newest':
      sorted.sort((a, b) => b.releaseYear - a.releaseYear);
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return sorted;
}

/**
 * Paginate results
 */
function paginateResults(perfumes, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return perfumes.slice(start, end);
}

/**
 * Render perfumes in grid
 */
function renderPerfumes(container, perfumes) {
  container.innerHTML = perfumes.map(perfume => `
    <a href="perfume.html?id=${perfume.id}" class="perfume-card">
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
 * Render pagination controls
 */
function renderPagination(totalResults) {
  const container = document.querySelector('#pagination');
  if (!container) return;

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '<div class="pagination">';

  // Previous button
  html += `
    <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="window.catalog.goToPage(${currentPage - 1})">
      ‹ Anterior
    </button>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `
        <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="window.catalog.goToPage(${i})">
          ${i}
        </button>
      `;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += '<span class="pagination-ellipsis">...</span>';
    }
  }

  // Next button
  html += `
    <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.catalog.goToPage(${currentPage + 1})">
      Siguiente ›
    </button>
  `;

  html += '</div>';
  container.innerHTML = html;
}

/**
 * Go to specific page
 */
export function goToPage(page) {
  currentPage = page;
  applyFiltersAndRender();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update results count display
 */
function updateResultsCount(count) {
  const countEl = document.querySelector('#results-count');
  if (countEl) {
    countEl.textContent = `${formatNumber(count)} perfume${count !== 1 ? 's' : ''}`;
  }
}

/**
 * Clear all filters
 */
function clearFilters() {
  currentFilters = {
    query: '',
    gender: [],
    season: [],
    notes: [],
    sort: 'popularity'
  };
  currentPage = 1;
  updateFilterUI();
  applyFiltersAndRender();
  console.log('[catalog] clearFilters: all filters cleared');
}

// Expose for pagination buttons
window.catalog = { goToPage };

console.log('[catalog] Catalog module loaded');
