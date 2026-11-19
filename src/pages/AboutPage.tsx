import React from 'react';
import { PUNE_MEDIA } from '../assets/puneAssets';
import { dataProvider } from '../services/dataProvider';
import { ArrowRight, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const sources = dataProvider.getSourceRegistry();
  const metrics = dataProvider.getReconciliationMetrics();

  return (
    <div className="animate-fadeIn">
      {/* Editorial Header Band */}
      <section className="bg-white border-b border-[#E5E0D5] py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase tracking-[0.14em] text-[#0E7C74] font-semibold block">
              About JanDhan Insights
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#133429] tracking-tight text-balance">
              Making Pune&apos;s Municipal Accounts Readable, Verifiable, and Honest
            </h1>
            <p className="text-base text-[#5A6560] leading-relaxed max-w-2xl">
              JanDhan Insights is an independent civic transparency portal focused exclusively on the{' '}
              <strong className="text-[#1C2422] font-semibold">
                Pune Municipal Corporation (PMC)
              </strong>
              . Municipal budget books span hundreds of pages of accounting codes, draft proposals, revised estimates, and balance-sheet notes. Our goal is to structure those official records so citizens, journalists, and researchers can inspect every figure with its primary source document.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('finances')}
                className="h-10 px-5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Open Financial Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('sources')}
                className="h-10 px-5 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-[#133429] text-xs font-semibold transition-colors cursor-pointer"
              >
                Inspect Audit Report ({metrics.total} Records)
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[6px] overflow-hidden border border-[#E5E0D5] bg-[#FAF8F3]">
              <img
                src={PUNE_MEDIA.puneHeritageStreetCard}
                alt="Historic Pune municipal stone facade and street"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="px-4 py-3 text-xs text-[#5A6560] font-serif italic border-t border-[#E5E0D5]">
                Historic Deccan basalt municipal architecture in Pune, Maharashtra.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Transparency Commitments */}
      <section className="bg-[#FAF8F3] py-14 border-b border-[#E5E0D5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-[#133429]">
              Editorial &amp; Accounting Principles
            </h2>
            <p className="text-sm text-[#5A6560]">
              Strict verification standards govern every number displayed across the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-2.5">
              <div className="flex items-center gap-2 text-[#0E7C74] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>PMC Boundary Isolation</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#133429]">
                Pune Municipal Corporation Only
              </h3>
              <p className="text-xs text-[#5A6560] leading-relaxed">
                Covers PMC&apos;s 15 Regional Ward Offices and 41 Prabhags exclusively. Pimpri-Chinchwad (PCMC), Pune Cantonment Board, Khadki Cantonment Board, and non-PMC PMRDA entities are strictly excluded.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-2.5">
              <div className="flex items-center gap-2 text-[#0E7C74] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Stage &amp; Stock Separation</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#133429]">
                No Double-Counting
              </h3>
              <p className="text-xs text-[#5A6560] leading-relaxed">
                {metrics.review} records—including 7 FY 2024-25 departmental sub-heads, subsumed draft budgets, subsumed revenue components, balance-sheet stocks, and bond debt—are quarantined from aggregate totals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-2.5">
              <div className="flex items-center gap-2 text-[#B45309] text-xs font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>Zero Fabrication Policy</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#133429]">
                Honest Missing Disclosures
              </h3>
              <p className="text-xs text-[#5A6560] leading-relaxed">
                Where PMC has not published ward-wise budgets, FY 2024-25/25-26 audited actuals, contractor AOCs, or completion dates, fields display <strong>Data Not Available</strong> rather than guesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Official Sources Summary */}
      <section className="bg-white py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#133429]">
                Primary Official Data Sources ({sources.length})
              </h2>
              <p className="text-xs text-[#5A6560] mt-1">
                Every record links back to published PMC, OpenCity, or Maharashtra e-Procurement documentation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('sources')}
              className="text-xs font-semibold text-[#0E7C74] hover:text-[#133429] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Full Audit &amp; Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#E5E0D5] border border-[#E5E0D5] rounded-[6px] overflow-hidden">
            {sources.map((src) => (
              <div
                key={src.id}
                className="p-5 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs text-[#0E7C74] font-semibold">
                    {src.publisher} · FY {src.financial_years_covered}
                  </div>
                  <h3 className="text-sm font-semibold text-[#1C2422]">{src.document_title}</h3>
                  <p className="text-xs text-[#5A6560]">{src.known_limitations}</p>
                </div>
                <a
                  href={src.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3.5 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] inline-flex items-center gap-1.5 shrink-0 self-start md:self-center"
                >
                  <span>Official Link</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0E7C74]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
