import React from 'react';
import { Project } from '../types';
import { formatCroresPrecise } from '../utils/formatters';
import { X, ExternalLink, MapPin, HardHat, AlertCircle, FileText, Calendar } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#142B3B]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#142B3B]/10">
        
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-[#142B3B]/10 flex items-start justify-between bg-[#F8F9F7] sticky top-0 z-10">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold border border-[#0D9488]/20">
                Capital Scheme Outlay
              </span>
              <span className="text-xs text-[#142B3B]/60 font-medium">
                {project.cityName} · FY {project.financialYear}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#142B3B]">{project.name}</h2>
            <p className="text-xs text-[#142B3B]/70">{project.officialName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#142B3B]/40 hover:text-[#142B3B] rounded-xl hover:bg-[#142B3B]/5 transition-colors shrink-0"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-7 space-y-6 text-sm">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F8F9F7] p-4 rounded-2xl border border-[#142B3B]/10">
            <div>
              <span className="block text-[10px] font-bold text-[#142B3B]/50 uppercase">Officially Recorded Outlay</span>
              <span className="text-lg font-bold font-mono text-[#142B3B] block">
                {formatCroresPrecise(project.sanctionedCost)}
              </span>
              <span className="text-[10px] text-[#142B3B]/60 block mt-0.5">
                {project.costCategory || 'Capital Outlay'}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-[#142B3B]/50 uppercase">Physical Progress</span>
              <span className="text-xs font-semibold text-slate-600 block mt-1.5">
                {project.physicalProgressPercent !== null && project.physicalProgressPercent !== undefined
                  ? `${project.physicalProgressPercent}%`
                  : 'Progress data unavailable in budget document'}
              </span>
              <span className="text-[10px] text-[#142B3B]/50 block">
                Not inferred from spend
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-[#142B3B]/50 uppercase">Execution Status</span>
              <span className="text-xs font-bold text-[#0D9488] block mt-1.5">
                {project.completionStatus}
              </span>
              <span className="text-[10px] text-[#142B3B]/50 block">
                Target: {project.expectedCompletionDate || 'Multi-year phase'}
              </span>
            </div>
          </div>

          {/* Implementation & Scope */}
          <div className="space-y-3 text-xs">
            <h3 className="text-xs font-bold text-[#142B3B]/50 uppercase tracking-wider">
              Authority & Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#F8F9F7] p-3.5 rounded-xl border border-[#142B3B]/10">
                <span className="text-[#142B3B]/50 block font-semibold">Implementing Authority</span>
                <span className="font-bold text-[#142B3B] flex items-center gap-1.5 mt-0.5">
                  <HardHat className="w-4 h-4 text-[#0D9488]" /> {project.agency}
                </span>
              </div>
              <div className="bg-[#F8F9F7] p-3.5 rounded-xl border border-[#142B3B]/10">
                <span className="text-[#142B3B]/50 block font-semibold">Location / Scope</span>
                <span className="font-bold text-[#142B3B] flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#0D9488]" /> {project.location}
                </span>
              </div>
            </div>

            {project.statusDescription && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-[#142B3B]/10">
                <span className="text-[#142B3B]/50 block font-semibold mb-1">Documented Execution Status</span>
                <p className="text-[#142B3B] leading-relaxed">
                  {project.statusDescription}
                </p>
              </div>
            )}

            {project.evidenceLimitations && (
              <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-xl text-[#142B3B] space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Evidence Scope & Limitation
                </span>
                <p className="leading-relaxed text-slate-700">
                  {project.evidenceLimitations}
                </p>
              </div>
            )}
          </div>

          {/* Primary Source Reference */}
          <div className="pt-4 border-t border-[#142B3B]/10 space-y-3">
            <h3 className="text-xs font-bold text-[#142B3B]/50 uppercase tracking-wider">
              Primary Document Citation
            </h3>

            <div className="bg-[#F8F9F7] p-4 rounded-2xl border border-[#142B3B]/10 space-y-2 text-xs">
              <div>
                <span className="text-[#142B3B]/50 block font-semibold">Source Title</span>
                <span className="font-bold text-[#142B3B]">{project.sourceDocumentTitle}</span>
              </div>
              {project.sourcePageOrTable && (
                <div>
                  <span className="text-[#142B3B]/50 block font-semibold">Schedule / Page Reference</span>
                  <span className="font-medium text-[#142B3B]">{project.sourcePageOrTable}</span>
                </div>
              )}
              <div className="pt-1">
                <a 
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0D9488] font-bold hover:underline"
                >
                  <span>Open Primary Source in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#F8F9F7] border-t border-[#142B3B]/10 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            No inferred progress · Traceable capital allocations
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
