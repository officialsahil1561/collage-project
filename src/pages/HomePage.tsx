import React from 'react';
import { PUNE_MEDIA } from '../assets/puneAssets';
import { dataProvider } from '../services/dataProvider';
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
  FileSignature
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const summary = dataProvider.getPMCSummary();

  const navigate = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const photoFeatureCards = [
    {
      title: 'Municipal Budgets',
      description: "Explore Pune's annual budgets and financial allocations.",
      image: PUNE_MEDIA.agaKhanPalaceCard,
      alt: 'Aga Khan Palace historic stone colonnades and gardens in Pune, Maharashtra',
      targetPage: 'budget',
      caption: 'FY 2025-26 Outlay · ₹12,618.09 Cr BE'
    },
    {
      title: 'Public Projects',
      description: 'Discover civic infrastructure projects across Pune.',
      image: PUNE_MEDIA.puneInfrastructureCard,
      alt: 'Modern civic bridge and urban corridor in Pune, Maharashtra',
      targetPage: 'projects',
      caption: '8 Documented Infrastructure Schemes'
    },
    {
      title: 'Spending & Accountability',
      description: 'Understand public expenditure through financial records.',
      image: PUNE_MEDIA.puneHeritageStreetCard,
      alt: 'Historic Deccan stone civic architecture and leafy avenue in Pune, Maharashtra',
      targetPage: 'records',
      caption: '38 Reconciled & Quarantined Records'
    }
  ];

  const greenPillars = [
    {
      icon: Landmark,
      title: 'Municipal Finance',
      summary:
        'Annual Budget Estimates separated strictly from Revised Estimates and Audited Financial Statements.',
      targetPage: 'finances'
    },
    {
      icon: Route,
      title: 'Roads & Infrastructure',
      summary:
        'Multi-level flyovers, riverfront embankments, and merged-village road allocations across Pune.',
      targetPage: 'projects'
    },
    {
      icon: Droplets,
      title: 'Water & Public Services',
      summary:
        '24x7 equitable water schemes, JICA sewage treatment plants, municipal hospitals, and 12 civic sectors.',
      targetPage: 'infrastructure'
    },
    {
      icon: ShieldCheck,
      title: 'Public Accountability',
      summary:
        'Every figure linked to its primary PMC or OpenCity citation, with missing disclosures marked Data Not Available.',
      targetPage: 'records'
    }
  ];

  const onlineResources = [
    {
      icon: Calculator,
      title: 'Annual Budgets',
      subtitle: 'BE, RE & Actuals Tracker (FY 2022–26)',
      targetPage: 'budget'
    },
    {
      icon: Layers,
      title: 'Department Expenditure',
      subtitle: '20 PMC Municipal Departments',
      targetPage: 'departments'
    },
    {
      icon: FolderKanban,
      title: 'Public Projects',
      subtitle: 'Roads, Water, STPs, Hospitals & Schools',
      targetPage: 'projects'
    },
    {
      icon: ReceiptText,
      title: 'Spending Records',
      subtitle: '38-Record Audited & Review Ledger',
      targetPage: 'records'
    },
    {
      icon: FileCheck2,
      title: 'Audit & Verification',
      subtitle: 'Quarantine & Double-Count Controls',
      targetPage: 'sources'
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
      {/* 1. FULL-WIDTH PHOTOGRAPHIC HERO BANNER */}
      <section
        aria-label="Pune Municipal Corporation Public Finance Overview"
        className="relative w-full min-h-[520px] lg:min-h-[590px] flex items-center bg-[#0E2920] overflow-hidden"
      >
        <img
          src={PUNE_MEDIA.shaniwarWadaHero}
          alt="Shaniwar Wada fortification gateway (Dilli Darwaza) in Pune, Maharashtra"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Measured editorial dark scrim for >= 4.5:1 text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0E2920]/90 via-[#0E2920]/72 to-[#0E2920]/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0E2920]/65 to-transparent"
        />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl space-y-6">
            {/* Unboxed editorial metadata line (Zero pills) */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-[0.14em] text-[#D3DFD9] font-medium">
              <span>Pune Municipal Corporation</span>
              <span aria-hidden="true">·</span>
              <span>Maharashtra Civic Finance Portal</span>
            </div>

            <h1 className="font-serif text-[38px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.1] tracking-tight text-[#FAF8F3] text-balance">
              Understanding Where Pune&apos;s Money Goes
            </h1>

            <p className="text-base sm:text-lg text-[#E6ECE9] leading-relaxed max-w-xl font-normal">
              Explore municipal budgets, public spending and civic projects through transparent financial records.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => navigate('finances')}
                className="h-12 px-7 rounded-[6px] bg-[#FAF8F3] hover:bg-white text-[#133429] text-sm font-semibold inline-flex items-center gap-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition-all duration-150 cursor-pointer"
              >
                <span>Explore Municipal Finances</span>
                <ArrowRight className="w-4 h-4 text-[#0E7C74]" />
              </button>

              <button
                type="button"
                onClick={() => navigate('sources')}
                className="text-sm font-medium text-[#FAF8F3] hover:text-white underline underline-offset-4 decoration-[#FAF8F3]/50 hover:decoration-white transition-colors cursor-pointer"
              >
                Inspect Official Sources
              </button>
            </div>
          </div>
        </div>

        {/* Quiet bottom caption */}
        <div className="hidden sm:block absolute bottom-5 right-6 lg:right-10 z-10 text-xs text-[#E6ECE9]/85 tracking-wide">
          Shaniwar Wada, Pune · FY {summary.latestFinancialYear} Proposed Budget{' '}
          <span className="font-mono tabular-nums font-semibold text-white">
            ₹{summary.totalBudgetBE.toLocaleString('en-IN')} Cr
          </span>
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
                {/* Subtle measured overlay for crisp white editorial legibility */}
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
        {/* Subtle Maharashtra / Deccan geometric arch motif divider */}
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
              Public finances should be understandable to everyone.
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
              Explore Municipal Financial Resources
            </h2>
            <p className="text-sm text-[#5A6560] leading-relaxed">
              Direct access to Pune Municipal Corporation budgets, departmental accounts, ward directories, tenders, and source documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlineResources.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => navigate(item.targetPage)}
                  className="group text-left p-6 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3]/60 hover:bg-white hover:border-[#133429]/35 transition-all duration-150 flex items-start gap-4 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-[6px] bg-[#E8F2EE] text-[#133429] flex items-center justify-center shrink-0 group-hover:bg-[#133429] group-hover:text-[#FAF8F3] transition-colors duration-150">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h3 className="font-serif text-[17px] font-semibold text-[#133429] group-hover:text-[#0E7C74] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5A6560] leading-relaxed">{item.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Secondary Civic Portals Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5A6560]">
            <button
              type="button"
              onClick={() => navigate('wards')}
              className="inline-flex items-center gap-1.5 font-semibold text-[#133429] hover:text-[#0E7C74] transition-colors cursor-pointer"
            >
              <MapPinned className="w-3.5 h-3.5 text-[#0E7C74]" />
              <span>Explore 15 Regional Ward Offices &amp; 41 Prabhags</span>
            </button>
            <span aria-hidden="true" className="text-[#E5E0D5]">|</span>
            <button
              type="button"
              onClick={() => navigate('tenders')}
              className="inline-flex items-center gap-1.5 font-semibold text-[#133429] hover:text-[#0E7C74] transition-colors cursor-pointer"
            >
              <FileSignature className="w-3.5 h-3.5 text-[#0E7C74]" />
              <span>View Tenders &amp; MahaTenders Contracts</span>
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
              <span className="text-xs text-[#5A6560] block">FY 2025-26 Proposed Budget (BE)</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
                ₹{summary.totalBudgetBE.toLocaleString('en-IN')} Cr
              </span>
              <span className="text-[11px] text-[#0E7C74] block">
                ₹7,093 Cr Revenue · ₹5,524 Cr Capital
              </span>
            </div>

            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <span className="text-xs text-[#5A6560] block">FY 2023-24 Audited Actual Spend</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block">
                ₹{summary.auditedActualExpenditure.toLocaleString('en-IN')} Cr
              </span>
              <span className="text-[11px] text-[#5A6560] block">
                85.4% of ₹9,515 Cr BE · Audited Accounts
              </span>
            </div>

            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <span className="text-xs text-[#5A6560] block">FY 2024-25 Property Tax Actual</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
                ₹2,360.00 Cr
              </span>
              <span className="text-[11px] text-[#5A6560] block">
                FY 2025-26 Budgeted Target: ₹2,847 Cr
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
