import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { SectionId } from '../../types';
import {
  CoverPage,
  VersionHistory,
  ExecutiveSummary,
  ScopeOfWork,
  Requirements,
  OutOfScope,
  Team,
  Commercials,
  Terms,
  SignOffSection
} from './ProposalSections';

export const Preview: React.FC = () => {
  const { proposal } = useProposal();
  const visibility = proposal.sectionVisibility || {};

  // Configuration for dynamic rendering
  // Note: 'intro' is handled separately as the Cover Page
  const contentSections: { id: SectionId; label: string; Component: React.FC<any> }[] = [
    { id: 'history', label: 'Version History', Component: VersionHistory },
    { id: 'summary', label: 'Executive Summary', Component: ExecutiveSummary },
    { id: 'scope', label: 'Scope of Work', Component: ScopeOfWork },
    { id: 'client-req', label: 'Client Requirements', Component: Requirements },
    { id: 'out-of-scope', label: 'Out of Scope', Component: OutOfScope },
    { id: 'team', label: 'Proposed Team', Component: Team },
    { id: 'costing', label: 'Commercials', Component: Commercials },
    { id: 'terms', label: 'Terms & Conditions', Component: Terms },
    { id: 'sign-off', label: 'Sign Off', Component: SignOffSection },
  ];

  // Filter visible sections
  const visibleSections = contentSections.filter(section => visibility[section.id] !== false);

  return (
    <div className="print:m-0 print:p-0">
      {/* 1. Cover Page */}
      {(visibility['intro'] !== false) && (
        <div className="print:break-after-page mb-8 print:mb-0">
          <CoverPage proposal={proposal} />
        </div>
      )}

      {/* 2. Content Pages */}
      <div className="bg-white w-full max-w-[210mm] mx-auto min-h-[297mm] p-[15mm] shadow-lg print:shadow-none print:w-full print:max-w-none print:h-auto print:min-h-0">
        
        {/* Table of Contents */}
        <div className="mb-12 print:break-after-page pb-12 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Index</h2>
          {visibleSections.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
              {visibleSections.map((section, index) => (
                <li key={section.id} className="flex justify-between border-b border-gray-100 pb-2">
                  <span>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}. {section.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No sections visible.</p>
          )}
        </div>

        {/* Content Flow */}
        {visibleSections.map((section, index) => {
          const Component = section.Component;
          return (
            <Component 
              key={section.id} 
              proposal={proposal} 
              index={index + 1} 
            />
          );
        })}
      </div>
    </div>
  );
};
