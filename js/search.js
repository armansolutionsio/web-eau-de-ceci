/* ========================================
   SEARCH.JS - Search and Typeahead
   ======================================== */

import { perfumes } from './data-loader.js';
import { navigateTo } from './app.js';
import { debounce } from './ui.js';

/**
 * Initialize search functionality
 * @param {string} inputSelector - CSS selector for search input
 * @param {string} dropdownSelector - CSS selector for typeahead dropdown
 */
export function initSearch(inputSelector, dropdownSelector) {
  try {
    console.log(`[search] initSearch: input="${inputSelector}", dropdown="${dropdownSelector}"`);

    const searchInput = document.querySelector(inputSelector);
    const dropdown = document.querySelector(dropdownSelector);

    if (!searchInput) {
      console.warn('[search] initSearch: search input not found');
      return;
    }

    if (!dropdown) {
      console.warn('[search] initSearch: dropdown not found');
      return;
    }

    let selectedIndex = -1;
    let currentResults = [];

    // Input handler with debounce for performance
    const handleInput = debounce(() => {
      const query = searchInput.value.trim();
      console.log(`[search] handleInput: query="${query}"`);

      if (query.length < 2) {
        hideDropdown(dropdown);
        return;
      }

      const results = searchPerfumes(query);
      currentResults = results;
      selectedIndex = -1;

      if (results.length > 0) {
        showTypeahead(dropdown, results);
      } else {
        showEmptyTypeahead(dropdown);
      }
    }, 300);

    searchInput.addEventListener('input', handleInput);

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      const items = dropdown.querySelectorAll('.typeahead-item');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelectedItem(items, selectedIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelectedItem(items, selectedIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();

        if (selectedIndex >= 0 && currentResults[selectedIndex]) {
          // Navigate to specific perfume
          navigateTo('/perfume', { id: currentResults[selectedIndex].id });
        } else {
          // Navigate to catalog with search query
          const query = searchInput.value.trim();
          if (query) {
            navigateTo('/catalog', { q: query });
          }
        }
      } else if (e.key === 'Escape') {
        hideDropdown(dropdown);
        searchInput.blur();
      }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        hideDropdown(dropdown);
      }
    });

    // Clear button (if exists)
    const clearBtn = searchInput.parentElement.querySelector('.search-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        hideDropdown(dropdown);
        searchInput.focus();
        console.log('[search] Search cleared');
      });
    }

    console.log('[search] initSearch: search initialized successfully');
  } catch (error) {
    console.error('[search] initSearch: error initializing search', error);
  }
}

/**
 * Search perfumes by query
 * @param {string} query - Search query
 * @param {number} limit - Maximum results
 * @returns {Array} Array of matching perfumes
 */
export function searchPerfumes(query, limit = 8) {
  try {
    console.log(`[search] searchPerfumes: query="${query}", limit=${limit}`);

    const queryLower = query.toLowerCase();
    const results = [];

    perfumes.forEach(perfume => {
      let score = 0;

      // Exact brand match
      if (perfume.brand.toLowerCase() === queryLower) {
        score += 100;
      }
      // Brand starts with query
      else if (perfume.brand.toLowerCase().startsWith(queryLower)) {
        score += 50;
      }
      // Brand contains query
      else if (perfume.brand.toLowerCase().includes(queryLower)) {
        score += 25;
      }

      // Exact name match
      if (perfume.name.toLowerCase() === queryLower) {
        score += 100;
      }
      // Name starts with query
      else if (perfume.name.toLowerCase().startsWith(queryLower)) {
        score += 50;
      }
      // Name contains query
      else if (perfume.name.toLowerCase().includes(queryLower)) {
        score += 25;
      }

      // Notes match
      const allNotes = [...perfume.notesTop, ...perfume.notesMiddle, ...perfume.notesBase];
      allNotes.forEach(note => {
        if (note.toLowerCase().includes(queryLower)) {
          score += 10;
        }
      });

      // Description match
      if (perfume.description.toLowerCase().includes(queryLower)) {
        score += 5;
      }

      if (score > 0) {
        results.push({ perfume, score });
      }
    });

    // Sort by score and popularity
    results.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.perfume.popularityScore - a.perfume.popularityScore;
    });

    const topResults = results.slice(0, limit).map(r => r.perfume);

    console.log(`[search] searchPerfumes: found ${results.length} results, returning top ${topResults.length}`);

    return topResults;
  } catch (error) {
    console.error('[search] searchPerfumes: error searching', error);
    return [];
  }
}

/**
 * Show typeahead dropdown with results
 * @param {HTMLElement} dropdown - Dropdown element
 * @param {Array} results - Array of perfume results
 */
function showTypeahead(dropdown, results) {
  try {
    console.log(`[search] showTypeahead: displaying ${results.length} results`);

    dropdown.innerHTML = '';

    results.forEach(perfume => {
      const item = document.createElement('a');
      item.className = 'typeahead-item';
      item.href = `/perfume?id=${perfume.id}`;

      item.innerHTML = `
        <img src="${perfume.image}" alt="${perfume.name}" class="typeahead-image">
        <div class="typeahead-content">
          <div class="typeahead-title">${perfume.brand} - ${perfume.name}</div>
          <div class="typeahead-subtitle">${perfume.notesTop.slice(0, 3).join(', ')}</div>
        </div>
      `;

      dropdown.appendChild(item);
    });

    dropdown.classList.add('is-open');
  } catch (error) {
    console.error('[search] showTypeahead: error showing typeahead', error);
  }
}

/**
 * Show empty state in typeahead
 * @param {HTMLElement} dropdown - Dropdown element
 */
function showEmptyTypeahead(dropdown) {
  try {
    console.log('[search] showEmptyTypeahead: no results found');

    dropdown.innerHTML = '<div class="typeahead-empty">No se encontraron perfumes</div>';
    dropdown.classList.add('is-open');
  } catch (error) {
    console.error('[search] showEmptyTypeahead: error showing empty state', error);
  }
}

/**
 * Hide typeahead dropdown
 * @param {HTMLElement} dropdown - Dropdown element
 */
function hideDropdown(dropdown) {
  try {
    dropdown.classList.remove('is-open');
    console.log('[search] hideDropdown: dropdown hidden');
  } catch (error) {
    console.error('[search] hideDropdown: error hiding dropdown', error);
  }
}

/**
 * Update selected item in typeahead
 * @param {NodeList} items - List of typeahead items
 * @param {number} index - Selected index
 */
function updateSelectedItem(items, index) {
  try {
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('is-selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('is-selected');
      }
    });
  } catch (error) {
    console.error('[search] updateSelectedItem: error updating selection', error);
  }
}

console.log('[search] Search module loaded');
