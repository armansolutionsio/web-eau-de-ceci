/* ========================================
   CONFIG.JS - API Configuration
   ======================================== */

/**
 * API configuration
 */
export const API_BASE_URL = window.location.origin;
export const API_ENDPOINTS = {
  perfumes: `${API_BASE_URL}/api/perfumes/`,
  perfumeById: (id) => `${API_BASE_URL}/api/perfumes/${id}`,
  searchSuggestions: `${API_BASE_URL}/api/perfumes/search/suggestions`,
  health: `${API_BASE_URL}/api/health`,
};

console.log('[config] API configured:', API_BASE_URL);
