import { useState, useEffect, useCallback, useMemo } from 'react';
import { Proposal } from '../types';
import { 
  ProposalWithDealStatus, 
  ProposalAnalytics, 
  calculateAnalytics,
  calculateProposalTotal,
  type DealStatus
} from '../utils/analytics';

export type { DealStatus } from '../utils/analytics';

// Storage key for saved proposals archive
const PROPOSALS_ARCHIVE_KEY = 'proposalArchive';

export interface UseProposalAnalyticsReturn {
  analytics: ProposalAnalytics;
  proposals: ProposalWithDealStatus[];
  isLoading: boolean;
  refresh: () => void;
  updateProposalDealStatus: (proposalId: string, status: DealStatus) => void;
  addToArchive: (proposal: Proposal) => void;
  removeFromArchive: (proposalId: string) => void;
}

/**
 * Hook for managing proposal analytics
 * Scans localStorage for current proposal and archived proposals
 * Calculates aggregate metrics for dashboard display
 */
export function useProposalAnalytics(
  currentProposal: Proposal
): UseProposalAnalyticsReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [archivedProposals, setArchivedProposals] = useState<ProposalWithDealStatus[]>([]);
  const [currentDealStatus, setCurrentDealStatus] = useState<DealStatus>('pending');

  // Load archived proposals from localStorage
  const loadArchivedProposals = useCallback(() => {
    try {
      const saved = localStorage.getItem(PROPOSALS_ARCHIVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure each proposal has a dealStatus
        const withStatus = parsed.map((p: ProposalWithDealStatus) => ({
          ...p,
          dealStatus: p.dealStatus || 'pending',
        }));
        setArchivedProposals(withStatus);
      }
    } catch (e) {
      console.error('Failed to load archived proposals', e);
      setArchivedProposals([]);
    }
  }, []);

  // Load current proposal deal status from localStorage
  const loadCurrentDealStatus = useCallback(() => {
    try {
      const saved = localStorage.getItem(`dealStatus_${currentProposal.id}`);
      if (saved) {
        setCurrentDealStatus(saved as DealStatus);
      } else {
        // Try to infer from proposal status
        setCurrentDealStatus('pending');
      }
    } catch (e) {
      setCurrentDealStatus('pending');
    }
  }, [currentProposal.id]);

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    loadArchivedProposals();
    loadCurrentDealStatus();
    setIsLoading(false);
  }, [loadArchivedProposals, loadCurrentDealStatus]);

  // Save archived proposals to localStorage
  const saveArchivedProposals = useCallback((proposals: ProposalWithDealStatus[]) => {
    try {
      localStorage.setItem(PROPOSALS_ARCHIVE_KEY, JSON.stringify(proposals));
    } catch (e) {
      console.error('Failed to save archived proposals', e);
    }
  }, []);

  // Combine current and archived proposals
  const allProposals = useMemo((): ProposalWithDealStatus[] => {
    const current: ProposalWithDealStatus = {
      ...currentProposal,
      dealStatus: currentDealStatus,
    };

    // Filter out current proposal from archive if it exists (by id)
    const filteredArchive = archivedProposals.filter(
      (p) => p.id !== currentProposal.id
    );

    return [current, ...filteredArchive];
  }, [currentProposal, archivedProposals, currentDealStatus]);

  // Calculate analytics
  const analytics = useMemo(() => {
    return calculateAnalytics(allProposals);
  }, [allProposals]);

  // Refresh data from localStorage
  const refresh = useCallback(() => {
    setIsLoading(true);
    loadArchivedProposals();
    loadCurrentDealStatus();
    setIsLoading(false);
  }, [loadArchivedProposals, loadCurrentDealStatus]);

  // Update deal status for a proposal
  const updateProposalDealStatus = useCallback(
    (proposalId: string, status: DealStatus) => {
      if (proposalId === currentProposal.id) {
        // Update current proposal status
        setCurrentDealStatus(status);
        localStorage.setItem(`dealStatus_${proposalId}`, status);
      } else {
        // Update archived proposal status
        setArchivedProposals((prev) => {
          const updated = prev.map((p) =>
            p.id === proposalId ? { ...p, dealStatus: status } : p
          );
          saveArchivedProposals(updated);
          return updated;
        });
      }
    },
    [currentProposal.id, saveArchivedProposals]
  );

  // Add a proposal to the archive
  const addToArchive = useCallback(
    (proposal: Proposal) => {
      setArchivedProposals((prev) => {
        // Don't add if already exists
        if (prev.some((p) => p.id === proposal.id)) {
          return prev;
        }

        const toAdd: ProposalWithDealStatus = {
          ...proposal,
          dealStatus: 'pending',
        };

        const updated = [...prev, toAdd];
        saveArchivedProposals(updated);
        return updated;
      });
    },
    [saveArchivedProposals]
  );

  // Remove a proposal from the archive
  const removeFromArchive = useCallback(
    (proposalId: string) => {
      setArchivedProposals((prev) => {
        const updated = prev.filter((p) => p.id !== proposalId);
        saveArchivedProposals(updated);
        return updated;
      });
    },
    [saveArchivedProposals]
  );

  return {
    analytics,
    proposals: allProposals,
    isLoading,
    refresh,
    updateProposalDealStatus,
    addToArchive,
    removeFromArchive,
  };
}

/**
 * Simple hook for quick stats display (sidebar)
 */
export function useQuickStats(
  currentProposal: Proposal
): {
  totalProposals: number;
  winRate: number;
  totalValue: number;
} {
  const { analytics } = useProposalAnalytics(currentProposal);

  return useMemo(() => ({
    totalProposals: analytics.totalProposals,
    winRate: analytics.winRate,
    totalValue: analytics.totalPipelineValue,
  }), [analytics]);
}

/**
 * Hook for getting current proposal total value
 */
export function useCurrentProposalValue(proposal: Proposal): number {
  return useMemo(() => calculateProposalTotal(proposal), [proposal]);
}
