import React, { useState, useMemo } from 'react';
import { ReconciledRecord, Project } from '../types';
import { StatsCards } from '../components/StatsCards';
import { ChartsSection } from '../components/ChartsSection';
import { 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  SlidersHorizontal, 
  X, 
  Check, 
  CheckCircle2, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise, formatPrintedWithUnit } from '../utils/formatters';

interface OverviewPageProps {
  selectedAuthorityKey: string;
  setSelectedAuthorityKey: (key: string) => void;
  onSelectRecord: (record: ReconciledRecord) => void;
  onSelectProject: (project: Project) => void;
  setActiveTab: (tab: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  selectedAuthorityKey,
  setSelectedAuthorityKey,
  onSelectRecord,
  onSelectProject,
  setActiveTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Secondary filter state
  const [filterYear, setFilterYear] = useState<string>('All');
  const [filterSector, setFilterSector] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Draft filter state for the popover
  const [draftYear, setDraftYear] = useState<string>('All');
  const [draftSector, setDraftSector] = useState<string>('All');
  const [draftCategory, setDraftCategory] = useState<string>('All');

  const authoritySummary = dataProvider.getAuthoritySummary(selectedAuthorityKey);
  const authorityRecords = dataProvider.getFilteredRecords({
    authority: authoritySummary.authorityName,
    includeReview: false
  });

  const authoritiesList = [
    { key: 'pune-pmc', city: 'Pune', short: 'Pune (PMC)', fullName: 'Pune Municipal Corporation' },
    { key: 'mumbai-bmc', city: 'Mumbai', short: 'Mumbai (BMC)', fullName: 'Brihanmumbai Municipal Corporation' },
    { key: 'jaipur-greater', city: 'Jaipur', short: 'Jaipur Greater (JMC)', fullName: 'Greater Jaipur Municipal Corporation' },
    { key: 'jaipur-heritage', city: 'Jaipur', short: 'Jaipur Heritage (JMC)', fullName: 'Jaipur Heritage Municipal Corporation' }
  ];

  // Extract available filter values from current authority records
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(authorityRecords.map(r => r.financial_year)));
    return ['All', ...years.sort().reverse()];
  }, [authorityRecords]);

  const availableSectors = useMemo(() => {
    const sectors = Array.from(new Set(authorityRecords.map(r => r.department_or_sector)));
    return ['All', ...sectors.sort()];
  }, [authorityRecords]);

  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(authorityRecords.map(r => r.financial_category)));
    return ['All', ...cats.sort()];
  }, [authorityRecords]);

  // Count active filters
  const activeFiltersCount = (filterYear !== 'All' ? 1 : 0) + 
                             (filterSector !== 'All' ? 1 : 0) + 
                             (filterCategory !== 'All' ? 1 : 0);

  // Filter records
  const displayedRecords = useMemo(() => {
    return authorityRecords.filter(r => {
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesSearch = 
          r.record_or_project_name.toLowerCase().includes(q) ||
          r.department_or_sector.toLowerCase().includes(q) ||
          r.unique_id.toLowerCase().includes(q) ||
          r.document_title.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Year filter
      if (filterYear !== 'All' && r.financial_year !== filterYear) return false;

      // Sector filter
      if (filterSector !== 'All' && r.department_or_sector !== filterSector) return false;

      // Category filter
      if (filterCategory !== 'All' && r.financial_category !== filterCategory) return false;

      return true;
    });
  }, [authorityRecords, searchTerm, filterYear, filterSector, filterCategory]);

  const handleOpenFilters = () => {
    setDraftYear(filterYear);
    setDraftSector(filterSector);
    setDraftCategory(filterCategory);
    setIsFilterPanelOpen(prev => !prev);
  };

  const handleApplyFilters = () => {
    setFilterYear(draftYear);
    setFilterSector(draftSector);
    setFilterCategory(draftCategory);
    setIsFilterPanelOpen(false);
  };

  const handleClearAllFilters = () => {
    setFilterYear('All');
    setFilterSector('All');
    setFilterCategory('All');
    setDraftYear('All');
    setDraftSector('All');
    setDraftCategory('All');
    setIsFilterPanelOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto pb-12">
      
      {/* 1. Obvious Homepage Headline & Explorer Controls */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#142B3B]/10 shadow-xs relative">
        <div className="max-w-4xl space-y-5">
          
          {/* Integrity badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-semibold border border-[#0D9488]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audited Municipal Finance Explorer · 4 Separate Authorities</span>
          </div>
          
          {/* Exact Headline as specified */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142B3B] leading-tight">
              Where does your city's money go?
            </h1>
            <p className="text-[#142B3B]/70 text-base sm:text-lg mt-2">
              Explore municipal spending and public projects using official records.
            </p>
          </div>

          {/* 1. Clear City / Municipal Authority Selector */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#142B3B]/70 uppercase tracking-wider">
                Select City / Municipal Authority:
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Audited separately · Never merged
              </span>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {authoritiesList.map(auth => {
                const isSelected = selectedAuthorityKey === auth.key;
                const summary = dataProvider.getAuthoritySummary(auth.key);
                return (
                  <button
                    key={auth.key}
                    onClick={() => {
                      setSelectedAuthorityKey(auth.key);
                      // Reset secondary filters if authority changes
                      setFilterYear('All');
                      setFilterSector('All');
                      setFilterCategory('All');
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#0D9488]/10 border-[#0D9488] shadow-xs ring-1 ring-[#0D9488]'
                        : 'bg-[#F8F9F7] border-[#142B3B]/10 hover:border-[#0D9488]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-[#142B3B] truncate">{auth.short}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />}
                    </div>
                    <div className="text-[11px] font-mono font-bold text-[#0D9488]">
                      {summary.totalBudgetBE ? formatCroresPrecise(summary.totalBudgetBE) : (summary.auditedActuals ? `Act: ${formatCroresPrecise(summary.auditedActuals)}` : 'Review')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. One Prominent Search Bar with Compact "Filters" Action */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-2">
              
              {/* Search input with exact requested placeholder */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#0D9488] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search projects, roads, departments…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F8F9F7] border border-[#142B3B]/15 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-[#142B3B] placeholder-[#142B3B]/45 focus:outline-hidden focus:border-[#0D9488] focus:bg-white transition-all shadow-2xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Single "Filters" Button */}
              <button
                onClick={handleOpenFilters}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all shadow-2xs shrink-0 ${
                  isFilterPanelOpen || activeFiltersCount > 0
                    ? 'bg-[#142B3B] text-white border-[#142B3B]'
                    : 'bg-white text-[#142B3B] border-[#142B3B]/15 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#0D9488] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

            </div>

            {/* Active Filters as Small Removable Chips */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 font-medium mr-1">Active filters:</span>
                
                {filterYear !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#142B3B] text-xs font-medium border border-slate-200">
                    <span>FY: {filterYear}</span>
                    <button onClick={() => setFilterYear('All')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filterSector !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#142B3B] text-xs font-medium border border-slate-200">
                    <span>Sector: {filterSector}</span>
                    <button onClick={() => setFilterSector('All')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filterCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#142B3B] text-xs font-medium border border-slate-200">
                    <span>Type: {filterCategory}</span>
                    <button onClick={() => setFilterCategory('All')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleClearAllFilters}
                  className="text-[11px] font-bold text-[#0D9488] hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Compact Secondary Filters Popover / Panel */}
            {isFilterPanelOpen && (
              <div className="p-4 rounded-xl bg-slate-50 border border-[#142B3B]/15 space-y-4 animate-in fade-in-50 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#142B3B]/10">
                  <span className="text-xs font-bold text-[#142B3B]">Filter Records for {authoritySummary.authorityName}</span>
                  <button 
                    onClick={() => setIsFilterPanelOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Financial Year */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Financial Year
                    </label>
                    <select
                      value={draftYear}
                      onChange={(e) => setDraftYear(e.target.value)}
                      className="w-full bg-white border border-[#142B3B]/15 rounded-lg px-2.5 py-2 text-xs font-medium text-[#142B3B] focus:outline-hidden"
                    >
                      {availableYears.map(yr => (
                        <option key={yr} value={yr}>{yr === 'All' ? 'All Financial Years' : `FY ${yr}`}</option>
                      ))}
                    </select>
                  </div>

                  {/* Department / Sector */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Department / Sector
                    </label>
                    <select
                      value={draftSector}
                      onChange={(e) => setDraftSector(e.target.value)}
                      className="w-full bg-white border border-[#142B3B]/15 rounded-lg px-2.5 py-2 text-xs font-medium text-[#142B3B] focus:outline-hidden"
                    >
                      {availableSectors.map(sec => (
                        <option key={sec} value={sec}>{sec === 'All' ? 'All Departments' : sec}</option>
                      ))}
                    </select>
                  </div>

                  {/* Financial Category / Record Type */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Accounting Stage
                    </label>
                    <select
                      value={draftCategory}
                      onChange={(e) => setDraftCategory(e.target.value)}
                      className="w-full bg-white border border-[#142B3B]/15 rounded-lg px-2.5 py-2 text-xs font-medium text-[#142B3B] focus:outline-hidden"
                    >
                      {availableCategories.map(cat => (
                        <option key={cat} value={cat}>{cat === 'All' ? 'All Accounting Stages' : cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filter Actions: Apply and Clear all */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#142B3B]/10">
                  <button
                    onClick={handleClearAllFilters}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="px-4 py-1.5 rounded-lg bg-[#0D9488] hover:bg-[#0D9488]/90 text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply Filters</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 2. Three Simple Summary Cards: Budgeted, Actually spent, Public projects */}
      <StatsCards 
        summary={authoritySummary}
        onViewProjects={() => setActiveTab('projects')}
      />

      {/* 3. Department Allocations Chart (Only when valid aggregation data is present) */}
      <ChartsSection 
        authorityName={authoritySummary.authorityName}
        records={authorityRecords}
      />

      {/* 4. Active Verified Records Table for this Authority */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#142B3B]/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#142B3B]">
              Verified Records for {authoritySummary.authorityName}
            </h3>
            <p className="text-xs text-[#142B3B]/60">
              Showing {displayedRecords.length} verified record{displayedRecords.length === 1 ? '' : 's'} matching current criteria
            </p>
          </div>
          <button
            onClick={() => setActiveTab('spending')}
            className="text-xs font-bold text-[#0D9488] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore all 30 audited records in Spending</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {displayedRecords.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl space-y-2">
            {authoritySummary.authorityKey === 'jaipur-heritage' ? (
              <div className="space-y-1.5 max-w-md mx-auto">
                <AlertTriangle className="w-5 h-5 text-amber-600 mx-auto" />
                <div className="font-semibold text-slate-700">No active spending records published</div>
                <p className="leading-relaxed">
                  Jaipur Heritage Municipal Corporation only published an income & expenditure statutory deficit metric (₹42.15 Cr) in the sourced comparative report, which is quarantined in the review file.
                </p>
              </div>
            ) : (
              <span>No matching records found for "{searchTerm}". Try clearing active filters.</span>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#142B3B]/10 text-[#142B3B]/60 font-semibold">
                  <th className="py-2.5 px-3">Unique ID</th>
                  <th className="py-2.5 px-3">Record / Line Item</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">FY</th>
                  <th className="py-2.5 px-3 text-right">Amount Printed</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#142B3B]/5">
                {displayedRecords.map(rec => (
                  <tr key={rec.unique_id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#0D9488]">
                      {rec.unique_id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#142B3B]">{rec.record_or_project_name}</div>
                      <div className="text-[11px] text-slate-500">{rec.department_or_sector}</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700">
                      {rec.financial_category}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {rec.financial_year}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#142B3B]">
                      {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onSelectRecord(rec)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#0D9488] bg-[#0D9488]/10 hover:bg-[#0D9488]/20 rounded-md transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Provenance & Official Source Card */}
      <div className="bg-[#142B3B] text-white p-6 rounded-2xl shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488] block">
              Primary Sourced Document
            </span>
            <h4 className="text-base font-bold">{authoritySummary.accountingScope}</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              {authoritySummary.notes}
            </p>
          </div>
          <a
            href={authoritySummary.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white text-xs font-semibold rounded-xl transition-all shrink-0 self-start sm:self-auto"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
};
