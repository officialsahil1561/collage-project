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
import { dataProvider } from '../src/services/dataProvider';

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

// 1. Schema Validation Test (35 PMC records)
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
  '1. Schema Validation (38 PMC Records)',
  allFieldsValid && ALL_RECONCILED_RECORDS.length === 38,
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
  uniqueSet.size === 38 &&
    overlap.length === 0 &&
    ALL_VERIFIED_RECORDS.length === 27 &&
    ALL_REVIEW_RECORDS.length === 11,
  `38 unique IDs verified (${ALL_VERIFIED_RECORDS.length} active, ${ALL_REVIEW_RECORDS.length} review). Zero overlap.`
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

const verifiedJson = JSON.parse(fs.readFileSync(verifiedJsonPath, 'utf8'));
const reviewJson = JSON.parse(fs.readFileSync(reviewJsonPath, 'utf8'));
const sourceJson = JSON.parse(fs.readFileSync(sourceJsonPath, 'utf8'));
const csvLines = fs.readFileSync(verifiedCsvPath, 'utf8').trim().split('\n');

assert(
  '4. JSON and CSV Export File Consistency',
  verifiedJson.length === ALL_VERIFIED_RECORDS.length &&
    reviewJson.length === ALL_REVIEW_RECORDS.length &&
    sourceJson.length === MUNICIPAL_SOURCE_REGISTRY.length &&
    csvLines.length === ALL_VERIFIED_RECORDS.length + 1,
  `Verified JSON (${verifiedJson.length}), Review JSON (${reviewJson.length}), Sources JSON (${sourceJson.length}), Verified CSV (${csvLines.length - 1} data rows).`
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
  `All 38 records programmatically match amount_as_printed * 10,000,000 INR. ${inrError}`
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

// 8. Subsumed Draft Budget, Subsumed Own-Source Revenue & Stock Metric Isolation
const quarantinedIds = [
  'PMC_202223_BE_033',
  'PMC_202324_REC_034',
  'PMC_202324_BAL_035',
  'PMC_202324_DEBT_036'
];
const quarantinedIsolated =
  !ALL_VERIFIED_RECORDS.some((r) => quarantinedIds.includes(r.unique_id)) &&
  quarantinedIds.every((id) =>
    ALL_REVIEW_RECORDS.some((r) => r.unique_id === id && !r.aggregation_eligible)
  );
assert(
  '8. Subsumed Draft, Subsumed Revenue & Stock/Debt Isolation',
  quarantinedIsolated,
  'Superseded draft (₹8,592 Cr), subsumed own-source revenue (₹10,632.15 Cr), balance sheet (₹52,698 Cr), and bond debt (₹200 Cr) are isolated from annual flows.'
);

// 9. Key Verified PMC Headline Numbers
const be2526 = ALL_VERIFIED_RECORDS.find((r) => r.unique_id === 'PMC_202526_BE_001');
const act2324 = ALL_VERIFIED_RECORDS.find((r) => r.unique_id === 'PMC_202324_ACT_009');
const pmpmlVgf = ALL_VERIFIED_RECORDS.find((r) => r.unique_id === 'PMC_202526_DEP_018');
assert(
  '9. Headline PMC Figures & PCMC Isolation',
  be2526?.amount_in_crores === 12618.09 &&
    act2324?.amount_in_crores === 8125.6 &&
    pmpmlVgf?.amount_in_crores === 484.96 &&
    PMC_AUTHORITY_SUMMARY.totalBudgetBE === 12618.09,
  'FY 2025-26 BE (₹12,618.09 Cr), FY 2023-24 Audited Actuals (₹8,125.60 Cr), and PMC-only PMPML VGF (₹484.96 Cr) verified.'
);

// 10. Extended PMC Modules Completeness
assert(
  '10. Extended PMC Modules Completeness',
  PMC_DEPARTMENTS.length === 20 &&
    PMC_WARD_OFFICES.length === 15 &&
    VERIFIED_PROJECTS.length === 8 &&
    PMC_TENDERS.length >= 5 &&
    PMC_CIVIC_ASSETS.length === 12 &&
    PMC_BUDGET_TRACKER_ROWS.length >= 15,
  `20 PMC Departments, 15 Ward Offices, 8 Projects, ${PMC_TENDERS.length} Tenders, 12 Civic Asset Sectors, and ${PMC_BUDGET_TRACKER_ROWS.length} Budget Tracker rows verified.`
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

console.log('\n=================================================================');
const passedCount = results.filter((r) => r.passed).length;
const totalCount = results.length;
console.log(`TOTAL PMC AUDIT TEST SUITE: ${passedCount}/${totalCount} TESTS PASSED.`);
if (passedCount === totalCount) {
  console.log('🎉 ALL PMC AUDIT & RECONCILIATION ASSERTIONS CONFIRMED.');
} else {
  process.exit(1);
}
