# JanDhan Insights — Production Deployment & DevOps Guide

This guide details the complete production build, hosting, and deployment procedure for **JanDhan Insights**.

---

## 1. System Requirements & Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Package Manager**: npm v9+ or yarn v1.22+
- **Architecture**: Zero-backend static Single Page Application (SPA) with client-side routing, relative asset paths, and zero runtime secret keys.

---

## 2. Local Installation & Build Commands
```bash
# 1. Clean installation of dependencies
npm install

# 2. Run the automated audit & verification suite (17/17 tests must pass)
npm test

# 3. TypeScript validation & linting
npm run lint

# 4. Production build compilation into dist/
npm run build

# 5. Local preview of production build on port 4173
npm run preview
```

---

## 3. Hosting Platforms Configuration

### A. Vercel Deployment
The repository includes a root `vercel.json` file:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
**Steps to Deploy on Vercel:**
1. Import repository on [Vercel Dashboard](https://vercel.com).
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy. All 20 routes support direct refresh without 404 errors.

### B. Netlify Deployment
The repository includes `public/_redirects`:
```
/*    /index.html   200
```
**Steps to Deploy on Netlify:**
1. Connect GitHub repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### C. Cloudflare Pages
1. Connect repository on Cloudflare Dashboard -> Pages.
2. Build command: `npm run build`.
3. Build output directory: `dist`.
4. `public/_redirects` is copied automatically into `dist/` on build.

### D. Nginx / VPS Web Server
```nginx
server {
    listen 80;
    server_name jandhan-insights.org www.jandhan-insights.org;
    root /var/www/jandhan-insights/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 4. Search Engine Optimization (SEO) & Metadata
- **`robots.txt`**: Located at `/public/robots.txt` and copied to root on build.
- **`sitemap.xml`**: Located at `/public/sitemap.xml`, indexing all 20 canonical application routes.
- **Metadata**: Synchronized `<title>`, `<meta name="description">`, OpenGraph, and Twitter card tags defined in `index.html`.

---

## 5. Troubleshooting & Rollback
- **Direct Route Refresh 404:** Ensure rewrite rules (`_redirects` or `vercel.json`) are respected by the static host.
- **Node Version Mismatches:** If encountering build errors on older environments, enforce `node -v` >= 18.20.0.
- **Rollback:** In Vercel or Netlify, promote previous deployment instant-rollback via the Deployment History panel.
