import React from 'react';

export interface SectionTab {
  key: string;
  label: string;
}

interface PageSectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  tabs?: SectionTab[];
  activeTab?: string;
  onSelectTab?: (key: string) => void;
}

export const PageSectionHeader: React.FC<PageSectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  tabs,
  activeTab,
  onSelectTab
}) => {
  return (
    <section className="bg-white border-b border-[#E5E0D5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0">
        <div className="max-w-3xl space-y-2 pb-7">
          <span className="text-xs uppercase tracking-[0.14em] text-[#0E7C74] font-semibold block">
            {eyebrow}
          </span>
          <h1 className="font-serif text-3xl sm:text-[34px] font-semibold text-[#133429] tracking-tight text-balance">
            {title}
          </h1>
          <p className="text-sm text-[#5A6560] leading-relaxed">{description}</p>
        </div>

        {tabs && tabs.length > 0 && onSelectTab && (
          <nav
            aria-label={`${title} section navigation`}
            className="flex items-center gap-6 overflow-x-auto border-t border-[#E5E0D5] -mb-px"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onSelectTab(tab.key)}
                  className={`py-3.5 text-[13px] whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 cursor-pointer ${
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
        )}
      </div>
    </section>
  );
};
