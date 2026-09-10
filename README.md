# Majha Improve Homes — React + Vite

## Run locally

```bash
npm install
npm run dev
```

## Build for Cloudflare Pages

```bash
npm run build
```

Use `dist` as the Cloudflare Pages output directory.

The complete original full-width layout, images, fonts, and page content are preserved in JSX components in `src/App.jsx`. Reusable carousels are in `src/Carousel.jsx`. Navigation and video controls use React state with cleaned-up effects.

## Included production website

The ZIP includes a prebuilt `dist` directory. Upload that directory to Cloudflare Pages for direct upload. Do not upload the project root for a direct-upload deployment.

To edit the project through a GitHub-connected editor, upload the source files (including package.json, src, public, and vite.config.js) rather than only dist. For a Git-connected build, use `npm run build` and output directory `dist`.

## Original external media

The original Google Fonts and Coral Homes inspiration images/video remain externally hosted and need an internet connection. The four original Majha project images are included locally. All original media attribution is preserved.
