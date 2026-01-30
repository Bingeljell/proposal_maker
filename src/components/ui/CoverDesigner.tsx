import React, { useState } from 'react';
import { X, Layout, Palette, Type, Check, Grid3X3, Minus, Circle, Layers } from 'lucide-react';
import { CoverLayout, CoverStyle, Proposal } from '../../types';

interface CoverDesignerProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal;
  onUpdate: (coverStyle: CoverStyle) => void;
}

interface LayoutOption {
  id: CoverLayout;
  name: string;
  description: string;
  icon: React.ElementType;
}

const layoutOptions: LayoutOption[] = [
  {
    id: 'centered',
    name: 'Centered',
    description: 'Classic centered layout with logo at top, title prominent, date at bottom',
    icon: Circle,
  },
  {
    id: 'left-aligned',
    name: 'Left Aligned',
    description: 'Professional left-aligned, good for corporate proposals',
    icon: Minus,
  },
  {
    id: 'split',
    name: 'Split',
    description: 'Modern split-screen with left side accent color and logo',
    icon: Grid3X3,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Text-only ultra clean, focuses on typography',
    icon: Layers,
  },
];

const backgroundPatterns = [
  { id: 'none', name: 'None', description: 'Clean white background' },
  { id: 'dots', name: 'Dots', description: 'Subtle dot pattern' },
  { id: 'lines', name: 'Lines', description: 'Diagonal line pattern' },
  { id: 'gradient', name: 'Gradient', description: 'Soft gradient overlay' },
] as const;

const fontSizes = [
  { id: 'compact', name: 'Compact', description: 'Smaller text, more whitespace' },
  { id: 'normal', name: 'Normal', description: 'Standard text sizing' },
  { id: 'large', name: 'Large', description: 'Bolder, larger typography' },
] as const;

const accentColors = [
  '#2563eb', // Blue (default)
  '#dc2626', // Red
  '#16a34a', // Green
  '#9333ea', // Purple
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#db2777', // Pink
  '#4b5563', // Gray
];

// Mini preview component for layout thumbnails
const LayoutThumbnail: React.FC<{ 
  layout: CoverLayout; 
  isSelected: boolean;
  accentColor: string;
}> = ({ layout, isSelected, accentColor }) => {
  const baseClasses = "w-full h-20 rounded-lg border-2 transition-all overflow-hidden relative";
  const selectedClasses = isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300';

  return (
    <div className={`${baseClasses} ${selectedClasses}`}>
      {layout === 'centered' && (
        <div className="h-full flex flex-col items-center justify-center gap-2 p-2">
          <div className="w-6 h-4 rounded-sm opacity-30" style={{ backgroundColor: accentColor }} />
          <div className="w-16 h-2 rounded-full bg-gray-200" />
          <div className="w-10 h-1.5 rounded-full bg-gray-100" />
        </div>
      )}
      {layout === 'left-aligned' && (
        <div className="h-full flex flex-col justify-center gap-1.5 p-3">
          <div className="w-5 h-3 rounded-sm opacity-30" style={{ backgroundColor: accentColor }} />
          <div className="w-14 h-2 rounded-full bg-gray-200" />
          <div className="w-8 h-1.5 rounded-full bg-gray-100" />
        </div>
      )}
      {layout === 'split' && (
        <div className="h-full flex">
          <div className="w-1/3 h-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            <div className="w-4 h-4 bg-white/20 rounded-sm" />
          </div>
          <div className="w-2/3 h-full flex flex-col justify-center gap-1 p-2">
            <div className="w-10 h-1.5 rounded-full bg-gray-200" />
            <div className="w-6 h-1 rounded-full bg-gray-100" />
          </div>
        </div>
      )}
      {layout === 'minimal' && (
        <div className="h-full flex flex-col items-center justify-center gap-1 p-2">
          <div className="w-14 h-1.5 rounded-full bg-gray-200" />
          <div className="flex items-center gap-1">
            <div className="w-4 h-px bg-gray-200" />
            <div className="w-1 h-1 rounded-full opacity-50" style={{ backgroundColor: accentColor }} />
            <div className="w-4 h-px bg-gray-200" />
          </div>
          <div className="w-8 h-1 rounded-full bg-gray-100" />
        </div>
      )}
    </div>
  );
};

export const CoverDesigner: React.FC<CoverDesignerProps> = ({
  isOpen,
  onClose,
  proposal,
  onUpdate,
}) => {
  const coverStyle = proposal.meta.coverStyle || {
    layout: 'centered',
    showDecorativeElements: true,
    backgroundPattern: 'none',
    accentColor: '#2563eb',
    fontSize: 'normal',
  };

  const [localStyle, setLocalStyle] = useState<CoverStyle>(coverStyle);

  if (!isOpen) return null;

  const handleLayoutChange = (layout: CoverLayout) => {
    setLocalStyle({ ...localStyle, layout });
  };

  const handleToggleDecorative = () => {
    setLocalStyle({ ...localStyle, showDecorativeElements: !localStyle.showDecorativeElements });
  };

  const handlePatternChange = (pattern: CoverStyle['backgroundPattern']) => {
    setLocalStyle({ ...localStyle, backgroundPattern: pattern });
  };

  const handleFontSizeChange = (size: CoverStyle['fontSize']) => {
    setLocalStyle({ ...localStyle, fontSize: size });
  };

  const handleColorChange = (color: string) => {
    setLocalStyle({ ...localStyle, accentColor: color });
  };

  const handleApply = () => {
    onUpdate(localStyle);
    onClose();
  };

  // Preview background pattern styles
  const getPreviewPattern = () => {
    switch (localStyle.backgroundPattern) {
      case 'dots':
        return {
          backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        };
      case 'lines':
        return {
          backgroundImage: `repeating-linear-gradient(45deg, #f3f4f6 0, #f3f4f6 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px',
        };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%)`,
        };
      default:
        return {};
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Layout className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Cover Page Designer</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Customize how your proposal cover page looks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Controls */}
            <div className="w-full lg:w-1/2 p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
              {/* Layout Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layout className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Layout</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {layoutOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleLayoutChange(option.id)}
                      className="text-left group"
                    >
                      <LayoutThumbnail 
                        layout={option.id} 
                        isSelected={localStyle.layout === option.id}
                        accentColor={localStyle.accentColor || '#2563eb'}
                      />
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${
                            localStyle.layout === option.id 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {option.name}
                          </span>
                          {localStyle.layout === option.id && (
                            <Check className="w-3 h-3 text-blue-500" />
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative Elements Toggle */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Decorative Elements</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={localStyle.showDecorativeElements}
                    onChange={handleToggleDecorative}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </label>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 ml-6">
                  Show borders, corners, and accent decorations
                </p>
              </div>

              {/* Background Pattern */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Grid3X3 className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Background Pattern</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {backgroundPatterns.map((pattern) => (
                    <button
                      key={pattern.id}
                      onClick={() => handlePatternChange(pattern.id)}
                      className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                        localStyle.backgroundPattern === pattern.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {pattern.name}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {backgroundPatterns.find(p => p.id === localStyle.backgroundPattern)?.description}
                </p>
              </div>

              {/* Font Size */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Type className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Font Size</h3>
                </div>
                <div className="flex gap-2">
                  {fontSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleFontSizeChange(size.id)}
                      className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                        localStyle.fontSize === size.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Accent Color</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        localStyle.accentColor === color
                          ? 'border-gray-900 dark:border-white scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Custom:</span>
                  <input
                    type="color"
                    value={localStyle.accentColor || '#2563eb'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={localStyle.accentColor || '#2563eb'}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="#2563eb"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Live Preview */}
            <div className="w-full lg:w-1/2 p-6 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Live Preview</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">A4 Size</span>
              </div>
              
              {/* Preview Container - A4 aspect ratio */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ aspectRatio: '210/297' }}>
                <div className="w-full h-full relative" style={getPreviewPattern()}>
                  {/* Simplified preview based on layout */}
                  {localStyle.layout === 'centered' && (
                    <div className="h-full flex flex-col justify-between p-8 text-center">
                      <div className="pt-8">
                        <div className="w-16 h-10 mx-auto rounded mb-4" style={{ backgroundColor: `${localStyle.accentColor}30` }} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-xl font-bold text-gray-900 mb-2">{proposal.meta.title}</h1>
                        <div className="w-12 h-1 mx-auto mb-2" style={{ backgroundColor: localStyle.accentColor }} />
                        <p className="text-xs text-gray-500">for {proposal.meta.clientName}</p>
                      </div>
                      <div className="pb-8">
                        <p className="text-xs text-gray-400">
                          {new Date(proposal.meta.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {localStyle.layout === 'left-aligned' && (
                    <div className="h-full flex flex-col p-8">
                      <div className="mb-auto">
                        <div className="w-12 h-8 rounded mb-4" style={{ backgroundColor: `${localStyle.accentColor}30` }} />
                      </div>
                      <div className="my-auto">
                        <p className="text-xs text-gray-400 mb-2">Proposal for</p>
                        <h1 className="text-xl font-bold text-gray-900 mb-2">{proposal.meta.title}</h1>
                        <div className="w-8 h-1 mb-2" style={{ backgroundColor: localStyle.accentColor }} />
                        <p className="text-sm text-gray-600">{proposal.meta.clientName}</p>
                      </div>
                      <div className="mt-auto pt-4">
                        <p className="text-xs text-gray-400">
                          {new Date(proposal.meta.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {localStyle.layout === 'split' && (
                    <div className="h-full flex">
                      <div className="w-2/5 flex items-center justify-center p-4" style={{ backgroundColor: localStyle.accentColor }}>
                        <div className="w-12 h-12 bg-white/20 rounded" />
                      </div>
                      <div className="w-3/5 flex flex-col justify-center p-6">
                        <p className="text-xs text-gray-400 mb-2 uppercase">Project Proposal</p>
                        <h1 className="text-lg font-bold text-gray-900 mb-2">{proposal.meta.title}</h1>
                        <div className="w-8 h-1 mb-3" style={{ backgroundColor: localStyle.accentColor }} />
                        <p className="text-xs text-gray-500">{proposal.meta.clientName}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(proposal.meta.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {localStyle.layout === 'minimal' && (
                    <div className="h-full flex flex-col justify-center p-8 text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Proposal</p>
                      <h1 className="text-lg font-light text-gray-900 mb-4">{proposal.meta.title}</h1>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-6 h-px bg-gray-200" />
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: localStyle.accentColor }} />
                        <div className="w-6 h-px bg-gray-200" />
                      </div>
                      <p className="text-sm text-gray-600 mb-1">for</p>
                      <p className="text-sm font-medium text-gray-800">{proposal.meta.clientName}</p>
                      <p className="text-xs text-gray-400 mt-4">
                        {new Date(proposal.meta.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                This is a simplified preview. The actual cover page will have all decorative elements.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <button
            onClick={() => setLocalStyle({
              layout: 'centered',
              showDecorativeElements: true,
              backgroundPattern: 'none',
              accentColor: '#2563eb',
              fontSize: 'normal',
            })}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Reset to Default
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              <Check className="w-4 h-4" />
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverDesigner;
