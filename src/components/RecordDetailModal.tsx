import React from 'react';
import { ReconciledRecord } from '../types';
import { formatCroresPrecise, formatNormalizedINR, formatPrintedWithUnit } from '../utils/formatters';
import { X, ExternalLink, ShieldCheck, AlertCircle, Building2, Calendar, FileText, CheckCircle2, AlertTriangle, Ban } from 'lucide-react';

interface RecordDetailModalProps {
  record: ReconciledRecord | null;
  onClose: () => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  const isVerified = record.verification_status === 'Verified';
  const isQuarantined = record.verification_status === 'Partially Verified' || record.verification_status === 'Unverified';
  const isExcluded = record.verification_status === 'Rejected / Reclassified' || record.verification_status === 'Rejected / Subsumed';

  return (
    <div className="fixed inset-0 z-50 bg-[#142B3B]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#142B3B]/10">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-[#142B3B]/10 flex items-start justify-between bg-[#F8F9F7] sticky top-0 z-10">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#0D9488] bg-[#0D9488]/10 px-2.5 py-0.5 rounded-md border border-[#0D9488]/20">
                {record.unique_id}
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                isVerified 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : isQuarantined
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {record.verification_status}
              </span>
              <span className="text-xs text-[#142B3B]/60 font-medium">
                FY {record.financial_year}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#142B3B] leading-tight">
              {record.record_or_project_name}
            </h2>
            <div className="text-xs text-[#142B3B]/80 font-medium flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{record.exact_authority}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#142B3B]/40 hover:text-[#142B3B] rounded-xl hover:bg-[#142B3B]/5 transition-colors shrink-0"
            aria-label="Close record modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 text-sm">
          
          {/* Financial Amounts Display */}
          <div className="bg-[#F8F9F7] p-4.5 rounded-2xl border border-[#142B3B]/10 space-y-3">
            <div className="text-[11px] font-bold text-[#142B3B]/50 uppercase tracking-wider">
              Financial Metric & Normalized INR
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-[#142B3B]/60 font-medium">Amount Printed in Document</span>
                <span className="text-2xl font-bold font-mono text-[#142B3B] block">
                  {formatPrintedWithUnit(record.amount_as_printed, record.original_unit)}
                </span>
                <span className="text-[11px] text-[#142B3B]/50 block">
                  Accounting Category: {record.financial_category}
                </span>
              </div>
              <div>
                <span className="block text-xs text-[#142B3B]/60 font-medium">Normalized Currency (₹1 Cr = 10⁷ INR)</span>
                <span className="text-xl font-bold font-mono text-[#0D9488] block">
                  {formatNormalizedINR(record.normalized_inr_unit)}
                </span>
                <span className="text-[11px] text-[#142B3B]/50 block">
                  Programmatically verified calculation
                </span>
              </div>
            </div>
          </div>

          {/* Aggregation & Audit Status Card */}
          <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
            record.aggregation_eligible
              ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {record.aggregation_eligible ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Aggregation Eligible (Active Verified)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Quarantined / Excluded from Active Aggregates</span>
                </>
              )}
            </div>
            {record.exclusion_reason && (
              <p className="leading-relaxed text-slate-700">
                <span className="font-semibold">Exclusion Note:</span> {record.exclusion_reason}
              </p>
            )}
            {record.reason_for_quarantine && (
              <p className="leading-relaxed text-slate-700">
                <span className="font-semibold">Audit Review Detail:</span> {record.reason_for_quarantine}
              </p>
            )}
          </div>

          {/* Classification Metadata */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#142B3B]/50 uppercase tracking-wider">
              Classification & Departmental Scope
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F8F9F7] p-3.5 rounded-xl border border-[#142B3B]/10">
                <span className="text-[#142B3B]/50 block font-semibold">Department / Sector</span>
                <span className="font-bold text-[#142B3B] block mt-0.5">
                  {record.department_or_sector}
                </span>
              </div>
              <div className="bg-[#F8F9F7] p-3.5 rounded-xl border border-[#142B3B]/10">
                <span className="text-[#142B3B]/50 block font-semibold">Record Type</span>
                <span className="font-bold text-[#142B3B] block mt-0.5">
                  {record.record_type}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-[#142B3B]/10 text-xs">
              <span className="text-[#142B3B]/50 block font-semibold mb-1">Extraction Note & Line-Item Context</span>
              <p className="text-[#142B3B] leading-relaxed">
                {record.extraction_note}
              </p>
            </div>
          </div>

          {/* Official Document Provenance */}
          <div className="pt-4 border-t border-[#142B3B]/10 space-y-3">
            <h3 className="text-xs font-bold text-[#142B3B]/50 uppercase tracking-wider">
              Primary Document Provenance & Citation
            </h3>

            <div className="bg-[#F8F9F7] p-4 rounded-2xl border border-[#142B3B]/10 space-y-3 text-xs">
              <div>
                <span className="text-[#142B3B]/50 block font-semibold">Document Title</span>
                <span className="font-bold text-[#142B3B] text-sm block mt-0.5">
                  {record.document_title}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#142B3B]/10 text-[11px]">
                <div>
                  <span className="text-[#142B3B]/50 block font-medium">Page / Table Ref</span>
                  <span className="font-semibold text-[#142B3B]">{record.page_or_table_ref}</span>
                </div>
                <div>
                  <span className="text-[#142B3B]/50 block font-medium">Publication Date</span>
                  <span className="font-semibold text-[#142B3B]">{record.publication_date || 'Document Undated'}</span>
                </div>
                <div>
                  <span className="text-[#142B3B]/50 block font-medium">Audit Retrieval Date</span>
                  <span className="font-semibold text-[#142B3B]">{record.date_accessed}</span>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={record.official_document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0D9488] font-bold hover:underline"
                >
                  <span>Open Primary Source Document in External Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#F8F9F7] border-t border-[#142B3B]/10 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            JanDhan Insights · Traceable Municipal Data Audit
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#142B3B] text-white rounded-xl font-medium hover:bg-[#142B3B]/90 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
