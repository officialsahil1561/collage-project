import React from 'react';
import { AuthoritySummary } from '../types';
import { formatCroresPrecise } from '../utils/formatters';
import {
  Building2,
  Wallet,
  Scale,
  PieChart,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface StatsCardsProps {
  summary: AuthoritySummary;
  onViewBudget?: () => void;
  onViewRevenue?: () => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  summary,
  onViewBudget,
  onViewRevenue
}) => {
  const comparableRemaining2324 = 9515.0 - summary.auditedActualExpenditure; // ₹1,389.40 Cr (FY 23-24 BE ₹9,515 Cr vs Actual ₹8,125.60 Cr)
  const revenuePct = ((summary.revenueBudgetBE / summary.totalBudgetBE) * 100).toFixed(1);
  const capitalPct = ((summary.capitalBudgetBE / summary.totalBudgetBE) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* CARD 1 — Total Approved Budget (FY 2025-26 BE) */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] hover:border-[#133429]/35 transition-colors duration-150 flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <span className="text-[11px] font-semibold tracking-wide text-[#5A6560] uppercase block">
              Approved Budget (BE)
            </span>
            <div className="text-[24px] leading-tight font-bold font-mono tabular-nums tracking-tight text-[#133429]">
              {formatCroresPrecise(summary.totalBudgetBE)}
            </div>
          </div>
          <div className="w-9 h-9 rounded-[6px] bg-[#E8F2EE] text-[#0E7C74] flex items-center justify-center shrink-0">
            <Building2 className="w-[18px] h-[18px]" />
          </div>
        </div>

        <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between gap-2 text-xs">
          <span className="font-mono tabular-nums text-[#5A6560]">
            FY {summary.latestFinancialYear} · +8.8% YoY
          </span>
          {onViewBudget ? (
            <button
              type="button"
              onClick={onViewBudget}
              className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors cursor-pointer"
            >
              <span>Tracker</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <span className="font-medium text-[#0E7C74]">Official BE</span>
          )}
        </div>
      </div>

      {/* CARD 2 — Audited Actual Expenditure (FY 2023-24) */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] hover:border-[#133429]/35 transition-colors duration-150 flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <span className="text-[11px] font-semibold tracking-wide text-[#5A6560] uppercase block">
              Audited Actual Spend
            </span>
            <div className="text-[24px] leading-tight font-bold font-mono tabular-nums tracking-tight text-[#0E7C74]">
              {formatCroresPrecise(summary.auditedActualExpenditure)}
            </div>
          </div>
          <div className="w-9 h-9 rounded-[6px] bg-[#E8F2EE] text-[#0E7C74] flex items-center justify-center shrink-0">
            <Wallet className="w-[18px] h-[18px]" />
          </div>
        </div>

        <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between gap-2 text-xs">
          <span className="font-mono tabular-nums text-[#5A6560]">
            FY {summary.auditedActualExpenditureFY} (Latest Audited)
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#0E7C74]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Audited</span>
          </span>
        </div>
      </div>

      {/* CARD 3 — Comparable Remaining Budget (FY 2023-24 BE vs Actual) */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] hover:border-[#133429]/35 transition-colors duration-150 flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <span className="text-[11px] font-semibold tracking-wide text-[#5A6560] uppercase block">
              Unspent Gap (FY 23-24)
            </span>
            <div className="text-[24px] leading-tight font-bold font-mono tabular-nums tracking-tight text-[#133429]">
              {formatCroresPrecise(comparableRemaining2324)}
            </div>
          </div>
          <div className="w-9 h-9 rounded-[6px] bg-[#B45309]/10 text-[#B45309] flex items-center justify-center shrink-0">
            <Scale className="w-[18px] h-[18px]" />
          </div>
        </div>

        <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between gap-2 text-xs">
          <span className="font-mono tabular-nums text-[#5A6560]">
            85.4% of ₹9,515 Cr BE
          </span>
          <span className="font-medium text-[#B45309]">24-25/25-26: N/A</span>
        </div>
      </div>

      {/* CARD 4 — Revenue vs Capital Split (FY 2025-26 BE) */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] hover:border-[#133429]/35 transition-colors duration-150 flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <span className="text-[11px] font-semibold tracking-wide text-[#5A6560] uppercase block">
              Revenue / Capital Split
            </span>
            <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
              <span className="text-[20px] leading-tight font-bold text-[#133429]">
                {revenuePct}%
              </span>
              <span className="text-xs text-[#5A6560]">/</span>
              <span className="text-[20px] leading-tight font-bold text-[#0E7C74]">
                {capitalPct}%
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-[6px] bg-[#FAF8F3] text-[#133429] flex items-center justify-center shrink-0 border border-[#E5E0D5]">
            <PieChart className="w-[18px] h-[18px]" />
          </div>
        </div>

        <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between gap-2 text-xs">
          <span className="font-mono tabular-nums text-[#5A6560] truncate">
            ₹7,093 Cr Rev · ₹5,524 Cr Cap
          </span>
          {onViewRevenue && (
            <button
              type="button"
              onClick={onViewRevenue}
              className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors cursor-pointer shrink-0"
            >
              <span>Receipts</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
