import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbCrumb } from '../utils/navigation';

export interface SectionTab {
  key: string;
  label: string;
}

interface PageSectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbCrumb[];
  onNavigate?: (page: string) => void;
  tabs?: SectionTab[];
  activeTab?: string;
  onSelectTab?: (key: string) => void;
}

export const PageSectionHeader: React.FC<PageSectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  onNavigate,
  tabs,
  activeTab,
  onSelectTab
}) => {
  return (
    <section className="bg-white border-b border-[#E5E0D5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-[#5A6560] mb-3"
          >
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={`${crumb.label}-${idx}`}>
                  {idx > 0 && (
                    <ChevronRight
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-[#D4CEC2] shrink-0"
                    />
                  )}
                  {crumb.pageKey && onNavigate && !isLast ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(crumb.pageKey!)}
                      className="hover:text-[#133429] hover:underline underline-offset-4 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#133429] rounded-[3px]"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span
                      aria-current={isLast ? 'page' : undefined}
                      className={isLast ? 'font-semibold text-[#133429]' : ''}
                    >
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        <div className="max-w-3xl space-y-2 pb-6">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0E7C74] font-semibold block">
            {eyebrow}
          </span>
          <h1 className="font-serif text-2xl sm:text-[34px] font-semibold text-[#133429] tracking-tight text-balance">
            {title}
          </h1>
          <p className="text-sm text-[#5A6560] leading-relaxed">{description}</p>
        </div>

        {tabs && tabs.length > 0 && onSelectTab && (
          <>
            {/* Compact Dropdown Selector on very small screens (< 640px) */}
            <div className="sm:hidden pb-4 pt-2 border-t border-[#E5E0D5]">
              <label
                htmlFor="section-mobile-tab-select"
                className="block text-[11px] font-semibold uppercase tracking-wide text-[#5A6560] mb-1.5"
              >
                Section View
              </label>
              <select
                id="section-mobile-tab-select"
                value={activeTab}
                onChange={(e) => onSelectTab(e.target.value)}
                className="w-full h-11 rounded-[6px] border border-[#E5E0D5] bg-[#FAF8F3] px-3 text-sm font-semibold text-[#133429] focus:outline-hidden focus:border-[#0E7C74]"
              >
                {tabs.map((tab) => (
                  <option key={tab.key} value={tab.key}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Compact Single-Row Horizontal Scroll Tabs on sm+ screens */}
            <nav
              aria-label={`${title} section navigation`}
              className="hidden sm:flex items-center gap-6 overflow-x-auto border-t border-[#E5E0D5] -mb-px"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => onSelectTab(tab.key)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`py-3.5 text-[13px] whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#133429] ${
                      isActive
                        ? 'border-[#0E7C74] text-[#133429] font-semibold'
                        : 'border-transparent text-[#5A6560] hover:text-[#133429] font-medium'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </>
        )}
      </div>
    </section>
  );
};
