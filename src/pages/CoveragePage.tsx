import React from 'react';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise } from '../utils/formatters';
import { Building2, ExternalLink, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface CoveragePageProps {
  onSelectAuthority: (authorityKey: string) => void;
  setActiveTab: (tab: string) => void;
}

export const CoveragePage: React.FC<CoveragePageProps> = ({ onSelectAuthority, setActiveTab }) => {
  const authorities = dataProvider.getAllAuthoritySummaries();

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B3B] tracking-tight">
          Municipal Coverage & Authority Profiles
        </h1>
        <p className="text-xs sm:text-sm text-[#142B3B]/70 mt-1">
          Four distinct municipal corporations audited line-by-line with verified primary sources and explicit coverage disclosures.
        </p>
      </div>

      {/* Scope Integrity Notice */}
      <div className="bg-slate-50 border border-[#142B3B]/10 p-4.5 rounded-2xl text-xs text-slate-700 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-[#142B3B]">
          <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
          <span>Independent Municipal Authority Boundary Rule</span>
        </div>
        <p className="leading-relaxed">
          Municipal authorities are distinct, statutory local governments established under State Municipal Acts. We never merge Pune and Mumbai or conflate Greater Jaipur and Jaipur Heritage. Each authority has its own accounting schedules, commissioner statements, and council approvals.
        </p>
      </div>

      {/* 4 Authority Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {authorities.map(auth => (
          <div 
            key={auth.authorityKey}
            className="bg-white rounded-2xl border border-[#142B3B]/10 shadow-xs p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider block">
                    {auth.city} · {auth.stateName}
                  </span>
                  <h2 className="text-lg font-bold text-[#142B3B] mt-0.5">
                    {auth.authorityName}
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20 shrink-0">
                  FY {auth.latestFinancialYear}
                </span>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-3 bg-[#F8F9F7] p-3.5 rounded-xl border border-[#142B3B]/5 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    Latest BE Outlay
                  </span>
                  <span className="text-base font-mono font-bold text-[#142B3B] block mt-0.5">
                    {auth.totalBudgetBE ? formatCroresPrecise(auth.totalBudgetBE) : (auth.auditedActuals ? `Act: ${formatCroresPrecise(auth.auditedActuals)}` : 'Not Published')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    Audit Status
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-emerald-700 font-bold">{auth.verifiedRecordsCount} Verified</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-amber-700 font-bold">{auth.reviewRecordsCount} Review</span>
                  </div>
                </div>
              </div>

              {/* Accounting Scope & Coverage Gaps */}
              <div className="text-xs space-y-2">
                <div>
                  <span className="font-semibold text-slate-600 block">Accounting Scope:</span>
                  <span className="text-slate-800 leading-relaxed block mt-0.5">{auth.accountingScope}</span>
                </div>
                <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/60 text-slate-700 text-[11px] leading-relaxed">
                  <span className="font-bold text-amber-900 block mb-0.5">Documented Coverage Gap:</span>
                  {auth.coverageGaps}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-3 border-t border-[#142B3B]/10 flex items-center justify-between text-xs">
              <a
                href={auth.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#0D9488] flex items-center gap-1 transition-colors"
              >
                <span>Official Document</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => {
                  onSelectAuthority(auth.authorityKey);
                  setActiveTab('overview');
                }}
                className="px-3 py-1.5 bg-[#142B3B] hover:bg-[#142B3B]/90 text-white font-semibold rounded-xl flex items-center gap-1 transition-colors"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
