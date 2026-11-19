import React from 'react';
import { ReconciledRecord } from '../types';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise, formatPrintedWithUnit } from '../utils/formatters';
import {
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  TrendingUp,
  Scale,
  Landmark
} from 'lucide-react';

interface RevenueExpenditurePageProps {
  onSelectRecord: (record: ReconciledRecord) => void;
}

export const RevenueExpenditurePage: React.FC<RevenueExpenditurePageProps> = ({
  onSelectRecord
}) => {
  const verified = dataProvider.getVerifiedRecords();
  const review = dataProvider.getReviewRecords();

  const revenueRecords = verified.filter((r) => r.domain === 'revenue');
  const expenditureRecords = verified.filter((r) => r.domain === 'expenditure');
  const liabilityAndSubsumed = review.filter(
    (r) => r.domain === 'liability' || r.domain === 'revenue'
  );

  const unavailableRevenueHeads = [
    {
      head: 'Advertisement & Sky-Sign License Fees',
      status: 'Data Not Available',
      note: 'Bundled inside consolidated Non-Tax Revenue in audited summaries; standalone FY 2025-26 PDF schedule extraction pending.'
    },
    {
      head: 'Pay-and-Park / Municipal Parking Fees',
      status: 'Data Not Available',
      note: 'Not itemized as a separate audited revenue stream in PMC summary financial statements.'
    },
    {
      head: 'Solid Waste User Charges (Standalone Actuals)',
      status: 'Data Not Available',
      note: 'Collected partly alongside Property Tax bills; standalone collection reconciliation unavailable.'
    },
    {
      head: 'Municipal Markets & Rent Receipts',
      status: 'Data Not Available',
      note: 'Consolidated under miscellaneous property/estate fees in audited income statements.'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Audited Fiscal Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Audited Revenue Receipts
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block">
            ₹11,206.84 crore
          </span>
          <span className="text-xs text-[#5A6560] block">FY 2023-24 Audited Accounts</span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Audited Revenue Spend
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
            ₹5,910.59 crore
          </span>
          <span className="text-xs text-[#5A6560] block">FY 2023-24 (Total Actuals: ₹8,125.60 Cr)</span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Property Tax Actual (24-25)
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block">
            ₹2,360.00 crore
          </span>
          <span className="text-xs text-[#5A6560] block">FY 25-26 BE Target: ₹2,847.00 Cr</span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#B45309] block">
            Balance Sheet &amp; Bond Debt
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
            ₹52,698.00 crore
          </span>
          <span className="text-xs text-[#5A6560] block">Stock Metric · BSE Bond: ₹200.00 Cr</span>
        </div>
      </div>

      {/* Verified Municipal Revenue Streams */}
      <section className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E0D5] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-[#0E7C74] shrink-0" />
            <div>
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                PMC Revenue Streams (Audited Receipts &amp; FY 2025-26 Targets)
              </h2>
              <p className="text-xs text-[#5A6560]">
                Strictly distinguishes audited annual actual collections from forward BE targets
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-[#0E7C74] shrink-0">
            {revenueRecords.length} Verified Records
          </span>
        </div>

        <div className="divide-y divide-[#E5E0D5]">
          {revenueRecords.map((rec) => (
            <button
              key={rec.unique_id}
              type="button"
              onClick={() => onSelectRecord(rec)}
              className="w-full text-left px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF8F3] transition-colors cursor-pointer"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-[#0E7C74]">{rec.unique_id}</span>
                  <span className="text-[#D4CEC2]">·</span>
                  <span className="font-medium text-[#133429]">{rec.source_classification}</span>
                  <span className="text-[#D4CEC2]">·</span>
                  <span className="font-mono text-[#5A6560]">FY {rec.financial_year}</span>
                </div>
                <div className="text-[13px] font-semibold text-[#1C2422]">
                  {rec.record_or_project_name}
                </div>
                <div className="text-xs text-[#5A6560]">{rec.extraction_note}</div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="text-base font-mono tabular-nums font-bold text-[#133429]">
                  {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0E7C74]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{rec.record_type}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Two-Column Grid: Expenditure Splits + Balance Sheet/Liabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verified Expenditure Records */}
        <section className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E0D5] flex items-center gap-2.5">
            <Scale className="w-4 h-4 text-[#0E7C74] shrink-0" />
            <div>
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                Revenue vs Capital Expenditure Splits
              </h2>
              <p className="text-xs text-[#5A6560]">
                Audited historical outflows &amp; FY 2025-26 proposed capital/revenue shares
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#E5E0D5]">
            {expenditureRecords.map((rec) => (
              <button
                key={rec.unique_id}
                type="button"
                onClick={() => onSelectRecord(rec)}
                className="w-full text-left px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-[#FAF8F3] transition-colors cursor-pointer"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="text-[13px] font-semibold text-[#1C2422]">
                    {rec.record_or_project_name}
                  </div>
                  <div className="text-xs text-[#5A6560]">
                    {rec.source_classification} · FY {rec.financial_year}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-mono tabular-nums font-bold text-[#133429]">
                    {formatCroresPrecise(rec.amount_in_crores)}
                  </div>
                  <div className="text-[11px] text-[#0E7C74]">{rec.financial_category}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Balance Sheet Stock & Subsumed Component Isolation */}
        <section className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-[#E5E0D5] flex items-center gap-2.5">
              <Landmark className="w-4 h-4 text-[#D97706] shrink-0" />
              <div>
                <h2 className="font-serif text-base font-semibold text-[#133429]">
                  Assets, Debt &amp; Isolated Components
                </h2>
                <p className="text-xs text-[#5A6560]">
                  Stock measures &amp; subsumed revenue lines isolated from annual flow totals
                </p>
              </div>
            </div>

            <div className="divide-y divide-[#E5E0D5]">
              {liabilityAndSubsumed.map((rec) => (
                <button
                  key={rec.unique_id}
                  type="button"
                  onClick={() => onSelectRecord(rec)}
                  className="w-full text-left px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-[#FAF8F3] transition-colors cursor-pointer"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="text-[13px] font-semibold text-[#1C2422]">
                      {rec.record_or_project_name}
                    </div>
                    <div className="text-[11px] text-[#B45309]">
                      {rec.verification_status} · {rec.exclusion_reason}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-mono tabular-nums font-bold text-[#133429]">
                      {formatCroresPrecise(rec.amount_in_crores)}
                    </div>
                    <div className="text-[11px] text-[#5A6560]">FY {rec.financial_year}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-3 bg-[#FAF8F3] border-t border-[#E5E0D5] flex items-center justify-between text-xs text-[#5A6560]">
            <span>Source: PMC Audited Financial Statements PDF</span>
            <a
              href="https://opendata.pmc.gov.in/opendata/6f5d15dd-7fd3-4b53-8a01-f85a00848952.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
            >
              <span>Audited PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>
      </div>

      {/* Explicit Disclosure of Unavailable Granular Revenue Heads */}
      <section className="bg-white rounded-[6px] border border-[#E5E0D5] p-6 space-y-4">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <div>
            <h2 className="font-serif text-base font-semibold text-[#133429]">
              Non-Tax Revenue Heads Not Separately Tabulated (Data Not Available)
            </h2>
            <p className="text-xs text-[#5A6560] mt-0.5">
              Rather than estimating or inventing sub-head revenue collections, JanDhan Insights explicitly discloses heads not published individually in audited summary statements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {unavailableRevenueHeads.map((item) => (
            <div
              key={item.head}
              className="p-3.5 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#1C2422]">{item.head}</span>
                <span className="text-[11px] font-mono font-semibold text-[#B45309] shrink-0">
                  {item.status}
                </span>
              </div>
              <p className="text-[11px] text-[#5A6560] leading-relaxed">{item.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
