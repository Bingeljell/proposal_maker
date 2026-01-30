import React, { useRef } from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Upload, X, Layout, Image as ImageIcon } from 'lucide-react';
import { ThemeSelector } from '../ui/ThemeSelector';
import { ThemeConfig } from '../../types';
import { predefinedThemes } from '../../data/themes';

export const IntroForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateSection('meta', { ...proposal.meta, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateSection('meta', { ...proposal.meta, logo: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateSection('meta', { ...proposal.meta, coverImage: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateSection('meta', { ...proposal.meta, logo: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeCoverImage = () => {
    updateSection('meta', { ...proposal.meta, coverImage: null });
    if (coverImageInputRef.current) coverImageInputRef.current.value = '';
  };

  const handleThemeChange = (theme: ThemeConfig) => {
    updateSection('meta', { ...proposal.meta, theme });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Project Details</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Proposal File Name
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">(used when saving)</span>
            </label>
            <input
              type="text"
              name="proposalName"
              value={proposal.meta.proposalName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="e.g. Acme_Q1_Social_Campaign_v2"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Leave empty to use the Proposal Title as filename
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Proposal Title</label>
            <input
              type="text"
              name="title"
              value={proposal.meta.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="e.g. Digital Marketing Strategy 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={proposal.meta.clientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input
              type="date"
              name="date"
              value={proposal.meta.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Agency Logo</h3>
        <div className="flex items-start gap-6">
          {proposal.meta.logo ? (
            <div className="relative group">
              <img 
                src={proposal.meta.logo} 
                alt="Logo" 
                className="h-24 w-auto object-contain border border-gray-200 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700" 
              />
              <button
                onClick={removeLogo}
                className="absolute -top-2 -right-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 rounded-full p-1 hover:bg-red-200 dark:hover:bg-red-900/70 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="h-24 w-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <span className="text-xs">No Logo</span>
            </div>
          )}
          
          <div className="flex-1">
            <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
              <Upload size={16} />
              Upload New Logo
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </label>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG or SVG. Ideally with a transparent background.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Cover Page Design</h3>
        
        <div className="space-y-6">
            {/* Layout Selector */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Layout Style</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['simple', 'split', 'full', 'minimal'].map((layout) => (
                        <button
                            key={layout}
                            onClick={() => updateSection('meta', { ...proposal.meta, coverLayout: layout as any })}
                            className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                                proposal.meta.coverLayout === layout
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                            }`}
                        >
                            <Layout size={24} className={proposal.meta.coverLayout === layout ? 'text-blue-500' : 'text-gray-400'} />
                            <span className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">{layout}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Cover Image Upload */}
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Background Image 
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">(Optional)</span>
                </label>
                <div className="flex items-start gap-6">
                    {proposal.meta.coverImage ? (
                        <div className="relative group w-32 h-20">
                        <img 
                            src={proposal.meta.coverImage} 
                            alt="Cover Background" 
                            className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-600" 
                        />
                        <button
                            onClick={removeCoverImage}
                            className="absolute -top-2 -right-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 rounded-full p-1 hover:bg-red-200 dark:hover:bg-red-900/70 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        >
                            <X size={14} />
                        </button>
                        </div>
                    ) : (
                        <div className="w-32 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
                        <span className="text-xs">No Image</span>
                        </div>
                    )}
                    
                    <div className="flex-1">
                        <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                        <ImageIcon size={16} />
                        Upload Image
                        <input
                            ref={coverImageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverImageUpload}
                        />
                        </label>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        High-resolution JPG or PNG. Used for "Split" and "Full" layouts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <ThemeSelector 
          currentTheme={proposal.meta.theme || predefinedThemes[0]} 
          onThemeChange={handleThemeChange} 
        />
      </div>
    </div>
  );
};
