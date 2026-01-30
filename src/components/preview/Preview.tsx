import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { SectionId, ProposalStatus, ProposalOutcome } from '../../types';
import {
  CoverPage,
  VersionHistory,
  ExecutiveSummary,
  ScopeOfWork,
  Requirements,
  OutOfScope,
  Team,
  Commercials,
  RateCard,
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
    { id: 'ratecard', label: 'Rate Card', Component: RateCard },
    { id: 'terms', label: 'Terms & Conditions', Component: Terms },
    { id: 'sign-off', label: 'Sign Off', Component: SignOffSection },
  ];

  // Filter visible sections
  const visibleSections = contentSections.filter(section => visibility[section.id] !== false);

  // Status watermark styles
  const getStatusWatermark = (status: ProposalStatus) => {
    const watermarks: Record<ProposalStatus, { text: string; className: string }> = {
      draft: {
        text: 'DRAFT',
        className: 'text-gray-300/30 dark:text-gray-600/30',
      },
      review: {
        text: 'IN REVIEW',
        className: 'text-amber-300/30 dark:text-amber-600/30',
      },
      final: {
        text: 'FINAL',
        className: 'text-blue-300/30 dark:text-blue-600/30',
      },
      sent: {
        text: 'SENT',
        className: 'text-green-300/30 dark:text-green-600/30',
      },
    };
    return watermarks[status];
  };

  // Outcome watermark styles
  const getOutcomeWatermark = (outcome: ProposalOutcome | undefined) => {
    if (!outcome || outcome === 'pending') return null;
    
    const watermarks: Record<Exclude<ProposalOutcome, 'pending'>, { text: string; className: string; stampClass: string; stampTextClass: string }> = {
      won: {
        text: 'WON',
        className: 'text-green-300/20 dark:text-green-600/20',
        stampClass: 'border-green-500/50 bg-green-50/10',
        stampTextClass: 'text-green-500/60',
      },
      lost: {
        text: 'LOST',
        className: 'text-red-300/20 dark:text-red-600/20',
        stampClass: 'border-red-500/50 bg-red-50/10',
        stampTextClass: 'text-red-500/60',
      },
      'on-hold': {
        text: 'ON HOLD',
        className: 'text-amber-300/20 dark:text-amber-600/20',
        stampClass: 'border-amber-500/50 bg-amber-50/10',
        stampTextClass: 'text-amber-500/60',
      },
    };
    return watermarks[outcome];
  };

  const watermark = getStatusWatermark(proposal.status);
  const outcomeWatermark = getOutcomeWatermark(proposal.outcome);

  return (
    <div className="print:m-0 print:p-0 relative">
      {/* Status Watermark - Visible in Preview Mode */}
      {proposal.status !== 'sent' && (
        <div
          className={`
            fixed pointer-events-none select-none z-0
            text-6xl md:text-8xl font-black tracking-widest uppercase
            rotate-45 origin-center
            ${watermark.className}
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            print:hidden
          `}
        >
          {watermark.text}
        </div>
      )}

      {/* SENT Stamp - Special treatment for sent status */}
      {proposal.status === 'sent' && (
        <div
          className={`
            fixed pointer-events-none select-none z-50
            print:fixed print:z-50 print:block
            top-8 right-8 print:top-4 print:right-4
          `}
        >
          <div
            className={`
              border-4 border-green-500/50 rounded-lg
              px-4 py-2
              transform rotate-12
              bg-green-50/10 backdrop-blur-sm
            `}
          >
            <span className="text-3xl md:text-4xl font-black text-green-500/60 tracking-widest uppercase">
              SENT
            </span>
          </div>
        </div>
      )}

      {/* Outcome Watermark - Shows over status watermark when set */}
      {outcomeWatermark && (
        <>
          <div
            className={`
              fixed pointer-events-none select-none z-0
              text-6xl md:text-8xl font-black tracking-widest uppercase
              rotate-45 origin-center
              ${outcomeWatermark.className}
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              print:hidden
            `}
          >
            {outcomeWatermark.text}
          </div>
          <div
            className={`
              fixed pointer-events-none select-none z-50
              print:fixed print:z-50 print:block
              bottom-8 right-8 print:bottom-4 print:right-4
            `}
          >
            <div
              className={`
                border-4 ${outcomeWatermark.stampClass} rounded-lg
                px-4 py-2
                transform -rotate-12
                backdrop-blur-sm
              `}
            >
              <span className={`text-3xl md:text-4xl font-black ${outcomeWatermark.stampTextClass} tracking-widest uppercase`}>
                {outcomeWatermark.text}
              </span>
            </div>
          </div>
        </>
      )}

      {/* 1. Cover Page */}
      {(visibility['intro'] !== false) && (
        <div className="print:break-after-page mb-8 print:mb-0 relative">
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
