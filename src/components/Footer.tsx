import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const go = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E2920] text-[#E6ECE9] border-t border-white/10 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/12">
          {/* Column 1: JanDhan Insights Identity & About */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="text-[#FAF8F3] shrink-0"
              >
                <path
                  d="M4 20V10.5C4 8 7.5 6 12 4.5C16.5 6 20 8 20 10.5V20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M8.5 20V13.5C8.5 11.8 10 10.5 12 9.8C14 10.5 15.5 11.8 15.5 13.5V20"
                  stroke="#5CC2BA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M2.5 20H21.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="font-serif text-xl font-semibold tracking-tight text-[#FAF8F3]">
                JanDhan Insights
              </span>
            </div>
            <p className="text-sm text-[#BFD0C8] leading-relaxed max-w-md">
              An independent civic transparency portal presenting verified budgets, audited annual accounts, departmental provisions, and public infrastructure records exclusively for Pune Municipal Corporation (PMC), Maharashtra.
            </p>
            <p className="text-xs text-[#9BB0A6] leading-relaxed max-w-md">
              Jurisdiction boundary strictly isolated to PMC limits. Pimpri-Chinchwad Municipal Corporation (PCMC), Pune Cantonment, Khadki Cantonment, and non-PMC PMRDA works are excluded.
            </p>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-serif text-sm font-semibold text-[#FAF8F3] tracking-wide">
              Municipal Portal
            </h2>
            <ul className="space-y-2 text-[13px] text-[#BFD0C8]">
              <li>
                <button
                  type="button"
                  onClick={() => go('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Platform
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('finances')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Financial Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('budget')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Annual Budget Tracker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('departments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  20 PMC Departments
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('projects')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Public Projects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('wards')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  15 Regional Ward Offices
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Data Sources & Methodology */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-serif text-sm font-semibold text-[#FAF8F3] tracking-wide">
              Data Sources &amp; Methodology
            </h2>
            <ul className="space-y-2 text-[13px] text-[#BFD0C8]">
              <li>
                <button
                  type="button"
                  onClick={() => go('records')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Financial Records &amp; Quarantine Ledger
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('sources')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Source Registry &amp; Reconciliation Audit
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('methodology')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accounting &amp; Audit Methodology
                </button>
              </li>
              <li>
                <a
                  href="https://www.pmc.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>PMC Official Civic Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://data.opencity.in/dataset/pmc-budgets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>OpenCity PMC Budget Dataset</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://opendata.pmc.gov.in/opendata/6f5d15dd-7fd3-4b53-8a01-f85a00848952.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>PMC Audited Financial Statements PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Subtle Pune Heritage Architectural Line Illustration (Shaniwar Wada / Maratha Cusped Arches) */}
        <div className="pt-8 pb-4" aria-hidden="true">
          <svg
            viewBox="0 0 1200 72"
            fill="none"
            className="w-full h-14 text-[#FAF8F3]/20"
            preserveAspectRatio="xMidYMax meet"
          >
            {/* Horizon ground line */}
            <path d="M0 68H1200" stroke="currentColor" strokeWidth="1" />
            {/* Left traditional wada colonnade */}
            <path
              d="M60 68V44M60 44H240M240 44V68M90 68V52C90 47 105 47 105 52V68M130 68V52C130 47 145 47 145 52V68M170 68V52C170 47 185 47 185 52V68M210 68V52C210 47 225 47 225 52V68"
              stroke="currentColor"
              strokeWidth="1"
            />
            {/* Central Shaniwar Wada Dilli Darwaza battlements & gateway */}
            <path
              d="M460 68V26L475 26V20H490V26H505V20H520V26H535V14H665V26H680V20H695V26H710V20H725V26H740V68"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            {/* Nagarkhana upper pavilion & cusped arch gateway */}
            <path
              d="M555 26V10H645V26M568 26V16C574 13 580 13 586 16V26M591 26V16C597 13 603 13 609 16V26M614 26V16C620 13 626 13 632 16V26"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M572 68V45C572 37 586 32 600 28C614 32 628 37 628 45V68"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            {/* Right Aga Khan / Civic Veranda arches */}
            <path
              d="M950 68V42H1140V68M975 68V50C975 45 995 45 995 50V68M1020 68V50C1020 45 1040 45 1040 50V68M1065 68V50C1065 45 1085 45 1085 50V68M1110 68V50C1110 45 1130 45 1130 50V68"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9BB0A6]">
          <span>
            JanDhan Insights · Independent Public Finance Reference for Pune Municipal Corporation (PMC)
          </span>
          <span className="font-mono tabular-nums">
            38 Reconciled Records · Official Source Citations Preserved
          </span>
        </div>
      </div>
    </footer>
  );
};
