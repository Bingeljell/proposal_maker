import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Proposal } from '../types';
import { CoverPage, VersionHistory, ExecutiveSummary, ScopeOfWork, Requirements, OutOfScope, Team, Commercials, RateCard, Terms, SignOffSection } from '../components/preview/ProposalSections';
import { Loader2, FileText, AlertCircle } from 'lucide-react';
import { predefinedThemes } from '../data/themes';

export const PublicView = () => {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('proposals')
          .select('data')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setProposal(data.data);
        } else {
          setError('Proposal not found');
        }
      } catch (err: any) {
        console.error('Error fetching proposal:', err);
        setError(err.message || 'Failed to load proposal');
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading your proposal...</p>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
            <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Oops!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">{error || 'This proposal is no longer available or the link is incorrect.'}</p>
        <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all hover:bg-blue-700">
            Back to Home
        </a>
      </div>
    );
  }

  const theme = proposal.meta.theme || predefinedThemes[0];
  const visibility = proposal.sectionVisibility || {};

  const contentSections = [
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

  const visibleSections = contentSections.filter(section => visibility[section.id as keyof typeof visibility] !== false);

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen proposal-preview-theme font-sans">
      <style>{`
        .proposal-preview-theme {
          --color-primary: ${theme.primaryColor};
          --color-primary-light: ${theme.primaryColor}15;
          --font-heading: ${theme.headingFont};
          --font-body: ${theme.bodyFont};
        }
        .proposal-preview-theme, .proposal-preview-theme .prose { font-family: var(--font-body) !important; }
        .proposal-preview-theme h1, .proposal-preview-theme h2, .proposal-preview-theme h3, .proposal-preview-theme h4, .proposal-preview-theme th { font-family: var(--font-heading) !important; }
        .proposal-preview-theme .text-blue-600 { color: var(--color-primary) !important; }
        .proposal-preview-theme .text-blue-700 { color: var(--color-primary) !important; }
        .proposal-preview-theme .bg-blue-500 { background-color: var(--color-primary) !important; }
        .proposal-preview-theme .bg-blue-50 { background-color: var(--color-primary-light) !important; }
        .proposal-preview-theme .border-blue-500 { border-color: var(--color-primary) !important; }
        .proposal-preview-theme .border-blue-100 { border-color: var(--color-primary-light) !important; }
        .proposal-preview-theme h2 { color: var(--color-primary) !important; }
        .proposal-preview-theme .border-gray-900 { border-color: var(--color-primary) !important; }
        .proposal-preview-theme .text-gray-900.font-extrabold { color: var(--color-primary) !important; }
      `}</style>

      {/* Floating Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
              <FileText size={14} />
            </div>
            <span className="font-bold text-sm tracking-tight hidden sm:block">The Decent Proposal</span>
          </div>
          <div className="text-xs font-medium text-gray-500 truncate max-w-[200px]">
            {proposal.meta.title}
          </div>
          <div>
            <button 
                onClick={() => window.print()}
                className="text-xs font-bold bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-4 py-1.5 rounded-full hover:opacity-90 transition-all"
            >
                Download PDF
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4">
        {/* Cover Page */}
        {(visibility['intro' as keyof typeof visibility] !== false) && (
            <div className="mb-8 print:mb-0">
            <CoverPage proposal={proposal} />
            </div>
        )}

        {/* Content Pages */}
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
    </div>
  );
};
