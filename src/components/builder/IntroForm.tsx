import React, { useRef, useState, useEffect } from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Upload, X, Calendar, Clock, AlertCircle, Layout, Palette } from 'lucide-react';
import { CoverDesigner } from '../ui/CoverDesigner';
import { currencyList } from '../../data/currencies';

export const IntroForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasExpiration, setHasExpiration] = useState(!!proposal.meta.expiresAt);
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [showCoverDesigner, setShowCoverDesigner] = useState(false);

  // Calculate expiration date based on days from proposal date
  const calculateExpirationDate = (days: number): string => {
    const baseDate = new Date(proposal.meta.date);
    const expirationDate = new Date(baseDate);
    expirationDate.setDate(baseDate.getDate() + days);
    return expirationDate.toISOString().split('T')[0];
  };

  // Calculate days between proposal date and expiration date
  const calculateDaysFromDate = (expiresAt: string): number => {
    const baseDate = new Date(proposal.meta.date);
    const expDate = new Date(expiresAt);
    const diffTime = expDate.getTime() - baseDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Initialize validityDays from expiresAt if present
  useEffect(() => {
    if (proposal.meta.expiresAt && !proposal.meta.validityDays) {
      const days = calculateDaysFromDate(proposal.meta.expiresAt);
      updateSection('meta', { ...proposal.meta, validityDays: days });
    }
  }, []);

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

  const removeLogo = () => {
    updateSection('meta', { ...proposal.meta, logo: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExpirationToggle = (enabled: boolean) => {
    setHasExpiration(enabled);
    if (!enabled) {
      updateSection('meta', { 
        ...proposal.meta, 
        expiresAt: undefined,
        validityDays: undefined 
      });
    } else {
      // Default to 14 days
      const days = proposal.meta.validityDays || 14;
      const expiresAt = calculateExpirationDate(days);
      updateSection('meta', { 
        ...proposal.meta, 
        validityDays: days,
        expiresAt 
      });
    }
  };

  const handleValidityDaysChange = (days: number) => {
    if (days < 1) return;
    const expiresAt = calculateExpirationDate(days);
    updateSection('meta', { 
      ...proposal.meta, 
      validityDays: days,
      expiresAt 
    });
  };

  const handleCustomDateChange = (date: string) => {
    if (date) {
      const days = calculateDaysFromDate(date);
      updateSection('meta', { 
        ...proposal.meta, 
        expiresAt: date,
        validityDays: days 
      });
    }
  };

  // Check if proposal is expired
  const isExpired = proposal.meta.expiresAt 
    ? new Date(proposal.meta.expiresAt) < new Date(new Date().toISOString().split('T')[0])
    : false;

  // Format date for display
  const formatDisplayDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      dateStyle: 'long' 
    });
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Currency
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">(for all price displays)</span>
            </label>
            <select
              name="currency"
              value={proposal.meta.currency || 'INR'}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            >
              {currencyList.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Expiration Date Section */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Validity Period</h3>
        
        <div className="space-y-4">
          {/* Enable Expiration Toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasExpiration}
              onChange={(e) => handleExpirationToggle(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Set proposal expiration date
            </span>
          </label>

          {hasExpiration && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
              {/* Toggle between days input or custom date */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!useCustomDate}
                    onChange={() => {
                      setUseCustomDate(false);
                      if (proposal.meta.validityDays) {
                        handleValidityDaysChange(proposal.meta.validityDays);
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Days from now</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={useCustomDate}
                    onChange={() => setUseCustomDate(true)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Custom date</span>
                </label>
              </div>

              {!useCustomDate ? (
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Valid for (days)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={proposal.meta.validityDays || 14}
                        onChange={(e) => handleValidityDaysChange(parseInt(e.target.value) || 1)}
                        className="block w-full pl-10 pr-3 py-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                        placeholder="14"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Expires on
                    </label>
                    <div className="text-sm text-gray-900 dark:text-gray-100 font-medium py-2">
                      {proposal.meta.expiresAt 
                        ? formatDisplayDate(proposal.meta.expiresAt)
                        : '-'
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Custom expiration date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="date"
                      value={proposal.meta.expiresAt || ''}
                      min={proposal.meta.date}
                      onChange={(e) => handleCustomDateChange(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                    />
                  </div>
                </div>
              )}

              {/* Expiration Status */}
              {proposal.meta.expiresAt && (
                <div className={`flex items-center gap-2 text-sm ${
                  isExpired 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {isExpired ? (
                    <>
                      <AlertCircle size={16} />
                      <span>This proposal has expired</span>
                    </>
                  ) : (
                    <>
                      <Clock size={16} />
                      <span>
                        Valid for {proposal.meta.validityDays || calculateDaysFromDate(proposal.meta.expiresAt)} days
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cover Page Designer Section */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Cover Page Design</h3>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
              <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                Current Layout: <span className="text-blue-600 dark:text-blue-400 capitalize">{proposal.meta.coverStyle?.layout?.replace('-', ' ') || 'Centered'}</span>
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Customize the visual appearance of your proposal cover page with different layouts, colors, and patterns.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  Accent: 
                  <span 
                    className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600 inline-block"
                    style={{ backgroundColor: proposal.meta.coverStyle?.accentColor || '#2563eb' }}
                  />
                </span>
                <span className="mx-1">•</span>
                <span>Pattern: {proposal.meta.coverStyle?.backgroundPattern || 'None'}</span>
                <span className="mx-1">•</span>
                <span>Size: {proposal.meta.coverStyle?.fontSize || 'Normal'}</span>
              </div>
              <button
                onClick={() => setShowCoverDesigner(true)}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
              >
                <Layout className="w-4 h-4" />
                Design Cover Page
              </button>
            </div>
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

      {/* Cover Designer Modal */}
      <CoverDesigner
        isOpen={showCoverDesigner}
        onClose={() => setShowCoverDesigner(false)}
        proposal={proposal}
        onUpdate={(coverStyle) => updateSection('meta', { ...proposal.meta, coverStyle })}
      />
    </div>
  );
};
