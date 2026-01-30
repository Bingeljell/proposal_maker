import React from 'react';
import { Proposal, CoverStyle } from '../../../types';

interface LeftAlignedLayoutProps {
  proposal: Proposal;
  coverStyle: CoverStyle;
  backgroundPattern: React.ReactNode;
  accentColor: string;
  fontSizeClass: string;
}

export const LeftAlignedLayout: React.FC<LeftAlignedLayoutProps> = ({
  proposal,
  coverStyle,
  backgroundPattern,
  accentColor,
  fontSizeClass,
}) => {
  const { meta } = proposal;
  const titleSize = fontSizeClass === 'compact' ? 'text-4xl' : fontSizeClass === 'large' ? 'text-6xl' : 'text-5xl';
  const subtitleSize = fontSizeClass === 'compact' ? 'text-lg' : fontSizeClass === 'large' ? 'text-2xl' : 'text-xl';
  const dateSize = fontSizeClass === 'compact' ? 'text-sm' : fontSizeClass === 'large' ? 'text-lg' : 'text-base';

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Background Pattern */}
      {backgroundPattern}

      {/* Left accent bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{ backgroundColor: accentColor }}
      />

      {/* Decorative Elements */}
      {coverStyle.showDecorativeElements && (
        <>
          <div 
            className="absolute top-12 right-12 w-32 h-32 rounded-full opacity-5"
            style={{ backgroundColor: accentColor }}
          />
          <div 
            className="absolute bottom-24 right-24 w-24 h-24 rounded-full opacity-5"
            style={{ backgroundColor: accentColor }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="flex-1 flex flex-col pl-16 pr-12 py-16 relative z-10">
        {/* Top Section - Logo */}
        <div className="mb-auto">
          {meta.logo ? (
            <img 
              src={meta.logo} 
              alt="Agency Logo" 
              className="h-20 object-contain" 
            />
          ) : (
            <div 
              className="h-20 flex items-center font-bold text-lg uppercase tracking-widest opacity-30"
              style={{ color: accentColor }}
            >
              Agency Logo
            </div>
          )}
        </div>

        {/* Middle Section - Title & Client */}
        <div className="my-auto">
          <p 
            className={`${subtitleSize} text-gray-400 uppercase tracking-wider font-medium mb-4`}
          >
            Proposal for
          </p>
          <h1 
            className={`${titleSize} font-bold text-gray-900 mb-4 leading-tight max-w-3xl`}
          >
            {meta.title}
          </h1>
          <div 
            className="w-16 h-1 mb-6"
            style={{ backgroundColor: accentColor }}
          />
          <p className={`${subtitleSize} text-gray-600 font-medium`}>
            {meta.clientName}
          </p>
        </div>

        {/* Bottom Section - Date */}
        <div className="mt-auto pt-8">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <span 
                className="text-lg font-bold"
                style={{ color: accentColor }}
              >
                {new Date(meta.date).getDate()}
              </span>
            </div>
            <div>
              <p className={`${dateSize} text-gray-900 font-semibold`}>
                {new Date(meta.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              {meta.expiresAt && (
                <p className="text-xs text-gray-400">
                  Valid until {new Date(meta.expiresAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftAlignedLayout;
