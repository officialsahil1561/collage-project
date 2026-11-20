import React, { useState, useMemo } from 'react';
import { ReconciledRecord, FinancialCategory, SourceClassification } from '../types';
import { formatPrintedWithUnit } from '../utils/formatters';
import { dataProvider } from '../services/dataProvider';
import { VerificationBadge } from '../components/VerificationBadge';
import { toStandardVerificationBadge } from '../data/pmcCivicSectionsData';
import {
  Search,
  SlidersHorizontal,
  AlertTriangle,
  Download,
  ArrowUpDown,
  X,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SpendingPageProps {
  onSelectRecord: (record: ReconciledRecord) => void;
}

export const SpendingPage: React.FC<SpendingPageProps> = ({ onSelectRecord }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState<'all' | 'verified' | 'review'>('all');

  const [selectedClassificationFilter, setSelectedClassificationFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('All');

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [draftClassification, setDraftClassification] = useState<string>('All');
  const [draftCategory, setDraftCategory] = useState<string>('All');
  const [draftYear, setDraftYear] = useState<string>('All');

  const [sortField, setSortField] = useState<'amount' | 'year' | 'id'>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  const classifications: SourceClassification[] = [
    'Official Budget Estimate',
    'Revised Estimate',
    'Actual Expenditure',
    'Audited Financial Statement',
    'Internally Reconciled',
    'Unverified / Under Review'
  ];

  const categories: FinancialCategory[] = [
    'Budget Estimates (BE)',
    'Actual Expenditure',
    'Capital Expenditure',
    'Revenue Expenditure',
    'Revenue Receipts',
    'Balance Sheet Measure',
    'Debt & Liabilities'
  ];

  const financialYears = ['2026-27', '2025-26', '2024-25', '2023-24', '2022-23'];

  const allAudited = dataProvider.getAllAuditedRecords();
  const metrics = dataProvider.getReconciliationMetrics();

  const activeFiltersCount =
    (selectedClassificationFilter !== 'All' ? 1 : 0) +
    (selectedCategoryFilter !== 'All' ? 1 : 0) +
    (selectedYearFilter !== 'All' ? 1 : 0);

  const filtered = useMemo(() => {
    return allAudited.filter((rec) => {
      if (statusTab === 'verified' && rec.verification_status !== 'Verified') return false;
      if (statusTab === 'review' && rec.verification_status === 'Verified') return false;
      if (
        selectedClassificationFilter !== 'All' &&
        rec.source_classification !== selectedClassificationFilter
      )
        return false;
      if (selectedCategoryFilter !== 'All' && rec.financial_category !== selectedCategoryFilter)
        return false;
      if (selectedYearFilter !== 'All' && rec.financial_year !== selectedYearFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          rec.record_or_project_name.toLowerCase().includes(q) ||
          rec.department_or_sector.toLowerCase().includes(q) ||
          rec.unique_id.toLowerCase().includes(q) ||
          rec.source_classification.toLowerCase().includes(q) ||
          rec.document_title.toLowerCase().includes(q) ||
          rec.extraction_note.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [
    allAudited,
    statusTab,
    selectedClassificationFilter,
    selectedCategoryFilter,
    selectedYearFilter,
    searchQuery
  ]);

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

  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    return sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [sorted, currentPage, pageSize]);

  const handleOpenFilters = () => {
    setDraftClassification(selectedClassificationFilter);
    setDraftCategory(selectedCategoryFilter);
    setDraftYear(selectedYearFilter);
    setIsFilterPanelOpen((prev) => !prev);
  };

  const handleApplyFilters = () => {
    setSelectedClassificationFilter(draftClassification);
    setSelectedCategoryFilter(draftCategory);
    setSelectedYearFilter(draftYear);
    setCurrentPage(1);
    setIsFilterPanelOpen(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedClassificationFilter('All');
    setSelectedCategoryFilter('All');
    setSelectedYearFilter('All');
    setDraftClassification('All');
    setDraftCategory('All');
    setDraftYear('All');
    setStatusTab('all');
    setCurrentPage(1);
    setIsFilterPanelOpen(false);
  };

  const downloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(sorted, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'jandhan_pmc_pune_records.json');
    dlAnchorElem.click();
  };

  const downloadCSV = () => {
    const csv = dataProvider.buildRecordsCSV(sorted);
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'jandhan_pmc_pune_records.csv');
    dlAnchorElem.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Compact Toolbar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search PMC ID, line item, source classification, document..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] pl-9 pr-8 text-xs text-[#1C2422] placeholder-[#5A6560] focus:outline-hidden focus:border-[#0E7C74] focus:bg-white transition-colors duration-150"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#5A6560] hover:text-[#1C2422] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Segmented Filter */}
          <div className="flex items-center h-9 gap-0.5 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] shrink-0">
            <button
              type="button"
              onClick={() => {
                setStatusTab('all');
                setCurrentPage(1);
              }}
              className={`h-7 px-3 rounded-[4px] text-xs whitespace-nowrap transition-all duration-150 cursor-pointer ${
                statusTab === 'all'
                  ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              All ({metrics.total})
            </button>
            <button
              type="button"
              onClick={() => {
                setStatusTab('verified');
                setCurrentPage(1);
              }}
              className={`h-7 px-3 rounded-[4px] text-xs whitespace-nowrap transition-all duration-150 cursor-pointer ${
                statusTab === 'verified'
                  ? 'bg-[#0E7C74] text-white font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              Verified ({metrics.verified})
            </button>
            <button
              type="button"
              onClick={() => {
                setStatusTab('review');
                setCurrentPage(1);
              }}
              className={`h-7 px-3 rounded-[4px] text-xs whitespace-nowrap transition-all duration-150 cursor-pointer ${
                statusTab === 'review'
                  ? 'bg-[#D97706] text-white font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              Quarantined ({metrics.review})
            </button>
          </div>

          {/* Filters Button */}
          <button
            type="button"
            onClick={handleOpenFilters}
            className={`h-9 inline-flex items-center gap-1.5 px-3 rounded-[6px] border text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
              isFilterPanelOpen || activeFiltersCount > 0
                ? 'bg-[#133429] text-[#FAF8F3] border-[#133429]'
                : 'bg-white text-[#1C2422] border-[#E5E0D5] hover:bg-[#FAF8F3]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}</span>
          </button>

          {/* Sort Controls */}
          <div className="h-9 flex items-center border border-[#E5E0D5] rounded-[6px] bg-white overflow-hidden shrink-0">
            <select
              aria-label="Sort field"
              value={sortField}
              onChange={(e) => setSortField(e.target.value as 'amount' | 'year' | 'id')}
              className="h-full pl-2.5 pr-1 text-xs font-medium text-[#1C2422] bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="id">Sort: ID</option>
              <option value="amount">Sort: Amount</option>
              <option value="year">Sort: FY</option>
            </select>
            <button
              type="button"
              onClick={() => setSortAsc((prev) => !prev)}
              className="h-full px-2.5 border-l border-[#E5E0D5] text-[#5A6560] hover:text-[#133429] hover:bg-[#FAF8F3] flex items-center gap-1 text-[11px] font-mono transition-colors cursor-pointer"
              title="Toggle sort order"
            >
              <ArrowUpDown className="w-3 h-3 text-[#0E7C74]" />
              <span>{sortAsc ? 'ASC' : 'DESC'}</span>
            </button>
          </div>

          {/* Export CSV & JSON */}
          <button
            type="button"
            onClick={downloadCSV}
            className="h-9 inline-flex items-center gap-1.5 px-3 border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-[#133429] text-xs font-semibold rounded-[6px] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#0E7C74]" />
            <span>CSV</span>
          </button>
          <button
            type="button"
            onClick={downloadJSON}
            className="h-9 inline-flex items-center gap-1.5 px-3.5 bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold rounded-[6px] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-[#E5E0D5] text-[11px]">
            <span className="text-[#5A6560]">Active:</span>
            {selectedClassificationFilter !== 'All' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedClassificationFilter('All');
                  setCurrentPage(1);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[#FAF8F3] border border-[#E5E0D5] text-[#1C2422] cursor-pointer"
              >
                <span>Source: {selectedClassificationFilter}</span>
                <X className="w-3 h-3 text-[#5A6560]" />
              </button>
            )}
            {selectedCategoryFilter !== 'All' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryFilter('All');
                  setCurrentPage(1);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[#FAF8F3] border border-[#E5E0D5] text-[#1C2422] cursor-pointer"
              >
                <span>Category: {selectedCategoryFilter}</span>
                <X className="w-3 h-3 text-[#5A6560]" />
              </button>
            )}
            {selectedYearFilter !== 'All' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedYearFilter('All');
                  setCurrentPage(1);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[#FAF8F3] border border-[#E5E0D5] text-[#1C2422] cursor-pointer"
              >
                <span>FY {selectedYearFilter}</span>
                <X className="w-3 h-3 text-[#5A6560]" />
              </button>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#0E7C74] font-semibold hover:text-[#133429] ml-1 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filters Popover */}
        {isFilterPanelOpen && (
          <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6560] mb-1">
                  Source Classification
                </label>
                <select
                  value={draftClassification}
                  onChange={(e) => setDraftClassification(e.target.value)}
                  className="w-full h-9 bg-white border border-[#E5E0D5] rounded-[6px] px-2.5 text-xs text-[#1C2422]"
                >
                  <option value="All">All Classifications</option>
                  {classifications.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6560] mb-1">
                  Financial Category
                </label>
                <select
                  value={draftCategory}
                  onChange={(e) => setDraftCategory(e.target.value)}
                  className="w-full h-9 bg-white border border-[#E5E0D5] rounded-[6px] px-2.5 text-xs text-[#1C2422]"
                >
                  <option value="All">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6560] mb-1">
                  Financial Year
                </label>
                <select
                  value={draftYear}
                  onChange={(e) => setDraftYear(e.target.value)}
                  className="w-full h-9 bg-white border border-[#E5E0D5] rounded-[6px] px-2.5 text-xs text-[#1C2422]"
                >
                  <option value="All">All Financial Years</option>
                  {financialYears.map((y) => (
                    <option key={y} value={y}>
                      FY {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-[#E5E0D5]">
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-9 px-3 text-xs font-medium text-[#5A6560] hover:text-[#1C2422] cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleApplyFilters}
                className="h-9 px-4 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Financial Data Table */}
      <div className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden">
        {paginatedRecords.length === 0 ? (
          <div className="p-10 text-center text-xs text-[#5A6560] space-y-2.5">
            <AlertTriangle className="w-6 h-6 text-[#D97706] mx-auto" />
            <div className="font-semibold text-[#133429] text-sm">No matching PMC records found</div>
            <p>Adjust search terms or clear active filters to inspect records.</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-1 h-9 px-4 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10 bg-[#FAF8F3] border-b border-[#E5E0D5]">
                <tr className="text-[#5A6560] font-semibold">
                  <th className="py-3 px-4 whitespace-nowrap">Record ID</th>
                  <th className="py-3 px-4 min-w-[240px]">Financial Record &amp; Department</th>
                  <th className="py-3 px-4 whitespace-nowrap">Source Classification</th>
                  <th className="py-3 px-4 whitespace-nowrap">FY</th>
                  <th className="py-3 px-4 text-right whitespace-nowrap">Amount</th>
                  <th className="py-3 px-4 whitespace-nowrap">Verification Status</th>
                  <th className="py-3 px-4 text-right whitespace-nowrap">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D5]">
                {paginatedRecords.map((rec) => {
                  const isVerified = rec.verification_status === 'Verified';
                  return (
                    <tr
                      key={rec.unique_id}
                      className={`hover:bg-[#FAF8F3] transition-colors duration-150 ${
                        !isVerified ? 'bg-[#B45309]/[0.04]' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-[#0E7C74] whitespace-nowrap">
                        {rec.unique_id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#1C2422] leading-snug">
                          {rec.record_or_project_name}
                        </div>
                        <div className="text-[11px] text-[#5A6560] mt-0.5">
                          {rec.department_or_sector} · {rec.page_or_table_ref}
                        </div>
                        {rec.exclusion_reason && (
                          <div className="text-[11px] text-[#B45309] mt-0.5">
                            Quarantine: {rec.exclusion_reason}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#1C2422] whitespace-nowrap">
                        <div className="font-medium">{rec.source_classification}</div>
                        <div className="text-[11px] text-[#5A6560]">{rec.financial_category}</div>
                      </td>
                      <td className="py-3 px-4 font-mono tabular-nums text-[#5A6560] whitespace-nowrap">
                        {rec.financial_year}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-[#133429] whitespace-nowrap">
                        {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <VerificationBadge
                            status={toStandardVerificationBadge(rec.verification_status)}
                          />
                          {!isVerified && (
                            <span className="text-[10px] text-[#5A6560]">
                              {rec.verification_status}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onSelectRecord(rec)}
                          className="px-3 py-1.5 text-[11px] font-semibold text-[#0E7C74] bg-[#E8F2EE] hover:bg-[#133429] hover:text-[#FAF8F3] rounded-[6px] transition-colors duration-150 cursor-pointer"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 bg-[#FAF8F3] border-t border-[#E5E0D5] flex items-center justify-between text-xs">
            <span className="text-[#5A6560] font-mono tabular-nums hidden sm:inline">
              Showing {paginatedRecords.length} of {sorted.length} PMC records
            </span>
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 px-2.5 rounded-[6px] border border-[#E5E0D5] bg-white disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[#1C2422] inline-flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <div className="flex items-center gap-1 font-mono tabular-nums">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#133429] text-[#FAF8F3]'
                        : 'text-[#5A6560] hover:bg-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 px-2.5 rounded-[6px] border border-[#E5E0D5] bg-white disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[#1C2422] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
