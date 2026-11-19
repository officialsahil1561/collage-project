import {
  ReconciledRecord,
  AuthoritySummary,
  SourceRegistryItem,
  Project,
  FilterState,
  DepartmentProfile,
  WardOffice,
  TenderContract,
  CivicAssetIndicator
} from '../types';
import {
  ALL_VERIFIED_RECORDS,
  ALL_REVIEW_RECORDS,
  ALL_RECONCILED_RECORDS,
  PMC_AUTHORITY_SUMMARY,
  MUNICIPAL_SOURCE_REGISTRY,
  VERIFIED_PROJECTS
} from '../data/reconciledData';
import {
  PMC_BUDGET_TRACKER_ROWS,
  PMC_DEPARTMENTS,
  PMC_WARD_OFFICES,
  PMC_TENDERS,
  PMC_CIVIC_ASSETS,
  BudgetTrackerRow
} from '../data/pmcExtendedData';

export const dataProvider = {
  /**
   * Get all verified active PMC records
   */
  getVerifiedRecords(): ReconciledRecord[] {
    return [...ALL_VERIFIED_RECORDS];
  },

  /**
   * Get all review / quarantined PMC records
   */
  getReviewRecords(): ReconciledRecord[] {
    return [...ALL_REVIEW_RECORDS];
  },

  /**
   * Get all audited PMC records across active & review
   */
  getAllAuditedRecords(): ReconciledRecord[] {
    return [...ALL_RECONCILED_RECORDS];
  },

  /**
   * Get the Pune Municipal Corporation authority summary
   */
  getPMCSummary(): AuthoritySummary {
    return { ...PMC_AUTHORITY_SUMMARY };
  },

  /**
   * Get PMC primary source registry
   */
  getSourceRegistry(): SourceRegistryItem[] {
    return [...MUNICIPAL_SOURCE_REGISTRY];
  },

  /**
   * Get verified PMC public projects (optionally filtered by category)
   */
  getProjects(category?: string): Project[] {
    if (!category || category === 'All') {
      return [...VERIFIED_PROJECTS];
    }
    return VERIFIED_PROJECTS.filter((p) => p.category === category);
  },

  /**
   * Get structured Pune Budget Tracker rows (BE vs RE vs Actuals)
   */
  getBudgetTrackerRows(): BudgetTrackerRow[] {
    return [...PMC_BUDGET_TRACKER_ROWS];
  },

  /**
   * Get all 20 PMC department profiles
   */
  getDepartments(): DepartmentProfile[] {
    return [...PMC_DEPARTMENTS];
  },

  /**
   * Get all 15 PMC Regional Ward Offices & 41 Prabhags directory
   */
  getWardOffices(): WardOffice[] {
    return [...PMC_WARD_OFFICES];
  },

  /**
   * Get PMC tenders & contracts
   */
  getTenders(): TenderContract[] {
    return [...PMC_TENDERS];
  },

  /**
   * Get 12 civic infrastructure & ESR service indicators
   */
  getCivicAssets(): CivicAssetIndicator[] {
    return [...PMC_CIVIC_ASSETS];
  },

  /**
   * Filter PMC records safely
   */
  getFilteredRecords(filters: Partial<FilterState> & { includeReview?: boolean }): ReconciledRecord[] {
    const records = filters.includeReview
      ? ALL_RECONCILED_RECORDS
      : ALL_VERIFIED_RECORDS;

    return records.filter((rec) => {
      if (filters.financialYear && filters.financialYear !== 'All') {
        if (rec.financial_year !== filters.financialYear) return false;
      }

      if (filters.category && filters.category !== 'All') {
        if (rec.financial_category !== filters.category) return false;
      }

      if (filters.domain && filters.domain !== 'All') {
        if (rec.domain !== filters.domain) return false;
      }

      if (filters.verificationStatus && filters.verificationStatus !== 'All') {
        if (filters.verificationStatus === 'Verified') {
          if (rec.verification_status !== 'Verified') return false;
        } else if (filters.verificationStatus === 'Review / Quarantined') {
          if (rec.verification_status === 'Verified') return false;
        } else if (rec.verification_status !== filters.verificationStatus) {
          return false;
        }
      }

      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = rec.record_or_project_name.toLowerCase().includes(q);
        const matchesSector = rec.department_or_sector.toLowerCase().includes(q);
        const matchesId = rec.unique_id.toLowerCase().includes(q);
        const matchesDoc = rec.document_title.toLowerCase().includes(q);
        const matchesNote = rec.extraction_note.toLowerCase().includes(q);
        const matchesClass = rec.source_classification.toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesSector &&
          !matchesId &&
          !matchesDoc &&
          !matchesNote &&
          !matchesClass
        ) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * Get PMC departmental records (both active verified provisions and quarantined sub-heads)
   */
  getDepartmentalRecords(): ReconciledRecord[] {
    return ALL_RECONCILED_RECORDS.filter(
      (r) => r.domain === 'department' || r.record_type.includes('Sub-head')
    );
  },

  /**
   * Programmatic reconciliation audit metrics for PMC
   */
  getReconciliationMetrics() {
    const verified = ALL_VERIFIED_RECORDS.length;
    const review = ALL_REVIEW_RECORDS.length;
    const total = ALL_RECONCILED_RECORDS.length;

    const partiallyVerified = ALL_REVIEW_RECORDS.filter(
      (r) => r.verification_status === 'Partially Verified'
    ).length;
    const unverified = ALL_REVIEW_RECORDS.filter(
      (r) => r.verification_status === 'Unverified'
    ).length;
    const rejectedReclassified = ALL_REVIEW_RECORDS.filter(
      (r) => r.verification_status === 'Rejected / Reclassified'
    ).length;
    const rejectedSubsumed = ALL_REVIEW_RECORDS.filter(
      (r) => r.verification_status === 'Rejected / Subsumed'
    ).length;

    return {
      total,
      verified,
      review,
      partiallyVerified,
      unverified,
      rejectedReclassified,
      rejectedSubsumed,
      authoritiesCount: 1
    };
  },

  /**
   * Build CSV string for verified/filtered PMC financial records
   */
  buildRecordsCSV(records: ReconciledRecord[]): string {
    const headers = [
      'unique_id',
      'city',
      'exact_authority',
      'financial_year',
      'domain',
      'record_type',
      'department_or_sector',
      'record_or_project_name',
      'amount_as_printed',
      'original_unit',
      'normalized_inr_unit',
      'amount_in_crores',
      'financial_category',
      'source_classification',
      'document_title',
      'official_document_url',
      'page_or_table_ref',
      'publication_date',
      'date_accessed',
      'verification_status',
      'aggregation_eligible',
      'exclusion_reason'
    ];

    const escapeCsv = (val: string | number | boolean | null | undefined) => {
      if (val === null || val === undefined) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const lines = [headers.join(',')];
    for (const r of records) {
      lines.push(
        [
          r.unique_id,
          r.city,
          r.exact_authority,
          r.financial_year,
          r.domain,
          r.record_type,
          r.department_or_sector,
          r.record_or_project_name,
          r.amount_as_printed,
          r.original_unit,
          r.normalized_inr_unit,
          r.amount_in_crores,
          r.financial_category,
          r.source_classification,
          r.document_title,
          r.official_document_url,
          r.page_or_table_ref,
          r.publication_date,
          r.date_accessed,
          r.verification_status,
          r.aggregation_eligible,
          r.exclusion_reason
        ]
          .map(escapeCsv)
          .join(',')
      );
    }
    return lines.join('\n');
  },

  /**
   * Build CSV string for Budget Tracker table
   */
  buildBudgetTrackerCSV(rows: BudgetTrackerRow[]): string {
    const headers = [
      'id',
      'authority',
      'department',
      'budget_head',
      'financial_year',
      'original_be_crores',
      'revised_re_crores',
      'actual_expenditure_crores',
      'source_classification',
      'verification_status',
      'document_title',
      'source_url',
      'page_ref'
    ];
    const escapeCsv = (val: string | number | null | undefined) => {
      if (val === null || val === undefined) return 'Data Not Available';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };
    const lines = [headers.join(',')];
    for (const row of rows) {
      lines.push(
        [
          row.id,
          'Pune Municipal Corporation',
          row.department,
          row.budgetHead,
          row.financialYear,
          row.originalBE,
          row.revisedRE,
          row.actualExpenditure,
          row.sourceClassification,
          row.verificationStatus,
          row.documentTitle,
          row.sourceUrl,
          row.pageRef
        ]
          .map(escapeCsv)
          .join(',')
      );
    }
    return lines.join('\n');
  }
};
