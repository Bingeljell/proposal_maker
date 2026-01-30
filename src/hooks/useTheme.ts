import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemePreset, ThemeSettings } from '../types';
import { themes, defaultTheme } from '../data/themes';

const STORAGE_KEY = 'proposal_theme_preset';

export interface UseThemeReturn {
  currentTheme: ThemePreset;
  themeSettings: ThemeSettings;
  setTheme: (theme: ThemePreset) => void;
  toggleTheme: () => void;
  getThemeClass: (component: string) => string;
  getCSSVariable: (variable: string) => string;
}

// Generate CSS custom properties from theme settings
const generateCSSVariables = (settings: ThemeSettings): Record<string, string> => {
  return {
    // Colors
    '--theme-primary': settings.colors.primary,
    '--theme-secondary': settings.colors.secondary,
    '--theme-accent': settings.colors.accent,
    '--theme-text': settings.colors.text,
    '--theme-text-muted': settings.colors.textMuted,
    '--theme-background': settings.colors.background,
    '--theme-background-alt': settings.colors.backgroundAlt,
    '--theme-border': settings.colors.border,

    // Fonts
    '--theme-font-heading': settings.fonts.heading,
    '--theme-font-body': settings.fonts.body,
    '--theme-font-mono': settings.fonts.mono,

    // Spacing
    '--theme-page-padding': settings.spacing.pagePadding,
    '--theme-section-gap': settings.spacing.sectionGap,
    '--theme-element-gap': settings.spacing.elementGap,

    // Border Radius
    '--theme-radius-sm': settings.borderRadius.small,
    '--theme-radius-md': settings.borderRadius.medium,
    '--theme-radius-lg': settings.borderRadius.large,
    '--theme-radius-card': settings.borderRadius.card,
  };
};

// Apply CSS variables to document root
const applyCSSVariables = (variables: Record<string, string>) => {
  const root = document.documentElement;
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

// Component-specific class mappings based on theme
const getComponentClasses = (settings: ThemeSettings): Record<string, string> => {
  const { colors, borderRadius, spacing, headingStyle } = settings;

  // Heading classes
  const headingTransform = headingStyle === 'uppercase' 
    ? 'uppercase tracking-wider' 
    : headingStyle === 'capitalize' 
      ? 'capitalize' 
      : '';

  // Card classes
  let cardClasses = 'bg-white ';
  if (settings.cardStyle === 'shadow') {
    cardClasses += 'shadow-sm ';
  }
  if (settings.cardStyle === 'border' || settings.cardStyle === 'shadow') {
    cardClasses += 'border ';
  }

  // Table classes
  const tableHeadClasses = settings.tableStyle === 'striped' 
    ? `bg-gray-100 text-gray-500` 
    : settings.tableStyle === 'bordered' 
      ? `bg-[${colors.primary}]/10 text-[${colors.primary}] border-b-2 border-[${colors.primary}]`
      : 'text-gray-900 font-semibold border-b-2 border-gray-900';

  return {
    // Container
    'page-container': `bg-white w-full max-w-[210mm] mx-auto min-h-[297mm] p-[${spacing.pagePadding}] mb-8 shadow-lg print:shadow-none print:mb-0 print:w-full print:max-w-none print:h-auto print:min-h-0`,
    
    // Typography
    'heading-primary': `text-5xl font-extrabold text-[${colors.text}] mb-4 leading-tight`,
    'heading-section': `text-2xl font-bold text-[${colors.text}] ${headingTransform} flex items-baseline`,
    'heading-subsection': `text-xl font-bold text-[${colors.text}] mb-2`,
    'text-body': `text-gray-700`,
    'text-muted': `text-[${colors.textMuted}]`,
    'text-accent': `text-[${colors.primary}]`,
    
    // Section heading
    'section-heading-container': `border-b-2 border-[${colors.text}] pb-2 mb-8`,
    'section-number': `text-[${colors.textMuted}] mr-3 text-lg font-light`,
    
    // Cards
    'card': `${cardClasses} border-[${colors.border}] rounded-[${borderRadius.card}]`,
    'card-highlight': `bg-[${colors.backgroundAlt}] p-6 rounded-[${borderRadius.card}] border-l-4 border-[${colors.primary}]`,
    
    // Tables
    'table-head': tableHeadClasses,
    'table-cell': `py-2 px-3`,
    'table-row': `border-b border-[${colors.border}]`,
    
    // Tags/Badges
    'badge': `inline-block bg-[${colors.primary}]/10 text-[${colors.primary}] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[${colors.primary}]/20`,
    'badge-dark': `bg-[${colors.text}] text-white px-5 py-2 rounded-[${borderRadius.card}] flex items-center gap-3`,
    
    // Sign-off
    'signoff-box': `bg-white border-2 border-[${colors.text}] p-8 rounded-[${borderRadius.large}]`,
    'signature-line': `border-b border-gray-400 mb-2 h-8`,
    
    // Team member card
    'team-card': `flex gap-4 border border-[${colors.border}] rounded-[${borderRadius.card}] p-4 bg-white`,
    'team-avatar': `w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-[${colors.border}]`,
    'team-role': `text-[${colors.primary}] font-medium text-sm`,
    
    // Executive summary
    'exec-summary-box': `bg-[${colors.backgroundAlt}] p-6 rounded-[${borderRadius.card}] border-l-4 border-[${colors.primary}]`,
    
    // Commercials total
    'total-box': `border-t-2 border-[${colors.text}] pt-3`,
    'total-amount': `text-3xl font-extrabold text-[${colors.primary}]`,
  };
};

export const useTheme = (): UseThemeReturn => {
  // Initialize theme from localStorage or default
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored in themes) {
        return stored as ThemePreset;
      }
    }
    return defaultTheme;
  });

  // Get current theme settings
  const themeSettings = useMemo(() => themes[currentTheme], [currentTheme]);

  // Apply CSS variables when theme changes
  useEffect(() => {
    const variables = generateCSSVariables(themeSettings);
    applyCSSVariables(variables);
    
    // Add theme class to document
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, currentTheme);
  }, [currentTheme, themeSettings]);

  // Set theme handler
  const setTheme = useCallback((theme: ThemePreset) => {
    if (theme in themes) {
      setCurrentTheme(theme);
    }
  }, []);

  // Cycle through themes
  const toggleTheme = useCallback(() => {
    const themeOrder: ThemePreset[] = ['modern', 'classic', 'minimal', 'bold'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setCurrentTheme(themeOrder[nextIndex]);
  }, [currentTheme]);

  // Get theme-aware class for a component
  const getThemeClass = useCallback((component: string): string => {
    const classes = getComponentClasses(themeSettings);
    return classes[component] || '';
  }, [themeSettings]);

  // Get CSS variable value
  const getCSSVariable = useCallback((variable: string): string => {
    return `var(--theme-${variable})`;
  }, []);

  return {
    currentTheme,
    themeSettings,
    setTheme,
    toggleTheme,
    getThemeClass,
    getCSSVariable,
  };
};

export default useTheme;
