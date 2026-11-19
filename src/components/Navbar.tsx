import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'finances', label: 'Financial Overview' },
    { key: 'departments', label: 'Departments' },
    { key: 'projects', label: 'Public Projects' },
    { key: 'sources', label: 'Data & Sources' }
  ];

  const isNavActive = (key: string) => {
    if (key === 'finances') {
      return ['finances', 'budget', 'revenue-expenditure', 'records', 'spending'].includes(
        activePage
      );
    }
    if (key === 'projects') {
      return ['projects', 'wards', 'tenders', 'infrastructure'].includes(activePage);
    }
    if (key === 'sources') {
      return ['sources', 'methodology'].includes(activePage);
    }
    return activePage === key;
  };

  const handleSelect = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E0D5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Clean JanDhan Insights Wordmark (No official PMC seal or pill clutter) */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="inline-flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#133429] rounded-[4px]"
        >
          {/* Minimal original Indian architectural arch & pillar emblem */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-[#133429] shrink-0"
          >
            <path
              d="M4 20V10.5C4 8 7.5 6 12 4.5C16.5 6 20 8 20 10.5V20"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 20V13.5C8.5 11.8 10 10.5 12 9.8C14 10.5 15.5 11.8 15.5 13.5V20"
              stroke="#0E7C74"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M2.5 20H21.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="font-serif text-[20px] font-semibold tracking-tight text-[#133429]">
            JanDhan Insights
          </span>
        </button>

        {/* Zone 2: Clean Single-Line Editorial Text Navigation */}
        <nav
          aria-label="Primary Municipal Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {navLinks.map((link) => {
            const active = isNavActive(link.key);
            return (
              <button
                key={link.key}
                type="button"
                onClick={() => handleSelect(link.key)}
                className={`relative py-2 text-[14px] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  active
                    ? 'text-[#133429] font-semibold'
                    : 'text-[#5A6560] hover:text-[#133429] font-medium'
                }`}
              >
                <span>{link.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#0E7C74] transition-opacity duration-150 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search Action + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="h-10 px-4 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] hover:bg-white hover:border-[#133429]/40 text-[#1C2422] text-[13px] font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer"
            aria-label="Search Pune municipal records"
            title="Search (/)"
          >
            <Search className="w-4 h-4 text-[#0E7C74] shrink-0" />
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-[6px] border border-[#E5E0D5] bg-white text-[#133429] hover:bg-[#FAF8F3] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E0D5] bg-white px-4 py-4 space-y-1 animate-fadeIn">
          {navLinks.map((link) => {
            const active = isNavActive(link.key);
            return (
              <button
                key={link.key}
                type="button"
                onClick={() => handleSelect(link.key)}
                className={`w-full text-left px-3 py-2.5 rounded-[6px] text-sm transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#E8F2EE] text-[#133429] font-semibold'
                    : 'text-[#5A6560] hover:bg-[#FAF8F3] hover:text-[#133429] font-medium'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
