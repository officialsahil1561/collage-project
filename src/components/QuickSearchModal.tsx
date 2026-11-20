import React, { useState } from 'react';
import { ReconciledRecord, Project } from '../types';
import {
  Search,
  X,
  HardHat,
  CheckCircle2,
  AlertTriangle,
  MapPinned,
  Layers,
  Droplets,
  Route,
  BookOpen
} from 'lucide-react';
import { formatPrintedWithUnit, formatCroresPrecise } from '../utils/formatters';
import { dataProvider } from '../services/dataProvider';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord: (record: ReconciledRecord) => void;
  onSelectProject: (project: Project) => void;
  onNavigateTab?: (tab: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectRecord,
  onSelectProject,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');
  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const metrics = dataProvider.getReconciliationMetrics();

  const records = q
    ? dataProvider.getFilteredRecords({
        searchQuery: query,
        includeReview: true
      })
    : [];

  const projects = q
    ? dataProvider.getProjects().filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      )
    : [];

  const departments = q
    ? dataProvider.getDepartments().filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      )
    : [];

  const wards = q
    ? dataProvider.getWardOffices().filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.prabhagCoverage.toLowerCase().includes(q) ||
          w.keyLocalities.some((loc) => loc.toLowerCase().includes(q))
      )
    : [];

  const prabhags = q
    ? dataProvider.getPrabhags().filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.wardOfficeName.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          `prabhag ${p.prabhagNumber}`.includes(q) ||
          p.localities.some((loc) => loc.toLowerCase().includes(q))
      )
    : [];

  const wtps = q
    ? dataProvider.getWaterTreatmentPlants().filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.zonesServed.toLowerCase().includes(q) ||
          w.sourceDam.toLowerCase().includes(q)
      )
    : [];

  const stps = q
    ? dataProvider.getSewageTreatmentPlants().filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.wardOrLocality.toLowerCase().includes(q) ||
          s.program.toLowerCase().includes(q)
      )
    : [];

  const roadsItems = q
    ? dataProvider.getRoadsDevelopmentItems().filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q) ||
          r.wardOrCorridor.toLowerCase().includes(q)
      )
    : [];

  const sources = q
    ? dataProvider.getSourceRegistry().filter(
        (s) =>
          s.document_title.toLowerCase().includes(q) ||
          s.publisher.toLowerCase().includes(q) ||
          s.document_type.toLowerCase().includes(q) ||
          s.data_categories_supported.some((c) => c.toLowerCase().includes(q))
      )
    : [];

  const totalMatches =
    records.length +
    projects.length +
    departments.length +
    wards.length +
    prabhags.length +
    wtps.length +
    stps.length +
    roadsItems.length +
    sources.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0E2920]/65 backdrop-blur-[2px] flex items-start justify-center p-4 pt-16 sm:pt-20 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[6px] max-w-xl w-full shadow-2xl border border-[#E5E0D5] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-[#E5E0D5] flex items-center gap-3 bg-[#FAF8F3]">
          <Search className="w-4 h-4 text-[#0E7C74] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search departments, projects, wards, 43 records, sources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-9 bg-transparent text-[#1C2422] placeholder-[#5A6560] text-sm focus:outline-hidden"
          />
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 inline-flex items-center justify-center text-[#5A6560] hover:text-[#133429] rounded-[6px] hover:bg-white transition-colors cursor-pointer shrink-0"
            aria-label="Close search modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {q === '' ? (
            <div className="text-center py-8 text-xs text-[#5A6560]">
              Global search across PMC departments, projects, 15 ward offices, 41 Prabhags, {metrics.total} financial records, and {dataProvider.getSourceRegistry().length} official sources.
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-8 text-xs text-[#5A6560]">
              No matching Pune Municipal Corporation records found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <div className="space-y-4">
              {projects.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#0E7C74] block px-1">
                    PMC Public Projects ({projects.length})
                  </span>
                  {projects.map((proj) => (
                    <button
                      type="button"
                      key={proj.id}
                      onClick={() => {
                        onSelectProject(proj);
                        onClose();
                      }}
                      className="w-full text-left p-3 bg-[#FAF8F3] hover:bg-[#E8F2EE] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors duration-150 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <HardHat className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                          <span className="text-xs font-semibold text-[#1C2422] truncate">
                            {proj.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5A6560] truncate mt-0.5">
                          {proj.category} · FY {proj.financialYear}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block font-mono tabular-nums font-bold text-[#133429] text-xs">
                          {formatCroresPrecise(proj.sanctionedCost)}
                        </span>
                        <span className="text-[10px] text-[#0E7C74] font-medium">
                          {proj.completionStatus}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {prabhags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#133429] block px-1">
                    Electoral Prabhags ({prabhags.length})
                  </span>
                  {prabhags.slice(0, 5).map((p) => (
                    <button
                      type="button"
                      key={p.prabhagNumber}
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('wards');
                        onClose();
                      }}
                      className="w-full text-left p-2.5 bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPinned className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#1C2422] block truncate">
                            {p.code} · {p.name}
                          </span>
                          <span className="text-[11px] text-[#5A6560] block truncate">
                            {p.localities.join(', ')}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#0E7C74] shrink-0">
                        {p.wardOfficeName}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {(wtps.length > 0 || stps.length > 0) && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#133429] block px-1">
                    Water &amp; Sanitation Infrastructure ({wtps.length + stps.length})
                  </span>
                  {wtps.slice(0, 3).map((w) => (
                    <button
                      type="button"
                      key={w.id}
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('water-sanitation');
                        onClose();
                      }}
                      className="w-full text-left p-2.5 bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Droplets className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#1C2422] block truncate">
                            {w.name}
                          </span>
                          <span className="text-[11px] text-[#5A6560] block truncate">
                            {w.zonesServed} · {w.sourceDam}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-[#0E7C74] shrink-0">
                        {w.capacityLabel}
                      </span>
                    </button>
                  ))}
                  {stps.slice(0, 3).map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('water-sanitation');
                        onClose();
                      }}
                      className="w-full text-left p-2.5 bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Droplets className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#1C2422] block truncate">
                            {s.name}
                          </span>
                          <span className="text-[11px] text-[#5A6560] block truncate">
                            {s.wardOrLocality} · {s.program}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-[#0E7C74] shrink-0">
                        {s.capacityMLD} MLD
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {roadsItems.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#133429] block px-1">
                    Roads &amp; Mobility Works ({roadsItems.length})
                  </span>
                  {roadsItems.slice(0, 4).map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('roads-development');
                        onClose();
                      }}
                      className="w-full text-left p-2.5 bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Route className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#1C2422] block truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-[#5A6560] block truncate">
                            {item.type} · {item.status}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-[#133429] shrink-0">
                        {item.sanctionedOrBudgetedCrores !== null
                          ? formatCroresPrecise(item.sanctionedOrBudgetedCrores)
                          : 'Tracker'}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {departments.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#133429] block px-1">
                    PMC Departments ({departments.length})
                  </span>
                  {departments.slice(0, 4).map((dept) => (
                    <button
                      type="button"
                      key={dept.id}
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('departments');
                        onClose();
                      }}
                      className="w-full text-left p-2.5 bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Layers className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#1C2422] block truncate">
                            {dept.name}
                          </span>
                          <span className="text-[11px] text-[#5A6560] block truncate">
                            {dept.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-[#133429] shrink-0">
                        {dept.latestAllocationCrores !== null
                          ? formatCroresPrecise(dept.latestAllocationCrores)
                          : dept.allocationStatus}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {wards.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#133429] block px-1">
                    Regional Ward Offices ({wards.length})
                  </span>
                  {wards.slice(0, 4).map((ward) => (
                    <button
                      type="button"
                      key={ward.id}
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('wards');
                        onClose();
                      }}
                      className="w-full text-left p-2.5 bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPinned className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#1C2422] block truncate">
                            {ward.name}
                          </span>
                          <span className="text-[11px] text-[#5A6560] block truncate">
                            {ward.keyLocalities.join(', ')}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#5A6560] shrink-0">
                        {ward.zone}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {records.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#5A6560] block px-1">
                    Financial Records ({records.length})
                  </span>
                  {records.map((rec) => {
                    const isVerified = rec.verification_status === 'Verified';
                    return (
                      <button
                        type="button"
                        key={rec.unique_id}
                        onClick={() => {
                          onSelectRecord(rec);
                          onClose();
                        }}
                        className="w-full text-left p-3 bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors duration-150 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-semibold text-[#0E7C74] shrink-0">
                              {rec.unique_id}
                            </span>
                            <span className="text-xs font-semibold text-[#1C2422] truncate">
                              {rec.record_or_project_name}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5A6560] truncate mt-0.5">
                            {rec.source_classification} · {rec.financial_category} · FY{' '}
                            {rec.financial_year}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block font-mono tabular-nums font-bold text-[#133429] text-xs">
                            {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                          </span>
                          <span
                            className={`text-[10px] font-medium inline-flex items-center justify-end gap-1 ${
                              isVerified ? 'text-[#0E7C74]' : 'text-[#B45309]'
                            }`}
                          >
                            {isVerified ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                            )}
                            <span>{rec.verification_status}</span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              {sources.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-[#133429] block px-1">
                    Official Data Sources ({sources.length})
                  </span>
                  {sources.map((src) => (
                    <button
                      type="button"
                      key={src.id}
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('sources');
                        onClose();
                      }}
                      className="w-full text-left p-2.5 bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] cursor-pointer transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpen className="w-3.5 h-3.5 text-[#0E7C74] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#1C2422] block truncate">
                            {src.document_title}
                          </span>
                          <span className="text-[11px] text-[#5A6560] block truncate">
                            {src.publisher} · FY {src.financial_years_covered}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-[#0E7C74] shrink-0">
                        {src.verification_status}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
