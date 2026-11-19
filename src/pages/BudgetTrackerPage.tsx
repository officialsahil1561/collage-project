import React, { useState, useMemo } from 'react';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise } from '../utils/formatters';
import {
  Download,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Search,
  X
} from 'lucide-react';

export const BudgetTrackerPage: React.FC = () => {
  const rows = dataProvider.getBudgetTrackerRows();
  const [selectedFY, setSelectedFY] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [includeQuarantined, setIncludeQuarantined] = useState<boolean>(true);

  const financialYears = ['2025-26', '2024-25', '2023-24', '2022-23'];
  const departments = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.department))).sort();
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (!includeQuarantined && r.verificationStatus !== 'Verified') return false;
      if (selectedFY !== 'All' && r.financialYear !== selectedFY) return false;
      if (selectedDept !== 'All' && r.department !== selectedDept) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          r.department.toLowerCase().includes(q) ||
          r.budgetHead.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.documentTitle.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [rows, includeQuarantined, selectedFY, selectedDept, searchQuery]);

  const downloadCSV = () => {
    const csv = dataProvider.buildBudgetTrackerCSV(filteredRows);
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'pmc_pune_budget_tracker.csv');
    a.click();
  };

  const downloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredRows, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'pmc_pune_budget_tracker.json');
    a.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Scope & Accuracy Banner */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-base font-semibold text-[#133429]">
            Pune Municipal Corporation (PMC) — Multi-Year Budget Tracker
          </h2>
          <p className="text-xs text-[#5A6560] leading-relaxed">
            Strictly separates Original Budget Estimate (BE), Revised Estimate (RE), and Audited Actual Expenditure. Unverified or unpublished RE/Actual columns display{' '}
            <strong className="text-[#1C2422]">Data Not Available</strong> rather than extrapolating.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={downloadCSV}
            className="h-9 px-3.5 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#0E7C74]" />
            <span>CSV</span>
          </button>
          <button
            type="button"
            onClick={downloadJSON}
            className="h-9 px-3.5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Filter by budget head, department, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] pl-9 pr-8 text-xs text-[#1C2422] placeholder-[#5A6560] focus:outline-hidden focus:border-[#0E7C74] focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A6560] hover:text-[#1C2422] cursor-pointer"
              aria-label="Clear filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          aria-label="Filter by Department"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] px-3 text-xs font-semibold text-[#1C2422] focus:outline-hidden focus:border-[#0E7C74] cursor-pointer"
        >
          <option value="All">All Departments ({departments.length})</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by Financial Year"
          value={selectedFY}
          onChange={(e) => setSelectedFY(e.target.value)}
          className="h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] px-3 text-xs font-semibold text-[#1C2422] focus:outline-hidden focus:border-[#0E7C74] cursor-pointer"
        >
          <option value="All">All Financial Years</option>
          {financialYears.map((fy) => (
            <option key={fy} value={fy}>
              FY {fy}
            </option>
          ))}
        </select>

        <label className="inline-flex items-center gap-2 text-xs text-[#1C2422] font-medium px-2 cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={includeQuarantined}
            onChange={(e) => setIncludeQuarantined(e.target.checked)}
            className="rounded border-[#D4CEC2] text-[#0E7C74] focus:ring-[#0E7C74]"
          />
          <span>Show Quarantined Sub-heads</span>
        </label>
      </div>

      {/* Budget Tracker Table */}
      <div className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#FAF8F3] border-b border-[#E5E0D5]">
              <tr className="text-[#5A6560] font-semibold">
                <th className="py-3 px-4 whitespace-nowrap">Department</th>
                <th className="py-3 px-4 min-w-[230px]">Budget Head &amp; Classification</th>
                <th className="py-3 px-4 whitespace-nowrap">FY</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Original BE</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Revised RE</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Actual Spend</th>
                <th className="py-3 px-4 whitespace-nowrap">Verification</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D5]">
              {filteredRows.map((row) => {
                const isVerified = row.verificationStatus === 'Verified';
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-[#FAF8F3] transition-colors ${
                      !isVerified ? 'bg-[#B45309]/[0.04]' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#1C2422] whitespace-nowrap">
                      {row.department}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#1C2422]">{row.budgetHead}</div>
                      <div className="text-[11px] text-[#5A6560] mt-0.5">
                        {row.sourceClassification} · {row.pageRef}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums text-[#5A6560] whitespace-nowrap">
                      {row.financialYear}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-[#133429] whitespace-nowrap">
                      {row.originalBE !== null
                        ? formatCroresPrecise(row.originalBE)
                        : 'Data Not Available'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#5A6560] whitespace-nowrap">
                      {row.revisedRE !== null
                        ? formatCroresPrecise(row.revisedRE)
                        : 'Data Not Available'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums whitespace-nowrap">
                      {row.actualExpenditure !== null ? (
                        <span className="font-bold text-[#0E7C74]">
                          {formatCroresPrecise(row.actualExpenditure)}
                        </span>
                      ) : (
                        <span className="text-[#5A6560]">Data Not Available</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          isVerified ? 'text-[#0E7C74]' : 'text-[#B45309]'
                        }`}
                      >
                        {isVerified ? (
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                        )}
                        <span>{row.verificationStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#0E7C74] hover:text-[#133429] font-semibold"
                        title={row.documentTitle}
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-[#FAF8F3] border-t border-[#E5E0D5] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A6560]">
          <span>Showing {filteredRows.length} PMC budget tracker lines</span>
          <span>Consolidated Fund BE totals must not be summed with departmental sub-heads</span>
        </div>
      </div>
    </div>
  );
};
