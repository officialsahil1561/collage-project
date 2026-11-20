export type NavGroupKey = 'explore' | 'finance' | 'civic-services' | 'about';

export interface NavItemConfig {
  key: string;
  label: string;
  shortLabel?: string;
  description: string;
  path: string;
  group: NavGroupKey;
}

export interface NavGroupConfig {
  key: NavGroupKey;
  label: string;
  defaultPage: string;
  items: NavItemConfig[];
}

export interface BreadcrumbCrumb {
  label: string;
  pageKey?: string;
}

export const NAV_GROUPS: NavGroupConfig[] = [
  {
    key: 'explore',
    label: 'Explore',
    defaultPage: 'projects',
    items: [
      {
        key: 'projects',
        label: 'Public Projects',
        description: 'Sanctioned capital works, flyovers, riverfront & water schemes',
        path: '/explore/projects',
        group: 'explore'
      },
      {
        key: 'wards',
        label: 'Ward Explorer',
        description: '15 Regional Ward Offices, 41 Prabhags & side-by-side comparison',
        path: '/explore/wards',
        group: 'explore'
      },
      {
        key: 'tenders',
        label: 'Tenders & Contracts',
        description: 'MahaTenders references & Standing Committee awards',
        path: '/explore/tenders',
        group: 'explore'
      },
      {
        key: 'infrastructure',
        label: 'Civic Infrastructure',
        description: '12 Pune citywide civic infrastructure sectors',
        path: '/explore/infrastructure',
        group: 'explore'
      }
    ]
  },
  {
    key: 'finance',
    label: 'Finance',
    defaultPage: 'finances',
    items: [
      {
        key: 'finances',
        label: 'Financial Overview',
        description: 'Executive summary, FY 2026-27 BE & multi-year charts',
        path: '/finance/overview',
        group: 'finance'
      },
      {
        key: 'budget',
        label: 'Annual Budget Tracker',
        description: 'Compare BE, RE & Audited Actuals across FY 2022–27',
        path: '/finance/budget-tracker',
        group: 'finance'
      },
      {
        key: 'revenue-expenditure',
        label: 'Revenue & Expenditure',
        description: 'Property tax collections, grants, CapEx & liabilities',
        path: '/finance/revenue-expenditure',
        group: 'finance'
      },
      {
        key: 'departments',
        label: 'Departments',
        description: '20 PMC department allocation & quarantine profiles',
        path: '/finance/departments',
        group: 'finance'
      },
      {
        key: 'records',
        label: 'Financial Records',
        description: '43 reconciled & quarantined PMC line-item records',
        path: '/finance/records',
        group: 'finance'
      }
    ]
  },
  {
    key: 'civic-services',
    label: 'Civic Services',
    defaultPage: 'water-sanitation',
    items: [
      {
        key: 'water-sanitation',
        label: 'Water & Sanitation',
        description: '6 WTPs, 11 JICA Mula-Mutha STPs (396 MLD) & SWM',
        path: '/civic/water-sanitation',
        group: 'civic-services'
      },
      {
        key: 'roads-development',
        label: 'Roads & Development',
        description: '₹1,800 Cr urban mobility, 65 km missing links & footpaths',
        path: '/civic/roads-development',
        group: 'civic-services'
      },
      {
        key: 'public-facilities',
        label: 'Public Facilities',
        description: '96 clinics, municipal schools, 20 fire stations & gardens',
        path: '/civic/public-facilities',
        group: 'civic-services'
      },
      {
        key: 'environment',
        label: 'Environment Dashboard',
        description: 'ESR air, river quality, waste processing & tree census',
        path: '/civic/environment',
        group: 'civic-services'
      },
      {
        key: 'complaints',
        label: 'Civic Complaints',
        description: 'Prepare & route municipal grievances to PMC CARE',
        path: '/civic/complaints',
        group: 'civic-services'
      },
      {
        key: 'feedback',
        label: 'Citizen Feedback',
        description: 'Report financial data errors or broken source links',
        path: '/civic/feedback',
        group: 'civic-services'
      }
    ]
  },
  {
    key: 'about',
    label: 'About',
    defaultPage: 'about',
    items: [
      {
        key: 'about',
        label: 'About JanDhan Insights',
        description: 'Platform mission, PMC boundary isolation & disclosure policy',
        path: '/about',
        group: 'about'
      },
      {
        key: 'sources',
        label: 'Data Sources',
        description: '6 verified official PMC, OpenCity & MahaTenders portals',
        path: '/about/data-sources',
        group: 'about'
      },
      {
        key: 'audit-report',
        label: 'Audit Report',
        description: '43-record reconciliation & double-count quarantine rules',
        path: '/about/audit-report',
        group: 'about'
      },
      {
        key: 'methodology',
        label: 'Methodology',
        description: '6-tier source classification & INR normalization standards',
        path: '/about/methodology',
        group: 'about'
      }
    ]
  }
];

const ALL_NAV_ITEMS: NavItemConfig[] = NAV_GROUPS.flatMap((g) => g.items);

const ALIAS_TO_CANONICAL: Record<string, string> = {
  home: 'home',
  overview: 'finances',
  spending: 'records'
};

export function normalizePageKey(pageKey: string): string {
  const cleaned = pageKey.trim().toLowerCase();
  if (cleaned === '' || cleaned === 'home') return 'home';
  if (ALIAS_TO_CANONICAL[cleaned]) return ALIAS_TO_CANONICAL[cleaned];
  if (ALL_NAV_ITEMS.some((i) => i.key === cleaned)) return cleaned;
  return 'home';
}

export function getNavItem(pageKey: string): NavItemConfig | undefined {
  const normalized = normalizePageKey(pageKey);
  return ALL_NAV_ITEMS.find((i) => i.key === normalized);
}

export function getPathForPage(pageKey: string): string {
  const normalized = normalizePageKey(pageKey);
  if (normalized === 'home') return '/';
  return getNavItem(normalized)?.path || '/';
}

export function resolvePageFromPathname(pathname: string): string {
  const cleanPath = (pathname || '/').replace(/\/+$/, '') || '/';
  if (cleanPath === '/' || cleanPath === '/home') return 'home';

  const exactMatch = ALL_NAV_ITEMS.find((i) => i.path === cleanPath);
  if (exactMatch) return exactMatch.key;

  // Support shorthand paths like /wards, /budget, /complaints, /finances, etc.
  const slug = cleanPath.replace(/^\//, '').toLowerCase();
  if (ALIAS_TO_CANONICAL[slug]) return ALIAS_TO_CANONICAL[slug];
  const slugMatch = ALL_NAV_ITEMS.find((i) => i.key === slug);
  if (slugMatch) return slugMatch.key;

  return 'home';
}

export function getGroupForPage(pageKey: string): NavGroupConfig | undefined {
  const item = getNavItem(pageKey);
  if (!item) return undefined;
  return NAV_GROUPS.find((g) => g.key === item.group);
}

export function getBreadcrumbsForPage(pageKey: string): BreadcrumbCrumb[] {
  const normalized = normalizePageKey(pageKey);
  if (normalized === 'home') {
    return [{ label: 'Home' }];
  }

  const item = getNavItem(normalized);
  const group = getGroupForPage(normalized);
  if (!item || !group) {
    return [{ label: 'Home', pageKey: 'home' }];
  }

  // Avoid duplicate label when About -> About JanDhan Insights
  if (group.key === 'about' && item.key === 'about') {
    return [
      { label: 'Home', pageKey: 'home' },
      { label: 'About JanDhan Insights' }
    ];
  }

  return [
    { label: 'Home', pageKey: 'home' },
    { label: group.label, pageKey: group.defaultPage },
    { label: item.label }
  ];
}

export function getDocumentTitleForPage(pageKey: string): string {
  const normalized = normalizePageKey(pageKey);
  if (normalized === 'home') {
    return 'JanDhan Insights — Pune Municipal Finance & Civic Transparency Portal';
  }
  const item = getNavItem(normalized);
  if (!item) return 'JanDhan Insights — Pune Municipal Corporation';
  return `${item.label} | JanDhan Insights — Pune Municipal Corporation`;
}
