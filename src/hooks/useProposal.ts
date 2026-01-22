import { useProposalContext } from '../context/ProposalContext';

// Re-export the context hook as useProposal to maintain compatibility
// with existing components without refactoring imports.
export const useProposal = useProposalContext;