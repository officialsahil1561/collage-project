import React, { useState, useEffect } from 'react';
import { dataProvider } from '../services/dataProvider';
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

interface SourcesAuditPageProps {
  initialSubTab?: 'registry' | 'reconciliation' | 'methodology';
  onOpenRecords?: () => void;
}

export const SourcesAuditPage: React.FC<SourcesAuditPageProps> = ({
  initialSubTab = 'registry',
  onOpenRecords
}) => {
  const sources = dataProvider.getSourceRegistry();
  const metrics = dataProvider.getReconciliationMetrics();
  const [activeTab, setActiveTab] = useState<'registry' | 'reconciliation' | 'methodology'>(
    initialSubTab
  );
  const [expandedSourceId, setExpandedSourceId] = useState<string | null>(null);
  const [expandedDecisionIdx, setExpandedDecisionIdx] = useState<number | null>(0);
  const [expandedMethodKey, setExpandedMethodKey] = useState<string | null>('classification');

  useEffect(() => {
    setActiveTab(initialSubTab);
  }, [initialSubTab]);

  const auditDecisions = [
    {
      title: '1. FY 2024-25 PMC Departmental Sub-heads (7 Records: PMC_202425_BE_003 to 008, 030)',
      status: 'Partially Verified · Quarantined',
      detail:
        'Quarantined in review dataset (₹5,336.40 Cr across Water, Roads, SWM, Drainage, Health, Education, and Parks). Excluded from active spending aggregates to prevent double-counting against the consolidated FY 2024-25 PMC budget outlay of ₹11,601.00 Cr (PMC_202425_BE_002).'
    },
    {
      title: '2. FY 2022-23 Commissioner Draft Budget (PMC_202223_BE_033 — ₹8,592.00 Cr)',
      status: 'Rejected / Subsumed · Quarantined',
      detail:
        'Commissioner initial draft estimate (₹8,592.00 Cr) was superseded by the Standing Committee final approved budget of ₹9,716.00 Cr (PMC_202223_BE_011). Quarantined so FY 2022-23 budget totals are never counted twice.'
    },
    {
      title: '3. FY 2023-24 Own-Source Revenue Component (PMC_202324_REC_034 — ₹10,632.15 Cr)',
      status: 'Rejected / Subsumed · Quarantined',
      detail:
        'Audited own-source receipts (₹10,632.15 Cr) are already included inside Audited Total Revenue Receipts of ₹11,206.84 Cr (PMC_202324_REC_020 = ₹10,632.15 Cr own + ₹574.69 Cr grants). Quarantined to prevent double counting.'
    },
    {
      title: '4. Balance Sheet Stock & Municipal Bond Debt (PMC_202324_BAL_035 & DEBT_036)',
      status: 'Rejected / Reclassified · Quarantined',
      detail:
        'Total Balance Sheet Size (₹52,698.00 Cr) and Outstanding BSE Municipal Bond Liability (₹200.00 Cr) from PMC Audited Financial Statements are stock measures, not annual revenue or expenditure flows, and are therefore separated from annual spending totals.'
    },
    {
      title: '5. Strict Municipal Boundary Isolation (PMC Exclusive Scope)',
      status: 'Verified · Enforced',
      detail:
        'This platform exclusively tracks Pune Municipal Corporation (PMC). Shared regional entities such as PMPML are strictly isolated to PMC’s statutory 60% municipal share (₹484.96 Cr VGF + ₹23.11 Cr pass concessions); PCMC, Pune Cantonment, Khadki Cantonment, and non-PMC PMRDA outlays are completely excluded.'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub-navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-[#5A6560]">
          Primary Pune Municipal Corporation (PMC) publications, audit reconciliation decisions, and source classification rules.
        </p>

        <div className="flex items-center h-9 gap-0.5 p-1 bg-white border border-[#E5E0D5] rounded-[6px] self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('registry')}
            className={`h-7 px-3 rounded-[4px] text-xs whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeTab === 'registry'
                ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                : 'text-[#5A6560] hover:text-[#133429] font-medium'
            }`}
          >
            PMC Sources ({sources.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reconciliation')}
            className={`h-7 px-3 rounded-[4px] text-xs whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeTab === 'reconciliation'
                ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                : 'text-[#5A6560] hover:text-[#133429] font-medium'
            }`}
          >
            Audit Report ({metrics.total})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('methodology')}
            className={`h-7 px-3 rounded-[4px] text-xs whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeTab === 'methodology'
                ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                : 'text-[#5A6560] hover:text-[#133429] font-medium'
            }`}
          >
            Methodology
          </button>
        </div>
      </div>

      {/* 1. Primary Source Registry */}
      {activeTab === 'registry' && (
        <div className="bg-white rounded-[6px] border border-[#E5E0D5] divide-y divide-[#E5E0D5] overflow-hidden">
          {sources.map((src) => {
            const isExpanded = expandedSourceId === src.id;
            const isVerified = src.verification_status === 'Verified';
            return (
              <div key={src.id} className="p-6 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-[#0E7C74]">{src.exact_authority}</span>
                      <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                      <span className="font-mono tabular-nums text-[#5A6560]">
                        FY {src.financial_years_covered}
                      </span>
                      <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                      <span className="font-mono tabular-nums text-[#5A6560]">
                        Checked {src.last_checked_date}
                      </span>
                      <span aria-hidden="true" className="text-[#D4CEC2]">·</span>
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          isVerified ? 'text-[#0E7C74]' : 'text-[#B45309]'
                        }`}
                      >
                        {isVerified ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                        )}
                        <span>{src.verification_status}</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-base font-semibold text-[#133429]">
                      {src.document_title}
                    </h2>
                    <div className="text-xs text-[#5A6560]">
                      {src.document_type} · {src.data_categories_supported.join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setExpandedSourceId(isExpanded ? null : src.id)}
                      className="h-9 inline-flex items-center gap-1.5 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-medium text-[#1C2422] transition-colors duration-150 cursor-pointer"
                    >
                      <span>Known Limitations</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#5A6560]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#5A6560]" />
                      )}
                    </button>
                    <a
                      href={src.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 inline-flex items-center gap-1.5 px-3.5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold transition-colors duration-150"
                    >
                      <span>Open Official Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] text-xs space-y-1 animate-fadeIn">
                    <span className="font-semibold text-[#B45309] block">
                      Scope &amp; Limitations
                    </span>
                    <p className="leading-relaxed text-[#5A6560]">{src.known_limitations}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Reconciliation Audit Report */}
      {activeTab === 'reconciliation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5]">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
                Total PMC Records
              </span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block mt-1">
                {metrics.total}
              </span>
              <span className="text-xs text-[#5A6560] block mt-0.5">Unique PMC IDs</span>
            </div>
            <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5]">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#0E7C74] block">
                Active Verified
              </span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block mt-1">
                {metrics.verified}
              </span>
              <span className="text-xs text-[#5A6560] block mt-0.5">Aggregation-eligible</span>
            </div>
            <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5]">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#B45309] block">
                Quarantined
              </span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#D97706] block mt-1">
                {metrics.review}
              </span>
              <span className="text-xs text-[#5A6560] block mt-0.5">Excluded from totals</span>
            </div>
            <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5]">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
                Scope Authority
              </span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block mt-1">
                PMC Only
              </span>
              <span className="text-xs text-[#5A6560] block mt-0.5">Pune Municipal Corp.</span>
            </div>
          </div>

          <div className="bg-white rounded-[6px] border border-[#E5E0D5] divide-y divide-[#E5E0D5] overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-between bg-[#FAF8F3]">
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                PMC Reconciliation Audit Decisions (5 Key Findings)
              </h2>
              {onOpenRecords && (
                <button
                  type="button"
                  onClick={onOpenRecords}
                  className="text-xs font-semibold text-[#0E7C74] hover:text-[#133429] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Open Full {metrics.total}-Record Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {auditDecisions.map((item, idx) => {
              const isOpen = expandedDecisionIdx === idx;
              return (
                <div key={item.title} className="p-5">
                  <button
                    type="button"
                    onClick={() => setExpandedDecisionIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="min-w-0">
                      <span className="text-[13px] font-semibold text-[#1C2422] block">
                        {item.title}
                      </span>
                      <span className="text-xs text-[#5A6560] mt-0.5 block">{item.status}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#5A6560] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#5A6560] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-3 pt-3 border-t border-[#E5E0D5] text-xs text-[#5A6560] leading-relaxed">
                      {item.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Methodology */}
      {activeTab === 'methodology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                Official Budget Estimate (BE)
              </h2>
              <p className="text-xs text-[#5A6560] leading-relaxed">
                Proposed or approved financial allocation for the upcoming fiscal year (e.g., PMC FY 2025-26 ₹12,618.09 Cr). It is a spending ceiling, never actual disbursement.
              </p>
            </div>
            <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                Revised Estimate (RE)
              </h2>
              <p className="text-xs text-[#5A6560] leading-relaxed">
                Mid-year updated projections formulated by municipal finance departments. Where RE lines are unpublished in open tables, we display Data Not Available.
              </p>
            </div>
            <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                Audited Financial Statement
              </h2>
              <p className="text-xs text-[#5A6560] leading-relaxed">
                Statutory annual accounts &amp; balance sheet audited through FY 2023-24 (₹8,125.60 Cr actual spend, ₹11,206.84 Cr revenue receipts) published on PMC Open Data.
              </p>
            </div>
            <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1.5">
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                Data Not Available vs Zero Policy
              </h2>
              <p className="text-xs text-[#5A6560] leading-relaxed">
                Missing expenditure figures, contractor names, ward budgets, or project completion dates are explicitly labeled Data Not Available — zero is never substituted for missing disclosures.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[6px] border border-[#E5E0D5] divide-y divide-[#E5E0D5] overflow-hidden">
            <div className="p-5">
              <button
                type="button"
                onClick={() =>
                  setExpandedMethodKey(
                    expandedMethodKey === 'classification' ? null : 'classification'
                  )
                }
                className="w-full flex items-center justify-between text-left cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#133429]">
                  <ShieldCheck className="w-4 h-4 text-[#0E7C74]" />
                  <span>6-Tier Source Classification Standard</span>
                </span>
                {expandedMethodKey === 'classification' ? (
                  <ChevronUp className="w-4 h-4 text-[#5A6560]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#5A6560]" />
                )}
              </button>
              {expandedMethodKey === 'classification' && (
                <p className="mt-3 pt-3 border-t border-[#E5E0D5] text-xs text-[#5A6560] leading-relaxed">
                  Every record carries an explicit classification tag: Official Budget Estimate, Revised Estimate, Actual Expenditure, Audited Financial Statement, Internally Reconciled, or Unverified / Under Review. Internally reconciled records are never labeled as independently audited unless backed by PMC’s audited financial statement PDF.
                </p>
              )}
            </div>

            <div className="p-5">
              <button
                type="button"
                onClick={() =>
                  setExpandedMethodKey(
                    expandedMethodKey === 'normalization' ? null : 'normalization'
                  )
                }
                className="w-full flex items-center justify-between text-left cursor-pointer"
              >
                <span className="text-[13px] font-semibold text-[#133429]">
                  Currency Normalization &amp; Double-Count Quarantine Rules
                </span>
                {expandedMethodKey === 'normalization' ? (
                  <ChevronUp className="w-4 h-4 text-[#5A6560]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#5A6560]" />
                )}
              </button>
              {expandedMethodKey === 'normalization' && (
                <p className="mt-3 pt-3 border-t border-[#E5E0D5] text-xs text-[#5A6560] leading-relaxed">
                  All PMC Crore figures convert strictly at ₹1 Crore = 10,000,000 INR (10⁷). Quarantined sub-heads, subsumed draft budgets, subsumed own-source revenue components, balance-sheet stocks, and bond principal liabilities carry aggregation_eligible: false so they remain inspectable without inflating aggregate totals.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
