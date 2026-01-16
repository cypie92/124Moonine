# 124 By Moonine Homes - Project Structure Design

## Overview

Restructure the single `index.html` website into a scalable multi-page static site with an interactive attractions map.

## Tech Stack

- **HTML/CSS/JS** - Vanilla, no frameworks
- **Tailwind CSS** - Via CDN (existing)
- **Leaflet.js** - For OpenStreetMap integration
- **No build tools** - Keep it simple

## Folder Structure

```
124Moonine/
├── index.html                 # Homepage
├── pages/
│   ├── about.html            # About the homestay
│   ├── gallery.html          # Photo gallery
│   ├── attractions.html      # Full attractions page
│   └── contact.html          # Contact info
├── assets/
│   ├── images/
│   │   ├── hero/             # Hero/banner images
│   │   ├── gallery/          # Gallery photos
│   │   ├── attractions/      # Custom marker images for map
│   │   └── icons/            # Custom icons
│   ├── css/
│   │   └── styles.css        # Custom styles (extends Tailwind)
│   └── js/
│       ├── components.js     # Loads header/footer
│       └── map.js            # Leaflet map logic
├── components/
│   ├── header.html           # Shared navigation
│   └── footer.html           # Shared footer
└── docs/
    └── plans/                # Design documents
```

## Shared Components System

JavaScript-based includes for header and footer:

```javascript
async function loadComponent(id, file) {
  const response = await fetch(`/components/${file}`);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', 'header.html');
  loadComponent('footer', 'footer.html');
});
```

Each page includes placeholder divs and loads the script:
```html
<div id="header"></div>
<!-- page content -->
<div id="footer"></div>
<script src="/assets/js/components.js"></script>
```

## Pages

### index.html (Homepage)
- Hero section
- About section
- Facilities section
- **Map section** with:
  - Category tabs: Food, Attraction, Photo Spot
  - ~5 custom image markers per category
  - "Explore More" button → attractions page
- Testimonials section
- CTA → Airbnb booking
- Newsletter signup

### pages/about.html
- Detailed homestay story
- Host information
- Amenities list
- House rules

### pages/attractions.html
- Split layout:
  - Left/Top: Interactive map with standard markers
  - Right/Bottom: Scrollable categorized list
- All nearby attractions organized by category
- No custom image markers (standard pins only)

### pages/gallery.html
- Photo grid/masonry layout
- Lightbox on image click
- Photos of homestay and surroundings

### pages/contact.html
- Contact information
- WhatsApp link
- Embedded location map
- Social media links

## Navigation & Social Links

### Header
- Logo
- Navigation: Home, About, Attractions, Gallery, Contact
- "Book Now" button → Airbnb
- Mobile hamburger menu

### Footer
- Social links:
  - Facebook
  - Instagram
  - Airbnb
  - WhatsApp
  - 小红书 (Xiaohongshu)
- Copyright info

### Book Now Button
- Smart link that opens Airbnb app if installed, otherwise Airbnb web

## Map Implementation

### Homepage Map Section
```javascript
const attractions = {
  food: [
    { name: "...", image: "/assets/images/attractions/...", lat: 0, lng: 0 },
    // ~5 items
  ],
  attraction: [ /* ~5 items */ ],
  photoSpot: [ /* ~5 items */ ]
};
```
- Category tabs switch visible markers
- Custom image markers using Leaflet's `L.divIcon`
- Click marker → popup with image, name, description, distance

### Attractions Page Map
- Standard Leaflet markers (no custom images)
- All categories visible or filterable
- Synced with list view (click list item → highlight marker)

## Images

All images stored locally:
- `/assets/images/hero/` - Banner images
- `/assets/images/gallery/` - Gallery photos
- `/assets/images/attractions/` - Custom marker images (~15 total: 5 per category)
- `/assets/images/icons/` - Custom icons if needed

## Implementation Order

1. Create folder structure
2. Extract header/footer into components
3. Set up components.js loader
4. Refactor index.html to use components
5. Create page templates (about, gallery, attractions, contact)
6. Implement homepage map section with categories
7. Implement attractions page with map + list
8. Add all images and content
9. Test across pages and devices
