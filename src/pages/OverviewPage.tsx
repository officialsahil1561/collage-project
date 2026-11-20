import React from 'react';
import { ReconciledRecord, Project } from '../types';
import { StatsCards } from '../components/StatsCards';
import { ExpenditureTrendsDashboard } from '../components/ExpenditureTrendsDashboard';
import { ChartsSection } from '../components/ChartsSection';
import { CitizenGlossaryBar } from '../components/CitizenGlossaryBar';
import { VerificationBadge } from '../components/VerificationBadge';
import { toStandardVerificationBadge } from '../data/pmcCivicSectionsData';
import {
  ExternalLink,
  ArrowRight,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise, formatPrintedWithUnit } from '../utils/formatters';

interface OverviewPageProps {
  onSelectRecord: (record: ReconciledRecord) => void;
  onSelectProject: (project: Project) => void;
  setActiveTab: (tab: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onSelectRecord,
  onSelectProject,
  setActiveTab
}) => {
  const summary = dataProvider.getPMCSummary();
  const verifiedRecords = dataProvider.getVerifiedRecords();
  const projects = dataProvider.getProjects();

  const sectorHighlights = [
    { label: 'Urban Mobility & Roads', amount: 1800.0, fy: '2026-27', note: '65 km Missing Links' },
    { label: 'Water Supply', amount: 1665.0, fy: '2025-26', note: '24x7 Supply & WTPs' },
    { label: 'Town Planning & Schemes', amount: 1630.0, fy: '2025-26', note: 'AMRUT, PMAY & DP' },
    { label: 'Merged Villages', amount: 623.0, fy: '2025-26', note: 'Basic Infrastructure' },
    { label: 'Transport (PMC Share)', amount: 508.07, fy: '2025-26', note: 'PMPML VGF & Passes' },
    { label: 'Land Acquisition', amount: 400.0, fy: '2026-27', note: 'Road Widening & DP' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Compact PMC Jurisdiction & Boundary Context Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white px-6 py-4 rounded-[6px] border border-[#E5E0D5]">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
            <span className="font-semibold text-[#133429] text-[13px]">
              {summary.authorityName}
            </span>
            <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
            <span className="text-[#5A6560]">
              {summary.city}, {summary.stateName}
            </span>
            <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
            <span className="inline-flex items-center gap-1 text-[#0E7C74] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>
                {summary.wardOfficesCount} Ward Offices · {summary.prabhagsCount} Prabhags
              </span>
            </span>
          </div>
          <p className="text-[11px] text-[#5A6560]">{summary.accountingScope}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={summary.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-3.5 rounded-[6px] bg-[#FAF8F3] hover:bg-[#E8F2EE] border border-[#E5E0D5] inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors duration-150 whitespace-nowrap"
          >
            <span>PMC Budget Overview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 1. Four Compact KPI Summary Cards */}
      <StatsCards
        summary={summary}
        onViewBudget={() => setActiveTab('budget')}
        onViewRevenue={() => setActiveTab('revenue-expenditure')}
      />

      {/* Plain-Language Budget Glossary for Citizens */}
      <CitizenGlossaryBar />

      {/* 1A. 5-Year Municipal Expenditure & Budget Outlay Trends Dashboard (Recharts) */}
      <ExpenditureTrendsDashboard
        onSelectRecord={onSelectRecord}
        onViewBudgetTracker={() => setActiveTab('budget')}
      />

      {/* 1B. Verified Major Sector Breakdown Strip */}
      <section
        aria-label="Verified Sectoral Provisions"
        className="bg-white rounded-[6px] border border-[#E5E0D5] p-5 space-y-3"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-base font-semibold text-[#133429]">
              Verified Sectoral Budget Provisions (PMC)
            </h2>
            <p className="text-xs text-[#5A6560]">
              Selected verified heads from official budget statements (FY 2024-25 sub-heads &amp; FY 2026-27 initial Commissioner draft remain quarantined)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('departments')}
            className="text-xs font-semibold text-[#0E7C74] hover:text-[#133429] inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>All 20 Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {sectorHighlights.map((sec) => (
            <div
              key={sec.label}
              className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1"
            >
              <span
                className="text-[11px] font-medium text-[#5A6560] block truncate"
                title={sec.label}
              >
                {sec.label}
              </span>
              <span className="text-sm font-bold font-mono tabular-nums text-[#133429] block">
                {formatCroresPrecise(sec.amount)}
              </span>
              <span className="text-[10px] text-[#0E7C74] font-medium block truncate">
                FY {sec.fy} · {sec.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Middle Section: Two Equal-Width Balanced Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* LEFT PANEL: Latest Verified Financial Records */}
        <section
          aria-label="Latest Verified PMC Financial Records"
          className="bg-white rounded-[6px] border border-[#E5E0D5] flex flex-col justify-between overflow-hidden"
        >
          <div>
            <div className="px-6 py-4 border-b border-[#E5E0D5] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-serif text-base font-semibold text-[#133429] tracking-tight">
                  Latest Verified PMC Records
                </h2>
                <p className="text-xs text-[#5A6560] mt-0.5">
                  {verifiedRecords.length} active verified records · {summary.reviewRecordsCount} quarantined in audit ledger
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('records')}
                className="text-xs font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors duration-150 inline-flex items-center gap-1 shrink-0 whitespace-nowrap cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#E5E0D5]">
              {verifiedRecords.slice(0, 6).map((rec) => (
                <button
                  key={rec.unique_id}
                  type="button"
                  onClick={() => onSelectRecord(rec)}
                  className="w-full text-left px-6 py-3.5 flex items-start justify-between gap-4 hover:bg-[#FAF8F3] transition-colors duration-150 cursor-pointer"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="text-[13px] font-medium text-[#1C2422] leading-snug">
                      {rec.record_or_project_name}
                    </div>
                    <div className="text-xs text-[#5A6560]">
                      {rec.department_or_sector} · FY {rec.financial_year}
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <div className="text-[13px] font-mono tabular-nums font-bold text-[#133429]">
                      {formatPrintedWithUnit(rec.amount_as_printed, rec.original_unit)}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-[11px] text-[#5A6560]">{rec.source_classification}</span>
                      <VerificationBadge status={toStandardVerificationBadge(rec.verification_status)} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-3 bg-[#FAF8F3] border-t border-[#E5E0D5] flex items-center justify-between text-xs text-[#5A6560]">
            <span>Click any record to inspect source document &amp; table reference</span>
            <span className="font-mono tabular-nums font-medium text-[#133429]">
              {summary.verifiedRecordsCount} Verified
            </span>
          </div>
        </section>

        {/* RIGHT PANEL: Latest Municipal Projects */}
        <section
          aria-label="Latest PMC Public Projects"
          className="bg-white rounded-[6px] border border-[#E5E0D5] flex flex-col justify-between overflow-hidden"
        >
          <div>
            <div className="px-6 py-4 border-b border-[#E5E0D5] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-serif text-base font-semibold text-[#133429] tracking-tight">
                  Major PMC Public Projects
                </h2>
                <p className="text-xs text-[#5A6560] mt-0.5">
                  {projects.length} officially documented infrastructure projects across Pune
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className="text-xs font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors duration-150 inline-flex items-center gap-1 shrink-0 whitespace-nowrap cursor-pointer"
              >
                <span>Project Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#E5E0D5]">
              {projects.slice(0, 5).map((proj) => (
                <div
                  key={proj.id}
                  className="px-6 py-3.5 flex items-start justify-between gap-4 hover:bg-[#FAF8F3] transition-colors duration-150"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="text-[13px] font-semibold text-[#1C2422] leading-snug">
                      {proj.name}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#5A6560]">
                      <span className="font-medium text-[#0E7C74]">{proj.category}</span>
                      <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                      <span className="inline-flex items-center gap-1 truncate max-w-[240px]">
                        <MapPin className="w-3 h-3 text-[#5A6560] shrink-0" />
                        <span className="truncate">{proj.location}</span>
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5A6560]">
                      {proj.completionStatus} · Spend: Data Not Available
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <div className="text-[14px] font-mono tabular-nums font-bold text-[#133429]">
                      {formatCroresPrecise(proj.sanctionedCost)}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => onSelectProject(proj)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7C74] hover:text-[#133429] transition-colors duration-150 cursor-pointer whitespace-nowrap"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-3 bg-[#FAF8F3] border-t border-[#E5E0D5] flex items-center justify-between text-xs text-[#5A6560]">
            <span>Project costs never inferred from annual dept budgets</span>
            <span className="font-mono tabular-nums font-medium text-[#133429]">
              {projects.length} Projects
            </span>
          </div>
        </section>
      </div>

      {/* 3. Sectoral & Revenue Analytics Section Below */}
      <ChartsSection records={verifiedRecords} defaultTab="sectors" />
    </div>
  );
};
