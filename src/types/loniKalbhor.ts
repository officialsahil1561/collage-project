export type LoniKalbhorAuthority = 'Loni Kalbhor Gram Panchayat' | 'Pune Zilla Parishad' | 'Government of Maharashtra' | 'Government of India';

export type LoniKalbhorVerificationStatus =
  | 'Verified Official'
  | 'Official but Historical'
  | 'Partially Verified'
  | 'Secondary Source'
  | 'Estimated'
  | 'Unavailable';

export interface LoniKalbhorSourceItem {
  id: string;
  documentTitle: string;
  publisher: string;
  officialUrl: string;
  reportingPeriod: string;
  publicationDate: string;
  accessDate: string;
  pageOrTableRef: string;
  geographicCoverage: string;
  verificationStatus: LoniKalbhorVerificationStatus;
}

export interface LoniKalbhorDemographics {
  censusYear: number;
  totalPopulation: number;
  malePopulation: number;
  femalePopulation: number;
  totalHouseholds: number;
  literacyRatePct: number;
  scheduledCastePct: number;
  scheduledTribePct: number;
  populationDensitySqKm: number;
  projectedCurrentPopulation: string;
  sourceId: string;
}

export interface LoniKalbhorWaterFacility {
  id: string;
  facilityName: string;
  infrastructureType: 'Overhead Tank (ESR/GSR)' | 'Borewell / Tubewell' | 'Mula-Mutha River Extraction' | 'Jal Jeevan Piped Scheme' | 'Water Treatment Unit';
  capacityMLD: number | null;
  actualSupplyMLD: number | null;
  status: 'Operational' | 'Under Maintenance' | 'Proposed';
  managingAuthority: string;
  sourceId: string;
}

export interface LoniKalbhorRoadItem {
  id: string;
  roadName: string;
  classification: 'National Highway (NH 65)' | 'Major District Road (MDR)' | 'Gram Panchayat Internal Road' | 'Zilla Parishad Road';
  lengthKm: number;
  surfaceType: 'Bituminous (Asphalt)' | 'Concrete (CC)' | 'WBM / Gravel';
  condition: 'Good' | 'Fair' | 'Under Repair';
  authority: string;
  sourceId: string;
}

export interface LoniKalbhorFacility {
  id: string;
  name: string;
  category: 'Education' | 'Healthcare' | 'Administration' | 'Public Utility' | 'Emergency';
  subCategory: string;
  address: string;
  coordinates: { lat: number; lng: number };
  authority: string;
  status: 'Operational' | 'Proposed';
  sourceId: string;
}

export interface LoniKalbhorDevelopmentProject {
  id: string;
  projectName: string;
  scheme: string;
  implementingAgency: string;
  location: string;
  sanctionedCostCrores: number;
  fundsReleasedCrores: number;
  actualExpenditureCrores: number;
  physicalProgressPct: number;
  status: 'Completed' | 'Ongoing' | 'Approved';
  reportingPeriod: string;
  sourceId: string;
}

export interface LoniKalbhorFinanceRecord {
  id: string;
  financialYear: string;
  category: 'Receipts / Revenue' | 'Property Tax Collection' | 'Water Charges' | 'Grants (Finance Commission)' | 'Scheme Funds (Jal Jeevan / MGNREGA)' | 'Expenditure (Roads & Sanitation)';
  amountCrores: number;
  amountAsPrinted: string;
  status: 'Audited Actual' | 'Revised Estimate' | 'Budget Estimate' | 'Funds Released';
  documentTitle: string;
  sourceId: string;
}
