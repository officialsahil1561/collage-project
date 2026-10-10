import React, { useState, useMemo } from 'react';
import { ReconciledRecord, MunicipalAuthority, FinancialCategory } from '../types';
import { formatCroresPrecise, formatNormalizedINR, formatPrintedWithUnit } from '../utils/formatters';
import { dataProvider } from '../services/dataProvider';
import { 
  Search, 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ArrowUpDown, 
  X, 
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SpendingPageProps {
  selectedAuthorityKey: string;
  setSelectedAuthorityKey: (key: string) => void;
  onSelectRecord: (record: ReconciledRecord) => void;
}

export const SpendingPage: React.FC<SpendingPageProps> = ({
  selectedAuthorityKey,
  setSelectedAuthorityKey,
  onSelectRecord
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState<'all' | 'verified' | 'review'>('all');
  
  // Secondary filters
  const [selectedAuthorityFilter, setSelectedAuthorityFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('All');

  // Draft filters for popover
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [draftAuthority, setDraftAuthority] = useState<string>('All');
  const [draftCategory, setDraftCategory] = useState<string>('All');
  const [draftYear, setDraftYear] = useState<string>('All');

  const [sortField, setSortField] = useState<'amount' | 'year' | 'id'>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const authorities: MunicipalAuthority[] = [
    'Pune Municipal Corporation',
    'Brihanmumbai Municipal Corporation',
    'Greater Jaipur Municipal Corporation',
    'Jaipur Heritage Municipal Corporation'
  ];

  const categories: FinancialCategory[] = [
    'Budget Estimates (BE)',
    'Revised Estimates (RE)',
    'Actual Expenditure',
    'Capital Expenditure',
    'Revenue Expenditure',
    'Revenue Receipts',
    'Balance Sheet Measure',
    'Deficit Metric'
  ];

  const financialYears = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22'];

  const allAudited = dataProvider.getAllAuditedRecords();
  
  // Active secondary filters count
  const activeFiltersCount = 
    (selectedAuthorityFilter !== 'All' ? 1 : 0) +
    (selectedCategoryFilter !== 'All' ? 1 : 0) +
    (selectedYearFilter !== 'All' ? 1 : 0);

  // Filter
  const filtered = useMemo(() => {
    return allAudited.filter(rec => {
      // Tab filter
      if (statusTab === 'verified' && rec.verification_status !== 'Verified') return false;
      if (statusTab === 'review' && rec.verification_status === 'Verified') return false;

      // Authority filter
      if (selectedAuthorityFilter !== 'All' && rec.exact_authority !== selectedAuthorityFilter) return false;

      // Category filter
      if (selectedCategoryFilter !== 'All' && rec.financial_category !== selectedCategoryFilter) return false;

      // Year filter
      if (selectedYearFilter !== 'All' && rec.financial_year !== selectedYearFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          rec.record_or_project_name.toLowerCase().includes(q) ||
          rec.department_or_sector.toLowerCase().includes(q) ||
          rec.unique_id.toLowerCase().includes(q) ||
          rec.document_title.toLowerCase().includes(q) ||
          rec.extraction_note.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [allAudited, statusTab, selectedAuthorityFilter, selectedCategoryFilter, selectedYearFilter, searchQuery]);

  // Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortField === 'amount') {
        const diff = a.amount_in_crores - b.amount_in_crores;
        return sortAsc ? diff : -diff;
      }
      if (sortField === 'year') {
        const diff = a.financial_year.localeCompare(b.financial_year);
        return sortAsc ? diff : -diff;
      }
      const diff = a.unique_id.localeCompare(b.unique_id);
      return sortAsc ? diff : -diff;
    });
  }, [filtered, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    return sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [sorted, currentPage, pageSize]);

  const handleOpenFilters = () => {
    setDraftAuthority(selectedAuthorityFilter);
    setDraftCategory(selectedCategoryFilter);
    setDraftYear(selectedYearFilter);
    setIsFilterPanelOpen(prev => !prev);
  };

  const handleApplyFilters = () => {
    setSelectedAuthorityFilter(draftAuthority);
    setSelectedCategoryFilter(draftCategory);
    setSelectedYearFilter(draftYear);
    setCurrentPage(1);
    setIsFilterPanelOpen(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAuthorityFilter('All');
    setSelectedCategoryFilter('All');
    setSelectedYearFilter('All');
    setDraftAuthority('All');
    setDraftCategory('All');
    setDraftYear('All');
    setStatusTab('all');
    setCurrentPage(1);
    setIsFilterPanelOpen(false);
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataProvider.getVerifiedRecords(), null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "jandhan_municipal_finance_verified.json");
    dlAnchorElem.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B3B] tracking-tight">
            Explore Spending & Municipal Records
          </h1>
          <p className="text-xs sm:text-sm text-[#142B3B]/70 mt-1">
            Search 30 audited municipal records across Pune, Mumbai, Greater Jaipur, and Jaipur Heritage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#142B3B]/15 text-[#142B3B] hover:bg-slate-50 text-xs font-semibold rounded-xl shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Export Verified JSON</span>
          </button>
        </div>
      </div>

      {/* Dataset Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#142B3B]/10 shadow-xs space-y-4">
        
        {/* Status Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#142B3B]/10 pb-3">
          <button
            onClick={() => { setStatusTab('all'); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusTab === 'all'
                ? 'bg-[#142B3B] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Audited Records (30)
          </button>
          <button
            onClick={() => { setStatusTab('verified'); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              statusTab === 'verified'
                ? 'bg-[#0D9488] text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active Verified (19)</span>
          </button>
          <button
            onClick={() => { setStatusTab('review'); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              statusTab === 'review'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Review & Quarantined (11)</span>
          </button>
        </div>

        {/* Compact Search & Filters Button Bar */}
        <div className="flex items-center gap-2">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by line item name, department, unique ID, or source doc..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-[#F8F9F7] border border-[#142B3B]/15 rounded-xl pl-9 pr-9 py-2.5 text-xs text-[#142B3B] placeholder-[#142B3B]/40 focus:outline-hidden focus:border-[#0D9488] focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={handleOpenFilters}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs shrink-0 ${
              isFilterPanelOpen || activeFiltersCount > 0
                ? 'bg-[#142B3B] text-white border-[#142B3B]'
                : 'bg-white text-[#142B3B] border-[#142B3B]/15 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#0D9488] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Menu */}
          <button
            onClick={() => {
              if (sortField === 'id') { setSortField('amount'); setSortAsc(false); }
              else if (sortField === 'amount') { setSortField('year'); setSortAsc(false); }
              else { setSortField('id'); setSortAsc(true); }
            }}
            className="flex items-center gap-1 px-3 py-2.5 rounded-xl border border-[#142B3B]/15 bg-white text-xs font-semibold text-[#142B3B] hover:bg-slate-50 transition-all shrink-0"
            title="Toggle sort criteria"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#0D9488]" />
            <span className="hidden sm:inline">Sort:</span>
            <span className="text-[#0D9488] capitalize">{sortField}</span>
          </button>

        </div>

        {/* Active Filters Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-500 font-medium mr-1">Active filters:</span>
            
            {selectedAuthorityFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#142B3B] text-xs font-medium border border-slate-200">
                <span>Authority: {selectedAuthorityFilter}</span>
                <button onClick={() => setSelectedAuthorityFilter('All')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategoryFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#142B3B] text-xs font-medium border border-slate-200">
                <span>Category: {selectedCategoryFilter}</span>
                <button onClick={() => setSelectedCategoryFilter('All')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedYearFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#142B3B] text-xs font-medium border border-slate-200">
                <span>FY: {selectedYearFilter}</span>
                <button onClick={() => setSelectedYearFilter('All')} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-[#0D9488] hover:underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filter Popover Panel */}
        {isFilterPanelOpen && (
          <div className="p-4 rounded-xl bg-slate-50 border border-[#142B3B]/15 space-y-4 animate-in fade-in-50 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#142B3B]/10">
              <span className="text-xs font-bold text-[#142B3B]">Filter Audited Records</span>
              <button 
                onClick={() => setIsFilterPanelOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Municipal Authority
                </label>
                <select
                  value={draftAuthority}
                  onChange={(e) => setDraftAuthority(e.target.value)}
                  className="w-full bg-white border border-[#142B3B]/15 rounded-lg px-2.5 py-2 text-xs font-medium text-[#142B3B] focus:outline-hidden"
                >
                  <option value="All">All Authorities</option>
                  {authorities.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Accounting Category
                </label>
                <select
                  value={draftCategory}
                  onChange={(e) => setDraftCategory(e.target.value)}
                  className="w-full bg-white border border-[#142B3B]/15 rounded-lg px-2.5 py-2 text-xs font-medium text-[#142B3B] focus:outline-hidden"
                >
                  <option value="All">All Categories</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Financial Year
                </label>
                <select
                  value={draftYear}
                  onChange={(e) => setDraftYear(e.target.value)}
                  className="w-full bg-white border border-[#142B3B]/15 rounded-lg px-2.5 py-2 text-xs font-medium text-[#142B3B] focus:outline-hidden"
                >
                  <option value="All">All Financial Years</option>
                  {financialYears.map(y => (
                    <option key={y} value={y}>FY {y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#142B3B]/10">
              <button
                onClick={() => {
                  setDraftAuthority('All');
                  setDraftCategory('All');
                  setDraftYear('All');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Reset
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

      {/* Results Count & Summary Bar */}
      <div className="flex items-center justify-between text-xs text-[#142B3B]/70 px-1">
        <span>
          Showing {paginatedRecords.length} of {sorted.length} matching record{sorted.length === 1 ? '' : 's'}
        </span>
        <span className="text-[11px] text-slate-500">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-[#142B3B]/10 shadow-xs overflow-hidden">
        {paginatedRecords.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-2">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <div className="font-semibold text-slate-700 text-sm">No matching records found</div>
            <p>Try resetting the search terms or clearing active filters.</p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-3 py-1.5 rounded-lg bg-[#0D9488] text-white text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F9F7] border-b border-[#142B3B]/10 text-[#142B3B]/70 font-semibold">
                  <th className="py-3 px-3.5">Unique ID</th>
                  <th className="py-3 px-3.5">Authority & City</th>
                  <th className="py-3 px-3.5">Record / Line Item</th>
                  <th className="py-3 px-3.5">Category</th>
                  <th className="py-3 px-3.5">FY</th>
                  <th className="py-3 px-3.5 text-right">Printed Amount</th>
                  <th className="py-3 px-3.5 text-center">Status</th>
                  <th className="py-3 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#142B3B]/5">
                {paginatedRecords.map(rec => {
                  const isVerified = rec.verification_status === 'Verified';
                  return (
                    <tr 
                      key={rec.unique_id} 
                      className={`hover:bg-slate-50/80 transition-colors ${!isVerified ? 'bg-amber-50/20' : ''}`}
                    >
                      <td className="py-3 px-3.5 font-mono font-bold text-[#0D9488] whitespace-nowrap">
                        {rec.unique_id}
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-[#142B3B]">{rec.city}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                          {rec.exact_authority}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 max-w-xs">
                        <div className="font-bold text-[#142B3B]">{rec.record_or_project_name}</div>
                        <div className="text-[11px] text-slate-500">{rec.department_or_sector}</div>
                      </td>
                      <td className="py-3 px-3.5 font-medium text-slate-700 whitespace-nowrap">
                        {rec.financial_category}
                      </td>
                      <td className="py-3 px-3.5 font-mono text-slate-600 whitespace-nowrap">
                        {rec.financial_year}
                      </td>
                      <td className="py-3 px-3.5 text-right font-mono font-bold text-[#142B3B] whitespace-nowrap">
                        {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                      </td>
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isVerified 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {isVerified ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                          <span>{isVerified ? 'Verified' : 'Quarantined'}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => onSelectRecord(rec)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#0D9488] bg-[#0D9488]/10 hover:bg-[#0D9488]/20 rounded-md transition-colors"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-3 bg-[#F8F9F7] border-t border-[#142B3B]/10 flex items-center justify-between text-xs">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-[#142B3B]/15 bg-white disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[#142B3B] flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-[#142B3B]/15 bg-white disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[#142B3B] flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
