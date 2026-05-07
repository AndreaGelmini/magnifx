---
layout: default
title: Synchronized Groups
nav_order: 4
---

# Synchronized Groups

Magnifx's standout feature is **synchronized multi-zoom**: when you move the magnifying lens on one image in a group, all other images in the same group automatically update to show the exact same relative area at the same zoom level.

Perfect for comparing details across:
- Design mockups or drafts
- Product photos from different angles
- Screenshots of UI/UX changes
- Before/after image pairs

## How to Create a Synced Group

Pass a **container element** (any HTML element that holds your images, like a `<div>`, `<section>`, or `<figure>`) to the `magnifx()` function. The library will:
1. Find all `<img>` tags inside the container
2. Initialize each as a magnifx instance
3. Bind shared events so all lenses move in sync

### Basic Group Setup
```html
<!-- Container for synced images -->
<div id="comparison-gallery" class="image-grid">
  <img src="screenshot-v1-small.jpg" 
       data-magnifx-src="screenshot-v1-large.jpg" 
       alt="Version 1">
  <img src="screenshot-v2-small.jpg" 
       data-magnifx-src="screenshot-v2-large.jpg" 
       alt="Version 2">
  <img src="screenshot-v3-small.jpg" 
       data-magnifx-src="screenshot-v3-large.jpg" 
       alt="Version 3">
</div>

<script src="magnifx.js"></script>
<script>
  // Initialize the entire group with one call
  magnifx(document.getElementById('comparison-gallery'));
</script>
```

Hover over any image in the group, and all three will zoom to the same relative position instantly.

## Group Configuration

Use the `data-group-configs` attribute on the container to apply settings to *all* images in the group at once, instead of configuring each image individually:

```html
<div id="synced-group" 
     data-group-configs='{"zoom": 3, "wheelzoom": true, "smart": true}'>
  <img src="thumb1.jpg" data-magnifx-src="large1.jpg" alt="Image 1">
  <img src="thumb2.jpg" data-magnifx-src="large2.jpg" alt="Image 2">
</div>
```

This applies the zoom level, wheel zoom, and smart lens ratio to every image in the group.

## How Synced Groups Work Internally

1. **Relative Position Tracking**: When you hover over an image, Magnifx calculates the mouse position as a relative percentage (`relX`, `relY`) of the image dimensions (0-1 range)
2. **Shared State**: This relative position is applied to *all* lenses in the group, so each image shows the same proportional area
3. **Group Events**: Mouse events are bound to the container, not individual images, ensuring smooth synchronization even when moving between images in the group

## Fallback for Images Without `data-magnifx-src`

If an image in the group doesn't have a `data-magnifx-src` attribute, Magnifx will use the `src` attribute as the high-resolution zoom source automatically.

## Example: Synced Group with Custom Options
```javascript
magnifx(document.getElementById('product-comparison'), {
  listener: 'click',    // Toggle lens on click
  zoom: 4,              // Start at 4x zoom
  wheelzoom: true,      // Allow scroll wheel zoom adjustment
  crosshair: true       // Show precision crosshair
});
```
