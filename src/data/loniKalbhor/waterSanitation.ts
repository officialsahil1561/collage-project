import { LoniKalbhorWaterFacility } from '../../types/loniKalbhor';

export const LONI_KALBHOR_WATER_FACILITIES: LoniKalbhorWaterFacility[] = [
  {
    id: 'LK_WAT_001',
    facilityName: 'Mula-Mutha River Raw Water Intake & Jackwell',
    infrastructureType: 'Mula-Mutha River Extraction',
    capacityMLD: 12.5,
    actualSupplyMLD: 9.2,
    status: 'Operational',
    managingAuthority: 'Maharashtra Water Resources Department & Gram Panchayat',
    sourceId: 'LK_SRC_003'
  },
  {
    id: 'LK_WAT_002',
    facilityName: 'Loni Kalbhor Jal Jeevan Mission Piped Water Supply Scheme (ESR 1)',
    infrastructureType: 'Jal Jeevan Piped Scheme',
    capacityMLD: 6.0,
    actualSupplyMLD: 5.1,
    status: 'Operational',
    managingAuthority: 'Pune Zilla Parishad Rural Water Supply Division',
    sourceId: 'LK_SRC_003'
  },
  {
    id: 'LK_WAT_003',
    facilityName: 'Kadamwak Wasti Booster Pumping Station & Distribution Tank',
    infrastructureType: 'Overhead Tank (ESR/GSR)',
    capacityMLD: 3.5,
    actualSupplyMLD: 3.0,
    status: 'Operational',
    managingAuthority: 'Loni Kalbhor Gram Panchayat',
    sourceId: 'LK_SRC_003'
  },
  {
    id: 'LK_WAT_004',
    facilityName: 'Community Borewells & Solar Tubewell Grid',
    infrastructureType: 'Borewell / Tubewell',
    capacityMLD: 2.0,
    actualSupplyMLD: 1.5,
    status: 'Operational',
    managingAuthority: 'Gram Panchayat Water Committee',
    sourceId: 'LK_SRC_003'
  }
];
