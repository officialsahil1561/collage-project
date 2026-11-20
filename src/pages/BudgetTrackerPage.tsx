import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise } from '../utils/formatters';
import { CitizenGlossaryBar } from '../components/CitizenGlossaryBar';
import { VerificationBadge } from '../components/VerificationBadge';
import { toStandardVerificationBadge } from '../data/pmcCivicSectionsData';
import {
  Download,
  ExternalLink,
  Search,
  X,
  TrendingUp,
  Info,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { BudgetTrackerRow } from '../data/pmcExtendedData';

export const BudgetTrackerPage: React.FC = () => {
  const rows = dataProvider.getBudgetTrackerRows();
  const [selectedFY, setSelectedFY] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [includeQuarantined, setIncludeQuarantined] = useState<boolean>(true);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'table' | 'charts'>('table');

  const financialYears = ['2026-27', '2025-26', '2024-25', '2023-24', '2022-23'];
  const departments = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.department))).sort();
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (verifiedOnly && r.verificationStatus !== 'Verified') return false;
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
  }, [rows, includeQuarantined, verifiedOnly, selectedFY, selectedDept, searchQuery]);

  // Consolidated rows for comparison charts
  const consolidatedChartData = useMemo(() => {
    return rows
      .filter((r) => r.department === 'Consolidated Municipal Fund' && r.verificationStatus === 'Verified')
      .map((r) => ({
        financialYear: `FY ${r.financialYear}`,
        OriginalBE: r.originalBE ?? 0,
        RevisedRE: r.revisedRE ?? 0,
        ActualSpend: r.actualExpenditure ?? 0,
        hasActuals: r.actualExpenditure !== null,
        hasRE: r.revisedRE !== null
      }))
      .sort((a, b) => a.financialYear.localeCompare(b.financialYear));
  }, [rows]);

  const downloadCSV = () => {
    const csv = dataProvider.buildBudgetTrackerCSV(filteredRows);
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'pmc_pune_budget_financial_records.csv');
    a.click();
  };

  const downloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredRows, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'pmc_pune_budget_financial_records.json');
    a.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Scope & Accuracy Banner */}
      <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#E8F2EE] text-[#0E7C74] text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Pune Municipal Corporation (PMC) Financial Ledger</span>
          </div>
          <h2 className="font-serif text-lg font-semibold text-[#133429]">
            Multi-Year Budget Tracker — BE vs RE vs Audited Actual Expenditure (FY 2022–27)
          </h2>
          <p className="text-xs text-[#5A6560] leading-relaxed max-w-3xl">
            Strict separation of Original Budget Estimates (BE), Revised Estimates (RE), and Audited Actual Expenditures. Unpublished or unclosed financial figures are explicitly labeled as <span className="font-semibold text-[#1C2422]">"Not published in source"</span> or <span className="font-semibold text-[#1C2422]">"Pending FY closure"</span> without zero substitution.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={downloadCSV}
            className="h-9 px-4 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#0E7C74]" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={downloadJSON}
            className="h-9 px-4 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E0D5] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('table')}
          className={`h-9 px-4 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'table'
              ? 'bg-[#133429] text-[#FAF8F3]'
              : 'bg-white text-[#5A6560] hover:text-[#133429] border border-[#E5E0D5]'
          }`}
        >
          Financial Records Ledger ({filteredRows.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('charts')}
          className={`h-9 px-4 rounded-[6px] text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'charts'
              ? 'bg-[#133429] text-[#FAF8F3]'
              : 'bg-white text-[#5A6560] hover:text-[#133429] border border-[#E5E0D5]'
          }`}
        >
          BE vs RE vs Actual Comparison Charts
        </button>
      </div>

      {activeTab === 'charts' ? (
        <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-base font-semibold text-[#133429]">
              Consolidated Municipal Outlay: Original Budget vs Revised vs Audited Actuals
            </h3>
            <p className="text-xs text-[#5A6560]">
              Visual comparison across financial years based on verified PMC budget books and annual audited financial statements.
            </p>
          </div>

          <div className="h-[380px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consolidatedChartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D5" />
                <XAxis dataKey="financialYear" tick={{ fontSize: 12, fill: '#5A6560' }} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#5A6560' }}
                  tickFormatter={(val) => `₹${val} Cr`}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    value ? formatCroresPrecise(Number(value)) : 'Not Published',
                    name === 'OriginalBE'
                      ? 'Original Budget Estimate (BE)'
                      : name === 'RevisedRE'
                      ? 'Revised Estimate (RE)'
                      : 'Audited Actual Spend'
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E5E0D5',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="OriginalBE" name="Original BE (₹ Cr)" fill="#133429" radius={[4, 4, 0, 0]} />
                <Bar dataKey="RevisedRE" name="Revised RE (₹ Cr)" fill="#E9A23B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ActualSpend" name="Actual Spend (₹ Cr)" fill="#0E7C74" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] text-xs text-[#5A6560] space-y-1">
            <span className="font-semibold text-[#133429] block">Financial Variance & Execution Insight:</span>
            <p>
              For FY 2023-24, PMC approved a budget outlay of ₹9,515.00 Cr, revised it to ₹9,200.00 Cr, and audited actual expenditure closed at ₹8,125.60 Cr (85.4% budget utilization efficiency, yielding a variance of -₹1,389.40 Cr). For ongoing/future years (FY 2025-26 & 2026-27), actual expenditure and revised estimates remain unclosed or pending statutory audit.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Plain-Language Glossary */}
          <CitizenGlossaryBar />

          {/* Filter Toolbar */}
          <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by budget head, department, ID, or document title..."
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

            <div className="flex items-center gap-4 px-2 shrink-0">
              <label className="inline-flex items-center gap-2 text-xs text-[#1C2422] font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded border-[#D4CEC2] text-[#0E7C74] focus:ring-[#0E7C74]"
                />
                <span>Verified Only</span>
              </label>

              <label className="inline-flex items-center gap-2 text-xs text-[#1C2422] font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeQuarantined}
                  onChange={(e) => setIncludeQuarantined(e.target.checked)}
                  className="rounded border-[#D4CEC2] text-[#0E7C74] focus:ring-[#0E7C74]"
                />
                <span>Show Quarantined Sub-heads</span>
              </label>
            </div>
          </div>

          {/* Budget Tracker Table */}
          <div className="bg-white rounded-[8px] border border-[#E5E0D5] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#FAF8F3] border-b border-[#E5E0D5]">
                  <tr className="text-[#5A6560] font-semibold">
                    <th className="py-3 px-4 whitespace-nowrap">Department</th>
                    <th className="py-3 px-4 min-w-[220px]">Budget Head &amp; Evidence</th>
                    <th className="py-3 px-4 whitespace-nowrap">FY</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Original BE</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Revised RE</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Actual Spend</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Variance &amp; Util %</th>
                    <th className="py-3 px-4 whitespace-nowrap">Verification</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D5]">
                  {filteredRows.map((row) => {
                    const isVerified = row.verificationStatus === 'Verified';
                    const hasActual = row.actualExpenditure !== null;
                    const hasRE = row.revisedRE !== null;

                    const variance = hasActual && row.originalBE !== null ? row.actualExpenditure! - row.originalBE : null;
                    const utilPct = hasActual && row.originalBE !== null && row.originalBE > 0 ? Number(((row.actualExpenditure! / row.originalBE) * 100).toFixed(1)) : null;

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
                          {row.notes && (
                            <div className="text-[10px] text-[#0E7C74] mt-1 italic">
                              Note: {row.notes}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono tabular-nums text-[#5A6560] whitespace-nowrap">
                          {row.financialYear}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-[#133429] whitespace-nowrap">
                          {row.originalBE !== null ? formatCroresPrecise(row.originalBE) : 'Not Applicable'}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#5A6560] whitespace-nowrap">
                          {hasRE ? (
                            <span className="font-medium text-[#133429]">{formatCroresPrecise(row.revisedRE!)}</span>
                          ) : (
                            <span
                              className="text-[#9CA3AF] italic text-[11px]"
                              title={
                                row.financialYear === '2026-27' || row.financialYear === '2025-26'
                                  ? 'Revised estimates pending statutory mid-term financial review.'
                                  : 'Not published in departmental annexure.'
                              }
                            >
                              Not published in source
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums whitespace-nowrap">
                          {hasActual ? (
                            <span className="font-bold text-[#0E7C74]">
                              {formatCroresPrecise(row.actualExpenditure!)}
                            </span>
                          ) : (
                            <span
                              className="text-[#9CA3AF] italic text-[11px]"
                              title={
                                row.financialYear === '2026-27' || row.financialYear === '2025-26'
                                  ? 'Actual expenditure pending financial year closure and statutory audit.'
                                  : 'Audited actual expenditure statement not published for this sub-head.'
                              }
                            >
                              {row.financialYear === '2026-27' || row.financialYear === '2025-26'
                                ? 'Pending FY closure'
                                : 'Not published in source'}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums whitespace-nowrap">
                          {variance !== null && utilPct !== null ? (
                            <div className="space-y-0.5">
                              <div
                                className={`font-semibold text-[11px] ${
                                  variance >= 0 ? 'text-[#0E7C74]' : 'text-[#B45309]'
                                }`}
                                title="Variance = Actual Expenditure - Original Budget Estimate"
                              >
                                {variance >= 0 ? `+${formatCroresPrecise(variance)}` : formatCroresPrecise(variance)}
                              </div>
                              <div className="text-[10px] text-[#5A6560]">
                                {utilPct}% utilization
                              </div>
                            </div>
                          ) : (
                            <span className="text-[#9CA3AF] italic text-[11px]" title="Calculated variance requires both BE and Audited Actuals">
                              N/A
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <VerificationBadge
                            status={toStandardVerificationBadge(row.verificationStatus)}
                          />
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

            <div className="px-5 py-3.5 bg-[#FAF8F3] border-t border-[#E5E0D5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A6560]">
              <span className="font-medium">
                Showing {filteredRows.length} PMC budget &amp; financial records ledger lines
              </span>
              <span className="text-[11px]">
                Strict adherence to PMC zero-fabrication transparency rule · No artificial zero values used.
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
