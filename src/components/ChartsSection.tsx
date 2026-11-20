import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Legend
} from 'recharts';
import { ReconciledRecord } from '../types';
import { formatCroresPrecise, formatNormalizedINR } from '../utils/formatters';
import { dataProvider } from '../services/dataProvider';
import { AlertTriangle } from 'lucide-react';

interface ChartsSectionProps {
  records: ReconciledRecord[];
  defaultTab?: 'budget-actual' | 'sectors' | 'revenue';
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  records,
  defaultTab = 'budget-actual'
}) => {
  const [chartTab, setChartTab] = useState<'budget-actual' | 'sectors' | 'revenue'>(defaultTab);
  const [includeQuarantinedDepts, setIncludeQuarantinedDepts] = useState<boolean>(false);

  const allRecords = useMemo(() => dataProvider.getAllAuditedRecords(), []);

  // 1. Multi-Year Budget Estimate vs Audited Expenditure (FY 2022-23 to FY 2026-27) from dataProvider
  const multiYearData = useMemo(() => {
    return dataProvider.getFiveYearExpenditureTrends().map((point) => ({
      fy: point.fyLabel,
      be: point.approvedBudgetBE,
      actual: point.auditedTotalExpenditure,
      revExp: point.auditedRevenueExpenditure,
      revRec: point.auditedRevenueReceipts,
      note: point.notes
    }));
  }, []);

  // 2. Department & Sector Allocation data
  const sectorData = useMemo(() => {
    const verifiedSectors = records.filter(
      (r) => r.aggregation_eligible && r.domain === 'department'
    );

    const quarantinedDepts = allRecords.filter(
      (r) => !r.aggregation_eligible && r.verification_status === 'Partially Verified'
    );

    const rows =
      includeQuarantinedDepts && quarantinedDepts.length > 0
        ? [...verifiedSectors, ...quarantinedDepts]
        : verifiedSectors;

    return {
      hasQuarantined: quarantinedDepts.length > 0,
      quarantinedCount: quarantinedDepts.length,
      items: rows
        .slice()
        .sort((a, b) => b.amount_in_crores - a.amount_in_crores)
        .map((r) => ({
          id: r.unique_id,
          name:
            r.department_or_sector.length > 28
              ? r.department_or_sector.substring(0, 26) + '...'
              : r.department_or_sector,
          fullName: `${r.record_or_project_name} (${r.department_or_sector})`,
          amount: r.amount_in_crores,
          category: r.financial_category,
          year: r.financial_year,
          status: r.verification_status,
          classification: r.source_classification,
          normalized: r.normalized_inr_unit
        }))
    };
  }, [records, allRecords, includeQuarantinedDepts]);

  // 3. Revenue Targets (FY 25-26 BE) & Property Tax Trend (FY 22-27)
  const revenueAnalysis = useMemo(() => {
    const targets2526 = records
      .filter((r) => r.domain === 'revenue' && r.financial_year === '2025-26')
      .sort((a, b) => b.amount_in_crores - a.amount_in_crores)
      .map((r) => ({
        id: r.unique_id,
        label: r.department_or_sector
          .replace('Department', '')
          .replace('State & Central ', '')
          .replace('(GST Compensation)', '(GST)')
          .trim(),
        fullName: r.record_or_project_name,
        amount: r.amount_in_crores,
        year: r.financial_year
      }));

    const propertyTaxTrend = [
      { fy: 'FY 2022-23', amount: 1963.0, type: 'Actual Collection' },
      { fy: 'FY 2023-24', amount: 2273.0, type: 'Actual Collection' },
      { fy: 'FY 2024-25', amount: 2360.0, type: 'Actual Collection' },
      { fy: 'FY 2025-26', amount: 2847.0, type: 'Budgeted Target (BE)' },
      { fy: 'FY 2026-27', amount: 3152.0, type: 'Standing Comm. Target (BE)' }
    ];

    return { targets2526, propertyTaxTrend };
  }, [records]);

  const tabs: Array<{ key: 'budget-actual' | 'sectors' | 'revenue'; label: string }> = [
    { key: 'budget-actual', label: 'Budget vs Audited Actuals (FY 22–27)' },
    { key: 'sectors', label: 'Sector Allocations' },
    { key: 'revenue', label: 'Revenue & Tax Collection' }
  ];

  return (
    <section
      aria-label="Pune Municipal Financial Analysis"
      className="bg-white rounded-[6px] border border-[#E5E0D5] p-6 space-y-6"
    >
      {/* Analytics Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E0D5]">
        <div className="pb-4">
          <h2 className="font-serif text-lg font-semibold text-[#133429] tracking-tight">
            Pune Municipal Financial Analysis
          </h2>
          <p className="text-xs text-[#5A6560] mt-1">
            Pune Municipal Corporation (PMC) · Accounting stages separated strictly (BE vs Audited Actuals)
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Chart views"
          className="flex items-center gap-6 overflow-x-auto -mb-px"
        >
          {tabs.map((tab) => {
            const isActive = chartTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setChartTab(tab.key)}
                className={`pb-3.5 text-xs whitespace-nowrap border-b-2 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'border-[#0E7C74] text-[#133429] font-semibold'
                    : 'border-transparent text-[#5A6560] hover:text-[#133429] font-medium'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: Multi-Year Budget vs Audited Actuals */}
      {chartTab === 'budget-actual' && (
        <div className="space-y-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={multiYearData}
                margin={{ top: 12, right: 24, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D5" />
                <XAxis
                  dataKey="fy"
                  tick={{ fontSize: 11, fill: '#1C2422', fontWeight: 600 }}
                  axisLine={{ stroke: '#E5E0D5' }}
                  tickLine={false}
                />
                <YAxis
                  width={62}
                  tick={{ fontSize: 11, fill: '#5A6560' }}
                  tickFormatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#FAF8F3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white p-3.5 border border-[#E5E0D5] rounded-[6px] shadow-[0_8px_24px_rgba(19,52,41,0.1)] text-xs space-y-1.5 max-w-xs">
                          <div className="font-semibold text-[#133429]">{d.fy} — PMC</div>
                          <div className="flex justify-between gap-4 pt-1 border-t border-[#E5E0D5]">
                            <span className="text-[#5A6560]">Budget Estimate (BE)</span>
                            <span className="font-bold font-mono tabular-nums text-[#133429]">
                              {formatCroresPrecise(d.be)}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#5A6560]">Total Actual Spend</span>
                            <span className="font-bold font-mono tabular-nums text-[#0E7C74]">
                              {d.actual !== null ? formatCroresPrecise(d.actual) : 'Data Not Available'}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#5A6560]">Audited Revenue Exp.</span>
                            <span className="font-semibold font-mono tabular-nums text-[#5A8F86]">
                              {d.revExp !== null ? formatCroresPrecise(d.revExp) : 'Data Not Available'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5A6560] pt-1 leading-snug">{d.note}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} iconType="square" />
                <Bar
                  name="Approved / Proposed BE (₹ Cr)"
                  dataKey="be"
                  fill="#133429"
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
                <Bar
                  name="Audited Total Actual Spend (₹ Cr)"
                  dataKey="actual"
                  fill="#0E7C74"
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
                <Bar
                  name="Audited Revenue Spend (₹ Cr)"
                  dataKey="revExp"
                  fill="#6FB3A8"
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-[#E5E0D5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A6560]">
            <span>
              Audited full-year total actual expenditure is verified through FY 2023-24 (₹8,125.60 Cr, 85.4% of BE). FY 2024-25 through FY 2026-27 actuals remain Data Not Available until audited.
            </span>
            <span className="font-mono tabular-nums">Unit: ₹ Crore</span>
          </div>
        </div>
      )}

      {/* TAB 2: Department & Sector Allocation */}
      {chartTab === 'sectors' && (
        <div className="space-y-4">
          {sectorData.hasQuarantined && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[6px] bg-[#B45309]/[0.07] border border-[#B45309]/25 text-xs">
              <div className="flex items-start gap-2.5 text-[#1C2422]">
                <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {sectorData.quarantinedCount} FY 2024-25 PMC departmental sub-heads are quarantined as <em>Partially Verified</em> to prevent double-counting against the ₹11,601 Cr consolidated BE.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIncludeQuarantinedDepts((prev) => !prev)}
                className="h-9 px-3.5 rounded-[6px] bg-white border border-[#E5E0D5] text-xs font-semibold text-[#133429] hover:border-[#B45309]/50 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
              >
                {includeQuarantinedDepts ? 'Hide Quarantined Sub-heads' : 'Overlay Quarantined Sub-heads'}
              </button>
            </div>
          )}

          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sectorData.items}
                layout="vertical"
                margin={{ top: 8, right: 32, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E0D5" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: '#5A6560' }}
                  tickFormatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`}
                  axisLine={{ stroke: '#E5E0D5' }}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 11, fill: '#1C2422', fontWeight: 500 }}
                  width={195}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#FAF8F3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white p-3.5 border border-[#E5E0D5] rounded-[6px] shadow-[0_8px_24px_rgba(19,52,41,0.1)] text-xs space-y-1.5 max-w-xs">
                          <div className="font-semibold text-[#1C2422] leading-snug">
                            {d.fullName}
                          </div>
                          <div className="text-[11px] font-mono text-[#5A6560]">
                            {d.id} · FY {d.year} · {d.status}
                          </div>
                          <div className="pt-1.5 border-t border-[#E5E0D5] flex justify-between gap-4">
                            <span className="text-[#5A6560]">Provision</span>
                            <span className="font-bold font-mono tabular-nums text-[#0E7C74]">
                              {formatCroresPrecise(d.amount)}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4 text-[11px] text-[#5A6560]">
                            <span>INR</span>
                            <span className="font-mono tabular-nums">
                              {formatNormalizedINR(d.normalized)}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={18}>
                  {sectorData.items.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={entry.status === 'Verified' ? '#0E7C74' : '#D97706'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB 3: Revenue Targets & Property Tax Collection */}
      {chartTab === 'revenue' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart A: FY 2025-26 Top Revenue Estimates */}
          <div className="p-5 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-3">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#133429]">
                FY 2025-26 Budgeted Revenue Streams (BE)
              </span>
              <span className="font-mono text-[11px] font-medium text-[#0E7C74] shrink-0">
                PMC Own &amp; Transfers
              </span>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueAnalysis.targets2526}
                  layout="vertical"
                  margin={{ top: 8, right: 20, left: 4, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E0D5" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: '#5A6560' }}
                    tickFormatter={(v) => `₹${v}`}
                    axisLine={{ stroke: '#E5E0D5' }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="label"
                    type="category"
                    width={150}
                    tick={{ fontSize: 11, fill: '#1C2422', fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#FFFFFF' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border border-[#E5E0D5] rounded-[6px] shadow-[0_8px_24px_rgba(19,52,41,0.1)] text-xs space-y-1">
                            <div className="font-semibold text-[#133429]">{d.fullName}</div>
                            <div className="font-mono tabular-nums font-bold text-[#0E7C74]">
                              {formatCroresPrecise(d.amount)}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="amount" fill="#133429" radius={[0, 4, 4, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-[#5A6560] leading-relaxed">
              Building Permissions (₹2,899 Cr), Property Tax (₹2,847 Cr), and State GST Compensation Grant (₹2,700 Cr) drive PMC municipal receipts.
            </p>
          </div>

          {/* Chart B: Property Tax Actuals vs Target (FY 2022-27) */}
          <div className="p-5 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-3">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#133429]">
                PMC Property Tax Collections (Actuals vs Targets)
              </span>
              <span className="font-mono text-[11px] font-medium text-[#0E7C74] shrink-0">
                FY 2022–27
              </span>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueAnalysis.propertyTaxTrend}
                  margin={{ top: 12, right: 16, left: 4, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D5" />
                  <XAxis
                    dataKey="fy"
                    tick={{ fontSize: 10.5, fill: '#1C2422', fontWeight: 500 }}
                    axisLine={{ stroke: '#E5E0D5' }}
                    tickLine={false}
                  />
                  <YAxis
                    width={54}
                    tick={{ fontSize: 11, fill: '#5A6560' }}
                    tickFormatter={(v) => `₹${v}`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#FFFFFF' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border border-[#E5E0D5] rounded-[6px] shadow-[0_8px_24px_rgba(19,52,41,0.1)] text-xs space-y-1">
                            <div className="font-semibold text-[#133429]">
                              {d.fy} · {d.type}
                            </div>
                            <div className="font-mono tabular-nums font-bold text-[#0E7C74]">
                              {formatCroresPrecise(d.amount)}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={36}>
                    <Cell fill="#0E7C74" />
                    <Cell fill="#0E7C74" />
                    <Cell fill="#0E7C74" />
                    <Cell fill="#D97706" />
                    <Cell fill="#133429" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-[#5A6560] leading-relaxed">
              Teal bars show verified actual collections (₹1,963 Cr → ₹2,273 Cr → ₹2,360 Cr); amber &amp; forest bars show BE targets (₹2,847 Cr in FY 25-26; ₹3,152 Cr in FY 26-27).
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
