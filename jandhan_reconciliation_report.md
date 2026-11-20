# JanDhan Insights — Pune Municipal Corporation (PMC) Data Reconciliation & Audit Report

**Scope:** Exclusively Pune Municipal Corporation (PMC), Pune, Maharashtra, India  
**Financial Years Covered:** FY 2022-23 through FY 2026-27  
**Last Audited:** 2026-11-19  

---

## 1. Executive Audit Summary

| Metric | Value | Notes |
|---|---:|---|
| **Authority Covered** | **Pune Municipal Corporation (PMC)** | Strictly excludes PCMC, Pune/Khadki Cantonments, and non-PMC PMRDA works |
| **Total Reconciled Financial Records** | **43** | Zero duplicate IDs; 100% schema validated |
| **Active Verified Records (`aggregation_eligible: true`)** | **31** | Stored in `jandhan_municipal_finance_verified.json` & `.csv` |
| **Quarantined Review Records (`aggregation_eligible: false`)** | **12** | Stored in `jandhan_review_file.json` to prevent double counting |
| **Primary Official Sources Registered** | **6** | Stored in `jandhan_source_registry.json` |
| **Administrative Coverage** | **15 Regional Ward Offices · 41 Prabhags** | Mapped across 5 DMC Zones from `pmc.gov.in` |

---

## 2. Headline PMC Financial Figures (Verified)

- **FY 2026-27 Standing Committee Final Approved Budget (BE):** `₹15,669.00 Crore` (`PMC_202627_BE_039`) — up `+24.2%` over FY 2025-26 Proposed BE (`₹12,618.09 Cr`).
  - Urban Mobility & Roads Outlay: `₹1,800.00 Crore` (`PMC_202627_DEP_040`) — includes ~65 km new roads & missing links.
  - Land Acquisition Provision: `₹400.00 Crore` (`PMC_202627_DEP_042`) — DP roads, missing links, and footpaths (`₹85 Cr`).
  - Property Tax Revenue Target (BE): `₹3,152.00 Crore` (`PMC_202627_REC_041`).
- **FY 2025-26 Proposed Budget Outlay (BE):** `₹12,618.09 Crore` (`PMC_202526_BE_001`)
  - Revenue Expenditure (BE): `₹7,093.00 Crore` (`56.2%`)
  - Capital Expenditure (BE): `₹5,524.00 Crore` (`43.8%`)
  - Water Supply Provision: `₹1,665.00 Crore` | Town Planning & Central Schemes: `₹1,630.00 Crore` | Merged Villages: `₹623.00 Crore` | PMPML PMC Share: `₹508.07 Crore` (`₹484.96 Cr` VGF + `₹23.11 Cr` concessions)
- **FY 2024-25 Consolidated Approved Budget (BE):** `₹11,601.00 Crore` (`PMC_202425_BE_002`)
  - Verified Property Tax Actual Collection: `₹2,360.00 Crore`
- **FY 2023-24 Audited Financial Statement:**
  - Approved Budget Estimate (BE): `₹9,515.00 Crore` (`PMC_202324_BE_010`)
  - Audited Total Actual Expenditure: `₹8,125.60 Crore` (`PMC_202324_ACT_009`, `85.4%` budget utilization)
  - Audited Revenue Expenditure: `₹5,910.59 Crore` | Audited Revenue Receipts: `₹11,206.84 Crore`
- **FY 2022-23 Standing Committee Approved Budget (BE):** `₹9,716.00 Crore` (`PMC_202223_BE_011`)

---

## 3. Quarantine & Double-Count Prevention Decisions (12 Review Records)

All 12 quarantined records remain inspectable inside the **Financial Records** ledger and **Audit Report** tab with `aggregation_eligible: false`:

1. **FY 2026-27 Commissioner Initial Draft (`PMC_202627_BE_043` — `₹13,995.00 Cr`):** Quarantined as `Rejected / Subsumed` because it was superseded by the Standing Committee Final Approved Budget (`₹15,669.00 Cr`, `PMC_202627_BE_039`).
2. **FY 2024-25 Departmental Sub-heads (`PMC_202425_BE_003`–`008`, `030` — 7 records totaling `₹5,336.40 Cr`):** Quarantined as `Partially Verified` so sectoral lines (Water, Roads, SWM, Drainage, Health, Education, Parks) are not added onto the consolidated `₹11,601.00 Cr` FY 2024-25 BE.
3. **FY 2022-23 Commissioner Initial Draft (`PMC_202223_BE_033` — `₹8,592.00 Cr`):** Quarantined as `Rejected / Subsumed` in favor of the Standing Committee final budget (`₹9,716.00 Cr`, `PMC_202223_BE_011`).
4. **FY 2023-24 Own-Source Revenue Component (`PMC_202324_REC_034` — `₹10,632.15 Cr`):** Quarantined as `Rejected / Subsumed` because it is already included inside Audited Total Revenue Receipts (`₹11,206.84 Cr`, `PMC_202324_REC_020`).
5. **Balance Sheet Stock (`PMC_202324_BAL_035` — `₹52,698.00 Cr`) & Municipal Bond Debt (`PMC_202324_DEBT_036` — `₹200.00 Cr`):** Quarantined as `Rejected / Reclassified` because balance-sheet stocks and bond principal liabilities must never be added to annual income or expenditure flows.

---

## 4. Transparent Missing-Data Policy (`Data Not Available`)

Where official PMC portals or audited accounts do not publish a field, JanDhan Insights explicitly renders `Data Not Available` rather than estimating or substituting `0`:

- **FY 2024-25, FY 2025-26 & FY 2026-27 Audited Actual Expenditure:** Not yet published as closed audited statements.
- **Ward-Wise / Prabhag-Wise Municipal Budgets & Actual Spending:** PMC does not publish machine-readable Prabhag-level financial allocations or actual spend tables.
- **Standalone Project Disbursement Totals, Contractors (AOC), & Revised Schedules:** Not consistently itemized in open-data tables across all projects.
- **Real-Time Live AQI & Daily Household Water Supply Hours:** PMC Environment Status Report (ESR) publishes annual benchmark metrics; live sensor feeds are not integrated.
