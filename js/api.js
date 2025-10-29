/* ========================================
   API.JS - API Client
   ======================================== */

import { API_ENDPOINTS } from './config.js';

/**
 * Fetch all perfumes with filters
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} Array of perfumes
 */
export async function fetchPerfumes(params = {}) {
  try {
    console.log('[api] fetchPerfumes: fetching with params', params);

    const queryString = new URLSearchParams(params).toString();
    const url = `${API_ENDPOINTS.perfumes}${queryString ? '?' + queryString : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[api] fetchPerfumes: fetched ${data.length} perfumes`);

    return data;
  } catch (error) {
    console.error('[api] fetchPerfumes: error', error);
    throw error;
  }
}

/**
 * Fetch a single perfume by ID
 * @param {string} id - Perfume ID
 * @returns {Promise<Object>} Perfume object
 */
export async function fetchPerfumeById(id) {
  try {
    console.log(`[api] fetchPerfumeById: fetching perfume "${id}"`);

    const response = await fetch(API_ENDPOINTS.perfumeById(id));

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[api] fetchPerfumeById: fetched "${data.name}"`);

    return data;
  } catch (error) {
    console.error('[api] fetchPerfumeById: error', error);
    throw error;
  }
}

/**
 * Search perfumes (typeahead)
 * @param {string} query - Search query
 * @param {number} limit - Max results
 * @returns {Promise<Array>} Array of matching perfumes
 */
export async function searchPerfumes(query, limit = 8) {
  try {
    console.log(`[api] searchPerfumes: query="${query}", limit=${limit}`);

    const response = await fetch(
      `${API_ENDPOINTS.searchSuggestions}?q=${encodeURIComponent(query)}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[api] searchPerfumes: found ${data.length} results`);

    return data;
  } catch (error) {
    console.error('[api] searchPerfumes: error', error);
    throw error;
  }
}

/**
 * Check API health
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
  try {
    const response = await fetch(API_ENDPOINTS.health);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[api] checkHealth: API is healthy', data);

    return data;
  } catch (error) {
    console.error('[api] checkHealth: error', error);
    throw error;
  }
}

console.log('[api] API client loaded');
