import React from 'react';
import { Landmark, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  setSelectedAuthorityKey?: (key: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, setSelectedAuthorityKey }) => {
  return (
    <footer className="bg-[#142B3B] text-slate-400 text-xs py-10 border-t border-[#142B3B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-xl bg-[#0D9488] flex items-center justify-center text-sm text-white">
                <Landmark className="w-4 h-4" />
              </div>
              <span>JanDhan Insights</span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md text-xs">
              Public Money. Clear Answers. An independent civic-finance transparency initiative providing traceable, audited municipal budget data across Pune Municipal Corporation, Brihanmumbai Municipal Corporation, Greater Jaipur Municipal Corporation, and Jaipur Heritage Municipal Corporation.
            </p>
            <p className="text-amber-300/90 font-medium text-[11px]">
              Disclaimer: Independent civic transparency project. Not affiliated with, endorsed by, or representing any municipal corporation or government body. Zero fabricated or mock figures.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Site Sections</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('overview')} className="hover:text-white transition-colors">
                  Overview Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('spending')} className="hover:text-white transition-colors">
                  Explore Spending (30 Records)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('departments')} className="hover:text-white transition-colors">
                  Departments & Sub-heads
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-white transition-colors">
                  Capital Schemes & Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('coverage')} className="hover:text-white transition-colors">
                  Municipal Coverage (4 Authorities)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-white transition-colors">
                  Compare Records
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  About Data & Audit
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Official Portals Audited</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.pmc.gov.in/en/budget-overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Pune Municipal Corporation (PMC)</span>
                  <ExternalLink className="w-3 h-3 text-[#0D9488]" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.mcgm.gov.in/irj/portal/anonymous/qlBudgetapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Brihanmumbai MC (BMC / MCGM)</span>
                  <ExternalLink className="w-3 h-3 text-[#0D9488]" />
                </a>
              </li>
              <li>
                <a 
                  href="https://jaipurmc.org/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Greater Jaipur MC (JMC Greater)</span>
                  <ExternalLink className="w-3 h-3 text-[#0D9488]" />
                </a>
              </li>
              <li>
                <a 
                  href="https://jaipurmc.org/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Jaipur Heritage MC (JMC Heritage)</span>
                  <ExternalLink className="w-3 h-3 text-[#0D9488]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © 2026 JanDhan Insights · Reconciled Master Municipal Finance Dataset
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>30 Records Audited · 19 Verified · 11 Review</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
