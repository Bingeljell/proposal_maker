import React, { useRef } from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Upload, X } from 'lucide-react';

export const IntroForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeLogo = () => {
    updateSection('meta', { ...proposal.meta, logo: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Details</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Proposal Title</label>
            <input
              type="text"
              name="title"
              value={proposal.meta.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="e.g. Digital Marketing Strategy 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={proposal.meta.clientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={proposal.meta.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Agency Logo</h3>
        <div className="flex items-start gap-6">
          {proposal.meta.logo ? (
            <div className="relative group">
              <img 
                src={proposal.meta.logo} 
                alt="Logo" 
                className="h-24 w-auto object-contain border border-gray-200 rounded-lg p-2 bg-white" 
              />
              <button
                onClick={removeLogo}
                className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-gray-50">
              <span className="text-xs">No Logo</span>
            </div>
          )}
          
          <div className="flex-1">
            <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
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
            <p className="mt-2 text-xs text-gray-500">
              PNG, JPG or SVG. Ideally with a transparent background.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
