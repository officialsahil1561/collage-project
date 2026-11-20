import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  BarChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  ArrowRight,
  ExternalLink,
  FileSearch,
  Info,
  TrendingUp
} from 'lucide-react';
import { FiveYearExpenditurePoint, ReconciledRecord } from '../types';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise } from '../utils/formatters';

interface ExpenditureTrendsDashboardProps {
  onSelectRecord?: (record: ReconciledRecord) => void;
  onViewBudgetTracker?: () => void;
}

type TrendViewMode = 'trajectory' | 'growth' | 'composition';

export const ExpenditureTrendsDashboard: React.FC<ExpenditureTrendsDashboardProps> = ({
  onSelectRecord,
  onViewBudgetTracker
}) => {
  const [viewMode, setViewMode] = useState<TrendViewMode>('trajectory');
  const [selectedYear, setSelectedYear] = useState<string>('2026-27');

  const trendData = useMemo<FiveYearExpenditurePoint[]>(
    () => dataProvider.getFiveYearExpenditureTrends(),
    []
  );

  const verifiedRecordsMap = useMemo(() => {
    const map = new Map<string, ReconciledRecord>();
    for (const rec of dataProvider.getVerifiedRecords()) {
      map.set(rec.unique_id, rec);
    }
    return map;
  }, []);

  const summaryMetrics = useMemo(() => {
    if (trendData.length === 0) {
      return {
        firstYearBE: 0,
        latestYearBE: 0,
        fiveYearGrowthPct: 0,
        cumulativeBE: 0,
        latestAuditedPoint: null as FiveYearExpenditurePoint | null,
        unpublishedActualsCount: 0
      };
    }

    const first = trendData[0];
    const latest = trendData[trendData.length - 1];
    const fiveYearGrowthPct =
      first.approvedBudgetBE > 0
        ? Number(
            (((latest.approvedBudgetBE - first.approvedBudgetBE) / first.approvedBudgetBE) * 100).toFixed(
              1
            )
          )
        : 0;
    const cumulativeBE = Number(
      trendData.reduce((acc, item) => acc + item.approvedBudgetBE, 0).toFixed(2)
    );
    const auditedPoints = trendData.filter((d) => d.auditedTotalExpenditure !== null);
    const latestAuditedPoint =
      auditedPoints.length > 0 ? auditedPoints[auditedPoints.length - 1] : null;
    const unpublishedActualsCount = trendData.filter(
      (d) => d.auditedTotalExpenditure === null
    ).length;

    return {
      firstYearBE: first.approvedBudgetBE,
      latestYearBE: latest.approvedBudgetBE,
      fiveYearGrowthPct,
      cumulativeBE,
      latestAuditedPoint,
      unpublishedActualsCount
    };
  }, [trendData]);

  const activePoint = useMemo(
    () => trendData.find((d) => d.financialYear === selectedYear) ?? trendData[trendData.length - 1],
    [trendData, selectedYear]
  );

  const handleInspectRecord = (recordId: string) => {
    if (!onSelectRecord) return;
    const found = verifiedRecordsMap.get(recordId);
    if (found) {
      onSelectRecord(found);
    }
  };

  const viewTabs: Array<{ id: TrendViewMode; label: string }> = [
    { id: 'trajectory', label: 'BE vs Audited Spend' },
    { id: 'growth', label: '5-Yr Outlay Growth' },
    { id: 'composition', label: 'Revenue & Capital Mix' }
  ];

  const renderTooltip = ({
    active,
    payload
  }: {
    active?: boolean;
    payload?: ReadonlyArray<{ payload?: FiveYearExpenditurePoint }>;
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    const d = payload[0]?.payload;
    if (!d) return null;

    return (
      <div className="bg-white p-4 border border-[#E5E0D5] rounded-[6px] shadow-[0_8px_24px_rgba(19,52,41,0.1)] text-xs space-y-2 max-w-[310px]">
        <div className="flex items-center justify-between gap-3 pb-1.5 border-b border-[#E5E0D5]">
          <span className="font-serif text-sm font-semibold text-[#133429]">{d.fyLabel}</span>
          <span className="font-mono text-[10px] text-[#5A6560]">{d.stageLabel}</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#5A6560]">Approved / Proposed BE</span>
            <span className="font-mono tabular-nums font-bold text-[#133429]">
              {formatCroresPrecise(d.approvedBudgetBE)}
            </span>
          </div>

          {d.yoyBudgetGrowthPct !== null && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#5A6560]">YoY Outlay Change</span>
              <span
                className={`font-mono tabular-nums font-semibold ${
                  d.yoyBudgetGrowthPct >= 0 ? 'text-[#0E7C74]' : 'text-[#B45309]'
                }`}
              >
                {d.yoyBudgetGrowthPct >= 0 ? `+${d.yoyBudgetGrowthPct}%` : `${d.yoyBudgetGrowthPct}%`}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <span className="text-[#5A6560]">Audited Total Spend</span>
            <span
              className={`font-mono tabular-nums font-semibold ${
                d.auditedTotalExpenditure !== null ? 'text-[#0E7C74]' : 'text-[#5A6560] italic'
              }`}
            >
              {d.auditedTotalExpenditure !== null
                ? `${formatCroresPrecise(d.auditedTotalExpenditure)} (${d.utilizationPct}%)`
                : 'Data Not Available'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[#5A6560]">Audited Revenue Exp.</span>
            <span
              className={`font-mono tabular-nums font-semibold ${
                d.auditedRevenueExpenditure !== null ? 'text-[#B45309]' : 'text-[#5A6560] italic'
              }`}
            >
              {d.auditedRevenueExpenditure !== null
                ? formatCroresPrecise(d.auditedRevenueExpenditure)
                : 'Data Not Available'}
            </span>
          </div>

          {d.budgetedRevenueExpenditure !== null && d.budgetedCapitalExpenditure !== null && (
            <div className="pt-1.5 border-t border-[#E5E0D5] space-y-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#5A6560]">Proposed Revenue BE</span>
                <span className="font-mono tabular-nums font-medium text-[#133429]">
                  {formatCroresPrecise(d.budgetedRevenueExpenditure)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#5A6560]">Proposed Capital BE</span>
                <span className="font-mono tabular-nums font-medium text-[#0E7C74]">
                  {formatCroresPrecise(d.budgetedCapitalExpenditure)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-1.5 border-t border-[#E5E0D5] text-[11px] text-[#5A6560] leading-snug">
          {d.notes}
        </div>
        <div className="font-mono text-[10px] text-[#5A6560]">
          Records: {d.sourceRecordIds.join(', ')}
        </div>
      </div>
    );
  };

  return (
    <section
      aria-label="5-Year Municipal Expenditure Trends Dashboard"
      className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden"
    >
      {/* Header + View Switcher */}
      <div className="px-6 pt-5 pb-0 border-b border-[#E5E0D5] flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="pb-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0E7C74] uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>5-Year Fiscal Trajectory (FY 2022-23 — FY 2026-27)</span>
          </div>
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#133429] tracking-tight">
            PMC Municipal Expenditure &amp; Budget Outlay Trends
          </h2>
          <p className="text-xs text-[#5A6560]">
            Computed dynamically from {trendData.reduce((s, d) => s + d.sourceRecordIds.length, 0)} verified PMC ledger entries · Approved BE, Audited Actuals, and Revenue/Capital splits kept strictly distinct
          </p>
        </div>

        <div
          role="tablist"
          aria-label="5-year expenditure chart views"
          className="flex items-center gap-6 overflow-x-auto -mb-px"
        >
          {viewTabs.map((tab) => {
            const isActive = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setViewMode(tab.id)}
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

      {/* 4-Column Computed KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E0D5] bg-[#FAF8F3] border-b border-[#E5E0D5]">
        <div className="px-6 py-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            5-Year BE Expansion
          </span>
          <div className="font-mono tabular-nums text-lg font-bold text-[#133429]">
            +{summaryMetrics.fiveYearGrowthPct}%
          </div>
          <p className="text-[11px] text-[#5A6560] font-mono tabular-nums">
            ₹{summaryMetrics.firstYearBE.toLocaleString('en-IN')} Cr → ₹
            {summaryMetrics.latestYearBE.toLocaleString('en-IN')} Cr
          </p>
        </div>

        <div className="px-6 py-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            5-Year Cumulative BE
          </span>
          <div className="font-mono tabular-nums text-lg font-bold text-[#133429]">
            {formatCroresPrecise(summaryMetrics.cumulativeBE)}
          </div>
          <p className="text-[11px] text-[#5A6560]">
            Sum of 5 consolidated PMC annual BE outlays
          </p>
        </div>

        <div className="px-6 py-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Latest Audited Total Spend
          </span>
          <div className="font-mono tabular-nums text-lg font-bold text-[#0E7C74]">
            {summaryMetrics.latestAuditedPoint?.auditedTotalExpenditure !== null &&
            summaryMetrics.latestAuditedPoint?.auditedTotalExpenditure !== undefined
              ? formatCroresPrecise(summaryMetrics.latestAuditedPoint.auditedTotalExpenditure)
              : 'Data Not Available'}
          </div>
          <p className="text-[11px] text-[#5A6560] font-mono tabular-nums">
            {summaryMetrics.latestAuditedPoint
              ? `${summaryMetrics.latestAuditedPoint.fyLabel} · ${summaryMetrics.latestAuditedPoint.utilizationPct}% BE utilized`
              : 'Pending audit'}
          </p>
        </div>

        <div className="px-6 py-4 space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Unpublished Full Actuals
          </span>
          <div className="font-mono tabular-nums text-lg font-bold text-[#B45309]">
            {summaryMetrics.unpublishedActualsCount} of {trendData.length} FYs
          </div>
          <p className="text-[11px] text-[#5A6560]">
            Marked Data Not Available (zero fabrication)
          </p>
        </div>
      </div>

      {/* Main Chart Viewport */}
      <div className="p-6 space-y-5">
        <div className="h-[320px] w-full">
          {viewMode === 'trajectory' && (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={trendData}
                margin={{ top: 14, right: 20, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D5" />
                <XAxis
                  dataKey="fyLabel"
                  tick={{ fontSize: 11, fill: '#1C2422', fontWeight: 600 }}
                  axisLine={{ stroke: '#E5E0D5' }}
                  tickLine={false}
                />
                <YAxis
                  width={68}
                  tick={{ fontSize: 11, fill: '#5A6560' }}
                  tickFormatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip cursor={{ fill: '#FAF8F3' }} content={renderTooltip} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar
                  name="Approved / Proposed Budget (BE)"
                  dataKey="approvedBudgetBE"
                  fill="#133429"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
                <Bar
                  name="Audited Total Actual Expenditure"
                  dataKey="auditedTotalExpenditure"
                  fill="#0E7C74"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
                <Line
                  name="Audited Revenue Expenditure"
                  type="monotone"
                  dataKey="auditedRevenueExpenditure"
                  stroke="#D97706"
                  strokeWidth={2.5}
                  connectNulls={false}
                  dot={{ r: 5, fill: '#D97706', stroke: '#FFFFFF', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#B45309', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}

          {viewMode === 'growth' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendData}
                margin={{ top: 14, right: 20, left: 8, bottom: 8 }}
              >
                <defs>
                  <linearGradient id="pmcBudgetGrowthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0E7C74" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#0E7C74" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D5" />
                <XAxis
                  dataKey="fyLabel"
                  tick={{ fontSize: 11, fill: '#1C2422', fontWeight: 600 }}
                  axisLine={{ stroke: '#E5E0D5' }}
                  tickLine={false}
                />
                <YAxis
                  width={68}
                  domain={[0, 17500]}
                  tick={{ fontSize: 11, fill: '#5A6560' }}
                  tickFormatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip cursor={{ stroke: '#133429', strokeDasharray: '3 3' }} content={renderTooltip} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                {summaryMetrics.firstYearBE > 0 && (
                  <ReferenceLine
                    y={summaryMetrics.firstYearBE}
                    stroke="#5A6560"
                    strokeDasharray="4 4"
                    label={{
                      value: `FY 22-23 Baseline: ₹${summaryMetrics.firstYearBE.toLocaleString('en-IN')} Cr`,
                      position: 'insideTopLeft',
                      fontSize: 10,
                      fill: '#5A6560'
                    }}
                  />
                )}
                <Area
                  name="Approved / Proposed Annual Budget Outlay (₹ Cr)"
                  type="monotone"
                  dataKey="approvedBudgetBE"
                  stroke="#133429"
                  strokeWidth={2.5}
                  fill="url(#pmcBudgetGrowthFill)"
                  dot={{ r: 5, fill: '#0E7C74', stroke: '#FFFFFF', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#133429', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {viewMode === 'composition' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trendData}
                margin={{ top: 14, right: 20, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D5" />
                <XAxis
                  dataKey="fyLabel"
                  tick={{ fontSize: 11, fill: '#1C2422', fontWeight: 600 }}
                  axisLine={{ stroke: '#E5E0D5' }}
                  tickLine={false}
                />
                <YAxis
                  width={68}
                  tick={{ fontSize: 11, fill: '#5A6560' }}
                  tickFormatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip cursor={{ fill: '#FAF8F3' }} content={renderTooltip} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar
                  name="Audited Revenue Expenditure (₹ Cr)"
                  dataKey="auditedRevenueExpenditure"
                  fill="#B45309"
                  radius={[4, 4, 0, 0]}
                  barSize={26}
                />
                <Bar
                  name="Proposed Revenue Expenditure BE (₹ Cr)"
                  dataKey="budgetedRevenueExpenditure"
                  fill="#133429"
                  radius={[4, 4, 0, 0]}
                  barSize={26}
                />
                <Bar
                  name="Proposed Capital Expenditure BE (₹ Cr)"
                  dataKey="budgetedCapitalExpenditure"
                  fill="#0E7C74"
                  radius={[4, 4, 0, 0]}
                  barSize={26}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Interactive Year-by-Year Ledger Strip */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-[#133429]">
              Year-by-Year Verified Outlay &amp; Audit Ledger (Select a year to inspect source)
            </span>
            <span className="font-mono tabular-nums text-[11px] text-[#5A6560]">
              Unit: ₹ Crore
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {trendData.map((point) => {
              const isSelected = activePoint?.financialYear === point.financialYear;
              return (
                <button
                  key={point.financialYear}
                  type="button"
                  onClick={() => setSelectedYear(point.financialYear)}
                  className={`text-left p-3.5 rounded-[6px] border transition-colors duration-150 cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#E8F2EE]/60 border-[#0E7C74]'
                      : 'bg-[#FAF8F3] border-[#E5E0D5] hover:border-[#133429]/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif text-sm font-semibold text-[#133429]">
                      {point.fyLabel}
                    </span>
                    {point.yoyBudgetGrowthPct !== null ? (
                      <span
                        className={`font-mono tabular-nums text-[11px] font-semibold ${
                          point.yoyBudgetGrowthPct >= 0 ? 'text-[#0E7C74]' : 'text-[#B45309]'
                        }`}
                      >
                        {point.yoyBudgetGrowthPct >= 0
                          ? `+${point.yoyBudgetGrowthPct}%`
                          : `${point.yoyBudgetGrowthPct}%`}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-[#5A6560]">Baseline</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="text-[#5A6560]">Budget (BE)</span>
                      <span className="font-mono tabular-nums font-bold text-[#133429]">
                        ₹{point.approvedBudgetBE.toLocaleString('en-IN')} Cr
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2 text-[11px]">
                      <span className="text-[#5A6560]">Audited Spend</span>
                      <span
                        className={`font-mono tabular-nums font-semibold ${
                          point.auditedTotalExpenditure !== null
                            ? 'text-[#0E7C74]'
                            : 'text-[#5A6560] italic font-normal'
                        }`}
                      >
                        {point.auditedTotalExpenditure !== null
                          ? `₹${point.auditedTotalExpenditure.toLocaleString('en-IN')} Cr`
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Year Detail Bar */}
          {activePoint && (
            <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="font-semibold text-[#133429]">{activePoint.fyLabel}</span>
                  <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                  <span className="text-[#0E7C74] font-medium">{activePoint.auditStatus}</span>
                  <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                  <span className="font-mono text-[11px] text-[#5A6560]">
                    {activePoint.sourceRecordIds.join(' · ')}
                  </span>
                </div>
                <p className="text-[#5A6560] leading-relaxed">{activePoint.notes}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {onSelectRecord && activePoint.primaryRecordId && (
                  <button
                    type="button"
                    onClick={() => handleInspectRecord(activePoint.primaryRecordId)}
                    className="h-9 px-3.5 rounded-[6px] bg-white hover:bg-[#E8F2EE] border border-[#E5E0D5] inline-flex items-center gap-1.5 font-semibold text-[#133429] transition-colors cursor-pointer"
                  >
                    <FileSearch className="w-3.5 h-3.5 text-[#0E7C74]" />
                    <span>Inspect {activePoint.primaryRecordId}</span>
                  </button>
                )}
                <a
                  href={activePoint.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3.5 rounded-[6px] bg-white hover:bg-[#E8F2EE] border border-[#E5E0D5] inline-flex items-center gap-1.5 font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors"
                >
                  <span>Primary Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audit & Methodology Footer */}
      <div className="px-6 py-3.5 bg-[#FAF8F3] border-t border-[#E5E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5A6560]">
        <div className="flex items-start sm:items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#0E7C74] shrink-0 mt-0.5 sm:mt-0" />
          <span>
            Superseded Commissioner drafts (FY 22-23 ₹8,592 Cr &amp; FY 26-27 ₹13,995 Cr) are excluded; unpublished audited actuals remain explicitly marked Data Not Available.
          </span>
        </div>
        {onViewBudgetTracker && (
          <button
            type="button"
            onClick={onViewBudgetTracker}
            className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
          >
            <span>Open Annual Budget Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
  );
};
