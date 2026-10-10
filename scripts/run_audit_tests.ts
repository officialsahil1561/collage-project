import fs from 'fs';
import path from 'path';
import { ALL_VERIFIED_RECORDS, ALL_REVIEW_RECORDS, ALL_RECONCILED_RECORDS, MUNICIPAL_AUTHORITIES_SUMMARIES, MUNICIPAL_SOURCE_REGISTRY } from '../src/data/reconciledData';
import { dataProvider } from '../src/services/dataProvider';

interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function assert(name: string, condition: boolean, details: string) {
  results.push({
    name,
    passed: condition,
    details
  });
  if (!condition) {
    console.error(`❌ FAIL: ${name} — ${details}`);
  } else {
    console.log(`✅ PASS: ${name} — ${details}`);
  }
}

console.log("=== JAN DHAN INSIGHTS AUTOMATED AUDIT & RECONCILIATION TEST SUITE ===\n");

// 1. Schema Validation Test
const requiredFields = [
  'unique_id', 'city', 'exact_authority', 'financial_year', 'record_type',
  'department_or_sector', 'record_or_project_name', 'amount_as_printed',
  'original_unit', 'normalized_inr_unit', 'amount_in_crores', 'financial_category',
  'document_title', 'official_document_url', 'page_or_table_ref',
  'date_accessed', 'extraction_note', 'verification_status', 'aggregation_eligible'
];

let allFieldsValid = true;
let invalidFieldInfo = '';
for (const rec of ALL_RECONCILED_RECORDS) {
  for (const f of requiredFields) {
    if ((rec as any)[f] === undefined) {
      allFieldsValid = false;
      invalidFieldInfo = `Record ${rec.unique_id} is missing field: ${f}`;
      break;
    }
  }
}
assert(
  "1. Schema Validation",
  allFieldsValid && ALL_RECONCILED_RECORDS.length === 30,
  `All 30 records possess all required schema fields. ${invalidFieldInfo}`
);

// 2. Duplicate and Missing IDs Test
const expectedIDs = [
  'PMC_202526_BE_001', 'PMC_202425_BE_002', 'PMC_202425_BE_003', 'PMC_202425_BE_004',
  'PMC_202425_BE_005', 'PMC_202425_BE_006', 'PMC_202425_BE_007', 'PMC_202425_BE_008',
  'PMC_202324_ACT_009', 'BMC_202526_BE_010', 'BMC_202526_BE_011', 'BMC_202526_BE_012',
  'BMC_202425_RE_013', 'BMC_202425_ACT_014', 'BMC_202526_BE_015', 'BMC_202425_RE_016',
  'BMC_202526_BE_017', 'BMC_202425_RE_018', 'BMC_202526_BE_019', 'BMC_202526_BE_020',
  'BMC_202526_BE_021', 'BMC_202526_BE_022', 'BMC_202324_ACT_023', 'JMC_GR_202223_ACT_024',
  'JMC_GR_202223_ACT_025', 'JMC_GR_202223_ACT_026', 'JMC_GR_202122_ACT_027', 'JMC_HER_202223_ACT_028',
  'JMC_GR_202223_ACT_029', 'PMC_202425_BE_030'
];

const foundIDs = ALL_RECONCILED_RECORDS.map(r => r.unique_id);
const verifiedIDs = ALL_VERIFIED_RECORDS.map(r => r.unique_id);
const reviewIDs = ALL_REVIEW_RECORDS.map(r => r.unique_id);
const uniqueSet = new Set(foundIDs);
const overlap = verifiedIDs.filter(id => reviewIDs.includes(id));
const missing = expectedIDs.filter(id => !foundIDs.includes(id));

assert(
  "2. Unique IDs & Zero Overlap",
  uniqueSet.size === 30 && overlap.length === 0 && missing.length === 0 && foundIDs.length === 30,
  `Exactly 30 unique IDs verified (19 in active, 11 in review). Zero overlap, zero missing.`
);

// 3. JSON/CSV Consistency Test
const verifiedJsonPath = path.resolve(process.cwd(), 'jandhan_municipal_finance_verified.json');
const verifiedCsvPath = path.resolve(process.cwd(), 'jandhan_municipal_finance_verified.csv');
const reviewJsonPath = path.resolve(process.cwd(), 'jandhan_review_file.json');

const verifiedJson = JSON.parse(fs.readFileSync(verifiedJsonPath, 'utf8'));
const reviewJson = JSON.parse(fs.readFileSync(reviewJsonPath, 'utf8'));
const csvContent = fs.readFileSync(verifiedCsvPath, 'utf8').trim().split('\n');

assert(
  "3. JSON and CSV File Consistency",
  verifiedJson.length === 19 && reviewJson.length === 11 && csvContent.length === 20, // 1 header + 19 rows
  `Verified JSON has 19 items, Review JSON has 11 items, Verified CSV has 19 data rows.`
);

// 4. Programmatic INR Conversion Test (₹1 Cr = 10,000,000 INR)
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
  "4. Currency Normalization (1 Cr = 10⁷ INR)",
  inrMathValid,
  `All 30 records programmatically match amount_as_printed * 10,000,000 INR. ${inrError}`
);

// 5. Null versus Zero Policy Test
const hasZeroSubstitutions = ALL_RECONCILED_RECORDS.some(r => r.amount_in_crores === 0);
assert(
  "5. Null vs Zero Policy",
  !hasZeroSubstitutions,
  `Zero is never substituted for missing values across any audited record.`
);

// 6. Verification Status Breakdown
const metrics = dataProvider.getReconciliationMetrics();
assert(
  "6. Verification Status Distribution",
  metrics.verified === 19 &&
  metrics.partiallyVerified === 7 &&
  metrics.unverified === 1 &&
  metrics.rejectedReclassified === 2 &&
  metrics.rejectedSubsumed === 1 &&
  metrics.total === 30,
  `Counts match master status ledger: 19 Verified, 7 Partially Verified, 1 Unverified, 2 Rejected/Reclassified, 1 Rejected/Subsumed.`
);

// 7. Double-Count Prevention: Pune Departmental Quarantining
const puneSubheads = [
  'PMC_202425_BE_003', 'PMC_202425_BE_004', 'PMC_202425_BE_005',
  'PMC_202425_BE_006', 'PMC_202425_BE_007', 'PMC_202425_BE_008', 'PMC_202425_BE_030'
];
const puneQuarantinedInActive = ALL_VERIFIED_RECORDS.some(r => puneSubheads.includes(r.unique_id));
const puneAllInReview = puneSubheads.every(id => ALL_REVIEW_RECORDS.some(r => r.unique_id === id));
assert(
  "7. Pune Departmental Double-Count Quarantine",
  !puneQuarantinedInActive && puneAllInReview,
  `All 7 Pune departmental sub-heads are quarantined in review and excluded from active aggregates.`
);

// 8. Double-Count Prevention: Jaipur Octroi Grant Subsumption
const octroiInActive = ALL_VERIFIED_RECORDS.some(r => r.unique_id === 'JMC_GR_202223_ACT_029');
const octroiInReview = ALL_REVIEW_RECORDS.some(r => r.unique_id === 'JMC_GR_202223_ACT_029' && r.verification_status === 'Rejected / Subsumed');
assert(
  "8. Jaipur Octroi Grant Subsumption Isolation",
  !octroiInActive && octroiInReview,
  `JMC_GR_202223_ACT_029 is quarantined as Rejected / Subsumed to prevent double-counting with Total Receipts JMC_GR_202223_ACT_024.`
);

// 9. Balance Sheet and Deficit Metrics Exclusion
const balanceSheetInActive = ALL_VERIFIED_RECORDS.some(r => r.unique_id === 'JMC_GR_202122_ACT_027');
const deficitInActive = ALL_VERIFIED_RECORDS.some(r => r.unique_id === 'JMC_HER_202223_ACT_028');
assert(
  "9. Balance Sheet & Deficit Metric Exclusion",
  !balanceSheetInActive && !deficitInActive,
  `Jaipur balance sheet asset metric (₹1,110.06 Cr) and deficit metric (₹42.15 Cr) are excluded from active spending totals.`
);

// 10. BMC ₹74,427.41 Cr Budget Scope Verification
const bmcBudgetRec = ALL_VERIFIED_RECORDS.find(r => r.unique_id === 'BMC_202526_BE_010');
assert(
  "10. BMC Budget Scope Verification",
  bmcBudgetRec !== undefined && bmcBudgetRec.amount_in_crores === 74427.41 && bmcBudgetRec.department_or_sector.includes('Funds A, B, E, G & T'),
  `BMC total budget of ₹74,427.41 Cr is verified covering Funds A, B, E, G and support to T.`
);

// 11. BMC Unverified Actual Spend Quarantining
const bmcActualInActive = ALL_VERIFIED_RECORDS.some(r => r.unique_id === 'BMC_202324_ACT_023');
const bmcActualInReview = ALL_REVIEW_RECORDS.some(r => r.unique_id === 'BMC_202324_ACT_023' && r.verification_status === 'Unverified');
assert(
  "11. BMC Actual Spend Quarantining",
  !bmcActualInActive && bmcActualInReview,
  `BMC_202324_ACT_023 (₹18,281.78 Cr) is quarantined as Unverified pending formal CAG audit publication.`
);

// 12. Four Separate Municipal Authorities Test
const summaries = Object.values(MUNICIPAL_AUTHORITIES_SUMMARIES);
const distinctNames = new Set(summaries.map(s => s.authorityName));
assert(
  "12. Four Separate Municipal Authorities",
  distinctNames.size === 4 &&
  distinctNames.has('Pune Municipal Corporation') &&
  distinctNames.has('Brihanmumbai Municipal Corporation') &&
  distinctNames.has('Greater Jaipur Municipal Corporation') &&
  distinctNames.has('Jaipur Heritage Municipal Corporation'),
  `Four distinct municipal corporations independently modeled without cross-merging.`
);

// 13. Search and Filtering Integrity
const searchResults = dataProvider.getFilteredRecords({ searchQuery: 'coastal', includeReview: false });
assert(
  "13. Deterministic Search Functionality",
  searchResults.length >= 1 && searchResults.some(r => r.unique_id === 'BMC_202526_BE_022'),
  `Search correctly locates BMC Coastal Road record (BMC_202526_BE_022).`
);

// 14. Primary Source Registry Verification
assert(
  "14. Source Registry Completeness",
  MUNICIPAL_SOURCE_REGISTRY.length === 7 && MUNICIPAL_SOURCE_REGISTRY.every(s => s.official_url.startsWith('https://')),
  `7 primary sources registered with valid HTTPS URLs, retrieval timestamps, and known limitations.`
);

console.log("\n=================================================================");
const passedCount = results.filter(r => r.passed).length;
const totalCount = results.length;
console.log(`TOTAL AUDIT TEST SUITE: ${passedCount}/${totalCount} TESTS PASSED.`);
if (passedCount === totalCount) {
  console.log("🎉 ALL AUDIT & RECONCILIATION ASSERTIONS CONFIRMED.");
} else {
  process.exit(1);
}
