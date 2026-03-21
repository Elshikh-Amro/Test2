# Quick Start: Welcome to Programming Exercises Website

**Date**: 2026-03-21
**Purpose**: Guide for developers to set up and run the static website locally

## Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Local web server (optional, for better development experience)

## Local Development Setup

### Option 1: Simple File Access (No Server)

1. Clone or download the repository
2. Open `site/index.html` directly in your web browser
3. Navigate through exercises using the interface

**Limitations**: Some features may not work due to browser security restrictions (CORS, file:// protocol)

### Option 2: Local Web Server (Recommended)

#### Using Python (built-in)

```bash
cd site/
python -m http.server 8000
```

Then open http://localhost:8000 in your browser

#### Using Node.js (if available)

```bash
cd site/
npx http-server -p 8000
```

#### Using VS Code Live Server Extension

1. Open the `site/` folder in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Site opens at http://localhost:5500

## Testing

### Unit Tests

Run JavaScript unit tests:

```bash
# Using Node.js
cd site/js/
node exercises.test.js
```

### Manual Testing

Follow the checklist in `tests/manual/test-plan.md`

## Deployment

### Static Hosting Options

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Connect repository, auto-deploys on push
- **Vercel**: Import project, deploy automatically
- **CDN**: Upload files to any static hosting service

### Build Process

No build required - files are ready for deployment as-is.

### Offline Support

The site works offline after initial load. Test by:
1. Load the site while online
2. Disable internet connection
3. Refresh pages and verify functionality

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

**Issue**: Exercises not loading
**Solution**: Ensure all files are in the correct directory structure

**Issue**: Progress not saving
**Solution**: Check browser localStorage permissions

**Issue**: Code editor not highlighting
**Solution**: Ensure modern browser with ES6 support