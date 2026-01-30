import React from 'react';
import { Check, Palette } from 'lucide-react';
import { ThemeConfig } from '../../types';
import { predefinedThemes } from '../../data/themes';

interface ThemeSelectorProps {
  currentTheme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Proposal Theme
        </label>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {predefinedThemes.map((theme) => {
          const isSelected = currentTheme.id === theme.id;
          
          return (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme)}
              className={`relative group flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
            >
              {/* Color Swatch */}
              <div 
                className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center text-white"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
              
              {/* Theme Name */}
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100 text-center">
                {theme.name}
              </span>

              {/* Font Preview */}
              <div className="text-[10px] text-gray-500 dark:text-gray-400 flex flex-col items-center leading-tight">
                <span style={{ fontFamily: theme.headingFont }}>Heading</span>
                <span style={{ fontFamily: theme.bodyFont }}>Body</span>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
        * Applies colors and fonts to the preview and PDF output only.
      </div>
    </div>
  );
};
