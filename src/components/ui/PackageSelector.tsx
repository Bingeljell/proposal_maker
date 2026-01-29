import React, { useState } from 'react';
import { X, Package, Check, Star, Zap, Crown, ChevronRight } from 'lucide-react';
import { PackageTemplate } from '../../types';
import { usePackages } from '../../hooks/usePackages';

interface PackageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPackage: (pkg: PackageTemplate) => void;
}

const tierIcons = {
  basic: Zap,
  standard: Star,
  premium: Crown,
  custom: Package,
};

const tierColors = {
  basic: 'bg-green-100 text-green-800 border-green-200',
  standard: 'bg-blue-100 text-blue-800 border-blue-200',
  premium: 'bg-purple-100 text-purple-800 border-purple-200',
  custom: 'bg-gray-100 text-gray-800 border-gray-200',
};

const tierLabels = {
  basic: 'Starter',
  standard: 'Growth',
  premium: 'Premium',
  custom: 'Custom',
};

export const PackageSelector: React.FC<PackageSelectorProps> = ({
  isOpen,
  onClose,
  onApplyPackage,
}) => {
  const { packages, getPackagesByTier } = usePackages();
  const [selectedTier, setSelectedTier] = useState<PackageTemplate['tier'] | 'all'>('all');
  const [previewPackage, setPreviewPackage] = useState<PackageTemplate | null>(null);

  if (!isOpen) return null;

  const filteredPackages = selectedTier === 'all' 
    ? packages 
    : getPackagesByTier(selectedTier);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleApply = () => {
    if (previewPackage) {
      onApplyPackage(previewPackage);
      setPreviewPackage(null);
      onClose();
    }
  };

  if (previewPackage) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${tierColors[previewPackage.tier].split(' ')[0]}`}>
                {React.createElement(tierIcons[previewPackage.tier], { size: 20, className: tierColors[previewPackage.tier].split(' ')[1] })}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{previewPackage.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${tierColors[previewPackage.tier]}`}>
                  {tierLabels[previewPackage.tier]}
                </span>
              </div>
            </div>
            <button
              onClick={() => setPreviewPackage(null)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <p className="text-gray-600 dark:text-gray-300">{previewPackage.description}</p>

            {/* Estimated Price */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Investment</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatPrice(previewPackage.estimatedPrice)}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> /month</span>
              </div>
            </div>

            {/* Scope Sections */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                What's Included
              </h3>
              <div className="space-y-4">
                {previewPackage.scope.map((section) => (
                  <div key={section.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{section.name}</h4>
                    <ul className="mt-2 space-y-1">
                      {section.deliverables.map((del) => (
                        <li key={del.id} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {del.quantity}× {del.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Dedicated Team</h3>
              <div className="flex flex-wrap gap-2">
                {previewPackage.team.map((member) => (
                  <span
                    key={member.id}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {member.name} ({member.allocation}%)
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              onClick={() => setPreviewPackage(null)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Back to Packages
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              Apply This Package
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Choose a Package</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Tier Filter */}
        <div className="px-4 pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTier === 'all'
                ? 'bg-gray-800 dark:bg-gray-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Packages
          </button>
          {(['basic', 'standard', 'premium'] as const).map((tier) => {
            const Icon = tierIcons[tier];
            return (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  selectedTier === tier
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon size={14} />
                {tierLabels[tier]}
              </button>
            );
          })}
        </div>

        {/* Package Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPackages.map((pkg) => {
              const Icon = tierIcons[pkg.tier];
              return (
                <div
                  key={pkg.id}
                  onClick={() => setPreviewPackage(pkg)}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${tierColors[pkg.tier].split(' ')[0]}`}>
                        <Icon size={16} className={tierColors[pkg.tier].split(' ')[1]} />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{pkg.name}</h3>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {formatPrice(pkg.estimatedPrice)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {pkg.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{pkg.scope.length} services</span>
                    <span>•</span>
                    <span>{pkg.team.length} team members</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          Click on a package to preview details before applying
        </div>
      </div>
    </div>
  );
};
