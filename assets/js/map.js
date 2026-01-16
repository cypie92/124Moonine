/**
 * Map functionality using Leaflet.js and OpenStreetMap
 * Location: Taiping, Perak, Malaysia
 */

// Homestay coordinates
const HOMESTAY_LOCATION = {
  lat: 4.8688777,
  lng: 100.7253366,
  name: '124 By Moonine Homes'
};

// Attraction data organized by category
// Add more attractions as needed - just follow the same format
const attractions = {
  food: [
    { id: 1, name: 'Local Restaurant 1', lat: 4.8700, lng: 100.7280, image: '/assets/images/attractions/food-1.jpg', description: 'Authentic local cuisine', distance: '0.5 km' },
    { id: 2, name: 'Cafe Taiping', lat: 4.8675, lng: 100.7220, image: '/assets/images/attractions/food-2.jpg', description: 'Coffee and pastries', distance: '0.4 km' },
    { id: 3, name: 'Hawker Center', lat: 4.8710, lng: 100.7240, image: '/assets/images/attractions/food-3.jpg', description: 'Street food paradise', distance: '0.6 km' },
    { id: 4, name: 'Seafood Restaurant', lat: 4.8660, lng: 100.7270, image: '/assets/images/attractions/food-4.jpg', description: 'Fresh seafood daily', distance: '0.8 km' },
    { id: 5, name: 'Dessert House', lat: 4.8695, lng: 100.7230, image: '/assets/images/attractions/food-5.jpg', description: 'Local desserts & sweets', distance: '0.3 km' }
  ],
  attraction: [
    { id: 1, name: 'Zoo Taiping & Night Safari', lat: 4.8550004, lng: 100.7484571, image: '/assets/images/attractions/zoo-taiping.png', description: 'Malaysia\'s first night safari zoo', distance: '3.0 km' },
    { id: 2, name: 'Perak Museum', lat: 4.8604233, lng: 100.742802, image: '/assets/images/attractions/perak-museum.png', description: 'Oldest museum in Malaysia', distance: '2.1 km' },
    { id: 3, name: 'Clock Tower', lat: 4.8532907, lng: 100.7405346, image: '/assets/images/attractions/clock-tower.png', description: 'Historic Taiping landmark', distance: '2.3 km' },
    { id: 4, name: 'Dataran Warisan Taiping', lat: 4.8542228, lng: 100.7408228, image: '/assets/images/attractions/dataran-warisan.png', description: 'Heritage Square of Taiping', distance: '2.3 km' }
  ],
  photoSpot: [
    { id: 1, name: 'Rain Tree Walk', lat: 4.8530, lng: 100.7360, image: '/assets/images/attractions/photo-1.jpg', description: 'Iconic tree-lined path', distance: '2.3 km' },
    { id: 2, name: 'Antong Coffee Mill', lat: 4.8720, lng: 100.7150, image: '/assets/images/attractions/photo-2.jpg', description: 'Traditional coffee factory', distance: '1.5 km' },
    { id: 3, name: 'Taiping Clock Tower', lat: 4.8505, lng: 100.7340, image: '/assets/images/attractions/photo-3.jpg', description: 'Historic landmark', distance: '2.2 km' },
    { id: 4, name: 'Spritzer EcoPark', lat: 4.8400, lng: 100.7100, image: '/assets/images/attractions/photo-4.jpg', description: 'Natural eco park', distance: '4.0 km' },
    { id: 5, name: 'Kuala Sepetang', lat: 4.8400, lng: 100.6300, image: '/assets/images/attractions/photo-5.jpg', description: 'Fishing village & mangroves', distance: '12 km' }
  ]
};

let map = null;
let markers = [];
let currentCategory = 'food';

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

  // Add homestay marker (special style)
  const homestayIcon = L.divIcon({
    className: 'homestay-marker',
    html: `<div style="background-color: #376d64; color: white; padding: 8px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
      <span class="material-symbols-outlined" style="font-size: 20px;">cottage</span>
    </div>`,
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
    // Create custom image marker - larger size (90x90)
    const customIcon = L.divIcon({
      className: 'attraction-marker',
      html: `<div style="width: 90px; height: 90px; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.35); border: 4px solid white; background: #f0f0f0;">
        <img src="${attraction.image}" alt="${attraction.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#376d64;color:white;\\'><span class=\\'material-symbols-outlined\\'>place</span></div>'">
      </div>`,
      iconSize: [90, 90],
      iconAnchor: [45, 45]
    });

    const marker = L.marker([attraction.lat, attraction.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; padding: 12px; width: 220px;">
          <img src="${attraction.image}" alt="${attraction.name}" style="width: 200px; height: 140px; object-fit: cover; border-radius: 12px; margin-bottom: 12px; display: block;" onerror="this.style.display='none'">
          <h4 style="font-weight: bold; margin: 0 0 6px 0; color: #131615; font-size: 15px;">${attraction.name}</h4>
          <p style="font-size: 13px; color: #5C6664; margin: 0 0 6px 0; line-height: 1.4;">${attraction.description}</p>
          <p style="font-size: 12px; color: #376d64; font-weight: 600; margin: 0;">${attraction.distance} from homestay</p>
        </div>
      `, { maxWidth: 250 });

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

  // Add homestay marker
  const homestayIcon = L.divIcon({
    className: 'homestay-marker',
    html: `<div style="background-color: #376d64; color: white; padding: 8px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
      <span class="material-symbols-outlined" style="font-size: 20px;">cottage</span>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  L.marker([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng], { icon: homestayIcon })
    .addTo(attractionsMap)
    .bindPopup(`<strong>${HOMESTAY_LOCATION.name}</strong>`);

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

  L.marker([HOMESTAY_LOCATION.lat, HOMESTAY_LOCATION.lng])
    .addTo(contactMap)
    .bindPopup(`<strong>${HOMESTAY_LOCATION.name}</strong>`)
    .openPopup();
}

// Export functions for use in HTML
window.initHomeMap = initHomeMap;
window.initAttractionsPageMap = initAttractionsPageMap;
window.initContactMap = initContactMap;
window.showCategory = showCategory;
window.attractions = attractions;
