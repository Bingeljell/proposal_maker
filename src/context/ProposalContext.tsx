import React, { createContext, useContext, useState, useEffect } from 'react';
import { Proposal } from '../types';
import { initialProposal } from '../data/initialProposal';

interface ProposalContextType {
  proposal: Proposal;
  updateProposal: (updates: Partial<Proposal>) => void;
  updateSection: <K extends keyof Proposal>(section: K, data: Proposal[K]) => void;
  loadFromFile: (file: File) => void;
  saveToFile: () => void;
  resetProposal: () => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [proposal, setProposal] = useState<Proposal>(() => {
    try {
      const saved = localStorage.getItem('currentProposal');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration: Ensure sectionVisibility exists
        if (!parsed.sectionVisibility) {
          return { ...parsed, sectionVisibility: initialProposal.sectionVisibility };
        }
        return parsed;
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
        // Migration: Ensure sectionVisibility exists for uploaded files
        if (!json.sectionVisibility) {
          json.sectionVisibility = initialProposal.sectionVisibility;
        }
        setProposal(json);
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
    link.download = `${proposal.meta.clientName.replace(/\s+/g, '_')}_proposal.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetProposal = () => {
    if (confirm('Are you sure? This will clear current changes.')) {
      setProposal(initialProposal);
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
