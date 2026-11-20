import React from 'react';
import { StandardVerificationBadge } from '../types';
import { CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface VerificationBadgeProps {
  status: StandardVerificationBadge;
  detailLabel?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  detailLabel
}) => {
  const styles: Record<
    StandardVerificationBadge,
    { wrapper: string; Icon: React.ComponentType<{ className?: string }> }
  > = {
    Verified: {
      wrapper: 'bg-[#E8F2EE] text-[#0E7C74] border-[#0E7C74]/25',
      Icon: CheckCircle2
    },
    'Under Review': {
      wrapper: 'bg-[#B45309]/[0.09] text-[#B45309] border-[#B45309]/25',
      Icon: AlertTriangle
    },
    Estimated: {
      wrapper: 'bg-[#133429]/[0.07] text-[#133429] border-[#133429]/20',
      Icon: Info
    },
    Unavailable: {
      wrapper: 'bg-[#FAF8F3] text-[#5A6560] border-[#D4CEC2]',
      Icon: AlertCircle
    }
  };

  const config = styles[status] || styles['Under Review'];
  const Icon = config.Icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] border text-[11px] font-semibold whitespace-nowrap ${config.wrapper}`}
      title={detailLabel || status}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{detailLabel || status}</span>
    </span>
  );
};
