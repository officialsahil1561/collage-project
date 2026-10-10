import React, { useState } from 'react';
import { dataProvider } from '../services/dataProvider';
import { ExternalLink, Database, ShieldCheck, AlertCircle, BookOpen, CheckCircle2, FileText, Download, AlertTriangle } from 'lucide-react';

export const SourcesAuditPage: React.FC = () => {
  const sources = dataProvider.getSourceRegistry();
  const metrics = dataProvider.getReconciliationMetrics();
  const [activeTab, setActiveTab] = useState<'registry' | 'methodology' | 'reconciliation'>('registry');

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B3B] tracking-tight">
          About the Data — Sources, Methodology & Audit Ledger
        </h1>
        <p className="text-xs sm:text-sm text-[#142B3B]/70 mt-1">
          Explore how JanDhan Insights extracts, verifies, and audits municipal finance records across Pune, Mumbai, Greater Jaipur, and Jaipur Heritage.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#142B3B]/10 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('registry')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'registry'
              ? 'bg-[#142B3B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          Primary Source Registry ({sources.length})
        </button>
        <button
          onClick={() => setActiveTab('reconciliation')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'reconciliation'
              ? 'bg-[#0D9488] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          Reconciliation Audit Report (30 Records)
        </button>
        <button
          onClick={() => setActiveTab('methodology')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'methodology'
              ? 'bg-[#142B3B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          Financial Methodology & Definitions
        </button>
      </div>

      {/* 1. Primary Source Registry Tab */}
      {activeTab === 'registry' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map(src => (
              <div 
                key={src.id}
                className="bg-white rounded-2xl border border-[#142B3B]/10 shadow-xs p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider block">
                        {src.exact_authority}
                      </span>
                      <h3 className="text-base font-bold text-[#142B3B] mt-0.5">
                        {src.document_title}
                      </h3>
                      <p className="text-xs text-slate-500">{src.document_type}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      {src.verification_status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8F9F7] p-3 rounded-xl border border-[#142B3B]/5">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Years Covered</span>
                      <span className="font-semibold text-slate-800">{src.financial_years_covered}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Checked Date</span>
                      <span className="font-mono text-slate-800">{src.last_checked_date}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div>
                      <span className="font-semibold text-slate-600 block">Categories Covered:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {src.data_categories_supported.map((cat, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 text-[11px] text-slate-600 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/50 leading-relaxed">
                      <span className="font-bold text-amber-900 block mb-0.5">Known Limitations:</span>
                      {src.known_limitations}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#142B3B]/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Primary Official Publication</span>
                  <a
                    href={src.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#0D9488] font-bold hover:underline"
                  >
                    <span>Open Official Document</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Reconciliation Audit Report Tab */}
      {activeTab === 'reconciliation' && (
        <div className="space-y-5 bg-white p-6 rounded-2xl border border-[#142B3B]/10 shadow-xs">
          
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#142B3B]">
              Master Reconciliation Audit Summary (All 30 Records)
            </h2>
            <p className="text-xs text-slate-500">
              Audit results calculated directly from final synchronized datasets.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Total Audited Records</span>
              <span className="text-2xl font-bold font-mono text-[#142B3B]">{metrics.total}</span>
              <span className="text-[10px] text-slate-500 block">30 unique IDs</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-emerald-700 block font-bold text-[10px] uppercase">Active Verified</span>
              <span className="text-2xl font-bold font-mono text-emerald-800">{metrics.verified}</span>
              <span className="text-[10px] text-emerald-600 block">Eligible for aggregates</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-amber-700 block font-bold text-[10px] uppercase">Review & Quarantined</span>
              <span className="text-2xl font-bold font-mono text-amber-800">{metrics.review}</span>
              <span className="text-[10px] text-amber-600 block">Excluded from spending totals</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Authorities Audited</span>
              <span className="text-2xl font-bold font-mono text-[#0D9488]">{metrics.authoritiesCount}</span>
              <span className="text-[10px] text-slate-500 block">PMC, BMC, JMC Greater & Heritage</span>
            </div>
          </div>

          {/* Detailed Decision Table */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[#142B3B]">Audit Target Decisions & Evidence Findings</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">1. Pune Departmental Sub-heads (7 Records: PMC_202425_BE_003 to 008, 030)</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Decision:</strong> Quarantined in review file as <em>Partially Verified</em> (₹5,336.40 Cr total across sub-heads). Excluded from active totals to prevent double-counting with PMC's total municipal outlay of ₹11,601.00 Cr (PMC_202425_BE_002).
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">2. BMC Actual Expenditure (BMC_202324_ACT_023)</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Decision:</strong> Quarantined in review file as <em>Unverified</em> (₹18,281.78 Cr). Figure cited in speech comparative table; withheld until formal audited CAG / Local Fund balance sheet is published.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">3. BMC Total Budget Scope (BMC_202526_BE_010)</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Decision:</strong> Verified and active (₹74,427.41 Cr). Confirmed on Page 6 of BMC Commissioner Speech PDF: explicitly covers combined municipal budget outlay across Funds A, B, E, G, and support to T.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">4. Jaipur Octroi Grant Subsumption (JMC_GR_202223_ACT_029)</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Decision:</strong> Quarantined as <em>Rejected / Subsumed</em>. Account Head 1202001 (₹275.00 Cr octroi compensation) is already included in JMC Greater Total Revenue Receipts (₹502.99 Cr). Excluded to prevent double counting.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">5. Jaipur Balance Sheet Metric (JMC_GR_202122_ACT_027)</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Decision:</strong> Quarantined as <em>Rejected / Reclassified</em>. Metric of ₹1,110.06 Cr represents cumulative balance-sheet assets and liabilities, not public expenditure or revenue flows.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">6. Jaipur Heritage Deficit Metric (JMC_HER_202223_ACT_028)</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Decision:</strong> Quarantined as <em>Rejected / Reclassified</em>. Metric of ₹42.15 Cr represents an accounting deficit on income and expenditure, not total municipal spending outflow.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 3. Methodology Tab */}
      {activeTab === 'methodology' && (
        <div className="bg-white p-6 rounded-2xl border border-[#142B3B]/10 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-[#142B3B]">
              Financial Accounting Categories & Principles
            </h2>
            <p>
              Municipal public finances follow statutory accounting standards governed by State Municipal Acts. JanDhan Insights strictly preserves standard financial categories:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h3 className="font-bold text-[#142B3B]">Budget Estimates (BE)</h3>
              <p>
                The planned financial allocation presented by the Municipal Commissioner before the commencement of the financial year. A BE is a spending authorization, not money actually spent.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h3 className="font-bold text-[#142B3B]">Revised Estimates (RE)</h3>
              <p>
                Mid-year adjusted expenditure projections formulated by the administration based on progressive tax receipts and actual works execution up to that point.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h3 className="font-bold text-[#142B3B]">Actual Expenditure</h3>
              <p>
                Money officially disbursed and recorded in audited annual accounts. Actuals are published with a reporting lag following statutory audit by the State Local Fund Audit / CAG.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h3 className="font-bold text-[#142B3B]">Revenue Receipts vs Capital Outlays</h3>
              <p>
                Revenue receipts are recurring municipal income (property taxes, octroi compensation, water fees). Capital outlays represent long-term infrastructure assets. They are never summed together.
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Currency Normalization Rule</span>
            </div>
            <p>
              All amounts printed in Crore INR are programmatically converted into normalized INR currency units using the exact relation ₹1 Crore = 10,000,000 INR (10⁷). Lakhs are converted at ₹1 Lakh = 100,000 INR (10⁵).
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
