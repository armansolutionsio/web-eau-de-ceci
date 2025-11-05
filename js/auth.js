/**
 * Sistema de autenticación simple
 */

// Obtener token del localStorage
export function getToken() {
  return localStorage.getItem('access_token');
}

// Obtener usuario del localStorage
export function getUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Verificar si el usuario está autenticado
export function isAuthenticated() {
  return !!getToken();
}

// Cerrar sesión
export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

// Inicializar UI de autenticación en el header
export function initAuthUI() {
  const headerActions = document.querySelector('.header-actions');
  if (!headerActions) return;

  if (isAuthenticated()) {
    const user = getUser();
    headerActions.innerHTML = `
      <div style="display: flex; align-items: center; gap: var(--space-3);">
        <a href="/profile" class="btn btn-ghost btn-sm">Mi Perfil</a>
        <span class="text-small" style="color: var(--cec-text-secondary);">Hola, ${user.username}</span>
        <button id="logout-btn" class="btn btn-outline btn-sm">Cerrar sesión</button>
      </div>
    `;

    // Agregar evento al botón de logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    }
  } else {
    headerActions.innerHTML = `
      <a href="/login" class="btn btn-outline btn-sm">Iniciar sesión</a>
    `;
  }
}

// ====== WISHLIST & COLLECTION MANAGEMENT ======

// Obtener wishlist del usuario
export function getWishlist() {
  const user = getUser();
  if (!user) return [];

  const key = `wishlist_${user.id}`;
  const wishlist = localStorage.getItem(key);
  return wishlist ? JSON.parse(wishlist) : [];
}

// Agregar perfume a wishlist
export function addToWishlist(perfumeId) {
  const user = getUser();
  if (!user) return false;

  const wishlist = getWishlist();
  if (!wishlist.includes(perfumeId)) {
    wishlist.push(perfumeId);
    const key = `wishlist_${user.id}`;
    localStorage.setItem(key, JSON.stringify(wishlist));
    return true;
  }
  return false;
}

// Quitar perfume de wishlist
export function removeFromWishlist(perfumeId) {
  const user = getUser();
  if (!user) return false;

  const wishlist = getWishlist();
  const filtered = wishlist.filter(id => id !== perfumeId);
  const key = `wishlist_${user.id}`;
  localStorage.setItem(key, JSON.stringify(filtered));
  return true;
}

// Verificar si un perfume está en wishlist
export function isInWishlist(perfumeId) {
  return getWishlist().includes(perfumeId);
}

// Toggle wishlist
export function toggleWishlist(perfumeId) {
  if (isInWishlist(perfumeId)) {
    removeFromWishlist(perfumeId);
    return false;
  } else {
    addToWishlist(perfumeId);
    return true;
  }
}

// Obtener colección del usuario
export function getCollection() {
  const user = getUser();
  if (!user) return [];

  const key = `collection_${user.id}`;
  const collection = localStorage.getItem(key);
  return collection ? JSON.parse(collection) : [];
}

// Agregar perfume a colección
export function addToCollection(perfumeId) {
  const user = getUser();
  if (!user) return false;

  const collection = getCollection();
  if (!collection.includes(perfumeId)) {
    collection.push(perfumeId);
    const key = `collection_${user.id}`;
    localStorage.setItem(key, JSON.stringify(collection));
    return true;
  }
  return false;
}

// Quitar perfume de colección
export function removeFromCollection(perfumeId) {
  const user = getUser();
  if (!user) return false;

  const collection = getCollection();
  const filtered = collection.filter(id => id !== perfumeId);
  const key = `collection_${user.id}`;
  localStorage.setItem(key, JSON.stringify(filtered));
  return true;
}

// Verificar si un perfume está en colección
export function isInCollection(perfumeId) {
  return getCollection().includes(perfumeId);
}

// Toggle collection
export function toggleCollection(perfumeId) {
  if (isInCollection(perfumeId)) {
    removeFromCollection(perfumeId);
    return false;
  } else {
    addToCollection(perfumeId);
    return true;
  }
}

// Hacer request autenticado al API
export async function authenticatedFetch(url, options = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers
  });
}
