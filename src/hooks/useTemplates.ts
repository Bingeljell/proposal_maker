import { useState, useEffect, useCallback } from 'react';
import { ProposalTemplate, TemplateCategory, Proposal } from '../types';
import defaultTemplatesData from '../data/defaultTemplates.json';

const STORAGE_KEY = 'proposal_templates';
const CUSTOM_STORAGE_KEY = 'proposal_custom_templates';

interface UseTemplatesReturn {
  templates: ProposalTemplate[];
  customTemplates: ProposalTemplate[];
  getTemplateById: (id: string) => ProposalTemplate | undefined;
  getTemplatesByCategory: (category: TemplateCategory) => ProposalTemplate[];
  saveCustomTemplate: (template: Omit<ProposalTemplate, 'id' | 'createdAt' | 'isCustom'>) => ProposalTemplate;
  deleteCustomTemplate: (id: string) => void;
  saveCurrentProposalAsTemplate: (
    name: string,
    description: string,
    category: TemplateCategory,
    proposal: Proposal,
    sections?: string[]
  ) => ProposalTemplate;
}

export const useTemplates = (): UseTemplatesReturn => {
  const [templates, setTemplates] = useState<ProposalTemplate[]>([]);
  const [customTemplates, setCustomTemplates] = useState<ProposalTemplate[]>([]);

  // Initialize from localStorage or load defaults
  useEffect(() => {
    // Load default templates (always fresh from JSON)
    const defaults: ProposalTemplate[] = defaultTemplatesData.templates.map(t => ({
      ...t,
      category: t.category as TemplateCategory,
      isCustom: false,
    }));
    setTemplates(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));

    // Load custom templates from localStorage
    const storedCustom = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (storedCustom) {
      try {
        const parsed = JSON.parse(storedCustom);
        setCustomTemplates(parsed);
      } catch (e) {
        console.error('Failed to parse custom templates', e);
        setCustomTemplates([]);
      }
    }
  }, []);

  // Save custom templates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(customTemplates));
  }, [customTemplates]);

  const getTemplateById = useCallback((id: string) => {
    const allTemplates = [...templates, ...customTemplates];
    return allTemplates.find((t) => t.id === id);
  }, [templates, customTemplates]);

  const getTemplatesByCategory = useCallback((category: TemplateCategory) => {
    const allTemplates = [...templates, ...customTemplates];
    return allTemplates.filter((t) => t.category === category);
  }, [templates, customTemplates]);

  const saveCustomTemplate = useCallback((template: Omit<ProposalTemplate, 'id' | 'createdAt' | 'isCustom'>) => {
    const newTemplate: ProposalTemplate = {
      ...template,
      id: `custom-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };
    setCustomTemplates((prev) => [...prev, newTemplate]);
    return newTemplate;
  }, []);

  const deleteCustomTemplate = useCallback((id: string) => {
    setCustomTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const saveCurrentProposalAsTemplate = useCallback((
    name: string,
    description: string,
    category: TemplateCategory,
    proposal: Proposal,
    sections?: string[]
  ): ProposalTemplate => {
    const templateData: Partial<ProposalTemplate> = {
      name,
      description,
      category,
    };

    // If sections specified, only include those sections
    const sectionsToInclude = sections || ['execSummary', 'scope', 'clientResponsibilities', 'outOfScope', 'team', 'costing', 'rateCard', 'terms', 'signOff'];

    if (sectionsToInclude.includes('execSummary') && proposal.execSummary) {
      templateData.execSummary = { ...proposal.execSummary };
    }

    if (sectionsToInclude.includes('scope') && proposal.scope) {
      templateData.scope = JSON.parse(JSON.stringify(proposal.scope));
    }

    if (sectionsToInclude.includes('clientResponsibilities') && proposal.clientResponsibilities) {
      templateData.clientResponsibilities = [...proposal.clientResponsibilities];
    }

    if (sectionsToInclude.includes('outOfScope') && proposal.outOfScope) {
      templateData.outOfScope = [...proposal.outOfScope];
    }

    if (sectionsToInclude.includes('team') && proposal.team) {
      templateData.team = JSON.parse(JSON.stringify(proposal.team));
    }

    if (sectionsToInclude.includes('costing') && proposal.costing) {
      templateData.costing = JSON.parse(JSON.stringify(proposal.costing));
    }

    if (sectionsToInclude.includes('rateCard') && proposal.rateCard) {
      templateData.rateCard = JSON.parse(JSON.stringify(proposal.rateCard));
    }

    if (sectionsToInclude.includes('terms') && proposal.terms) {
      templateData.terms = proposal.terms;
    }

    if (sectionsToInclude.includes('signOff') && proposal.signOff) {
      templateData.signOff = { ...proposal.signOff };
    }

    return saveCustomTemplate(templateData as Omit<ProposalTemplate, 'id' | 'createdAt' | 'isCustom'>);
  }, [saveCustomTemplate]);

  return {
    templates,
    customTemplates,
    getTemplateById,
    getTemplatesByCategory,
    saveCustomTemplate,
    deleteCustomTemplate,
    saveCurrentProposalAsTemplate,
  };
};
