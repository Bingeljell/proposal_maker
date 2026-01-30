import React from 'react';
import { Proposal, CoverStyle } from '../../../types';

interface SplitLayoutProps {
  proposal: Proposal;
  coverStyle: CoverStyle;
  backgroundPattern: React.ReactNode;
  accentColor: string;
  fontSizeClass: string;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
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
    <div className="relative w-full h-full flex overflow-hidden">
      {/* Background Pattern - Applied to full page */}
      {backgroundPattern}

      {/* Left Side - Accent Block with Logo */}
      <div 
        className="w-2/5 flex flex-col justify-center items-center p-8 relative"
        style={{ backgroundColor: accentColor }}
      >
        {/* Decorative pattern on accent side */}
        {coverStyle.showDecorativeElements && (
          <>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div 
                className="absolute top-8 left-8 w-32 h-32 border-2 border-white rounded-full"
              />
              <div 
                className="absolute bottom-16 right-8 w-24 h-24 border-2 border-white rounded-full"
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full"
              />
            </div>
          </>
        )}

        {/* Logo */}
        <div className="relative z-10">
          {meta.logo ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <img 
                src={meta.logo} 
                alt="Agency Logo" 
                className="h-32 object-contain filter brightness-0 invert"
              />
            </div>
          ) : (
            <div 
              className="h-32 flex items-center justify-center font-bold text-2xl uppercase tracking-widest text-white/50"
            >
              Logo
            </div>
          )}
        </div>

        {/* Decorative line */}
        {coverStyle.showDecorativeElements && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-white/30" />
        )}
      </div>

      {/* Right Side - Content */}
      <div className="w-3/5 flex flex-col justify-center p-12 relative z-10">
        {/* Decorative corner */}
        {coverStyle.showDecorativeElements && (
          <div 
            className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 opacity-20"
            style={{ borderColor: accentColor }}
          />
        )}

        {/* Content */}
        <div className="max-w-xl">
          <p 
            className={`${subtitleSize} text-gray-400 uppercase tracking-widest font-medium mb-6`}
          >
            Project Proposal
          </p>
          
          <h1 
            className={`${titleSize} font-bold text-gray-900 mb-6 leading-tight`}
          >
            {meta.title}
          </h1>

          <div 
            className="w-20 h-1 mb-8"
            style={{ backgroundColor: accentColor }}
          />

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Prepared For</p>
              <p className={`${subtitleSize} text-gray-800 font-semibold`}>
                {meta.clientName}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</p>
              <p className={`${dateSize} text-gray-600`}>
                {new Date(meta.date).toLocaleDateString('en-US', { dateStyle: 'long' })}
              </p>
            </div>

            {meta.expiresAt && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Valid Until</p>
                <p className="text-sm text-gray-500">
                  {new Date(meta.expiresAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom decorative line */}
        {coverStyle.showDecorativeElements && (
          <div 
            className="absolute bottom-12 left-12 w-32 h-0.5 opacity-30"
            style={{ backgroundColor: accentColor }}
          />
        )}
      </div>
    </div>
  );
};

export default SplitLayout;
