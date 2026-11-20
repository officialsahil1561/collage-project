import {
  PrabhagRecord,
  WaterTreatmentPlant,
  SewageTreatmentPlant,
  RoadDevelopmentItem,
  PublicFacilityCategory,
  EnvironmentIndicatorItem,
  PuneLandmarkSlide,
  CitizenGlossaryTerm,
  StandardVerificationBadge,
  VerificationStatus
} from '../types';

export function toStandardVerificationBadge(
  status: VerificationStatus | 'Verified' | 'Partially Verified (Quarantined)' | 'Data Not Available' | string
): StandardVerificationBadge {
  if (status === 'Verified' || status === 'Verified Service Data') return 'Verified';
  if (status === 'Partially Verified' || status === 'Partially Verified (Quarantined)' || status === 'Unverified') {
    return 'Under Review';
  }
  if (status === 'Official Report Estimate' || status === 'Estimated') return 'Estimated';
  if (status === 'Data Not Available' || status === 'Granular Count Unavailable' || status === 'Unavailable') {
    return 'Unavailable';
  }
  return 'Under Review';
}

export const CITIZEN_GLOSSARY_TERMS: CitizenGlossaryTerm[] = [
  {
    term: 'Budget Estimate (BE)',
    shortCode: 'BE',
    plainExplanation:
      'The planned spending ceiling proposed or approved before the financial year starts. It is an authorization to spend, not proof that money was actually spent.',
    pmcExample: 'PMC FY 2026-27 Standing Committee Final BE: ₹15,669.00 Cr (FY 2025-26 BE: ₹12,618.09 Cr).'
  },
  {
    term: 'Revised Estimate (RE)',
    shortCode: 'RE',
    plainExplanation:
      'A mid-year update prepared by municipal finance officers adjusting the original BE based on actual tax inflows and project pace.',
    pmcExample: 'Marked Data Not Available for lines where PMC has not exported standalone RE schedules.'
  },
  {
    term: 'Actual Expenditure',
    shortCode: 'Actuals',
    plainExplanation:
      'Money genuinely paid out and audited after the financial year closes, verified in PMC’s statutory annual financial statements.',
    pmcExample: 'FY 2023-24 Audited Total Expenditure: ₹8,125.60 Cr (85.4% of ₹9,515 Cr BE).'
  },
  {
    term: 'Revenue Receipts',
    shortCode: 'Receipts',
    plainExplanation:
      'Recurring municipal income collected from property tax, building permission fees, water charges, and state GST compensation grants.',
    pmcExample: 'FY 2023-24 Audited Total Revenue Receipts: ₹11,206.84 Cr; FY 2026-27 Property Tax Target: ₹3,152 Cr.'
  },
  {
    term: 'Capital Expenditure',
    shortCode: 'CapEx',
    plainExplanation:
      'Money invested into long-term physical public assets such as roads, flyovers, water pipelines, sewage treatment plants, hospitals, and schools.',
    pmcExample: 'FY 2025-26 Proposed Capital Budget: ₹5,524.00 Cr (43.8% of total outlay).'
  }
];

export const PUNE_LANDMARK_SLIDES: PuneLandmarkSlide[] = [
  {
    id: 'slide-shaniwar-wada',
    title: 'Shaniwar Wada',
    subtitle: '18th-Century Seat of the Maratha Peshwas · Kasba Peth',
    location: 'Kasba Peth–Vishrambag Wada Ward · Prabhag 25',
    description:
      'Built in 1732 by Peshwa Bajirao I, Shaniwar Wada anchors Pune’s historic old core around which PMC’s oldest municipal water and heritage networks operate.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shaniwar_Wada_Pune.jpg?width=1600',
    fallbackAssetKey: 'shaniwarWadaHero',
    creditLabel: 'Wikimedia Commons · Shaniwar Wada Pune.jpg (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Shaniwar_Wada_Pune.jpg',
    targetPage: 'finances',
    ctaLabel: 'Explore Municipal Finances'
  },
  {
    id: 'slide-aga-khan-palace',
    title: 'Aga Khan Palace',
    subtitle: 'National Heritage Monument · Yerawada–Kalyaninagar',
    location: 'Yerawada–Kalas–Dhanori Ward · Prabhag 05',
    description:
      'Constructed in 1892 along the Mula-Mutha corridor, the monument stands in eastern Pune served by Bhama Askhed water transmission and riverfront conservation works.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/AgaKhan_Palace.jpg?width=1600',
    fallbackAssetKey: 'agaKhanPalaceCard',
    creditLabel: 'Wikimedia Commons · AgaKhan Palace.jpg (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:AgaKhan_Palace.jpg',
    targetPage: 'budget',
    ctaLabel: 'Inspect Annual Budgets'
  },
  {
    id: 'slide-sinhagad-fort',
    title: 'Sinhagad Fort',
    subtitle: 'Sahyadri Hill Citadel & Southern Watershed Backdrop',
    location: 'Southern Pune Fringe & Khadakwasla Basin',
    description:
      'Overlooking Khadakwasla Dam—the primary drinking water source supplying over 1,400 MLD through Parvati, Warje, and Vadgaon Water Treatment Plants.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sinhagad_pune.JPG?width=1600',
    fallbackAssetKey: 'shaniwarWadaHero',
    creditLabel: 'Wikimedia Commons · Sinhagad pune.JPG (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Sinhagad_pune.JPG',
    targetPage: 'water-sanitation',
    ctaLabel: 'Open Water & Sanitation'
  },
  {
    id: 'slide-lal-mahal',
    title: 'Lal Mahal',
    subtitle: 'Historic Childhood Residence of Chhatrapati Shivaji Maharaj',
    location: 'Kasba Peth Civic Core · Prabhag 24/25',
    description:
      'Situated steps from PMC’s central heritage precinct and Kasba Ganpati, surrounded by Peth redevelopment and pedestrian urban-design corridors.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Laal_Mahal,_Pune.jpg?width=1600',
    fallbackAssetKey: 'puneHeritageStreetCard',
    creditLabel: 'Wikimedia Commons · Laal Mahal, Pune.jpg (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Laal_Mahal,_Pune.jpg',
    targetPage: 'wards',
    ctaLabel: 'Explore Wards & Prabhags'
  },
  {
    id: 'slide-dagdusheth',
    title: 'Shreemant Dagdusheth Halwai Ganpati Mandir',
    subtitle: 'Civic & Cultural Landmark · Budhwar Peth',
    location: 'Kasba–Vishrambag Ward · Prabhag 25',
    description:
      'One of Pune’s most visited public shrines in the Peth core, supported by PMC festival sanitation, public lighting, and emergency fire preparedness.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dagdusheth_ganpati_mandir_pune.jpg?width=1600',
    fallbackAssetKey: 'puneHeritageStreetCard',
    creditLabel: 'Wikimedia Commons · Dagdusheth ganpati mandir pune.jpg (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Dagdusheth_ganpati_mandir_pune.jpg',
    targetPage: 'public-facilities',
    ctaLabel: 'Browse Public Facilities'
  },
  {
    id: 'slide-sppu',
    title: 'Savitribai Phule Pune University',
    subtitle: 'Main Heritage Edifice · Ganeshkhind',
    location: 'Aundh–Baner / Shivajinagar Corridor · Prabhag 07/08',
    description:
      'Known as the Oxford of the East, anchoring northwest Pune’s academic belt connected to Pune Metro Line 3 and University Chowk mobility upgrades.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/University_of_Pune,_Pune.jpg?width=1600',
    fallbackAssetKey: 'agaKhanPalaceCard',
    creditLabel: 'Wikimedia Commons · University of Pune, Pune.jpg (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:University_of_Pune,_Pune.jpg',
    targetPage: 'roads-development',
    ctaLabel: 'View Roads & Mobility'
  },
  {
    id: 'slide-saras-baug',
    title: 'Saras Baug',
    subtitle: '18th-Century Civic Garden & Talyatla Ganpati Precinct',
    location: 'Parvati Foothills · Bibwewadi / Kasba Border · Prabhag 27',
    description:
      'A landmark 25-acre municipal garden maintained under PMC’s Garden Department alongside Parvati Water Works and Peshwe Park.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sarasbaug,Pune.jpg?width=1600',
    fallbackAssetKey: 'agaKhanPalaceCard',
    creditLabel: 'Wikimedia Commons · Sarasbaug,Pune.jpg (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Sarasbaug,Pune.jpg',
    targetPage: 'environment',
    ctaLabel: 'View Environment & Parks'
  },
  {
    id: 'slide-pataleshwar',
    title: 'Pataleshwar Cave Temple',
    subtitle: '8th-Century Rashtrakuta Basalt Rock-Cut Monument · Jangli Maharaj Road',
    location: 'Ghole Road–Shivajinagar Ward · Prabhag 12',
    description:
      'Carved from monolithic Deccan basalt on JM Road, highlighting Pune’s deep geological and civic continuity in the heart of Shivajinagar.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pataleshwar_caves_pune.JPG?width=1600',
    fallbackAssetKey: 'puneHeritageStreetCard',
    creditLabel: 'Wikimedia Commons · Pataleshwar caves pune.JPG (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Pataleshwar_caves_pune.JPG',
    targetPage: 'departments',
    ctaLabel: 'Explore 20 Departments'
  },
  {
    id: 'slide-pune-metro',
    title: 'Pune Metro & Deccan Transit',
    subtitle: 'Modern Urban Rail & Station Skywalk Integration',
    location: 'Deccan Gymkhana–JM Road · Prabhag 29',
    description:
      'Elevated and underground rapid transit corridors coordinating station access, model footpaths, and PMPML feeder buses across PMC limits.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Entrance_and_skywalk_connecting_JM_Road_to_Deccan_Gymkhana_metro_station_in_Pune.jpg?width=1600',
    fallbackAssetKey: 'puneInfrastructureCard',
    creditLabel: 'Wikimedia Commons · Deccan Gymkhana metro station skywalk (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Entrance_and_skywalk_connecting_JM_Road_to_Deccan_Gymkhana_metro_station_in_Pune.jpg',
    targetPage: 'roads-development',
    ctaLabel: 'Track Mobility Projects'
  },
  {
    id: 'slide-pune-skyline',
    title: 'Pune City Skyline & Expanding Limits',
    subtitle: '516+ sq.km Municipal Jurisdiction Across Core & 34 Merged Villages',
    location: 'Pune Municipal Corporation Jurisdiction',
    description:
      'Rapid residential and IT growth from Kothrud and Baner to Kharadi and Hadapsar drives PMC’s ₹15,669 Cr FY 2026-27 infrastructure outlay.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pune_Skyline.jpg?width=1600',
    fallbackAssetKey: 'puneInfrastructureCard',
    creditLabel: 'Wikimedia Commons · Pune Skyline.jpg (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Pune_Skyline.jpg',
    targetPage: 'projects',
    ctaLabel: 'Inspect Public Projects'
  },
  {
    id: 'slide-mula-mutha',
    title: 'Mula–Mutha River Basin',
    subtitle: 'River Pollution Abatement (JICA 396 MLD) & Riverfront Works',
    location: '44 km Urban River Stretch · Sangamwadi to Warje',
    description:
      'Home to PMC’s ₹990.26 Cr JICA-assisted 11-STP expansion (396 MLD) and Priority Stretch-1 flood embankment works.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mula_Mutha_Confluence.jpg?width=1600',
    fallbackAssetKey: 'puneInfrastructureCard',
    creditLabel: 'Wikimedia Commons · Mula Mutha Confluence.jpg (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Mula_Mutha_Confluence.jpg',
    targetPage: 'environment',
    ctaLabel: 'Inspect River & ESR Data'
  },
  {
    id: 'slide-heritage-streets',
    title: 'Pune Heritage Avenues & FC Road',
    subtitle: 'Tree-Lined Civic Boulevards & Model Footpath Initiatives',
    location: 'Deccan–Shivajinagar · Prabhag 12 & 29',
    description:
      'Historic stone institutions and shaded pedestrian avenues now backed by PMC’s ₹85 Cr FY 2026-27 model footpath and urban greenery program.',
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/FC_Road_(4).JPG?width=1600',
    fallbackAssetKey: 'puneHeritageStreetCard',
    creditLabel: 'Wikimedia Commons · FC Road (4).JPG (CC BY-SA)',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:FC_Road_(4).JPG',
    targetPage: 'sources',
    ctaLabel: 'Inspect Official Sources'
  }
];

export const PMC_PRABHAGS: PrabhagRecord[] = [
  {
    prabhagNumber: 1,
    code: 'Prabhag 01',
    name: 'Kalas – Dhanori – Remaining Lohgaon',
    wardOfficeId: 'ward-nagar-road',
    wardOfficeName: 'Nagar Road – Wadgaon Sheri Regional Ward Office',
    zone: 'Zone 1',
    localities: ['Kalas', 'Dhanori', 'Lohgaon (Part)'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Dhanori Proposed 33 MLD JICA STP Site', 'Bhama Askhed Feeder Zone'],
    linkedProjectIds: ['proj-pmc-bhama-askhed', 'proj-pmc-jica-stp'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 2,
    code: 'Prabhag 02',
    name: 'Phulenagar – Nagpur Chawl',
    wardOfficeId: 'ward-yerawada',
    wardOfficeName: 'Yerawada – Kalas – Dhanori Regional Ward Office',
    zone: 'Zone 1',
    localities: ['Phulenagar', 'Nagpur Chawl', 'Yerawada Mental Hospital Border'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Rajiv Gandhi Municipal Hospital Catchment', 'Yerawada Fire Station Catchment'],
    linkedProjectIds: ['proj-pmc-11-hospitals', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 3,
    code: 'Prabhag 03',
    name: 'Viman Nagar – Lohgaon',
    wardOfficeId: 'ward-nagar-road',
    wardOfficeName: 'Nagar Road – Wadgaon Sheri Regional Ward Office',
    zone: 'Zone 1',
    localities: ['Viman Nagar', 'Lohgaon (PMC)', 'Symbiosis Precinct'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Bhama Askhed Water Distribution Zone', 'Eastern Pune Arterial Corridor'],
    linkedProjectIds: ['proj-pmc-bhama-askhed', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 4,
    code: 'Prabhag 04',
    name: 'Kharadi – Wagholi',
    wardOfficeId: 'ward-nagar-road',
    wardOfficeName: 'Nagar Road – Wadgaon Sheri Regional Ward Office',
    zone: 'Zone 1',
    localities: ['Kharadi', 'Wagholi', 'EON IT Park Corridor'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Kharadi 30 MLD JICA STP', 'Planned Kharadi Fire Station', 'Merged Village Infrastructure Zone'],
    linkedProjectIds: ['proj-pmc-jica-stp', 'proj-pmc-bhama-askhed'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 5,
    code: 'Prabhag 05',
    name: 'Kalyaninagar – Vadgaon Sheri',
    wardOfficeId: 'ward-yerawada',
    wardOfficeName: 'Yerawada – Kalas – Dhanori Regional Ward Office',
    zone: 'Zone 1',
    localities: ['Kalyaninagar', 'Vadgaon Sheri', 'Shastrinagar'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Aga Khan Palace Precinct', 'Mula-Mutha North Bank Corridor'],
    linkedProjectIds: ['proj-pmc-riverfront', 'proj-pmc-bhama-askhed'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 6,
    code: 'Prabhag 06',
    name: 'Yerawada – Gandhinagar',
    wardOfficeId: 'ward-yerawada',
    wardOfficeName: 'Yerawada – Kalas – Dhanori Regional Ward Office',
    zone: 'Zone 1',
    localities: ['Yerawada', 'Gandhinagar', 'Deccan College Road'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Bharat Ratna Rajiv Gandhi Hospital', 'Yerawada Fire Station', 'Sangamwadi RFD Stretch 1'],
    linkedProjectIds: ['proj-pmc-11-hospitals', 'proj-pmc-riverfront'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 7,
    code: 'Prabhag 07',
    name: 'Gokhale Nagar – Wakadewadi',
    wardOfficeId: 'ward-shivajinagar',
    wardOfficeName: 'Ghole Road – Shivajinagar Regional Ward Office',
    zone: 'Zone 2',
    localities: ['Gokhalenagar', 'Wakadewadi', 'Range Hills (PMC)'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Tanajiwadi 15 MLD JICA STP', 'SPPU Academic Precinct'],
    linkedProjectIds: ['proj-pmc-jica-stp', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 8,
    code: 'Prabhag 08',
    name: 'Aundh – Bopodi',
    wardOfficeId: 'ward-aundh-baner',
    wardOfficeName: 'Aundh – Baner Regional Ward Office',
    zone: 'Zone 2',
    localities: ['Aundh', 'Bopodi', 'ITI Road'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Aundh Botanical Garden 10 MLD JICA STP', 'Bopodi Maternity/OPD Upgrade', 'Aundh Fire Station'],
    linkedProjectIds: ['proj-pmc-jica-stp', 'proj-pmc-11-hospitals'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 9,
    code: 'Prabhag 09',
    name: 'Sus – Baner – Pashan',
    wardOfficeId: 'ward-aundh-baner',
    wardOfficeName: 'Aundh – Baner Regional Ward Office',
    zone: 'Zone 2',
    localities: ['Sus', 'Baner', 'Balewadi', 'Pashan'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Baner 25 MLD JICA STP', 'Planned Baner Fire Station', 'Merged Village Sus Corridor'],
    linkedProjectIds: ['proj-pmc-jica-stp', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 10,
    code: 'Prabhag 10',
    name: 'Bavdhan – Bhusari Colony',
    wardOfficeId: 'ward-kothrud-bavdhan',
    wardOfficeName: 'Kothrud – Bavdhan Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Bavdhan Khurd', 'Bhusari Colony', 'Chandani Chowk'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Planned Bavdhan Fire Station', 'Paud Road–Chandani Chowk Access'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 11,
    code: 'Prabhag 11',
    name: 'Ram Baug Colony – Shivtirthanagar',
    wardOfficeId: 'ward-kothrud-bavdhan',
    wardOfficeName: 'Kothrud – Bavdhan Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Rambaug Colony', 'Shivtirthanagar', 'Paud Road Core'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Kothrud Fire Station Catchment', '24x7 Water Supply ESR Network'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 12,
    code: 'Prabhag 12',
    name: 'Ch. Shivajinagar – Model Colony',
    wardOfficeId: 'ward-shivajinagar',
    wardOfficeName: 'Ghole Road – Shivajinagar Regional Ward Office',
    zone: 'Zone 2',
    localities: ['Shivajinagar', 'Model Colony', 'Ghole Road', 'JM Road'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Pataleshwar Cave Temple Precinct', 'Chhatrapati Sambhaji Park', 'PMC Model Footpaths'],
    linkedProjectIds: ['proj-pmc-riverfront', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 13,
    code: 'Prabhag 13',
    name: 'Pune Station – Jay Jawan Nagar',
    wardOfficeId: 'ward-dhole-patil',
    wardOfficeName: 'Dhole Patil Road Regional Ward Office',
    zone: 'Zone 1',
    localities: ['Pune Station', 'Sangamwadi', 'Tadiwala Road', 'Dhole Patil Road'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Dr. Naidu Hospital & 127 MLD JICA STP', 'Sangamwadi–Bund Garden RFD Stretch 1'],
    linkedProjectIds: ['proj-pmc-riverfront', 'proj-pmc-jica-stp'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 14,
    code: 'Prabhag 14',
    name: 'Koregaon Park – Ghorpadi – Mundhwa',
    wardOfficeId: 'ward-dhole-patil',
    wardOfficeName: 'Dhole Patil Road Regional Ward Office',
    zone: 'Zone 1',
    localities: ['Koregaon Park', 'Ghorpadi', 'Mundhwa'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Bhairoba 75 MLD STP', 'Mundhwa 20 MLD JICA STP', 'Bund Garden Park'],
    linkedProjectIds: ['proj-pmc-jica-stp', 'proj-pmc-riverfront'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 15,
    code: 'Prabhag 15',
    name: 'Manjari Budruk – Keshavnagar – Sadesatara Nali',
    wardOfficeId: 'ward-hadapsar-mundhwa',
    wardOfficeName: 'Hadapsar – Mundhwa Regional Ward Office',
    zone: 'Zone 5',
    localities: ['Manjari Budruk', 'Keshavnagar', 'Sadesatara Nali'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Merged Villages Water & Road Works', 'Eastern Fringe STP Network'],
    linkedProjectIds: ['proj-pmc-jica-stp'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 16,
    code: 'Prabhag 16',
    name: 'Hadapsar – Satavwadi',
    wardOfficeId: 'ward-hadapsar-mundhwa',
    wardOfficeName: 'Hadapsar – Mundhwa Regional Ward Office',
    zone: 'Zone 5',
    localities: ['Hadapsar', 'Satavwadi', 'Magarpatta Perimeter'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Hadapsar Fire Station', 'Matsyabeej Kendra 7 MLD JICA STP'],
    linkedProjectIds: ['proj-pmc-jica-stp', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 17,
    code: 'Prabhag 17',
    name: 'Ramtekdi – Malwadi – Vaiduwadi',
    wardOfficeId: 'ward-wanowrie-ramtekdi',
    wardOfficeName: 'Wanowrie – Ramtekdi Regional Ward Office',
    zone: 'Zone 5',
    localities: ['Ramtekdi', 'Malwadi', 'Vaiduwadi'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Ramtekdi Waste Transfer & Industrial Corridor'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 18,
    code: 'Prabhag 18',
    name: 'Wanawadi – Salunkhe Vihar',
    wardOfficeId: 'ward-wanowrie-ramtekdi',
    wardOfficeName: 'Wanowrie – Ramtekdi Regional Ward Office',
    zone: 'Zone 5',
    localities: ['Wanowrie', 'Salunkhe Vihar', 'Jagtap Chowk'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Arogyavardhini Clinic Precinct', 'Cantonment Border Roads'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 19,
    code: 'Prabhag 19',
    name: 'Kondhwa Khurd – Kausarbaug',
    wardOfficeId: 'ward-kondhwa-yewalewadi',
    wardOfficeName: 'Kondhwa – Yewalewadi Regional Ward Office',
    zone: 'Zone 5',
    localities: ['Kondhwa Khurd', 'Kausarbaug', 'NIBM Road'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Kondhwa Fire Station', 'Urban Health Clinic Network'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 20,
    code: 'Prabhag 20',
    name: 'Shankar Maharaj Math – Bibwewadi',
    wardOfficeId: 'ward-bibwewadi',
    wardOfficeName: 'Bibwewadi Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Bibwewadi', 'Shankar Maharaj Math', 'Chintamani Nagar'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Bibwewadi Civic Hospital/Clinic Catchment', 'Public Gardens'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 21,
    code: 'Prabhag 21',
    name: 'Mukundnagar – Salisbury Park',
    wardOfficeId: 'ward-bibwewadi',
    wardOfficeName: 'Bibwewadi Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Mukundnagar', 'Salisbury Park', 'Market Yard / Gultekdi'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Swargate Water Distribution Zone', 'Market Yard Fringe'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 22,
    code: 'Prabhag 22',
    name: 'Kashewadi – Dias Plot',
    wardOfficeId: 'ward-bhavani-peth',
    wardOfficeName: 'Bhavani Peth Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Kashewadi', 'Dias Plot', 'Bhavani Peth'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Central Fire Station (Bhavani Peth)', 'Sonawane Maternity Home Catchment'],
    linkedProjectIds: ['proj-pmc-11-hospitals'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 23,
    code: 'Prabhag 23',
    name: 'Ravivar Peth – Nana Peth',
    wardOfficeId: 'ward-bhavani-peth',
    wardOfficeName: 'Bhavani Peth Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Ravivar Peth', 'Nana Peth', 'Ganesh Peth'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['PMC Heritage Wholesale Peths', 'Fire & Sanitation Posts'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 24,
    code: 'Prabhag 24',
    name: 'Kasba Ganpati – Kamala Nehru Hospital – K.E.M. Hospital',
    wardOfficeId: 'ward-kasba-vishrambag',
    wardOfficeName: 'Kasba – Vishrambag Wada Regional Ward Office',
    zone: 'Zone 2',
    localities: ['Kasba Peth', 'Somwar Peth', 'Mangalwar Peth', 'Rasta Peth'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Kamla Nehru Municipal Hospital', 'Kasba Fire Station', 'Lal Mahal Precinct'],
    linkedProjectIds: ['proj-pmc-kamla-nehru', 'proj-pmc-riverfront'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 25,
    code: 'Prabhag 25',
    name: 'Shaniwar Peth – Mahatma Phule Mandai',
    wardOfficeId: 'ward-kasba-vishrambag',
    wardOfficeName: 'Kasba – Vishrambag Wada Regional Ward Office',
    zone: 'Zone 2',
    localities: ['Shaniwar Peth', 'Budhwar Peth', 'Narayan Peth', 'Sadashiv Peth'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Shaniwar Wada', 'Vishrambag Wada', 'Mahatma Phule Mandai', 'Dagdusheth Mandir'],
    linkedProjectIds: ['proj-pmc-riverfront', 'proj-pmc-model-schools'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 26,
    code: 'Prabhag 26',
    name: 'Ghorpade Peth – Guruwar Peth – Samatabhumi',
    wardOfficeId: 'ward-bhavani-peth',
    wardOfficeName: 'Bhavani Peth Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Ghorpade Peth', 'Guruwar Peth', 'Shukrawar Peth (South)'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Mahatma Phule Smarak (Samatabhumi)', 'Old Core Drainage Lines'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 27,
    code: 'Prabhag 27',
    name: 'Navi Peth – Parvati',
    wardOfficeId: 'ward-kasba-vishrambag',
    wardOfficeName: 'Kasba – Vishrambag Wada Regional Ward Office',
    zone: 'Zone 2',
    localities: ['Navi Peth', 'Parvati Paytha', 'Dattawadi'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Parvati Water Works (500 MLD WTP)', 'Saras Baug', 'Peshwe Park'],
    linkedProjectIds: ['proj-pmc-24x7-water', 'proj-pmc-riverfront'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 28,
    code: 'Prabhag 28',
    name: 'Janata Vasahat – Hingane Khurd',
    wardOfficeId: 'ward-sinhagad-road',
    wardOfficeName: 'Sinhagad Road Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Janata Vasahat', 'Hingane Khurd', 'Vitthalwadi'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Vitthalwadi STP', 'Sinhagad Road Flyover Corridor'],
    linkedProjectIds: ['proj-pmc-sinhagad-flyover', 'proj-pmc-jica-stp'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 29,
    code: 'Prabhag 29',
    name: 'Deccan Gymkhana – Happy Colony',
    wardOfficeId: 'ward-kothrud-bavdhan',
    wardOfficeName: 'Kothrud – Bavdhan Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Deccan Gymkhana', 'Erandwane', 'Happy Colony', 'Prabhat Road'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Kamala Nehru Park', 'Erandwane STP', 'Pu. La. Deshpande Garden Catchment'],
    linkedProjectIds: ['proj-pmc-riverfront', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 30,
    code: 'Prabhag 30',
    name: 'Karvenagar – Hingne Home Colony',
    wardOfficeId: 'ward-warje-karvenagar',
    wardOfficeName: 'Warje – Karvenagar Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Karvenagar', 'Hingne Home Colony', 'Cummins Precinct'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Karve Nagar Water ESR', 'Mutha River Bank Corridor'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 31,
    code: 'Prabhag 31',
    name: 'Mayur Colony – Kothrud',
    wardOfficeId: 'ward-kothrud-bavdhan',
    wardOfficeName: 'Kothrud – Bavdhan Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Mayur Colony', 'Kothrud', 'Dahanukar Colony'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Kothrud Fire Station', 'PMC Model Schools Precinct'],
    linkedProjectIds: ['proj-pmc-model-schools', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 32,
    code: 'Prabhag 32',
    name: 'Warje – Popular Nagar',
    wardOfficeId: 'ward-warje-karvenagar',
    wardOfficeName: 'Warje – Karvenagar Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Warje', 'Popular Nagar', 'Atul Nagar'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Warje Water Works (~200 MLD WTP)', 'Warje 28 MLD JICA STP', 'Warje Fire Station'],
    linkedProjectIds: ['proj-pmc-jica-stp', 'proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 33,
    code: 'Prabhag 33',
    name: 'Shivane – Khadakwasla – Dhayari (Part)',
    wardOfficeId: 'ward-warje-karvenagar',
    wardOfficeName: 'Warje – Karvenagar Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Shivane', 'Khadakwasla (PMC)', 'Dhayari (Part)', 'Uttamnagar'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Planned Dhayari Fire Station', 'Merged Villages Water & Road Works'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 34,
    code: 'Prabhag 34',
    name: 'Narhe – Vadgaon Budruk – Dhayari',
    wardOfficeId: 'ward-sinhagad-road',
    wardOfficeName: 'Sinhagad Road Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Narhe', 'Vadgaon Budruk', 'Dhayari', 'Nanded City Fringe'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Vadgaon Water Works (250 MLD WTP)', 'Vadgaon 26 MLD JICA STP', 'Sinhagad Flyover End'],
    linkedProjectIds: ['proj-pmc-sinhagad-flyover', 'proj-pmc-jica-stp'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 35,
    code: 'Prabhag 35',
    name: 'Suncity – Manik Bagh',
    wardOfficeId: 'ward-sinhagad-road',
    wardOfficeName: 'Sinhagad Road Regional Ward Office',
    zone: 'Zone 3',
    localities: ['Suncity', 'Manikbaug', 'Anandnagar', 'Hingane'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Sinhagad Road Multi-Level Flyover', 'Sinhagad Road Fire Station'],
    linkedProjectIds: ['proj-pmc-sinhagad-flyover'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 36,
    code: 'Prabhag 36',
    name: 'Sahakarnagar – Padmavati',
    wardOfficeId: 'ward-dhankawadi-sahakarnagar',
    wardOfficeName: 'Dhankawadi – Sahakarnagar Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Sahakarnagar', 'Padmavati', 'Taljai Foothills'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Taljai Forest Park Reserve', 'Pu. La. Deshpande / Padmavati Gardens'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 37,
    code: 'Prabhag 37',
    name: 'Dhankawadi – Katraj Dairy',
    wardOfficeId: 'ward-dhankawadi-sahakarnagar',
    wardOfficeName: 'Dhankawadi – Sahakarnagar Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Dhankawadi', 'Katraj Dairy Belt', 'Bharati Vidyapeeth'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Satara Road Arterial Corridor', 'Dhankawadi Urban Health Posts'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 38,
    code: 'Prabhag 38',
    name: 'Balaji Nagar – Ambegaon – Katraj',
    wardOfficeId: 'ward-dhankawadi-sahakarnagar',
    wardOfficeName: 'Dhankawadi – Sahakarnagar Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Balajinagar', 'Ambegaon Khurd', 'Ambegaon Budruk', 'Katraj'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Katraj Lake & Rajiv Gandhi Zoological Park', 'Katraj–Kondhwa Road Widening'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 39,
    code: 'Prabhag 39',
    name: 'Upper Super Indiranagar',
    wardOfficeId: 'ward-bibwewadi',
    wardOfficeName: 'Bibwewadi Regional Ward Office',
    zone: 'Zone 4',
    localities: ['Upper Indiranagar', 'Super Indiranagar', 'Kondhwa Border'],
    includesMergedVillages: false,
    keyLandmarksOrFacilities: ['Hill-slope Stormwater & Retaining Works'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 40,
    code: 'Prabhag 40',
    name: 'Kondhwa Budruk – Yewalewadi',
    wardOfficeId: 'ward-kondhwa-yewalewadi',
    wardOfficeName: 'Kondhwa – Yewalewadi Regional Ward Office',
    zone: 'Zone 5',
    localities: ['Kondhwa Budruk', 'Yewalewadi', 'Tilekar Nagar'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Yewalewadi Merged Village Civic Infrastructure', 'Katraj–Kondhwa Southern Belt'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  },
  {
    prabhagNumber: 41,
    code: 'Prabhag 41',
    name: 'Mohammadwadi – Undri',
    wardOfficeId: 'ward-wanowrie-ramtekdi',
    wardOfficeName: 'Wanowrie – Ramtekdi Regional Ward Office',
    zone: 'Zone 5',
    localities: ['Mohammedwadi', 'Undri', 'Pisoli'],
    includesMergedVillages: true,
    keyLandmarksOrFacilities: ['Planned Mohammadwadi Fire Station', 'Merged Village Water & Drainage Corridor'],
    linkedProjectIds: ['proj-pmc-24x7-water'],
    wardBudgetStatus: 'Unavailable',
    verificationBadge: 'Verified'
  }
];

export const PMC_WATER_TREATMENT_PLANTS: WaterTreatmentPlant[] = [
  {
    id: 'wtp-parvati',
    name: 'Parvati Water Works (Old & New)',
    sourceDam: 'Khadakwasla Dam Chain',
    capacityMLD: 500,
    capacityLabel: '~500 MLD (New) + Legacy Units',
    zonesServed: 'Central Pune Peths, Shivajinagar, Swargate, Bibwewadi & Western Core',
    status: 'Operational',
    verificationBadge: 'Verified',
    sourceUrl: 'https://www.pmc.gov.in/en/water-supply'
  },
  {
    id: 'wtp-wadgaon',
    name: 'Wadgaon Water Works',
    sourceDam: 'Khadakwasla Dam Chain',
    capacityMLD: 250,
    capacityLabel: '~250 MLD (Old 125 + New 125 MLD)',
    zonesServed: 'Sinhagad Road, Dhayari, Narhe, Ambegaon, Katraj & Southern Zones',
    status: 'Operational',
    verificationBadge: 'Verified',
    sourceUrl: 'https://www.pmc.gov.in/en/water-supply'
  },
  {
    id: 'wtp-warje',
    name: 'Warje Water Works',
    sourceDam: 'Khadakwasla Dam Chain',
    capacityMLD: 200,
    capacityLabel: '~200 MLD (New) + Legacy Unit',
    zonesServed: 'Warje, Karvenagar, Kothrud, Bavdhan, Baner & Pashan',
    status: 'Operational',
    verificationBadge: 'Verified',
    sourceUrl: 'https://www.pmc.gov.in/en/water-supply'
  },
  {
    id: 'wtp-bhama-askhed',
    name: 'Bhama Askhed / Kuruli Water Works',
    sourceDam: 'Bhama Askhed Dam',
    capacityMLD: 200,
    capacityLabel: '200 MLD Design Capacity',
    zonesServed: 'Nagar Road, Viman Nagar, Kharadi, Wadgaon Sheri, Yerawada & Dhanori',
    status: 'Operational',
    verificationBadge: 'Verified',
    sourceUrl: 'https://www.pmc.gov.in/en/bhama-askhed-water-supply'
  },
  {
    id: 'wtp-cantonment',
    name: 'Cantonment (Lashkar) Water Works',
    sourceDam: 'Khadakwasla / Mula-Mutha Canal Supply',
    capacityMLD: null,
    capacityLabel: 'Major Legacy & Upgraded Capacity (Exact current split: Unavailable)',
    zonesServed: 'Hadapsar, Wanowrie, Kondhwa, Dhole Patil Rd & Adjoining Areas',
    status: 'Operational',
    verificationBadge: 'Estimated',
    sourceUrl: 'https://www.pmc.gov.in/en/water-supply'
  },
  {
    id: 'wtp-holkar-chikhali',
    name: 'Holkar & Chikhali Localized / Merged Units',
    sourceDam: 'Pavana / Mula & Dam Drawl',
    capacityMLD: null,
    capacityLabel: 'Localized Northern Fringe Supply (Exact MLD log: Unavailable)',
    zonesServed: 'Bopodi, Kalas & Northern PMC Pockets',
    status: 'Operational',
    verificationBadge: 'Unavailable',
    sourceUrl: 'https://www.pmc.gov.in/en/water-supply'
  }
];

export const PMC_SEWAGE_TREATMENT_PLANTS: SewageTreatmentPlant[] = [
  { id: 'stp-jica-naidu', name: 'Dr. Naidu Hospital STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 127, wardOrLocality: 'Sangamwadi / Dhole Patil Rd (Prabhag 13)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-bhairoba', name: 'Bhairoba Nalla STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 75, wardOrLocality: 'Koregaon Park / Mundhwa (Prabhag 14)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-dhanori', name: 'Dhanori STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 33, wardOrLocality: 'Kalas–Dhanori (Prabhag 01)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-kharadi', name: 'Kharadi STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 30, wardOrLocality: 'Kharadi (Prabhag 04)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-warje', name: 'Warje STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 28, wardOrLocality: 'Warje (Prabhag 32)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-vadgaon', name: 'Vadgaon STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 26, wardOrLocality: 'Vadgaon Budruk (Prabhag 34)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-baner', name: 'Baner STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 25, wardOrLocality: 'Baner (Prabhag 09)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-mundhwa', name: 'Mundhwa STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 20, wardOrLocality: 'Mundhwa (Prabhag 14)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-tanajiwadi', name: 'Tanajiwadi STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 15, wardOrLocality: 'Wakadewadi / Shivajinagar (Prabhag 07)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-botanical', name: 'Botanical Garden (Aundh) STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 10, wardOrLocality: 'Aundh (Prabhag 08)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' },
  { id: 'stp-jica-matsyabeej', name: 'Matsyabeej Kendra (Hadapsar) STP', program: 'JICA Mula-Mutha (11 New STPs)', capacityMLD: 7, wardOrLocality: 'Hadapsar (Prabhag 16)', status: 'Under Construction (JICA / NRCP)', verificationBadge: 'Verified', sourceUrl: 'https://www.pmc.gov.in/en/jica-project' }
];

export const PMC_ROADS_DEVELOPMENT_ITEMS: RoadDevelopmentItem[] = [
  {
    id: 'rd-fy2627-mobility',
    title: 'FY 2026-27 Urban Mobility, Missing Links & 65 km New Roads Outlay',
    type: 'Arterial & Missing Links',
    department: 'Roads & Traffic Department',
    wardOrCorridor: 'City-wide PMC Limits & 34 Merged Villages',
    sanctionedOrBudgetedCrores: 1800.00,
    budgetStage: 'FY 2026-27 Approved Budget Outlay (BE)',
    financialYear: '2026-27',
    status: 'Approved in Budget',
    timelineNote: 'FY 2026-27 Annual Execution Cycle (Actual spend pending year close)',
    verificationBadge: 'Verified',
    sourceTitle: 'PMC Annual Budget Statement FY 2026-27',
    sourceUrl: 'https://www.pmc.gov.in/en/budget-overview',
    notes: 'Designates ~65 km of new road corridors, missing DP road links, arterial widening, and merged-village connectivity.'
  },
  {
    id: 'rd-fy2627-land-acq',
    title: 'Road Links & DP Reservation Land Acquisition (Cash / TDR)',
    type: 'Footpath & Land Acquisition',
    department: 'Public Works & Land Acquisition',
    wardOrCorridor: 'Bottleneck Junctions & Missing Link Corridors',
    sanctionedOrBudgetedCrores: 400.00,
    budgetStage: 'FY 2026-27 Budgeted Capital Provision',
    financialYear: '2026-27',
    status: 'Approved in Budget',
    timelineNote: 'Doubled from FY 2025-26 ₹200 Cr cash land acquisition provision',
    verificationBadge: 'Verified',
    sourceTitle: 'PMC Annual Budget Statement FY 2026-27',
    sourceUrl: 'https://www.pmc.gov.in/en/budget-overview',
    notes: 'Paired with ₹85.00 Cr dedicated allocation for encroachment-free model footpaths across central and arterial streets.'
  },
  {
    id: 'rd-sinhagad-flyover',
    title: 'Sinhagad Road Multi-Level Flyover (Rajaram Bridge to Fun Time Theatre)',
    type: 'Flyover & Grade Separator',
    department: 'Roads & Traffic Department',
    wardOrCorridor: 'Sinhagad Road Ward Office (Prabhags 28, 34, 35)',
    sanctionedOrBudgetedCrores: 134.70,
    budgetStage: 'Standing Committee Awarded Tender (Est. ₹118.37 Cr)',
    financialYear: '2025-26',
    status: 'Under Construction (Partial Stretches Opened)',
    timelineNote: 'Work Order Sept 2021 · Multi-stage commissioning active',
    verificationBadge: 'Verified',
    sourceTitle: 'PMC Standing Committee Contract Resolution & Road Dept.',
    sourceUrl: 'https://www.pmc.gov.in/en/road-department',
    notes: '2.5+ km grade separator across Vitthalwadi, Manikbaug, and Anandnagar junctions.'
  },
  {
    id: 'rd-pmpml-pmc-share',
    title: 'PMPML Public Bus Operational Support (PMC 60% Share & Concessions)',
    type: 'Mobility & Transit',
    department: 'Transport Department (PMC Share to PMPML)',
    wardOrCorridor: 'PMC Municipal Bus Routes (PCMC 40% share excluded)',
    sanctionedOrBudgetedCrores: 508.07,
    budgetStage: 'FY 2025-26 Budget Provision (₹484.96 Cr VGF + ₹23.11 Cr Passes)',
    financialYear: '2025-26',
    status: 'Active Operational Grant',
    timelineNote: 'Annual operational viability & e-bus corridor support',
    verificationBadge: 'Verified',
    sourceTitle: 'PMC Budget Provision for PMPML FY 2025-26',
    sourceUrl: 'https://www.pmc.gov.in/en/budget-overview',
    notes: 'Strictly accounts for PMC’s municipal share; Pimpri-Chinchwad Municipal Corporation (PCMC) share is never mixed.'
  },
  {
    id: 'rd-footpaths-model',
    title: 'Encroachment-Free Model Footpaths Initiative',
    type: 'Footpath & Land Acquisition',
    department: 'Roads & Traffic Department',
    wardOrCorridor: 'Major Arterial & Commercial Corridors',
    sanctionedOrBudgetedCrores: 85.00,
    budgetStage: 'FY 2026-27 Budget Proposal',
    financialYear: '2026-27',
    status: 'Budgeted',
    timelineNote: 'FY 2026-27 execution cycle',
    verificationBadge: 'Verified',
    sourceTitle: 'PMC FY 2026-27 Budget Statement',
    sourceUrl: 'https://www.pmc.gov.in/en/budget-overview',
    notes: 'Dedicated pedestrian-priority corridor upgrades complementing Pune Metro station feeder walks.'
  },
  {
    id: 'rd-fy2425-quarantined',
    title: 'FY 2024-25 Departmental Road Works Sub-head (Quarantined Audit Line)',
    type: 'Arterial & Missing Links',
    department: 'Roads & Traffic Department',
    wardOrCorridor: '15 PMC Regional Ward Offices',
    sanctionedOrBudgetedCrores: 1420.00,
    budgetStage: 'Quarantined Sub-head (Excluded from Aggregates)',
    financialYear: '2024-25',
    status: 'Under Review (Pending Ward Schedule)',
    timelineNote: 'Exact ward-by-ward lane-km actual spend: Data Not Available',
    verificationBadge: 'Under Review',
    sourceTitle: 'PMC Budget Book FY 2024-25 (OpenCity)',
    sourceUrl: 'https://data.opencity.in/dataset/pmc-budgets',
    notes: 'Quarantined as Partially Verified to prevent double counting against the ₹11,601 Cr consolidated FY 2024-25 BE.'
  }
];

export const PMC_PUBLIC_FACILITY_CATEGORIES: PublicFacilityCategory[] = [
  {
    id: 'fac-hospitals',
    category: 'Hospitals & Clinics',
    department: 'Public Health Department',
    documentedCountLabel: '96 Arogyavardhini Clinics + General & Maternity Hospitals',
    verificationBadge: 'Verified',
    summary:
      'PMC operates major general hospitals, infectious disease & maternity homes, and 96 urban Arogyavardhini clinics backed by a ₹516.05 Cr FY 2024-25 health budget and a ₹90 Cr 11-centre upgrade program.',
    notableLocations: [
      'Kamla Nehru Hospital (Kasba / Mangalwar Peth — ₹13 Cr Phase-1 Upgrade)',
      'Bharat Ratna Rajiv Gandhi Hospital (Yerawada)',
      'Dr. Naidu Infectious Diseases Hospital (Sangamwadi)',
      'Sonawane Maternity Home (Bhavani Peth)',
      'Dr. Homi J. Bhabha Maternity Home & 96 Arogyavardhini Clinics'
    ],
    dataGapNote: 'Exact real-time daily bed occupancy and ward-by-ward clinic doctor roster: Unavailable in open CSV feeds.',
    sourceTitle: 'PMC Health Department Directory & Budget Highlights',
    sourceUrl: 'https://www.pmc.gov.in/en/health'
  },
  {
    id: 'fac-schools',
    category: 'Municipal Schools',
    department: 'Education Department',
    documentedCountLabel: '~89 Core Primary Bundles + Secondary & Technical Schools (Exact Post-Merger Total: Estimated)',
    verificationBadge: 'Estimated',
    summary:
      'PMC Education Board runs Balwadis, Marathi, Urdu, and English-medium primary/secondary schools across the city, with ₹34.64 Cr sanctioned for Model School campus, science lab, and sanitation upgrades.',
    notableLocations: [
      'PMC Model Schools Upgrade Network (₹34.64 Cr Approved)',
      'Peth & Suburban Primary Schools (Kothrud, Kasba, Yerawada, Hadapsar)',
      'Municipal Technical & Secondary Streams'
    ],
    dataGapNote: 'Consolidated post-34-village-merger active student enrolment & per-school expenditure ledger: Unavailable in open tabular APIs.',
    sourceTitle: 'PMC Education Board & Standing Committee Approvals',
    sourceUrl: 'https://www.pmc.gov.in/en/education-board'
  },
  {
    id: 'fac-gardens',
    category: 'Parks & Gardens',
    department: 'Gardens & Parks Department',
    documentedCountLabel: '200+ Public Gardens & Theme Parks',
    verificationBadge: 'Estimated',
    summary:
      'PMC maintains over 200 public parks, botanical theme gardens, and urban ecological reserves across all 15 ward offices alongside 5.78 lakh surveyed municipal trees.',
    notableLocations: [
      'Pu. La. Deshpande Udyan (Okayama Friendship Garden, Sinhagad Rd)',
      'Saras Baug & Peshwe Energy Park (Parvati Foothills)',
      'Kamala Nehru Park & Chhatrapati Sambhaji Raje Garden (Deccan/JM Rd)',
      'Seven Wonders Theme Park & Bund Garden (Yerawada/Koregaon Park)'
    ],
    dataGapNote: 'Individual park annual maintenance bills are consolidated inside the quarantined ₹210.15 Cr sub-head (Ward breakdown: Unavailable).',
    sourceTitle: 'PMC Garden Department & Environment Status Report (ESR)',
    sourceUrl: 'https://www.pmc.gov.in/en/garden'
  },
  {
    id: 'fac-fire-stations',
    category: 'Fire Stations',
    department: 'Fire Department',
    documentedCountLabel: '20 Operational Fire Stations (+5 Planned in Merged Fringe)',
    verificationBadge: 'Verified',
    summary:
      'Pune Fire Brigade operates 20 active fire stations across 520+ sq.km with hydraulic ladders, water tenders, and hazmat rescue teams, with 5 new stations planned for merged suburban pockets.',
    notableLocations: [
      'Central Fire Station (Bhavani Peth)',
      'Kothrud, Warje, Sinhagad Road & Aundh Fire Stations',
      'Yerawada, Hadapsar, Kondhwa & Kasba Fire Stations',
      'Planned: Mohammadwadi, Baner, Kharadi, Dhayari & Bavdhan'
    ],
    dataGapNote: 'Standalone Fire Brigade budget allocation is not separately tabulated in consolidated summaries (Unavailable).',
    sourceTitle: 'PMC Fire Brigade Official Directory',
    sourceUrl: 'https://www.pmc.gov.in/en/fire-brigade'
  },
  {
    id: 'fac-public-toilets',
    category: 'Public Toilets',
    department: 'Solid Waste Management Department',
    documentedCountLabel: 'ODF++ Certified Network (Exact Seat Audit: Unavailable)',
    verificationBadge: 'Unavailable',
    summary:
      'Public and community toilet blocks (CT/PT), mobile units, and women-friendly "Ti" toilets operate across transit corridors, markets, and dense wards under Swachh Bharat protocols.',
    notableLocations: [
      'Swargate, Pune Station & Shivajinagar Transit Hubs',
      'Mahatma Phule Mandai & Laxmi Road Commercial Precincts',
      '"Ti" Pink Toilets across Arterial Markets'
    ],
    dataGapNote: 'Real-time functional seat count, daily water-availability logs, and Prabhag-wise O&M contract spend: Unavailable in open datasets.',
    sourceTitle: 'PMC Solid Waste Management & Swachh Portal',
    sourceUrl: 'https://www.pmc.gov.in/en/solid-waste-management'
  },
  {
    id: 'fac-community-centres',
    category: 'Community Centres',
    department: 'Public Works & Social Development',
    documentedCountLabel: 'Ward Samaj Mandirs & Cultural Halls (Master Count: Unavailable)',
    verificationBadge: 'Unavailable',
    summary:
      'PMC constructs and leases civic auditoriums, ward-level Samaj Mandirs, women’s skill-training halls, and senior citizen centres managed jointly by ward offices and Social Development.',
    notableLocations: [
      'Bal Gandharva Rang Mandir & Yashwantrao Chavan Natyagruha',
      'Ganesh Kala Krida Manch (Swargate)',
      'Indradhanushya Environment Education & Resource Centre (Navi Peth)'
    ],
    dataGapNote: 'Complete ward-by-ward inventory and annual maintenance ledger for all 41 Prabhag Samaj Mandirs: Unavailable in open CSVs.',
    sourceTitle: 'PMC Official Civic Portal & Social Development',
    sourceUrl: 'https://www.pmc.gov.in/'
  }
];

export const PMC_ENVIRONMENT_INDICATORS: EnvironmentIndicatorItem[] = [
  {
    id: 'env-swm-generation',
    domain: 'Solid Waste Management',
    title: 'Daily Municipal Solid Waste Generation & Processing',
    metricValue: '~2,400 TPD Generated · ~95% Segregation',
    reportingCycle: 'ESR 2024-25',
    verificationBadge: 'Verified',
    details:
      'Pune generates ~2,200–2,400 tonnes per day (TPD) of solid waste (including ~1,350–1,400 TPD dry waste). Reported processing capacity handles ~1,440 TPD dry waste streams and ~1,105 TPD wet waste via composting, bio-CNG, and waste-to-energy plants alongside SWaCH door-to-door collection.',
    sourceTitle: 'PMC Environment Status Report (ESR) & SWM Disclosures',
    sourceUrl: 'https://www.pmc.gov.in/en/environment-status-report'
  },
  {
    id: 'env-river-jica',
    domain: 'River & Water Ecology',
    title: 'Mula–Mutha River Sewage Treatment Expansion (JICA)',
    metricValue: '~567 MLD Existing + 396 MLD (11 JICA STPs)',
    reportingCycle: '2024-26 Active Works',
    verificationBadge: 'Verified',
    details:
      'Existing STP capacity (~567 MLD) is being expanded by 396 MLD across 11 new sewage treatment plants (₹990.26 Cr sanctioned; 85% GoI/JICA grant + 15% PMC share) to stop untreated sewage discharge into Mula, Mutha, and Mula-Mutha rivers.',
    sourceTitle: 'PMC JICA Project Official Portal',
    sourceUrl: 'https://www.pmc.gov.in/en/jica-project'
  },
  {
    id: 'env-urban-trees',
    domain: 'Urban Greenery & Biodiversity',
    title: 'Urban Tree Census, Parks & Avian Biodiversity',
    metricValue: '5.78 Lakh+ Recorded Trees · 275 Bird Species',
    reportingCycle: 'ESR 2024-25',
    verificationBadge: 'Verified',
    details:
      'Mandatory Sec. 67A Environment Status Report documents over 5,78,000 recorded urban trees, 200+ civic gardens, hills/biodiversity parks (Taljai, Vetal Tekdi), and 275 recorded bird species across Pune municipal limits.',
    sourceTitle: 'PMC Environment Status Report (ESR)',
    sourceUrl: 'https://www.pmc.gov.in/en/environment-status-report'
  },
  {
    id: 'env-air-quality',
    domain: 'Air & Noise Monitoring',
    title: 'Continuous Ambient Air Quality (CAAQMS / MPCB)',
    metricValue: 'Live Station Feed: Unavailable in Static Portal',
    reportingCycle: 'MPCB / CPCB / ESR',
    verificationBadge: 'Unavailable',
    details:
      'Air quality (PM2.5, PM10, NO₂) and noise monitoring stations are reported in PMC’s annual ESR and live MPCB/CPCB dashboards. Because real-time API feeds are external, live daily station readings are marked Unavailable here rather than showing stale mock AQI.',
    sourceTitle: 'PMC Environment Status Report & MPCB Portal',
    sourceUrl: 'https://www.pmc.gov.in/en/environment-status-report'
  }
];
