/**
 * Acciones de perfumes (wishlist, colección)
 */

import { isAuthenticated, toggleWishlist, toggleCollection, isInWishlist, isInCollection } from './auth.js';
import { toast } from './ui.js';

/**
 * Renderizar botones de acción para un perfume
 */
export function renderPerfumeActions(perfumeId) {
  if (!isAuthenticated()) {
    return '';
  }

  const inWishlist = isInWishlist(perfumeId);
  const inCollection = isInCollection(perfumeId);

  return `
    <div class="perfume-actions" style="display: flex; gap: var(--space-2); margin-top: var(--space-3);">
      <button
        class="btn btn-sm ${inWishlist ? 'btn-primary' : 'btn-outline'}"
        onclick="window.perfumeActions.toggleWishlist('${perfumeId}')"
        data-perfume-id="${perfumeId}"
        data-action="wishlist"
      >
        ${inWishlist ? '💝' : '🤍'} ${inWishlist ? 'En Deseos' : 'Deseos'}
      </button>
      <button
        class="btn btn-sm ${inCollection ? 'btn-primary' : 'btn-outline'}"
        onclick="window.perfumeActions.toggleCollection('${perfumeId}')"
        data-perfume-id="${perfumeId}"
        data-action="collection"
      >
        ${inCollection ? '✨' : '⭐'} ${inCollection ? 'En Colección' : 'Colección'}
      </button>
    </div>
  `;
}

/**
 * Toggle wishlist y actualizar UI
 */
export function handleToggleWishlist(perfumeId) {
  if (!isAuthenticated()) {
    toast('Debes iniciar sesión para usar esta función', 'error');
    return;
  }

  const added = toggleWishlist(perfumeId);

  if (added) {
    toast('Agregado a tu lista de deseos', 'success');
  } else {
    toast('Removido de tu lista de deseos', 'success');
  }

  // Actualizar el botón
  updateButton(perfumeId, 'wishlist');
}

/**
 * Toggle colección y actualizar UI
 */
export function handleToggleCollection(perfumeId) {
  if (!isAuthenticated()) {
    toast('Debes iniciar sesión para usar esta función', 'error');
    return;
  }

  const added = toggleCollection(perfumeId);

  if (added) {
    toast('Agregado a tu colección', 'success');
  } else {
    toast('Removido de tu colección', 'success');
  }

  // Actualizar el botón
  updateButton(perfumeId, 'collection');
}

/**
 * Actualizar el estado visual de un botón
 */
function updateButton(perfumeId, action) {
  const buttons = document.querySelectorAll(`[data-perfume-id="${perfumeId}"][data-action="${action}"]`);

  buttons.forEach(button => {
    if (action === 'wishlist') {
      const inWishlist = isInWishlist(perfumeId);
      button.className = `btn btn-sm ${inWishlist ? 'btn-primary' : 'btn-outline'}`;
      button.innerHTML = `${inWishlist ? '💝' : '🤍'} ${inWishlist ? 'En Deseos' : 'Deseos'}`;
    } else if (action === 'collection') {
      const inCollection = isInCollection(perfumeId);
      button.className = `btn btn-sm ${inCollection ? 'btn-primary' : 'btn-outline'}`;
      button.innerHTML = `${inCollection ? '✨' : '⭐'} ${inCollection ? 'En Colección' : 'Colección'}`;
    }
  });
}

// Exponer funciones globalmente para onclick handlers
window.perfumeActions = {
  toggleWishlist: handleToggleWishlist,
  toggleCollection: handleToggleCollection
};

console.log('[perfume-actions] Perfume actions module loaded');
