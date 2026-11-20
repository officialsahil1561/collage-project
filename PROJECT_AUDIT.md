# JanDhan Insights — Academic Technical Audit & System Provenance Report

**Project Title:** JanDhan Insights: Pune Municipal Corporation (PMC) Financial Transparency & Civic Intelligence Platform  
**Scope:** Pune Municipal Corporation (PMC), Pune, Maharashtra, India (Exclusive 516+ sq. km urban jurisdiction)  
**Target Architecture:** React 19 SPA, TypeScript, Vite 8, Tailwind CSS 4, Recharts 3  

---

## 1. Executive Summary & Audit Objective
This technical audit report provides an academically rigorous evaluation and data provenance record for **JanDhan Insights**, ensuring that every municipal financial figure, ward statistic, and civic indicator is traceable to verifiable public records, government budget statements, or open data catalogues. 

In response to rigorous academic evaluations, this platform strictly enforces:
1. **Zero-Fabrication Policy**: No artificial zero values or guessed interpolations are substituted for missing financial or civic data. Unpublished or unclosed metrics are explicitly labeled as *"Data Not Available"*, *"Pending FY closure"*, or *"Not published in source"* with explanatory tooltips.
2. **Strict Jurisdictional Exclusivity**: Confined exclusively to Pune Municipal Corporation (PMC). All cross-city comparisons, Mumbai BMC, Jaipur Greater/Heritage, and PCMC data mixing are expunged.
3. **Double-Count Isolation (Quarantine)**: Departmental sub-heads and superseded draft budgets are quarantined in review records and strictly excluded from active consolidated totals.
4. **Traceable Data Provenance**: Every financial record and civic metric links directly to its source document title, publishing authority, direct HTTPS URL, and extraction reference.

---

## 2. System Architecture & Data Pipeline
- **Frontend Framework**: React 19 + TypeScript operating as a client-side Single Page Application (SPA) with path-based routing, breadcrumb navigation, and robust state management.
- **Data Provider Layer (`src/services/dataProvider.ts`)**: Centralized data access abstraction separating verified active records from quarantined review records.
- **Automated Verification Suite (`scripts/run_audit_tests.ts`)**: 16+ programmatic assertions validating schema integrity, currency normalization, jurisdictional exclusivity, and reconciliation consistency.

---

## 3. Financial Data Methodology & Reconciliation
- **Currency Normalization**: 1 Crore INR = $10^7$ INR ($10,000,000$ INR). Verified programmatically against printed amounts.
- **Financial Stages**: Explicitly separates Original Budget Estimates (BE), Revised Estimates (RE), and Audited Actual Expenditures (Actuals).
- **Consolidated vs Departmental Isolation**: Consolidated fund outlays (e.g., FY 2026-27 Standing Committee Final Outlay of ₹15,669.00 Cr) are treated as authoritative aggregates. Departmental sub-heads are quarantined where overlapping with consolidated totals.

---

## 4. Ward Intelligence & Geographic Provenance
The 15 Pune Regional Ward Offices are linked to official PMC ward directory and open-data boundary datasets. Prabhag coverages and administrative zones are verified against electoral boundary delineations. Where exact granular actual expenditures are absent from machine-readable open data tables, the platform transparently discloses the limitation rather than fabricating estimates.
