import React, { useState } from 'react';
import { dataProvider } from '../services/dataProvider';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Building2,
  Info
} from 'lucide-react';

export const InfrastructurePage: React.FC = () => {
  const assets = dataProvider.getCivicAssets();
  const [typeFilter, setTypeFilter] = useState<string>('All');

  const filtered = assets.filter((a) =>
    typeFilter === 'All' ? true : a.metricType === typeFilter
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Verification Standard */}
      <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-base font-semibold text-[#133429]">
            PMC Civic Infrastructure &amp; Environment Status Report (ESR) Assets
          </h2>
          <p className="text-xs text-[#5A6560] leading-relaxed">
            Tracks all 12 core Pune civic service sectors. Distinguishes{' '}
            <strong className="text-[#0E7C74]">Verified Service Data</strong> from{' '}
            <strong className="text-[#133429]">Official Report Estimates</strong> and explicitly flags sectors where granular counts are{' '}
            <strong className="text-[#B45309]">Unavailable</strong>.
          </p>
        </div>

        <a
          href="https://www.pmc.gov.in/en/environment-status-report"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-3.5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 self-start lg:self-auto"
        >
          <span>PMC Environment Status Report</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[#E5E0D5] rounded-[6px] w-fit">
        {[
          { key: 'All', label: `All Sectors (${assets.length})` },
          { key: 'Verified Service Data', label: 'Verified Service Data' },
          { key: 'Official Report Estimate', label: 'Official Report Estimate' },
          { key: 'Granular Count Unavailable', label: 'Granular Count Unavailable' }
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setTypeFilter(tab.key)}
            className={`h-8 px-3 rounded-[4px] text-xs transition-colors cursor-pointer ${
              typeFilter === tab.key
                ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                : 'text-[#5A6560] hover:text-[#133429] font-medium'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 12 Civic Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const isVerified = item.metricType === 'Verified Service Data';
          const isUnavailable = item.metricType === 'Granular Count Unavailable';
          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-mono text-[#5A6560]">ESR {item.reportingYear}</span>
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      isVerified
                        ? 'text-[#0E7C74]'
                        : isUnavailable
                        ? 'text-[#B45309]'
                        : 'text-[#133429]'
                    }`}
                  >
                    {isVerified ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : isUnavailable ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-[#0E7C74]" />
                    )}
                    <span>{item.metricType}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base font-semibold text-[#133429] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#0E7C74] shrink-0" />
                    <span>{item.sector}</span>
                  </h3>
                  <div className="text-xs text-[#5A6560] mt-0.5">{item.department}</div>
                </div>

                <div className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5]">
                  <span className="text-[11px] text-[#5A6560] block">Documented Indicator</span>
                  <span className="text-sm font-bold font-mono tabular-nums text-[#133429] block mt-0.5">
                    {item.headlineMetric}
                  </span>
                </div>

                <p className="text-xs text-[#1C2422] leading-relaxed">{item.details}</p>
                <p className="text-[11px] text-[#5A6560] leading-relaxed">
                  {item.serviceCoverageNote}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between text-xs">
                <span className="text-[#5A6560] truncate max-w-[190px]" title={item.sourceTitle}>
                  {item.sourceTitle}
                </span>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
                >
                  <span>Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
