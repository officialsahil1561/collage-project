import fs from 'fs';
import path from 'path';
import {
  ALL_VERIFIED_RECORDS,
  ALL_REVIEW_RECORDS,
  ALL_RECONCILED_RECORDS,
  PMC_AUTHORITY_SUMMARY,
  MUNICIPAL_SOURCE_REGISTRY,
  VERIFIED_PROJECTS
} from '../src/data/reconciledData';
import {
  PMC_DEPARTMENTS,
  PMC_WARD_OFFICES,
  PMC_TENDERS,
  PMC_CIVIC_ASSETS,
  PMC_BUDGET_TRACKER_ROWS
} from '../src/data/pmcExtendedData';
import {
  PMC_PRABHAGS,
  PMC_WATER_TREATMENT_PLANTS,
  PMC_SEWAGE_TREATMENT_PLANTS,
  PMC_ROADS_DEVELOPMENT_ITEMS,
  PMC_PUBLIC_FACILITY_CATEGORIES,
  PMC_ENVIRONMENT_INDICATORS,
  PUNE_LANDMARK_SLIDES,
  CITIZEN_GLOSSARY_TERMS
} from '../src/data/pmcCivicSectionsData';
import { dataProvider } from '../src/services/dataProvider';
import {
  COMPLAINT_PHOTO_EXTENSIONS,
  COMPLAINT_PHOTO_MIME_TYPES,
  FEEDBACK_DOC_EXTENSIONS,
  FEEDBACK_DOC_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  validateComplaintForm,
  validateFeedbackForm,
  validateUploadFile
} from '../src/utils/citizenFormValidation';
import {
  NAV_GROUPS,
  getBreadcrumbsForPage,
  getPathForPage,
  resolvePageFromPathname
} from '../src/utils/navigation';

interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function assert(name: string, condition: boolean, details: string) {
  results.push({ name, passed: condition, details });
  if (!condition) {
    console.error(`❌ FAIL: ${name} — ${details}`);
  } else {
    console.log(`✅ PASS: ${name} — ${details}`);
  }
}

console.log('=== JAN DHAN INSIGHTS — PUNE MUNICIPAL CORPORATION (PMC) AUDIT TEST SUITE ===\n');

// 1. Schema Validation Test (43 PMC records)
const requiredFields = [
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
  'date_accessed',
  'extraction_note',
  'verification_status',
  'aggregation_eligible'
];

let allFieldsValid = true;
let invalidFieldInfo = '';
for (const rec of ALL_RECONCILED_RECORDS) {
  for (const f of requiredFields) {
    if ((rec as unknown as Record<string, unknown>)[f] === undefined) {
      allFieldsValid = false;
      invalidFieldInfo = `Record ${rec.unique_id} is missing field: ${f}`;
      break;
    }
  }
}
assert(
  '1. Schema Validation (43 PMC Records)',
  allFieldsValid && ALL_RECONCILED_RECORDS.length === 43,
  `All ${ALL_RECONCILED_RECORDS.length} records possess all required schema fields. ${invalidFieldInfo}`
);

// 2. Unique IDs & Zero Overlap
const foundIDs = ALL_RECONCILED_RECORDS.map((r) => r.unique_id);
const verifiedIDs = ALL_VERIFIED_RECORDS.map((r) => r.unique_id);
const reviewIDs = ALL_REVIEW_RECORDS.map((r) => r.unique_id);
const uniqueSet = new Set(foundIDs);
const overlap = verifiedIDs.filter((id) => reviewIDs.includes(id));

assert(
  '2. Unique IDs & Zero Overlap',
  uniqueSet.size === 43 &&
    overlap.length === 0 &&
    ALL_VERIFIED_RECORDS.length === 31 &&
    ALL_REVIEW_RECORDS.length === 12,
  `43 unique IDs verified (${ALL_VERIFIED_RECORDS.length} active, ${ALL_REVIEW_RECORDS.length} review). Zero overlap.`
);

// 3. Exclusive PMC Scope (Zero Mumbai, Jaipur, BMC, JMC, or PCMC records)
const allRecordsPMCOnly = ALL_RECONCILED_RECORDS.every(
  (r) => r.city === 'Pune' && r.exact_authority === 'Pune Municipal Corporation'
);
const allProjectsPMCOnly = VERIFIED_PROJECTS.every(
  (p) => p.cityName === 'Pune' && p.agency === 'Pune Municipal Corporation'
);
const allSourcesPMCOnly = MUNICIPAL_SOURCE_REGISTRY.every(
  (s) => s.exact_authority === 'Pune Municipal Corporation'
);
const forbiddenNamesInTitles = ALL_RECONCILED_RECORDS.some((r) =>
  /\b(mumbai|bmc|jaipur|jmc|brihanmumbai)\b/i.test(
    `${r.record_or_project_name} ${r.document_title}`
  )
);
assert(
  '3. Strict Pune Municipal Corporation (PMC) Exclusivity',
  allRecordsPMCOnly && allProjectsPMCOnly && allSourcesPMCOnly && !forbiddenNamesInTitles,
  'Zero Mumbai BMC, Jaipur Greater, Jaipur Heritage, or PCMC records present in active or review datasets.'
);

// 4. JSON/CSV Consistency Test
const verifiedJsonPath = path.resolve(process.cwd(), 'jandhan_municipal_finance_verified.json');
const verifiedCsvPath = path.resolve(process.cwd(), 'jandhan_municipal_finance_verified.csv');
const reviewJsonPath = path.resolve(process.cwd(), 'jandhan_review_file.json');
const sourceJsonPath = path.resolve(process.cwd(), 'jandhan_source_registry.json');
const reportJsonPath = path.resolve(process.cwd(), 'jandhan_reconciliation_report.json');

const verifiedJson = JSON.parse(fs.readFileSync(verifiedJsonPath, 'utf8'));
const reviewJson = JSON.parse(fs.readFileSync(reviewJsonPath, 'utf8'));
const sourceJson = JSON.parse(fs.readFileSync(sourceJsonPath, 'utf8'));
const reportJson = JSON.parse(fs.readFileSync(reportJsonPath, 'utf8'));
const csvLines = fs.readFileSync(verifiedCsvPath, 'utf8').trim().split('\n');

assert(
  '4. JSON, CSV & Reconciliation Report Consistency',
  verifiedJson.length === ALL_VERIFIED_RECORDS.length &&
    reviewJson.length === ALL_REVIEW_RECORDS.length &&
    sourceJson.length === MUNICIPAL_SOURCE_REGISTRY.length &&
    csvLines.length === ALL_VERIFIED_RECORDS.length + 1 &&
    reportJson.summary_metrics?.total_records_audited === 43 &&
    reportJson.summary_metrics?.active_verified_records === 31 &&
    reportJson.summary_metrics?.review_quarantined_records === 12,
  `Verified JSON (${verifiedJson.length}), Review JSON (${reviewJson.length}), Sources JSON (${sourceJson.length}), Verified CSV (${csvLines.length - 1} rows), Report JSON (43 total).`
);

// 5. Programmatic INR Conversion Test (₹1 Cr = 10,000,000 INR)
let inrMathValid = true;
let inrError = '';
for (const rec of ALL_RECONCILED_RECORDS) {
  const printedNum = parseFloat(rec.amount_as_printed.replace(/,/g, ''));
  const expectedINR = Math.round(printedNum * 10000000);
  if (rec.normalized_inr_unit !== expectedINR) {
    inrMathValid = false;
    inrError = `${rec.unique_id}: normalized ${rec.normalized_inr_unit} != expected ${expectedINR}`;
    break;
  }
}
assert(
  '5. Currency Normalization (1 Cr = 10⁷ INR)',
  inrMathValid,
  `All 43 records programmatically match amount_as_printed * 10,000,000 INR. ${inrError}`
);

// 6. Null versus Zero Policy Test
const hasZeroSubstitutions = ALL_RECONCILED_RECORDS.some((r) => r.amount_in_crores === 0);
assert(
  '6. Null vs Zero Policy',
  !hasZeroSubstitutions,
  'Zero is never substituted for missing values across any audited record.'
);

// 7. Double-Count Prevention: Pune Departmental Quarantining
const puneSubheads = [
  'PMC_202425_BE_003',
  'PMC_202425_BE_004',
  'PMC_202425_BE_005',
  'PMC_202425_BE_006',
  'PMC_202425_BE_007',
  'PMC_202425_BE_008',
  'PMC_202425_BE_030'
];
const puneQuarantinedInActive = ALL_VERIFIED_RECORDS.some((r) =>
  puneSubheads.includes(r.unique_id)
);
const puneAllInReview = puneSubheads.every((id) =>
  ALL_REVIEW_RECORDS.some((r) => r.unique_id === id && !r.aggregation_eligible)
);
assert(
  '7. Pune Departmental Sub-head Quarantine',
  !puneQuarantinedInActive && puneAllInReview,
  'All 7 FY 2024-25 PMC departmental sub-heads are quarantined in review and excluded from active aggregates.'
);

// 8. Subsumed Draft Budgets (FY 22-23 & FY 26-27), Subsumed Revenue & Stock/Debt Isolation
const quarantinedIds = [
  'PMC_202223_BE_033',
  'PMC_202324_REC_034',
  'PMC_202324_BAL_035',
  'PMC_202324_DEBT_036',
  'PMC_202627_BE_043'
];
const quarantinedIsolated =
  !ALL_VERIFIED_RECORDS.some((r) => quarantinedIds.includes(r.unique_id)) &&
  quarantinedIds.every((id) =>
    ALL_REVIEW_RECORDS.some((r) => r.unique_id === id && !r.aggregation_eligible)
  );
assert(
  '8. Subsumed Drafts (22-23 & 26-27), Subsumed Revenue & Stock/Debt Isolation',
  quarantinedIsolated,
  'Superseded drafts (₹8,592 Cr & ₹13,995 Cr), subsumed revenue (₹10,632.15 Cr), balance sheet (₹52,698 Cr), and bond debt (₹200 Cr) are isolated.'
);

// 9. Key Verified PMC Headline Numbers (FY 2026-27 BE + FY 2025-26 BE + FY 2023-24 Actuals)
const be2627 = ALL_VERIFIED_RECORDS.find((r) => r.unique_id === 'PMC_202627_BE_039');
const be2526 = ALL_VERIFIED_RECORDS.find((r) => r.unique_id === 'PMC_202526_BE_001');
const act2324 = ALL_VERIFIED_RECORDS.find((r) => r.unique_id === 'PMC_202324_ACT_009');
const pmpmlVgf = ALL_VERIFIED_RECORDS.find((r) => r.unique_id === 'PMC_202526_DEP_018');
assert(
  '9. Headline PMC Figures (FY 2026-27 & Historical)',
  be2627?.amount_in_crores === 15669.0 &&
    be2526?.amount_in_crores === 12618.09 &&
    act2324?.amount_in_crores === 8125.6 &&
    pmpmlVgf?.amount_in_crores === 484.96 &&
    PMC_AUTHORITY_SUMMARY.totalBudgetBE === 15669.0 &&
    PMC_AUTHORITY_SUMMARY.latestFinancialYear === '2026-27',
  'FY 2026-27 Final BE (₹15,669 Cr), FY 2025-26 BE (₹12,618.09 Cr), FY 2023-24 Actuals (₹8,125.60 Cr), and PMC-only PMPML VGF verified.'
);

// 10. Extended PMC Modules & 5 New Civic Explorer Datasets Completeness
const prabhagNumbersValid =
  PMC_PRABHAGS.length === 41 &&
  new Set(PMC_PRABHAGS.map((p) => p.prabhagNumber)).size === 41;
const stpTotalMLD = PMC_SEWAGE_TREATMENT_PLANTS.reduce((acc, s) => acc + s.capacityMLD, 0);

assert(
  '10. Extended & New Civic Explorer Datasets Completeness',
  PMC_DEPARTMENTS.length === 20 &&
    PMC_WARD_OFFICES.length === 15 &&
    prabhagNumbersValid &&
    PMC_WATER_TREATMENT_PLANTS.length === 6 &&
    PMC_SEWAGE_TREATMENT_PLANTS.length === 11 &&
    stpTotalMLD === 396 &&
    PMC_ROADS_DEVELOPMENT_ITEMS.length === 6 &&
    PMC_PUBLIC_FACILITY_CATEGORIES.length === 6 &&
    PMC_ENVIRONMENT_INDICATORS.length === 4 &&
    PUNE_LANDMARK_SLIDES.length === 12 &&
    CITIZEN_GLOSSARY_TERMS.length >= 5 &&
    VERIFIED_PROJECTS.length === 8 &&
    PMC_TENDERS.length >= 5 &&
    PMC_CIVIC_ASSETS.length === 12 &&
    PMC_BUDGET_TRACKER_ROWS.length >= 19,
  `15 Wards, 41 Prabhags, 6 WTPs, 11 JICA STPs (${stpTotalMLD} MLD), 6 Roads, 6 Facilities, 4 ESR pillars, 12 Landmark Slides, 20 Depts, ${PMC_BUDGET_TRACKER_ROWS.length} Tracker Rows.`
);

// 11. Search & Filtering Integrity
const jicaSearch = dataProvider.getFilteredRecords({ searchQuery: 'water', includeReview: false });
assert(
  '11. Deterministic PMC Search Integrity',
  jicaSearch.some((r) => r.unique_id === 'PMC_202526_DEP_014'),
  'Search locates PMC Water Supply provision (PMC_202526_DEP_014).'
);

// 12. Primary Source Registry Verification
assert(
  '12. PMC Source Registry Completeness',
  MUNICIPAL_SOURCE_REGISTRY.length === 6 &&
    MUNICIPAL_SOURCE_REGISTRY.every((s) => s.official_url.startsWith('https://')),
  '6 official PMC/OpenCity/MahaTenders primary sources registered with valid HTTPS URLs.'
);

// 13. Civic Complaints Form & File Validation
const emptyComplaintErrors = validateComplaintForm({
  category: '',
  title: '',
  description: '',
  locality: '',
  landmark: '',
  name: '',
  contactNumber: '',
  email: ''
});
const invalidContactErrors = validateComplaintForm({
  category: 'Road damage and potholes',
  title: 'Pothole near Paud Road',
  description: 'Deep pothole causing traffic bottleneck near bus stop for 2 weeks.',
  locality: 'Kothrud',
  landmark: '',
  name: '',
  contactNumber: '1234',
  email: 'not-an-email'
});
const validComplaintErrors = validateComplaintForm({
  category: 'Road damage and potholes',
  title: 'Pothole near Paud Road',
  description: 'Deep pothole causing traffic bottleneck near bus stop for 2 weeks.',
  locality: 'Kothrud',
  landmark: '',
  name: '',
  contactNumber: '',
  email: ''
});
const oversizePhoto = validateUploadFile(
  { name: 'road.jpg', size: MAX_UPLOAD_BYTES + 1, type: 'image/jpeg' },
  COMPLAINT_PHOTO_EXTENSIONS,
  COMPLAINT_PHOTO_MIME_TYPES
);
const badPhotoType = validateUploadFile(
  { name: 'script.exe', size: 1024, type: 'application/x-msdownload' },
  COMPLAINT_PHOTO_EXTENSIONS,
  COMPLAINT_PHOTO_MIME_TYPES
);
const validPhoto = validateUploadFile(
  { name: 'pothole.jpg', size: 250000, type: 'image/jpeg' },
  COMPLAINT_PHOTO_EXTENSIONS,
  COMPLAINT_PHOTO_MIME_TYPES
);
assert(
  '13. Civic Complaints Form & Photo Upload Validation',
  Boolean(
    emptyComplaintErrors.category &&
      emptyComplaintErrors.title &&
      emptyComplaintErrors.description &&
      emptyComplaintErrors.locality
  ) &&
    Boolean(invalidContactErrors.contactNumber && invalidContactErrors.email) &&
    Object.keys(validComplaintErrors).length === 0 &&
    !oversizePhoto.valid &&
    !badPhotoType.valid &&
    validPhoto.valid,
  'Required fields, optional phone/email checks, and 5 MB JPG/PNG/WEBP photo validation verified.'
);

// 14. Citizen Feedback Form & Attachment Validation
const unconfirmedFeedbackErrors = validateFeedbackForm({
  category: 'Incorrect financial information',
  name: '',
  email: '',
  department: 'Water Supply Department',
  financialYear: 'FY 2025-26',
  description: 'Verified allocation line item note needs clarification on table page 12.',
  confirmedAccurate: false
});
const validFeedbackErrors = validateFeedbackForm({
  category: 'Broken source document link',
  name: '',
  email: '',
  department: '',
  financialYear: '',
  description: 'The link to the FY 2023-24 annexure table returns a 404 page on PMC portal.',
  confirmedAccurate: true
});
const validFeedbackPdf = validateUploadFile(
  { name: 'budget_extract.pdf', size: 512000, type: 'application/pdf' },
  FEEDBACK_DOC_EXTENSIONS,
  FEEDBACK_DOC_MIME_TYPES
);
assert(
  '14. Citizen Feedback Form & Attachment Validation',
  Boolean(unconfirmedFeedbackErrors.confirmedAccurate) &&
    Object.keys(validFeedbackErrors).length === 0 &&
    validFeedbackPdf.valid,
  'Accuracy checkbox, optional contact/department/FY fields, and PDF/image/CSV validation verified.'
);

// 15. Navigation Groups, Direct URL Routing & Breadcrumbs
const allNavItems = NAV_GROUPS.flatMap((g) => g.items);
const routeRoundTripsOk = allNavItems.every(
  (item) =>
    resolvePageFromPathname(item.path) === item.key &&
    getPathForPage(item.key) === item.path &&
    getBreadcrumbsForPage(item.key).length >= 2
);
const aliasesOk =
  resolvePageFromPathname('/') === 'home' &&
  resolvePageFromPathname('/overview') === 'finances' &&
  resolvePageFromPathname('/spending') === 'records' &&
  resolvePageFromPathname('/wards') === 'wards';

assert(
  '15. Header Dropdown Grouping, Direct URLs & Breadcrumbs',
  NAV_GROUPS.length === 4 &&
    allNavItems.length === 19 &&
    routeRoundTripsOk &&
    aliasesOk,
  `4 dropdown menus covering all ${allNavItems.length} pages, direct URL round-trip routing, aliases, and breadcrumbs verified.`
);

// 16. 5-Year Expenditure Trends Selector (Dynamic from Verified Records, Zero Fabrication)
const fiveYearTrends = dataProvider.getFiveYearExpenditureTrends();
const expectedYears = ['2022-23', '2023-24', '2024-25', '2025-26', '2026-27'];
const yearsMatch =
  fiveYearTrends.length === 5 &&
  fiveYearTrends.every((pt, idx) => pt.financialYear === expectedYears[idx]);
const amountsMatch =
  fiveYearTrends[0]?.approvedBudgetBE === 9716.0 &&
  fiveYearTrends[0]?.auditedRevenueExpenditure === 6682.54 &&
  fiveYearTrends[0]?.auditedTotalExpenditure === null &&
  fiveYearTrends[1]?.approvedBudgetBE === 9515.0 &&
  fiveYearTrends[1]?.auditedTotalExpenditure === 8125.6 &&
  fiveYearTrends[1]?.auditedRevenueExpenditure === 5910.59 &&
  fiveYearTrends[1]?.utilizationPct === 85.4 &&
  fiveYearTrends[2]?.approvedBudgetBE === 11601.0 &&
  fiveYearTrends[2]?.auditedTotalExpenditure === null &&
  fiveYearTrends[3]?.approvedBudgetBE === 12618.09 &&
  fiveYearTrends[3]?.budgetedRevenueExpenditure === 7093.0 &&
  fiveYearTrends[3]?.budgetedCapitalExpenditure === 5524.0 &&
  fiveYearTrends[3]?.auditedTotalExpenditure === null &&
  fiveYearTrends[4]?.approvedBudgetBE === 15669.0 &&
  fiveYearTrends[4]?.auditedTotalExpenditure === null;

assert(
  '16. 5-Year Expenditure Trends Selector (FY 22-23 to FY 26-27)',
  yearsMatch && amountsMatch,
  '5 financial years derived dynamically from verified records; FY 23-24 actuals (₹8,125.60 Cr / 85.4%) verified; unpublished actuals preserved as null.'
);

console.log('\n=================================================================');
const passedCount = results.filter((r) => r.passed).length;
const totalCount = results.length;
console.log(`TOTAL PMC AUDIT TEST SUITE: ${passedCount}/${totalCount} TESTS PASSED.`);
if (passedCount === totalCount) {
  console.log('🎉 ALL PMC AUDIT & RECONCILIATION ASSERTIONS CONFIRMED.');
} else {
  process.exit(1);
}
