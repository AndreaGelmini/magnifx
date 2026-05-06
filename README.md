# Magnifx
## Lightweight ES6 Image Magnifier with Synchronized Multi-Zoom

A standalone, zero-dependency JavaScript library for creating synchronized magnifying glass lenses on single images or groups. Ideal for comparing fine details across screenshots, product photos, or design mockups.

---

## ✨ Key Features

- 🚀 **Standalone & Dependency-Free**: Pure ES6 class implementation, no jQuery or external libraries required.
- 🔗 **Synchronized Multi-Zoom**: Move one lens, and all images in the same group instantly sync zoom position and level.
- 🖱️ **Wheel Zoom Control**: Dynamically adjust zoom between 1x–10x using the mouse scroll wheel.
- 📐 **Smart Ratio Lens**: Automatically adapts lens aspect ratio to match the source image's natural dimensions.
- 🎯 **Precision Crosshair**: Optional crosshair overlay inside the lens for pixel-perfect alignment.
- ⚡ **Zero Configuration**: Works out of the box with `data-magnifx-src` attributes for high-resolution source images.
- 🖱️ **Flexible Triggers**: Support for hover (default) or click-to-toggle activation modes.

---

## 📦 Installation

Include the library via a standard script tag in your HTML:
```html
<script src="path/to/magnifx.js"></script>
```
No build steps or package managers required — plug-and-play for browser environments.

---

## 🚀 Quick Start

### HTML Setup
Use a container for grouped images, or target single images directly. Add `data-magnifx-src` to specify the high-resolution image used for zooming:
```html
<!-- Synced image group with data-attribute config -->
<div id="image-group" data-group-configs='{"zoom": 1.5, "wheelzoom": true}'>
  <img src="small-screenshot1.jpg" data-magnifx-src="large-screenshot1.jpg" alt="Screenshot 1">
  <img src="small-screenshot2.jpg" data-magnifx-src="large-screenshot2.jpg" alt="Screenshot 2">
  <img src="small-screenshot3.jpg" data-magnifx-src="large-screenshot3.jpg" alt="Screenshot 3">
</div>

<!-- Single image example -->
<img id="single-img" src="small-product.jpg" data-magnifx-src="large-product.jpg" alt="Product Image">
```

### JavaScript Initialization
Initialize by passing a target element (container or single image) and optional configuration:
```javascript
// Initialize synced group (uses data attributes or defaults)
magnifx(document.getElementById('image-group'));

// Initialize single image with custom options
magnifx(document.getElementById('single-img'), {
  zoom: 3,
  listener: 'click', // Toggle lens on click instead of hover
  crosshair: false
});
```

---

## ⚙️ Configuration Options

All options can be passed via JavaScript, or as JSON in a `data-group-configs` attribute on container elements.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `listener` | String | `'move'` | Activation trigger: `'move'` (hover) or `'click'` (toggle lens on click). |
| `zoom` | Number | `2` | Initial zoom level. Wheel zoom adjusts in ±0.2 steps, clamped to 1x–10x. |
| `speed` | Number | `200` | Lens transition speed in milliseconds. |
| `smart` | Boolean | `false` | If `true`, adapts lens aspect ratio to match the source image's natural dimensions. |
| `crosshair` | Boolean | `true` | Shows a red crosshair overlay inside the lens for precision alignment. |
| `wheelzoom` | Boolean | `false` | Enables mouse wheel zoom control (adjusts zoom between 1x and 10x). |

---

## 📄 License

Magnifx is released under the [MIT License](https://opensource.org/licenses/MIT).
