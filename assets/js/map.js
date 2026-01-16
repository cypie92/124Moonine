/**
 * Map functionality using Leaflet.js and OpenStreetMap
 * Location: Taiping, Perak, Malaysia
 */

// Get base path for assets (handles GitHub Pages subdirectory)
function getMapBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '..';
  }
  return '.';
}

const MAP_BASE = getMapBasePath();

// Homestay coordinates
const HOMESTAY_LOCATION = {
  lat: 4.8688581,
  lng: 100.7278357,
  name: '124 By Moonine Homes',
  image: `${MAP_BASE}/assets/images/homestay-marker.jpg`,
  mapUrl: 'https://maps.app.goo.gl/kdjP9qjCCXb7RqBb7'
};

// Attraction data organized by category
// Add more attractions as needed - just follow the same format
const attractions = {
  food: [
    { id: 1, name: 'Larut Matang Hawker Center', lat: 4.8550, lng: 100.7350, image: `${MAP_BASE}/assets/images/attractions/food-1.jpg`, description: 'Famous local hawker center with variety of food', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/LQvQzqJfZPTBqiPG6' },
    { id: 2, name: 'AEON Mall Taiping', lat: 4.8580, lng: 100.7180, image: `${MAP_BASE}/assets/images/attractions/food-2.jpg`, description: 'Shopping mall with food court & restaurants', distance: '2 min drive', mapUrl: 'https://maps.app.goo.gl/yGvJnwxF4q5RQGFG7' },
    { id: 3, name: 'Taiping Sentral Mall', lat: 4.8620, lng: 100.7250, image: `${MAP_BASE}/assets/images/attractions/food-3.jpg`, description: 'Local mall with dining options', distance: '2 min drive', mapUrl: 'https://maps.app.goo.gl/Bw8qMaLFEpmxJh6C9' },
    { id: 4, name: 'Lotus Taiping', lat: 4.8590, lng: 100.7200, image: `${MAP_BASE}/assets/images/attractions/food-4.jpg`, description: 'Hypermarket with food stalls nearby', distance: '2 min drive', mapUrl: 'https://maps.app.goo.gl/C1uyAb3v5YkdMJwH8' },
    { id: 5, name: 'Ansari Famous Cendol', lat: 4.8545, lng: 100.7395, image: `${MAP_BASE}/assets/images/attractions/food-5.jpg`, description: 'Famous local dessert spot', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/8LkKqnfD3mZyv9YJ6' }
  ],
  attraction: [
    { id: 1, name: 'Zoo Taiping & Night Safari', lat: 4.8550004, lng: 100.7484571, image: `${MAP_BASE}/assets/images/attractions/taiping zoo garden.webp`, description: 'Malaysia\'s first night safari zoo', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/TcVcMwzSDNtrfEbP7' },
    { id: 2, name: 'Taiping Lake Gardens', lat: 4.8540, lng: 100.7440, image: `${MAP_BASE}/assets/images/attractions/taiping_lake_garden.webp`, description: 'Beautiful lake gardens, oldest in Malaysia', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/HFPKAf5NVs9PWGbm8' },
    { id: 3, name: 'Perak Museum', lat: 4.8604233, lng: 100.742802, image: `${MAP_BASE}/assets/images/attractions/perak_museum.webp`, description: 'Oldest museum in Malaysia', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/FM9PQd8J7AEZ8iYf9' },
    { id: 4, name: 'Clock Tower', lat: 4.8532907, lng: 100.7405346, image: `${MAP_BASE}/assets/images/attractions/clock_tower.png`, description: 'Historic British-era landmark', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/FSKtBA2aUfDoYs4r9' },
    { id: 5, name: 'Dataran Warisan Taiping', lat: 4.8542228, lng: 100.7408228, image: `${MAP_BASE}/assets/images/attractions/dataran_warisan.webp`, description: 'Heritage Square of Taiping', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/q3h2Hckqs1eWmDgm8' }
  ],
  photoSpot: [
    { id: 1, name: 'Rain Tree Walk', lat: 4.8530, lng: 100.7360, image: `${MAP_BASE}/assets/images/attractions/taiping_lake_garden.webp`, description: 'Iconic tree-lined path at Lake Gardens', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/HFPKAf5NVs9PWGbm8' },
    { id: 2, name: 'Taiping Clock Tower', lat: 4.8532907, lng: 100.7405346, image: `${MAP_BASE}/assets/images/attractions/clock_tower.png`, description: 'Historic British-era landmark', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/FSKtBA2aUfDoYs4r9' },
    { id: 3, name: 'Perak Museum', lat: 4.8604233, lng: 100.742802, image: `${MAP_BASE}/assets/images/attractions/perak_museum.webp`, description: 'Oldest museum in Malaysia', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/FM9PQd8J7AEZ8iYf9' },
    { id: 4, name: 'Dataran Warisan', lat: 4.8542228, lng: 100.7408228, image: `${MAP_BASE}/assets/images/attractions/dataran_warisan.webp`, description: 'Heritage Square of Taiping', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/q3h2Hckqs1eWmDgm8' },
    { id: 5, name: 'Zoo Taiping', lat: 4.8550004, lng: 100.7484571, image: `${MAP_BASE}/assets/images/attractions/taiping zoo garden.webp`, description: 'Malaysia\'s first night safari zoo', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/TcVcMwzSDNtrfEbP7' }
  ]
};

let map = null;
let markers = [];
let currentCategory = 'attraction';

/**
 * Initialize the homepage map with category tabs
 */
function initHomeMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Initialize map centered on homestay
  map = L.map(containerId).setView([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], 14);

  // Add minimalist CartoDB Positron tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Add homestay marker with custom image - circular with dark green border and "You are here" indicator
  const homestayIcon = L.divIcon({
    className: 'homestay-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img src="${HOMESTAY_LOCATION.image}" alt="${HOMESTAY_LOCATION.name}" style="width: 85px; height: 85px; object-fit: cover; border-radius: 50%; border: 5px solid #376d64; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
        <span style="background: #376d64; color: white; font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 10px; margin-top: 4px; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">You are here</span>
      </div>
    `,
    iconSize: [95, 115],
    iconAnchor: [47, 55]
  });

  L.marker([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], { icon: homestayIcon })
    .addTo(map)
    .bindPopup(`
      <div style="text-align: center; padding: 0; width: 200px;">
        <img src="${HOMESTAY_LOCATION.image}" alt="${HOMESTAY_LOCATION.name}" style="width: 200px; height: 200px; object-fit: cover; display: block;" onerror="this.style.display='none'">
        <div style="padding: 12px;">
          <h4 style="font-weight: bold; margin: 0 0 6px 0; color: #131615; font-size: 15px;">${HOMESTAY_LOCATION.name}</h4>
          <p style="font-size: 13px; color: #5C6664; margin: 0 0 12px 0;">Your homestay</p>
          <a href="${HOMESTAY_LOCATION.mapUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; background: #376d64; color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-size: 13px; font-weight: 600;">
            <span style="font-size: 16px;">&#x2197;</span> Directions
          </a>
        </div>
      </div>
    `, { maxWidth: 220, className: 'custom-popup' });

  // Load initial category
  showCategory('attraction');
}

/**
 * Show attractions for a specific category
 */
function showCategory(category) {
  if (!map) return;

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
    // Create custom image marker - circular with dark green border
    const customIcon = L.divIcon({
      className: 'attraction-marker',
      html: `<img src="${attraction.image}" alt="${attraction.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 50%; border: 4px solid #376d64; box-shadow: 0 4px 12px rgba(0,0,0,0.3);" onerror="this.outerHTML='<div style=\\'width:70px;height:70px;border-radius:50%;border:4px solid #376d64;display:flex;align-items:center;justify-content:center;background:#376d64;color:white;box-shadow:0 4px 12px rgba(0,0,0,0.3);\\'><span class=\\'material-symbols-outlined\\'>place</span></div>'">`,
      iconSize: [78, 78],
      iconAnchor: [39, 39]
    });

    const marker = L.marker([attraction.lat, attraction.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; padding: 0; width: 200px;">
          <img src="${attraction.image}" alt="${attraction.name}" style="width: 200px; height: 200px; object-fit: cover; display: block;" onerror="this.style.display='none'">
          <div style="padding: 12px;">
            <h4 style="font-weight: bold; margin: 0 0 6px 0; color: #131615; font-size: 15px;">${attraction.name}</h4>
            <p style="font-size: 13px; color: #5C6664; margin: 0 0 8px 0; line-height: 1.4;">${attraction.description}</p>
            <p style="font-size: 12px; color: #376d64; font-weight: 600; margin: 0 0 12px 0;">${attraction.distance} from homestay</p>
            <a href="${attraction.mapUrl || `https://www.google.com/maps/search/?api=1&query=${attraction.lat},${attraction.lng}`}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; background: #376d64; color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-size: 13px; font-weight: 600;">
              <span style="font-size: 16px;">&#x2197;</span> Explore
            </a>
          </div>
        </div>
      `, { maxWidth: 220, className: 'custom-popup' });

    markers.push(marker);
  });

  // Fit bounds to show all markers
  if (markers.length > 0) {
    const group = new L.featureGroup([
      L.marker([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng]),
      ...markers
    ]);
    map.fitBounds(group.getBounds().pad(0.1));
  }
}

/**
 * Initialize the attractions page map (standard markers)
 */
function initAttractionsPageMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const attractionsMap = L.map(containerId).setView([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(attractionsMap);

  // Add homestay marker with custom image
  const homestayIcon = L.divIcon({
    className: 'homestay-marker',
    html: `<img src="${HOMESTAY_LOCATION.image}" alt="${HOMESTAY_LOCATION.name}" style="width: 80px; height: 80px; object-fit: contain; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">`,
    iconSize: [80, 80],
    iconAnchor: [40, 40]
  });

  L.marker([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], { icon: homestayIcon })
    .addTo(attractionsMap)
    .bindPopup(`
      <div style="text-align: center; padding: 12px;">
        <h4 style="font-weight: bold; margin: 0 0 8px 0; color: #131615;">${HOMESTAY_LOCATION.name}</h4>
        <a href="${HOMESTAY_LOCATION.mapUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; background: #376d64; color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-size: 13px; font-weight: 600;">
          <span style="font-size: 16px;">&#x2197;</span> Directions
        </a>
      </div>
    `, { className: 'custom-popup' });

  // Category colors
  const categoryColors = {
    food: '#D9886E',
    attraction: '#376d64',
    photoSpot: '#6B7280'
  };

  // Add all attractions with colored markers
  Object.entries(attractions).forEach(([category, items]) => {
    const color = categoryColors[category] || '#376d64';

    items.forEach(attraction => {
      const icon = L.divIcon({
        className: 'category-marker',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      L.marker([attraction.lat, attraction.lng], { icon: icon })
        .addTo(attractionsMap)
        .bindPopup(`
          <strong>${attraction.name}</strong><br>
          ${attraction.description}<br>
          <em style="color: #376d64;">${attraction.distance}</em>
        `);
    });
  });
}

/**
 * Initialize contact page map
 */
function initContactMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const contactMap = L.map(containerId).setView([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], 15);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(contactMap);

  // Add homestay marker with custom image
  const contactHomestayIcon = L.divIcon({
    className: 'homestay-marker',
    html: `<img src="${HOMESTAY_LOCATION.image}" alt="${HOMESTAY_LOCATION.name}" style="width: 100px; height: 100px; object-fit: contain; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">`,
    iconSize: [100, 100],
    iconAnchor: [50, 50]
  });

  L.marker([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], { icon: contactHomestayIcon })
    .addTo(contactMap)
    .bindPopup(`
      <div style="text-align: center; padding: 12px;">
        <h4 style="font-weight: bold; margin: 0 0 8px 0; color: #131615;">${HOMESTAY_LOCATION.name}</h4>
        <a href="${HOMESTAY_LOCATION.mapUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; background: #376d64; color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-size: 13px; font-weight: 600;">
          <span style="font-size: 16px;">&#x2197;</span> Directions
        </a>
      </div>
    `, { className: 'custom-popup' })
    .openPopup();
}

// Export functions for use in HTML
window.initHomeMap = initHomeMap;
window.initAttractionsPageMap = initAttractionsPageMap;
window.initContactMap = initContactMap;
window.showCategory = showCategory;
window.attractions = attractions;
