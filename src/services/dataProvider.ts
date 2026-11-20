import {
  ReconciledRecord,
  AuthoritySummary,
  SourceRegistryItem,
  Project,
  FilterState,
  DepartmentProfile,
  WardOffice,
  PrabhagRecord,
  TenderContract,
  CivicAssetIndicator,
  WaterTreatmentPlant,
  SewageTreatmentPlant,
  RoadDevelopmentItem,
  PublicFacilityCategory,
  EnvironmentIndicatorItem,
  PuneLandmarkSlide,
  CitizenGlossaryTerm,
  FiveYearExpenditurePoint
} from '../types';
import { WardIntelligence } from '../data/pmcWardIntelligence';
import { PMC_WARD_INTELLIGENCE } from '../data/pmcWardIntelligence';
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
import {
  PMC_PRABHAGS,
  PMC_WATER_TREATMENT_PLANTS,
  PMC_SEWAGE_TREATMENT_PLANTS,
  PMC_ROADS_DEVELOPMENT_ITEMS,
  PMC_PUBLIC_FACILITY_CATEGORIES,
  PMC_ENVIRONMENT_INDICATORS,
  PUNE_LANDMARK_SLIDES,
  CITIZEN_GLOSSARY_TERMS
} from '../data/pmcCivicSectionsData';
import { LONI_KALBHOR_PROFILE } from '../data/loniKalbhor/villageProfile';
import { LONI_KALBHOR_DEMOGRAPHICS } from '../data/loniKalbhor/demographics';
import { LONI_KALBHOR_WATER_FACILITIES } from '../data/loniKalbhor/waterSanitation';
import { LONI_KALBHOR_ROADS } from '../data/loniKalbhor/roadsTransport';
import { LONI_KALBHOR_FACILITIES } from '../data/loniKalbhor/publicFacilities';
import { LONI_KALBHOR_PROJECTS } from '../data/loniKalbhor/developmentProjects';
import { LONI_KALBHOR_FINANCE_RECORDS } from '../data/loniKalbhor/localFinance';
import { LONI_KALBHOR_SOURCES } from '../data/loniKalbhor/sources';

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
   * Get all 41 PMC electoral Prabhags mapped to 15 Regional Ward Offices
   */
  getPrabhags(): PrabhagRecord[] {
    return [...PMC_PRABHAGS];
  },

  /**
   * Get PMC Water Treatment Plants (WTPs)
   */
  getWaterTreatmentPlants(): WaterTreatmentPlant[] {
    return [...PMC_WATER_TREATMENT_PLANTS];
  },

  /**
   * Get PMC Sewage Treatment Plants (STPs)
   */
  getSewageTreatmentPlants(): SewageTreatmentPlant[] {
    return [...PMC_SEWAGE_TREATMENT_PLANTS];
  },

  /**
   * Get Roads & Mobility Development tracker items
   */
  getRoadsDevelopmentItems(): RoadDevelopmentItem[] {
    return [...PMC_ROADS_DEVELOPMENT_ITEMS];
  },

  /**
   * Get Public Facilities categories across PMC
   */
  getPublicFacilityCategories(): PublicFacilityCategory[] {
    return [...PMC_PUBLIC_FACILITY_CATEGORIES];
  },

  /**
   * Get Pune Environment Status Report (ESR) indicators
   */
  getEnvironmentIndicators(): EnvironmentIndicatorItem[] {
    return [...PMC_ENVIRONMENT_INDICATORS];
  },

  /**
   * Get authentic Pune Landmark Carousel slides
   */
  getLandmarkSlides(): PuneLandmarkSlide[] {
    return [...PUNE_LANDMARK_SLIDES];
  },

  /**
   * Get plain-language financial glossary terms
   */
  getCitizenGlossaryTerms(): CitizenGlossaryTerm[] {
    return [...CITIZEN_GLOSSARY_TERMS];
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
   * Programmatically derive 5-year PMC municipal expenditure & budget outlay trends
   * (FY 2022-23 through FY 2026-27) strictly from aggregation-eligible verified records.
   * Missing audited actuals remain explicitly null (never fabricated or zeroed).
   */
  getFiveYearExpenditureTrends(): FiveYearExpenditurePoint[] {
    const fiscalYears = ['2022-23', '2023-24', '2024-25', '2025-26', '2026-27'];
    const eligible = ALL_VERIFIED_RECORDS.filter((r) => r.aggregation_eligible);

    let previousBE: number | null = null;

    return fiscalYears.map((fy) => {
      const budgetRec = eligible.find(
        (r) =>
          r.financial_year === fy &&
          r.domain === 'budget' &&
          r.financial_category === 'Budget Estimates (BE)' &&
          r.department_or_sector === 'Total Municipal Outlay'
      );

      const auditedTotalRec = eligible.find(
        (r) =>
          r.financial_year === fy &&
          r.domain === 'expenditure' &&
          r.financial_category === 'Actual Expenditure' &&
          r.department_or_sector === 'Total Municipal Outlay'
      );

      const auditedRevExpRec = eligible.find(
        (r) =>
          r.financial_year === fy &&
          r.domain === 'expenditure' &&
          r.financial_category === 'Revenue Expenditure' &&
          r.source_classification === 'Audited Financial Statement'
      );

      const budgetedRevExpRec = eligible.find(
        (r) =>
          r.financial_year === fy &&
          r.domain === 'expenditure' &&
          r.financial_category === 'Revenue Expenditure' &&
          r.source_classification === 'Official Budget Estimate'
      );

      const budgetedCapExpRec = eligible.find(
        (r) =>
          r.financial_year === fy &&
          r.domain === 'expenditure' &&
          r.financial_category === 'Capital Expenditure' &&
          r.department_or_sector.startsWith('Capital Outlay')
      );

      const auditedReceiptsRec = eligible.find(
        (r) =>
          r.financial_year === fy &&
          r.domain === 'revenue' &&
          r.financial_category === 'Revenue Receipts' &&
          r.source_classification === 'Audited Financial Statement'
      );

      const approvedBudgetBE = budgetRec ? budgetRec.amount_in_crores : 0;
      const yoyBudgetGrowthPct =
        previousBE !== null && previousBE > 0
          ? Number((((approvedBudgetBE - previousBE) / previousBE) * 100).toFixed(1))
          : null;
      previousBE = approvedBudgetBE;

      const auditedTotalExpenditure = auditedTotalRec ? auditedTotalRec.amount_in_crores : null;
      const utilizationPct =
        auditedTotalExpenditure !== null && approvedBudgetBE > 0
          ? Number(((auditedTotalExpenditure / approvedBudgetBE) * 100).toFixed(1))
          : null;

      const auditedRevenueExpenditure = auditedRevExpRec ? auditedRevExpRec.amount_in_crores : null;
      const budgetedRevenueExpenditure = budgetedRevExpRec
        ? budgetedRevExpRec.amount_in_crores
        : null;
      const budgetedCapitalExpenditure = budgetedCapExpRec
        ? budgetedCapExpRec.amount_in_crores
        : null;
      const auditedRevenueReceipts = auditedReceiptsRec
        ? auditedReceiptsRec.amount_in_crores
        : null;

      const sourceRecordIds = [
        budgetRec?.unique_id,
        auditedTotalRec?.unique_id,
        auditedRevExpRec?.unique_id,
        budgetedRevExpRec?.unique_id,
        budgetedCapExpRec?.unique_id,
        auditedReceiptsRec?.unique_id
      ].filter((id): id is string => Boolean(id));

      const auditStatus: FiveYearExpenditurePoint['auditStatus'] =
        auditedTotalExpenditure !== null
          ? 'Audited Actuals Available'
          : auditedRevenueExpenditure !== null
          ? 'Audited Revenue Exp. Only'
          : 'BE Only — Actuals Not Available';

      const stageLabel = budgetRec?.record_type ?? 'Approved Budget Estimate';

      let notes = budgetRec?.extraction_note ?? '';
      if (auditedTotalRec && utilizationPct !== null) {
        notes = `Audited actual expenditure ₹${auditedTotalRec.amount_as_printed} Cr (${utilizationPct}% of ₹${budgetRec?.amount_as_printed} Cr BE); Revenue Exp. ₹${auditedRevExpRec?.amount_as_printed ?? 'N/A'} Cr.`;
      } else if (auditedRevExpRec) {
        notes = `Standing Committee BE ₹${budgetRec?.amount_as_printed} Cr; Audited Revenue Exp. ₹${auditedRevExpRec.amount_as_printed} Cr. Total consolidated actuals: Data Not Available.`;
      } else if (budgetedRevExpRec && budgetedCapExpRec) {
        notes = `Proposed BE ₹${budgetRec?.amount_as_printed} Cr (₹${budgetedRevExpRec.amount_as_printed} Cr Revenue + ₹${budgetedCapExpRec.amount_as_printed} Cr Capital). Full-year actuals pending audit.`;
      } else {
        notes = `${budgetRec?.extraction_note ?? ''} Full-year audited actual expenditure: Data Not Available.`.trim();
      }

      return {
        financialYear: fy,
        fyLabel: `FY ${fy}`,
        approvedBudgetBE,
        yoyBudgetGrowthPct,
        auditedTotalExpenditure,
        utilizationPct,
        auditedRevenueExpenditure,
        budgetedRevenueExpenditure,
        budgetedCapitalExpenditure,
        auditedRevenueReceipts,
        stageLabel,
        auditStatus,
        primaryRecordId: auditedTotalRec?.unique_id ?? budgetRec?.unique_id ?? '',
        sourceRecordIds,
        sourceUrl:
          auditedTotalRec?.official_document_url ??
          budgetRec?.official_document_url ??
          'https://www.pmc.gov.in/en/budget-overview',
        notes
      };
    });
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
  },

  /**
   * Get enriched ward civic intelligence records for all 15 PMC regional wards
   */
  getWardIntelligenceList(): WardIntelligence[] {
    return [...PMC_WARD_INTELLIGENCE];
  },

  /**
   * Get enriched ward intelligence for a specific ward ID
   */
  getWardIntelligenceById(id: string): WardIntelligence | undefined {
    return PMC_WARD_INTELLIGENCE.find((w) => w.id === id);
  },

  /**
   * Build CSV string for Ward Intelligence table export
   */
  buildWardIntelligenceCSV(wards: WardIntelligence[]): string {
    const headers = [
      'ward_number',
      'ward_name',
      'zone',
      'deputy_commissioner_zone',
      'prabhag_coverage',
      'key_localities',
      'includes_merged_villages',
      'population_estimate',
      'water_supply_lpcd',
      'drainage_coverage_pct',
      'schools_count',
      'healthcare_facilities_count',
      'parks_and_gardens_count',
      'public_toilets_count',
      'fire_stations_count',
      'streetlights_estimate',
      'tree_census_estimate',
      'property_tax_note',
      'actual_expenditure_status'
    ];
    const escapeCsv = (val: string | number | boolean | null | undefined) => {
      if (val === null || val === undefined) return 'Data Not Available';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };
    const lines = [headers.join(',')];
    for (const w of wards) {
      lines.push(
        [
          w.wardNumber,
          w.name,
          w.zone,
          w.deputyCommissionerZone,
          w.prabhagCoverage,
          w.keyLocalities.join('; '),
          w.includesMergedVillages,
          w.populationEstimate,
          w.waterSupplyLPCD,
          w.drainageCoveragePct,
          w.schoolsCount,
          w.healthcareFacilitiesCount,
          w.parksAndGardensCount,
          w.publicToiletsCount,
          w.fireStationsCount,
          w.streetlightsCountEstimate,
          w.treeCountEstimate,
          w.propertyTaxCollectionNote,
          w.wardActualExpenditureStatus
        ]
          .map(escapeCsv)
          .join(',')
      );
    }
    return lines.join('\n');
  },

  getLoniKalbhorProfile() {
    return LONI_KALBHOR_PROFILE;
  },
  getLoniKalbhorDemographics() {
    return LONI_KALBHOR_DEMOGRAPHICS;
  },
  getLoniKalbhorWaterFacilities() {
    return [...LONI_KALBHOR_WATER_FACILITIES];
  },
  getLoniKalbhorRoads() {
    return [...LONI_KALBHOR_ROADS];
  },
  getLoniKalbhorFacilities() {
    return [...LONI_KALBHOR_FACILITIES];
  },
  getLoniKalbhorProjects() {
    return [...LONI_KALBHOR_PROJECTS];
  },
  getLoniKalbhorFinanceRecords() {
    return [...LONI_KALBHOR_FINANCE_RECORDS];
  },
  getLoniKalbhorSources() {
    return [...LONI_KALBHOR_SOURCES];
  }
};

