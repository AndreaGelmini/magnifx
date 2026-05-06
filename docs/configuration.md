# Configuration

Magnifx offers flexible configuration options that can be set via JavaScript or through HTML data attributes.

## Configuration Precedence

Options are merged in the following order (later ones override earlier):

1. **Default values** (built into the library)
2. **Data attributes** (JSON in `data-group-configs` on container elements)
3. **JavaScript options** (passed when calling `magnifx()`)

## JavaScript Configuration

Pass an options object as the second parameter when initializing:

```javascript
magnifx(document.getElementById('my-element'), {
  zoom: 3,
  listener: 'click',
  crosshair: false
});
```

## Data Attributes Configuration

For container elements, you can use the `data-group-configs` attribute with a JSON string:

```html
<div id="image-group" 
     data-group-configs='{"zoom": 2.5, "wheelzoom": true, "smart": true}'>
  <img src="thumb1.jpg" data-magnifx-src="large1.jpg" alt="Image 1">
  <img src="thumb2.jpg" data-magnifx-src="large2.jpg" alt="Image 2">
</div>
```

## Available Options

### `listener`
- **Type**: `String`
- **Default**: `'move'`
- **Values**: `'move'` | `'click'`

Defines how the magnifying lens is triggered:

- `'move'` (default): Lens appears on hover and follows mouse movement
- `'click'`: Click to toggle the lens on/off (useful for detailed analysis without holding mouse)

```javascript
// Hover mode (default)
magnifx(el, { listener: 'move' });

// Click to toggle mode
magnifx(el, { listener: 'click' });
```

### `zoom`
- **Type**: `Number`
- **Default**: `2`
- **Range**: Dynamically clamped between 1x and 10x when using wheel zoom

Sets the initial zoom level. The zoom level determines how much the high-resolution image is magnified.

```javascript
magnifx(el, { zoom: 4 }); // 4x zoom
```

When `wheelzoom` is enabled, users can adjust the zoom level using the mouse scroll wheel in ±0.2 steps.

### `speed`
- **Type**: `Number`
- **Default**: `200`
- **Unit**: milliseconds

Controls the lens transition speed (fade in/out effect).

```javascript
magnifx(el, { speed: 100 }); // Faster transition
magnifx(el, { speed: 500 }); // Slower, smoother transition
```

### `smart`
- **Type**: `Boolean`
- **Default**: `false`

When enabled, the lens adapts its aspect ratio to match the source image's natural dimensions. This is useful when your images have different proportions.

```javascript
magnifx(el, { smart: true });
```

With `smart: true`, if your image is a portrait (vertical), the lens will become rectangular to match. The default circular lens works great for most use cases.

### `crosshair`
- **Type**: `Boolean`
- **Default**: `true`

Shows or hides a precision crosshair overlay inside the lens. The crosshair helps with pixel-perfect alignment when comparing details.

```javascript
magnifx(el, { crosshair: true });  // Show crosshair (default)
magnifx(el, { crosshair: false }); // Hide crosshair
```

### `wheelzoom`
- **Type**: `Boolean`
- **Default**: `false`

Enables mouse wheel zoom control. When active, users can scroll to adjust the zoom level between 1x and 10x.

```javascript
magnifx(el, { wheelzoom: true });
```

**Note**: Wheel zoom only works when the lens is visible (after hover or click).

### `style`
- **Type**: `Boolean`
- **Default**: `true`

Controls whether Magnifx automatically injects the required CSS into the document head. Set to `false` if you want to provide your own styles.

```javascript
magnifx(el, { style: false });
```

When disabled, you'll need to include the Magnifx CSS rules in your own stylesheet.

## Image Data Attributes

### `data-magnifx-src`
Specifies the high-resolution image URL to use for the zoom lens. If not provided, the `src` attribute of the image will be used.

```html
<img src="thumbnail.jpg" data-magnifx-src="high-resolution.jpg" alt="Product">
```

### `data-group-configs`
(For container elements only) JSON string containing configuration options that apply to all images in the group.

```html
<div data-group-configs='{"zoom": 3, "wheelzoom": true, "crosshair": false}'>
  <!-- images here -->
</div>
```

## Complete Example

```javascript
magnifx(document.getElementById('advanced-gallery'), {
  listener: 'click',      // Click to toggle
  zoom: 2.5,             // Start at 2.5x
  wheelzoom: true,        // Allow scroll wheel zoom
  speed: 150,             // Faster transitions
  smart: true,            // Adapt lens to image ratio
  crosshair: true,        // Show precision crosshair
  style: true             // Auto-inject CSS (default)
});
```
