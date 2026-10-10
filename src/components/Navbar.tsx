import React, { useState } from 'react';
import { 
  Landmark, 
  Menu, 
  X, 
  Search, 
  Building2, 
  BarChart3, 
  GitCompare, 
  FileCheck, 
  ShieldCheck, 
  Download, 
  BookOpen, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { dataProvider } from '../services/dataProvider';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedAuthorityKey: string;
  setSelectedAuthorityKey: (key: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedAuthorityKey,
  setSelectedAuthorityKey,
  onOpenSearch
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 4 Municipal Authorities mapped cleanly to 3 primary cities
  const authorities = [
    { key: 'pune-pmc', city: 'Pune', label: 'Pune (PMC)', fullName: 'Pune Municipal Corporation' },
    { key: 'mumbai-bmc', city: 'Mumbai', label: 'Mumbai (BMC)', fullName: 'Brihanmumbai Municipal Corporation' },
    { key: 'jaipur-greater', city: 'Jaipur', label: 'Jaipur Greater (JMC)', fullName: 'Greater Jaipur Municipal Corporation' },
    { key: 'jaipur-heritage', city: 'Jaipur', label: 'Jaipur Heritage (JMC)', fullName: 'Jaipur Heritage Municipal Corporation' }
  ];

  // Simplified top navigation as specified:
  // JanDhan Insights (logo) | Overview | Projects | Spending | About Data
  const primaryNavItems = [
    { key: 'overview', label: 'Overview' },
    { key: 'projects', label: 'Projects' },
    { key: 'spending', label: 'Spending' },
    { key: 'about', label: 'About Data' }
  ];

  // Secondary tools housed inside the hamburger / "More Tools" drawer
  const secondaryTools = [
    { 
      key: 'compare', 
      label: 'Compare Municipalities', 
      desc: 'Compare allocations and revenue across cities with compatible categories',
      icon: GitCompare 
    },
    { 
      key: 'departments', 
      label: 'Department Allocations', 
      desc: 'Deep dive into water, roads, waste, and municipal department budgets',
      icon: BarChart3 
    },
    { 
      key: 'coverage', 
      label: 'Municipal Coverage', 
      desc: 'Official details for PMC, BMC, JMC Greater, and JMC Heritage',
      icon: Building2 
    },
    { 
      key: 'sources', 
      label: 'Audit & Source Ledger', 
      desc: 'Full 30-record reconciliation ledger with quarantine audit reasons',
      icon: FileCheck 
    }
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setDrawerOpen(false);
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataProvider.getVerifiedRecords(), null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "jandhan_municipal_finance_verified.json");
    dlAnchorElem.click();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F9F7]/95 backdrop-blur-md border-b border-[#142B3B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* 1. Brand Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0" 
            onClick={() => handleTabClick('overview')}
          >
            <div className="w-9 h-9 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-base shadow-xs">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#142B3B] block leading-tight">
                JanDhan Insights
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#142B3B]/60 font-medium">
                Public Municipal Finance Explorer
              </span>
            </div>
          </div>

          {/* 2. Simplified Primary Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5">
            {primaryNavItems.map(item => {
              const isActive = activeTab === item.key || (item.key === 'about' && activeTab === 'sources');
              return (
                <button
                  key={item.key}
                  onClick={() => handleTabClick(item.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#142B3B] text-white shadow-xs'
                      : 'text-[#142B3B]/70 hover:text-[#142B3B] hover:bg-[#142B3B]/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* 3. Right Side: City Selector, Search, and Hamburger Drawer Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* City Selector: Pune, Mumbai, Jaipur */}
            <div className="flex items-center bg-white pl-2.5 pr-1.5 py-1.5 rounded-xl border border-[#142B3B]/15 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-[#0D9488] mr-1.5 shrink-0 hidden sm:inline-block" />
              <label htmlFor="nav-city-select" className="sr-only">Select City</label>
              <select
                id="nav-city-select"
                aria-label="Select City or Municipal Authority"
                value={selectedAuthorityKey}
                onChange={(e) => setSelectedAuthorityKey(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#142B3B] focus:outline-hidden cursor-pointer pr-1"
              >
                <optgroup label="Pune">
                  <option value="pune-pmc">Pune (PMC)</option>
                </optgroup>
                <optgroup label="Mumbai">
                  <option value="mumbai-bmc">Mumbai (BMC)</option>
                </optgroup>
                <optgroup label="Jaipur">
                  <option value="jaipur-greater">Jaipur (Greater JMC)</option>
                  <option value="jaipur-heritage">Jaipur (Heritage JMC)</option>
                </optgroup>
              </select>
            </div>

            {/* Prominent Quick Search */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#142B3B]/15 bg-white text-[#142B3B]/70 hover:text-[#142B3B] hover:bg-slate-50 transition-all text-xs font-medium shadow-2xs"
              title="Search records (Cmd+K or /)"
            >
              <Search className="w-3.5 h-3.5 text-[#0D9488]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.2 bg-slate-100 rounded text-[10px] text-slate-500 font-mono">
                /
              </kbd>
            </button>

            {/* Hamburger / "More Tools" Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 p-2 rounded-xl text-[#142B3B] hover:bg-[#142B3B]/5 transition-colors border border-transparent hover:border-[#142B3B]/10"
              aria-label="Open Navigation & Advanced Tools"
              title="More tools and civic ledger"
            >
              <Menu className="w-5 h-5 text-[#142B3B]" />
              <span className="hidden xl:inline text-xs font-semibold text-[#142B3B]/80">More</span>
            </button>

          </div>
        </div>
      </header>

      {/* Slide-over Drawer for Hamburger Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#142B3B]/40 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#142B3B]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-sm">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#142B3B]">Civic Tools & Navigation</h3>
                    <p className="text-[11px] text-[#142B3B]/60">Explore municipal finance details</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 space-y-6 flex-1">
                
                {/* Mobile Primary Navigation Links */}
                <div className="md:hidden space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Main Pages
                  </span>
                  {primaryNavItems.map(item => {
                    const isActive = activeTab === item.key || (item.key === 'about' && activeTab === 'sources');
                    return (
                      <button
                        key={item.key}
                        onClick={() => handleTabClick(item.key)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#0D9488] text-white shadow-xs'
                            : 'bg-slate-50 text-[#142B3B] hover:bg-slate-100'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-70" />
                      </button>
                    );
                  })}
                </div>

                {/* City Quick Switcher */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Switch Municipal Corporation
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {authorities.map(auth => {
                      const isSelected = selectedAuthorityKey === auth.key;
                      return (
                        <button
                          key={auth.key}
                          onClick={() => {
                            setSelectedAuthorityKey(auth.key);
                            setDrawerOpen(false);
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border ${
                            isSelected
                              ? 'bg-[#0D9488]/10 border-[#0D9488] text-[#0D9488] ring-1 ring-[#0D9488]'
                              : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:border-[#0D9488]/40'
                          }`}
                        >
                          <div className="truncate">{auth.label}</div>
                          <div className="text-[10px] font-normal text-slate-400 truncate">{auth.city}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Civic Tools */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Secondary Civic Tools
                  </span>
                  <div className="space-y-2">
                    {secondaryTools.map(tool => {
                      const IconComponent = tool.icon;
                      const isActive = activeTab === tool.key;
                      return (
                        <button
                          key={tool.key}
                          onClick={() => handleTabClick(tool.key)}
                          className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                            isActive
                              ? 'bg-[#142B3B] text-white border-[#142B3B] shadow-xs'
                              : 'bg-white border-[#142B3B]/10 hover:border-[#0D9488] text-[#142B3B]'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-white/10 text-white' : 'bg-[#0D9488]/10 text-[#0D9488]'}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold truncate">{tool.label}</div>
                            <div className={`text-[11px] line-clamp-1 mt-0.5 ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                              {tool.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Data Download & Audit Standard */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#142B3B]">
                    <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                    <span>Open Verified Data Standard</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    All numbers are extracted verbatim from official budget speech PDFs and audited accounts. Zero guessed or interpolated records.
                  </p>
                  <button
                    onClick={downloadJSON}
                    className="w-full py-2 px-3 bg-white border border-[#142B3B]/15 hover:bg-slate-100 rounded-lg text-xs font-semibold text-[#142B3B] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>Download Verified Dataset (JSON)</span>
                  </button>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-[#142B3B]/10 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
                <span>JanDhan Insights Civic Tech</span>
                <span className="font-semibold text-[#0D9488]">FY 2021-22 to 2025-26</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
