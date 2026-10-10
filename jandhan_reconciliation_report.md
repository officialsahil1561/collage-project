# JanDhan Insights — Municipal Finance Data Reconciliation & Audit Report

**Date:** 2026-10-10  
**Scope:** Reconcile and audit 30 primary municipal finance records across four distinct municipal corporations.  
**Auditor:** Senior Full-Stack Engineer, Financial-Data Auditor & Civic-Tech UI Designer  

---

## 1. Executive Summary

Every one of the 30 target records supplied from the Gemini municipal finance dataset has been audited, categorized, mathematically normalized, and assigned an unambiguous verification status:

| Dataset File | Record Count | Description |
|:---|:---:|:---|
| `jandhan_municipal_finance_verified.json` | **19** | Active, verified records eligible for category-isolated public spending summaries. |
| `jandhan_municipal_finance_verified.csv` | **19** | Tabular synchronized CSV representation with exact matching columns and normalized INR values. |
| `jandhan_review_file.json` | **11** | Quarantined records kept out of active spending totals with explicit audit reasons. |
| `jandhan_source_registry.json` | **7** | Primary source citations with official URLs, retrieval timestamps, and known limitations. |
| **Total Unique Records** | **30** | Exactly 30 unique IDs accounted for. Zero duplicates. Zero overlaps. Zero omissions. |

---

## 2. Municipal Authority Separation

All four authorities are strictly maintained as independent civic bodies:
1. **Pune Municipal Corporation (PMC)** — 3 Active Verified, 7 Quarantined in Review.
2. **Brihanmumbai Municipal Corporation (BMC)** — 13 Active Verified, 1 Quarantined in Review.
3. **Greater Jaipur Municipal Corporation (JMC Greater)** — 3 Active Verified, 2 Quarantined in Review.
4. **Jaipur Heritage Municipal Corporation (JMC Heritage)** — 0 Active Verified, 1 Quarantined in Review (Statutory Deficit Metric).

---

## 3. Specific Audit Decisions & Evidence Reconciliations

### 1. Pune Departmental Allocations (7 Records: `PMC_202425_BE_003` to `PMC_202425_BE_008` & `PMC_202425_BE_030`)
- **Action:** Held in `jandhan_review_file.json` under status **Partially Verified**.
- **Reason:** Departmental sub-head provisions (Water Supply ₹1,245.50 Cr, Roads ₹1,420.00 Cr, Waste ₹850.25 Cr, Drainage ₹620.10 Cr, Health ₹480.00 Cr, Education ₹510.40 Cr, Parks ₹210.15 Cr) require printed ward schedule confirmation. Quarantined to prevent double-counting with PMC's baseline total outlay of ₹11,601.00 Cr (`PMC_202425_BE_002`).

### 2. BMC Actual Capital Expenditure (`BMC_202324_ACT_023`)
- **Action:** Held in `jandhan_review_file.json` under status **Unverified**.
- **Reason:** Amount of ₹18,281.78 Cr is cited in a speech comparative table. Withheld from verified aggregates until a formal audited CAG or Local Fund Audit balance sheet is published.

### 3. BMC Total Budget Scope (`BMC_202526_BE_010`)
- **Action:** Verified and active in `verified.json` (₹74,427.41 Cr).
- **Evidence:** Verified against Page 6 of the Municipal Commissioner Speech PDF: explicitly covers combined budget outlays across Funds A (City), B (Improvement), E (Education), G (Water & Sewerage), and financial support to T (Transport/BEST).

### 4. Jaipur Octroi Grant Subsumption (`JMC_GR_202223_ACT_029`)
- **Action:** Quarantined in `jandhan_review_file.json` as **Rejected / Subsumed**.
- **Reason:** Account Head 1202001 (₹275.00 Cr octroi compensation) is already included in JMC Greater's Total Revenue Receipts of ₹502.99 Cr (`JMC_GR_202223_ACT_024`). Quarantined to prevent double-counting.

### 5. Jaipur Balance-Sheet Metric (`JMC_GR_202122_ACT_027`)
- **Action:** Quarantined as **Rejected / Reclassified**.
- **Reason:** Amount of ₹1,110.06 Cr represents cumulative balance-sheet assets and liabilities. Stock assets cannot be added to expenditure or revenue cash flows.

### 6. Jaipur Heritage Deficit Metric (`JMC_HER_202223_ACT_028`)
- **Action:** Quarantined as **Rejected / Reclassified**.
- **Reason:** Metric of ₹42.15 Cr represents an accounting deficit on income and expenditure, not total municipal spending outflow.

---

## 4. Master Status Ledger

| # | Unique ID | Authority | Financial Year | Amount (₹ Cr) | Category | Audit Status | Dataset Placement |
|:--|:---|:---|:---:|:---:|:---|:---|:---|
| 1 | `PMC_202526_BE_001` | PMC | 2025-26 | 12,618.09 | Budget Estimates (BE) | Verified | `jandhan_municipal_finance_verified` |
| 2 | `PMC_202425_BE_002` | PMC | 2024-25 | 11,601.00 | Budget Estimates (BE) | Verified | `jandhan_municipal_finance_verified` |
| 3 | `PMC_202425_BE_003` | PMC | 2024-25 | 1,245.50 | Budget Estimates (BE) | Partially Verified | `jandhan_review_file` (Quarantined) |
| 4 | `PMC_202425_BE_004` | PMC | 2024-25 | 1,420.00 | Budget Estimates (BE) | Partially Verified | `jandhan_review_file` (Quarantined) |
| 5 | `PMC_202425_BE_005` | PMC | 2024-25 | 850.25 | Budget Estimates (BE) | Partially Verified | `jandhan_review_file` (Quarantined) |
| 6 | `PMC_202425_BE_006` | PMC | 2024-25 | 620.10 | Budget Estimates (BE) | Partially Verified | `jandhan_review_file` (Quarantined) |
| 7 | `PMC_202425_BE_007` | PMC | 2024-25 | 480.00 | Budget Estimates (BE) | Partially Verified | `jandhan_review_file` (Quarantined) |
| 8 | `PMC_202425_BE_008` | PMC | 2024-25 | 510.40 | Budget Estimates (BE) | Partially Verified | `jandhan_review_file` (Quarantined) |
| 9 | `PMC_202324_ACT_009` | PMC | 2023-24 | 8,125.60 | Actual Expenditure | Verified | `jandhan_municipal_finance_verified` |
| 10 | `BMC_202526_BE_010` | BMC | 2025-26 | 74,427.41 | Budget Estimates (BE) | Verified | `jandhan_municipal_finance_verified` |
| 11 | `BMC_202526_BE_011` | BMC | 2025-26 | 3,544.34 | Budget Estimates (BE) | Verified | `jandhan_municipal_finance_verified` |
| 12 | `BMC_202526_BE_012` | BMC | 2025-26 | 43,162.23 | Capital Expenditure | Verified | `jandhan_municipal_finance_verified` |
| 13 | `BMC_202425_RE_013` | BMC | 2024-25 | 37,332.08 | Revised Estimates (RE) | Verified | `jandhan_municipal_finance_verified` |
| 14 | `BMC_202425_ACT_014` | BMC | 2024-25 | 18,991.65 | Actual Expenditure (9M) | Verified | `jandhan_municipal_finance_verified` |
| 15 | `BMC_202526_BE_015` | BMC | 2025-26 | 31,204.53 | Revenue Expenditure | Verified | `jandhan_municipal_finance_verified` |
| 16 | `BMC_202425_RE_016` | BMC | 2024-25 | 13,331.63 | Revenue Receipts | Verified | `jandhan_municipal_finance_verified` |
| 17 | `BMC_202526_BE_017` | BMC | 2025-26 | 14,398.16 | Revenue Receipts | Verified | `jandhan_municipal_finance_verified` |
| 18 | `BMC_202425_RE_018` | BMC | 2024-25 | 6,200.00 | Revenue Receipts | Verified | `jandhan_municipal_finance_verified` |
| 19 | `BMC_202526_BE_019` | BMC | 2025-26 | 9,700.00 | Revenue Receipts | Verified | `jandhan_municipal_finance_verified` |
| 20 | `BMC_202526_BE_020` | BMC | 2025-26 | 2,363.15 | Revenue Receipts | Verified | `jandhan_municipal_finance_verified` |
| 21 | `BMC_202526_BE_021` | BMC | 2025-26 | 1,870.00 | Capital Expenditure | Verified | `jandhan_municipal_finance_verified` |
| 22 | `BMC_202526_BE_022` | BMC | 2025-26 | 2,400.00 | Capital Expenditure | Verified | `jandhan_municipal_finance_verified` |
| 23 | `BMC_202324_ACT_023` | BMC | 2023-24 | 18,281.78 | Actual Expenditure | Unverified | `jandhan_review_file` (Quarantined) |
| 24 | `JMC_GR_202223_ACT_024` | JMC Greater | 2022-23 | 502.99 | Revenue Receipts | Verified | `jandhan_municipal_finance_verified` |
| 25 | `JMC_GR_202223_ACT_025` | JMC Greater | 2022-23 | 520.76 | Revenue Expenditure | Verified | `jandhan_municipal_finance_verified` |
| 26 | `JMC_GR_202223_ACT_026` | JMC Greater | 2022-23 | 300.84 | Capital Expenditure | Verified | `jandhan_municipal_finance_verified` |
| 27 | `JMC_GR_202122_ACT_027` | JMC Greater | 2021-22 | 1,110.06 | Balance Sheet Measure | Rejected / Reclassified | `jandhan_review_file` (Quarantined) |
| 28 | `JMC_HER_202223_ACT_028` | JMC Heritage | 2022-23 | 42.15 | Deficit Metric | Rejected / Reclassified | `jandhan_review_file` (Quarantined) |
| 29 | `JMC_GR_202223_ACT_029` | JMC Greater | 2022-23 | 275.00 | Revenue Receipts Sub-component | Rejected / Subsumed | `jandhan_review_file` (Quarantined) |
| 30 | `PMC_202425_BE_030` | PMC | 2024-25 | 210.15 | Budget Estimates (BE) | Partially Verified | `jandhan_review_file` (Quarantined) |
