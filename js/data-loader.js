/* ========================================
   DATA-LOADER.JS - Load data from API
   ======================================== */

import { fetchPerfumes } from './api.js';

/**
 * Global perfumes array - loaded from API
 */
export let perfumes = [];

/**
 * Load perfumes from API and populate global array
 */
export async function loadPerfumes() {
  try {
    console.log('[data-loader] Loading perfumes from API...');
    const data = await fetchPerfumes();
    console.log('[data-loader] Raw API data:', data);

    // Transform API data to match frontend format
    perfumes = data.map(p => ({
      id: p.id,
      brand: p.brand,
      name: p.name,
      description: p.description,
      image: p.image,
      ratingAvg: p.ratingAvg || p.rating_avg || 0,
      votes: p.votes || 0,
      notesTop: p.notesTop || p.notes_top || [],
      notesMiddle: p.notesMiddle || p.notes_middle || [],
      notesBase: p.notesBase || p.notes_base || [],
      gender: p.gender,
      season: p.season || [],
      popularityScore: p.popularityScore || p.popularity_score || 0,
      releaseYear: p.releaseYear || p.release_year || 2024,
      longevity: p.longevity || 50,
      sillage: p.sillage || 50,
      accords: p.accords || []
    }));

    console.log(`[data-loader] Loaded ${perfumes.length} perfumes from API`);
    return perfumes;
  } catch (error) {
    console.error('[data-loader] Error loading perfumes from API:', error);
    // Return empty array on error
    perfumes = [];
    return perfumes;
  }
}

/**
 * Get all unique notes from all perfumes
 */
export function getAllNotes() {
  const notesSet = new Set();

  perfumes.forEach(perfume => {
    [...perfume.notesTop, ...perfume.notesMiddle, ...perfume.notesBase].forEach(note => {
      notesSet.add(note.toLowerCase());
    });
  });

  return Array.from(notesSet).sort();
}

/**
 * Get perfume by ID
 */
export function getPerfumeById(id) {
  return perfumes.find(p => p.id === id);
}

/**
 * Get perfume suggestions based on query
 */
export function getSuggestions(query, limit = 8) {
  if (!query) return [];

  const searchTerm = query.toLowerCase();

  return perfumes
    .filter(perfume => {
      return (
        perfume.name.toLowerCase().includes(searchTerm) ||
        perfume.brand.toLowerCase().includes(searchTerm) ||
        [...perfume.notesTop, ...perfume.notesMiddle, ...perfume.notesBase]
          .some(note => note.toLowerCase().includes(searchTerm)) ||
        perfume.accords.some(accord => accord.toLowerCase().includes(searchTerm))
      );
    })
    .slice(0, limit);
}

console.log('[data-loader] Data loader initialized');
