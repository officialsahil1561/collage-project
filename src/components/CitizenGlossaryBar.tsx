import React, { useState } from 'react';
import { dataProvider } from '../services/dataProvider';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface CitizenGlossaryBarProps {
  defaultOpen?: boolean;
}

export const CitizenGlossaryBar: React.FC<CitizenGlossaryBarProps> = ({
  defaultOpen = false
}) => {
  const terms = dataProvider.getCitizenGlossaryTerms();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedCode, setSelectedCode] = useState<string>(terms[0]?.shortCode || 'BE');

  const activeTerm = terms.find((t) => t.shortCode === selectedCode) || terms[0];

  return (
    <section
      aria-label="Plain-Language Municipal Budget Guide"
      className="bg-white rounded-[6px] border border-[#E5E0D5] overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-5 py-3.5 flex items-center justify-between gap-4 text-left bg-[#FAF8F3] hover:bg-white transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <HelpCircle className="w-4 h-4 text-[#0E7C74] shrink-0" />
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[#133429] block">
              Citizen Guide: What Do Budget Terms (BE, RE, Actuals, Receipts, CapEx) Mean?
            </span>
            <span className="text-[11px] text-[#5A6560] block">
              Click to inspect plain-language definitions and Pune Municipal Corporation examples
            </span>
          </div>
        </div>
        <span className="text-xs font-semibold text-[#0E7C74] inline-flex items-center gap-1 shrink-0">
          <span>{isOpen ? 'Hide Guide' : 'Read Guide'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {isOpen && activeTerm && (
        <div className="p-5 border-t border-[#E5E0D5] space-y-4 animate-fadeIn">
          <div className="flex flex-wrap gap-1.5">
            {terms.map((item) => {
              const active = item.shortCode === selectedCode;
              return (
                <button
                  key={item.shortCode}
                  type="button"
                  onClick={() => setSelectedCode(item.shortCode)}
                  className={`h-8 px-3 rounded-[4px] text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#133429] text-[#FAF8F3] border-[#133429]'
                      : 'bg-[#FAF8F3] text-[#5A6560] border-[#E5E0D5] hover:text-[#133429]'
                  }`}
                >
                  {item.term}
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-[6px] bg-[#FAF8F3] border border-[#E5E0D5] space-y-1.5">
            <div className="text-sm font-serif font-semibold text-[#133429]">
              {activeTerm.term}
            </div>
            <p className="text-xs text-[#1C2422] leading-relaxed">
              {activeTerm.plainExplanation}
            </p>
            <p className="text-[11px] font-mono text-[#0E7C74] pt-1">
              PMC Example: {activeTerm.pmcExample}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
