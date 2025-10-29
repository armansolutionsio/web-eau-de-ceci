/* ========================================
   UI.JS - UI Components & Helpers
   ======================================== */

/**
 * Toast notification system
 * Displays temporary messages to the user
 */

let toastContainer = null;
let toastIdCounter = 0;

/**
 * Initialize toast container
 */
function initToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
    console.log('[ui] Toast container initialized');
  }
}

/**
 * Show a toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duration in milliseconds (0 = persistent)
 */
export function toast(message, type = 'info', duration = 4000) {
  try {
    console.log(`[ui] toast: type="${type}", message="${message}"`);

    initToastContainer();

    const toastId = `toast-${toastIdCounter++}`;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.id = toastId;
    toast.setAttribute('role', 'alert');

    // Icon based on type
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const titles = {
      success: 'Éxito',
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información'
    };

    toast.innerHTML = `
      <div class="toast-icon" aria-hidden="true">${icons[type] || icons.info}</div>
      <div class="toast-content">
        <div class="toast-title">${titles[type] || titles.info}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Cerrar notificación">×</button>
    `;

    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      removeToast(toastId);
    });

    toastContainer.appendChild(toast);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(toastId);
      }, duration);
    }
  } catch (error) {
    console.error('[ui] toast: error displaying toast', error);
  }
}

/**
 * Remove a toast by ID
 * @param {string} toastId - Toast element ID
 */
function removeToast(toastId) {
  try {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        toast.remove();
      }, 300);
      console.log(`[ui] removeToast: removed toast "${toastId}"`);
    }
  } catch (error) {
    console.error('[ui] removeToast: error removing toast', error);
  }
}

/**
 * Modal management
 */

const modal = {
  /**
   * Open a modal
   * @param {string} modalId - Modal element ID
   */
  open(modalId) {
    try {
      console.log(`[ui] modal.open: opening modal "${modalId}"`);

      const backdrop = document.getElementById(modalId);
      if (!backdrop) {
        console.warn(`[ui] modal.open: modal "${modalId}" not found`);
        return;
      }

      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Focus trap and close handlers
      const closeButtons = backdrop.querySelectorAll('[data-modal-close]');
      closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.close(modalId);
        });
      });

      // Close on backdrop click
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.close(modalId);
        }
      });

      // Close on ESC key
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          this.close(modalId);
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);

      // Store handler for cleanup
      backdrop._escHandler = escHandler;

    } catch (error) {
      console.error('[ui] modal.open: error opening modal', error);
    }
  },

  /**
   * Close a modal
   * @param {string} modalId - Modal element ID
   */
  close(modalId) {
    try {
      console.log(`[ui] modal.close: closing modal "${modalId}"`);

      const backdrop = document.getElementById(modalId);
      if (!backdrop) {
        console.warn(`[ui] modal.close: modal "${modalId}" not found`);
        return;
      }

      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';

      // Cleanup ESC handler
      if (backdrop._escHandler) {
        document.removeEventListener('keydown', backdrop._escHandler);
        backdrop._escHandler = null;
      }

    } catch (error) {
      console.error('[ui] modal.close: error closing modal', error);
    }
  }
};

export { modal };

/**
 * Format star rating as HTML
 * @param {number} rating - Rating value (0-5)
 * @param {number} maxStars - Maximum number of stars
 * @returns {string} HTML string with stars
 */
export function formatStars(rating, maxStars = 5) {
  try {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    let html = '<div class="stars" role="img" aria-label="' + rating + ' de ' + maxStars + ' estrellas">';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      html += '<svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }

    // Half star
    if (hasHalfStar) {
      html += '<svg class="star" viewBox="0 0 24 24" fill="currentColor"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#d1d5db"/></linearGradient></defs><path fill="url(#half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      html += '<svg class="star star-empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }

    html += '</div>';

    return html;
  } catch (error) {
    console.error('[ui] formatStars: error formatting stars', error);
    return '';
  }
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or string
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return d.toLocaleDateString('es-ES', options);
  } catch (error) {
    console.error('[ui] formatDate: error formatting date', error);
    return '';
  }
}

/**
 * Format relative time (e.g., "hace 2 horas")
 * @param {Date|string} date - Date object or string
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now - d;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'hace un momento';
    if (diffMins < 60) return `hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
    if (diffHours < 24) return `hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
    if (diffDays < 30) return `hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;

    return formatDate(d);
  } catch (error) {
    console.error('[ui] formatRelativeTime: error formatting relative time', error);
    return '';
  }
}

/**
 * Create element from HTML string
 * @param {string} html - HTML string
 * @returns {HTMLElement} DOM element
 */
export function createElement(html) {
  try {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  } catch (error) {
    console.error('[ui] createElement: error creating element', error);
    return null;
  }
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Scroll to element smoothly
 * @param {string|HTMLElement} element - Element or selector
 * @param {number} offset - Offset in pixels
 */
export function scrollToElement(element, offset = 100) {
  try {
    const el = typeof element === 'string' ? document.querySelector(element) : element;

    if (!el) {
      console.warn('[ui] scrollToElement: element not found');
      return;
    }

    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    console.log('[ui] scrollToElement: scrolled to element');
  } catch (error) {
    console.error('[ui] scrollToElement: error scrolling', error);
  }
}

/**
 * Get initials from name for avatar
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export function getInitials(name) {
  try {
    if (!name) return '??';

    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } catch (error) {
    console.error('[ui] getInitials: error getting initials', error);
    return '??';
  }
}

/**
 * Show loading state
 * @param {HTMLElement} container - Container element
 */
export function showLoading(container) {
  try {
    if (!container) return;

    container.innerHTML = '<div class="loading" aria-label="Cargando..."></div>';
    console.log('[ui] showLoading: loading state displayed');
  } catch (error) {
    console.error('[ui] showLoading: error displaying loading state', error);
  }
}

/**
 * Show empty state
 * @param {HTMLElement} container - Container element
 * @param {string} message - Empty state message
 * @param {string} icon - Icon to display
 */
export function showEmptyState(container, message = 'No se encontraron resultados', icon = '🔍') {
  try {
    if (!container) return;

    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">${icon}</div>
        <h3 class="empty-state-title">Sin resultados</h3>
        <p class="empty-state-text">${message}</p>
      </div>
    `;
    console.log('[ui] showEmptyState: empty state displayed');
  } catch (error) {
    console.error('[ui] showEmptyState: error displaying empty state', error);
  }
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

console.log('[ui] UI module loaded');
