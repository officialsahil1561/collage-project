export type MunicipalAuthority = 'Pune Municipal Corporation';

export type VerificationStatus =
  | 'Verified'
  | 'Partially Verified'
  | 'Unverified'
  | 'Rejected / Reclassified'
  | 'Rejected / Subsumed';

export type FinancialCategory =
  | 'Budget Estimates (BE)'
  | 'Revised Estimates (RE)'
  | 'Actual Expenditure'
  | 'Capital Expenditure'
  | 'Revenue Expenditure'
  | 'Revenue Receipts'
  | 'Balance Sheet Measure'
  | 'Debt & Liabilities';

export type RecordDomain = 'budget' | 'revenue' | 'expenditure' | 'department' | 'liability';

export type SourceClassification =
  | 'Official Budget Estimate'
  | 'Revised Estimate'
  | 'Actual Expenditure'
  | 'Audited Financial Statement'
  | 'Internally Reconciled'
  | 'Unverified / Under Review';

export interface ReconciledRecord {
  unique_id: string;
  city: 'Pune';
  exact_authority: MunicipalAuthority;
  financial_year: string;
  domain: RecordDomain;
  record_type: string;
  department_or_sector: string;
  record_or_project_name: string;
  amount_as_printed: string;
  original_unit: string;
  normalized_inr_unit: number;
  amount_in_crores: number;
  financial_category: FinancialCategory;
  source_classification: SourceClassification;
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

export type FinancialRecord = ReconciledRecord;

export interface DepartmentProfile {
  id: string;
  name: string;
  category: 'Core Infrastructure' | 'Civic Services & Environment' | 'Social & Welfare' | 'Revenue & Administration';
  description: string;
  latestAllocationCrores: number | null;
  latestAllocationFY: string | null;
  allocationStatus: 'Verified' | 'Partially Verified (Quarantined)' | 'Data Not Available';
  linkedRecordIds: string[];
  revenueNote?: string;
  officialUrl: string;
  sourceNote: string;
}

export type ProjectCategory =
  | 'Road Construction & Repairs'
  | 'Bridges & Flyovers'
  | 'Water Supply'
  | 'Drainage & Sewage'
  | 'Public Hospitals'
  | 'Schools & Educational Infrastructure'
  | 'Public Transport & Civic Infrastructure';

export interface Project {
  id: string;
  projectCode?: string;
  category: ProjectCategory;
  name: string;
  officialName: string;
  agency: MunicipalAuthority;
  cityName: 'Pune';
  department: string;
  location: string;
  wardOrPrabhag: string;
  originalEstimatedCost?: number | null;
  revisedCost?: number | null;
  sanctionedCost: number;
  tenderAmount?: number | null;
  costCategory?: string;
  reportedExpenditure?: number | null;
  financialYear: string;
  workOrderDate?: string | null;
  startDate?: string | null;
  expectedCompletionDate?: string | null;
  actualCompletionDate?: string | null;
  physicalProgressPercent?: number | null;
  completionStatus: 'Under Construction' | 'Operational / Completed' | 'Tender Stage' | 'Approved in Budget';
  statusDescription?: string;
  contractorInfo?: string | null;
  sourceUrl: string;
  sourceDocumentTitle: string;
  sourcePageOrTable?: string;
  evidenceLimitations?: string;
  verificationStatus: VerificationStatus;
}

export interface WardOffice {
  id: string;
  wardNumber: number;
  name: string;
  zone: string;
  prabhagCoverage: string;
  keyLocalities: string[];
  includesMergedVillages: boolean;
  boundaryNote: string;
  wardBudgetAvailable: boolean;
  wardBudgetNote: string;
  civicServicesScope: string[];
  complaintsPortal: string;
  officialUrl: string;
}

export interface TenderContract {
  id: string;
  tenderRef: string;
  title: string;
  department: string;
  workDescription: string;
  estimatedCostCrores: number | null;
  awardedAmountCrores: number | null;
  contractor: string | null;
  contractDate: string | null;
  workOrderStatus: string;
  completionCertificateStatus: string;
  contractStatus: 'Awarded / Active' | 'Re-tendered & Awarded' | 'Notice Inviting Tender (NIT) Referenced' | 'Pending Portal Lookup';
  sourceTitle: string;
  sourceUrl: string;
  verificationStatus: VerificationStatus;
  notes: string;
}

export interface CivicAssetIndicator {
  id: string;
  sector:
    | 'Water Supply'
    | 'Roads & Maintenance'
    | 'Drainage'
    | 'Sewage Treatment'
    | 'Solid Waste Collection'
    | 'Public Health'
    | 'Municipal Schools'
    | 'Public Gardens'
    | 'Street Lighting'
    | 'Fire Services'
    | 'Public Toilets'
    | 'Parking Facilities';
  department: string;
  headlineMetric: string;
  metricType: 'Verified Service Data' | 'Official Report Estimate' | 'Granular Count Unavailable';
  details: string;
  serviceCoverageNote: string;
  sourceTitle: string;
  sourceUrl: string;
  reportingYear: string;
}

export interface AuthoritySummary {
  authorityKey: 'pune-pmc';
  authorityName: MunicipalAuthority;
  city: 'Pune';
  stateName: 'Maharashtra';
  latestFinancialYear: string;
  totalBudgetBE: number;
  revenueBudgetBE: number;
  capitalBudgetBE: number;
  previousYearBE: number;
  auditedActualExpenditure: number;
  auditedActualExpenditureFY: string;
  auditedRevenueReceipts: number;
  auditedRevenueReceiptsFY: string;
  auditedRevenueExpenditure: number;
  auditedBalanceSheetSize: number;
  outstandingDebt: number;
  verifiedRecordsCount: number;
  reviewRecordsCount: number;
  departmentsCoveredCount: number;
  verifiedProjectsCount: number;
  wardOfficesCount: number;
  prabhagsCount: number;
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
  financialYear: string;
  category: string;
  domain: string;
  verificationStatus: string;
  searchQuery: string;
}
