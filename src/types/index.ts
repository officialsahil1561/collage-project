export type MunicipalAuthority =
  | 'Pune Municipal Corporation'
  | 'Brihanmumbai Municipal Corporation'
  | 'Greater Jaipur Municipal Corporation'
  | 'Jaipur Heritage Municipal Corporation';

export type VerificationStatus =
  | 'Verified'
  | 'Partially Verified'
  | 'Unverified'
  | 'Rejected / Reclassified'
  | 'Rejected / Subsumed'
  | 'Official Document Cited';

export type FinancialCategory =
  | 'Budget Estimates (BE)'
  | 'Revised Estimates (RE)'
  | 'Actual Expenditure'
  | 'Capital Expenditure'
  | 'Revenue Expenditure'
  | 'Revenue Receipts'
  | 'Balance Sheet Measure'
  | 'Deficit Metric';

export interface ReconciledRecord {
  unique_id: string;
  city: 'Pune' | 'Mumbai' | 'Jaipur';
  exact_authority: MunicipalAuthority;
  financial_year: string; // e.g. '2025-26', '2024-25', '2023-24', '2022-23', '2021-22'
  record_type: string;
  department_or_sector: string;
  record_or_project_name: string;
  amount_as_printed: string;
  original_unit: string;
  normalized_inr_unit: number; // in INR rupees (₹1 Cr = 10,000,000)
  amount_in_crores: number; // in Crores INR
  financial_category: FinancialCategory;
  document_title: string;
  official_document_url: string;
  page_or_table_ref: string;
  publication_date: string | null;
  date_accessed: string;
  extraction_note: string;
  verification_status: VerificationStatus;
  aggregation_eligible: boolean;
  exclusion_reason: string | null;
  reason_for_quarantine?: string | null;
}

// For compatibility with earlier interfaces
export type FinancialRecord = ReconciledRecord;

export interface Project {
  id: string;
  name: string;
  officialName: string;
  agency: MunicipalAuthority;
  cityName: 'Pune' | 'Mumbai' | 'Jaipur';
  district?: string;
  location: string;
  sanctionedCost: number; // in Crores
  costCategory?: string;
  reportedExpenditure?: number | null; // in Crores
  financialYear: string;
  startDate?: string;
  expectedCompletionDate?: string;
  physicalProgressPercent?: number | null;
  completionStatus: 'Under Construction' | 'Operational / Completed' | 'Tender Stage' | 'Approved in Budget';
  statusDescription?: string;
  contractorInfo?: string;
  sourceUrl: string;
  sourceDocumentTitle: string;
  sourcePageOrTable?: string;
  evidenceLimitations?: string;
  verificationStatus: VerificationStatus;
}

export interface AuthoritySummary {
  authorityKey: string;
  authorityName: MunicipalAuthority;
  city: 'Pune' | 'Mumbai' | 'Jaipur';
  stateName: string;
  latestFinancialYear: string;
  totalBudgetBE?: number | null; // in Crores
  revisedEstimateRE?: number | null; // in Crores
  auditedActuals?: number | null; // in Crores
  verifiedRecordsCount: number;
  reviewRecordsCount: number;
  coverageStatus: string;
  portalUrl: string;
  accountingScope: string;
  coverageGaps: string;
  notes: string;
}

export interface SourceRegistryItem {
  id: string;
  publisher: string;
  exact_authority: MunicipalAuthority;
  document_title: string;
  document_type: string;
  official_url: string;
  financial_years_covered: string;
  data_categories_supported: string[];
  verification_status: string;
  last_checked_date: string;
  known_limitations: string;
}

export interface FilterState {
  authority: string; // 'All' or specific MunicipalAuthority
  city: string; // 'All' | 'Pune' | 'Mumbai' | 'Jaipur'
  financialYear: string; // 'All' | '2025-26' | '2024-25' | '2023-24' | '2022-23' | '2021-22'
  category: string; // 'All' or FinancialCategory
  verificationStatus: string; // 'All' | 'Verified' | 'Review / Quarantined'
  searchQuery: string;
}
