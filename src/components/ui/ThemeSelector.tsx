import React, { useState, useRef, useEffect } from 'react';
import { ThemePreset, ThemeSettings } from '../../types';
import { themes } from '../../data/themes';
import { Palette, Check, ChevronDown } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemePreset;
  onThemeChange: (theme: ThemePreset) => void;
}

interface ThemePreviewProps {
  settings: ThemeSettings;
  isSelected: boolean;
}

// Mini preview of a theme
const ThemePreview: React.FC<ThemePreviewProps> = ({ settings, isSelected }) => {
  const { colors, borderRadius } = settings;
  
  return (
    <div 
      className={`relative w-full h-16 rounded-lg overflow-hidden border-2 transition-all ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
      }`}
      style={{ borderRadius: borderRadius.medium }}
    >
      {/* Preview Header */}
      <div 
        className="h-5 w-full"
        style={{ backgroundColor: colors.primary }}
      />
      {/* Preview Content */}
      <div 
        className="h-11 p-2 flex items-center gap-2"
        style={{ backgroundColor: colors.background }}
      >
        {/* Mock text lines */}
        <div 
          className="w-8 h-3 rounded"
          style={{ backgroundColor: colors.backgroundAlt }}
        />
        <div className="flex-1 space-y-1">
          <div 
            className="w-full h-2 rounded"
            style={{ backgroundColor: colors.textMuted }}
          />
          <div 
            className="w-2/3 h-2 rounded"
            style={{ backgroundColor: colors.border }}
          />
        </div>
        {/* Mock accent */}
        <div 
          className="w-6 h-6 rounded"
          style={{ backgroundColor: colors.accent }}
        />
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
          <Check size={10} className="text-white" />
        </div>
      )}
    </div>
  );
};

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const themeList = Object.values(themes);
  const currentSettings = themes[currentTheme];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleThemeSelect = (themeId: ThemePreset) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md transition-colors"
        title="Select theme preset"
      >
        <Palette size={14} />
        <span className="hidden sm:inline">{currentSettings.name}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Theme Presets
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {currentSettings.name}
            </span>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Choose a visual style for your proposal preview
          </p>

          <div className="space-y-3">
            {themeList.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className="w-full text-left group"
              >
                <ThemePreview 
                  settings={theme} 
                  isSelected={currentTheme === theme.id} 
                />
                <div className="mt-1.5 flex items-center justify-between">
                  <div>
                    <span className={`text-xs font-semibold ${
                      currentTheme === theme.id 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                    }`}>
                      {theme.name}
                    </span>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {theme.description}
                    </p>
                  </div>
                  {currentTheme === theme.id && (
                    <Check size={14} className="text-blue-500 flex-shrink-0 ml-2" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: currentSettings.colors.primary }}
              />
              <span>Primary: {currentSettings.colors.primary}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 mt-1">
              <div 
                className="w-3 h-3 rounded border border-gray-200 dark:border-gray-600"
                style={{ backgroundColor: currentSettings.colors.background }}
              />
              <span>Font: {currentSettings.fonts.heading.split(',')[0]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
