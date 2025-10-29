/* ========================================
   COMMUNITY.JS - Community Page Logic
   ======================================== */

import { modal, toast, formatRelativeTime, getInitials, generateId } from './ui.js';

/**
 * Initialize community page
 */
export function initCommunity() {
  try {
    console.log('[community] initCommunity: initializing community page');

    renderPosts();
    initNewPostButton();
    initPostForm();

    console.log('[community] initCommunity: community initialized');
  } catch (error) {
    console.error('[community] initCommunity: error initializing', error);
  }
}

/**
 * Get posts from localStorage
 */
function getPosts() {
  try {
    const stored = localStorage.getItem('posts');
    const posts = stored ? JSON.parse(stored) : getDefaultPosts();

    // Save default posts if none exist
    if (!stored) {
      localStorage.setItem('posts', JSON.stringify(posts));
    }

    return posts;
  } catch (error) {
    console.warn('[community] getPosts: error reading posts', error);
    return getDefaultPosts();
  }
}

/**
 * Get default posts (dummy data)
 */
function getDefaultPosts() {
  return [
    {
      id: 'post-1',
      author: 'María González',
      title: '¿Qué perfume usar en primavera?',
      content: 'Estoy buscando recomendaciones de perfumes frescos y florales para la primavera. Me encantan las notas cítricas y el jazmín. ¿Alguna sugerencia?',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      comments: 3
    },
    {
      id: 'post-2',
      author: 'Carlos Ruiz',
      title: 'Mi colección de perfumes amaderados',
      content: 'Quería compartir mi pasión por los perfumes amaderados. Mis favoritos son Ébène Intense y Cèdre Atlas. La longevidad y el sillage son increíbles.',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      comments: 5
    },
    {
      id: 'post-3',
      author: 'Laura Martínez',
      title: 'Descubrí Velours Noir y es espectacular',
      content: 'No puedo dejar de hablar de este perfume. La combinación de oud, iris y vainilla es perfecta para el invierno. Totalmente recomendado.',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      comments: 8
    }
  ];
}

/**
 * Save posts to localStorage
 */
function savePosts(posts) {
  try {
    localStorage.setItem('posts', JSON.stringify(posts));
    console.log('[community] savePosts: posts saved');
    return true;
  } catch (error) {
    console.error('[community] savePosts: error saving posts', error);
    return false;
  }
}

/**
 * Get comments for a post
 */
function getComments(postId) {
  try {
    const key = `comments:${postId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('[community] getComments: error reading comments', error);
    return [];
  }
}

/**
 * Save comments for a post
 */
function saveComments(postId, comments) {
  try {
    const key = `comments:${postId}`;
    localStorage.setItem(key, JSON.stringify(comments));
    console.log(`[community] saveComments: comments saved for post "${postId}"`);
    return true;
  } catch (error) {
    console.error('[community] saveComments: error saving comments', error);
    return false;
  }
}

/**
 * Render posts
 */
function renderPosts() {
  try {
    const container = document.querySelector('#posts-container');
    if (!container) return;

    const posts = getPosts();
    console.log(`[community] renderPosts: rendering ${posts.length} posts`);

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">💬</div>
          <h3 class="empty-state-title">No hay publicaciones</h3>
          <p class="empty-state-text">Sé el primero en crear una publicación</p>
        </div>
      `;
      return;
    }

    container.innerHTML = posts.map(post => `
      <article class="card mb-4" style="padding: var(--space-5);">
        <div class="review-header mb-3">
          <div class="review-author">
            <div class="review-avatar">${getInitials(post.author)}</div>
            <div class="review-author-info">
              <div class="review-author-name">${post.author}</div>
              <div class="review-date">${formatRelativeTime(post.date)}</div>
            </div>
          </div>
        </div>
        <h3 class="mb-3">${post.title}</h3>
        <p class="text-muted mb-4">${post.content}</p>
        <div class="flex gap-4">
          <button class="btn btn-ghost btn-sm" onclick="window.community.viewComments('${post.id}')">
            💬 ${post.comments} comentario${post.comments !== 1 ? 's' : ''}
          </button>
          <button class="btn btn-ghost btn-sm" onclick="window.community.deletePost('${post.id}')">
            🗑️ Eliminar
          </button>
        </div>
        <div id="comments-${post.id}" class="mt-4 hidden"></div>
      </article>
    `).join('');
  } catch (error) {
    console.error('[community] renderPosts: error rendering posts', error);
  }
}

/**
 * Initialize new post button
 */
function initNewPostButton() {
  const btn = document.querySelector('#new-post-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      modal.open('new-post-modal');
    });
  }
}

/**
 * Initialize post form
 */
function initPostForm() {
  const form = document.querySelector('#new-post-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handlePostSubmit();
  });
}

/**
 * Handle post form submission
 */
function handlePostSubmit() {
  try {
    const author = document.querySelector('#post-author').value.trim();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (!author || !title || !content) {
      toast('Por favor completa todos los campos', 'error');
      return;
    }

    const post = {
      id: generateId(),
      author,
      title,
      content,
      date: new Date().toISOString(),
      comments: 0
    };

    const posts = getPosts();
    posts.unshift(post);

    if (savePosts(posts)) {
      toast('¡Publicación creada con éxito!', 'success');
      modal.close('new-post-modal');
      document.querySelector('#new-post-form').reset();
      renderPosts();
    } else {
      toast('Error al crear la publicación', 'error');
    }
  } catch (error) {
    console.error('[community] handlePostSubmit: error submitting post', error);
    toast('Error al crear la publicación', 'error');
  }
}

/**
 * View comments for a post
 */
export function viewComments(postId) {
  try {
    console.log(`[community] viewComments: viewing comments for post "${postId}"`);

    const container = document.querySelector(`#comments-${postId}`);
    if (!container) return;

    if (!container.classList.contains('hidden')) {
      container.classList.add('hidden');
      return;
    }

    const comments = getComments(postId);

    let html = '<div class="divider"></div>';

    if (comments.length > 0) {
      html += comments.map(comment => `
        <div class="comment-card">
          <div class="review-header">
            <div class="review-author">
              <div class="review-avatar">${getInitials(comment.author)}</div>
              <div class="review-author-info">
                <div class="review-author-name">${comment.author}</div>
                <div class="review-date">${formatRelativeTime(comment.date)}</div>
              </div>
            </div>
          </div>
          <p class="review-content">${comment.content}</p>
        </div>
      `).join('');
    } else {
      html += '<p class="text-muted">No hay comentarios aún.</p>';
    }

    html += `
      <form class="mt-4" onsubmit="window.community.addComment(event, '${postId}')">
        <div class="form-group">
          <input type="text" class="form-input" placeholder="Tu nombre" required id="comment-author-${postId}">
        </div>
        <div class="form-group">
          <textarea class="form-textarea" placeholder="Escribe un comentario..." required id="comment-content-${postId}" style="min-height: 80px;"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Comentar</button>
      </form>
    `;

    container.innerHTML = html;
    container.classList.remove('hidden');
  } catch (error) {
    console.error('[community] viewComments: error viewing comments', error);
  }
}

/**
 * Add comment to post
 */
export function addComment(event, postId) {
  event.preventDefault();

  try {
    console.log(`[community] addComment: adding comment to post "${postId}"`);

    const author = document.querySelector(`#comment-author-${postId}`).value.trim();
    const content = document.querySelector(`#comment-content-${postId}`).value.trim();

    if (!author || !content) {
      toast('Por favor completa todos los campos', 'error');
      return;
    }

    const comment = {
      author,
      content,
      date: new Date().toISOString()
    };

    const comments = getComments(postId);
    comments.push(comment);

    if (saveComments(postId, comments)) {
      // Update comment count in post
      const posts = getPosts();
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.comments = comments.length;
        savePosts(posts);
      }

      toast('Comentario añadido', 'success');
      renderPosts();
      viewComments(postId);
    } else {
      toast('Error al añadir comentario', 'error');
    }
  } catch (error) {
    console.error('[community] addComment: error adding comment', error);
    toast('Error al añadir comentario', 'error');
  }
}

/**
 * Delete post
 */
export function deletePost(postId) {
  try {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      return;
    }

    console.log(`[community] deletePost: deleting post "${postId}"`);

    const posts = getPosts();
    const filtered = posts.filter(p => p.id !== postId);

    if (savePosts(filtered)) {
      // Also remove comments
      localStorage.removeItem(`comments:${postId}`);

      toast('Publicación eliminada', 'success');
      renderPosts();
    } else {
      toast('Error al eliminar publicación', 'error');
    }
  } catch (error) {
    console.error('[community] deletePost: error deleting post', error);
    toast('Error al eliminar publicación', 'error');
  }
}

// Expose functions for onclick handlers
window.community = { viewComments, addComment, deletePost };

console.log('[community] Community module loaded');
