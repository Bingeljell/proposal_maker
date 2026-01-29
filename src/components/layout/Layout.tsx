import React, { useState, useEffect } from 'react';
import { useProposal } from '../../hooks/useProposal';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Sidebar } from './Sidebar';
import { SectionId } from '../../types';
import { Preview } from '../preview/Preview'; // Import the new Preview component
import { Download, Upload, Trash2, Eye, EyeOff, Edit3, Printer, Moon, Sun } from 'lucide-react';

interface LayoutProps {
  children: (activeSection: SectionId) => React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { proposal, saveToFile, loadFromFile, resetProposal } = useProposal();
  const { isDarkMode, toggle } = useDarkMode();
  const [activeSection, setActiveSection] = useState<SectionId>('intro');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  // Update document title for PDF printing (browser uses this as default filename)
  useEffect(() => {
    const fileName = proposal.meta.proposalName.trim() || proposal.meta.title;
    document.title = fileName ? `${fileName} - Proposal` : 'Proposal Builder';
  }, [proposal.meta.proposalName, proposal.meta.title]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden print:h-auto print:overflow-visible print:block">
      {/* Sidebar - only show in edit mode */}
      <div className={`print:hidden h-full flex flex-col ${viewMode === 'edit' ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Hidden in Print */}
        <header className="print:hidden h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0 z-10 relative">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Proposal Builder</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate max-w-[250px]" title={proposal.meta.proposalName || proposal.meta.title}>
                {proposal.meta.clientName} / {proposal.meta.proposalName || proposal.meta.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-2"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mr-4">
              <button 
                onClick={() => setViewMode('edit')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  viewMode === 'edit' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Edit3 size={14} />
                Build
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  viewMode === 'preview' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Eye size={14} />
                Preview
              </button>
            </div>

            {viewMode === 'preview' && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-md text-xs font-semibold hover:bg-black transition-colors mr-4"
              >
                <Printer size={14} />
                Print PDF
              </button>
            )}

            <div className="flex gap-2 border-l pl-4 border-gray-200 dark:border-gray-600">
              <button 
                onClick={resetProposal}
                className="flex items-center gap-2 px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md text-xs font-semibold transition-colors mr-2"
              >
                <Trash2 size={14} />
                New Proposal
              </button>
              
              <label className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors">
                <Upload size={14} />
                Import
                <input 
                  type="file" 
                  accept=".json" 
                  className="hidden" 
                  onChange={(e) => e.target.files?.[0] && loadFromFile(e.target.files[0])}
                />
              </label>
              <button 
                onClick={saveToFile}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold transition-colors"
              >
                <Download size={14} />
                Export JSON
              </button>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto print:overflow-visible p-8 print:p-0 bg-gray-100 dark:bg-gray-900 print:bg-white">
          <div className="max-w-4xl mx-auto print:max-w-none print:w-full">
            {viewMode === 'edit' ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 min-h-[500px] p-8 relative overflow-hidden">
                {proposal.sectionVisibility && !proposal.sectionVisibility[activeSection] && (
                  <div className="absolute top-0 right-0 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-1 rounded-bl-lg text-xs font-bold uppercase tracking-wider border-l border-b border-red-200 dark:border-red-800 shadow-sm z-10 flex items-center gap-2">
                    <EyeOff size={14} />
                    Hidden from proposal
                  </div>
                )}
                {children(activeSection)}
              </div>
            ) : (
              <Preview />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};