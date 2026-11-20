import React, { useState, useMemo } from 'react';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise } from '../utils/formatters';
import { VerificationBadge } from '../components/VerificationBadge';
import { Route, ExternalLink, Search, X, AlertTriangle, Bus } from 'lucide-react';

export const RoadsDevelopmentPage: React.FC = () => {
  const items = dataProvider.getRoadsDevelopmentItems();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const types = [
    'All',
    'Arterial & Missing Links',
    'Flyover & Grade Separator',
    'Footpath & Land Acquisition',
    'Mobility & Transit'
  ];

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (selectedType !== 'All' && item.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.title.toLowerCase().includes(q) ||
          item.wardOrCorridor.toLowerCase().includes(q) ||
          item.notes.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, selectedType, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Roads & Mobility KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            FY 2026-27 Mobility &amp; Roads BE
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
            ₹1,800.00 crore
          </span>
          <span className="text-xs text-[#5A6560] block">
            ~65 km new roads, missing links &amp; flyovers
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            FY 2026-27 Land Acquisition
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block">
            ₹400.00 crore
          </span>
          <span className="text-xs text-[#5A6560] block">
            Doubled from ₹200 Cr (FY 25-26) + ₹85 Cr Footpaths
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            PMPML Bus Share (FY 25-26)
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
            ₹508.07 crore
          </span>
          <span className="text-xs text-[#5A6560] block">
            PMC 60% VGF + concessions (PCMC excluded)
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#B45309] block">
            Ward-Wise Road Lane-Km Spend
          </span>
          <span className="text-xl font-bold font-mono text-[#B45309] block">
            Data Not Available
          </span>
          <span className="text-xs text-[#5A6560] block">
            FY 24-25 ₹1,420 Cr sub-head quarantined
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] space-y-3">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px]">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedType(t)}
              className={`h-8 px-3 rounded-[4px] text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedType === t
                  ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              {t === 'All' ? `All Initiatives (${items.length})` : t}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search road corridors, Sinhagad flyover, footpaths, land acquisition, PMPML..."
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

      {/* Roads & Mobility Cards */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white p-6 rounded-[6px] border space-y-3 ${
              item.verificationBadge === 'Under Review' ? 'border-[#B45309]/35' : 'border-[#E5E0D5]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-[#0E7C74]">FY {item.financialYear}</span>
                  <span className="text-[#D4CEC2]">·</span>
                  <span className="font-medium text-[#133429]">{item.type}</span>
                  <span className="text-[#D4CEC2]">·</span>
                  <VerificationBadge status={item.verificationBadge} />
                </div>
                <h3 className="font-serif text-base font-semibold text-[#133429] flex items-start gap-2">
                  <Route className="w-4 h-4 text-[#0E7C74] shrink-0 mt-1" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs text-[#5A6560]">
                  <strong>Corridor / Ward:</strong> {item.wardOrCorridor} ·{' '}
                  <strong>Department:</strong> {item.department}
                </p>
              </div>

              <div className="text-left md:text-right shrink-0">
                <span className="text-[11px] text-[#5A6560] block">{item.budgetStage}</span>
                <span className="text-lg font-mono tabular-nums font-bold text-[#133429] block">
                  {item.sanctionedOrBudgetedCrores !== null
                    ? formatCroresPrecise(item.sanctionedOrBudgetedCrores)
                    : 'Data Not Available'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#1C2422] leading-relaxed">{item.notes}</p>

            <div className="pt-3 border-t border-[#E5E0D5] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A6560]">
              <span>
                <strong>Status:</strong> {item.status} · {item.timelineNote}
              </span>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
              >
                <span>{item.sourceTitle}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Metro & Jurisdiction Boundary Clarification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#133429]">
            <Bus className="w-4 h-4 text-[#0E7C74]" />
            <span>Pune Metro &amp; PMRDA Mobility Boundary Note</span>
          </div>
          <p className="text-xs text-[#5A6560] leading-relaxed">
            Pune Metro Lines 1 &amp; 2 (MahaMetro) and Line 3 (PMRDA) are executed by separate SPVs rather than directly on PMC&apos;s annual municipal ledger. PMC coordinates station feeder footpaths, stormwater connections, and PMPML last-mile bus links inside PMC limits.
          </p>
        </div>

        <div className="bg-[#B45309]/[0.07] border border-[#B45309]/25 p-5 rounded-[6px] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309]">
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
            <span>Why FY 2024-25 ₹1,420 Cr Road Sub-head Is Quarantined</span>
          </div>
          <p className="text-xs text-[#1C2422] leading-relaxed">
            Summing the ₹1,420 Cr sub-head alongside the ₹11,601 Cr consolidated FY 2024-25 budget would inflate municipal spending totals. It remains visible for inspection under <strong>Under Review</strong> without inflating aggregates.
          </p>
        </div>
      </div>
    </div>
  );
};
