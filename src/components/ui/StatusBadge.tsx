import React from 'react';
import { ProposalStatus } from '../../types';
import { FileText, Eye, CheckCircle, Send } from 'lucide-react';

interface StatusBadgeProps {
  status: ProposalStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

interface StatusConfig {
  label: string;
  icon: React.ReactNode;
  colors: string;
  darkColors: string;
}

const statusConfig: Record<ProposalStatus, StatusConfig> = {
  draft: {
    label: 'Draft',
    icon: <FileText size={14} />,
    colors: 'bg-gray-100 text-gray-700 border-gray-200',
    darkColors: 'dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
  },
  review: {
    label: 'In Review',
    icon: <Eye size={14} />,
    colors: 'bg-amber-100 text-amber-700 border-amber-200',
    darkColors: 'dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  },
  final: {
    label: 'Final',
    icon: <CheckCircle size={14} />,
    colors: 'bg-blue-100 text-blue-700 border-blue-200',
    darkColors: 'dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  },
  sent: {
    label: 'Sent',
    icon: <Send size={14} />,
    colors: 'bg-green-100 text-green-700 border-green-200',
    darkColors: 'dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-base gap-2',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        transition-colors duration-200
        ${sizeClasses[size]}
        ${config.colors}
        ${config.darkColors}
        ${className}
      `}
      title={`Status: ${config.label}`}
    >
      {config.icon}
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

/**
 * Compact status indicator for use in lists or minimal UIs
 */
export const StatusDot: React.FC<{ status: ProposalStatus; className?: string }> = ({
  status,
  className = '',
}) => {
  const dotColors: Record<ProposalStatus, string> = {
    draft: 'bg-gray-400',
    review: 'bg-amber-500',
    final: 'bg-blue-500',
    sent: 'bg-green-500',
  };

  return (
    <span
      className={`
        inline-block w-2.5 h-2.5 rounded-full
        ${dotColors[status]}
        ${className}
      `}
      title={`Status: ${statusConfig[status].label}`}
    />
  );
};

/**
 * Status icon with tooltip for minimal displays
 */
export const StatusIcon: React.FC<{ status: ProposalStatus; className?: string }> = ({
  status,
  className = '',
}) => {
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex items-center justify-center
        ${className}
      `}
      title={`Status: ${config.label}`}
    >
      {config.icon}
    </span>
  );
};

export default StatusBadge;
