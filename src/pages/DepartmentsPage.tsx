import React, { useState } from 'react';
import { ReconciledRecord } from '../types';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise } from '../utils/formatters';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Search,
  X
} from 'lucide-react';

interface DepartmentsPageProps {
  onSelectRecord: (record: ReconciledRecord) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ onSelectRecord }) => {
  const departments = dataProvider.getDepartments();
  const allRecords = dataProvider.getAllAuditedRecords();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Core Infrastructure',
    'Civic Services & Environment',
    'Social & Welfare',
    'Revenue & Administration'
  ];

  const filteredDepartments = departments.filter((dept) => {
    if (selectedCategory !== 'All' && dept.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        dept.name.toLowerCase().includes(q) ||
        dept.description.toLowerCase().includes(q) ||
        dept.sourceNote.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const findLinkedRecord = (ids: string[]) => {
    if (!ids || ids.length === 0) return null;
    return allRecords.find((r) => r.unique_id === ids[0]) || null;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-7 px-3 rounded-[4px] text-xs whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              {cat === 'All' ? `All (${departments.length})` : cat}
            </button>
          ))}
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search PMC department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] pl-9 pr-8 text-xs text-[#1C2422] placeholder-[#5A6560] focus:outline-hidden focus:border-[#0E7C74] focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A6560] hover:text-[#1C2422] cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Double-Counting Disclosure */}
      <div className="bg-[#B45309]/[0.07] border border-[#B45309]/25 px-4 py-3.5 rounded-[6px] text-xs flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
        <p className="text-[#1C2422] leading-relaxed">
          <strong className="text-[#B45309]">Strict Accounting Discipline:</strong> Seven FY 2024-25 PMC sub-heads (Water, Roads, SWM, Drainage, Health, Education, Parks) remain quarantined as <em>Partially Verified</em> to avoid double-counting against the ₹11,601 Cr consolidated BE. Departments without standalone verified allocations display <strong>Data Not Available</strong> instead of invented figures.
        </p>
      </div>

      {/* 20 Department Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredDepartments.map((dept) => {
          const isVerified = dept.allocationStatus === 'Verified';
          const isQuarantined = dept.allocationStatus === 'Partially Verified (Quarantined)';
          const linkedRecord = findLinkedRecord(dept.linkedRecordIds);

          return (
            <div
              key={dept.id}
              className={`bg-white p-5 rounded-[6px] border flex flex-col justify-between gap-4 transition-colors duration-150 ${
                isVerified
                  ? 'border-[#E5E0D5] hover:border-[#0E7C74]/50'
                  : isQuarantined
                  ? 'border-[#B45309]/35'
                  : 'border-[#E5E0D5]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-medium text-[#5A6560]">{dept.category}</span>
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      isVerified
                        ? 'text-[#0E7C74]'
                        : isQuarantined
                        ? 'text-[#B45309]'
                        : 'text-[#5A6560]'
                    }`}
                  >
                    {isVerified ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : isQuarantined ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-[#5A6560]" />
                    )}
                    <span>{dept.allocationStatus}</span>
                  </span>
                </div>

                <div>
                  <h2 className="font-serif font-semibold text-base text-[#133429] leading-snug">
                    {dept.name}
                  </h2>
                  <p className="text-xs text-[#5A6560] mt-1 leading-relaxed">{dept.description}</p>
                </div>

                <div className="bg-[#FAF8F3] p-3 rounded-[6px] border border-[#E5E0D5] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-[#5A6560] block">
                      {dept.latestAllocationCrores !== null
                        ? 'Documented Outlay'
                        : 'Expenditure Head'}
                    </span>
                    <span className="text-[11px] font-mono tabular-nums text-[#5A6560]">
                      {dept.latestAllocationFY
                        ? `FY ${dept.latestAllocationFY}`
                        : 'PMC General Fund'}
                    </span>
                  </div>
                  <div className="text-right">
                    {dept.latestAllocationCrores !== null ? (
                      <span className="text-base font-mono tabular-nums font-bold text-[#133429]">
                        {formatCroresPrecise(dept.latestAllocationCrores)}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#B45309]">
                        Data Not Available
                      </span>
                    )}
                  </div>
                </div>

                {dept.revenueNote && (
                  <div className="text-[11px] font-medium text-[#0E7C74]">{dept.revenueNote}</div>
                )}

                <p className="text-[11px] text-[#5A6560] leading-relaxed">{dept.sourceNote}</p>
              </div>

              <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between gap-2 text-xs">
                <a
                  href={dept.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5A6560] hover:text-[#133429] font-medium inline-flex items-center gap-1"
                >
                  <span>PMC Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {linkedRecord ? (
                  <button
                    type="button"
                    onClick={() => onSelectRecord(linkedRecord)}
                    className="px-3 py-1.5 bg-[#E8F2EE] hover:bg-[#133429] text-[#0E7C74] hover:text-[#FAF8F3] font-semibold rounded-[6px] transition-colors duration-150 cursor-pointer"
                  >
                    Inspect {linkedRecord.unique_id}
                  </button>
                ) : (
                  <span className="text-[11px] text-[#5A6560] font-mono">No standalone ID</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
