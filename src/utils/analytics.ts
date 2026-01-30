import { Proposal } from '../types';

export type DealStatus = 'won' | 'lost' | 'pending';

export interface ProposalWithDealStatus extends Proposal {
  dealStatus?: DealStatus;
  dealClosedAt?: string; // ISO date string
}

export interface MonthlyData {
  month: string;
  monthLabel: string;
  proposalsCount: number;
  pipelineValue: number;
  wonValue: number;
  lostValue: number;
  pendingValue: number;
  wonCount: number;
  lostCount: number;
  pendingCount: number;
}

export interface ProposalAnalytics {
  totalProposals: number;
  totalPipelineValue: number;
  wonRevenue: number;
  lostRevenue: number;
  pendingValue: number;
  winRate: number;
  averageDealSize: number;
  proposalsByStatus: {
    won: number;
    lost: number;
    pending: number;
  };
  monthlyData: MonthlyData[];
  topProposals: ProposalWithDealStatus[];
  conversionRate: number;
}

/**
 * Get deal status from proposal
 * Maps proposal status to deal status for analytics purposes
 */
export function getDealStatus(proposal: ProposalWithDealStatus): DealStatus {
  // If dealStatus is explicitly set, use it
  if (proposal.dealStatus) {
    return proposal.dealStatus;
  }
  
  // Otherwise, infer from proposal status
  // 'sent' proposals that are old might be considered pending
  // For now, map sent -> pending, draft/review/final -> pending
  switch (proposal.status) {
    case 'sent':
      return 'pending';
    case 'final':
      return 'pending';
    case 'review':
      return 'pending';
    case 'draft':
    default:
      return 'pending';
  }
}

/**
 * Calculate total value of a proposal from costing sections
 */
export function calculateProposalTotal(proposal: Proposal): number {
  if (!proposal.costing || proposal.costing.length === 0) {
    return 0;
  }

  return proposal.costing.reduce((total, section) => {
    const sectionTotal = section.items.reduce((sectionSum, item) => {
      const rate = item.useFormula && item.calculatedRate !== undefined 
        ? item.calculatedRate 
        : item.rate;
      return sectionSum + (rate * item.quantity);
    }, 0);
    return total + sectionTotal;
  }, 0);
}

/**
 * Get month key from date (YYYY-MM)
 */
export function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Get month label for display (e.g., "Jan 2024")
 */
export function getMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Get last N months of data (including current)
 */
export function getLastNMonths(n: number): string[] {
  const months: string[] = [];
  const now = new Date();
  
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(getMonthKey(date));
  }
  
  return months;
}

/**
 * Group proposals by month
 */
export function groupProposalsByMonth(
  proposals: ProposalWithDealStatus[]
): Record<string, ProposalWithDealStatus[]> {
  const grouped: Record<string, ProposalWithDealStatus[]> = {};
  
  proposals.forEach((proposal) => {
    const date = new Date(proposal.meta.date || proposal.id); // Fallback to id if no date
    const monthKey = getMonthKey(date);
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(proposal);
  });
  
  return grouped;
}

/**
 * Calculate monthly analytics data
 */
export function calculateMonthlyData(
  proposals: ProposalWithDealStatus[],
  months: number = 6
): MonthlyData[] {
  const lastMonths = getLastNMonths(months);
  const grouped = groupProposalsByMonth(proposals);
  
  return lastMonths.map((monthKey) => {
    const monthProposals = grouped[monthKey] || [];
    
    let pipelineValue = 0;
    let wonValue = 0;
    let lostValue = 0;
    let pendingValue = 0;
    let wonCount = 0;
    let lostCount = 0;
    let pendingCount = 0;
    
    monthProposals.forEach((proposal) => {
      const value = calculateProposalTotal(proposal);
      pipelineValue += value;
      
      const dealStatus = getDealStatus(proposal);
      
      switch (dealStatus) {
        case 'won':
          wonValue += value;
          wonCount++;
          break;
        case 'lost':
          lostValue += value;
          lostCount++;
          break;
        case 'pending':
        default:
          pendingValue += value;
          pendingCount++;
          break;
      }
    });
    
    return {
      month: monthKey,
      monthLabel: getMonthLabel(monthKey),
      proposalsCount: monthProposals.length,
      pipelineValue,
      wonValue,
      lostValue,
      pendingValue,
      wonCount,
      lostCount,
      pendingCount,
    };
  });
}

/**
 * Calculate all analytics for a set of proposals
 */
export function calculateAnalytics(
  proposals: ProposalWithDealStatus[]
): ProposalAnalytics {
  // Initialize counters
  let totalPipelineValue = 0;
  let wonRevenue = 0;
  let lostRevenue = 0;
  let pendingValue = 0;
  let wonCount = 0;
  let lostCount = 0;
  let pendingCount = 0;
  
  // Add total value to each proposal for sorting
  const proposalsWithValue = proposals.map((proposal) => ({
    ...proposal,
    _totalValue: calculateProposalTotal(proposal),
  }));
  
  proposalsWithValue.forEach((proposal) => {
    const value = proposal._totalValue;
    totalPipelineValue += value;
    
    const dealStatus = getDealStatus(proposal);
    
    switch (dealStatus) {
      case 'won':
        wonRevenue += value;
        wonCount++;
        break;
      case 'lost':
        lostRevenue += value;
        lostCount++;
        break;
      case 'pending':
      default:
        pendingValue += value;
        pendingCount++;
        break;
    }
  });
  
  // Calculate derived metrics
  const decidedDeals = wonCount + lostCount;
  const winRate = decidedDeals > 0 ? (wonCount / decidedDeals) * 100 : 0;
  const conversionRate = proposals.length > 0 ? (wonCount / proposals.length) * 100 : 0;
  const averageDealSize = proposals.length > 0 ? totalPipelineValue / proposals.length : 0;
  
  // Get top 5 proposals by value
  const topProposals = proposalsWithValue
    .sort((a, b) => b._totalValue - a._totalValue)
    .slice(0, 5)
    .map(({ _totalValue, ...proposal }) => proposal as ProposalWithDealStatus);
  
  // Calculate monthly data (last 6 months)
  const monthlyData = calculateMonthlyData(proposals, 6);
  
  return {
    totalProposals: proposals.length,
    totalPipelineValue,
    wonRevenue,
    lostRevenue,
    pendingValue,
    winRate,
    averageDealSize,
    proposalsByStatus: {
      won: wonCount,
      lost: lostCount,
      pending: pendingCount,
    },
    monthlyData,
    topProposals,
    conversionRate,
  };
}

/**
 * Format percentage with specified decimal places
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Get the maximum value in monthly data for chart scaling
 */
export function getMaxMonthlyValue(monthlyData: MonthlyData[]): number {
  if (monthlyData.length === 0) return 0;
  
  const max = Math.max(
    ...monthlyData.map((m) => Math.max(m.wonValue, m.lostValue, m.pendingValue))
  );
  
  // Add 10% padding and round up
  return Math.ceil(max * 1.1 / 1000) * 1000 || 1000;
}

/**
 * Get status color classes for charts
 */
export function getStatusColorClasses(
  status: DealStatus,
  type: 'bg' | 'text' | 'border' = 'bg'
): string {
  const colors: Record<DealStatus, Record<string, string>> = {
    won: {
      bg: 'bg-green-500 dark:bg-green-600',
      text: 'text-green-600 dark:text-green-400',
      border: 'border-green-500 dark:border-green-600',
    },
    lost: {
      bg: 'bg-red-500 dark:bg-red-600',
      text: 'text-red-600 dark:text-red-400',
      border: 'border-red-500 dark:border-red-600',
    },
    pending: {
      bg: 'bg-amber-500 dark:bg-amber-600',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-500 dark:border-amber-600',
    },
  };
  
  return colors[status][type] || colors.pending[type];
}

/**
 * Calculate trend percentage between two values
 */
export function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Get trend indicator (up, down, neutral)
 */
export function getTrendIndicator(trend: number): 'up' | 'down' | 'neutral' {
  if (trend > 1) return 'up';
  if (trend < -1) return 'down';
  return 'neutral';
}
