/**
 * Component loader for shared header/footer
 * Loads HTML partials and injects them into the page
 */

async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
      element.classList.add('component-loaded');
    }
  } catch (error) {
    console.error('Component loading error:', error);
  }
}

function getBasePath() {
  // Determine if we're in a subdirectory (pages/) or root
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '..';
  }
  return '.';
}

document.addEventListener('DOMContentLoaded', () => {
  const base = getBasePath();
  loadComponent('header', `${base}/components/header.html`);
  loadComponent('footer', `${base}/components/footer.html`);
});

// Mobile menu toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('#mobile-menu-btn')) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }
});
