import {
  ReconciledRecord,
  AuthoritySummary,
  SourceRegistryItem,
  Project,
  MunicipalAuthority,
  FilterState
} from '../types';
import {
  ALL_VERIFIED_RECORDS,
  ALL_REVIEW_RECORDS,
  ALL_RECONCILED_RECORDS,
  MUNICIPAL_AUTHORITIES_SUMMARIES,
  MUNICIPAL_SOURCE_REGISTRY,
  VERIFIED_PROJECTS
} from '../data/reconciledData';

export const dataProvider = {
  /**
   * Get all verified active records (19 records)
   */
  getVerifiedRecords(): ReconciledRecord[] {
    return [...ALL_VERIFIED_RECORDS];
  },

  /**
   * Get all review / quarantined records (11 records)
   */
  getReviewRecords(): ReconciledRecord[] {
    return [...ALL_REVIEW_RECORDS];
  },

  /**
   * Get all 30 audited records across active & review
   */
  getAllAuditedRecords(): ReconciledRecord[] {
    return [...ALL_RECONCILED_RECORDS];
  },

  /**
   * Get summary for a specific municipal authority or default
   */
  getAuthoritySummary(authorityKey: string): AuthoritySummary {
    return (
      MUNICIPAL_AUTHORITIES_SUMMARIES[authorityKey] ||
      MUNICIPAL_AUTHORITIES_SUMMARIES['pune-pmc']
    );
  },

  /**
   * Get all 4 municipal authority summaries
   */
  getAllAuthoritySummaries(): AuthoritySummary[] {
    return Object.values(MUNICIPAL_AUTHORITIES_SUMMARIES);
  },

  /**
   * Get source registry
   */
  getSourceRegistry(): SourceRegistryItem[] {
    return [...MUNICIPAL_SOURCE_REGISTRY];
  },

  /**
   * Get capital projects supported by verified records
   */
  getProjects(authorityName?: string): Project[] {
    if (!authorityName || authorityName === 'All') {
      return [...VERIFIED_PROJECTS];
    }
    return VERIFIED_PROJECTS.filter((p) => p.agency === authorityName);
  },

  /**
   * Filter records with strict safety
   */
  getFilteredRecords(filters: Partial<FilterState> & { includeReview?: boolean }): ReconciledRecord[] {
    const records = filters.includeReview
      ? ALL_RECONCILED_RECORDS
      : ALL_VERIFIED_RECORDS;

    return records.filter((rec) => {
      // Authority filter
      if (filters.authority && filters.authority !== 'All') {
        if (rec.exact_authority !== filters.authority) return false;
      }

      // City filter
      if (filters.city && filters.city !== 'All') {
        if (rec.city !== filters.city) return false;
      }

      // Financial year filter
      if (filters.financialYear && filters.financialYear !== 'All') {
        if (rec.financial_year !== filters.financialYear) return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'All') {
        if (rec.financial_category !== filters.category) return false;
      }

      // Verification status filter
      if (filters.verificationStatus && filters.verificationStatus !== 'All') {
        if (filters.verificationStatus === 'Verified') {
          if (rec.verification_status !== 'Verified') return false;
        } else if (filters.verificationStatus === 'Review / Quarantined') {
          if (rec.verification_status === 'Verified') return false;
        } else if (rec.verification_status !== filters.verificationStatus) {
          return false;
        }
      }

      // Search query (case-insensitive across name, sector, ID, authority, document)
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = rec.record_or_project_name.toLowerCase().includes(q);
        const matchesSector = rec.department_or_sector.toLowerCase().includes(q);
        const matchesId = rec.unique_id.toLowerCase().includes(q);
        const matchesAuthority = rec.exact_authority.toLowerCase().includes(q);
        const matchesDoc = rec.document_title.toLowerCase().includes(q);
        const matchesNote = rec.extraction_note.toLowerCase().includes(q);

        if (!matchesName && !matchesSector && !matchesId && !matchesAuthority && !matchesDoc && !matchesNote) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * Get departmental allocations, explicitly indicating active vs quarantined
   */
  getDepartmentalRecords(authorityName?: string): ReconciledRecord[] {
    return ALL_RECONCILED_RECORDS.filter((r) => {
      const isDept =
        r.record_type.includes('Sub-head') ||
        r.record_type.includes('Allocation') ||
        r.department_or_sector !== 'Total Municipal Outlay' &&
        !r.department_or_sector.includes('Balance Sheet') &&
        !r.department_or_sector.includes('Deficit');

      if (!isDept) return false;
      if (authorityName && authorityName !== 'All' && r.exact_authority !== authorityName) {
        return false;
      }
      return true;
    });
  },

  /**
   * Programmatic reconciliation audit metrics
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
      authoritiesCount: 4
    };
  }
};
