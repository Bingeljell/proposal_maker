import React from 'react';
import { Proposal, CoverStyle } from '../../../types';

interface MinimalLayoutProps {
  proposal: Proposal;
  coverStyle: CoverStyle;
  backgroundPattern: React.ReactNode;
  accentColor: string;
  fontSizeClass: string;
}

export const MinimalLayout: React.FC<MinimalLayoutProps> = ({
  proposal,
  coverStyle,
  backgroundPattern,
  accentColor,
  fontSizeClass,
}) => {
  const { meta } = proposal;
  const titleSize = fontSizeClass === 'compact' ? 'text-3xl' : fontSizeClass === 'large' ? 'text-5xl' : 'text-4xl';
  const subtitleSize = fontSizeClass === 'compact' ? 'text-base' : fontSizeClass === 'large' ? 'text-xl' : 'text-lg';
  const dateSize = fontSizeClass === 'compact' ? 'text-sm' : fontSizeClass === 'large' ? 'text-lg' : 'text-base';

  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden">
      {/* Background Pattern */}
      {backgroundPattern}

      {/* Ultra-minimal decorative elements */}
      {coverStyle.showDecorativeElements && (
        <>
          <div 
            className="absolute top-0 left-0 right-0 h-px opacity-20"
            style={{ backgroundColor: accentColor }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-px opacity-20"
            style={{ backgroundColor: accentColor }}
          />
        </>
      )}

      {/* Main Content - Centered */}
      <div className="px-16 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <p 
            className={`${subtitleSize} text-gray-400 uppercase tracking-[0.3em] font-light mb-8`}
          >
            Proposal
          </p>

          {/* Title - Main focus */}
          <h1 
            className={`${titleSize} font-light text-gray-900 mb-8 leading-snug tracking-tight`}
          >
            {meta.title}
          </h1>

          {/* Minimal divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div 
              className="w-12 h-px"
              style={{ backgroundColor: accentColor, opacity: 0.5 }}
            />
            <div 
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <div 
              className="w-12 h-px"
              style={{ backgroundColor: accentColor, opacity: 0.5 }}
            />
          </div>

          {/* Client */}
          <p className={`${subtitleSize} text-gray-600 font-light mb-2`}>
            for
          </p>
          <p className={`${subtitleSize} text-gray-800 font-medium`}>
            {meta.clientName}
          </p>

          {/* Date - subtle */}
          <div className="mt-12">
            <p className={`${dateSize} text-gray-400 font-light`}>
              {new Date(meta.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
            {meta.expiresAt && (
              <p className="text-xs text-gray-300 mt-2 font-light">
                Valid until {new Date(meta.expiresAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Subtle corner accents */}
      {coverStyle.showDecorativeElements && (
        <>
          <div 
            className="absolute top-8 left-8 w-4 h-4 border-l border-t opacity-20"
            style={{ borderColor: accentColor }}
          />
          <div 
            className="absolute top-8 right-8 w-4 h-4 border-r border-t opacity-20"
            style={{ borderColor: accentColor }}
          />
          <div 
            className="absolute bottom-8 left-8 w-4 h-4 border-l border-b opacity-20"
            style={{ borderColor: accentColor }}
          />
          <div 
            className="absolute bottom-8 right-8 w-4 h-4 border-r border-b opacity-20"
            style={{ borderColor: accentColor }}
          />
        </>
      )}
    </div>
  );
};

export default MinimalLayout;
