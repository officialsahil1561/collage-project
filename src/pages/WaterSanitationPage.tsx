import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { dataProvider } from '../services/dataProvider';
import { VerificationBadge } from '../components/VerificationBadge';
import { Droplets, Waves, ExternalLink, AlertCircle, ShieldCheck } from 'lucide-react';

export const WaterSanitationPage: React.FC = () => {
  const wtps = dataProvider.getWaterTreatmentPlants();
  const stps = dataProvider.getSewageTreatmentPlants();
  const [selectedProgram, setSelectedProgram] = useState<'all' | 'wtp' | 'stp'>('all');

  const totalJicaMLD = stps.reduce((sum, s) => sum + s.capacityMLD, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Water & Sanitation KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            City Drinking Water Supply
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block">
            1,400–1,500+ MLD
          </span>
          <span className="text-xs text-[#5A6560] block">
            Khadakwasla &amp; Bhama Askhed dams (ESR 24-25)
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Water Supply Outlay (25-26 BE)
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
            ₹1,665.00 crore
          </span>
          <span className="text-xs text-[#5A6560] block">
            24x7 equitable supply, WTPs &amp; merged villages
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Sewage Treatment Expansion
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block">
            ~567 + {totalJicaMLD} MLD
          </span>
          <span className="text-xs text-[#5A6560] block">
            Existing capacity + 11 new JICA STPs (₹990.26 Cr)
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#B45309] block">
            Ward-Wise Supply Hours / Loss
          </span>
          <span className="text-xl font-bold font-mono text-[#B45309] block">
            Data Not Available
          </span>
          <span className="text-xs text-[#5A6560] block">
            Live SCADA / DMA leakage telemetry not public
          </span>
        </div>
      </div>

      {/* Filter & Official Portal Bar */}
      <div className="bg-white p-4 rounded-[6px] border border-[#E5E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px]">
          {[
            { key: 'all', label: 'All Water & STP Infrastructure' },
            { key: 'wtp', label: `Water Treatment Plants (${wtps.length})` },
            { key: 'stp', label: `JICA 11-STP Expansion (${stps.length})` }
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedProgram(tab.key as 'all' | 'wtp' | 'stp')}
              className={`h-8 px-3 rounded-[4px] text-xs transition-colors cursor-pointer ${
                selectedProgram === tab.key
                  ? 'bg-[#133429] text-[#FAF8F3] font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://www.pmc.gov.in/en/24x7-water-supply"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-3 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white text-xs font-semibold text-[#133429] inline-flex items-center gap-1.5"
          >
            <span>24x7 Water Portal</span>
            <ExternalLink className="w-3 h-3 text-[#0E7C74]" />
          </a>
          <a
            href="https://www.pmc.gov.in/en/jica-project"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-3 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <span>JICA Mula-Mutha Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Water Treatment Plants Section */}
      {(selectedProgram === 'all' || selectedProgram === 'wtp') && (
        <section className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#0E7C74] shrink-0" />
              <div>
                <h2 className="font-serif text-base font-semibold text-[#133429]">
                  PMC Water Treatment Plants (WTPs) &amp; Bulk Sources
                </h2>
                <p className="text-xs text-[#5A6560]">
                  Documented water works supplying Pune from Khadakwasla and Bhama Askhed reservoirs
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[#5A6560]">
              FY 25-26 Metered Target: ₹125 Cr (Arrears flagged: ₹727 Cr)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {wtps.map((wtp) => (
              <div
                key={wtp.id}
                className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-[#0E7C74]">
                      {wtp.sourceDam}
                    </span>
                    <VerificationBadge status={wtp.verificationBadge} />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-[#133429]">{wtp.name}</h3>
                  <div className="font-mono text-xs font-bold text-[#133429]">
                    {wtp.capacityLabel}
                  </div>
                  <p className="text-[11px] text-[#5A6560] leading-relaxed">
                    <strong>Areas Served:</strong> {wtp.zonesServed}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#E5E0D5] flex items-center justify-between text-[11px]">
                  <span className="text-[#5A6560]">{wtp.status}</span>
                  <a
                    href={wtp.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* JICA 11 STPs Chart & Directory */}
      {(selectedProgram === 'all' || selectedProgram === 'stp') && (
        <section className="bg-white rounded-[6px] border border-[#E5E0D5] p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-[#0E7C74] shrink-0" />
              <div>
                <h2 className="font-serif text-base font-semibold text-[#133429]">
                  JICA Mula–Mutha River Pollution Abatement — 11 New STPs ({totalJicaMLD} MLD)
                </h2>
                <p className="text-xs text-[#5A6560]">
                  Sanctioned ₹990.26 Cr (85% GoI/JICA grant ₹841.72 Cr + 15% PMC share ₹148.54 Cr) complementing ~567 MLD existing STP capacity
                </p>
              </div>
            </div>
            <VerificationBadge status="Verified" detailLabel="Official JICA / PMC Schedule" />
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stps}
                margin={{ top: 10, right: 20, left: 0, bottom: 36 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D5" />
                <XAxis
                  dataKey="name"
                  angle={-22}
                  textAnchor="end"
                  height={62}
                  tick={{ fontSize: 10, fill: '#1C2422', fontWeight: 500 }}
                  axisLine={{ stroke: '#E5E0D5' }}
                  tickLine={false}
                />
                <YAxis
                  width={48}
                  tick={{ fontSize: 11, fill: '#5A6560' }}
                  tickFormatter={(v) => `${v}`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#FAF8F3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-[#E5E0D5] rounded-[6px] shadow-md text-xs space-y-1">
                          <div className="font-semibold text-[#133429]">{d.name}</div>
                          <div className="font-mono font-bold text-[#0E7C74]">
                            {d.capacityMLD} MLD Capacity
                          </div>
                          <div className="text-[11px] text-[#5A6560]">{d.wardOrLocality}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  name="Treatment Capacity (MLD)"
                  dataKey="capacityMLD"
                  fill="#0E7C74"
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto border border-[#E5E0D5] rounded-[6px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#FAF8F3] border-b border-[#E5E0D5] text-[#5A6560]">
                <tr>
                  <th className="py-2.5 px-4">STP Facility</th>
                  <th className="py-2.5 px-4">Locality / Prabhag</th>
                  <th className="py-2.5 px-4 text-right">Capacity (MLD)</th>
                  <th className="py-2.5 px-4">Implementation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D5]">
                {stps.map((stp) => (
                  <tr key={stp.id} className="hover:bg-[#FAF8F3]">
                    <td className="py-2.5 px-4 font-semibold text-[#133429]">{stp.name}</td>
                    <td className="py-2.5 px-4 text-[#5A6560]">{stp.wardOrLocality}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-[#0E7C74]">
                      {stp.capacityMLD} MLD
                    </td>
                    <td className="py-2.5 px-4 text-[#1C2422]">{stp.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Drainage & Water Quality Transparency Disclosures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#133429]">
              <ShieldCheck className="w-4 h-4 text-[#0E7C74]" />
              <span>Stormwater Drainage &amp; Sewage Budget Status</span>
            </span>
            <VerificationBadge status="Under Review" detailLabel="₹620.10 Cr Sub-head Quarantined" />
          </div>
          <p className="text-xs text-[#5A6560] leading-relaxed">
            FY 2024-25 Drainage departmental sub-head (₹620.10 Cr, PMC_202425_BE_006) remains quarantined in the audit ledger to prevent double-counting against the ₹11,601 Cr consolidated budget. Exact ward-wise stormwater nalla and underground drain km lengths are marked <strong>Data Not Available</strong>.
          </p>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#133429]">
              <AlertCircle className="w-4 h-4 text-[#D97706]" />
              <span>Daily Water Quality &amp; Tanker Dispatch Logs</span>
            </span>
            <VerificationBadge status="Unavailable" detailLabel="Data Not Available" />
          </div>
          <p className="text-xs text-[#5A6560] leading-relaxed">
            Daily residual chlorine lab test logs per ESR and ward-level municipal tanker trip counts are published internally by PMC Water Supply and annual ESR reviews. Real-time ward-level tables are unavailable in open APIs.
          </p>
          <a
            href="https://www.pmc.gov.in/en/water-supply"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7C74] hover:text-[#133429]"
          >
            <span>Check PMC Water Supply Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
