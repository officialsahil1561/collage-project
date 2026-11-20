import React, { useState, useMemo } from 'react';
import { dataProvider } from '../services/dataProvider';
import { VerificationBadge } from '../components/VerificationBadge';
import { Building2, ExternalLink, Search, X, MapPin, AlertCircle } from 'lucide-react';

export const PublicFacilitiesPage: React.FC = () => {
  const facilities = dataProvider.getPublicFacilityCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...facilities.map((f) => f.category)];

  const filtered = useMemo(() => {
    return facilities.filter((f) => {
      if (selectedCategory !== 'All' && f.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          f.category.toLowerCase().includes(q) ||
          f.summary.toLowerCase().includes(q) ||
          f.notableLocations.some((loc) => loc.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [facilities, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Disclosure */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-base font-semibold text-[#133429]">
            PMC Public Facilities Explorer (Hospitals, Schools, Gardens, Fire Stations &amp; Toilets)
          </h2>
          <p className="text-xs text-[#5A6560] leading-relaxed">
            Inspect verified municipal civic facilities across Pune Municipal Corporation. Where PMC has not exported ward-by-ward asset counts or live facility audits, fields display <strong>Estimated</strong> or <strong>Unavailable</strong> rather than fabricating numbers.
          </p>
        </div>

        <a
          href="https://www.pmc.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-3.5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 self-start lg:self-auto"
        >
          <span>PMC Facilities Directory</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Category Filter & Search */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] space-y-3">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-8 px-3 rounded-[4px] text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              {cat === 'All' ? `All Facilities (${facilities.length})` : cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Kamla Nehru, Arogyavardhini, Saras Baug, fire station, schools..."
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

      {/* Facility Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((fac) => (
          <div
            key={fac.id}
            className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-[#0E7C74]">{fac.department}</span>
                <VerificationBadge status={fac.verificationBadge} />
              </div>

              <h3 className="font-serif text-lg font-semibold text-[#133429] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0E7C74] shrink-0" />
                <span>{fac.category}</span>
              </h3>

              <div className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5]">
                <span className="text-[11px] text-[#5A6560] block">Documented Capacity / Scale</span>
                <span className="text-sm font-mono font-bold text-[#133429] block mt-0.5">
                  {fac.documentedCountLabel}
                </span>
              </div>

              <p className="text-xs text-[#1C2422] leading-relaxed">{fac.summary}</p>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-[#5A6560] block">
                  Notable PMC Locations &amp; Assets:
                </span>
                <ul className="space-y-1 text-xs text-[#1C2422]">
                  {fac.notableLocations.map((loc) => (
                    <li key={loc} className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0E7C74] shrink-0 mt-0.5" />
                      <span>{loc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-[6px] bg-[#B45309]/[0.06] border border-[#B45309]/20 flex items-start gap-2 text-[11px] text-[#1C2422]">
                <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <span>{fac.dataGapNote}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between text-xs">
              <span className="text-[#5A6560] truncate max-w-[240px]">{fac.sourceTitle}</span>
              <a
                href={fac.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
