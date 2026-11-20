import React from 'react';
import { PUNE_MEDIA } from '../assets/puneAssets';
import { dataProvider } from '../services/dataProvider';
import { PuneLandmarkCarousel } from '../components/PuneLandmarkCarousel';
import {
  Landmark,
  Route,
  Droplets,
  ShieldCheck,
  Calculator,
  Layers,
  FolderKanban,
  ReceiptText,
  FileCheck2,
  BookOpen,
  ArrowRight,
  MapPinned,
  FileSignature,
  MessageSquareWarning,
  MessageSquarePlus,
  Trees,
  Building2,
  MapPin
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const summary = dataProvider.getPMCSummary();
  const metrics = dataProvider.getReconciliationMetrics();
  const slides = dataProvider.getLandmarkSlides();

  const navigate = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const photoFeatureCards = [
    {
      title: 'Municipal Budgets (FY 2022–27)',
      description:
        "Explore Pune's approved FY 2026-27 ₹15,669 Cr Standing Committee BE alongside historical accounts.",
      image: PUNE_MEDIA.agaKhanPalaceCard,
      alt: 'Aga Khan Palace historic stone colonnades and gardens in Pune, Maharashtra',
      targetPage: 'budget',
      caption: 'FY 2026-27 Approved BE · ₹15,669.00 Cr'
    },
    {
      title: 'Public Projects & Mobility',
      description: 'Track ₹1,800 Cr road works, 65 km new corridors, water schemes, and STPs across Pune.',
      image: PUNE_MEDIA.puneInfrastructureCard,
      alt: 'Modern civic bridge and urban corridor in Pune, Maharashtra',
      targetPage: 'roads-development',
      caption: 'FY 2026-27 Mobility Outlay · ₹1,800.00 Cr'
    },
    {
      title: 'Spending & Accountability',
      description: 'Inspect verified line items, double-count quarantines, and source citations.',
      image: PUNE_MEDIA.puneHeritageStreetCard,
      alt: 'Historic Deccan stone civic architecture and leafy avenue in Pune, Maharashtra',
      targetPage: 'records',
      caption: `${metrics.total} Reconciled Records (${metrics.verified} Verified)`
    }
  ];

  const greenPillars = [
    {
      icon: Landmark,
      title: 'Municipal Finance',
      summary:
        'FY 2026-27 Standing Committee BE (₹15,669 Cr) separated strictly from quarantined drafts and audited actuals.',
      targetPage: 'finances'
    },
    {
      icon: Route,
      title: 'Roads & Development',
      summary:
        '₹1,800 Cr urban mobility provision, 65 km missing links, ₹400 Cr land acquisition, and ₹85 Cr model footpaths.',
      targetPage: 'roads-development'
    },
    {
      icon: Droplets,
      title: 'Water & Sanitation',
      summary:
        '6 major Water Treatment Plants, 11 JICA Mula-Mutha STPs (396 MLD), and 2,400 TPD solid waste processing.',
      targetPage: 'water-sanitation'
    },
    {
      icon: Trees,
      title: 'Environment & Wards',
      summary:
        'PMC Environment Status Report metrics, 5.78 lakh+ recorded trees, and all 15 Ward Offices & 41 Prabhags.',
      targetPage: 'environment'
    }
  ];

  const onlineResources = [
    {
      icon: Calculator,
      title: 'Annual Budgets',
      subtitle: 'BE, RE & Actuals Tracker (FY 2022–27)',
      targetPage: 'budget'
    },
    {
      icon: Layers,
      title: 'Department Expenditure',
      subtitle: '20 PMC Municipal Departments',
      targetPage: 'departments'
    },
    {
      icon: MapPinned,
      title: 'Ward Explorer (15 · 41)',
      subtitle: '15 Ward Offices, 41 Prabhags & Comparison',
      targetPage: 'wards'
    },
    {
      icon: Droplets,
      title: 'Water & Sanitation',
      subtitle: '6 WTPs, 11 JICA STPs (396 MLD) & SWM',
      targetPage: 'water-sanitation'
    },
    {
      icon: Route,
      title: 'Roads & Development',
      subtitle: '65 km Missing Links, Footpaths & Mobility',
      targetPage: 'roads-development'
    },
    {
      icon: Building2,
      title: 'Public Facilities',
      subtitle: '96 Clinics, Schools, 20 Fire Stations & Parks',
      targetPage: 'public-facilities'
    },
    {
      icon: Trees,
      title: 'Environment Dashboard',
      subtitle: 'ESR Air, Mula-Mutha Water, Waste & Tree Census',
      targetPage: 'environment'
    },
    {
      icon: FolderKanban,
      title: 'Public Projects',
      subtitle: '8 Sanctioned Capital Works & Schemes',
      targetPage: 'projects'
    },
    {
      icon: ReceiptText,
      title: 'Spending Records',
      subtitle: `${metrics.total}-Record Audited & Quarantine Ledger`,
      targetPage: 'records'
    },
    {
      icon: FileCheck2,
      title: 'Audit & Verification',
      subtitle: 'Quarantine & Double-Count Controls',
      targetPage: 'sources'
    },
    {
      icon: FileSignature,
      title: 'Tenders & Contracts',
      subtitle: 'MahaTenders & Standing Committee Awards',
      targetPage: 'tenders'
    },
    {
      icon: MapPin,
      title: 'Loni Kalbhor (Rural)',
      subtitle: 'Haveli Taluka Gram Panchayat Intelligence',
      targetPage: 'loni-kalbhor'
    },
    {
      icon: BookOpen,
      title: 'Official Data Sources',
      subtitle: 'PMC Portal, OpenCity & Audited PDFs',
      targetPage: 'about'
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* 1. FULL-WIDTH ROTATING PUNE LANDMARK HERO CAROUSEL */}
      <PuneLandmarkCarousel
        slides={slides}
        latestBudgetCrores={summary.totalBudgetBE}
        latestFY={summary.latestFinancialYear}
        onNavigate={navigate}
      />

      {/* 1A. JURISDICTION SELECTOR BANNER */}
      <section className="bg-white border-b border-[#E5E0D5] py-5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-5 rounded-[8px] bg-[#FAF8F3] border border-[#E5E0D5] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0E7C74] block">
                Select Civic Jurisdiction
              </span>
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                Explore authenticated civic and financial transparency datasets
              </h2>
              <p className="text-xs text-[#5A6560]">
                Strict jurisdictional separation between urban municipal corporation data (PMC) and rural Gram Panchayat records (Loni Kalbhor).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigate('finances')}
                className="h-9 px-4 rounded-[6px] bg-[#133429] text-[#FAF8F3] hover:bg-[#0E2920] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Building2 className="w-3.5 h-3.5 text-[#E9A23B]" />
                <span>Pune Municipal Corporation (PMC)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('loni-kalbhor')}
                className="h-9 px-4 rounded-[6px] bg-white border border-[#0E7C74] text-[#0E7C74] hover:bg-[#E8F2EE] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E9A23B]" />
                <span>Loni Kalbhor (Gram Panchayat)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMAGE-BASED FEATURE SECTION (3 Rectangular Pune Photographic Cards) */}
      <section className="bg-[#FAF8F3] py-16 lg:py-20 border-b border-[#E5E0D5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E0D5] pb-5">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.14em] text-[#0E7C74] font-semibold block">
                Civic Intelligence Pillars
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#133429] tracking-tight">
                Public Money in Pune, Documented
              </h2>
            </div>
            <p className="text-sm text-[#5A6560] max-w-md leading-relaxed">
              Every rupee tracked exclusively within Pune Municipal Corporation (PMC) accounts and verified official publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {photoFeatureCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.targetPage)}
                className="group relative aspect-[4/3] w-full rounded-[6px] overflow-hidden border border-[#E5E0D5] bg-[#133429] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#133429]"
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0E2920]/95 via-[#0E2920]/45 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                  <div className="text-[11px] font-mono tabular-nums tracking-wide text-[#D3DFD9]">
                    {card.caption}
                  </div>
                  <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-[#FAF8F3] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-[#E6ECE9] leading-relaxed">
                    {card.description}
                  </p>
                  <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[#FAF8F3] group-hover:translate-x-1 transition-transform duration-150">
                    <span>Open Section</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5CC2BA]" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DEEP FOREST-GREEN FEATURE SECTION */}
      <section className="bg-[#133429] text-[#FAF8F3] py-16 lg:py-24 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex items-center gap-4 text-[#FAF8F3]/20"
        >
          <div className="h-px flex-1 bg-white/15" />
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path
              d="M2 15C2 9 9 4 16 1C23 4 30 9 30 15"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FAF8F3] tracking-tight text-balance">
              Building a More Transparent Pune
            </h2>
            <p className="text-base sm:text-lg text-[#D3DFD9] leading-relaxed">
              Public finances and city infrastructure should be clear, verifiable, and understandable to every citizen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {greenPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.title}
                  type="button"
                  onClick={() => navigate(pillar.targetPage)}
                  className="group text-left p-6 rounded-[6px] border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-200 flex flex-col justify-between gap-6 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-[6px] border border-white/15 bg-white/[0.06] flex items-center justify-center text-[#5CC2BA]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#FAF8F3]">
                      {pillar.title}
                    </h3>
                    <p className="text-[13px] text-[#BFD0C8] leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FAF8F3] group-hover:translate-x-1 transition-transform duration-150">
                    <span>View Data</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5CC2BA]" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. EXPLORE ONLINE RESOURCES SECTION (Clean White) */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#E5E0D5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.14em] text-[#0E7C74] font-semibold block">
              Citizen Information Directory
            </span>
            <h2 className="font-serif text-3xl sm:text-[34px] font-semibold text-[#133429] tracking-tight text-balance">
              Explore Municipal Finance &amp; Civic Portals
            </h2>
            <p className="text-sm text-[#5A6560] leading-relaxed">
              Direct access to Pune Municipal Corporation budgets, departmental accounts, all 41 Prabhags, water &amp; sanitation infrastructure, roads, public facilities, and environment indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {onlineResources.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => navigate(item.targetPage)}
                  className="group text-left p-5 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3]/60 hover:bg-white hover:border-[#133429]/35 transition-all duration-150 flex items-start gap-4 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-[6px] bg-[#E8F2EE] text-[#133429] flex items-center justify-center shrink-0 group-hover:bg-[#133429] group-hover:text-[#FAF8F3] transition-colors duration-150">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h3 className="font-serif text-[16px] font-semibold text-[#133429] group-hover:text-[#0E7C74] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5A6560] leading-relaxed">{item.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Citizen Action Desk Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs text-[#5A6560]">
            <button
              type="button"
              onClick={() => navigate('complaints')}
              className="inline-flex items-center gap-1.5 font-semibold text-[#133429] hover:text-[#0E7C74] transition-colors cursor-pointer"
            >
              <MessageSquareWarning className="w-3.5 h-3.5 text-[#0E7C74]" />
              <span>Civic Complaints Guidance (PMC CARE)</span>
            </button>
            <span aria-hidden="true" className="text-[#E5E0D5]">|</span>
            <button
              type="button"
              onClick={() => navigate('feedback')}
              className="inline-flex items-center gap-1.5 font-semibold text-[#133429] hover:text-[#0E7C74] transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#0E7C74]" />
              <span>Citizen Feedback &amp; Data Corrections</span>
            </button>
            <span aria-hidden="true" className="text-[#E5E0D5]">|</span>
            <button
              type="button"
              onClick={() => navigate('sources')}
              className="inline-flex items-center gap-1.5 font-semibold text-[#133429] hover:text-[#0E7C74] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0E7C74]" />
              <span>Audit &amp; Quarantine Standards</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED PUNE KEY FIGURES LEDGER STRIP (Warm Ivory) */}
      <section className="bg-[#FAF8F3] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-semibold text-[#133429]">
                Verified PMC Financial Snapshot
              </h2>
              <p className="text-xs text-[#5A6560]">
                Official figures extracted strictly from PMC budget books and audited annual statements.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('finances')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors cursor-pointer shrink-0"
            >
              <span>Open Complete Financial Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <span className="text-xs text-[#5A6560] block">FY 2026-27 Approved Budget (BE)</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
                ₹{summary.totalBudgetBE.toLocaleString('en-IN')} Cr
              </span>
              <span className="text-[11px] text-[#0E7C74] block">
                Standing Committee Final · +24.2% vs FY 25-26 (₹12,618.09 Cr)
              </span>
            </div>

            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <span className="text-xs text-[#5A6560] block">FY 2023-24 Audited Actual Spend</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block">
                ₹{summary.auditedActualExpenditure.toLocaleString('en-IN')} Cr
              </span>
              <span className="text-[11px] text-[#5A6560] block">
                85.4% utilization of ₹9,515 Cr BE · Audited Accounts
              </span>
            </div>

            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <span className="text-xs text-[#5A6560] block">Property Tax Collections &amp; Target</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
                ₹2,360.00 Cr
              </span>
              <span className="text-[11px] text-[#5A6560] block">
                FY 24-25 Actual · FY 26-27 Target: ₹3,152 Cr
              </span>
            </div>

            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <span className="text-xs text-[#5A6560] block">Administrative Jurisdiction</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
                {summary.wardOfficesCount} Wards · {summary.prabhagsCount} Prabhags
              </span>
              <span className="text-[11px] text-[#5A6560] block">
                Excludes PCMC, Cantonments &amp; PMRDA
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
