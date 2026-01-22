import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import {
  CoverPage,
  VersionHistory,
  ExecutiveSummary,
  ScopeOfWork,
  Requirements,
  OutOfScope,
  Team,
  Commercials,
  TermsAndSignOff
} from './ProposalSections';

export const Preview: React.FC = () => {
  const { proposal } = useProposal();

  // Section numbering counter
  let sectionCounter = 1;

  return (
    <div className="print:m-0 print:p-0">
      {/* 1. Cover Page */}
      <div className="print:break-after-page mb-8 print:mb-0">
        <CoverPage proposal={proposal} />
      </div>

      {/* 2. Content Pages */}
      <div className="bg-white w-full max-w-[210mm] mx-auto min-h-[297mm] p-[15mm] shadow-lg print:shadow-none print:w-full print:max-w-none print:h-auto print:min-h-0">
        
        {/* Table of Contents (Simple List for now) */}
        <div className="mb-12 print:break-after-page pb-12 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Index</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>01. Version History</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>02. Executive Summary</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>03. Scope of Work</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>04. Client Requirements</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>05. Out of Scope</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>06. Proposed Team</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>07. Commercials</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-2">
              <span>08. Terms & Sign Off</span>
            </li>
          </ul>
        </div>

        {/* Content Flow */}
        <VersionHistory proposal={proposal} index={sectionCounter++} />
        
        <ExecutiveSummary proposal={proposal} index={sectionCounter++} />
        
        <ScopeOfWork proposal={proposal} index={sectionCounter++} />

        <Requirements proposal={proposal} index={sectionCounter++} />
        <OutOfScope proposal={proposal} index={sectionCounter++} />
        
        <Team proposal={proposal} index={sectionCounter++} />
        
        <Commercials proposal={proposal} index={sectionCounter++} />

        <TermsAndSignOff 
          proposal={proposal} 
          indexTerms={sectionCounter++} 
          indexSign={sectionCounter++} 
        />
      </div>
    </div>
  );
};
