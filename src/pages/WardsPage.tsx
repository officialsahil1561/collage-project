import React, { useState, useMemo } from 'react';
import { dataProvider } from '../services/dataProvider';
import { VerificationBadge } from '../components/VerificationBadge';
import { WardDetailModal } from '../components/WardDetailModal';
import { WardIntelligence } from '../data/pmcWardIntelligence';
import {
  Search,
  MapPinned,
  ExternalLink,
  AlertCircle,
  X,
  Columns2,
  FolderKanban,
  Download,
  GraduationCap,
  HeartPulse,
  Trees,
  Droplet,
  Building2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const WardsPage: React.FC = () => {
  const wardsList = dataProvider.getWardIntelligenceList();
  const prabhags = dataProvider.getPrabhags();
  const projects = dataProvider.getProjects();

  const [viewMode, setViewMode] = useState<'wards' | 'prabhags' | 'compare'>('wards');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [mergedFilter, setMergedFilter] = useState<'all' | 'merged'>('all');
  const [compareLeftId, setCompareLeftId] = useState<string>(wardsList[0]?.id || '');
  const [compareRightId, setCompareRightId] = useState<string>(wardsList[1]?.id || '');
  const [selectedWardForModal, setSelectedWardForModal] = useState<WardIntelligence | null>(null);
  const [expandedSourcesWardId, setExpandedSourcesWardId] = useState<string | null>(null);

  const zones = ['All', 'Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];

  const filteredWards = useMemo(() => {
    return wardsList.filter((w) => {
      if (zoneFilter !== 'All' && w.zone !== zoneFilter) return false;
      if (mergedFilter === 'merged' && !w.includesMergedVillages) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          w.name.toLowerCase().includes(q) ||
          w.shortName.toLowerCase().includes(q) ||
          w.prabhagCoverage.toLowerCase().includes(q) ||
          w.keyLocalities.some((loc) => loc.toLowerCase().includes(q)) ||
          w.boundaryNote.toLowerCase().includes(q) ||
          w.sewageTreatmentFacilities.some((s) => s.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [wardsList, zoneFilter, mergedFilter, searchQuery]);

  const filteredPrabhags = useMemo(() => {
    return prabhags.filter((p) => {
      if (zoneFilter !== 'All' && p.zone !== zoneFilter) return false;
      if (mergedFilter === 'merged' && !p.includesMergedVillages) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          p.code.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.wardOfficeName.toLowerCase().includes(q) ||
          p.localities.some((loc) => loc.toLowerCase().includes(q)) ||
          p.keyLandmarksOrFacilities.some((f) => f.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [prabhags, zoneFilter, mergedFilter, searchQuery]);

  const compareLeftWard = wardsList.find((w) => w.id === compareLeftId) || wardsList[0];
  const compareRightWard = wardsList.find((w) => w.id === compareRightId) || wardsList[1];

  const getProjectsForNames = (names: string[]) => {
    return projects.filter((proj) =>
      names.some((n) => proj.name.toLowerCase().includes(n.toLowerCase()))
    );
  };

  const handleExportFilteredCSV = () => {
    const csvStr = dataProvider.buildWardIntelligenceCSV(filteredWards);
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PMC_Pune_Ward_Intelligence_${filteredWards.length}_wards.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Jurisdiction & Transparency Disclosure */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-base font-semibold text-[#133429]">
              PMC Ward Explorer — Real Civic Intelligence Across All 15 Ward Offices &amp; 41 Prabhags
            </h2>
            <p className="text-xs text-[#5A6560] mt-0.5">
              Covers all 5 Deputy Municipal Commissioner (DMC) zones, 15 Regional Ward Offices, and 41 electoral Prabhags inside Pune Municipal Corporation limits. Populated using genuine PMC Open Data &amp; OpenCity datasets.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={handleExportFilteredCSV}
              className="h-9 px-3.5 rounded-[6px] bg-[#FAF8F3] hover:bg-[#E8F2EE] border border-[#E5E0D5] text-xs font-semibold text-[#0E7C74] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Ward CSV ({filteredWards.length})</span>
            </button>
            <a
              href="https://www.pmc.gov.in/en/ward-offices"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-3.5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <span>PMC Official Ward Directory</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="p-3.5 rounded-[6px] bg-[#B45309]/[0.07] border border-[#B45309]/25 flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <p className="text-[#1C2422] leading-relaxed">
            <strong className="text-[#B45309]">Data Integrity Policy:</strong> PMC does not publish machine-readable ward-wise actual expenditure tables in open CSV/JSON formats. Ward actual spending is therefore marked <strong>Data Not Available</strong> rather than inventing numbers. Facility counts, water supply metrics, drainage coverage, schools, and hospitals are mapped directly from verified PMC Open Data catalogue records (Datasets 241, 255, 336, 441, 443, 447).
          </p>
        </div>
      </div>

      {/* Mode Switcher + Filter Toolbar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px]">
            <button
              type="button"
              onClick={() => setViewMode('wards')}
              className={`h-8 px-3.5 rounded-[4px] text-xs transition-colors cursor-pointer ${
                viewMode === 'wards'
                  ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              15 Regional Ward Offices
            </button>
            <button
              type="button"
              onClick={() => setViewMode('prabhags')}
              className={`h-8 px-3.5 rounded-[4px] text-xs transition-colors cursor-pointer ${
                viewMode === 'prabhags'
                  ? 'bg-[#0E7C74] text-white font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              All 41 Electoral Prabhags
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compare')}
              className={`h-8 px-3.5 rounded-[4px] text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'compare'
                  ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Compare Wards</span>
            </button>
          </div>

          <span className="text-xs font-mono text-[#5A6560]">
            {viewMode === 'wards'
              ? `${filteredWards.length} of 15 Ward Offices`
              : viewMode === 'prabhags'
              ? `${filteredPrabhags.length} of 41 Prabhags`
              : 'Side-by-side Ward Comparison'}
          </span>
        </div>

        {viewMode !== 'compare' && (
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 pt-2 border-t border-[#E5E0D5]">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#5A6560] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search locality, Prabhag number, STP name, landmark (e.g. Aundh, Kharadi, Prabhag 25, Hadapsar)..."
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

            <select
              aria-label="Filter by Zone"
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="h-9 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] px-3 text-xs font-semibold text-[#1C2422] focus:outline-hidden focus:border-[#0E7C74] cursor-pointer"
            >
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z === 'All' ? 'All 5 Administrative Zones' : z}
                </option>
              ))}
            </select>

            <div className="flex items-center h-9 gap-0.5 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] shrink-0">
              <button
                type="button"
                onClick={() => setMergedFilter('all')}
                className={`h-7 px-3 rounded-[4px] text-xs cursor-pointer ${
                  mergedFilter === 'all'
                    ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                    : 'text-[#5A6560] hover:text-[#133429]'
                }`}
              >
                All Areas
              </button>
              <button
                type="button"
                onClick={() => setMergedFilter('merged')}
                className={`h-7 px-3 rounded-[4px] text-xs cursor-pointer ${
                  mergedFilter === 'merged'
                    ? 'bg-[#0E7C74] text-white font-semibold'
                    : 'text-[#5A6560] hover:text-[#133429]'
                }`}
              >
                Merged Villages
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: 15 Regional Ward Offices (Enriched Cards) */}
      {viewMode === 'wards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredWards.map((ward) => {
            const wardProjects = getProjectsForNames(ward.linkedProjectNames);
            const areSourcesExpanded = expandedSourcesWardId === ward.id;

            return (
              <div
                key={ward.id}
                className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] hover:border-[#0E7C74]/50 transition-all flex flex-col justify-between gap-4 shadow-[0_2px_8px_rgba(19,52,41,0.03)]"
              >
                <div className="space-y-3.5">
                  {/* Ward Header */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-bold text-[#0E7C74]">
                      Ward #{String(ward.wardNumber).padStart(2, '0')} · {ward.zone}
                    </span>
                    <span className="text-[11px] font-medium text-[#5A6560]">
                      {ward.includesMergedVillages ? 'Includes Merged Villages' : 'Core PMC'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#133429] leading-snug flex items-start gap-2">
                      <MapPinned className="w-4 h-4 text-[#0E7C74] shrink-0 mt-0.5" />
                      <span>{ward.name}</span>
                    </h3>
                    <p className="text-xs text-[#5A6560] mt-1 font-medium">
                      {ward.prabhagCoverage}
                    </p>
                  </div>

                  {/* Localities */}
                  <div className="text-xs text-[#1C2422]">
                    <span className="text-[11px] font-semibold text-[#5A6560] block mb-0.5">
                      Key Localities:
                    </span>
                    <span className="line-clamp-2">{ward.keyLocalities.join(' · ')}</span>
                  </div>

                  {/* Key Civic Indicators Grid */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] text-center">
                    <div>
                      <span className="text-[10px] text-[#5A6560] block">Drainage</span>
                      <span className="font-mono tabular-nums text-xs font-bold text-[#0E7C74]">
                        {ward.drainageCoveragePct}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5A6560] block">Schools</span>
                      <span className="font-mono tabular-nums text-xs font-bold text-[#133429]">
                        {ward.schoolsCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5A6560] block">Clinics</span>
                      <span className="font-mono tabular-nums text-xs font-bold text-[#133429]">
                        {ward.healthcareFacilitiesCount}
                      </span>
                    </div>
                  </div>

                  {/* Facility Counts Footer pills */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#5A6560]">
                    <span className="inline-flex items-center gap-1">
                      <Trees className="w-3 h-3 text-[#0E7C74]" />
                      <span>{ward.parksAndGardensCount} Parks</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-[#0E7C74]" />
                      <span>{ward.publicToiletsCount} Toilets</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-[#0E7C74]" />
                      <span>{ward.waterSupplyLPCD.split(' ')[0]} LPCD</span>
                    </span>
                  </div>

                  {/* Financial Disclosure Note */}
                  <div className="p-2.5 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] text-[11px] space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[#1C2422]">Ward Actual Spend</span>
                      <VerificationBadge status="Unavailable" detailLabel="Data Not Available" />
                    </div>
                    <span className="text-[#5A6560] block truncate">
                      {ward.wardActualExpenditureStatus}
                    </span>
                  </div>

                  {/* Expandable Data Sources Area */}
                  <div className="border-t border-[#E5E0D5] pt-2">
                    <button
                      type="button"
                      onClick={() => setExpandedSourcesWardId(areSourcesExpanded ? null : ward.id)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-[#0E7C74] hover:text-[#133429] py-1 cursor-pointer"
                    >
                      <span>Data Sources ({ward.dataSources.length} verified)</span>
                      {areSourcesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {areSourcesExpanded && (
                      <div className="mt-2 space-y-2 p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] text-[11px]">
                        {ward.dataSources.map((src, sIdx) => (
                          <div key={sIdx} className="space-y-1 pb-2 border-b border-[#E5E0D5] last:border-0 last:pb-0">
                            <div className="font-semibold text-[#133429]">{src.datasetName}</div>
                            <div className="text-[#5A6560]">
                              Publisher: {src.publisher} · Published: {src.publicationDate}
                            </div>
                            <a
                              href={src.originalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0E7C74] hover:underline inline-flex items-center gap-1 font-medium"
                            >
                              <span>Official Dataset Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between text-xs">
                  <a
                    href={ward.complaintsPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5A6560] hover:text-[#133429] font-medium inline-flex items-center gap-1"
                  >
                    <span>Grievance Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedWardForModal(ward)}
                    className="h-8 px-3 rounded-[6px] bg-[#E8F2EE] hover:bg-[#D5EBE4] text-[#0E7C74] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Ward Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: All 41 Electoral Prabhags */}
      {viewMode === 'prabhags' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPrabhags.map((prabhag) => {
            const linkedProjects = projects.filter((p) => prabhag.linkedProjectIds.includes(p.id));
            return (
              <div
                key={prabhag.code}
                className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] hover:border-[#0E7C74]/50 transition-colors flex flex-col justify-between gap-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#0E7C74]">
                      {prabhag.code} · {prabhag.zone}
                    </span>
                    <VerificationBadge status={prabhag.verificationBadge} />
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#133429] leading-snug">
                      {prabhag.name}
                    </h3>
                    <p className="text-[11px] text-[#5A6560] mt-0.5">{prabhag.wardOfficeName}</p>
                  </div>

                  <div className="text-xs text-[#1C2422]">
                    <span className="text-[11px] font-semibold text-[#5A6560] block">
                      Localities:
                    </span>
                    <span>{prabhag.localities.join(' · ')}</span>
                  </div>

                  <div className="text-[11px] text-[#5A6560]">
                    <span className="font-semibold text-[#133429] block">
                      Key Civic Landmarks / Facilities:
                    </span>
                    <span>{prabhag.keyLandmarksOrFacilities.join(' · ')}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-[#5A6560]">
                    {linkedProjects.length > 0
                      ? `${linkedProjects.length} linked city scheme(s)`
                      : 'No standalone city DPR linked'}
                  </span>
                  <span className="font-semibold text-[#B45309]">
                    Prabhag Spend: Unavailable
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: Side-by-Side Ward Comparison Tool */}
      {viewMode === 'compare' && compareLeftWard && compareRightWard && (
        <div className="bg-white rounded-[6px] border border-[#E5E0D5] p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5A6560] mb-1.5">
                Select First Ward Office
              </label>
              <select
                aria-label="Select First Ward Office"
                value={compareLeftWard.id}
                onChange={(e) => setCompareLeftId(e.target.value)}
                className="w-full h-10 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] px-3 text-xs font-semibold text-[#133429]"
              >
                {wardsList.map((w) => (
                  <option key={w.id} value={w.id}>
                    Ward #{String(w.wardNumber).padStart(2, '0')} — {w.name} ({w.zone})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5A6560] mb-1.5">
                Select Second Ward Office
              </label>
              <select
                aria-label="Select Second Ward Office"
                value={compareRightWard.id}
                onChange={(e) => setCompareRightId(e.target.value)}
                className="w-full h-10 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] px-3 text-xs font-semibold text-[#133429]"
              >
                {wardsList.map((w) => (
                  <option key={w.id} value={w.id}>
                    Ward #{String(w.wardNumber).padStart(2, '0')} — {w.name} ({w.zone})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[compareLeftWard, compareRightWard].map((ward) => (
              <div
                key={ward.id}
                className="p-5 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-4 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-[#0E7C74]">
                    Ward #{String(ward.wardNumber).padStart(2, '0')} · {ward.zone}
                  </span>
                  <VerificationBadge
                    status="Verified"
                    detailLabel={ward.includesMergedVillages ? 'Merged Villages Included' : 'Core PMC'}
                  />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#133429]">{ward.name}</h3>

                <div className="space-y-2.5 pt-3 border-t border-[#E5E0D5]">
                  <div>
                    <span className="font-semibold text-[#5A6560] block">Population Estimate:</span>
                    <span className="font-mono font-bold text-[#133429]">{ward.populationEstimate}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#5A6560] block">Water Supply Indicator:</span>
                    <span className="text-[#1C2422]">{ward.waterSupplyLPCD}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#5A6560] block">Underground Drainage Coverage:</span>
                    <span className="font-mono font-bold text-[#0E7C74]">{ward.drainageCoveragePct}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-[6px] bg-white border border-[#E5E0D5] text-center">
                    <div>
                      <span className="text-[10px] text-[#5A6560] block">Schools</span>
                      <span className="font-mono text-xs font-bold text-[#133429]">{ward.schoolsCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5A6560] block">Clinics</span>
                      <span className="font-mono text-xs font-bold text-[#133429]">{ward.healthcareFacilitiesCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5A6560] block">Parks</span>
                      <span className="font-mono text-xs font-bold text-[#133429]">{ward.parksAndGardensCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5A6560] block">Toilets</span>
                      <span className="font-mono text-xs font-bold text-[#133429]">{ward.publicToiletsCount}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-[#5A6560] block">Key Localities:</span>
                    <span className="text-[#1C2422]">{ward.keyLocalities.join(', ')}</span>
                  </div>
                  <div className="p-2.5 rounded-[4px] bg-white border border-[#E5E0D5]">
                    <span className="font-semibold text-[#B45309] block">
                      Ward-Wise Financial Spend: Data Not Available
                    </span>
                    <span className="text-[11px] text-[#5A6560]">{ward.wardActualExpenditureStatus}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedWardForModal(ward)}
                    className="w-full h-8 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    View Full Ward Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ward Detail Modal */}
      <WardDetailModal
        ward={selectedWardForModal}
        onClose={() => setSelectedWardForModal(null)}
      />
    </div>
  );
};
