import React, { useState } from 'react';
import { 
  FileText, 
  History, 
  Target, 
  Briefcase, 
  Users, 
  IndianRupee, 
  FileSignature, 
  Info,
  ShieldCheck,
  LayoutTemplate,
  Eye,
  EyeOff,
  Tag,
  Copy,
  BookOpen,
  Package,
  ClipboardList,
  Settings
} from 'lucide-react';
import { SectionId, PackageTemplate, ProposalTemplate } from '../../types';
import { useProposal } from '../../hooks/useProposal';
import { useProposalContext } from '../../context/ProposalContext';
import { ContentLibraryManager } from '../ui/ContentLibraryManager';
import { PackageSelector } from '../ui/PackageSelector';
import { QuestionnaireModal } from '../ui/QuestionnaireModal';
import { TemplateModal } from '../ui/TemplateModal';
import { AISettingsModal } from '../ui/AISettingsModal';

interface SidebarProps {
  activeSection: SectionId;
  onSectionChange: (id: SectionId) => void;
}

const sections: { id: SectionId; label: string; icon: React.ElementType }[] = [
  { id: 'intro', label: 'Intro & Logo', icon: LayoutTemplate },
  { id: 'history', label: 'Version History', icon: History },
  { id: 'summary', label: 'Summary & Objectives', icon: Target },
  { id: 'scope', label: 'Scope of Work', icon: Briefcase },
  { id: 'client-req', label: 'Client Responsibilities', icon: Info },
  { id: 'out-of-scope', label: 'Out of Scope', icon: ShieldCheck },
  { id: 'team', label: 'Proposed Team', icon: Users },
  { id: 'costing', label: 'Commercials', icon: IndianRupee },
  { id: 'ratecard', label: 'Rate Card', icon: Tag },
  { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  { id: 'sign-off', label: 'Sign-off', icon: FileSignature },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { proposal, updateProposal } = useProposal();
  const { duplicateProposal, applyPackage, loadTemplate } = useProposalContext();
  const [isLibraryManagerOpen, setIsLibraryManagerOpen] = useState(false);
  const [isPackageSelectorOpen, setIsPackageSelectorOpen] = useState(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleVisibility = (e: React.MouseEvent, sectionId: SectionId) => {
    e.stopPropagation(); // Prevent navigating when clicking the eye
    updateProposal({
      sectionVisibility: {
        ...proposal.sectionVisibility,
        [sectionId]: !proposal.sectionVisibility[sectionId]
      }
    });
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Sections</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const isVisible = proposal.sectionVisibility ? proposal.sectionVisibility[section.id] : true; // Fallback for safety

          return (
            <div
              key={section.id}
              className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <button
                onClick={() => onSectionChange(section.id)}
                className="flex items-center gap-3 flex-1 text-left"
              >
                <Icon size={18} />
                <span className={!isVisible ? 'opacity-50 line-through decoration-gray-400' : ''}>
                  {section.label}
                </span>
              </button>
              
              <button
                onClick={(e) => toggleVisibility(e, section.id)}
                className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                  isVisible ? 'text-blue-600 dark:text-blue-400' : 'text-red-500 dark:text-red-400'
                }`}
                title={isVisible ? "Included in proposal" : "Excluded from proposal"}
              >
                {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button
          onClick={duplicateProposal}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
          title="Create a copy of the current proposal"
        >
          <Copy size={16} />
          Duplicate Proposal
        </button>
        <button
          onClick={() => setIsLibraryManagerOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
          title="Manage reusable content snippets"
        >
          <BookOpen size={16} />
          Content Library
        </button>
        <button
          onClick={() => setIsTemplateModalOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
          title="Load a full proposal template"
        >
          <LayoutTemplate size={16} />
          Load Template
        </button>
        <button
          onClick={() => setIsPackageSelectorOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
          title="Apply a pre-defined package"
        >
          <Package size={16} />
          Load Package
        </button>
        <button
          onClick={() => setIsQuestionnaireOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
          title="Answer a few questions to get a recommendation"
        >
          <ClipboardList size={16} />
          Questionnaire
        </button>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors mt-4 border-t border-gray-200 dark:border-gray-600 pt-2"
          title="Configure API Keys and Settings"
        >
          <Settings size={16} />
          Settings
        </button>
      </div>

      {/* Content Library Manager Modal */}
      <ContentLibraryManager
        isOpen={isLibraryManagerOpen}
        onClose={() => setIsLibraryManagerOpen(false)}
      />

      {/* Package Selector Modal */}
      <PackageSelector
        isOpen={isPackageSelectorOpen}
        onClose={() => setIsPackageSelectorOpen(false)}
        onApplyPackage={(pkg: PackageTemplate) => {
          applyPackage(pkg);
          alert(`Package "${pkg.name}" has been applied to your proposal!`);
        }}
      />

      {/* Questionnaire Modal */}
      <QuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
        onApplyPackage={(pkg: PackageTemplate) => {
          applyPackage(pkg);
          alert(`Package "${pkg.name}" has been applied based on your responses!`);
        }}
      />

      {/* Template Modal */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onLoadTemplate={(template: ProposalTemplate) => {
          loadTemplate(template);
        }}
      />

      {/* Settings Modal */}
      <AISettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
