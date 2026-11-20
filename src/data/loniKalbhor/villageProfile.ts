export interface VillageProfile {
  villageNameEnglish: string;
  villageNameMarathi: string;
  taluka: string;
  district: string;
  state: string;
  censusCode: string;
  lgdCode: string;
  governingBody: string;
  administrativeJurisdiction: string;
  coordinates: { lat: number; lng: number };
  boundaryAreaSqKm: number;
  pincode: string;
  assemblyConstituency: string;
  parliamentaryConstituency: string;
  nearbySettlements: string[];
  administrativeNote: string;
}

export const LONI_KALBHOR_PROFILE: VillageProfile = {
  villageNameEnglish: 'Loni Kalbhor',
  villageNameMarathi: 'लोणी काळभोर',
  taluka: 'Haveli',
  district: 'Pune',
  state: 'Maharashtra',
  censusCode: '556123',
  lgdCode: '189234',
  governingBody: 'Loni Kalbhor Gram Panchayat (under Haveli Panchayat Samiti & Pune Zilla Parishad)',
  administrativeJurisdiction: 'Rural / Semi-Urban Panchayat Area (Excluded from Pune Municipal Corporation limits)',
  coordinates: { lat: 18.5085, lng: 74.0532 },
  boundaryAreaSqKm: 24.6,
  pincode: '412201',
  assemblyConstituency: 'Hadapsar (212)',
  parliamentaryConstituency: 'Shirur (34)',
  nearbySettlements: ['Khed Shivapur', 'Theur', 'Uruli Devachi', 'Manjari Budruk', 'Kadamwak Wasti', 'Hadapsar'],
  administrativeNote: 'Loni Kalbhor is a major rapidly urbanising settlement located along NH 65 east of Pune. It is governed by its Gram Panchayat and Pune Zilla Parishad, maintaining a separate administrative identity from Pune Municipal Corporation (PMC).'
};
