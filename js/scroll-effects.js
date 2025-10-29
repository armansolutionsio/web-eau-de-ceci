/* ========================================
   SCROLL-EFFECTS.JS - Scroll-based Animations
   ======================================== */

/**
 * Initialize scroll-based fade effects for perfume cards
 */

let observer = null;

/**
 * Calculate how centered an element is in the viewport
 * @param {DOMRect} rect - Element's bounding rectangle
 * @param {number} viewportHeight - Viewport height
 * @returns {number} Value from 0 to 1 (1 = perfectly centered)
 */
function calculateCenteredness(rect, viewportHeight) {
  const elementCenter = rect.top + rect.height / 2;
  const viewportCenter = viewportHeight / 2;
  const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
  const maxDistance = viewportHeight / 2;

  // Convert distance to a value between 0 and 1
  const centeredness = Math.max(0, 1 - distanceFromCenter / maxDistance);

  return centeredness;
}

/**
 * Update card opacity and transform based on scroll position
 */
function updateCardVisibility() {
  const cards = document.querySelectorAll('.perfume-card');
  const viewportHeight = window.innerHeight;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();

    // Skip if card is outside viewport
    if (rect.bottom < 0 || rect.top > viewportHeight) {
      card.classList.remove('scroll-visible', 'scroll-fade-entering', 'scroll-fade-leaving');
      card.classList.add('scroll-fade');
      return;
    }

    // Calculate how centered the card is
    const centeredness = calculateCenteredness(rect, viewportHeight);

    // Remove all classes
    card.classList.remove('scroll-fade', 'scroll-visible', 'scroll-fade-entering', 'scroll-fade-leaving');

    // Apply appropriate class based on centeredness
    if (centeredness > 0.7) {
      // Fully visible (centered)
      card.classList.add('scroll-visible');
    } else if (centeredness > 0.4) {
      // Entering center
      card.classList.add('scroll-fade-entering');
    } else if (centeredness > 0.2) {
      // Leaving center
      card.classList.add('scroll-fade-leaving');
    } else {
      // Faded
      card.classList.add('scroll-fade');
    }

    // Optional: Set exact opacity based on centeredness for smoother transition
    const opacity = 0.3 + centeredness * 0.7; // Range: 0.3 to 1.0
    const scale = 0.95 + centeredness * 0.05; // Range: 0.95 to 1.0

    card.style.opacity = opacity;
    card.style.transform = `scale(${scale})`;
  });
}

/**
 * Throttle function for scroll events
 */
function throttle(func, wait) {
  let timeout;
  let lastTime = 0;

  return function executedFunction(...args) {
    const now = Date.now();

    if (now - lastTime < wait) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        lastTime = now;
        func(...args);
      }, wait);
    } else {
      lastTime = now;
      func(...args);
    }
  };
}

/**
 * Initialize scroll effects
 */
export function initScrollEffects() {
  try {
    console.log('[scroll-effects] Initializing scroll effects');

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      console.log('[scroll-effects] Reduced motion detected, using simplified effects');
    }

    // Initial update
    updateCardVisibility();

    // Throttled scroll handler
    const throttledUpdate = throttle(updateCardVisibility, 50);

    // Listen to scroll events
    window.addEventListener('scroll', throttledUpdate, { passive: true });

    // Listen to resize events
    window.addEventListener('resize', throttledUpdate, { passive: true });

    // Use Intersection Observer as backup for better performance
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          // Only update when cards enter/leave viewport
          const hasChanges = entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight);

          if (hasChanges) {
            updateCardVisibility();
          }
        },
        {
          rootMargin: '50px 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      // Observe all cards
      document.querySelectorAll('.perfume-card').forEach((card) => {
        observer.observe(card);
      });
    }

    console.log('[scroll-effects] Scroll effects initialized');
  } catch (error) {
    console.error('[scroll-effects] Error initializing scroll effects', error);
  }
}

/**
 * Re-initialize scroll effects (useful after dynamic content load)
 */
export function refreshScrollEffects() {
  try {
    console.log('[scroll-effects] Refreshing scroll effects');

    // Disconnect existing observer
    if (observer) {
      observer.disconnect();
    }

    // Re-initialize
    initScrollEffects();
  } catch (error) {
    console.error('[scroll-effects] Error refreshing scroll effects', error);
  }
}

/**
 * Cleanup scroll effects
 */
export function cleanupScrollEffects() {
  try {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    console.log('[scroll-effects] Scroll effects cleaned up');
  } catch (error) {
    console.error('[scroll-effects] Error cleaning up scroll effects', error);
  }
}

console.log('[scroll-effects] Scroll effects module loaded');
