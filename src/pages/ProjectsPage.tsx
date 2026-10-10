import React, { useState, useMemo } from 'react';
import { Project, MunicipalAuthority } from '../types';
import { formatCroresPrecise } from '../utils/formatters';
import { dataProvider } from '../services/dataProvider';
import { 
  HardHat, 
  Search, 
  ExternalLink, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  SlidersHorizontal,
  X,
  FileText
} from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [selectedAuth, setSelectedAuth] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const authoritiesList = [
    { key: 'All', label: 'All Municipalities' },
    { key: 'Brihanmumbai Municipal Corporation', label: 'Mumbai (BMC)' },
    { key: 'Pune Municipal Corporation', label: 'Pune (PMC)' },
    { key: 'Greater Jaipur Municipal Corporation', label: 'Jaipur Greater' },
    { key: 'Jaipur Heritage Municipal Corporation', label: 'Jaipur Heritage' }
  ];

  const projects = dataProvider.getProjects(selectedAuth).filter(p => {
    // Status filter
    if (statusFilter !== 'All' && p.completionStatus !== statusFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.agency.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.costCategory && p.costCategory.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const activeFiltersCount = (statusFilter !== 'All' ? 1 : 0);

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B3B] tracking-tight">
          Municipal Capital Schemes & Projects
        </h1>
        <p className="text-xs sm:text-sm text-[#142B3B]/70 mt-1">
          Officially recorded capital allocations and major scheme provisions across municipal corporations.
        </p>
      </div>

      {/* Progress Data Integrity Notice */}
      <div className="bg-slate-50 border border-[#142B3B]/10 p-4 rounded-2xl text-xs text-slate-700 space-y-1">
        <div className="flex items-center gap-2 font-bold text-[#142B3B]">
          <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
          <span>Progress & Capital Allocation Integrity Standard</span>
        </div>
        <p className="leading-relaxed">
          Physical progress percentages are shown only when audited engineering reports are explicitly cited in primary official records. In annual municipal budget books, figures represent annual capital allocations (BE/RE), not cumulative expenditure.
        </p>
      </div>

      {/* City Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#142B3B]/60 mr-1">Filter Municipality:</span>
        {authoritiesList.map(auth => {
          const isSelected = selectedAuth === auth.key;
          return (
            <button
              key={auth.key}
              onClick={() => setSelectedAuth(auth.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#142B3B] text-white shadow-xs'
                  : 'bg-white border border-[#142B3B]/15 text-[#142B3B]/70 hover:bg-slate-50'
              }`}
            >
              {auth.label}
            </button>
          );
        })}
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#142B3B]/10 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects, capital schemes, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F9F7] border border-[#142B3B]/15 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-[#142B3B] placeholder-[#142B3B]/40 focus:outline-hidden focus:border-[#0D9488] focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all shadow-2xs shrink-0 ${
              isFilterOpen || activeFiltersCount > 0
                ? 'bg-[#142B3B] text-white border-[#142B3B]'
                : 'bg-white text-[#142B3B] border-[#142B3B]/15 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#0D9488] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

        </div>

        {/* Active Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-500 font-medium">Active:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-[#142B3B] text-xs font-medium border border-slate-200">
              <span>Status: {statusFilter}</span>
              <button onClick={() => setStatusFilter('All')} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
            <button
              onClick={() => setStatusFilter('All')}
              className="text-[11px] font-bold text-[#0D9488] hover:underline ml-1"
            >
              Clear
            </button>
          </div>
        )}

        {/* Popover */}
        {isFilterOpen && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs animate-in fade-in-50 duration-150">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Project Stage / Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setIsFilterOpen(false); }}
                className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-[#142B3B]"
              >
                <option value="All">All Stages</option>
                <option value="Under Execution">Under Execution</option>
                <option value="Tender / Preliminary Execution">Tender / Preliminary Execution</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              onClick={() => { setStatusFilter('All'); setIsFilterOpen(false); }}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Reset
            </button>
          </div>
        )}

      </div>

      {/* Projects List / Honest Empty States */}
      {projects.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#142B3B]/10 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-[#142B3B]">
            No Individual Capital Projects Disaggregated
          </h3>
          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            {selectedAuth === 'Pune Municipal Corporation' ? (
              'Pune Municipal Corporation budget book presents department-level capital totals. Individual capital scheme line items are pending verified schedule citations in primary documents.'
            ) : selectedAuth.includes('Jaipur') ? (
              'Jaipur Municipal Corporation authorities publish high-level accounting sheets. Tender-level capital execution registries are managed separately via the Rajasthan SPPP procurement portal.'
            ) : (
              'No capital schemes match your current search and filter settings.'
            )}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map(proj => (
            <div 
              key={proj.id}
              className="bg-white rounded-2xl border border-[#142B3B]/10 shadow-xs hover:border-[#0D9488]/40 transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider block">
                      {proj.agency}
                    </span>
                    <h2 className="text-base font-bold text-[#142B3B] mt-0.5">
                      {proj.name}
                    </h2>
                    <p className="text-xs text-slate-500">{proj.officialName}</p>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20 shrink-0">
                    {proj.completionStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8F9F7] p-3 rounded-xl border border-[#142B3B]/5">
                  <div>
                    <span className="text-[10px] font-bold text-[#142B3B]/50 uppercase block">
                      Budgeted Outlay
                    </span>
                    <span className="text-lg font-mono font-bold text-[#142B3B] block">
                      {formatCroresPrecise(proj.sanctionedCost)}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate" title={proj.costCategory}>
                      {proj.costCategory}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#142B3B]/50 uppercase block">
                      Physical Progress
                    </span>
                    {proj.physicalProgressPercent !== undefined && proj.physicalProgressPercent !== null ? (
                      <span className="text-lg font-mono font-bold text-[#0D9488] block">
                        {proj.physicalProgressPercent}%
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-amber-700 block py-1">
                        Progress data unavailable
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500 block">
                      Official Engineering Reports
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#142B3B]/80">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{proj.location}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {proj.statusDescription || proj.sourceDocumentTitle}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#142B3B]/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  {proj.id}
                </span>
                <button
                  onClick={() => onSelectProject(proj)}
                  className="px-3 py-1.5 bg-[#0D9488] hover:bg-[#0D9488]/90 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs flex items-center gap-1"
                >
                  <span>Inspect Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
