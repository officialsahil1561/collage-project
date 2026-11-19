import React from 'react';
import { ReconciledRecord } from '../types';
import { formatNormalizedINR, formatPrintedWithUnit } from '../utils/formatters';
import { X, ExternalLink, Building2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface RecordDetailModalProps {
  record: ReconciledRecord | null;
  onClose: () => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  const isVerified = record.verification_status === 'Verified';
  const isQuarantined =
    record.verification_status === 'Partially Verified' ||
    record.verification_status === 'Unverified';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0E2920]/65 backdrop-blur-[2px] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[6px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0D5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E0D5] flex items-start justify-between bg-[#FAF8F3] sticky top-0 z-10">
          <div className="space-y-1 pr-4 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono font-semibold text-[#0E7C74]">{record.unique_id}</span>
              <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
              <span
                className={`inline-flex items-center gap-1 font-semibold ${
                  isVerified
                    ? 'text-[#0E7C74]'
                    : isQuarantined
                    ? 'text-[#B45309]'
                    : 'text-rose-700'
                }`}
              >
                {isVerified ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                )}
                <span>{record.verification_status}</span>
              </span>
              <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
              <span className="font-mono tabular-nums text-[#5A6560]">
                FY {record.financial_year}
              </span>
            </div>
            <h2 className="font-serif text-lg font-semibold text-[#133429] leading-snug">
              {record.record_or_project_name}
            </h2>
            <div className="text-xs text-[#5A6560] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
              <span>{record.exact_authority} · {record.source_classification}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 inline-flex items-center justify-center text-[#5A6560] hover:text-[#133429] rounded-[6px] hover:bg-white transition-colors shrink-0 cursor-pointer"
            aria-label="Close record modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          <div className="bg-[#FAF8F3] p-4 rounded-[6px] border border-[#E5E0D5] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-[11px] font-semibold text-[#5A6560]">
                Amount Printed in Document
              </span>
              <span className="text-xl font-bold font-mono tabular-nums text-[#133429] block mt-1">
                {formatPrintedWithUnit(record.amount_as_printed, record.original_unit)}
              </span>
              <span className="text-[11px] text-[#5A6560] block mt-0.5">
                {record.financial_category}
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-[#5A6560]">
                Normalized Currency (₹1 Cr = 10⁷ INR)
              </span>
              <span className="text-lg font-bold font-mono tabular-nums text-[#0E7C74] block mt-1">
                {formatNormalizedINR(record.normalized_inr_unit)}
              </span>
              <span className="text-[11px] text-[#5A6560] block mt-0.5">
                {record.source_classification}
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-[6px] border space-y-1.5 ${
              record.aggregation_eligible
                ? 'bg-[#E8F2EE] border-[#0E7C74]/25 text-[#1C2422]'
                : 'bg-[#B45309]/[0.08] border-[#B45309]/25 text-[#1C2422]'
            }`}
          >
            <div className="flex items-center gap-1.5 font-semibold">
              {record.aggregation_eligible ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#0E7C74] shrink-0" />
                  <span className="text-[#0E7C74]">Aggregation Eligible (Active Verified PMC Record)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span className="text-[#B45309]">Quarantined / Excluded from Active Aggregates</span>
                </>
              )}
            </div>
            {record.exclusion_reason && (
              <p className="text-[#5A6560] leading-relaxed">
                <strong className="text-[#1C2422]">Exclusion Note:</strong> {record.exclusion_reason}
              </p>
            )}
            {record.reason_for_quarantine && (
              <p className="text-[#5A6560] leading-relaxed">
                <strong className="text-[#1C2422]">Audit Detail:</strong>{' '}
                {record.reason_for_quarantine}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-[6px] border border-[#E5E0D5] bg-white">
              <span className="text-[11px] text-[#5A6560] block">Department / Sector</span>
              <span className="font-semibold text-[#1C2422] block mt-1">
                {record.department_or_sector}
              </span>
            </div>
            <div className="p-3.5 rounded-[6px] border border-[#E5E0D5] bg-white">
              <span className="text-[11px] text-[#5A6560] block">Record Type</span>
              <span className="font-semibold text-[#1C2422] block mt-1">{record.record_type}</span>
            </div>
            <div className="p-3.5 rounded-[6px] border border-[#E5E0D5] bg-white">
              <span className="text-[11px] text-[#5A6560] block">Source Classification</span>
              <span className="font-semibold text-[#0E7C74] block mt-1">
                {record.source_classification}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3]">
            <span className="text-[11px] font-semibold text-[#5A6560] block mb-1">
              Extraction Note
            </span>
            <p className="text-[#1C2422] leading-relaxed">{record.extraction_note}</p>
          </div>

          <div className="p-4 rounded-[6px] border border-[#E5E0D5] bg-white space-y-3">
            <div>
              <span className="text-[11px] text-[#5A6560] block">Primary Source Document</span>
              <span className="font-semibold text-[#133429] text-sm block mt-0.5">
                {record.document_title}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E5E0D5] text-[11px]">
              <div>
                <span className="text-[#5A6560] block">Page / Table Ref</span>
                <span className="font-medium text-[#1C2422] mt-0.5 block">
                  {record.page_or_table_ref}
                </span>
              </div>
              <div>
                <span className="text-[#5A6560] block">Publication Date</span>
                <span className="font-mono tabular-nums text-[#1C2422] mt-0.5 block">
                  {record.publication_date || 'Data Not Available'}
                </span>
              </div>
              <div>
                <span className="text-[#5A6560] block">Retrieved</span>
                <span className="font-mono tabular-nums text-[#1C2422] mt-0.5 block">
                  {record.date_accessed}
                </span>
              </div>
            </div>
            <div className="pt-1">
              <a
                href={record.official_document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0E7C74] hover:text-[#133429] font-semibold transition-colors"
              >
                <span>Open Primary Source Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-[#FAF8F3] border-t border-[#E5E0D5] flex items-center justify-between text-xs">
          <span className="text-[#5A6560]">Pune Municipal Corporation · Traceable Record</span>
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] rounded-[6px] font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
