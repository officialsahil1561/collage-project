# JAN DHAN INSIGHTS — COMPREHENSIVE ACADEMIC PROJECT REPORT & VIVA GUIDE

**Project Title:** JanDhan Insights: Pune Municipal Corporation (PMC) & Loni Kalbhor Financial Transparency & Civic Intelligence Platform  
**Target Submission:** Bachelor of Engineering / Master of Computer Applications / Final Year Capstone Project  
**Repository:** officialsahil1561/collage-project  
**Academic Year:** 2025–2026  

---

## 1. Title Page & Metadata
- **Project Name:** JanDhan Insights (जनधन इनसाइट्स)
- **Domain:** Civic Technology, Public Financial Management, E-Governance, GIS Analytics
- **Primary Geographies:**
  1. *Pune Municipal Corporation (PMC)* — 516+ sq. km Urban Jurisdiction
  2. *Loni Kalbhor* — Haveli Taluka Gram Panchayat, Pune District (Census Code: 556123, LGD: 189234)
- **Technology Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Recharts 3, Lucide React

---

## 2. Abstract
Citizens and researchers often struggle to extract actionable insights from government budgets and civic reports due to fragmented PDF publishing, dense accounting terminology, and risk of double counting. **JanDhan Insights** is a client-side civic intelligence and financial transparency platform designed for Pune Municipal Corporation (PMC) and the peripheral semi-urban village of Loni Kalbhor. The platform reconciles ₹15,669.00 Cr in municipal budget outlays, isolates overlapping departmental line items into quarantined review ledgers, provides detailed infrastructure trackers across 15 Regional Ward Offices and 41 Prabhags, and offers demographic, water, and road data for Loni Kalbhor Gram Panchayat. Built on a zero-fabrication standard, the system preserves honest "Data Not Available" labels rather than substituting arbitrary values.

---

## 3. Introduction
Urban local bodies in India handle thousands of crores in public funds. However, official budget documents are traditionally published as scanned PDFs spanning hundreds of pages. Citizens lack accessible interfaces to analyze where funds are allocated, how much is actually spent, and what infrastructure serves their specific ward or village. JanDhan Insights bridges this gap with structured data pipelines, interactive data visualizations, and field-level evidence traceability.

---

## 4. Problem Statement
1. **Unreconciled Budgets:** Proposed initial drafts are frequently conflated with final Standing Committee approvals and audited actual expenditures.
2. **Double-Counting Risks:** Departmental sub-heads (e.g. water supply or road works) are often incorrectly added to consolidated municipal fund outlays.
3. **Lack of Granular Ward Evidence:** Ward cards in typical civic dashboards either invent numbers or fail to show data provenance.
4. **Conflation of Rural & Urban Bodies:** Peripheral growing settlements like Loni Kalbhor are mistakenly lumped into municipal corporation accounts despite operating under rural Gram Panchayat governance.

---

## 5. Objectives
1. Provide an authenticated multi-year financial ledger (FY 2022–23 to FY 2026–27) for Pune Municipal Corporation.
2. Formulate a programmatic double-count isolation policy quarantining superseded drafts and departmental sub-heads.
3. Deliver deep civic intelligence for all 15 PMC Regional Ward Offices with explicit source attribution.
4. Establish an independent rural dashboard for Loni Kalbhor Gram Panchayat.
5. Create an automated audit test suite ensuring mathematical accuracy, jurisdictional exclusivity, and currency normalization ($1 \text{ Cr} = 10^7 \text{ INR}$).

---

## 6. Existing System vs. 7. Proposed System

| Dimension | Existing System | Proposed JanDhan Insights Platform |
|---|---|---|
| **Format** | Static scanned PDFs, scattered press releases | Interactive React SPA with Recharts data visualizers |
| **Data Scope** | Single multi-city comparison with missing values | Exclusive PMC urban + Loni Kalbhor rural dashboards |
| **Evidence** | Raw documents without line-item references | Field-level provenance with direct official URLs & table refs |
| **Missing Data** | Often left as misleading zeros or blank cards | Honest "Data Not Available" or "Pending FY closure" labels |
| **Auditability** | Manual calculation | Automated 17-point test suite running on TypeScript (`npm test`) |

---

## 8. Scope & Boundary Delineation
- **Strict PMC Exclusivity:** Strictly excludes Pimpri-Chinchwad Municipal Corporation (PCMC), Pune Cantonment Board, Khadki Cantonment Board, and non-PMC PMRDA jurisdictions.
- **Loni Kalbhor Independence:** Preserves Loni Kalbhor Gram Panchayat under Haveli Taluka and Pune Zilla Parishad without mixing with PMC municipal budgets.

---

## 9. Technology Stack & 10. System Architecture

```
+-----------------------------------------------------------------------------------+
|                            CLIENT BROWSER (REACT 19 SPA)                          |
+-----------------------------------------------------------------------------------+
|  Navigation Router (20 Canonical Paths)  |  Location Selector (PMC / Loni Kalbhor)|
|-----------------------------------------------------------------------------------|
|                               PRESENTATION LAYER                                  |
|  - Financial Overview & Trends Dashboard (Recharts 3)                             |
|  - 15-Ward Explorer & Comparison Matrix (Lucide React & Tailwind CSS 4)           |
|  - Loni Kalbhor Rural Civic & Finance Dashboard                                   |
|  - Civic Services: Water, Sanitation, Roads, Facilities, Complaints & Feedback    |
+-----------------------------------------------------------------------------------+
|                                 DATA ACCESS LAYER                                 |
|                               (dataProvider.ts)                                   |
+-----------------------------------------------------------------------------------+
|                 |                                                 |               |
|                 v                                                 v               v
|  +-----------------------------+                 +------------------------------+ |
|  |     PMC RECONCILED DATA     |                 |     LONI KALBHOR DATASET     | |
|  | - 31 Verified Active Records|                 | - Village Profile & LGD Code | |
|  | - 12 Quarantined Reviews    |                 | - Census 2011 Demographics   | |
|  | - 20 Dept Profiles          |                 | - Water, Roads & Facilities  | |
|  | - 15 Ward Intelligence Docs |                 | - Panchayat Local Finance    | |
|  +-----------------------------+                 +------------------------------+ |
+-----------------------------------------------------------------------------------+
|                               VERIFICATION & TESTING                              |
|  - scripts/run_audit_tests.ts (17 Automated Programmatic Assertions)              |
|  - TypeScript Compiler (tsc --noEmit)                                             |
|  - Vite 8 Production Asset Bundler                                                |
+-----------------------------------------------------------------------------------+
```

---

## 11. Data Flow & 12. Data Storage Design
The application operates on an immutable, strongly-typed in-memory relational structure:
- **`src/types/index.ts`**: Core interfaces (`ReconciledRecord`, `WardIntelligence`, `DepartmentProfile`, `BudgetTrackerRow`).
- **`src/types/loniKalbhor.ts`**: Rural entity interfaces (`LoniKalbhorDemographics`, `LoniKalbhorFacility`, `LoniKalbhorFinanceRecord`).
- **`src/services/dataProvider.ts`**: Data repository isolating active verified figures from quarantined drafts.

---

## 13. Module Descriptions
1. **Financial Overview & Budget Tracker:** Multi-year comparison of BE, RE, and Actual Spend with variance calculations and utilization percentages.
2. **Ward Explorer:** Detailed civic indicators for all 15 Regional Ward Offices (Aundh-Baner, Kothrud-Bavdhan, Kasba-Vishrambaugwada, Hadapsar-Mundhwa, etc.).
3. **Water & Sanitation Tracker:** 6 Water Treatment Plants and 11 JICA Mula-Mutha STPs (396 MLD capacity).
4. **Roads & Development:** Urban mobility outlays, missing links, and model footpaths.
5. **Loni Kalbhor Rural Dashboard:** Independent Gram Panchayat intelligence.
6. **Citizen Grievance & Feedback Desk:** Client-side guided complaint drafts and data correction submissions.

---

## 14. Financial Analysis Methodology
- **Variance Formula:** $\text{Variance} = \text{Actual Expenditure} - \text{Budget Estimate}$
- **Utilization Efficiency:** $\text{Budget Utilization \%} = \left(\frac{\text{Actual Expenditure}}{\text{Budget Estimate}}\right) \times 100$
- **Double-Counting Prevention:** Departmental sub-heads and superseded commissioner drafts are quarantined in review records.

---

## 15. Geographic Methodology & 16. Verification Procedures
- **Administrative Delineation:** Urban wards mapped to Prabhags 01–41. Loni Kalbhor mapped via Census Code 556123 and LGD Code 189234.
- **Field-Level Evidence:** Every metric links to publisher, document title, publication date, and page/table reference.

---

## 17. Testing & 18. Results
All 17 automated tests in `scripts/run_audit_tests.ts` pass with 100% compliance:
- Zero cross-city or unauthorized entity records.
- Programmatic currency conversion verification ($1 \text{ Cr} = 10^7 \text{ INR}$).
- Successful build via `vite build` generating optimized production assets in `dist/`.

---

## 19. Limitations & 20. Future Scope
- **Current Limitations:** Unclosed future fiscal years (FY 2025-27) have unfinalized statutory actuals. Citizen complaints are exportable drafts rather than real-time municipal API integrations.
- **Future Scope:** Integration of live IoT water SCADA telemetry, integration with PMC CARE REST APIs, and automated parsing of upcoming PMC budget books.

---

## 21. Conclusion & 22. References
JanDhan Insights sets a benchmark for civic intelligence platforms by upholding institutional transparency, rigorous reconciliation, and complete evidence reproducibility.

**Primary References:**
1. PMC Official Civic Portal: `https://www.pmc.gov.in/`
2. OpenCity PMC Budget Datasets: `https://data.opencity.in/dataset/pmc-budgets`
3. PMC Audited Financial Statements: `https://opendata.pmc.gov.in/opendata/6f5d15dd-7fd3-4b53-8a01-f85a00848952.pdf`
4. Census of India 2011 Village Directory (Haveli Taluka, Pune).
5. Ministry of Panchayati Raj Local Government Directory (LGD).

---

## 23. Comprehensive Viva Voce Preparation (50 Questions & Answers)

### A. General & Product Architecture
1. **Q: What is JanDhan Insights?**  
   *A:* An open civic intelligence and financial transparency platform covering Pune Municipal Corporation and Loni Kalbhor Gram Panchayat.
2. **Q: Why is Pune Municipal Corporation separated from Loni Kalbhor?**  
   *A:* PMC is an urban municipal corporation governed by the Maharashtra Municipal Corporations Act, whereas Loni Kalbhor is a rural Gram Panchayat under Haveli Panchayat Samiti and Pune Zilla Parishad.
3. **Q: Does the platform have a backend database?**  
   *A:* No, it is architected as a high-performance, secure, client-side Single Page Application (SPA) with zero external attack surface, hosting immutable, strongly typed, verified datasets.
4. **Q: What is the zero-fabrication transparency rule?**  
   *A:* When official data is missing or unclosed, it is explicitly marked as "Data Not Available" or "Pending FY closure" rather than substituting artificial zero values or guessed numbers.
5. **Q: What are the primary color codes of the design system?**  
   *A:* Ivory Canvas (`#FAF8F3`), Deep Forest Green (`#133429`), Civic Teal (`#0E7C74`), Amber Accent (`#E9A23B`), and Border Neutral (`#E5E0D5`).

### B. Financial Accounting & Reconciliation
6. **Q: What is the headline approved budget for PMC in FY 2026-27?**  
   *A:* ₹15,669.00 Crore (approved by the Standing Committee).
7. **Q: Why was the Commissioner's initial draft budget of ₹13,995.00 Cr quarantined?**  
   *A:* To prevent double counting. The draft budget was subsumed by the final Standing Committee approval of ₹15,669.00 Cr.
8. **Q: What was the audited actual expenditure for PMC in FY 2023-24?**  
   *A:* ₹8,125.60 Crore against a budget estimate of ₹9,515.00 Crore (~85.4% budget utilization).
9. **Q: What is Budget Utilization Percentage?**  
   *A:* $\frac{\text{Actual Expenditure}}{\text{Budget Estimate}} \times 100$.
10. **Q: What is Expenditure Variance?**  
    *A:* $\text{Actual Expenditure} - \text{Budget Estimate}$. Negative variance denotes unspent savings, while positive indicates outlay overruns.
11. **Q: Why are FY 2024-25 departmental sub-heads quarantined in review?**  
    *A:* The 7 departmental sub-heads (roads, water, health, etc.) are already included within the consolidated ₹11,601.00 Cr budget; adding them separately would artificially inflate total municipal expenditure.
12. **Q: How are monetary amounts normalized programmatically?**  
    *A:* Every figure is stored both as `amount_as_printed` and as raw normalized INR integers ($1 \text{ Cr} = 10^7 \text{ INR}$).
13. **Q: What are Revenue Receipts vs Revenue Expenditure?**  
    *A:* Receipts denote operational earnings (property tax, octroi compensation, user charges); expenditure denotes operational outlays (salaries, utilities, maintenance).
14. **Q: What are Capital Expenditures?**  
    *A:* Long-term investments in physical infrastructure (flyovers, water treatment plants, STPs).
15. **Q: What is the BSE Municipal Bond debt recorded for PMC?**  
    *A:* A ₹200.00 Crore 10-year municipal bond issued for the 24x7 water supply project, tracked as a balance sheet stock liability.

### C. Ward Intelligence & Civic Indicators
16. **Q: How many Regional Ward Offices exist in PMC?**  
    *A:* 15 Regional Ward Offices.
17. **Q: How many Electoral Prabhags exist across PMC?**  
    *A:* 41 Prabhags (Prabhag 01 to 41).
18. **Q: What is LPCD?**  
    *A:* Litres Per Capita Daily (standard measurement of municipal domestic water supply).
19. **Q: What is MLD?**  
    *A:* Million Litres per Day (capacity metric for water treatment plants and sewage treatment plants).
20. **Q: What is TPD?**  
    *A:* Tonnes Per Day (solid waste handling and processing volume).
21. **Q: What is the total combined capacity of PMC's 11 JICA STPs?**  
    *A:* 396 MLD under the Mula-Mutha river pollution abatement project.
22. **Q: What is the daily solid waste processing capacity in Pune?**  
    *A:* Approximately 2,200 to 2,400 TPD managed with the SWaCH cooperative and municipal processing facilities.
23. **Q: How many public clinics exist under the Arogyavardhini initiative?**  
    *A:* 96 operational Arogyavardhini clinics and municipal maternity homes.
24. **Q: How many municipal fire stations are operational in Pune?**  
    *A:* 20 operational stations with 5 planned expansions.
25. **Q: Why is ward actual expenditure marked as "Data Not Available"?**  
    *A:* PMC does not publish machine-readable ward-level audited expenditure in open data formats; fabricating numbers would violate data integrity principles.

### D. Loni Kalbhor Integration
26. **Q: What is the Census 2011 population of Loni Kalbhor?**  
    *A:* 27,814 residents (14,750 male, 13,064 female).
27. **Q: What is the current projected population of Loni Kalbhor?**  
    *A:* Approximately 65,000 to 72,000 residents due to rapid suburbanization along NH 65.
28. **Q: What is the Local Government Directory (LGD) code for Loni Kalbhor?**  
    *A:* LGD Code: 189234.
29. **Q: What is the Census 2011 village code for Loni Kalbhor?**  
    *A:* Village Census Code: 556123.
30. **Q: Which major highway passes through Loni Kalbhor?**  
    *A:* Pune-Solapur National Highway (NH 65).
31. **Q: Which railway station serves Loni Kalbhor?**  
    *A:* Loni Kalbhor Railway Station on the Central Railway Pune-Daund suburban line.
32. **Q: Which major university campus is situated in Loni Kalbhor?**  
    *A:* MIT Art, Design and Technology (MIT-ADT) University at Rajbaug.
33. **Q: What rural piped water scheme serves Loni Kalbhor?**  
    *A:* The Jal Jeevan Mission (JJM) rural piped water distribution scheme (~5.1 MLD actual supply).
34. **Q: What is the annual property/house tax collected by Loni Kalbhor Gram Panchayat?**  
    *A:* Approximately ₹1.95 Crore in FY 2024-25.
35. **Q: How are Loni Kalbhor funds tracked?**  
    *A:* Separately via the eGramSwaraj portal and Pune Zilla Parishad disbursals.

### E. Frontend Engineering & React
36. **Q: Which version of React is used?**  
    *A:* React 19.
37. **Q: How is client-side routing implemented?**  
    *A:* Using clean browser HTML5 History APIs (`pushState` and `popstate` listeners) mapped across 20 canonical application routes with URL aliases.
38. **Q: How are breadcrumbs generated?**  
    *A:* Dynamically calculated in `src/utils/navigation.ts` by inspecting the normalized active page key against `NAV_GROUPS`.
39. **Q: What charting library powers the analytics?**  
    *A:* Recharts 3, leveraging responsive SVG containers (`ResponsiveContainer`, `BarChart`, `ComposedChart`).
40. **Q: How is styling implemented?**  
    *A:* Tailwind CSS 4 utilizing modern `@import "tailwindcss";` without runtime CSS-in-JS overhead.
41. **Q: How is keyboard accessibility handled?**  
    *A:* Focus trapping, visible outline rings, Escape key modal/drawer dismissal, and global search shortcuts (`/` and `Ctrl/Cmd+K`).
42. **Q: How are CSV downloads generated?**  
    *A:* Client-side programmatic Blob generation using UTF-8 `data:text/csv` URI encoding and virtual DOM anchor element triggers.

### F. Security, Testing & DevOps
43. **Q: How many tests run in the automated test suite?**  
    *A:* 17 programmatic assertions in `scripts/run_audit_tests.ts`.
44. **Q: What command executes the test suite?**  
    *A:* `npm test`.
45. **Q: What does Test #3 verify?**  
    *A:* Strict PMC exclusivity—ensuring zero Mumbai BMC, Jaipur, or PCMC records enter the dataset.
46. **Q: What does Test #7 verify?**  
    *A:* That all 7 FY 2024-25 PMC departmental sub-heads are quarantined in review and excluded from active aggregates.
47. **Q: How is direct page refresh supported on static hosts like Vercel or Netlify?**  
    *A:* Via `vercel.json` rewrites (`/(.*)` -> `/index.html`) and `public/_redirects` (`/* /index.html 200`).
48. **Q: What SEO files are provided?**  
    *A:* `public/robots.txt` and `public/sitemap.xml` indexing all 20 pages.
49. **Q: How is file upload secured in the feedback forms?**  
    *A:* File extension validation, MIME-type verification, and a hard 5 MB size constraint.
50. **Q: Why does this architecture guarantee high performance and low cost?**  
    *A:* Being a pre-built static bundle (`dist/`), it can be hosted on edge CDNs (Vercel, Cloudflare, Netlify) with zero server maintenance costs and instant sub-second response times.

---

## 24. 5–7 Minute Project Demonstration Script

**[Minute 0:00 - 1:00] Introduction & Problem Motivation**  
*"Good morning respected evaluators. Today I am presenting JanDhan Insights, an open civic intelligence and financial transparency platform designed for Pune Municipal Corporation (PMC) and the rural settlement of Loni Kalbhor. Urban municipal budgets exceed tens of thousands of crores, yet citizens and researchers find this data trapped in dense, multi-hundred-page scanned PDFs. JanDhan Insights solves this by converting raw public records into authenticated, verifiable civic intelligence with zero fabricated numbers."*

**[Minute 1:00 - 2:15] Architecture & Location Switching**  
*"Notice our header. We introduce an instant Location Selector distinguishing urban municipal governance from rural governance. Pune Municipal Corporation operates across 516 sq. km with an approved annual budget of ₹15,669 Crore. Conversely, clicking Loni Kalbhor immediately transitions to a dedicated rural dashboard governing Haveli Taluka's Gram Panchayat under Census Code 556123, ensuring rural and urban data are never conflated."*

**[Minute 2:15 - 3:30] Financial Reconciliation & Zero Double-Counting**  
*"Let's explore our Financial Overview and Budget Tracker. Here you see our 5-year outlay comparison. In FY 2023-24, PMC budgeted ₹9,515 Crore, revised it to ₹9,200 Crore, and audited actual expenditure closed at ₹8,125.60 Crore—representing an 85.4% budget utilization efficiency. Crucially, our platform enforces a strict quarantine rule: the initial draft budget of ₹13,995 Crore is quarantined to avoid double-counting against the final Standing Committee approval of ₹15,669 Crore. Missing figures are transparently labeled 'Pending FY closure'."*

**[Minute 3:30 - 4:45] Ward Explorer & Civic Dashboards**  
*"Moving to our Civic Explorer, our Ward Explorer provides detailed civic intelligence across all 15 Regional Ward Offices and 41 Prabhags—including water supply in LPCD, underground drainage coverage %, school counts, and nearby sewage treatment plants. Citizens can compare any two wards side-by-side or download verified CSV datasets. Under Water & Sanitation, we map all 6 Water Treatment Plants and 11 JICA Mula-Mutha STPs with their 396 MLD combined capacity."*

**[Minute 4:45 - 5:45] Automated Verification & Technical Quality**  
*"On the technical side, the application is built with React 19, TypeScript, and Vite. It features an automated 17-point test suite executing via `npm test` that validates schema integrity, mathematical currency conversions, and jurisdictional isolation. Every single record includes a direct URL and table reference to authentic PMC or OpenCity publications."*

**[Minute 5:45 - 6:30] Conclusion & Viva Handover**  
*"In summary, JanDhan Insights replaces opacity and unverified dashboard claims with reproducible evidence, rigorous double-count prevention, and honest disclosure. The project builds to a production-ready static bundle ready for immediate public deployment. Thank you, and I am now ready for your questions."*
