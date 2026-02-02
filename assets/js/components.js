/**
 * Component loader for shared header/footer
 * Loads HTML partials and injects them into the page
 */

function getBasePath() {
  // Determine if we're in a subdirectory (pages/) or root
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '..';
  }
  return '.';
}

async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
    let html = await response.text();

    // Replace {{BASE}} placeholder with actual base path
    const base = getBasePath();
    html = html.replace(/\{\{BASE\}\}/g, base);

    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
      element.classList.add('component-loaded');

      // Set active navigation state after header loads
      if (elementId === 'header') {
        setActiveNavigation();
      }
    }
  } catch (error) {
    console.error('Component loading error:', error);
  }
}

// Set active state on navigation links
function setActiveNavigation() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a, #mobile-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check if this link matches the current page
    let isActive = false;

    if (path === '/' || path.endsWith('/index.html') || path === '/124Moonine/' || path === '/124Moonine/index.html') {
      // Home page - match root or index
      isActive = href.endsWith('/') || href.endsWith('/index.html') || href === './' || href === '../';
      isActive = isActive && !href.includes('/pages/');
    } else if (path.includes('/about')) {
      isActive = href.includes('/about');
    } else if (path.includes('/attractions')) {
      isActive = href.includes('/attractions');
    } else if (path.includes('/contact')) {
      isActive = href.includes('/contact');
    }

    if (isActive && !href.includes('airbnb.com')) {
      // Add active styling
      link.classList.add('text-primary', 'nav-active');
      link.classList.remove('text-text-main');

      // Add underline indicator for desktop nav
      if (link.closest('nav.hidden.md\\:flex')) {
        link.classList.add('relative');
        if (!link.querySelector('.nav-indicator')) {
          const indicator = document.createElement('span');
          indicator.className = 'nav-indicator absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full';
          link.appendChild(indicator);
        }
      }
    }
  });
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
