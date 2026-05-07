---
layout: default
title: Getting Started
nav_order: 2
---

# Getting Started

Welcome to Magnifx! This guide will help you get up and running with the library in minutes.

## Prerequisites

Magnifx is a standalone ES6 library with **zero dependencies**. All you need is a modern browser that supports ES6 classes.

## Installation

Include the library via a standard script tag in your HTML:

```html
<script src="path/to/magnifx.js"></script>
```

No build steps, no package managers, no jQuery — just plug-and-play for browser environments.

## Basic Usage

### Step 1: Add Images to Your HTML

Use a container for grouped images, or target single images directly. Add `data-magnifx-src` to specify the high-resolution image used for zooming:

```html
<!-- Single image -->
<img id="my-image" 
     src="small-image.jpg" 
     data-magnifx-src="large-image.jpg" 
     alt="My Image">

<!-- Group of images (for synchronized zoom) -->
<div id="image-group">
  <img src="thumb1.jpg" data-magnifx-src="large1.jpg" alt="Image 1">
  <img src="thumb2.jpg" data-magnifx-src="large2.jpg" alt="Image 2">
  <img src="thumb3.jpg" data-magnifx-src="large3.jpg" alt="Image 3">
</div>
```

### Step 2: Initialize Magnifx

Call the `magnifx()` function with your target element:

```javascript
// Initialize a single image
magnifx(document.getElementById('my-image'));

// Initialize a group (all images in the container will be synced)
magnifx(document.getElementById('image-group'));
```

### Step 3: That's It!

Hover over your images to see the magnifying lens in action. The lens will automatically use the high-resolution image specified in `data-magnifx-src`.

## First Example

Here's a complete working example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Magnifx</title>
    <style>
        body { font-family: sans-serif; padding: 40px; }
        .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        img { width: 100%; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>My First Magnifx Example</h1>
    
    <div id="gallery" class="image-grid">
        <img src="https://picsum.photos/id/10/600/400" 
             data-magnifx-src="https://picsum.photos/id/10/1200/800" 
             alt="Nature 1">
        <img src="https://picsum.photos/id/20/600/400" 
             data-magnifx-src="https://picsum.photos/id/20/1200/800" 
             alt="Nature 2">
        <img src="https://picsum.photos/id/30/600/400" 
             data-magnifx-src="https://picsum.photos/id/30/1200/800" 
             alt="Nature 3">
    </div>

    <script src="magnifx.js"></script>
    <script>
        magnifx(document.getElementById('gallery'));
    </script>
</body>
</html>
```

## Next Steps

- Check out the [Configuration](./configuration.md) guide to customize zoom levels, speed, and more
- Learn about [Synchronized Groups](./synchronized-groups.md) for comparing multiple images
- Explore [Advanced Interactions](./advanced-interactions.md) like wheel zoom and click-to-toggle
