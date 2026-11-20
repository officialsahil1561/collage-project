import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { dataProvider } from '../services/dataProvider';
import { VerificationBadge } from '../components/VerificationBadge';
import { Leaf, ExternalLink, Recycle, Waves, Wind, Trees } from 'lucide-react';

export const EnvironmentPage: React.FC = () => {
  const indicators = dataProvider.getEnvironmentIndicators();

  const wasteChartData = [
    { stream: 'Total Daily Waste Generated', tpd: 2400, fill: '#133429' },
    { stream: 'Dry Waste Generated (~Avg)', tpd: 1375, fill: '#0E7C74' },
    { stream: 'Dry Waste Processing Cap.', tpd: 1440, fill: '#2B8A7E' },
    { stream: 'Wet Waste Processing Cap.', tpd: 1105, fill: '#6FB3A8' }
  ];

  const domainIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'Solid Waste Management': Recycle,
    'River & Water Ecology': Waves,
    'Urban Greenery & Biodiversity': Trees,
    'Air & Noise Monitoring': Wind
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top ESR Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Daily Solid Waste (ESR 24-25)
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
            ~2,400 TPD
          </span>
          <span className="text-xs text-[#0E7C74] block">
            ~95% segregated door-to-door collection
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            Recorded Urban Trees
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#0E7C74] block">
            5.78 Lakh+
          </span>
          <span className="text-xs text-[#5A6560] block">
            275 documented avian species · 200+ parks
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] block">
            River Abatement STPs (JICA)
          </span>
          <span className="text-2xl font-bold font-mono tabular-nums text-[#133429] block">
            +396 MLD (11 STPs)
          </span>
          <span className="text-xs text-[#5A6560] block">
            Supplementing ~567 MLD existing STPs
          </span>
        </div>

        <div className="bg-white p-5 rounded-[6px] border border-[#E5E0D5] space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#B45309] block">
            Live Station AQI Feed
          </span>
          <span className="text-xl font-bold font-mono text-[#B45309] block">
            Unavailable
          </span>
          <span className="text-xs text-[#5A6560] block">
            Real-time CAAQMS telemetry hosted by MPCB/CPCB
          </span>
        </div>
      </div>

      {/* Solid Waste Generation vs Processing Chart */}
      <section className="bg-white rounded-[6px] border border-[#E5E0D5] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#0E7C74] shrink-0" />
            <div>
              <h2 className="font-serif text-base font-semibold text-[#133429]">
                Pune Solid Waste Generation vs Processing Capacity (Tonnes Per Day)
              </h2>
              <p className="text-xs text-[#5A6560]">
                From PMC Sec. 67A Environment Status Report (ESR) 2024-25 &amp; SWM Capital Outlay (₹105.40 Cr)
              </p>
            </div>
          </div>

          <a
            href="https://www.pmc.gov.in/en/environment-status-report"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-3.5 rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>Open PMC ESR Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={wasteChartData}
              margin={{ top: 10, right: 24, left: 4, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D5" />
              <XAxis
                dataKey="stream"
                tick={{ fontSize: 11, fill: '#1C2422', fontWeight: 500 }}
                axisLine={{ stroke: '#E5E0D5' }}
                tickLine={false}
              />
              <YAxis
                width={52}
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
                        <div className="font-semibold text-[#133429]">{d.stream}</div>
                        <div className="font-mono font-bold text-[#0E7C74]">
                          {d.tpd.toLocaleString('en-IN')} TPD
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="tpd" radius={[4, 4, 0, 0]} barSize={48}>
                {wasteChartData.map((entry) => (
                  <Cell key={entry.stream} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4 Environment Status Report Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {indicators.map((ind) => {
          const Icon = domainIcons[ind.domain] || Leaf;
          return (
            <div
              key={ind.id}
              className="bg-white p-6 rounded-[6px] border border-[#E5E0D5] flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-semibold text-[#0E7C74]">
                    {ind.domain} · {ind.reportingCycle}
                  </span>
                  <VerificationBadge status={ind.verificationBadge} />
                </div>

                <h3 className="font-serif text-base font-semibold text-[#133429] flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#0E7C74] shrink-0" />
                  <span>{ind.title}</span>
                </h3>

                <div className="p-3 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5]">
                  <span className="text-[11px] text-[#5A6560] block">ESR Reported Indicator</span>
                  <span className="text-sm font-mono font-bold text-[#133429] block mt-0.5">
                    {ind.metricValue}
                  </span>
                </div>

                <p className="text-xs text-[#1C2422] leading-relaxed">{ind.details}</p>
              </div>

              <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between text-xs">
                <span className="text-[#5A6560] truncate max-w-[230px]">{ind.sourceTitle}</span>
                <a
                  href={ind.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#0E7C74] hover:text-[#133429]"
                >
                  <span>ESR Source</span>
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
