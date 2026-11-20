# JanDhan Insights — Data Methodology & Transformation Protocols

## 1. Normalization & Amount Conversion
All monetary figures printed in lakhs, thousands, or rupees in source documents are normalized into **Crores INR** ($1 \text{ Cr} = 10^7 \text{ INR}$) and **Raw INR Units** to maintain mathematical precision without rounding errors.

## 2. Double-Count Prevention & Quarantine Logic
To prevent inflating municipal outlays, departmental sub-heads (such as individual road, water, and health allocations that are already encompassed within the consolidated municipal fund budget) are marked as `Partially Verified (Quarantined)` and isolated into review arrays (`ALL_REVIEW_RECORDS`), ensuring they are excluded from verified active totals.

## 3. Handling Missing Data (Null vs. Zero)
Missing values (such as actual expenditures for ongoing fiscal years or unprinted revised estimates) are stored as `null` in the dataset and rendered as `"Data Not Available"` or `"Pending FY closure"` in the UI. No artificial zero values are substituted.
