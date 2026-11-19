import React from 'react';
import { Project } from '../types';
import { formatCroresPrecise } from '../utils/formatters';
import { X, ExternalLink, MapPin, HardHat, AlertCircle, Building2 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0E2920]/65 backdrop-blur-[2px] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[6px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0D5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E5E0D5] flex items-start justify-between bg-[#FAF8F3] sticky top-0 z-10">
          <div className="space-y-1 pr-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono font-semibold text-[#0E7C74]">
                {project.projectCode || project.id}
              </span>
              <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
              <span className="font-semibold text-[#133429]">{project.category}</span>
              <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
              <span className="font-mono tabular-nums text-[#5A6560]">
                FY {project.financialYear}
              </span>
            </div>
            <h2 className="font-serif text-lg font-semibold text-[#133429] leading-snug">
              {project.name}
            </h2>
            <p className="text-xs text-[#5A6560]">{project.officialName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 inline-flex items-center justify-center text-[#5A6560] hover:text-[#133429] rounded-[6px] hover:bg-white transition-colors shrink-0 cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FAF8F3] p-4 rounded-[6px] border border-[#E5E0D5]">
            <div>
              <span className="block text-[11px] font-semibold text-[#5A6560]">
                Approved / Sanctioned Cost
              </span>
              <span className="text-lg font-bold font-mono tabular-nums text-[#133429] block mt-1">
                {formatCroresPrecise(project.sanctionedCost)}
              </span>
              <span className="text-[11px] text-[#5A6560] block mt-0.5">
                {project.costCategory || 'Sanctioned Cost'}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-[#5A6560]">
                Revised Cost / Tender
              </span>
              <span className="text-sm font-bold font-mono tabular-nums text-[#1C2422] block mt-1.5">
                {project.revisedCost !== null && project.revisedCost !== undefined
                  ? formatCroresPrecise(project.revisedCost)
                  : project.tenderAmount !== null && project.tenderAmount !== undefined
                  ? `Tender: ${formatCroresPrecise(project.tenderAmount)}`
                  : 'Data Not Available'}
              </span>
              <span className="text-[11px] text-[#5A6560] block mt-0.5">
                Expenditure:{' '}
                {project.reportedExpenditure !== null && project.reportedExpenditure !== undefined
                  ? formatCroresPrecise(project.reportedExpenditure)
                  : 'Data Not Available'}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-[#5A6560]">
                Execution Status
              </span>
              <span className="text-xs font-semibold text-[#0E7C74] block mt-1.5">
                {project.completionStatus}
              </span>
              <span className="text-[11px] text-[#5A6560] block mt-0.5">
                Completion:{' '}
                {project.actualCompletionDate ||
                  project.expectedCompletionDate ||
                  'Data Not Available'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-3.5 rounded-[6px] border border-[#E5E0D5]">
              <span className="text-[11px] text-[#5A6560] block">Department &amp; Authority</span>
              <span className="font-semibold text-[#1C2422] flex items-center gap-1.5 mt-1">
                <HardHat className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                <span>
                  {project.department} ({project.agency})
                </span>
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-[6px] border border-[#E5E0D5]">
              <span className="text-[11px] text-[#5A6560] block">Location &amp; Ward Coverage</span>
              <span className="font-semibold text-[#1C2422] flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                <span>{project.location}</span>
              </span>
              <span className="text-[11px] text-[#5A6560] block mt-1">{project.wardOrPrabhag}</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-[6px] border border-[#E5E0D5] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] text-[#5A6560] block">Contractor / Execution Agency</span>
              <span className="font-medium text-[#1C2422] flex items-center gap-1.5 mt-1">
                <Building2 className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                <span>{project.contractorInfo || 'Data Not Available'}</span>
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#5A6560] block">Physical Progress %</span>
              <span className="font-semibold text-[#B45309] block mt-1">
                {project.physicalProgressPercent !== null &&
                project.physicalProgressPercent !== undefined
                  ? `${project.physicalProgressPercent}%`
                  : 'Data Not Available (Never inferred from spend)'}
              </span>
            </div>
          </div>

          {project.statusDescription && (
            <div className="bg-[#FAF8F3] p-4 rounded-[6px] border border-[#E5E0D5]">
              <span className="text-[11px] font-semibold text-[#5A6560] block mb-1">
                Documented Scope &amp; Status
              </span>
              <p className="text-[#1C2422] leading-relaxed">{project.statusDescription}</p>
            </div>
          )}

          {project.evidenceLimitations && (
            <div className="bg-[#B45309]/[0.07] border border-[#B45309]/25 p-4 rounded-[6px] space-y-1">
              <span className="font-semibold text-[#B45309] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>Evidence Scope &amp; Data Limitations</span>
              </span>
              <p className="text-[#1C2422] leading-relaxed">{project.evidenceLimitations}</p>
            </div>
          )}

          <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] space-y-2.5">
            <div>
              <span className="text-[11px] text-[#5A6560] block">Primary Source Document</span>
              <span className="font-semibold text-[#133429] mt-0.5 block">
                {project.sourceDocumentTitle}
              </span>
            </div>
            {project.sourcePageOrTable && (
              <div>
                <span className="text-[11px] text-[#5A6560] block">Page / Table Reference</span>
                <span className="text-[#1C2422] mt-0.5 block">{project.sourcePageOrTable}</span>
              </div>
            )}
            <div className="pt-1">
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0E7C74] hover:text-[#133429] font-semibold transition-colors"
              >
                <span>Open Official PMC Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-[#FAF8F3] border-t border-[#E5E0D5] flex items-center justify-between text-xs">
          <span className="text-[#5A6560]">
            Pune Municipal Corporation · Missing metrics marked Data Not Available
          </span>
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
