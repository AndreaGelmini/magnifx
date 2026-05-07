---
layout: default
title: Advanced Interactions
nav_order: 5
---

# Advanced Interactions

Magnifx provides advanced interaction modes beyond basic hover zoom, giving users more control over how they inspect images.

## Wheel Zoom (Dynamic Zoom Control)

Enable `wheelzoom` to allow users to dynamically adjust the zoom level using their mouse scroll wheel. This is invaluable for detailed analysis where different levels of magnification are needed.

### Enabling Wheel Zoom

```javascript
magnifx(document.getElementById('my-image'), {
  wheelzoom: true
});
```

Or via data attributes on a group container:
```html
<div id="gallery" data-group-configs='{"wheelzoom": true}'>
  <img src="thumb1.jpg" data-magnifx-src="large1.jpg" alt="Img 1">
  <img src="thumb2.jpg" data-magnifx-src="large2.jpg" alt="Img 2">
</div>
```

### How Wheel Zoom Works

- **Scroll up**: Increases zoom by **0.2 steps** (up to 10x maximum)
- **Scroll down**: Decreases zoom by **0.2 steps** (down to 1x minimum)
- **Zoom range**: Clamped between 1x and 10x
- **Synchronized**: In a group, zoom changes apply to *all* images simultaneously

### Practical Example with Wheel Zoom
```javascript
// High-detail product inspection with wheel zoom
magnifx(document.getElementById('product-zoom'), {
  zoom: 3,              // Start at 3x
  wheelzoom: true,       // Enable scroll wheel adjustment
  listener: 'click',    // Click to lock lens in place
  crosshair: true       // Show precision crosshair
});
```

## Click Listener (Toggle Mode)

By default, Magnifx uses `'move'` mode (hover to show lens, leave to hide). Switch to `'click'` mode for a toggle behavior that's perfect for detailed analysis where you need the lens to stay fixed.

### Enabling Click Mode

```javascript
magnifx(el, { listener: 'click' });
```

### Click Mode Behavior

1. **First click** on any image in the group: Lens appears and locks in position
2. **Second click**: Lens disappears
3. **Moving mouse** while locked: Lens moves and stays at the new position (great for comparison tasks)
4. **Works with groups**: Click any image, all lenses in the group appear in sync

### Example: Click Mode for Detailed Comparison
```html
<div id="design-review" data-group-configs='{"listener": "click", "zoom": 4, "wheelzoom": true}'>
  <img src="draft-v1.jpg" data-magnifx-src="draft-v1-hd.jpg" alt="Draft 1">
  <img src="draft-v2.jpg" data-magnifx-src="draft-v2-hd.jpg" alt="Draft 2">
  <img src="draft-v3.jpg" data-magnifx-src="draft-v3-hd.jpg" alt="Draft 3">
</div>

<script>
  magnifx(document.getElementById('design-review'));
</script>
```

Click any image to lock the lens, then use the scroll wheel to adjust zoom while comparing fine details across all three drafts.

## Combining Interactions

The real power comes from combining these features:

| Scenario | Recommended Config |
|----------|---------------------|
| Quick preview | Default (hover) |
| Detailed analysis | `listener: 'click'` + `wheelzoom: true` |
| Comparing multiple images | Group container + `wheelzoom: true` |
| Precision work | `listener: 'click'` + `crosshair: true` + `wheelzoom: true` |

### Ultimate Configuration Example
```javascript
// Perfect for professional design/product review
magnifx(document.getElementById('review-gallery'), {
  listener: 'click',      // Click to lock/unlock
  zoom: 3,               // Start at 3x
  wheelzoom: true,       // Adjust with scroll wheel
  crosshair: true,       // Precision crosshair
  smart: true,           // Adapt lens to image ratio
  speed: 100             // Fast transitions
});
```
