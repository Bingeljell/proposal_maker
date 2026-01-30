import React from 'react';
import { Proposal, CoverStyle } from '../../../types';

interface CenteredLayoutProps {
  proposal: Proposal;
  coverStyle: CoverStyle;
  backgroundPattern: React.ReactNode;
  accentColor: string;
  fontSizeClass: string;
}

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  proposal,
  coverStyle,
  backgroundPattern,
  accentColor,
  fontSizeClass,
}) => {
  const { meta } = proposal;
  const titleSize = fontSizeClass === 'compact' ? 'text-4xl' : fontSizeClass === 'large' ? 'text-6xl' : 'text-5xl';
  const subtitleSize = fontSizeClass === 'compact' ? 'text-base' : fontSizeClass === 'large' ? 'text-xl' : 'text-lg';
  const dateSize = fontSizeClass === 'compact' ? 'text-sm' : fontSizeClass === 'large' ? 'text-lg' : 'text-base';

  return (
    <div className="relative w-full h-full flex flex-col justify-between text-center overflow-hidden">
      {/* Background Pattern */}
      {backgroundPattern}

      {/* Decorative Elements */}
      {coverStyle.showDecorativeElements && (
        <>
          {/* Top accent line */}
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: accentColor }}
          />
          {/* Corner decorations */}
          <div 
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 opacity-30"
            style={{ borderColor: accentColor }}
          />
          <div 
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 opacity-30"
            style={{ borderColor: accentColor }}
          />
        </>
      )}

      {/* Top Section - Logo */}
      <div className="pt-16 px-12 relative z-10">
        {meta.logo ? (
          <img 
            src={meta.logo} 
            alt="Agency Logo" 
            className="h-28 mx-auto object-contain mb-4" 
          />
        ) : (
          <div 
            className="h-28 flex items-center justify-center font-bold text-xl uppercase tracking-widest opacity-30"
            style={{ color: accentColor }}
          >
            Agency Logo
          </div>
        )}
      </div>

      {/* Middle Section - Title & Client */}
      <div className="flex-1 flex flex-col justify-center px-12 relative z-10">
        <h1 
          className={`${titleSize} font-extrabold text-gray-900 mb-6 leading-tight`}
        >
          {meta.title}
        </h1>
        <div 
          className="w-24 h-1 mx-auto mb-6"
          style={{ backgroundColor: accentColor }}
        />
        <p className={`${subtitleSize} text-gray-500 uppercase tracking-widest font-medium`}>
          Prepared for <span className="text-gray-700 font-semibold">{meta.clientName}</span>
        </p>
      </div>

      {/* Bottom Section - Date & Decorative */}
      <div className="pb-16 px-12 relative z-10">
        {coverStyle.showDecorativeElements && (
          <div 
            className="w-2 h-2 rounded-full mx-auto mb-6"
            style={{ backgroundColor: accentColor }}
          />
        )}
        <p className={`${dateSize} text-gray-400 font-medium`}>
          {new Date(meta.date).toLocaleDateString('en-US', { dateStyle: 'long' })}
        </p>
        {meta.expiresAt && (
          <p className="text-xs text-gray-400 mt-2">
            Valid until {new Date(meta.expiresAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
          </p>
        )}
      </div>

      {/* Bottom decorative elements */}
      {coverStyle.showDecorativeElements && (
        <>
          <div 
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 opacity-30"
            style={{ borderColor: accentColor }}
          />
          <div 
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 opacity-30"
            style={{ borderColor: accentColor }}
          />
        </>
      )}
    </div>
  );
};

export default CenteredLayout;
