import { LoniKalbhorRoadItem } from '../../types/loniKalbhor';

export const LONI_KALBHOR_ROADS: LoniKalbhorRoadItem[] = [
  {
    id: 'LK_RD_001',
    roadName: 'Pune - Solapur National Highway (NH 65) Corridor through Loni Kalbhor',
    classification: 'National Highway (NH 65)',
    lengthKm: 8.4,
    surfaceType: 'Concrete (CC)',
    condition: 'Good',
    authority: 'National Highways Authority of India (NHAI)',
    sourceId: 'LK_SRC_004'
  },
  {
    id: 'LK_RD_002',
    roadName: 'Loni Kalbhor - Theur Link Road',
    classification: 'Major District Road (MDR)',
    lengthKm: 6.2,
    surfaceType: 'Bituminous (Asphalt)',
    condition: 'Fair',
    authority: 'Maharashtra Public Works Department (PWD)',
    sourceId: 'LK_SRC_004'
  },
  {
    id: 'LK_RD_003',
    roadName: 'Gram Panchayat Internal Roads & Internal Wasti Linkages',
    classification: 'Gram Panchayat Internal Road',
    lengthKm: 28.5,
    surfaceType: 'Bituminous (Asphalt)',
    condition: 'Fair',
    authority: 'Loni Kalbhor Gram Panchayat',
    sourceId: 'LK_SRC_005'
  },
  {
    id: 'LK_RD_004',
    roadName: 'Zilla Parishad School & Agricultural Access Roads',
    classification: 'Zilla Parishad Road',
    lengthKm: 14.0,
    surfaceType: 'WBM / Gravel',
    condition: 'Under Repair',
    authority: 'Pune Zilla Parishad Works Division',
    sourceId: 'LK_SRC_003'
  }
];
