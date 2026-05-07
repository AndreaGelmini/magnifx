---
layout: default
title: Magnifx Documentation
nav_order: 1
---

# Magnifx Documentation

Welcome to the official documentation for **Magnifx** - a lightweight, zero-dependency JavaScript library for image magnification with synchronized zoom.

## Quick Links

- **[Getting Started](./getting-started)** - Install and run your first example in minutes
- **[Configuration](./configuration)** - Customize zoom levels, speed, and behavior
- **[Synchronized Groups](./synchronized-groups)** - Compare multiple images with synced zoom
- **[Advanced Interactions](./advanced-interactions)** - Wheel zoom, click-to-toggle, and more
- **[Examples](./examples/)** - Live demos and working code samples

## What is Magnifx?

Magnifx is a standalone ES6 library that adds a magnifying lens to your images. Features include:

- **Zero dependencies** - No jQuery, no build tools, just plug-and-play
- **Synchronized zoom** - Multiple images zoom together at the same position
- **Flexible configuration** - Control zoom level, speed, trigger mode, and more
- **Modern and lightweight** - Pure ES6 classes, minimal footprint

## Installation

Include the library via a standard script tag:

```html
<script src="path/to/magnifx.js"></script>
```

## Basic Usage

```javascript
// Initialize a single image
magnifx(document.getElementById('my-image'));

// Initialize a group (all images synced)
magnifx(document.getElementById('image-group'));
```

## Repository

- **GitHub**: [AndreaGelmini/magnifx](https://github.com/AndreaGelmini/magnifx)
- **License**: MIT
- **Issues**: [Report a bug](https://github.com/AndreaGelmini/magnifx/issues)
