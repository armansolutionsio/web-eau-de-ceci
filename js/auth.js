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
