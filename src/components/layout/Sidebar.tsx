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
  BookOpen
} from 'lucide-react';
import { SectionId } from '../../types';
import { useProposal } from '../../hooks/useProposal';
import { useProposalContext } from '../../context/ProposalContext';
import { ContentLibraryManager } from '../ui/ContentLibraryManager';

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
  const { duplicateProposal } = useProposalContext();
  const [isLibraryManagerOpen, setIsLibraryManagerOpen] = useState(false);

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
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Sections</h2>
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
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
                className={`p-1 rounded-md hover:bg-gray-100 transition-colors ${
                  isVisible ? 'text-blue-600' : 'text-red-500'
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
      <div className="p-3 border-t border-gray-200 space-y-2">
        <button
          onClick={duplicateProposal}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
          title="Create a copy of the current proposal"
        >
          <Copy size={16} />
          Duplicate Proposal
        </button>
        <button
          onClick={() => setIsLibraryManagerOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
          title="Manage reusable content snippets"
        >
          <BookOpen size={16} />
          Content Library
        </button>
      </div>

      {/* Content Library Manager Modal */}
      <ContentLibraryManager
        isOpen={isLibraryManagerOpen}
        onClose={() => setIsLibraryManagerOpen(false)}
      />
    </div>
  );
};
