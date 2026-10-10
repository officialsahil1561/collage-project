import React from 'react';
import { AuthoritySummary } from '../types';
import { formatCroresPrecise } from '../utils/formatters';
import { Wallet, AlertCircle, HardHat, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

interface StatsCardsProps {
  summary: AuthoritySummary;
  onViewProjects?: () => void;
  onViewReviewRecords?: () => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ 
  summary, 
  onViewProjects,
  onViewReviewRecords 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      
      {/* 1. Budgeted Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#142B3B]/10 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[#142B3B]/60 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Budgeted</span>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#0D9488]/10 text-[#0D9488] rounded-md border border-[#0D9488]/20">
              FY {summary.latestFinancialYear}
            </span>
          </div>
          {summary.totalBudgetBE !== null && summary.totalBudgetBE !== undefined ? (
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#142B3B]">
              {formatCroresPrecise(summary.totalBudgetBE)}
            </div>
          ) : (
            <div className="text-sm font-semibold text-slate-500 py-1">
              Budget Estimate not available in sourced records
            </div>
          )}
          <p className="text-xs text-[#142B3B]/70 mt-1.5 leading-relaxed">
            Budget Estimate (BE) for {summary.authorityName}.
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-[#142B3B]/5 flex items-center justify-between text-[11px] text-[#142B3B]/60">
          <span className="truncate max-w-[200px]">{summary.accountingScope}</span>
          <span className="font-semibold text-[#0D9488] shrink-0">Official Outlay</span>
        </div>
      </div>

      {/* 2. Actually Spent / Audited Actuals Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#142B3B]/10 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[#142B3B]/60 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Actually Spent</span>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
              Audited Accounts
            </span>
          </div>
          {summary.auditedActuals !== null && summary.auditedActuals !== undefined ? (
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800">
                {formatCroresPrecise(summary.auditedActuals)}
              </div>
              <p className="text-xs text-[#142B3B]/70 mt-1.5 leading-relaxed">
                Audited actual disbursements sourced from official accounts.
              </p>
            </div>
          ) : (
            <div>
              <div className="text-sm font-semibold text-amber-900 flex items-center gap-1.5 py-1">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Actual expenditure not available in the sourced records</span>
              </div>
              <p className="text-xs text-[#142B3B]/70 mt-1.5 leading-relaxed">
                Budget documents report BE/RE. Audited accounts published separately.
              </p>
            </div>
          )}
        </div>
        <div className="mt-3 pt-2.5 border-t border-[#142B3B]/5 flex items-center justify-between text-[11px] text-[#142B3B]/60">
          <span>Reporting Stage: Actual Outlay</span>
          <span className={summary.auditedActuals ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
            {summary.auditedActuals ? 'Audited Final' : 'Pending Audit'}
          </span>
        </div>
      </div>

      {/* 3. Public Projects / Capital Works Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#142B3B]/10 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[#142B3B]/60 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Public Projects</span>
            <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#142B3B]/5 text-[#142B3B] rounded-md">
              Capital Schemes
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#142B3B] flex items-baseline gap-2">
            <span>
              {summary.authorityKey === 'mumbai-bmc' ? '2' : '0'}
            </span>
            <span className="text-xs font-sans font-medium text-[#142B3B]/60">
              {summary.authorityKey === 'mumbai-bmc' ? 'major capital schemes verified' : 'individual schemes in sheet'}
            </span>
          </div>
          <p className="text-xs text-[#142B3B]/70 mt-1.5 leading-relaxed">
            {summary.authorityKey === 'mumbai-bmc'
              ? 'Documented capital allocations for Coastal Road & GMLR Twin Tunnels.'
              : `Authority publishes accounting-head budget sheets; tender-level contract registries are not disaggregated.`}
          </p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-[#142B3B]/5 flex items-center justify-between text-[11px]">
          {summary.authorityKey === 'mumbai-bmc' && onViewProjects ? (
            <button 
              onClick={onViewProjects}
              className="text-[#0D9488] font-bold hover:underline flex items-center gap-1"
            >
              <span>Inspect Capital Schemes</span>
              <HardHat className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-slate-400 italic">No disaggregated contracts</span>
          )}
          <span className="text-slate-500 font-medium">
            {summary.verifiedRecordsCount} active records
          </span>
        </div>
      </div>

    </div>
  );
};
