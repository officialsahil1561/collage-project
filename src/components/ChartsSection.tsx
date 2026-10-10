import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { ReconciledRecord } from '../types';
import { formatCroresPrecise, formatNormalizedINR } from '../utils/formatters';

interface ChartsSectionProps {
  authorityName: string;
  records: ReconciledRecord[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ authorityName, records }) => {
  // Filter only aggregation-eligible verified records
  const eligibleRecords = records.filter(r => r.aggregation_eligible);

  if (eligibleRecords.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-[#142B3B]/10 text-center text-xs text-[#142B3B]/50 my-4">
        No active verified departmental records available for visualization for this authority.
      </div>
    );
  }

  // Format data for chart
  const data = eligibleRecords.map(r => ({
    id: r.unique_id,
    fullName: r.record_or_project_name,
    shortName: r.record_or_project_name.length > 28 ? r.record_or_project_name.substring(0, 26) + '...' : r.record_or_project_name,
    amount: r.amount_in_crores,
    category: r.financial_category,
    year: r.financial_year,
    normalized: r.normalized_inr_unit,
    source: r.document_title
  }));

  const TEAL_PALETTE = ['#0D9488', '#0f766e', '#14b8a6', '#0369a1', '#0284c7', '#0891b2', '#059669', '#10b981'];

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#142B3B]/10 shadow-xs space-y-3 my-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#142B3B]/10">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#142B3B]">
            Verified Financial Outlays & Allocations — {authorityName}
          </h3>
          <p className="text-xs text-[#142B3B]/60 mt-0.5">
            Displays only verified, aggregation-eligible records from primary official documents
          </p>
        </div>
        <div className="text-[11px] font-semibold text-[#0D9488] bg-[#0D9488]/10 px-2.5 py-1 rounded-md border border-[#0D9488]/20 self-start sm:self-auto">
          Unit: ₹ Crore (₹1 Cr = 10⁷ INR)
        </div>
      </div>

      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ top: 5, right: 35, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#142B3B" strokeOpacity={0.08} />
            <XAxis 
              type="number" 
              tick={{ fontSize: 11, fill: '#142B3B' }} 
              tickFormatter={(val) => `₹${val.toLocaleString('en-IN')} Cr`}
            />
            <YAxis 
              dataKey="shortName" 
              type="category" 
              tick={{ fontSize: 11, fill: '#142B3B' }} 
              width={160} 
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-3.5 border border-[#142B3B]/15 rounded-xl shadow-lg text-xs space-y-1.5 max-w-xs z-50">
                      <div className="font-bold text-[#142B3B]">{d.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">ID: {d.id} · FY {d.year}</div>
                      <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-slate-600 font-medium">Category:</span>
                        <span className="font-semibold text-[#142B3B]">{d.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-medium">Outlay:</span>
                        <span className="font-bold font-mono text-[#0D9488]">
                          {formatCroresPrecise(d.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Normalized:</span>
                        <span className="font-mono">{formatNormalizedINR(d.normalized)}</span>
                      </div>
                      <div className="pt-1 text-[10px] text-slate-400 italic line-clamp-2">
                        Source: {d.source}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={TEAL_PALETTE[index % TEAL_PALETTE.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] text-[#142B3B]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-[#142B3B]/5">
        <span>* Quarantined review items are strictly excluded from chart visualization.</span>
        <span>Isolated by Category & Accounting Stage</span>
      </div>
    </div>
  );
};
