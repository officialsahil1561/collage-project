# JanDhan Insights — Pune Municipal Corporation (PMC) Transparency Portal

An independent civic finance and urban infrastructure transparency platform covering **Pune Municipal Corporation (PMC), Maharashtra, India** exclusively.

---

## Key Features & Civic Modules

- **Home & Pune Landmark Carousel:** Full-width rotating showcase of 12 Pune civic and heritage landmarks with Wikimedia Commons attribution, keyboard/hover controls, and offline-safe local fallbacks.
- **Financial Overview & Budget Tracker (FY 2022–27):**
  - Tracks **43 reconciled municipal financial records** (`31` Verified active + `12` Quarantined review records).
  - Highlights **FY 2026-27 Standing Committee Final BE (`₹15,669.00 Cr`)** while quarantining the superseded initial Commissioner draft (`₹13,995.00 Cr`) so budgets are never double-counted.
  - Includes audited actuals through **FY 2023-24 (`₹8,125.60 Cr`, 85.4% utilization)**, Revenue vs Capital splits, plain-language **Citizen Budget Glossary**, and CSV/JSON downloads.
- **20 PMC Departments, Public Projects & Tenders:** Departmental allocation profiles, major capital works (Riverfront, 24x7 Water, JICA STPs, Flyovers), and MahaTenders contract records.
- **Civic Explorer (5 Dedicated Dashboards):**
  1. **Ward Explorer:** All **15 Regional Ward Offices**, all **41 Electoral Prabhags** (`01`–`41`), and a side-by-side Ward Comparison tool.
  2. **Water & Sanitation Tracker:** 6 Water Treatment Plants (Parvati, Wadgaon, Warje, Bhama Askhed, Cantonment, Holkar/Chikhali) and **11 JICA Mula-Mutha Sewage Treatment Plants (`396 MLD` total)** + Solid Waste processing stats.
  3. **Roads & Development Tracker:** FY 2026-27 `₹1,800 Cr` urban mobility outlay, 65 km missing links, `₹400 Cr` land acquisition, and `₹85 Cr` model footpaths.
  4. **Public Facilities Explorer:** 96 Arogyavardhini clinics & PMC hospitals, 20 operational fire stations (+5 planned), PMC primary/secondary schools, and municipal parks.
  5. **Environment Dashboard:** PMC Environment Status Report (ESR 2024-25) air quality monitoring, Mula-Mutha river pollution abatement, waste processing (`~2,400 TPD`), and `5.78 lakh+` recorded trees.
- **Citizen Desk (Preserved):** Guided **Civic Complaints (PMC CARE)** category assistant and **Citizen Feedback & Corrections** submission portal.

---

## Verified Official Sources Used

1. **PMC Official Civic Portal & Budget Overviews:** `https://www.pmc.gov.in/`
2. **OpenCity PMC Multi-Year Budget Archives:** `https://data.opencity.in/dataset/pmc-budgets`
3. **PMC Audited Financial Statements & Balance Sheet PDF:** `https://opendata.pmc.gov.in/opendata/6f5d15dd-7fd3-4b53-8a01-f85a00848952.pdf`
4. **PMC Environment Status Report (ESR):** `https://www.pmc.gov.in/en/environment-status-report`
5. **PMC 15 Regional Ward Offices & 41 Prabhag Directory:** `https://www.pmc.gov.in/en/ward-offices`
6. **Maharashtra e-Procurement (MahaTenders):** `https://mahatenders.gov.in/`

---

## Data Integrity & Missing-Data Policy

- **PMC Boundary Isolation:** Strictly excludes Pimpri-Chinchwad (PCMC), Pune Cantonment Board, Khadki Cantonment Board, and non-PMC PMRDA projects.
- **Honest Null Disclosure:** Missing figures (ward-wise budgets, FY 2024-27 audited actuals, live AQI streams, unverified contractor AOCs) are explicitly labeled **`Data Not Available`** or **`Unavailable`**—never fabricated or replaced with `0`.

---

## Local Development, Testing & Production Build

```bash
# Install dependencies
npm install

# Run the automated PMC audit & reconciliation test suite
npm test

# Type-check with TypeScript
npm run lint

# Run local development server (port 3000)
npm run dev

# Build production bundle into dist/
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment Portability (Zero-Backend Static SPA)

This application builds into a standalone static bundle (`dist/`) with relative asset handling and zero required secrets or environment variables.

- **Vercel:** Pre-configured via `vercel.json` (`npm run build` -> `dist/`).
- **Netlify:** Pre-configured via `netlify.toml` and `public/_redirects`.
- **Cloudflare Pages:** Connect repo -> Build command `npm run build` -> Output directory `dist` (`public/_redirects` included automatically).
- **Static / Nginx VPS:** Serve `dist/` with `try_files $uri $uri/ /index.html;`.
