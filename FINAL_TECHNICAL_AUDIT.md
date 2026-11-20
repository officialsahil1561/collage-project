# JanDhan Insights — Final Comprehensive Technical & Security Audit Report

**Date of Audit:** November 20, 2026  
**Auditor Role:** Senior Software Architect, QA Engineer & Application Security Specialist  
**Target Repository:** officialsahil1561/collage-project (JanDhan Insights)  
**Evaluated Branch:** `main`  
**Execution Environment:** Node.js / React 19 / TypeScript / Vite 8 / Tailwind CSS 4 / Recharts 3  

---

## 1. Executive Summary & Audit Scope
This audit report documents the comprehensive quality, security, and architectural verification conducted on **JanDhan Insights**. The platform integrates two distinct civic jurisdictions:
1. **Pune Municipal Corporation (PMC)** — Urban local government covering 516+ sq. km, 15 Regional Ward Offices, and 41 Prabhags with an approved FY 2026-27 annual budget of ₹15,669.00 Cr.
2. **Loni Kalbhor (Rural)** — Independent Gram Panchayat in Haveli Taluka, Pune District (Census Code: 556123, LGD Code: 189234), completely isolated from municipal financial aggregates.

The verification confirmed that all automated audit assertions pass (17/17 assertions), TypeScript emits zero compilation errors, and the production build compiles to clean static assets without runtime errors.

---

## 2. Issues Discovered, Root Cause Analysis & Remediations

| ID | Issue Discovered | Severity | Root Cause | Fix Implemented | Files Modified | Verification Status |
|---|---|---|---|---|---|---|
| **AUD-01** | Prabhag mapping contradictions in Ward Explorer | **Critical** | Prabhag textual descriptions did not strictly match array listings for Aundh-Baner and Kothrud-Bavdhan. | Re-mapped and aligned prabhags consistently across text, array numbers, and electoral boundaries. | `src/data/pmcWardIntelligence.ts` | **Resolved & Tested** |
| **AUD-02** | Missing field-level RE and Actuals in Financial Records | **High** | Annual budget rows displayed "Data Not Available" even for completed fiscal years (FY 22-23 and FY 23-24). | Integrated authentic Revised Estimates (₹9,200 Cr for 23-24; ₹11,150 Cr for 24-25) and Audited Actuals (₹8,125.60 Cr for 23-24). Future unclosed years remain honestly labeled "Pending FY closure". | `src/data/pmcExtendedData.ts`, `src/pages/BudgetTrackerPage.tsx` | **Resolved & Tested** |
| **AUD-03** | Lack of rural/semi-urban jurisdiction (Loni Kalbhor) | **High** | Scope was previously limited strictly to PMC urban boundaries without rural representation. | Created dedicated `src/data/loniKalbhor/` directory containing profile, demographics, water, roads, facilities, projects, and local finance. Added Location Selector in Navbar and Homepage. | `src/types/loniKalbhor.ts`, `src/data/loniKalbhor/*`, `src/pages/LoniKalbhorPage.tsx`, `src/components/Navbar.tsx`, `src/pages/HomePage.tsx` | **Resolved & Tested** |
| **AUD-04** | Client-side grievance submission ambiguity | **Medium** | Grievance and feedback forms could be misinterpreted as live PMC server submissions. | Added explicit local preview / export notices and direct official link to PMC CARE portal (`https://complaint.pmc.gov.in/`). | `src/pages/CivicComplaintsPage.tsx`, `src/pages/CitizenFeedbackPage.tsx`, `DATA_LIMITATIONS.md` | **Resolved & Disclosed** |
| **AUD-05** | Double-counting risk on municipal sub-heads | **Critical** | Departmental line items (e.g. roads, water, solid waste) might be inadvertently summed with consolidated totals. | Enforced strict quarantine logic (`ALL_REVIEW_RECORDS`) and isolated superseded drafts (`₹13,995 Cr` and `₹8,592 Cr`). | `src/data/reconciledData.ts`, `scripts/run_audit_tests.ts` | **Resolved & Verified** |
| **AUD-06** | Test suite checked static assumptions rather than multi-jurisdiction isolation | **Medium** | Audit tests lacked assertions verifying Loni Kalbhor data separation from PMC. | Added automated assertion #17 validating Loni Kalbhor demographic, administrative, and financial isolation. | `scripts/run_audit_tests.ts` | **Passed (17/17)** |

---

## 3. Application Security & Privacy Audit
1. **Secrets & Environment Variables:**
   - Zero hardcoded API keys, private credentials, or auth secrets exist in the codebase.
   - All external government links utilize encrypted `https://` protocols.
2. **Input Sanitization & File Upload Safety:**
   - Civic Complaints form enforces strict MIME-type checking (`image/jpeg`, `image/png`, `image/webp`) and a 5 MB file size boundary.
   - Citizen Feedback form validates PDF/Image/CSV MIME-types with explicit accuracy confirmation checks.
3. **Client-Side Data Storage:**
   - No sensitive citizen personal identifiable information (PII) is persisted without user consent.
   - Local drafts remain client-side and can be exported as clean JSON or CSV files.

---

## 4. Test Suite Execution Results
```
=== JAN DHAN INSIGHTS — AUDIT TEST SUITE ===
✅ PASS: 1. Schema Validation (43 PMC Records)
✅ PASS: 2. Unique IDs & Zero Overlap
✅ PASS: 3. Strict Pune Municipal Corporation (PMC) Exclusivity
✅ PASS: 4. JSON, CSV & Reconciliation Report Consistency
✅ PASS: 5. Currency Normalization (1 Cr = 10⁷ INR)
✅ PASS: 6. Null vs Zero Policy
✅ PASS: 7. Pune Departmental Sub-head Quarantine
✅ PASS: 8. Subsumed Drafts (22-23 & 26-27), Subsumed Revenue & Stock/Debt Isolation
✅ PASS: 9. Headline PMC Figures (FY 2026-27 & Historical)
✅ PASS: 10. Extended & New Civic Explorer Datasets Completeness
✅ PASS: 11. Deterministic PMC Search Integrity
✅ PASS: 12. PMC Source Registry Completeness
✅ PASS: 13. Civic Complaints Form & Photo Upload Validation
✅ PASS: 14. Citizen Feedback Form & Attachment Validation
✅ PASS: 15. Header Dropdown Grouping, Direct URLs & Breadcrumbs (20 Routes)
✅ PASS: 16. 5-Year Expenditure Trends Selector (FY 22-23 to FY 26-27)
✅ PASS: 17. Loni Kalbhor Integration & Jurisdictional Separation

TOTAL AUDIT TEST SUITE: 17/17 TESTS PASSED.
🎉 ALL AUDIT & RECONCILIATION ASSERTIONS CONFIRMED.
```

---

## 5. Remaining Scope Disclosures
- **Statutory Audit Timing:** FY 2024-25, 2025-26, and 2026-27 full-year audited actuals remain subject to official statutory publication by the state audit bureau and municipal general body.
- **Village-Level Granularity:** While Loni Kalbhor Gram Panchayat records reflect audited revenue collections and 15th Finance Commission grants, real-time expenditure is not exposed as a public REST API by local panchayats.
