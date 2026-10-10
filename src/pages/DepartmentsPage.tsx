import React, { useState } from 'react';
import { ReconciledRecord, MunicipalAuthority } from '../types';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise, formatPrintedWithUnit } from '../utils/formatters';
import { Building2, AlertTriangle, ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react';

interface DepartmentsPageProps {
  onSelectRecord: (record: ReconciledRecord) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ onSelectRecord }) => {
  const [selectedAuth, setSelectedAuth] = useState<string>('All');

  const departmentalRecords = dataProvider.getDepartmentalRecords(selectedAuth);

  const authorities: MunicipalAuthority[] = [
    'Pune Municipal Corporation',
    'Brihanmumbai Municipal Corporation',
    'Greater Jaipur Municipal Corporation',
    'Jaipur Heritage Municipal Corporation'
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B3B] tracking-tight">
          Municipal Departments & Sector Allocations
        </h1>
        <p className="text-xs sm:text-sm text-[#142B3B]/70 mt-1">
          Audited departmental provisions and sub-heads across municipal authorities.
        </p>
      </div>

      {/* Critical Audit Disclosure Banner */}
      <div className="bg-amber-50 border border-amber-200/80 p-4.5 rounded-2xl text-xs space-y-1.5 text-amber-950 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Departmental Double-Counting Prevention Protocol</span>
        </div>
        <p className="leading-relaxed text-slate-700">
          To prevent double-counting expenditure against the consolidated baseline municipal budget, departmental sub-head allocations must have verified, independent budget schedule citations. The 7 Pune departmental line-items (Water, Roads, Waste, Drainage, Health, Education, Parks) are quarantined in the review dataset until their printed ward schedule references are confirmed.
        </p>
      </div>

      {/* Filter by Authority */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#142B3B]/10 w-fit">
        <span className="text-xs font-semibold text-slate-500 pl-2">Filter Authority:</span>
        <select
          value={selectedAuth}
          onChange={(e) => setSelectedAuth(e.target.value)}
          className="text-xs font-bold text-[#142B3B] bg-transparent focus:outline-hidden pr-2 cursor-pointer"
        >
          <option value="All">All Authorities</option>
          {authorities.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Departmental Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departmentalRecords.map(rec => {
          const isVerified = rec.verification_status === 'Verified';
          return (
            <div 
              key={rec.unique_id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isVerified
                  ? 'bg-white border-[#142B3B]/10 hover:border-[#0D9488]/40 shadow-xs'
                  : 'bg-amber-50/30 border-amber-200 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] font-bold text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded">
                      {rec.unique_id}
                    </span>
                    <h3 className="font-bold text-sm text-[#142B3B] mt-1">
                      {rec.record_or_project_name}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    isVerified
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-100/70 text-amber-900 border-amber-300'
                  }`}>
                    {rec.verification_status}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Authority:</span>
                    <span className="font-semibold text-[#142B3B] truncate max-w-[180px]">{rec.exact_authority}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Sector / Wing:</span>
                    <span className="font-semibold text-[#142B3B]">{rec.department_or_sector}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Reporting Period:</span>
                    <span className="font-mono">{rec.financial_category} · FY {rec.financial_year}</span>
                  </div>
                </div>

                <div className="bg-[#F8F9F7] p-3 rounded-xl border border-[#142B3B]/5">
                  <span className="text-[10px] font-bold text-[#142B3B]/50 uppercase tracking-wider block">
                    Recorded Allocation
                  </span>
                  <div className="text-xl font-mono font-bold text-[#142B3B] mt-0.5">
                    {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                  </div>
                </div>

                {rec.reason_for_quarantine && (
                  <div className="text-[11px] text-amber-900 bg-amber-100/50 p-2.5 rounded-lg border border-amber-200 leading-relaxed">
                    <span className="font-bold">Quarantine Note:</span> {rec.reason_for_quarantine}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-[#142B3B]/5 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 truncate max-w-[170px]" title={rec.document_title}>
                  {rec.page_or_table_ref}
                </span>
                <button
                  onClick={() => onSelectRecord(rec)}
                  className="px-3 py-1 bg-[#0D9488]/10 hover:bg-[#0D9488]/20 text-[#0D9488] font-bold rounded-lg transition-colors"
                >
                  Inspect Evidence
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
