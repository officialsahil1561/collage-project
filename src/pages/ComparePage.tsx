import React, { useState } from 'react';
import { ReconciledRecord } from '../types';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise, formatPrintedWithUnit } from '../utils/formatters';
import { Scale, AlertTriangle, CheckCircle2, X, Plus, Info } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const verifiedRecords = dataProvider.getVerifiedRecords();
  
  // Default comparable pair: PMC BE 2024-25 vs BMC BE 2024-25 Capital RE
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'PMC_202526_BE_001',
    'BMC_202526_BE_010'
  ]);

  const selectedRecords = selectedIds
    .map(id => verifiedRecords.find(r => r.unique_id === id))
    .filter((r): r is ReconciledRecord => r !== undefined);

  // Check compatibility
  const categories = Array.from(new Set(selectedRecords.map(r => r.financial_category)));
  const isCategoryCompatible = categories.length <= 1;

  const years = Array.from(new Set(selectedRecords.map(r => r.financial_year)));
  const isYearCompatible = years.length <= 1;

  const isStrictlyComparable = isCategoryCompatible && isYearCompatible && selectedRecords.length >= 2;

  const toggleRecord = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B3B] tracking-tight">
          Safe Municipal Record Comparison
        </h1>
        <p className="text-xs sm:text-sm text-[#142B3B]/70 mt-1">
          Compare up to 4 verified financial records with strict category and accounting period validation.
        </p>
      </div>

      {/* Safety Protocol Banner */}
      <div className="bg-slate-50 border border-[#142B3B]/10 p-4.5 rounded-2xl text-xs space-y-1.5 text-slate-700">
        <div className="flex items-center gap-2 font-bold text-[#142B3B]">
          <Scale className="w-4 h-4 text-[#0D9488]" />
          <span>Financial Compatibility Invariance Rule</span>
        </div>
        <p className="leading-relaxed">
          Comparing incompatible categories (e.g. Budget Estimates vs Actuals, or Revenue Receipts vs Capital Expenditure) produces invalid percentages and misleading rankings. Comparison calculations are activated only when records share compatible categories and accounting stages.
        </p>
      </div>

      {/* Select records pool */}
      <div className="bg-white p-5 rounded-2xl border border-[#142B3B]/10 shadow-xs space-y-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Select Verified Records to Compare (Max 4):
        </span>
        <div className="flex flex-wrap gap-2">
          {verifiedRecords.map(rec => {
            const isSelected = selectedIds.includes(rec.unique_id);
            return (
              <button
                key={rec.unique_id}
                onClick={() => toggleRecord(rec.unique_id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-[#142B3B] text-white border-[#142B3B] shadow-2xs font-semibold'
                    : 'bg-[#F8F9F7] text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-mono">{rec.unique_id}</span>
                <span className="mx-1">·</span>
                <span>{rec.city} ({rec.financial_category})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compatibility Status Banner */}
      <div className={`p-4 rounded-xl border text-xs flex items-center gap-2.5 ${
        isStrictlyComparable
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : 'bg-amber-50 border-amber-200 text-amber-900'
      }`}>
        {isStrictlyComparable ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Fully Compatible:</strong> All selected records share identical accounting category ({categories[0]}) and financial year (FY {years[0]}). Direct comparison is mathematically sound.
            </span>
          </>
        ) : (
          <>
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Cross-Category / Multi-Year Selection:</strong> Selected records differ in financial category ({categories.join(' vs ')}) or financial year ({years.join(' vs ')}). Direct ratio calculations and rankings are disabled to avoid misleading comparisons.
            </span>
          </>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedRecords.map(rec => (
          <div 
            key={rec.unique_id}
            className="bg-white rounded-2xl border border-[#142B3B]/10 shadow-xs p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-1">
                <span className="font-mono text-[10px] font-bold text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded">
                  {rec.unique_id}
                </span>
                <button
                  onClick={() => toggleRecord(rec.unique_id)}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#142B3B] leading-tight">
                  {rec.record_or_project_name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{rec.exact_authority}</p>
              </div>

              <div className="bg-[#F8F9F7] p-3 rounded-xl border border-[#142B3B]/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Recorded Amount</span>
                <span className="text-xl font-mono font-bold text-[#142B3B] block mt-0.5">
                  {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-slate-600 border-t border-slate-100 pt-2">
                <div className="flex items-center justify-between">
                  <span>Category:</span>
                  <span className="font-semibold text-slate-900">{rec.financial_category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Period:</span>
                  <span className="font-mono">FY {rec.financial_year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Scope:</span>
                  <span className="truncate max-w-[120px]" title={rec.department_or_sector}>{rec.department_or_sector}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span className="block truncate" title={rec.document_title}>
                {rec.document_title}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
