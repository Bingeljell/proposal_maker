import React from 'react';
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
  LayoutTemplate
} from 'lucide-react';

export type SectionId = 
  | 'intro' 
  | 'history' 
  | 'summary' 
  | 'scope' 
  | 'client-req' 
  | 'out-of-scope' 
  | 'team' 
  | 'costing' 
  | 'terms' 
  | 'sign-off';

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
  { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  { id: 'sign-off', label: 'Sign-off', icon: FileSignature },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Sections</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} />
              {section.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
