import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Proposal, PackageTemplate, ProposalTemplate, CostItem, ProposalStatus, ProposalOutcome, OutcomeDetails } from '../types';
import { initialProposal } from '../data/initialProposal';
import { calculateItemRate } from '../utils/pricingEngine';

interface ProposalContextType {
  proposal: Proposal;
  updateProposal: (updates: Partial<Proposal>) => void;
  updateSection: <K extends keyof Proposal>(section: K, data: Proposal[K]) => void;
  loadFromFile: (file: File) => void;
  saveToFile: () => void;
  resetProposal: () => void;
  duplicateProposal: () => void;
  applyPackage: (pkg: PackageTemplate) => void;
  applyTemplate: (template: ProposalTemplate, sections?: string[]) => void;
  recalculateCosts: () => void;
  updatePricingVariable: (variableId: string, value: number) => void;
  getCalculatedItemRate: (item: CostItem) => number;
  updateStatus: (newStatus: ProposalStatus) => void;
  updateOutcome: (outcome: ProposalOutcome, details?: OutcomeDetails) => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [proposal, setProposal] = useState<Proposal>(() => {
    try {
      const saved = localStorage.getItem('currentProposal');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration: Ensure required fields exist
        const migrated = { ...parsed };
        if (!migrated.sectionVisibility) {
          migrated.sectionVisibility = initialProposal.sectionVisibility;
        }
        if (!migrated.pageBreaks) {
          migrated.pageBreaks = [];
        }
        if (!migrated.meta.proposalName) {
          migrated.meta.proposalName = '';
        }
        if (!migrated.pricingVariables) {
          migrated.pricingVariables = [];
        }
        // Migration: Add status field for existing proposals
        if (!migrated.status) {
          migrated.status = 'draft';
        }
        if (!migrated.statusHistory) {
          migrated.statusHistory = [
            {
              status: migrated.status,
              timestamp: new Date().toISOString(),
              changedBy: 'System (Migration)',
            },
          ];
        }
        // Migration: Ensure coverStyle exists
        if (!migrated.meta.coverStyle) {
          migrated.meta.coverStyle = {
            layout: 'centered',
            showDecorativeElements: true,
            backgroundPattern: 'none',
            accentColor: '#2563eb',
            fontSize: 'normal',
          };
        }
        // Migration: Add outcome fields for existing proposals
        if (!migrated.outcome) {
          migrated.outcome = 'pending';
        }
        return migrated;
      }
      return initialProposal;
    } catch (e) {
      return initialProposal;
    }
  });

  useEffect(() => {
    localStorage.setItem('currentProposal', JSON.stringify(proposal));
  }, [proposal]);

  const updateProposal = (updates: Partial<Proposal>) => {
    setProposal((prev) => ({ ...prev, ...updates }));
  };

  const updateSection = <K extends keyof Proposal>(section: K, data: Proposal[K]) => {
    setProposal((prev) => ({ ...prev, [section]: data }));
  };

  /**
   * Recalculate all costing items that use formulas
   * This is called automatically when pricing variables change
   */
  const recalculateCosts = useCallback(() => {
    setProposal((prev) => {
      const updatedCosting = prev.costing.map((section) => ({
        ...section,
        items: section.items.map((item) => {
          if (item.useFormula && item.formula) {
            const result = calculateItemRate(item, prev.pricingVariables || []);
            return {
              ...item,
              calculatedRate: result.rate,
              formulaError: result.error,
            };
          }
          return item;
        }),
      }));

      return { ...prev, costing: updatedCosting };
    });
  }, []);

  /**
   * Update a pricing variable value and recalculate all dependent costs
   */
  const updatePricingVariable = useCallback((variableId: string, value: number) => {
    setProposal((prev) => {
      const updatedVariables = prev.pricingVariables.map((v) =>
        v.id === variableId ? { ...v, value } : v
      );

      // Recalculate all items that might use this variable
      const updatedCosting = prev.costing.map((section) => ({
        ...section,
        items: section.items.map((item) => {
          if (item.useFormula && item.formula) {
            const result = calculateItemRate(
              { ...item, variables: item.variables },
              updatedVariables
            );
            return {
              ...item,
              calculatedRate: result.rate,
              formulaError: result.error,
            };
          }
          return item;
        }),
      }));

      return {
        ...prev,
        pricingVariables: updatedVariables,
        costing: updatedCosting,
      };
    });
  }, []);

  /**
   * Get the calculated rate for a cost item
   * Returns the formula result if in formula mode, otherwise returns manual rate
   */
  const getCalculatedItemRate = useCallback(
    (item: CostItem): number => {
      if (item.useFormula && item.formula) {
        const result = calculateItemRate(item, proposal.pricingVariables || []);
        return result.rate;
      }
      return item.rate;
    },
    [proposal.pricingVariables]
  );

  const loadFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        // Migration: Ensure required fields exist for uploaded files
        const migrated = { ...json };
        if (!migrated.sectionVisibility) {
          migrated.sectionVisibility = initialProposal.sectionVisibility;
        }
        if (!migrated.pageBreaks) {
          migrated.pageBreaks = [];
        }
        if (!migrated.meta.proposalName) {
          migrated.meta.proposalName = '';
        }
        if (!migrated.pricingVariables) {
          migrated.pricingVariables = [];
        }
        // Migration: Add status field for imported files
        if (!migrated.status) {
          migrated.status = 'draft';
        }
        if (!migrated.statusHistory) {
          migrated.statusHistory = [
            {
              status: migrated.status,
              timestamp: new Date().toISOString(),
              changedBy: 'System (Import)',
            },
          ];
        }
        // Migration: Ensure coverStyle exists
        if (!migrated.meta.coverStyle) {
          migrated.meta.coverStyle = {
            layout: 'centered',
            showDecorativeElements: true,
            backgroundPattern: 'none',
            accentColor: '#2563eb',
            fontSize: 'normal',
          };
        }
        // Migration: Add outcome fields for imported files
        if (!migrated.outcome) {
          migrated.outcome = 'pending';
        }
        setProposal(migrated);
      } catch (err) {
        console.error('Failed to parse proposal file', err);
        alert('Invalid proposal file');
      }
    };
    reader.readAsText(file);
  };

  const saveToFile = () => {
    const dataStr = JSON.stringify(proposal, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileName = proposal.meta.proposalName.trim() || proposal.meta.title;
    link.download = `${fileName.replace(/\s+/g, '_')}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetProposal = () => {
    if (confirm('Are you sure? This will clear current changes.')) {
      setProposal(initialProposal);
    }
  };

  const duplicateProposal = () => {
    setProposal((prev) => {
      const cloned: Proposal = JSON.parse(JSON.stringify(prev));
      // Update meta info for the copy
      cloned.meta.title += ' - Copy';
      cloned.meta.date = new Date().toISOString().split('T')[0];
      // Clear version history for fresh start
      cloned.versionHistory = [];
      // Reset status to draft for the copy
      cloned.status = 'draft';
      cloned.statusHistory = [
        {
          status: 'draft',
          timestamp: new Date().toISOString(),
          changedBy: 'System (Duplicate)',
        },
      ];
      // Generate new proposal ID
      cloned.id = crypto.randomUUID();
      return cloned;
    });
  };

  /**
   * Update the proposal status and log the change
   */
  const updateStatus = useCallback((newStatus: ProposalStatus) => {
    setProposal((prev) => {
      // Don't update if status hasn't changed
      if (prev.status === newStatus) return prev;

      const historyItem = {
        status: newStatus,
        timestamp: new Date().toISOString(),
        changedBy: 'User',
      };

      console.log(`[Proposal Status] Changed from "${prev.status}" to "${newStatus}" at ${historyItem.timestamp}`);

      return {
        ...prev,
        status: newStatus,
        statusHistory: [...(prev.statusHistory || []), historyItem],
      };
    });
  }, []);

  /**
   * Update the proposal outcome and details
   */
  const updateOutcome = useCallback((outcome: ProposalOutcome, details?: OutcomeDetails) => {
    setProposal((prev) => {
      console.log(`[Proposal Outcome] Changed from "${prev.outcome || 'pending'}" to "${outcome}"`);

      return {
        ...prev,
        outcome,
        outcomeDetails: details,
      };
    });
  }, []);

  const applyPackage = (pkg: PackageTemplate) => {
    setProposal((prev) => {
      // Generate new IDs for scope items to avoid conflicts
      const newScope = pkg.scope.map(section => ({
        ...section,
        id: crypto.randomUUID(),
        deliverables: section.deliverables.map(d => ({
          ...d,
          id: crypto.randomUUID(),
        })),
      }));

      // Generate new IDs for rate card items
      const newRateCard = pkg.rateCard.map(section => ({
        ...section,
        id: crypto.randomUUID(),
        items: section.items.map(item => ({
          ...item,
          id: crypto.randomUUID(),
        })),
      }));

      // Generate new IDs for team members
      const newTeam = pkg.team.map(member => ({
        ...member,
        id: crypto.randomUUID(),
      }));

      return {
        ...prev,
        execSummary: { ...pkg.execSummary },
        scope: newScope,
        rateCard: newRateCard,
        team: newTeam,
      };
    });
  };

  const applyTemplate = (template: ProposalTemplate, sections?: string[]) => {
    setProposal((prev) => {
      const updates: Partial<Proposal> = {};

      // Determine which sections to apply
      const sectionsToApply = sections || [
        'execSummary',
        'scope',
        'clientResponsibilities',
        'outOfScope',
        'team',
        'costing',
        'rateCard',
        'terms',
        'signOff',
      ];

      // Apply execSummary
      if (sectionsToApply.includes('execSummary') && template.execSummary) {
        updates.execSummary = { ...template.execSummary };
      }

      // Apply scope with new IDs
      if (sectionsToApply.includes('scope') && template.scope && template.scope.length > 0) {
        updates.scope = template.scope.map((section) => ({
          ...section,
          id: crypto.randomUUID(),
          deliverables: section.deliverables.map((d) => ({
            ...d,
            id: crypto.randomUUID(),
          })),
        }));
      }

      // Apply clientResponsibilities
      if (sectionsToApply.includes('clientResponsibilities') && template.clientResponsibilities) {
        updates.clientResponsibilities = [...template.clientResponsibilities];
      }

      // Apply outOfScope
      if (sectionsToApply.includes('outOfScope') && template.outOfScope) {
        updates.outOfScope = [...template.outOfScope];
      }

      // Apply team with new IDs
      if (sectionsToApply.includes('team') && template.team && template.team.length > 0) {
        updates.team = template.team.map((member) => ({
          ...member,
          id: crypto.randomUUID(),
        }));
      }

      // Apply costing with new IDs
      if (sectionsToApply.includes('costing') && template.costing && template.costing.length > 0) {
        updates.costing = template.costing.map((section) => ({
          ...section,
          id: crypto.randomUUID(),
          items: section.items.map((item) => ({
            ...item,
            id: crypto.randomUUID(),
          })),
        }));
      }

      // Apply rateCard with new IDs
      if (sectionsToApply.includes('rateCard') && template.rateCard && template.rateCard.length > 0) {
        updates.rateCard = template.rateCard.map((section) => ({
          ...section,
          id: crypto.randomUUID(),
          items: section.items.map((item) => ({
            ...item,
            id: crypto.randomUUID(),
          })),
        }));
      }

      // Apply terms
      if (sectionsToApply.includes('terms') && template.terms) {
        updates.terms = template.terms;
      }

      // Apply signOff
      if (sectionsToApply.includes('signOff') && template.signOff) {
        updates.signOff = { ...template.signOff };
      }

      return {
        ...prev,
        ...updates,
      };
    });
  };

  return (
    <ProposalContext.Provider
      value={{
        proposal,
        updateProposal,
        updateSection,
        loadFromFile,
        saveToFile,
        resetProposal,
        duplicateProposal,
        applyPackage,
        applyTemplate,
        recalculateCosts,
        updatePricingVariable,
        getCalculatedItemRate,
        updateStatus,
        updateOutcome,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposalContext = () => {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error('useProposalContext must be used within a ProposalProvider');
  }
  return context;
};
