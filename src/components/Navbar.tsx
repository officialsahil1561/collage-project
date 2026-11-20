import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown, Building2, MapPin } from 'lucide-react';
import {
  NAV_GROUPS,
  NavGroupKey,
  getGroupForPage,
  normalizePageKey
} from '../utils/navigation';

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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<NavGroupKey | null>(null);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<NavGroupKey | null>('finance');
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Partial<Record<NavGroupKey, HTMLButtonElement | null>>>({});
  const menuItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const drawerCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const normalizedActive = normalizePageKey(activePage);
  const activeGroup = getGroupForPage(normalizedActive);

  // Compact sticky header styling on scroll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close desktop dropdowns on outside click & handle Escape globally
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openDropdown) {
          const closingGroup = openDropdown;
          setOpenDropdown(null);
          triggerRefs.current[closingGroup]?.focus();
        }
        if (mobileDrawerOpen) {
          setMobileDrawerOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown, mobileDrawerOpen]);

  // Prevent background scrolling while mobile/tablet drawer is open & sync expanded group
  useEffect(() => {
    if (mobileDrawerOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      if (activeGroup) {
        setExpandedMobileGroup(activeGroup.key);
      }
      window.setTimeout(() => drawerCloseBtnRef.current?.focus(), 40);
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    return undefined;
  }, [mobileDrawerOpen, activeGroup]);

  const handleSelect = (page: string) => {
    onNavigate(page);
    setOpenDropdown(null);
    setMobileDrawerOpen(false);
  };

  const handleTriggerKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    groupKey: NavGroupKey
  ) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpenDropdown(groupKey);
        menuItemRefs.current = [];
        window.setTimeout(() => menuItemRefs.current[0]?.focus(), 10);
      }
    } else if (e.key === 'ArrowRight') {
      const idx = NAV_GROUPS.findIndex((g) => g.key === groupKey);
      const next = NAV_GROUPS[(idx + 1) % NAV_GROUPS.length];
      triggerRefs.current[next.key]?.focus();
      if (openDropdown) setOpenDropdown(next.key);
    } else if (e.key === 'ArrowLeft') {
      const idx = NAV_GROUPS.findIndex((g) => g.key === groupKey);
      const prev = NAV_GROUPS[(idx - 1 + NAV_GROUPS.length) % NAV_GROUPS.length];
      triggerRefs.current[prev.key]?.focus();
      if (openDropdown) setOpenDropdown(prev.key);
    }
  };

  const handleMenuItemKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    groupKey: NavGroupKey,
    index: number,
    total: number
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      menuItemRefs.current[(index + 1) % total]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      menuItemRefs.current[(index - 1 + total) % total]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      menuItemRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      menuItemRefs.current[total - 1]?.focus();
    } else if (e.key === 'Tab') {
      setOpenDropdown(null);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpenDropdown(null);
      triggerRefs.current[groupKey]?.focus();
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-[#E5E0D5] transition-[background-color,box-shadow] duration-200 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-[0_4px_18px_rgba(19,52,41,0.08)]'
            : 'bg-[#FAF8F3]/95 backdrop-blur-sm'
        }`}
      >
        <div
          className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 lg:gap-8 transition-[height] duration-200 ${
            isScrolled ? 'h-[64px]' : 'h-[72px]'
          }`}
        >
          {/* Left Zone: Clickable Brand Logo & Wordmark */}
          <button
            type="button"
            onClick={() => handleSelect('home')}
            aria-label="JanDhan Insights — Return to Home"
            className="inline-flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#133429] rounded-[4px]"
          >
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

          {/* Location Selector: Pune Municipal Corporation vs Loni Kalbhor */}
          <div
            role="group"
            aria-label="Select Civic Jurisdiction"
            className="hidden sm:inline-flex items-center p-0.5 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] text-xs font-semibold shrink-0"
          >
            <button
              type="button"
              onClick={() => handleSelect('home')}
              className={`h-7 px-2.5 rounded-[4px] inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                normalizedActive !== 'loni-kalbhor'
                  ? 'bg-[#133429] text-[#FAF8F3] shadow-xs'
                  : 'text-[#5A6560] hover:text-[#133429]'
              }`}
              title="Pune Municipal Corporation (516+ sq.km urban municipal jurisdiction)"
            >
              <Building2 className="w-3 h-3 text-[#E9A23B]" />
              <span>PMC Pune</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelect('loni-kalbhor')}
              className={`h-7 px-2.5 rounded-[4px] inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                normalizedActive === 'loni-kalbhor'
                  ? 'bg-[#0E7C74] text-white shadow-xs'
                  : 'text-[#5A6560] hover:text-[#133429]'
              }`}
              title="Loni Kalbhor (Haveli Taluka rural & Gram Panchayat jurisdiction)"
            >
              <MapPin className="w-3 h-3 text-[#E9A23B]" />
              <span>Loni Kalbhor</span>
            </button>
          </div>

          {/* Middle Zone: Clean 5-Item Desktop Navigation */}
          <nav
            ref={navRef}
            aria-label="Primary Municipal Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            <button
              type="button"
              onClick={() => handleSelect('home')}
              aria-current={normalizedActive === 'home' ? 'page' : undefined}
              className={`relative py-2 text-[14px] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#133429] rounded-[4px] ${
                normalizedActive === 'home'
                  ? 'text-[#133429] font-semibold'
                  : 'text-[#5A6560] hover:text-[#133429] font-medium'
              }`}
            >
              <span>Home</span>
              <span
                aria-hidden="true"
                className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#0E7C74] transition-opacity duration-150 ${
                  normalizedActive === 'home' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>

            {NAV_GROUPS.map((group) => {
              const isGroupActive = activeGroup?.key === group.key;
              const isOpen = openDropdown === group.key;
              const isRightAligned = group.key === 'about' || group.key === 'civic-services';

              return (
                <div key={group.key} className="relative">
                  <button
                    ref={(el) => {
                      triggerRefs.current[group.key] = el;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onClick={() => {
                      menuItemRefs.current = [];
                      setOpenDropdown((prev) => (prev === group.key ? null : group.key));
                    }}
                    onKeyDown={(e) => handleTriggerKeyDown(e, group.key)}
                    className={`relative py-2 text-[14px] whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#133429] rounded-[4px] ${
                      isGroupActive || isOpen
                        ? 'text-[#133429] font-semibold'
                        : 'text-[#5A6560] hover:text-[#133429] font-medium'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#0E7C74]' : 'text-[#5A6560]'
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#0E7C74] transition-opacity duration-150 ${
                        isGroupActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      role="menu"
                      aria-label={`${group.label} navigation`}
                      className={`absolute top-full mt-2.5 w-72 bg-white border border-[#E5E0D5] rounded-[6px] shadow-[0_14px_34px_rgba(19,52,41,0.12)] py-2 z-50 animate-dropdownIn ${
                        isRightAligned ? 'right-0' : 'left-0'
                      }`}
                    >
                      {group.items.map((item, idx) => {
                        const isActiveItem = normalizedActive === item.key;
                        return (
                          <button
                            key={item.key}
                            ref={(el) => {
                              menuItemRefs.current[idx] = el;
                            }}
                            role="menuitem"
                            type="button"
                            onClick={() => handleSelect(item.key)}
                            onKeyDown={(e) =>
                              handleMenuItemKeyDown(e, group.key, idx, group.items.length)
                            }
                            aria-current={isActiveItem ? 'page' : undefined}
                            className={`w-full text-left px-4 py-2.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#133429] ${
                              isActiveItem
                                ? 'bg-[#E8F2EE] text-[#133429]'
                                : 'text-[#1C2422] hover:bg-[#FAF8F3]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-[13px] ${
                                  isActiveItem ? 'font-semibold text-[#133429]' : 'font-medium'
                                }`}
                              >
                                {item.label}
                              </span>
                              {isActiveItem && (
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E7C74]">
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#5A6560] mt-0.5 leading-snug">
                              {item.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Zone: Global Search + Mobile/Tablet Hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              className="h-10 sm:h-10 min-w-[44px] px-3.5 rounded-[6px] border border-[#E5E0D5] bg-white hover:bg-[#FAF8F3] hover:border-[#133429]/40 text-[#1C2422] text-[13px] font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#133429]"
              aria-label="Global search across Pune municipal records, wards, and sources"
              title="Search (/ or Ctrl+K)"
            >
              <Search className="w-4 h-4 text-[#0E7C74] shrink-0" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden h-11 w-11 inline-flex items-center justify-center rounded-[6px] border border-[#E5E0D5] bg-white text-[#133429] hover:bg-[#FAF8F3] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#133429]"
              aria-label="Open navigation menu"
              aria-expanded={mobileDrawerOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Slide-Out Navigation Drawer */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0E2920]/60 backdrop-blur-[2px]"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Panel */}
          <div className="relative z-10 w-full max-w-sm bg-white h-full border-l border-[#E5E0D5] shadow-2xl flex flex-col animate-drawerSlideIn">
            <div className="px-5 h-[68px] border-b border-[#E5E0D5] bg-[#FAF8F3] flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => handleSelect('home')}
                className="font-serif text-lg font-semibold text-[#133429] cursor-pointer"
              >
                JanDhan Insights
              </button>
              <button
                ref={drawerCloseBtnRef}
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="h-11 w-11 inline-flex items-center justify-center rounded-[6px] border border-[#E5E0D5] bg-white text-[#133429] hover:bg-[#FAF8F3] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#133429]"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {/* Mobile Location Selector */}
              <div className="p-2 bg-[#FAF8F3] border border-[#E5E0D5] rounded-[6px] space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A6560] block px-1">
                  Select Jurisdiction
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelect('home')}
                    className={`h-8 px-2 rounded-[4px] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      normalizedActive !== 'loni-kalbhor'
                        ? 'bg-[#133429] text-[#FAF8F3]'
                        : 'bg-white text-[#5A6560] border border-[#E5E0D5]'
                    }`}
                  >
                    <Building2 className="w-3 h-3 text-[#E9A23B]" />
                    <span>PMC Pune</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelect('loni-kalbhor')}
                    className={`h-8 px-2 rounded-[4px] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      normalizedActive === 'loni-kalbhor'
                        ? 'bg-[#0E7C74] text-white'
                        : 'bg-white text-[#5A6560] border border-[#E5E0D5]'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-[#E9A23B]" />
                    <span>Loni Kalbhor</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelect('home')}
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-[6px] text-left text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  normalizedActive === 'home'
                    ? 'bg-[#E8F2EE] text-[#133429] font-semibold'
                    : 'text-[#1C2422] hover:bg-[#FAF8F3] font-medium'
                }`}
              >
                <span>Home</span>
                {normalizedActive === 'home' && (
                  <span className="text-[11px] font-semibold text-[#0E7C74]">Active</span>
                )}
              </button>

              {NAV_GROUPS.map((group) => {
                const isExpanded = expandedMobileGroup === group.key;
                const isGroupActive = activeGroup?.key === group.key;

                return (
                  <div
                    key={group.key}
                    className="border border-[#E5E0D5] rounded-[6px] overflow-hidden bg-white"
                  >
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedMobileGroup((prev) =>
                          prev === group.key ? null : group.key
                        )
                      }
                      className={`w-full min-h-[46px] px-3.5 py-2.5 flex items-center justify-between text-left text-sm font-semibold transition-colors cursor-pointer ${
                        isGroupActive
                          ? 'bg-[#FAF8F3] text-[#133429]'
                          : 'bg-white text-[#1C2422] hover:bg-[#FAF8F3]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{group.label}</span>
                        {isGroupActive && (
                          <span className="text-[10px] font-medium text-[#0E7C74]">
                            Current
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#5A6560] transition-transform duration-150 ${
                          isExpanded ? 'rotate-180 text-[#0E7C74]' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="border-t border-[#E5E0D5] divide-y divide-[#E5E0D5]/60 bg-[#FAF8F3]/45">
                        {group.items.map((item) => {
                          const isActiveItem = normalizedActive === item.key;
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => handleSelect(item.key)}
                              className={`w-full min-h-[44px] px-4 py-2.5 text-left transition-colors cursor-pointer ${
                                isActiveItem
                                  ? 'bg-[#E8F2EE] text-[#133429]'
                                  : 'text-[#1C2422] hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className={`text-[13px] ${
                                    isActiveItem ? 'font-semibold text-[#133429]' : 'font-medium'
                                  }`}
                                >
                                  {item.label}
                                </span>
                                {isActiveItem && (
                                  <span className="text-[10px] font-semibold text-[#0E7C74]">
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#5A6560] mt-0.5 leading-snug">
                                {item.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-[#E5E0D5] bg-[#FAF8F3] shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onOpenSearch();
                }}
                className="w-full min-h-[44px] rounded-[6px] bg-[#133429] hover:bg-[#0E2920] text-[#FAF8F3] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search PMC Records &amp; Wards</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
