import React from 'react';
import { ProposalOutcome } from '../../types';
import { Trophy, Frown, PauseCircle, HelpCircle } from 'lucide-react';

interface OutcomeBadgeProps {
  outcome: ProposalOutcome | undefined;
  size?: 'sm' | 'md' | 'lg';
}

export const OutcomeBadge: React.FC<OutcomeBadgeProps> = ({ outcome = 'pending', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  const configs: Record<ProposalOutcome, { label: string; icon: React.ReactNode; className: string }> = {
    'pending': {
      label: 'Pending',
      icon: <HelpCircle size={iconSizes[size]} />,
      className: 'bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600',
    },
    'won': {
      label: 'Won 🎉',
      icon: <Trophy size={iconSizes[size]} />,
      className: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
    },
    'lost': {
      label: 'Lost 😞',
      icon: <Frown size={iconSizes[size]} />,
      className: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
    },
    'on-hold': {
      label: 'On Hold ⏸️',
      icon: <PauseCircle size={iconSizes[size]} />,
      className: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
    },
  };

  const config = configs[outcome];

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        transition-colors
        ${sizeClasses[size]}
        ${config.className}
      `}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export default OutcomeBadge;
