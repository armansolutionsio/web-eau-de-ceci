/* ========================================
   APP.JS - Common Application Logic
   ======================================== */

/**
 * Initialize the application
 * Sets up navigation, mobile menu, and common functionality
 */

console.log('[app] Initializing application...');

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  try {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log(`[app] setActiveNavLink: current page is "${currentPage}"`);

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      // Handle both explicit paths and index.html as home
      if (href === currentPage ||
          (currentPage === '' && href === 'index.html') ||
          (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        console.log(`[app] setActiveNavLink: set "${href}" as active`);
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  } catch (error) {
    console.error('[app] setActiveNavLink: error setting active link', error);
  }
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  try {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!menuToggle || !mainNav) {
      console.log('[app] initMobileMenu: mobile menu elements not found (might not be needed)');
      return;
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      console.log(`[app] initMobileMenu: menu ${isOpen ? 'opened' : 'closed'}`);
    });

    // Close menu when clicking a link
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on resize if screen becomes large
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }, 250);
    });

    console.log('[app] initMobileMenu: mobile menu initialized');
  } catch (error) {
    console.error('[app] initMobileMenu: error initializing mobile menu', error);
  }
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
export function getQueryParam(param) {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(param);
    console.log(`[app] getQueryParam: param="${param}", value="${value}"`);
    return value;
  } catch (error) {
    console.error('[app] getQueryParam: error getting query param', error);
    return null;
  }
}

/**
 * Set query parameter in URL without reloading
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 */
export function setQueryParam(param, value) {
  try {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(param, value);
    } else {
      url.searchParams.delete(param);
    }
    window.history.pushState({}, '', url);
    console.log(`[app] setQueryParam: set param="${param}" to value="${value}"`);
  } catch (error) {
    console.error('[app] setQueryParam: error setting query param', error);
  }
}

/**
 * Get hash parameters from URL
 * @returns {Object} Object with hash parameters
 */
export function getHashParams() {
  try {
    const hash = window.location.hash.substring(1);
    if (!hash) return {};

    const params = {};
    hash.split('&').forEach(part => {
      const [key, value] = part.split('=');
      if (key) {
        params[key] = decodeURIComponent(value || '');
      }
    });

    console.log('[app] getHashParams:', params);
    return params;
  } catch (error) {
    console.error('[app] getHashParams: error getting hash params', error);
    return {};
  }
}

/**
 * Set hash parameters without reloading
 * @param {Object} params - Parameters object
 */
export function setHashParams(params) {
  try {
    const parts = Object.keys(params)
      .filter(key => params[key] !== null && params[key] !== undefined && params[key] !== '')
      .map(key => `${key}=${encodeURIComponent(params[key])}`);

    window.location.hash = parts.join('&');
    console.log('[app] setHashParams:', params);
  } catch (error) {
    console.error('[app] setHashParams: error setting hash params', error);
  }
}

/**
 * Navigate to a page programmatically
 * @param {string} page - Page URL
 * @param {Object} params - Query parameters
 */
export function navigateTo(page, params = {}) {
  try {
    const url = new URL(page, window.location.origin);

    Object.keys(params).forEach(key => {
      if (params[key]) {
        url.searchParams.set(key, params[key]);
      }
    });

    console.log(`[app] navigateTo: navigating to ${url.toString()}`);
    window.location.href = url.toString();
  } catch (error) {
    console.error('[app] navigateTo: error navigating', error);
  }
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  try {
    return new Intl.NumberFormat('es-ES').format(num);
  } catch (error) {
    console.error('[app] formatNumber: error formatting number', error);
    return String(num);
  }
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Initialize the app when DOM is ready
 */
function initApp() {
  console.log('[app] DOM loaded, initializing...');

  setActiveNavLink();
  initMobileMenu();

  console.log('[app] Application initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

export { initApp };
