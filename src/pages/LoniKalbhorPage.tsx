import React, { useState } from 'react';
import { dataProvider } from '../services/dataProvider';
import { formatCroresPrecise } from '../utils/formatters';
import {
  MapPin,
  Building2,
  Users,
  Droplet,
  Truck,
  GraduationCap,
  HeartPulse,
  Landmark,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export const LoniKalbhorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'demographics' | 'water' | 'roads' | 'facilities' | 'projects' | 'finance' | 'sources'
  >('overview');

  const profile = dataProvider.getLoniKalbhorProfile();
  const demographics = dataProvider.getLoniKalbhorDemographics();
  const water = dataProvider.getLoniKalbhorWaterFacilities();
  const roads = dataProvider.getLoniKalbhorRoads();
  const facilities = dataProvider.getLoniKalbhorFacilities();
  const projects = dataProvider.getLoniKalbhorProjects();
  const finance = dataProvider.getLoniKalbhorFinanceRecords();
  const sources = dataProvider.getLoniKalbhorSources();

  const tabs: Array<{ id: typeof activeTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'overview', label: 'Village Overview', icon: Building2 },
    { id: 'demographics', label: 'Demographics', icon: Users },
    { id: 'water', label: 'Water & Sanitation', icon: Droplet },
    { id: 'roads', label: 'Roads & Transport', icon: Truck },
    { id: 'facilities', label: 'Public Facilities', icon: GraduationCap },
    { id: 'projects', label: 'Development Projects', icon: Layers },
    { id: 'finance', label: 'Local Finance', icon: Landmark },
    { id: 'sources', label: 'Sources & Provenance', icon: FileText }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Loni Kalbhor Hero Banner */}
      <div className="bg-[#133429] text-[#FAF8F3] p-8 rounded-[8px] border border-[#0E7C74]/30 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0E7C74]/40 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#0E7C74]/25 border border-[#0E7C74]/40 text-[#FAF8F3] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E9A23B]" />
            <span>Independent Rural / Semi-Urban Jurisdiction — Separate from PMC</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            {profile.villageNameEnglish} ({profile.villageNameMarathi})
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF8F3]/85 leading-relaxed">
            Haveli Taluka, Pune District, Maharashtra, India · Census Code: <span className="font-mono text-[#E9A23B]">{profile.censusCode}</span> · LGD Code: <span className="font-mono text-[#E9A23B]">{profile.lgdCode}</span>
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#FAF8F3]/80">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E9A23B]" />
              Lat/Lng: {profile.coordinates.lat}° N, {profile.coordinates.lng}° E
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-[#E9A23B]" />
              Governing Body: {profile.governingBody}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#E5E0D5]">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`h-9 px-3.5 rounded-[6px] text-xs font-semibold whitespace-nowrap inline-flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#133429] text-[#FAF8F3] shadow-xs'
                  : 'bg-white text-[#5A6560] hover:text-[#133429] border border-[#E5E0D5]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E9A23B]' : 'text-[#0E7C74]'}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#133429]">Administrative & Geographic Profile</h3>
              <p className="text-xs text-[#5A6560] leading-relaxed">
                {profile.administrativeNote}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3.5 bg-[#FAF8F3] rounded-[6px] border border-[#E5E0D5]">
                  <span className="text-[#5A6560] block font-medium">Taluka &amp; District</span>
                  <span className="font-semibold text-[#1C2422] text-sm">{profile.taluka} Taluka, {profile.district} District</span>
                </div>
                <div className="p-3.5 bg-[#FAF8F3] rounded-[6px] border border-[#E5E0D5]">
                  <span className="text-[#5A6560] block font-medium">Boundary Area</span>
                  <span className="font-semibold text-[#1C2422] text-sm">{profile.boundaryAreaSqKm} sq. km</span>
                </div>
                <div className="p-3.5 bg-[#FAF8F3] rounded-[6px] border border-[#E5E0D5]">
                  <span className="text-[#5A6560] block font-medium">Assembly &amp; Parliamentary</span>
                  <span className="font-semibold text-[#1C2422] text-sm">{profile.assemblyConstituency} / {profile.parliamentaryConstituency}</span>
                </div>
                <div className="p-3.5 bg-[#FAF8F3] rounded-[6px] border border-[#E5E0D5]">
                  <span className="text-[#5A6560] block font-medium">PIN Code</span>
                  <span className="font-semibold text-[#1C2422] text-sm">{profile.pincode}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-4">
              <h3 className="font-serif text-base font-semibold text-[#133429]">Nearby Settlements</h3>
              <ul className="space-y-2 text-xs">
                {profile.nearbySettlements.map((settlement, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2.5 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] text-[#1C2422] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#0E7C74]" />
                    <span>{settlement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'demographics' && (
          <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E0D5] pb-4">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#133429]">Demographic Intelligence &amp; Census Data</h3>
                <p className="text-xs text-[#5A6560]">Based on Census of India {demographics.censusYear} Village Directory records.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#E8F2EE] text-[#0E7C74] text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Census Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                <span className="text-xs text-[#5A6560]">Total Population ({demographics.censusYear})</span>
                <div className="font-mono text-xl font-bold text-[#133429]">
                  {demographics.totalPopulation.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                <span className="text-xs text-[#5A6560]">Total Households</span>
                <div className="font-mono text-xl font-bold text-[#133429]">
                  {demographics.totalHouseholds.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                <span className="text-xs text-[#5A6560]">Literacy Rate</span>
                <div className="font-mono text-xl font-bold text-[#0E7C74]">
                  {demographics.literacyRatePct}%
                </div>
              </div>
              <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1">
                <span className="text-xs text-[#5A6560]">Population Density</span>
                <div className="font-mono text-xl font-bold text-[#133429]">
                  {demographics.populationDensitySqKm} / sq.km
                </div>
              </div>
            </div>

            <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-2 text-xs">
              <span className="font-semibold text-[#133429] block">Current Population Estimation:</span>
              <p className="text-[#5A6560] leading-relaxed">
                {demographics.projectedCurrentPopulation}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'water' && (
          <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#133429]">Water Supply &amp; Sanitation Infrastructure</h3>
              <p className="text-xs text-[#5A6560]">Monitoring Mula-Mutha river extraction, Jal Jeevan Mission piped networks, and overhead tanks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {water.map((w) => (
                <div key={w.id} className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#0E7C74] font-semibold">{w.infrastructureType}</span>
                      <h4 className="font-semibold text-[#1C2422] text-sm mt-0.5">{w.facilityName}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-[4px] bg-[#E8F2EE] text-[#0E7C74] text-[11px] font-semibold">
                      {w.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-[#E5E0D5]">
                    <div>
                      <span className="text-[#5A6560] block font-sans text-[11px]">Capacity:</span>
                      {w.capacityMLD !== null ? `${w.capacityMLD} MLD` : 'N/A'}
                    </div>
                    <div>
                      <span className="text-[#5A6560] block font-sans text-[11px]">Actual Supply:</span>
                      {w.actualSupplyMLD !== null ? `${w.actualSupplyMLD} MLD` : 'N/A'}
                    </div>
                  </div>
                  <div className="text-[11px] text-[#5A6560] pt-1">
                    Authority: <strong className="text-[#1C2422]">{w.managingAuthority}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'roads' && (
          <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#133429]">Roads &amp; Transportation Network</h3>
              <p className="text-xs text-[#5A6560]">Classifying national highways, district roads, and Gram Panchayat rural links.</p>
            </div>

            <div className="space-y-3">
              {roads.map((r) => (
                <div key={r.id} className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#133429] text-[#FAF8F3] text-[10px] font-mono font-semibold">
                        {r.classification}
                      </span>
                      <span className="text-xs text-[#5A6560] font-mono">{r.lengthKm} km</span>
                    </div>
                    <h4 className="font-semibold text-[#1C2422] text-sm">{r.roadName}</h4>
                    <div className="text-[11px] text-[#5A6560]">
                      Surface: {r.surfaceType} · Condition: <strong className="text-[#1C2422]">{r.condition}</strong>
                    </div>
                  </div>
                  <div className="text-xs text-[#5A6560] shrink-0 font-medium bg-white px-3 py-1.5 rounded-[6px] border border-[#E5E0D5]">
                    {r.authority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#133429]">Public Facilities, Education &amp; Healthcare</h3>
              <p className="text-xs text-[#5A6560]">Verified public institutions, educational campuses, and rural health clinics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilities.map((f) => (
                <div key={f.id} className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold text-[#0E7C74] uppercase tracking-wide">{f.category} · {f.subCategory}</span>
                      <h4 className="font-semibold text-[#1C2422] text-sm mt-0.5">{f.name}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-[4px] bg-[#E8F2EE] text-[#0E7C74] text-[11px] font-semibold">
                      {f.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A6560]">{f.address}</p>
                  <div className="text-[11px] text-[#1C2422] pt-1 border-t border-[#E5E0D5]">
                    Authority: <span className="font-medium">{f.authority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#133429]">Development Projects &amp; Scheme Funds</h3>
              <p className="text-xs text-[#5A6560]">Tracking Jal Jeevan Mission, Swachh Bharat Mission, and NHAI infrastructure works.</p>
            </div>

            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="p-5 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-[#0E7C74]">{p.scheme}</span>
                      <h4 className="font-semibold text-[#1C2422] text-base mt-0.5">{p.projectName}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-[4px] bg-[#133429] text-[#FAF8F3] text-xs font-semibold self-start sm:self-center">
                      {p.status} ({p.physicalProgressPct}% Complete)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-[#E5E0D5]">
                    <div>
                      <span className="text-[#5A6560] block text-[11px]">Sanctioned Cost:</span>
                      <strong className="font-mono text-[#133429]">₹{p.sanctionedCostCrores} Cr</strong>
                    </div>
                    <div>
                      <span className="text-[#5A6560] block text-[11px]">Funds Released:</span>
                      <strong className="font-mono text-[#133429]">₹{p.fundsReleasedCrores} Cr</strong>
                    </div>
                    <div>
                      <span className="text-[#5A6560] block text-[11px]">Actual Expenditure:</span>
                      <strong className="font-mono text-[#0E7C74]">₹{p.actualExpenditureCrores} Cr</strong>
                    </div>
                    <div>
                      <span className="text-[#5A6560] block text-[11px]">Agency:</span>
                      <span className="text-[#1C2422] font-medium">{p.implementingAgency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#133429]">Loni Kalbhor Local Finance Dashboard</h3>
              <p className="text-xs text-[#5A6560]">Gram Panchayat annual receipts, property tax collections, and scheme grants. Strictly separated from PMC aggregates.</p>
            </div>

            <div className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#FAF8F3] border-b border-[#E5E0D5]">
                  <tr className="text-[#5A6560] font-semibold">
                    <th className="py-3 px-4 whitespace-nowrap">Financial Year</th>
                    <th className="py-3 px-4">Financial Category</th>
                    <th className="py-3 px-4">Document / Ledger Title</th>
                    <th className="py-3 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D5]">
                  {finance.map((f) => (
                    <tr key={f.id} className="hover:bg-[#FAF8F3] transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[#5A6560] whitespace-nowrap">FY {f.financialYear}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#1C2422]">{f.category}</td>
                      <td className="py-3.5 px-4 text-[#5A6560]">{f.documentTitle}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#E8F2EE] text-[#0E7C74] text-[11px] font-semibold">
                          {f.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-[#133429] whitespace-nowrap">
                        {f.amountAsPrinted} ({f.amountCrores} Cr)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="bg-white p-6 rounded-[8px] border border-[#E5E0D5] space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#133429]">Data Sources &amp; Provenance Registry</h3>
              <p className="text-xs text-[#5A6560]">Official Census, LGD, and Zilla Parishad source references.</p>
            </div>

            <div className="space-y-3">
              {sources.map((s) => (
                <div key={s.id} className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-[#0E7C74]">{s.id} · {s.reportingPeriod}</span>
                    <span className="px-2 py-0.5 rounded-[4px] bg-[#E8F2EE] text-[#0E7C74] text-[11px] font-semibold">
                      {s.verificationStatus}
                    </span>
                  </div>
                  <h4 className="font-semibold text-[#1C2422] text-sm">{s.documentTitle}</h4>
                  <p className="text-xs text-[#5A6560]">Publisher: <strong className="text-[#1C2422]">{s.publisher}</strong></p>
                  <div className="text-[11px] text-[#5A6560] font-mono">{s.pageOrTableRef}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
