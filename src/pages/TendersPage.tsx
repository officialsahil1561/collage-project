import React, { useState } from 'react';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise } from '../utils/formatters';
import {
  FileSignature,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Search,
  X
} from 'lucide-react';

export const TendersPage: React.FC = () => {
  const tenders = dataProvider.getTenders();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenders = tenders.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      t.title.toLowerCase().includes(q) ||
      t.department.toLowerCase().includes(q) ||
      t.tenderRef.toLowerCase().includes(q) ||
      (t.contractor && t.contractor.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & MahaTenders Guidance */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-base font-semibold text-[#133429]">
            PMC Tenders, Contracts &amp; Procurement Disclosure
          </h2>
          <p className="text-xs text-[#5A6560] leading-relaxed">
            Displays verified major PMC contracts alongside direct linkage to Maharashtra e-Procurement (MahaTenders). Contractor names, awarded values, and completion certificates not published in static budget tables are explicitly marked{' '}
            <strong className="text-[#1C2422]">Data Not Available</strong>.
          </p>
        </div>

        <a
          href="https://mahatenders.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-4 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 self-start lg:self-auto"
        >
          <span>Search Live PMC Tenders on MahaTenders</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tenders by title, department, contractor (e.g., L&T, JICA, Flyover)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] pl-9 pr-8 text-xs text-[#1C2422] placeholder-[#5A6560] focus:outline-hidden focus:border-[#0E7C74] focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A6560] hover:text-[#1C2422] cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tenders List */}
      <div className="space-y-4">
        {filteredTenders.map((tnd) => (
          <div
            key={tnd.id}
            className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-[#0E7C74]">{tnd.tenderRef}</span>
                  <span className="text-[#D4CEC2]">·</span>
                  <span className="font-medium text-[#133429]">{tnd.department}</span>
                  <span className="text-[#D4CEC2]">·</span>
                  <span className="inline-flex items-center gap-1 text-[#0E7C74] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{tnd.contractStatus}</span>
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#133429] flex items-start gap-2">
                  <FileSignature className="w-4 h-4 text-[#0E7C74] shrink-0 mt-1" />
                  <span>{tnd.title}</span>
                </h3>
                <p className="text-xs text-[#5A6560] leading-relaxed">{tnd.workDescription}</p>
              </div>

              <a
                href={tnd.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3.5 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-[#E8F2EE] text-xs font-semibold text-[#0E7C74] hover:text-[#133429] inline-flex items-center gap-1.5 shrink-0 self-start"
              >
                <span>Verify Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#E5E0D5] text-xs">
              <div className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5]">
                <span className="text-[11px] text-[#5A6560] block">Estimated Cost</span>
                <span className="font-mono font-bold text-[#133429] block mt-0.5">
                  {tnd.estimatedCostCrores !== null
                    ? formatCroresPrecise(tnd.estimatedCostCrores)
                    : 'Data Not Available'}
                </span>
              </div>
              <div className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5]">
                <span className="text-[11px] text-[#5A6560] block">Awarded Contract Value</span>
                <span className="font-mono font-bold text-[#0E7C74] block mt-0.5">
                  {tnd.awardedAmountCrores !== null
                    ? formatCroresPrecise(tnd.awardedAmountCrores)
                    : 'Data Not Available'}
                </span>
              </div>
              <div className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5]">
                <span className="text-[11px] text-[#5A6560] block">Contractor / Agency</span>
                <span className="font-medium text-[#1C2422] block mt-0.5">
                  {tnd.contractor || 'Data Not Available'}
                </span>
              </div>
              <div className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5]">
                <span className="text-[11px] text-[#5A6560] block">Work Order &amp; Completion</span>
                <span className="font-medium text-[#1C2422] block mt-0.5">
                  {tnd.workOrderStatus}
                </span>
                <span className="text-[11px] text-[#5A6560] block">
                  {tnd.completionCertificateStatus}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#5A6560]">
              <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
              <span>{tnd.notes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
