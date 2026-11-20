import React, { useState } from 'react';
import {
  X,
  MapPin,
  Building2,
  Droplet,
  Trash2,
  GraduationCap,
  HeartPulse,
  Trees,
  Flame,
  FileText,
  ExternalLink,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { WardIntelligence } from '../data/pmcWardIntelligence';
import { VerificationBadge } from './VerificationBadge';

interface WardDetailModalProps {
  ward: WardIntelligence | null;
  onClose: () => void;
}

export const WardDetailModal: React.FC<WardDetailModalProps> = ({ ward, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'infrastructure' | 'finances' | 'sources'>('overview');
  const [expandedSourceIndex, setExpandedSourceIndex] = useState<number | null>(null);

  if (!ward) return null;

  const handleDownloadWardCSV = () => {
    const rows: (string | number)[][] = [
      ['Field', 'Value'],
      ['Ward Number', ward.wardNumber],
      ['Ward Name', `"${ward.name}"`],
      ['Zone', `"${ward.zone}"`],
      ['DMC Zone', `"${ward.deputyCommissionerZone}"`],
      ['Prabhag Coverage', `"${ward.prabhagCoverage}"`],
      ['Key Localities', `"${ward.keyLocalities.join(', ')}"`],
      ['Includes Merged Villages', ward.includesMergedVillages ? 'True' : 'False'],
      ['Population Estimate', `"${ward.populationEstimate}"`],
      ['Water Supply', `"${ward.waterSupplyLPCD}"`],
      ['Underground Drainage Coverage', `${ward.drainageCoveragePct}%`],
      ['Schools Count', ward.schoolsCount],
      ['Healthcare Facilities', ward.healthcareFacilitiesCount],
      ['Parks and Gardens', ward.parksAndGardensCount],
      ['Public Toilets', ward.publicToiletsCount],
      ['Fire Stations', ward.fireStationsCount],
      ['Streetlights Estimate', `"${ward.streetlightsCountEstimate}"`],
      ['Tree Census Estimate', `"${ward.treeCountEstimate}"`],
      ['Property Tax Note', `"${ward.propertyTaxCollectionNote}"`],
      ['Actual Expenditure Status', `"${ward.wardActualExpenditureStatus}"`]
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PMC_Ward_${ward.wardNumber}_${ward.shortName}_Civic_Intelligence.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ward-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[8px] border border-[#E5E0D5] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_20px_60px_rgba(19,52,41,0.2)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#FAF8F3] border-b border-[#E5E0D5] flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono font-bold text-[#0E7C74]">
                Ward #{String(ward.wardNumber).padStart(2, '0')} · {ward.zone}
              </span>
              <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
              <span className="text-[#5A6560]">{ward.deputyCommissionerZone}</span>
              <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
              <span className="text-[#133429] font-medium">
                {ward.includesMergedVillages ? 'Includes Merged Villages' : 'Core PMC Jurisdiction'}
              </span>
            </div>
            <h2 id="ward-modal-title" className="font-serif text-xl sm:text-2xl font-semibold text-[#133429]">
              {ward.name}
            </h2>
            <p className="text-xs text-[#5A6560]">
              {ward.prabhagCoverage} · Localities: {ward.keyLocalities.join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadWardCSV}
              className="h-9 px-3.5 rounded-[6px] bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] text-xs font-semibold text-[#133429] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download Ward Civic Intelligence CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#0E7C74]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-[6px] bg-white hover:bg-[#FAF8F3] border border-[#E5E0D5] flex items-center justify-center text-[#5A6560] hover:text-[#133429] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-[#E5E0D5] bg-white flex items-center gap-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Civic Overview & Services' },
            { id: 'infrastructure', label: 'Infrastructure & Facilities' },
            { id: 'finances', label: 'Financial & Budget Context' },
            { id: 'sources', label: `Data Sources (${ward.dataSources.length})` }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 text-xs whitespace-nowrap border-b-2 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'border-[#0E7C74] text-[#133429] font-semibold'
                    : 'border-transparent text-[#5A6560] hover:text-[#133429] font-medium'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white text-xs">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                  <span className="text-[11px] font-semibold text-[#5A6560] uppercase block">
                    Population Estimate
                  </span>
                  <div className="font-mono tabular-nums text-sm font-bold text-[#133429]">
                    {ward.populationEstimate}
                  </div>
                  <span className="text-[10px] text-[#0E7C74]">Based on Electoral Rolls &amp; Census</span>
                </div>

                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                  <span className="text-[11px] font-semibold text-[#5A6560] uppercase block">
                    Underground Drainage
                  </span>
                  <div className="font-mono tabular-nums text-sm font-bold text-[#0E7C74]">
                    {ward.drainageCoveragePct}% Coverage
                  </div>
                  <span className="text-[10px] text-[#5A6560]">OpenCity Ward Drainage Survey</span>
                </div>

                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                  <span className="text-[11px] font-semibold text-[#5A6560] uppercase block">
                    Water Supply Level
                  </span>
                  <div className="font-mono tabular-nums text-sm font-bold text-[#133429] truncate" title={ward.waterSupplyLPCD}>
                    {ward.waterSupplyLPCD}
                  </div>
                  <span className="text-[10px] text-[#0E7C74]">PMC Water Distribution Dataset ID 336</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-sm font-semibold text-[#133429]">
                  Key Localities &amp; Boundary Details
                </h3>
                <p className="text-[#1C2422] leading-relaxed">
                  {ward.boundaryNote}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ward.keyLocalities.map((loc) => (
                    <span
                      key={loc}
                      className="px-2.5 py-1 rounded-[4px] bg-[#FAF8F3] border border-[#E5E0D5] text-xs font-medium text-[#133429]"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-sm font-semibold text-[#133429]">
                  Nearby Sewage Treatment &amp; Water Facilities
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-[#1C2422]">
                  {ward.sewageTreatmentFacilities.map((stp, idx) => (
                    <li key={idx}>{stp}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-sm font-semibold text-[#133429]">
                  Linked Major PMC Public Projects
                </h3>
                {ward.linkedProjectNames.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {ward.linkedProjectNames.map((proj) => (
                      <span
                        key={proj}
                        className="px-3 py-1.5 rounded-[6px] bg-[#E8F2EE] text-[#0E7C74] font-semibold text-xs border border-[#0E7C74]/20"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#5A6560]">No standalone city DPR listed specifically for this ward.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'infrastructure' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1.5 text-center">
                  <GraduationCap className="w-5 h-5 text-[#0E7C74] mx-auto" />
                  <div className="font-mono tabular-nums text-lg font-bold text-[#133429]">
                    {ward.schoolsCount}
                  </div>
                  <span className="text-[11px] text-[#5A6560] block">Schools &amp; Campuses</span>
                </div>

                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1.5 text-center">
                  <HeartPulse className="w-5 h-5 text-[#0E7C74] mx-auto" />
                  <div className="font-mono tabular-nums text-lg font-bold text-[#133429]">
                    {ward.healthcareFacilitiesCount}
                  </div>
                  <span className="text-[11px] text-[#5A6560] block">Clinics &amp; Hospitals</span>
                </div>

                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1.5 text-center">
                  <Trees className="w-5 h-5 text-[#0E7C74] mx-auto" />
                  <div className="font-mono tabular-nums text-lg font-bold text-[#133429]">
                    {ward.parksAndGardensCount}
                  </div>
                  <span className="text-[11px] text-[#5A6560] block">Parks &amp; Gardens</span>
                </div>

                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1.5 text-center">
                  <Building2 className="w-5 h-5 text-[#0E7C74] mx-auto" />
                  <div className="font-mono tabular-nums text-lg font-bold text-[#133429]">
                    {ward.publicToiletsCount}
                  </div>
                  <span className="text-[11px] text-[#5A6560] block">Public Toilets</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                  <div className="flex items-center gap-2 text-[#133429] font-semibold">
                    <Flame className="w-4 h-4 text-[#D97706]" />
                    <span>Fire Station Catchment</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#1C2422]">
                    {ward.fireStationsCount} Regional Station
                  </div>
                  <span className="text-[10px] text-[#5A6560]">Fire Call &amp; Response Network</span>
                </div>

                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                  <div className="flex items-center gap-2 text-[#133429] font-semibold">
                    <Droplet className="w-4 h-4 text-[#0E7C74]" />
                    <span>Streetlights Estimate</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#1C2422]">
                    {ward.streetlightsCountEstimate}
                  </div>
                  <span className="text-[10px] text-[#5A6560]">LED &amp; Energy Efficient Fixtures</span>
                </div>

                <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                  <div className="flex items-center gap-2 text-[#133429] font-semibold">
                    <Trees className="w-4 h-4 text-[#0E7C74]" />
                    <span>Tree Census Estimate</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#1C2422]">
                    {ward.treeCountEstimate}
                  </div>
                  <span className="text-[10px] text-[#5A6560]">PMC Tree Census Dataset ID 286</span>
                </div>
              </div>

              <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-2">
                <div className="font-semibold text-[#133429]">Roads &amp; Footpath Maintenance Information</div>
                <p className="text-[#1C2422] leading-relaxed">{ward.roadAndFootpathInfo}</p>
              </div>

              <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-2">
                <div className="font-semibold text-[#133429]">Solid Waste Management (SWM) Indicator</div>
                <p className="text-[#1C2422] leading-relaxed">{ward.solidWasteIndicator}</p>
              </div>
            </div>
          )}

          {activeTab === 'finances' && (
            <div className="space-y-6">
              <div className="p-4 rounded-[6px] bg-[#B45309]/[0.07] border border-[#B45309]/25 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#1C2422]">
                  <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Ward-Wise Actual Expenditure Disclosure Policy</span>
                </div>
                <p className="text-[#1C2422] leading-relaxed font-mono">
                  {ward.wardActualExpenditureStatus}
                </p>
                <p className="text-[11px] text-[#5A6560] leading-relaxed">
                  PMC does not publish machine-readable ward-wise actual expenditure tables in open CSV/JSON formats. We strictly refuse to divide PMC’s total budget equally among 15 wards.
                </p>
              </div>

              <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-2">
                <div className="font-semibold text-[#133429]">Property Tax Collection &amp; Demand Context</div>
                <p className="text-[#1C2422] leading-relaxed">{ward.propertyTaxCollectionNote}</p>
              </div>

              <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-2">
                <div className="font-semibold text-[#133429]">City-Wide Financial Context (PMC-Wide)</div>
                <p className="text-[#5A6560] leading-relaxed">
                  For citywide context, PMC’s total Standing Committee Approved Budget Estimate for FY 2026-27 stands at <strong>₹15,669.00 crore</strong> (covering 516+ sq.km across all wards and 34 merged villages).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-sm font-semibold text-[#133429]">
                  Official Data Sources &amp; Provenance
                </h3>
                <p className="text-[#5A6560]">
                  Every indicator shown for this ward is derived from genuine Pune Municipal Corporation (PMC) open data portals and OpenCity repositories.
                </p>
              </div>

              <div className="space-y-3">
                {ward.dataSources.map((src, index) => {
                  const isExpanded = expandedSourceIndex === index;
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[#133429] text-[13px]">
                          {src.datasetName}
                        </span>
                        <VerificationBadge
                          status={
                            src.verificationStatus === 'Verified'
                              ? 'Verified'
                              : src.verificationStatus === 'Official Report Estimate'
                              ? 'Estimated'
                              : 'Unavailable'
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#5A6560]">
                        <div>
                          <span className="font-medium text-[#1C2422] block">Publisher:</span>
                          {src.publisher}
                        </div>
                        <div>
                          <span className="font-medium text-[#1C2422] block">Published:</span>
                          {src.publicationDate}
                        </div>
                        <div>
                          <span className="font-medium text-[#1C2422] block">Coverage:</span>
                          {src.geographicCoverage}
                        </div>
                        <div>
                          <span className="font-medium text-[#1C2422] block">Unit:</span>
                          {src.unit}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E5E0D5] flex items-center justify-between gap-2">
                        <span className="text-[11px] text-[#5A6560] font-mono">
                          Method: {src.transformationMethod}
                        </span>
                        <a
                          href={src.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0E7C74] hover:text-[#133429] font-semibold inline-flex items-center gap-1"
                        >
                          <span>Official Portal Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#FAF8F3] border-t border-[#E5E0D5] flex items-center justify-between text-xs text-[#5A6560]">
          <span>Ward Explorer · Pune Municipal Corporation (PMC)</span>
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
