import React, { useState, useMemo } from 'react';
import { dataProvider } from '../services/dataProvider';
import { Search, MapPinned, ExternalLink, AlertCircle, X } from 'lucide-react';

export const WardsPage: React.FC = () => {
  const wards = dataProvider.getWardOffices();
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [mergedFilter, setMergedFilter] = useState<'all' | 'merged'>('all');

  const zones = ['All', 'Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];

  const filteredWards = useMemo(() => {
    return wards.filter((w) => {
      if (zoneFilter !== 'All' && w.zone !== zoneFilter) return false;
      if (mergedFilter === 'merged' && !w.includesMergedVillages) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          w.name.toLowerCase().includes(q) ||
          w.prabhagCoverage.toLowerCase().includes(q) ||
          w.keyLocalities.some((loc) => loc.toLowerCase().includes(q)) ||
          w.boundaryNote.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [wards, zoneFilter, mergedFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Jurisdiction & Transparency Disclosure */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-base font-semibold text-[#133429]">
              15 PMC Regional Ward Offices &amp; 41 Prabhags Explorer
            </h2>
            <p className="text-xs text-[#5A6560] mt-0.5">
              Strictly covers Pune Municipal Corporation limits (~520+ sq.km). Excludes Pimpri-Chinchwad (PCMC), Pune Cantonment, Khadki Cantonment, and PMRDA villages outside PMC.
            </p>
          </div>
          <a
            href="https://www.pmc.gov.in/en/ward-offices"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-3.5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 self-start md:self-auto"
          >
            <span>PMC Official Ward Directory</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="p-3.5 rounded-[6px] bg-[#B45309]/[0.07] border border-[#B45309]/25 flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <p className="text-[#1C2422] leading-relaxed">
            <strong className="text-[#B45309]">Ward Budget Transparency Disclosure:</strong> PMC does not publish machine-readable ward-wise actual expenditure tables in CSV/JSON format. Ward expenditure fields are therefore truthfully marked <strong>Data Not Available</strong> instead of fabricating estimates. Merged-village works are consolidated centrally under PMC_202526_DEP_016 (₹623.00 Cr).
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search locality (e.g. Kothrud, Kharadi, Hadapsar, Kasba, Baner, Prabhag)..."
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

        <select
          aria-label="Filter by Zone"
          value={zoneFilter}
          onChange={(e) => setZoneFilter(e.target.value)}
          className="h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] px-3 text-xs font-semibold text-[#1C2422] focus:outline-hidden focus:border-[#0E7C74] cursor-pointer"
        >
          {zones.map((z) => (
            <option key={z} value={z}>
              {z === 'All' ? 'All 5 Administrative Zones' : z}
            </option>
          ))}
        </select>

        <div className="flex items-center h-9 gap-0.5 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] shrink-0">
          <button
            type="button"
            onClick={() => setMergedFilter('all')}
            className={`h-7 px-3 rounded-[4px] text-xs cursor-pointer ${
              mergedFilter === 'all'
                ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                : 'text-[#5A6560] hover:text-[#133429]'
            }`}
          >
            All Wards (15)
          </button>
          <button
            type="button"
            onClick={() => setMergedFilter('merged')}
            className={`h-7 px-3 rounded-[4px] text-xs cursor-pointer ${
              mergedFilter === 'merged'
                ? 'bg-[#0E7C74] text-white font-semibold'
                : 'text-[#5A6560] hover:text-[#133429]'
            }`}
          >
            Merged Villages Wards
          </button>
        </div>
      </div>

      {/* Ward Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredWards.map((ward) => (
          <div
            key={ward.id}
            className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] hover:border-[#0E7C74]/50 transition-all flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono font-semibold text-[#0E7C74]">
                  Ward #{String(ward.wardNumber).padStart(2, '0')} · {ward.zone}
                </span>
                <span className="text-[11px] font-medium text-[#5A6560]">
                  {ward.includesMergedVillages ? 'Includes Merged Villages' : 'Core PMC Area'}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-[#133429] leading-snug flex items-start gap-2">
                  <MapPinned className="w-4 h-4 text-[#0E7C74] shrink-0 mt-0.5" />
                  <span>{ward.name}</span>
                </h3>
                <p className="text-xs text-[#5A6560] mt-1 font-medium">{ward.prabhagCoverage}</p>
              </div>

              <div className="text-xs text-[#1C2422]">
                <span className="text-[11px] font-semibold text-[#5A6560] block mb-1">
                  Key Localities Covered:
                </span>
                <span>{ward.keyLocalities.join(' · ')}</span>
              </div>

              <p className="text-[11px] text-[#5A6560] leading-relaxed">{ward.boundaryNote}</p>

              <div className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] text-[11px] space-y-1">
                <span className="font-semibold text-[#B45309] block">
                  Ward-Wise Actual Spend: Data Not Available
                </span>
                <span className="text-[#5A6560] block">{ward.wardBudgetNote}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between text-xs">
              <a
                href={ward.complaintsPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5A6560] hover:text-[#133429] font-medium inline-flex items-center gap-1"
              >
                <span>Grievance Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={ward.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7C74] hover:text-[#133429] font-semibold inline-flex items-center gap-1"
              >
                <span>Ward Office Info</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
