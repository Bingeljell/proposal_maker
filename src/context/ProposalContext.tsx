import React, { createContext, useContext, useState, useEffect } from 'react';
import { Proposal, PackageTemplate, ProposalTemplate } from '../types';
import { initialProposal } from '../data/initialProposal';

interface ProposalContextType {
  proposal: Proposal;
  updateProposal: (updates: Partial<Proposal>) => void;
  updateSection: <K extends keyof Proposal>(section: K, data: Proposal[K]) => void;
  loadFromFile: (file: File) => void;
  saveToFile: () => void;
  resetProposal: () => void;
  duplicateProposal: () => void;
  applyPackage: (pkg: PackageTemplate) => void;
  loadTemplate: (template: ProposalTemplate) => void;
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
        if (!migrated.meta.theme) {
          migrated.meta.theme = initialProposal.meta.theme;
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
        if (!migrated.meta.theme) {
          migrated.meta.theme = initialProposal.meta.theme;
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
      // Generate new proposal ID
      cloned.id = crypto.randomUUID();
      return cloned;
    });
  };

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

  const loadTemplate = (template: ProposalTemplate) => {
    if (confirm(`Are you sure you want to load the "${template.name}" template? This will overwrite your current proposal.`)) {
      const newProposal: Proposal = {
        ...initialProposal,
        ...template.data,
        id: crypto.randomUUID(),
        meta: {
          ...initialProposal.meta,
          title: template.name,
          date: new Date().toISOString().split('T')[0],
          proposalName: '',
        },
        versionHistory: [
          {
            id: crypto.randomUUID(),
            version: '1.0',
            date: new Date().toISOString().split('T')[0],
            author: 'Agency Team',
            notes: `Initialized from ${template.name} template`,
          },
        ],
      };
      setProposal(newProposal);
    }
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
        loadTemplate,
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
