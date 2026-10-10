import React, { useState } from 'react';
import { ReconciledRecord, Project } from '../types';
import { Search, X, HardHat, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { formatPrintedWithUnit } from '../utils/formatters';
import { dataProvider } from '../services/dataProvider';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord: (record: ReconciledRecord) => void;
  onSelectProject: (project: Project) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectRecord,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');
  if (!isOpen) return null;

  const records = query.trim() ? dataProvider.getFilteredRecords({
    searchQuery: query,
    includeReview: true
  }) : [];

  const projects = query.trim() ? dataProvider.getProjects().filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.agency.toLowerCase().includes(query.toLowerCase()) ||
    p.cityName.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#142B3B]/60 backdrop-blur-xs flex items-start justify-center p-4 pt-20 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#142B3B]/10 overflow-hidden">
        
        {/* Search Input Header */}
        <div className="p-4 border-b border-[#142B3B]/10 flex items-center gap-3 bg-[#F8F9F7]">
          <Search className="w-5 h-5 text-[#0D9488] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search Pune, BMC, Jaipur Greater, Heritage, Roads, Water..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[#142B3B] placeholder-[#142B3B]/40 text-sm focus:outline-hidden"
          />
          <button 
            onClick={onClose}
            className="p-1.5 text-[#142B3B]/40 hover:text-[#142B3B] rounded-xl hover:bg-[#142B3B]/5 transition-colors"
            aria-label="Close search modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-xs text-[#142B3B]/50">
              Type keywords to search all 30 audited municipal finance records and projects across PMC, BMC, and Jaipur.
            </div>
          ) : (records.length === 0 && projects.length === 0) ? (
            <div className="text-center py-8 text-xs text-[#142B3B]/60">
              No matching records found for "{query}".
            </div>
          ) : (
            <div className="space-y-4">
              {/* Projects section */}
              {projects.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider block px-1">
                    Documented Capital Schemes ({projects.length})
                  </span>
                  {projects.map(proj => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        onSelectProject(proj);
                        onClose();
                      }}
                      className="p-3 bg-[#F8F9F7] hover:bg-[#0D9488]/10 border border-[#142B3B]/10 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="flex items-center gap-2">
                          <HardHat className="w-3.5 h-3.5 text-[#0D9488]" />
                          <span className="text-xs font-bold text-[#142B3B]">{proj.name}</span>
                        </div>
                        <p className="text-[11px] text-[#142B3B]/60">{proj.agency} · FY {proj.financialYear}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block font-mono font-bold text-[#142B3B] text-xs">
                          ₹{proj.sanctionedCost.toLocaleString('en-IN')} Cr
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold">Verified Outlay</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Records section */}
              {records.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#142B3B]/50 uppercase tracking-wider block px-1">
                    Municipal Financial Records ({records.length})
                  </span>
                  {records.map(rec => {
                    const isVerified = rec.verification_status === 'Verified';
                    return (
                      <div
                        key={rec.unique_id}
                        onClick={() => {
                          onSelectRecord(rec);
                          onClose();
                        }}
                        className="p-3 bg-white hover:bg-slate-50 border border-[#142B3B]/10 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-[#0D9488] bg-[#0D9488]/10 px-1.5 py-0.2 rounded">
                              {rec.unique_id}
                            </span>
                            <span className="text-xs font-bold text-[#142B3B]">{rec.record_or_project_name}</span>
                          </div>
                          <p className="text-[11px] text-[#142B3B]/60">
                            {rec.exact_authority} · {rec.financial_category} · FY {rec.financial_year}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block font-mono font-bold text-[#142B3B] text-xs">
                            {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                          </span>
                          <span className={`text-[10px] font-semibold flex items-center justify-end gap-1 ${
                            isVerified ? 'text-emerald-700' : 'text-amber-700'
                          }`}>
                            {isVerified ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                            )}
                            {rec.verification_status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
