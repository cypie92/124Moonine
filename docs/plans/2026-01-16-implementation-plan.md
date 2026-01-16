# 124 By Moonine Homes - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure single-page website into multi-page architecture with shared components and interactive map.

**Architecture:** Static HTML/CSS/JS site with JavaScript-based component loading. Leaflet.js for OpenStreetMap integration. All pages share header/footer via async fetch.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Leaflet.js, Vanilla JavaScript

---

## Task 1: Create Folder Structure

**Files:**
- Create: `assets/css/styles.css`
- Create: `assets/js/components.js`
- Create: `assets/js/map.js`
- Create: `components/header.html`
- Create: `components/footer.html`
- Create: `pages/.gitkeep`
- Create: `assets/images/hero/.gitkeep`
- Create: `assets/images/gallery/.gitkeep`
- Create: `assets/images/attractions/.gitkeep`

**Step 1: Create all directories**

```bash
mkdir -p assets/css assets/js components pages assets/images/hero assets/images/gallery assets/images/attractions
```

**Step 2: Create placeholder files**

Create empty `styles.css`:
```css
/* Custom styles extending Tailwind */
/* Add custom styles here as needed */
```

**Step 3: Commit**

```bash
git add .
git commit -m "chore: create project folder structure"
```

---

## Task 2: Create Component Loader (components.js)

**Files:**
- Create: `assets/js/components.js`

**Step 1: Write components.js**

```javascript
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
```

**Step 2: Commit**

```bash
git add assets/js/components.js
git commit -m "feat: add component loader for shared header/footer"
```

---

## Task 3: Extract Header Component

**Files:**
- Create: `components/header.html`

**Step 1: Write header.html**

Extract lines 50-73 from index.html and update navigation links:

```html
<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <a href="/" class="flex items-center gap-2 text-primary cursor-pointer">
        <span class="material-symbols-outlined text-3xl">cottage</span>
        <span class="text-xl font-bold tracking-tight text-text-main dark:text-white">124 By Moonine</span>
      </a>
      <nav class="hidden md:flex items-center gap-10">
        <a class="text-sm font-semibold text-text-main hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors" href="/pages/about.html">About</a>
        <a class="text-sm font-semibold text-text-main hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors" href="/pages/attractions.html">Attractions</a>
        <a class="text-sm font-semibold text-text-main hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors" href="/pages/gallery.html">Gallery</a>
        <a class="text-sm font-semibold text-text-main hover:text-primary dark:text-gray-200 dark:hover:text-primary transition-colors" href="/pages/contact.html">Contact</a>
      </nav>
      <div class="flex items-center gap-4">
        <a href="https://www.airbnb.com" target="_blank" rel="noopener noreferrer" class="hidden md:flex bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-soft transition-all transform hover:-translate-y-0.5">
          Book Now
        </a>
        <button id="mobile-menu-btn" class="md:hidden p-2 text-text-main dark:text-white">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </div>
  </div>
  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden md:hidden bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
    <nav class="flex flex-col p-4 gap-4">
      <a class="text-sm font-semibold text-text-main hover:text-primary dark:text-gray-200 py-2" href="/pages/about.html">About</a>
      <a class="text-sm font-semibold text-text-main hover:text-primary dark:text-gray-200 py-2" href="/pages/attractions.html">Attractions</a>
      <a class="text-sm font-semibold text-text-main hover:text-primary dark:text-gray-200 py-2" href="/pages/gallery.html">Gallery</a>
      <a class="text-sm font-semibold text-text-main hover:text-primary dark:text-gray-200 py-2" href="/pages/contact.html">Contact</a>
      <a href="https://www.airbnb.com" target="_blank" rel="noopener noreferrer" class="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-bold text-center">
        Book Now
      </a>
    </nav>
  </div>
</header>
```

**Step 2: Commit**

```bash
git add components/header.html
git commit -m "feat: extract header into reusable component"
```

---

## Task 4: Extract Footer Component

**Files:**
- Create: `components/footer.html`

**Step 1: Write footer.html**

Extract lines 407-459 from index.html and add social links:

```html
<footer class="bg-background-dark text-white pt-16 pb-8 border-t border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div class="md:col-span-1">
        <a href="/" class="flex items-center gap-2 mb-6 text-white">
          <span class="material-symbols-outlined text-2xl">cottage</span>
          <span class="text-lg font-bold">124 By Moonine</span>
        </a>
        <p class="text-gray-400 text-sm leading-relaxed mb-6">
          A boutique homestay experience designed for the modern traveler.
        </p>
        <!-- Social Links -->
        <div class="flex gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="Facebook">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="Instagram">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="Airbnb">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.001 18.275c-.768-1.063-1.283-2.054-1.64-2.933-.379-.934-.578-1.727-.578-2.381 0-.654.199-1.16.543-1.483.345-.323.789-.485 1.333-.485h.684c.544 0 .988.162 1.333.485.344.323.543.829.543 1.483 0 .654-.199 1.447-.578 2.381-.357.879-.872 1.87-1.64 2.933zm6.83-3.582c-.129-.323-.398-.581-.749-.71-.351-.129-.741-.113-1.078.043-.338.157-.59.435-.693.77-.296.957-.731 1.845-1.283 2.615-.551.77-1.207 1.427-1.938 1.94-.365.256-.598.65-.633 1.082-.036.432.13.854.45 1.152.32.298.762.431 1.194.363.432-.068.817-.313 1.043-.669.828-.514 1.56-1.134 2.167-1.834.607-.7 1.089-1.48 1.423-2.307.21-.52.231-1.096.057-1.63-.174-.533-.54-.988-1.017-1.263l.057.448zm-13.66 0c.129-.323.398-.581.749-.71.351-.129.741-.113 1.078.043.338.157.59.435.693.77.296.957.731 1.845 1.283 2.615.551.77 1.207 1.427 1.938 1.94.365.256.598.65.633 1.082.036.432-.13.854-.45 1.152-.32.298-.762.431-1.194.363-.432-.068-.817-.313-1.043-.669-.828-.514-1.56-1.134-2.167-1.834-.607-.7-1.089-1.48-1.423-2.307-.21-.52-.231-1.096-.057-1.63.174-.533.54-.988 1.017-1.263l-.057.448zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="WhatsApp">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="Xiaohongshu">
            <span class="text-sm font-bold">RED</span>
          </a>
        </div>
      </div>
      <div>
        <h4 class="font-bold mb-6 text-sm uppercase tracking-wider text-gray-500">Explore</h4>
        <ul class="space-y-3">
          <li><a class="text-gray-300 hover:text-white text-sm transition-colors" href="/pages/about.html">About Us</a></li>
          <li><a class="text-gray-300 hover:text-white text-sm transition-colors" href="/pages/attractions.html">Attractions</a></li>
          <li><a class="text-gray-300 hover:text-white text-sm transition-colors" href="/pages/gallery.html">Gallery</a></li>
          <li><a class="text-gray-300 hover:text-white text-sm transition-colors" href="/pages/contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-6 text-sm uppercase tracking-wider text-gray-500">Contact</h4>
        <ul class="space-y-3">
          <li class="flex items-center gap-2 text-gray-300 text-sm">
            <span class="material-symbols-outlined text-xs">mail</span> hello@moonine.com
          </li>
          <li class="flex items-center gap-2 text-gray-300 text-sm">
            <span class="material-symbols-outlined text-xs">call</span> +1 (555) 123-4567
          </li>
          <li class="flex items-center gap-2 text-gray-300 text-sm">
            <span class="material-symbols-outlined text-xs">location_on</span> 124 Moonine St, City
          </li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-6 text-sm uppercase tracking-wider text-gray-500">Newsletter</h4>
        <div class="flex gap-2">
          <input class="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-full" placeholder="Email address" type="email"/>
          <button class="bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg text-white transition-colors">
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-gray-500 text-xs">© 2024 Moonine Homes. All rights reserved.</p>
      <div class="flex gap-6">
        <a class="text-gray-500 hover:text-white text-xs transition-colors" href="#">Privacy Policy</a>
        <a class="text-gray-500 hover:text-white text-xs transition-colors" href="#">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

**Step 2: Commit**

```bash
git add components/footer.html
git commit -m "feat: extract footer with social links into reusable component"
```

---

## Task 5: Create Map JavaScript (map.js)

**Files:**
- Create: `assets/js/map.js`

**Step 1: Write map.js with placeholder data**

```javascript
/**
 * Map functionality using Leaflet.js and OpenStreetMap
 */

// Placeholder coordinates - UPDATE with actual homestay location
const HOMESTAY_LOCATION = {
  lat: 0.0,  // TODO: Replace with actual latitude
  lng: 0.0,  // TODO: Replace with actual longitude
  name: '124 By Moonine Homes'
};

// Placeholder attraction data - UPDATE with actual attractions
const attractions = {
  food: [
    { id: 1, name: 'Restaurant 1', lat: 0.001, lng: 0.001, image: '/assets/images/attractions/food-1.jpg', description: 'Local cuisine restaurant', distance: '0.5 km' },
    { id: 2, name: 'Restaurant 2', lat: 0.002, lng: -0.001, image: '/assets/images/attractions/food-2.jpg', description: 'Seafood specialty', distance: '0.8 km' },
    { id: 3, name: 'Cafe 1', lat: -0.001, lng: 0.002, image: '/assets/images/attractions/food-3.jpg', description: 'Coffee and pastries', distance: '0.3 km' },
    { id: 4, name: 'Restaurant 3', lat: 0.003, lng: 0.002, image: '/assets/images/attractions/food-4.jpg', description: 'Fine dining', distance: '1.2 km' },
    { id: 5, name: 'Food Court', lat: -0.002, lng: -0.002, image: '/assets/images/attractions/food-5.jpg', description: 'Various local foods', distance: '0.6 km' }
  ],
  attraction: [
    { id: 1, name: 'Beach 1', lat: 0.005, lng: 0.003, image: '/assets/images/attractions/attraction-1.jpg', description: 'Beautiful sandy beach', distance: '2.0 km' },
    { id: 2, name: 'Temple', lat: -0.003, lng: 0.004, image: '/assets/images/attractions/attraction-2.jpg', description: 'Historic temple', distance: '1.5 km' },
    { id: 3, name: 'Park', lat: 0.002, lng: -0.003, image: '/assets/images/attractions/attraction-3.jpg', description: 'City park', distance: '0.8 km' },
    { id: 4, name: 'Museum', lat: -0.004, lng: -0.002, image: '/assets/images/attractions/attraction-4.jpg', description: 'Local history museum', distance: '1.8 km' },
    { id: 5, name: 'Viewpoint', lat: 0.004, lng: 0.005, image: '/assets/images/attractions/attraction-5.jpg', description: 'Scenic viewpoint', distance: '2.5 km' }
  ],
  photoSpot: [
    { id: 1, name: 'Sunset Point', lat: 0.003, lng: -0.004, image: '/assets/images/attractions/photo-1.jpg', description: 'Best sunset views', distance: '1.0 km' },
    { id: 2, name: 'Garden', lat: -0.002, lng: 0.003, image: '/assets/images/attractions/photo-2.jpg', description: 'Flower garden', distance: '0.7 km' },
    { id: 3, name: 'Bridge', lat: 0.001, lng: 0.004, image: '/assets/images/attractions/photo-3.jpg', description: 'Historic bridge', distance: '1.3 km' },
    { id: 4, name: 'Waterfall', lat: -0.005, lng: 0.001, image: '/assets/images/attractions/photo-4.jpg', description: 'Small waterfall', distance: '3.0 km' },
    { id: 5, name: 'Street Art', lat: 0.002, lng: 0.001, image: '/assets/images/attractions/photo-5.jpg', description: 'Colorful murals', distance: '0.4 km' }
  ]
};

let map = null;
let markers = [];
let currentCategory = 'food';

/**
 * Initialize the homepage map
 */
function initHomeMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Initialize map centered on homestay
  map = L.map(containerId).setView([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], 14);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add homestay marker (special style)
  const homestayIcon = L.divIcon({
    className: 'homestay-marker',
    html: '<div class="bg-primary text-white p-2 rounded-full shadow-lg"><span class="material-symbols-outlined">cottage</span></div>',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  L.marker([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], { icon: homestayIcon })
    .addTo(map)
    .bindPopup(`<strong>${HOMESTAY_LOCATION.name}</strong><br>Your homestay`);

  // Load initial category
  showCategory('food');
}

/**
 * Show attractions for a specific category
 */
function showCategory(category) {
  currentCategory = category;

  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Update tab UI
  document.querySelectorAll('.map-tab').forEach(tab => {
    tab.classList.remove('bg-primary', 'text-white');
    tab.classList.add('bg-white', 'text-text-main');
  });
  const activeTab = document.querySelector(`[data-category="${category}"]`);
  if (activeTab) {
    activeTab.classList.remove('bg-white', 'text-text-main');
    activeTab.classList.add('bg-primary', 'text-white');
  }

  // Add markers for category
  const categoryAttractions = attractions[category] || [];
  categoryAttractions.forEach(attraction => {
    // Create custom image marker
    const customIcon = L.divIcon({
      className: 'attraction-marker',
      html: `<div class="w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white">
        <img src="${attraction.image}" alt="${attraction.name}" class="w-full h-full object-cover" onerror="this.src='/assets/images/attractions/placeholder.jpg'">
      </div>`,
      iconSize: [64, 64],
      iconAnchor: [32, 32]
    });

    const marker = L.marker([attraction.lat, attraction.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div class="text-center p-2">
          <img src="${attraction.image}" alt="${attraction.name}" class="w-32 h-24 object-cover rounded-lg mb-2" onerror="this.style.display='none'">
          <h4 class="font-bold text-text-main">${attraction.name}</h4>
          <p class="text-sm text-text-muted">${attraction.description}</p>
          <p class="text-xs text-primary font-semibold mt-1">${attraction.distance} from homestay</p>
        </div>
      `);

    markers.push(marker);
  });
}

/**
 * Initialize the attractions page map (standard markers)
 */
function initAttractionsPageMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  map = L.map(containerId).setView([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add homestay marker
  L.marker([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng])
    .addTo(map)
    .bindPopup(`<strong>${HOMESTAY_LOCATION.name}</strong>`);

  // Add all attractions with standard markers
  Object.entries(attractions).forEach(([category, items]) => {
    items.forEach(attraction => {
      L.marker([attraction.lat, attraction.lng])
        .addTo(map)
        .bindPopup(`
          <strong>${attraction.name}</strong><br>
          ${attraction.description}<br>
          <em>${attraction.distance}</em>
        `);
    });
  });
}

// Export functions for use in HTML
window.initHomeMap = initHomeMap;
window.initAttractionsPageMap = initAttractionsPageMap;
window.showCategory = showCategory;
```

**Step 2: Commit**

```bash
git add assets/js/map.js
git commit -m "feat: add map.js with Leaflet integration and placeholder data"
```

---

## Task 6: Refactor index.html

**Files:**
- Modify: `index.html`

**Step 1: Update index.html**

Replace header (lines 50-73) with:
```html
<div id="header" class="min-h-[80px]"></div>
```

Replace footer (lines 407-459) with:
```html
<div id="footer"></div>
```

Add Leaflet CSS in `<head>` (after line 8):
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

Add scripts before closing `</body>`:
```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="/assets/js/components.js"></script>
<script src="/assets/js/map.js"></script>
```

**Step 2: Replace the existing attractions section (id="attractions") with interactive map section**

Replace lines 289-377 with new map section:
```html
<section class="py-24 bg-background-card/50 dark:bg-white/5" id="attractions">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-12">
      <div class="flex items-center justify-center gap-2 text-secondary font-bold text-sm tracking-wide uppercase mb-3">
        <span class="w-8 h-[2px] bg-secondary"></span>
        Nearby
        <span class="w-8 h-[2px] bg-secondary"></span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-4">Explore the Neighborhood</h2>
      <p class="text-text-muted dark:text-gray-400">Discover amazing places just minutes from your doorstep.</p>
    </div>

    <!-- Category Tabs -->
    <div class="flex justify-center gap-4 mb-8">
      <button class="map-tab bg-primary text-white px-6 py-3 rounded-full font-semibold transition-all" data-category="food" onclick="showCategory('food')">
        <span class="material-symbols-outlined align-middle mr-1">restaurant</span> Food
      </button>
      <button class="map-tab bg-white text-text-main px-6 py-3 rounded-full font-semibold transition-all shadow-sm" data-category="attraction" onclick="showCategory('attraction')">
        <span class="material-symbols-outlined align-middle mr-1">photo_camera</span> Attractions
      </button>
      <button class="map-tab bg-white text-text-main px-6 py-3 rounded-full font-semibold transition-all shadow-sm" data-category="photoSpot" onclick="showCategory('photoSpot')">
        <span class="material-symbols-outlined align-middle mr-1">landscape</span> Photo Spots
      </button>
    </div>

    <!-- Map Container -->
    <div id="home-map" class="w-full h-[500px] rounded-2xl overflow-hidden shadow-soft"></div>

    <!-- Explore More Button -->
    <div class="text-center mt-8">
      <a href="/pages/attractions.html" class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-0.5">
        Explore All Attractions
        <span class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>
  </div>
</section>
```

**Step 3: Add map initialization script before closing `</body>`**

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load, then init map
    setTimeout(() => {
      if (typeof initHomeMap === 'function') {
        initHomeMap('home-map');
      }
    }, 100);
  });
</script>
```

**Step 4: Update all internal navigation links**

Update "Book Now" buttons to link to Airbnb:
```html
<a href="https://www.airbnb.com" target="_blank" rel="noopener noreferrer">Book Now</a>
```

**Step 5: Commit**

```bash
git add index.html
git commit -m "refactor: update index.html to use shared components and map section"
```

---

## Task 7: Create About Page

**Files:**
- Create: `pages/about.html`

**Step 1: Write about.html**

```html
<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>About - 124 By Moonine Homes</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#376d64",
            "primary-dark": "#2a524b",
            "secondary": "#D9886E",
            "background-light": "#fbfaf8",
            "background-card": "#F6F0EB",
            "background-dark": "#161c1b",
            "text-main": "#131615",
            "text-muted": "#5C6664",
          },
          fontFamily: {
            "display": ["Manrope", "sans-serif"],
            "sans": ["Manrope", "sans-serif"],
          },
          borderRadius: {"DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
          boxShadow: {
            "soft": "0 20px 40px -15px rgba(55, 109, 100, 0.1)",
            "glow": "0 0 40px -10px rgba(217, 136, 110, 0.15)",
          }
        },
      },
    }
  </script>
  <style>
    html { scroll-behavior: smooth; }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-text-main font-display antialiased">
  <div id="header" class="min-h-[80px]"></div>

  <!-- Page Content -->
  <main class="pt-20">
    <!-- Hero Section -->
    <section class="py-16 bg-background-card/50">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-text-main mb-6">About Us</h1>
        <p class="text-lg text-text-muted">Learn more about 124 By Moonine Homes and your hosts.</p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-text-main mb-6">Our Story</h2>
        <p class="text-text-muted leading-relaxed mb-6">
          Welcome to 124 By Moonine Homes, a boutique homestay designed for travelers seeking comfort, style, and a true sense of home. Our journey began with a simple vision: to create a space where guests can experience the warmth of local hospitality while enjoying modern amenities.
        </p>
        <p class="text-text-muted leading-relaxed">
          Every corner of our home has been thoughtfully designed with our guests in mind, from the serene mid-century modern aesthetic to the carefully curated amenities that make your stay memorable.
        </p>
      </div>
    </section>

    <!-- Amenities Section -->
    <section class="py-20 bg-background-card/50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-text-main mb-12 text-center">Amenities</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-2xl text-center">
            <span class="material-symbols-outlined text-3xl text-primary mb-3">wifi</span>
            <h3 class="font-bold">High-Speed WiFi</h3>
            <p class="text-sm text-text-muted">300 Mbps fiber optic</p>
          </div>
          <div class="bg-white p-6 rounded-2xl text-center">
            <span class="material-symbols-outlined text-3xl text-primary mb-3">local_parking</span>
            <h3 class="font-bold">Free Parking</h3>
            <p class="text-sm text-text-muted">Secure spot included</p>
          </div>
          <div class="bg-white p-6 rounded-2xl text-center">
            <span class="material-symbols-outlined text-3xl text-primary mb-3">ac_unit</span>
            <h3 class="font-bold">Air Conditioning</h3>
            <p class="text-sm text-text-muted">Climate control</p>
          </div>
          <div class="bg-white p-6 rounded-2xl text-center">
            <span class="material-symbols-outlined text-3xl text-primary mb-3">coffee_maker</span>
            <h3 class="font-bold">Coffee Bar</h3>
            <p class="text-sm text-text-muted">Premium local beans</p>
          </div>
        </div>
      </div>
    </section>

    <!-- House Rules Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-text-main mb-8">House Rules</h2>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary">check_circle</span>
            <span class="text-text-muted">Check-in: 3:00 PM - 10:00 PM</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary">check_circle</span>
            <span class="text-text-muted">Check-out: 11:00 AM</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary">check_circle</span>
            <span class="text-text-muted">No smoking inside the property</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary">check_circle</span>
            <span class="text-text-muted">Pets allowed upon request</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary">check_circle</span>
            <span class="text-text-muted">Quiet hours: 10:00 PM - 8:00 AM</span>
          </li>
        </ul>
      </div>
    </section>
  </main>

  <div id="footer"></div>

  <script src="/assets/js/components.js"></script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add pages/about.html
git commit -m "feat: create about page"
```

---

## Task 8: Create Gallery Page

**Files:**
- Create: `pages/gallery.html`

**Step 1: Write gallery.html**

```html
<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Gallery - 124 By Moonine Homes</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#376d64",
            "primary-dark": "#2a524b",
            "secondary": "#D9886E",
            "background-light": "#fbfaf8",
            "background-card": "#F6F0EB",
            "background-dark": "#161c1b",
            "text-main": "#131615",
            "text-muted": "#5C6664",
          },
          fontFamily: {
            "display": ["Manrope", "sans-serif"],
            "sans": ["Manrope", "sans-serif"],
          },
          borderRadius: {"DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
          boxShadow: {
            "soft": "0 20px 40px -15px rgba(55, 109, 100, 0.1)",
            "glow": "0 0 40px -10px rgba(217, 136, 110, 0.15)",
          }
        },
      },
    }
  </script>
  <style>
    html { scroll-behavior: smooth; }
    .lightbox { display: none; }
    .lightbox.active { display: flex; }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-text-main font-display antialiased">
  <div id="header" class="min-h-[80px]"></div>

  <main class="pt-20">
    <!-- Hero Section -->
    <section class="py-16 bg-background-card/50">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-text-main mb-6">Gallery</h1>
        <p class="text-lg text-text-muted">Take a visual tour of 124 By Moonine Homes.</p>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <!-- Placeholder gallery items - replace with actual images -->
          <div class="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer group" onclick="openLightbox(this)">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('/assets/images/gallery/1.jpg');">
              <div class="w-full h-full bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl">zoom_in</span>
              </div>
            </div>
          </div>
          <div class="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer group" onclick="openLightbox(this)">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('/assets/images/gallery/2.jpg');"></div>
          </div>
          <div class="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer group" onclick="openLightbox(this)">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('/assets/images/gallery/3.jpg');"></div>
          </div>
          <div class="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer group" onclick="openLightbox(this)">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('/assets/images/gallery/4.jpg');"></div>
          </div>
          <div class="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer group" onclick="openLightbox(this)">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('/assets/images/gallery/5.jpg');"></div>
          </div>
          <div class="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer group" onclick="openLightbox(this)">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('/assets/images/gallery/6.jpg');"></div>
          </div>
          <div class="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer group" onclick="openLightbox(this)">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('/assets/images/gallery/7.jpg');"></div>
          </div>
          <div class="aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer group" onclick="openLightbox(this)">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('/assets/images/gallery/8.jpg');"></div>
          </div>
        </div>
        <p class="text-center text-text-muted mt-8">Add your images to /assets/images/gallery/</p>
      </div>
    </section>
  </main>

  <!-- Lightbox -->
  <div id="lightbox" class="lightbox fixed inset-0 bg-black/90 z-50 items-center justify-center p-4" onclick="closeLightbox()">
    <button class="absolute top-4 right-4 text-white text-4xl">&times;</button>
    <img id="lightbox-img" src="" alt="Gallery image" class="max-w-full max-h-full object-contain">
  </div>

  <div id="footer"></div>

  <script src="/assets/js/components.js"></script>
  <script>
    function openLightbox(element) {
      const bgImage = element.querySelector('[style*="background-image"]');
      if (bgImage) {
        const url = bgImage.style.backgroundImage.replace(/url\(['"]?/, '').replace(/['"]?\)/, '');
        document.getElementById('lightbox-img').src = url;
        document.getElementById('lightbox').classList.add('active');
      }
    }

    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('active');
    }
  </script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add pages/gallery.html
git commit -m "feat: create gallery page with lightbox"
```

---

## Task 9: Create Attractions Page

**Files:**
- Create: `pages/attractions.html`

**Step 1: Write attractions.html**

```html
<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Attractions - 124 By Moonine Homes</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#376d64",
            "primary-dark": "#2a524b",
            "secondary": "#D9886E",
            "background-light": "#fbfaf8",
            "background-card": "#F6F0EB",
            "background-dark": "#161c1b",
            "text-main": "#131615",
            "text-muted": "#5C6664",
          },
          fontFamily: {
            "display": ["Manrope", "sans-serif"],
            "sans": ["Manrope", "sans-serif"],
          },
          borderRadius: {"DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
          boxShadow: {
            "soft": "0 20px 40px -15px rgba(55, 109, 100, 0.1)",
            "glow": "0 0 40px -10px rgba(217, 136, 110, 0.15)",
          }
        },
      },
    }
  </script>
  <style>
    html { scroll-behavior: smooth; }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-text-main font-display antialiased">
  <div id="header" class="min-h-[80px]"></div>

  <main class="pt-20">
    <!-- Hero Section -->
    <section class="py-16 bg-background-card/50">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-text-main mb-6">Nearby Attractions</h1>
        <p class="text-lg text-text-muted">Discover amazing places around 124 By Moonine Homes.</p>
      </div>
    </section>

    <!-- Map + List Section -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Map -->
          <div class="lg:sticky lg:top-24 h-[500px] lg:h-[calc(100vh-120px)]">
            <div id="attractions-map" class="w-full h-full rounded-2xl overflow-hidden shadow-soft"></div>
          </div>

          <!-- List -->
          <div class="space-y-8">
            <!-- Food Category -->
            <div>
              <h2 class="text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">restaurant</span> Food & Dining
              </h2>
              <div class="space-y-4" id="food-list">
                <!-- Populated by JavaScript -->
              </div>
            </div>

            <!-- Attractions Category -->
            <div>
              <h2 class="text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">photo_camera</span> Attractions
              </h2>
              <div class="space-y-4" id="attraction-list">
                <!-- Populated by JavaScript -->
              </div>
            </div>

            <!-- Photo Spots Category -->
            <div>
              <h2 class="text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">landscape</span> Photo Spots
              </h2>
              <div class="space-y-4" id="photoSpot-list">
                <!-- Populated by JavaScript -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div id="footer"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="/assets/js/components.js"></script>
  <script src="/assets/js/map.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        if (typeof initAttractionsPageMap === 'function') {
          initAttractionsPageMap('attractions-map');
        }

        // Populate lists
        const categories = ['food', 'attraction', 'photoSpot'];
        categories.forEach(category => {
          const list = document.getElementById(`${category}-list`);
          const items = attractions[category] || [];

          items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl p-4 shadow-sm hover:shadow-soft transition-shadow flex gap-4';
            card.innerHTML = `
              <div class="flex-1">
                <h3 class="font-bold text-text-main">${item.name}</h3>
                <p class="text-sm text-text-muted">${item.description}</p>
                <p class="text-xs text-primary font-semibold mt-1">${item.distance} from homestay</p>
              </div>
            `;
            list.appendChild(card);
          });
        });
      }, 100);
    });
  </script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add pages/attractions.html
git commit -m "feat: create attractions page with map and list view"
```

---

## Task 10: Create Contact Page

**Files:**
- Create: `pages/contact.html`

**Step 1: Write contact.html**

```html
<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Contact - 124 By Moonine Homes</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#376d64",
            "primary-dark": "#2a524b",
            "secondary": "#D9886E",
            "background-light": "#fbfaf8",
            "background-card": "#F6F0EB",
            "background-dark": "#161c1b",
            "text-main": "#131615",
            "text-muted": "#5C6664",
          },
          fontFamily: {
            "display": ["Manrope", "sans-serif"],
            "sans": ["Manrope", "sans-serif"],
          },
          borderRadius: {"DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px"},
          boxShadow: {
            "soft": "0 20px 40px -15px rgba(55, 109, 100, 0.1)",
            "glow": "0 0 40px -10px rgba(217, 136, 110, 0.15)",
          }
        },
      },
    }
  </script>
  <style>
    html { scroll-behavior: smooth; }
  </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-text-main font-display antialiased">
  <div id="header" class="min-h-[80px]"></div>

  <main class="pt-20">
    <!-- Hero Section -->
    <section class="py-16 bg-background-card/50">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-text-main mb-6">Contact Us</h1>
        <p class="text-lg text-text-muted">Get in touch or find us on the map.</p>
      </div>
    </section>

    <!-- Contact Info + Map -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div>
            <h2 class="text-2xl font-bold text-text-main mb-8">Get In Touch</h2>

            <div class="space-y-6">
              <!-- WhatsApp -->
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-soft transition-all group">
                <div class="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <h3 class="font-bold text-text-main group-hover:text-primary transition-colors">WhatsApp</h3>
                  <p class="text-sm text-text-muted">+1 (234) 567-890</p>
                </div>
              </a>

              <!-- Email -->
              <a href="mailto:hello@moonine.com" class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-soft transition-all group">
                <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                  <span class="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h3 class="font-bold text-text-main group-hover:text-primary transition-colors">Email</h3>
                  <p class="text-sm text-text-muted">hello@moonine.com</p>
                </div>
              </a>

              <!-- Address -->
              <div class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div class="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center">
                  <span class="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 class="font-bold text-text-main">Address</h3>
                  <p class="text-sm text-text-muted">124 Moonine Street, City, Country</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-12">
              <h3 class="font-bold text-text-main mb-4">Follow Us</h3>
              <div class="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                  <span class="text-sm font-bold">RED</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Map -->
          <div>
            <div id="contact-map" class="w-full h-[400px] rounded-2xl overflow-hidden shadow-soft"></div>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:underline">
              <span class="material-symbols-outlined">directions</span> Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div id="footer"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="/assets/js/components.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        // TODO: Replace with actual coordinates
        const lat = 0.0;
        const lng = 0.0;

        const map = L.map('contact-map').setView([lat, lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
          .bindPopup('<strong>124 By Moonine Homes</strong>')
          .openPopup();
      }, 100);
    });
  </script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add pages/contact.html
git commit -m "feat: create contact page with map and social links"
```

---

## Task 11: Add Mobile Menu JavaScript

**Files:**
- Modify: `assets/js/components.js`

**Step 1: Add mobile menu toggle functionality**

Add after the DOMContentLoaded event listener:

```javascript
// Mobile menu toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('#mobile-menu-btn')) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }
});
```

**Step 2: Commit**

```bash
git add assets/js/components.js
git commit -m "feat: add mobile menu toggle functionality"
```

---

## Task 12: Create Placeholder Image

**Files:**
- Create: `assets/images/attractions/placeholder.jpg`

**Step 1: Create a simple placeholder**

For now, we'll note this needs to be added manually. Create a simple gray placeholder image (400x400) or use a service like placeholder.com.

**Step 2: Commit any images added**

```bash
git add assets/images/
git commit -m "chore: add placeholder images"
```

---

## Task 13: Final Testing & Cleanup

**Step 1: Start local server**

```bash
python -m http.server 8080
```

**Step 2: Test all pages**

- [ ] Homepage loads with header/footer
- [ ] Map section displays with category tabs
- [ ] About page loads correctly
- [ ] Gallery page loads with lightbox
- [ ] Attractions page shows map + list
- [ ] Contact page shows map and contact info
- [ ] Mobile menu works on all pages
- [ ] All navigation links work

**Step 3: Final commit**

```bash
git add .
git commit -m "chore: project restructure complete"
```

---

## Summary

After completing all tasks, the project will have:
- Organized folder structure
- Shared header/footer components
- 5 pages: Home, About, Gallery, Attractions, Contact
- Interactive map on homepage with category tabs
- Full attractions page with map + list
- Social links (Facebook, Instagram, Airbnb, WhatsApp, Xiaohongshu)
- Mobile-responsive navigation

**Next steps for the user:**
1. Replace placeholder coordinates in `map.js` with actual location
2. Add actual attraction data
3. Add images to `/assets/images/` folders
4. Update social media links with actual URLs
5. Update contact information
