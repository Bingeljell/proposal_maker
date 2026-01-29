import React from 'react';
import { Proposal, PageBreakTargetType } from '../../types';
import { IndianRupee, Globe, MapPin } from 'lucide-react';

// --- Helper Components ---

const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white w-full max-w-[210mm] mx-auto min-h-[297mm] p-[15mm] mb-8 shadow-lg print:shadow-none print:mb-0 print:w-full print:max-w-none print:h-auto print:min-h-0 ${className}`}>
    {children}
  </div>
);

const TricolorLine: React.FC = () => (
  <div className="flex flex-col h-1.5 w-full mb-6 mt-8 break-inside-avoid">
    <div className="h-0.5 w-full bg-[#FF9933]"></div> {/* Saffron */}
    <div className="h-0.5 w-full bg-white border-y border-gray-100"></div> {/* White */}
    <div className="h-0.5 w-full bg-[#138808]"></div> {/* Green */}
  </div>
);

const PageBreakMarker: React.FC = () => (
  <div className="page-break-marker" aria-hidden="true">
    <span className="page-break-marker-label">Page Break</span>
  </div>
);

const hasBreakBefore = (proposal: Proposal, targetType: PageBreakTargetType, targetId: string) =>
  proposal.pageBreaks?.some((b) => b.targetType === targetType && b.targetId === targetId);

const SectionHeading: React.FC<{ title: string; number?: number }> = ({ title, number }) => (
  <div className="break-inside-avoid">
    <TricolorLine />
    <div className="border-b-2 border-gray-900 pb-2 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider flex items-baseline">
        {number && <span className="text-gray-400 mr-3 text-lg font-light">{number < 10 ? `0${number}` : number}.</span>}
        {title}
      </h2>
    </div>
  </div>
);

// --- Section Renderers ---

export const CoverPage: React.FC<{ proposal: Proposal }> = ({ proposal }) => (
  <PageContainer className="flex flex-col justify-between text-center">
    <div>
      <TricolorLine />
      <div className="pt-20">
        {proposal.meta.logo ? (
          <img src={proposal.meta.logo} alt="Agency Logo" className="h-32 mx-auto object-contain mb-8" />
        ) : (
          <div className="h-32 flex items-center justify-center text-gray-300 font-bold text-xl uppercase tracking-widest">
            Agency Logo
          </div>
        )}
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
        {proposal.meta.title}
      </h1>
      <p className="text-xl text-gray-500 uppercase tracking-widest font-medium">
        Prepared for {proposal.meta.clientName}
      </p>
    </div>

    <div className="pb-20 text-gray-400 font-medium">
      <p>{new Date(proposal.meta.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
    </div>
  </PageContainer>
);

export const VersionHistory: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => (
  <div className="mb-12 break-inside-avoid">
    <SectionHeading title="Version History" number={index} />
    <table className="w-full text-left text-sm border-collapse">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="py-2 font-bold text-gray-600">Version</th>
          <th className="py-2 font-bold text-gray-600">Date</th>
          <th className="py-2 font-bold text-gray-600">Author</th>
          <th className="py-2 font-bold text-gray-600">Notes</th>
        </tr>
      </thead>
      <tbody>
        {proposal.versionHistory.map((v) => (
          <tr key={v.id} className="border-b border-gray-100">
            <td className="py-3 font-mono text-gray-500">{v.version}</td>
            <td className="py-3 text-gray-700">{v.date}</td>
            <td className="py-3 text-gray-700">{v.author}</td>
            <td className="py-3 text-gray-700 italic">{v.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const ExecutiveSummary: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => (
  <div className="mb-12 break-before-page">
    <SectionHeading title="Executive Summary" number={index} />
    <div 
      className="prose prose-sm max-w-none text-gray-700 mb-8"
      dangerouslySetInnerHTML={{ __html: proposal.execSummary.summary }}
    />
    
    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 break-inside-avoid">
      <h3 className="font-bold text-gray-900 mb-3 text-lg">Key Objectives</h3>
      <div 
        className="prose prose-sm max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: proposal.execSummary.objectives }}
      />
    </div>
  </div>
);

export const ScopeOfWork: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => (
  <div className="mb-12 pt-4 border-t-4 border-gray-100 border-dotted print:border-0">
    <SectionHeading title="Scope of Work" number={index} />
    <div className="space-y-8">
      {proposal.scope.map((section) => (
        <React.Fragment key={section.id}>
          {hasBreakBefore(proposal, 'scope-category', section.id) && <PageBreakMarker />}
          <div className="print:mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2 break-after-avoid">{section.name}</h3>
            <div 
              className="prose prose-sm max-w-none text-gray-600 mb-4"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
            
            <div className="bg-gray-50 rounded-lg p-4 break-inside-avoid print:break-inside-avoid">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 break-after-avoid">Deliverables</h4>
              <ul className="grid grid-cols-1 gap-2">
                {section.deliverables.map((del) => (
                  <React.Fragment key={del.id}>
                    {hasBreakBefore(proposal, 'scope-deliverable', del.id) && (
                      <li className="page-break-list-item">
                        <PageBreakMarker />
                      </li>
                    )}
                    <li className="flex justify-between text-sm border-b border-gray-200 pb-2 last:border-0 last:pb-0 break-inside-avoid">
                      <span className="text-gray-800">{del.description}</span>
                      <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">{del.quantity}</span>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const Requirements: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => (
  <div className="mb-12 pt-4 border-t-4 border-gray-100 border-dotted break-inside-avoid break-before-page print:border-0">
    <SectionHeading title="Client Requirements" number={index} />
    <ul className="list-disc list-inside space-y-2 text-gray-700">
      {proposal.clientResponsibilities.map((req, i) => (
        <li key={i}>{req}</li>
      ))}
    </ul>
  </div>
);

export const OutOfScope: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => (
  <div className="mb-12 pt-4 border-t-4 border-gray-100 border-dotted break-inside-avoid break-before-page print:border-0">
    <SectionHeading title="Out of Scope" number={index} />
    <ul className="list-disc list-inside space-y-2 text-gray-700">
      {proposal.outOfScope.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

export const Team: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => {
  const totalFTE = proposal.team.reduce((acc, member) => acc + member.allocation, 0) / 100;

  return (
    <div className="mb-12 pt-4 border-t-4 border-gray-100 border-dotted break-before-page print:border-0">
      <SectionHeading title="Proposed Team" number={index} />
      <div className="space-y-4">
        {proposal.team.map((member) => (
          <React.Fragment key={member.id}>
            {hasBreakBefore(proposal, 'team-member', member.id) && <PageBreakMarker />}
            <div className="break-inside-avoid print:break-inside-avoid">
              <div className="flex gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-lg">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{member.name}</h4>
                      <p className="text-blue-600 font-medium text-sm">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                        {member.allocation}% Time
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-normal">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <div className="bg-gray-900 text-white px-5 py-2 rounded-lg flex items-center gap-3 shadow-md break-inside-avoid">
          <span className="text-xs uppercase tracking-wider font-medium text-gray-300">Total Resource FTE</span>
          <span className="text-xl font-bold">{totalFTE.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export const Commercials: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => {
  const grandTotal = proposal.costing.reduce(
    (acc, section) => acc + section.items.reduce((sAcc, item) => sAcc + item.quantity * item.rate, 0),
    0
  );

  return (
    <div className="mb-12 pt-4 border-t-4 border-gray-100 border-dotted break-before-page print:border-0">
      <SectionHeading title="Commercials" number={index} />
      <div className="space-y-6">
        {proposal.costing.map((section) => (
          <React.Fragment key={section.id}>
            {hasBreakBefore(proposal, 'costing-category', section.id) && <PageBreakMarker />}
            <div className="break-inside-avoid">
              <h3 className="font-bold text-base text-gray-800 mb-2">{section.title}</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-500 uppercase text-[10px]">
                  <tr>
                    <th className="py-1.5 px-3 text-left rounded-l-md">Item</th>
                    <th className="py-1.5 px-3 text-right">Qty</th>
                    <th className="py-1.5 px-3 text-right">Rate</th>
                    <th className="py-1.5 px-3 text-right rounded-r-md">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <React.Fragment key={item.id}>
                      {hasBreakBefore(proposal, 'costing-item', item.id) && (
                        <tr className="page-break-row">
                          <td colSpan={4} className="p-0">
                            <PageBreakMarker />
                          </td>
                        </tr>
                      )}
                      <tr className="break-inside-avoid print:break-inside-avoid">
                        <td className="py-2 px-3 text-gray-700 text-xs">{item.description}</td>
                        <td className="py-2 px-3 text-right text-gray-500 text-xs">{item.quantity}</td>
                        <td className="py-2 px-3 text-right text-gray-500 text-xs font-mono">{item.rate.toLocaleString('en-IN')}</td>
                        <td className="py-2 px-3 text-right text-gray-900 font-bold text-xs font-mono">{(item.quantity * item.rate).toLocaleString('en-IN')}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 border-t-2 border-gray-900 pt-3 flex justify-end break-inside-avoid">
        <div className="text-right">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-0.5">Total Investment</p>
          <div className="text-3xl font-extrabold text-blue-600 flex items-center justify-end gap-1">
            <IndianRupee size={28} />
            {grandTotal.toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] text-gray-400 mt-1">* Exclusive of applicable taxes</p>
        </div>
      </div>
    </div>
  );
};

export const RateCard: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => (
  <div className="mb-12 pt-4 border-t-4 border-gray-100 border-dotted break-before-page print:border-0">
    <SectionHeading title="Rate Card" number={index} />
    <div className="space-y-8">
      {proposal.rateCard && proposal.rateCard.map((section) => (
        <React.Fragment key={section.id}>
          {hasBreakBefore(proposal, 'ratecard-category', section.id) && <PageBreakMarker />}
          <div className="print:mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2 break-after-avoid">{section.name}</h3>
            <div 
              className="prose prose-sm max-w-none text-gray-600 mb-4"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
            
            <div className="break-inside-avoid">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-500 uppercase text-[10px]">
                  <tr>
                    <th className="py-1.5 px-3 text-left rounded-l-md w-1/3">Deliverable</th>
                    <th className="py-1.5 px-3 text-left w-1/3">Comment</th>
                    <th className="py-1.5 px-3 text-right">Qty</th>
                    <th className="py-1.5 px-3 text-right rounded-r-md">Unit Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {section.items.map((item) => (
                    <React.Fragment key={item.id}>
                      {hasBreakBefore(proposal, 'ratecard-item', item.id) && (
                        <tr className="page-break-row">
                          <td colSpan={4} className="p-0">
                            <PageBreakMarker />
                          </td>
                        </tr>
                      )}
                      <tr className="break-inside-avoid print:break-inside-avoid">
                        <td className="py-2 px-3 text-gray-800 font-medium text-xs">{item.description}</td>
                        <td className="py-2 px-3 text-gray-500 text-xs italic">{item.comment}</td>
                        <td className="py-2 px-3 text-right text-gray-700 text-xs">{item.quantity}</td>
                        <td className="py-2 px-3 text-right text-gray-700 font-mono text-xs">{item.unitCost.toLocaleString('en-IN')}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const Terms: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => (
  <div className="mb-12 pt-4 border-t-4 border-gray-100 border-dotted break-before-page print:border-0">
    <div className="break-inside-avoid">
      <SectionHeading title="Terms & Conditions" number={index} />
      <div 
        className="prose prose-sm max-w-none text-gray-600 font-mono bg-gray-50 p-6 rounded-lg"
        dangerouslySetInnerHTML={{ __html: proposal.terms }}
      />
    </div>
  </div>
);

export const SignOffSection: React.FC<{ proposal: Proposal; index: number }> = ({ proposal, index }) => (
  <div className="mb-12 pt-4 border-t-4 border-gray-100 border-dotted break-before-page print:border-0">
    <div className="break-inside-avoid">
      <SectionHeading title="Sign Off" number={index} />
      <div className="bg-white border-2 border-gray-900 p-8 rounded-xl">
        <p className="text-gray-600 italic mb-8 text-center text-sm">
          "{proposal.signOff.disclaimer}"
        </p>
        
        {proposal.signOff.showSignatures && (
          <div className="flex justify-between items-end mt-20 pt-8 border-t border-gray-200">
            <div className="text-center w-1/3">
              <div className="border-b border-gray-400 mb-2 h-8"></div>
              <p className="font-bold text-gray-900 uppercase text-xs tracking-widest">For {proposal.meta.clientName}</p>
            </div>
            <div className="text-center w-1/3">
               <div className="border-b border-gray-400 mb-2 h-8"></div>
              <p className="font-bold text-gray-900 uppercase text-xs tracking-widest">For Agency</p>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center gap-8 text-sm text-gray-500">
          {proposal.signOff.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} />
              {proposal.signOff.website}
            </div>
          )}
          {proposal.signOff.socials && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {proposal.signOff.socials}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
