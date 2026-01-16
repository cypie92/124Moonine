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
// Data sourced from Airbnb Guidebook: https://www.airbnb.com/s/guidebooks?refinement_paths%5B%5D=/guidebooks/1852920
const attractions = {
  food: [
    { id: 1, name: 'P S L Famous Goreng Pisang', lat: 4.853617, lng: 100.741272, image: `${MAP_BASE}/assets/images/attractions/psl_goreng_pisang.jpg`, description: 'Must try! Eat while it hot crunchy', distance: '7 min drive', mapUrl: 'https://maps.google.com/maps?q=PSL+Goreng+Pisang+Taiping' },
    { id: 2, name: 'Restoran Kakak • 家家粿条汤', lat: 4.853114, lng: 100.740473, image: `${MAP_BASE}/assets/images/attractions/restoran_kakak.jpg`, description: '[Non-Halal] Hor Fun noodles soup & Signature Barley Kopi Ice', distance: '7 min drive', mapUrl: 'https://maps.google.com/maps?q=Restoran+Kakak+Taiping' },
    { id: 3, name: 'Pokok Assam Market Food Court', lat: 4.831274, lng: 100.738375, image: `${MAP_BASE}/assets/images/attractions/pokok_assam_market.jpg`, description: 'Morning market with local food - try the Prawn Mee by uncle with bicycle', distance: '10 min drive', mapUrl: 'https://maps.google.com/maps?q=Pokok+Assam+Market+Taiping' },
    { id: 4, name: 'Ansari Famous Cendol', lat: 4.854, lng: 100.738868, image: `${MAP_BASE}/assets/images/attractions/ansari_cendol.jpg`, description: 'One of the famous cendol in Taiping - must try!', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/8LkKqnfD3mZyv9YJ6' },
    { id: 5, name: 'Restoran Mee Udang Mak Jah', lat: 4.840, lng: 100.635, image: `${MAP_BASE}/assets/images/attractions/mee_udang_mak_jah.jpg`, description: '[Kuala Sepetang] Prawn Noodle with big size prawns & big portion', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Restoran+Mee+Udang+Mak+Jah' },
    { id: 6, name: 'Larut Matang Hawker Center', lat: 4.850852, lng: 100.740823, image: `${MAP_BASE}/assets/images/attractions/larut_matang_hawker.jpg`, description: 'Breakfast spot - Prawn Mee, Kuih, Hor-Ka-Sai coffee, 福建面, 虎咬狮', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/LQvQzqJfZPTBqiPG6' },
    { id: 7, name: 'Restoran Makanan Laut Yee Seng', lat: 4.820455, lng: 100.671855, image: `${MAP_BASE}/assets/images/attractions/yee_seng_seafood.jpg`, description: 'Reasonable price and delicious seafood', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Restoran+Makanan+Laut+Yee+Seng' },
    { id: 8, name: 'Kedai Ais Kacang Merah Raex', lat: 4.850819, lng: 100.739308, image: `${MAP_BASE}/assets/images/attractions/ais_kacang_raex.jpg`, description: '红豆搅 Red bean ice - must try!', distance: '7 min drive', mapUrl: 'https://maps.google.com/maps?q=Kedai+Ais+Kacang+Merah+Raex+Taiping' },
    { id: 9, name: 'Kedai Makanan OK', lat: 4.854432, lng: 100.738831, image: `${MAP_BASE}/assets/images/attractions/kedai_makanan_ok.jpg`, description: '[Non Halal] Pork noodle, seafood porridge', distance: '7 min drive', mapUrl: 'https://maps.google.com/maps?q=Kedai+Makanan+OK+Taiping' },
    { id: 10, name: 'Fireworks Char Kuey Teow', lat: 4.821708, lng: 100.708611, image: `${MAP_BASE}/assets/images/attractions/fireworks_ckt.jpg`, description: 'Char Kuey Teow cooked with Charcoal - authentic taste', distance: '15 min drive', mapUrl: 'https://maps.google.com/maps?q=Fireworks+Char+Kuey+Teow+Taiping' },
    { id: 11, name: 'Restoran Air Kacang Taiping (太平豆水餐室)', lat: 4.851546, lng: 100.741958, image: `${MAP_BASE}/assets/images/attractions/air_kacang_taiping.jpg`, description: '太平薄饼 Popiah is famous in this shop', distance: '7 min drive', mapUrl: 'https://maps.google.com/maps?q=Restoran+Air+Kacang+Taiping' },
    { id: 12, name: 'Prima Coffee Shop', lat: 4.852, lng: 100.741, image: `${MAP_BASE}/assets/images/attractions/prima_coffee_shop.jpg`, description: '[Non Halal] 全蛋手工云吞面 Handmade wonton noodles', distance: '7 min drive', mapUrl: 'https://maps.google.com/maps?q=Prima+Coffee+Shop+Taiping' },
    { id: 13, name: 'M&M Kopitiam', lat: 4.851, lng: 100.742, image: `${MAP_BASE}/assets/images/attractions/mm_kopitiam.jpg`, description: '国记鸡饭 Chicken rice', distance: '7 min drive', mapUrl: 'https://maps.google.com/maps?q=M%26M+Kopitiam+Taiping' },
    { id: 14, name: 'Restoran Central 中央饮食中心', lat: 4.853, lng: 100.740, image: `${MAP_BASE}/assets/images/attractions/restoran_central.jpg`, description: '鲜煮粿条汤 Fresh Kuey Teow soup', distance: '7 min drive', mapUrl: 'https://maps.google.com/maps?q=Restoran+Central+Taiping' },
    { id: 15, name: 'Kedai Kopi 333', lat: 4.855, lng: 100.735, image: `${MAP_BASE}/assets/images/attractions/kedai_kopi_333.jpg`, description: '芋头面粉糕，鱼头米 Yam noodles & fish head', distance: '5 min drive', mapUrl: 'https://maps.google.com/maps?q=Kedai+Kopi+333+Taiping' },
    { id: 16, name: 'Pokok Assam Fried Chicken', lat: 4.832, lng: 100.739, image: `${MAP_BASE}/assets/images/attractions/pokok_assam_fried_chicken.jpg`, description: '炸鸡 Fried Chicken', distance: '10 min drive', mapUrl: 'https://maps.google.com/maps?q=Pokok+Assam+Fried+Chicken+Taiping' },
    { id: 17, name: 'Ai Recipe-pokok assam', lat: 4.831, lng: 100.738, image: `${MAP_BASE}/assets/images/attractions/ai_recipe.jpg`, description: '咖喱叻沙, 亚参叻沙, 虾饼, 芋角 Laksa & snacks', distance: '10 min drive', mapUrl: 'https://maps.google.com/maps?q=Ai+Recipe+Pokok+Assam+Taiping' },
    { id: 18, name: '十八丁美食咖哩面', lat: 4.838, lng: 100.630, image: `${MAP_BASE}/assets/images/attractions/sepetang_curry_mee.jpg`, description: 'Curry Mee at Kuala Sepetang', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Kuala+Sepetang+Curry+Mee' },
    { id: 19, name: 'Kuala Sepetang Pau', lat: 4.837, lng: 100.631, image: `${MAP_BASE}/assets/images/attractions/kuala_sepetang_pau.jpg`, description: 'Famous Pau (steamed buns) at Kuala Sepetang', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Kuala+Sepetang+Pau' },
    { id: 20, name: 'Restoran Tepi Sungai', lat: 4.836, lng: 100.628, image: `${MAP_BASE}/assets/images/attractions/restoran_tepi_sungai.jpg`, description: 'Seafood with reasonable price by the river', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Restoran+Tepi+Sungai+Kuala+Sepetang' },
    { id: 21, name: 'Xin Seafood Restaurant', lat: 4.835223, lng: 100.627504, image: `${MAP_BASE}/assets/images/attractions/xin_seafood.jpg`, description: 'Delicious seafood with reasonable price', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Xin+Seafood+Restaurant+Kuala+Sepetang' },
    { id: 22, name: 'Light House Seafood Restaurant', lat: 4.834, lng: 100.629, image: `${MAP_BASE}/assets/images/attractions/lighthouse_seafood.jpg`, description: '沙煲海鲜粥 Claypot seafood porridge', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Light+House+Seafood+Restaurant+Matang' },
    { id: 23, name: 'Antong Coffee Factory', lat: 4.855971, lng: 100.732829, image: `${MAP_BASE}/assets/images/attractions/antong_coffee.jpg`, description: 'Famous traditional coffee factory - great for coffee lovers', distance: '5 min drive', mapUrl: 'https://maps.google.com/maps?q=Antong+Coffee+Factory+Taiping' },
    { id: 24, name: 'Taiping Mall Food Court', lat: 4.85091, lng: 100.74325, image: `${MAP_BASE}/assets/images/attractions/taiping_mall.jpg`, description: 'The nearest mall with cinema and variety of dining options', distance: '5 min drive', mapUrl: 'https://maps.google.com/maps?q=Taiping+Mall' }
  ],
  attraction: [
    { id: 1, name: 'Taiping Lake Gardens', lat: 4.85001, lng: 100.74794, image: `${MAP_BASE}/assets/images/attractions/taiping_lake_garden.webp`, description: 'Malaysia\'s first public garden (1880) - jogging, cycling & relaxation', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/HFPKAf5NVs9PWGbm8' },
    { id: 2, name: 'Zoo Taiping & Night Safari', lat: 4.8550004, lng: 100.7484571, image: `${MAP_BASE}/assets/images/attractions/zoo_taiping.jpg`, description: 'Malaysia\'s first night safari - best zoo near nature, affordable prices', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/TcVcMwzSDNtrfEbP7' },
    { id: 3, name: 'Bukit Larut (Maxwell Hill)', lat: 4.86334, lng: 100.792643, image: `${MAP_BASE}/assets/images/attractions/bukit_larut.jpg`, description: 'Hiking spot with JEEP transportation - book early to avoid sold out tickets', distance: '15 min drive', mapUrl: 'https://maps.google.com/maps?q=Bukit+Larut+Taiping' },
    { id: 4, name: 'Perak Museum', lat: 4.8604233, lng: 100.742802, image: `${MAP_BASE}/assets/images/attractions/perak_museum.webp`, description: 'Oldest museum in Malaysia - rich history and heritage', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/FM9PQd8J7AEZ8iYf9' },
    { id: 5, name: 'Kuala Sepetang Charcoal Factory', lat: 4.838211, lng: 100.636996, image: `${MAP_BASE}/assets/images/attractions/charcoal_factory.jpg`, description: 'Traditional charcoal making factory - unique cultural experience', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Kuala+Sepetang+Charcoal+Factory' },
    { id: 6, name: 'Trong Leisure Farm & Resort', lat: 4.71171, lng: 100.708209, image: `${MAP_BASE}/assets/images/attractions/trong_farm.jpg`, description: 'Visit the ducks! Fun family farm experience (小黄鸭休闲农场)', distance: '25 min drive', mapUrl: 'https://maps.google.com/maps?q=Trong+Leisure+Farm+Resort' },
    { id: 7, name: 'Clock Tower', lat: 4.8532907, lng: 100.7405346, image: `${MAP_BASE}/assets/images/attractions/clock_tower.png`, description: 'Historic British-era landmark', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/FSKtBA2aUfDoYs4r9' },
    { id: 8, name: 'Dataran Warisan Taiping', lat: 4.8542228, lng: 100.7408228, image: `${MAP_BASE}/assets/images/attractions/dataran_warisan.webp`, description: 'Heritage Square of Taiping - great for photos', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/q3h2Hckqs1eWmDgm8' }
  ],
  photoSpot: [
    { id: 1, name: 'Rain Tree Walk', lat: 4.8530, lng: 100.7360, image: `${MAP_BASE}/assets/images/attractions/taiping_lake_garden.webp`, description: 'Iconic tree-lined path at Lake Gardens - perfect for photos', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/HFPKAf5NVs9PWGbm8' },
    { id: 2, name: 'Taiping Clock Tower', lat: 4.8532907, lng: 100.7405346, image: `${MAP_BASE}/assets/images/attractions/clock_tower.png`, description: 'Historic British-era landmark - great photo spot', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/FSKtBA2aUfDoYs4r9' },
    { id: 3, name: 'Bukit Larut Viewpoint', lat: 4.86334, lng: 100.792643, image: `${MAP_BASE}/assets/images/attractions/bukit_larut.jpg`, description: 'Stunning mountain views and misty scenery', distance: '15 min drive', mapUrl: 'https://maps.google.com/maps?q=Bukit+Larut+Taiping' },
    { id: 4, name: 'Kuala Sepetang Mangroves', lat: 4.838211, lng: 100.636996, image: `${MAP_BASE}/assets/images/attractions/charcoal_factory.jpg`, description: 'Beautiful mangrove forest and fishing village', distance: '20 min drive', mapUrl: 'https://maps.google.com/maps?q=Kuala+Sepetang' },
    { id: 5, name: 'Zoo Taiping Entrance', lat: 4.8550004, lng: 100.7484571, image: `${MAP_BASE}/assets/images/attractions/zoo_taiping.jpg`, description: 'Iconic zoo entrance and beautiful grounds', distance: '7 min drive', mapUrl: 'https://maps.app.goo.gl/TcVcMwzSDNtrfEbP7' }
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
 * Initialize the attractions page map (with circular image markers like home page)
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
    .addTo(attractionsMap)
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

  // Category border colors for markers
  const categoryColors = {
    food: '#D9886E',
    attraction: '#376d64',
    photoSpot: '#6B7280'
  };

  // Add all attractions with circular image markers (same as home page)
  Object.entries(attractions).forEach(([category, items]) => {
    const borderColor = categoryColors[category] || '#376d64';

    items.forEach(attraction => {
      // Create custom circular image marker with colored border
      const customIcon = L.divIcon({
        className: 'attraction-marker',
        html: `<img src="${attraction.image}" alt="${attraction.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 50%; border: 4px solid ${borderColor}; box-shadow: 0 4px 12px rgba(0,0,0,0.3);" onerror="this.outerHTML='<div style=\\'width:70px;height:70px;border-radius:50%;border:4px solid ${borderColor};display:flex;align-items:center;justify-content:center;background:${borderColor};color:white;box-shadow:0 4px 12px rgba(0,0,0,0.3);\\'><span class=\\'material-symbols-outlined\\'>place</span></div>'">`,
        iconSize: [78, 78],
        iconAnchor: [39, 39]
      });

      L.marker([attraction.lat, attraction.lng], { icon: customIcon })
        .addTo(attractionsMap)
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
