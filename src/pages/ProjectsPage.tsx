import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { formatCroresPrecise } from '../utils/formatters';
import { dataProvider } from '../services/dataProvider';
import {
  Search,
  MapPin,
  ShieldCheck,
  AlertCircle,
  X,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const categoriesList: Array<{ key: 'All' | ProjectCategory; label: string }> = [
    { key: 'All', label: 'All Categories' },
    { key: 'Road Construction & Repairs', label: 'Roads' },
    { key: 'Bridges & Flyovers', label: 'Bridges & Flyovers' },
    { key: 'Water Supply', label: 'Water Supply' },
    { key: 'Drainage & Sewage', label: 'Drainage & Sewage' },
    { key: 'Public Hospitals', label: 'Public Hospitals' },
    { key: 'Schools & Educational Infrastructure', label: 'Schools' },
    { key: 'Public Transport & Civic Infrastructure', label: 'Civic & Riverfront' }
  ];

  const projects = dataProvider.getProjects(selectedCategory).filter((p) => {
    if (statusFilter !== 'All' && p.completionStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.officialName.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.wardOrPrabhag.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Data Integrity Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-xs sm:text-sm text-[#5A6560]">
          Pune Municipal Corporation (PMC) Public Project Tracker across core civic infrastructure categories.
        </p>
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0E7C74] shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>Missing expenditure &amp; completion dates marked Data Not Available</span>
        </div>
      </div>

      {/* Category Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] space-y-3">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px]">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`h-7 px-3 rounded-[4px] text-xs whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                    : 'text-[#5A6560] hover:text-[#133429] font-medium'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search PMC projects, wards, departments, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] pl-9 pr-8 text-xs text-[#1C2422] placeholder-[#5A6560] focus:outline-hidden focus:border-[#0E7C74] focus:bg-white transition-colors duration-150"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#5A6560] hover:text-[#1C2422] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            aria-label="Filter by project status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] px-3 text-xs font-semibold text-[#1C2422] focus:outline-hidden focus:border-[#0E7C74] cursor-pointer shrink-0"
          >
            <option value="All">All Statuses</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Operational / Completed">Operational / Completed</option>
            <option value="Approved in Budget">Approved in Budget</option>
            <option value="Tender Stage">Tender Stage</option>
          </select>
        </div>
      </div>

      {/* Project List or Category Empty Disclosure */}
      {projects.length === 0 ? (
        <div className="bg-white p-10 rounded-[6px] border border-[#E5E0D5] text-center space-y-2.5">
          <AlertCircle className="w-6 h-6 text-[#D97706] mx-auto" />
          <h2 className="font-serif text-base font-semibold text-[#133429]">
            No Standalone Project Record in Current Filter
          </h2>
          <p className="text-xs text-[#5A6560] max-w-lg mx-auto leading-relaxed">
            Annual departmental budgets (e.g., Roads ₹1,420 Cr quarantined sub-head) are never treated as individual project costs. Road resurfacing &amp; footpath works are tracked inside PMC&apos;s ward-level engineering registers and MahaTenders.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[6px] border border-[#E5E0D5] divide-y divide-[#E5E0D5] overflow-hidden">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-5 hover:bg-[#FAF8F3] transition-colors duration-150"
            >
              {/* Left Info */}
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-[#0E7C74]">
                    {proj.projectCode || proj.id}
                  </span>
                  <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                  <span className="font-semibold text-[#133429]">{proj.category}</span>
                  <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                  <span className="text-[#5A6560]">{proj.department}</span>
                  <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                  <span className="font-medium text-[#0E7C74]">{proj.completionStatus}</span>
                </div>

                <h2 className="font-serif text-base font-semibold text-[#133429] leading-snug">
                  {proj.name}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5A6560]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                    <span>{proj.location}</span>
                  </span>
                  <span>
                    Completion Date:{' '}
                    <strong className="text-[#1C2422] font-medium">
                      {proj.actualCompletionDate ||
                        proj.expectedCompletionDate ||
                        'Data Not Available'}
                    </strong>
                  </span>
                  <a
                    href={proj.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#0E7C74] hover:text-[#133429] font-semibold"
                  >
                    <span>Source Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Right Cost Breakdown + Action */}
              <div className="grid grid-cols-3 xl:flex items-center gap-4 sm:gap-6 pt-3 xl:pt-0 border-t xl:border-t-0 border-[#E5E0D5] shrink-0">
                <div className="xl:text-right">
                  <span className="text-[11px] font-medium text-[#5A6560] block">
                    Approved Cost
                  </span>
                  <span className="text-base font-mono tabular-nums font-bold text-[#133429]">
                    {formatCroresPrecise(proj.sanctionedCost)}
                  </span>
                </div>

                <div className="xl:text-right">
                  <span className="text-[11px] font-medium text-[#5A6560] block">
                    Revised / Tender
                  </span>
                  <span className="text-xs font-mono tabular-nums font-semibold text-[#1C2422]">
                    {proj.revisedCost !== null && proj.revisedCost !== undefined
                      ? formatCroresPrecise(proj.revisedCost)
                      : proj.tenderAmount !== null && proj.tenderAmount !== undefined
                      ? formatCroresPrecise(proj.tenderAmount)
                      : 'Data Not Available'}
                  </span>
                </div>

                <div className="xl:text-right">
                  <span className="text-[11px] font-medium text-[#5A6560] block">
                    Expenditure
                  </span>
                  <span className="text-xs font-mono tabular-nums font-medium text-[#B45309]">
                    {proj.reportedExpenditure !== null && proj.reportedExpenditure !== undefined
                      ? formatCroresPrecise(proj.reportedExpenditure)
                      : 'Data Not Available'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(proj)}
                  className="col-span-3 xl:col-span-1 h-9 px-3.5 bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] rounded-[6px] text-xs font-semibold transition-colors duration-150 inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Inspect Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
