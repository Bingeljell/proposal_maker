import { ThemeSettings, ThemePreset } from '../types';

export const themes: Record<ThemePreset, ThemeSettings> = {
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Clean blue accents with contemporary sans-serif typography',
    colors: {
      primary: '#2563EB', // Blue 600
      secondary: '#3B82F6', // Blue 500
      accent: '#60A5FA', // Blue 400
      text: '#111827', // Gray 900
      textMuted: '#6B7280', // Gray 500
      background: '#FFFFFF',
      backgroundAlt: '#F3F4F6', // Gray 100
      border: '#E5E7EB', // Gray 200
    },
    fonts: {
      heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    },
    spacing: {
      pagePadding: '15mm',
      sectionGap: '3rem',
      elementGap: '1.5rem',
      compact: false,
    },
    borderRadius: {
      small: '0.25rem',
      medium: '0.5rem',
      large: '0.75rem',
      card: '0.5rem',
    },
    showTricolorLine: true,
    headingStyle: 'uppercase',
    tableStyle: 'striped',
    cardStyle: 'shadow',
  },

  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Navy blue with serif typography and conservative spacing',
    colors: {
      primary: '#1E3A5F', // Navy
      secondary: '#2C5282', // Dark Blue
      accent: '#4A6FA5', // Medium Blue
      text: '#1A202C', // Dark Gray
      textMuted: '#4A5568', // Gray 600
      background: '#FFFFFF',
      backgroundAlt: '#F7FAFC', // Very light gray
      border: '#CBD5E0', // Gray 400
    },
    fonts: {
      heading: 'Georgia, "Times New Roman", Times, serif',
      body: 'Georgia, "Times New Roman", Times, serif',
      mono: 'Courier New, Consolas, monospace',
    },
    spacing: {
      pagePadding: '20mm',
      sectionGap: '3.5rem',
      elementGap: '1.25rem',
      compact: false,
    },
    borderRadius: {
      small: '0',
      medium: '0',
      large: '0',
      card: '0',
    },
    showTricolorLine: true,
    headingStyle: 'uppercase',
    tableStyle: 'bordered',
    cardStyle: 'border',
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Black and gray palette with generous white space',
    colors: {
      primary: '#000000',
      secondary: '#374151', // Gray 700
      accent: '#9CA3AF', // Gray 400
      text: '#000000',
      textMuted: '#6B7280', // Gray 500
      background: '#FFFFFF',
      backgroundAlt: '#FAFAFA', // Very light gray
      border: '#E5E7EB', // Gray 200
    },
    fonts: {
      heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
    },
    spacing: {
      pagePadding: '18mm',
      sectionGap: '4rem',
      elementGap: '2rem',
      compact: false,
    },
    borderRadius: {
      small: '0.125rem',
      medium: '0.25rem',
      large: '0.375rem',
      card: '0.25rem',
    },
    showTricolorLine: false,
    headingStyle: 'normal',
    tableStyle: 'minimal',
    cardStyle: 'flat',
  },

  bold: {
    id: 'bold',
    name: 'Bold',
    description: 'Vibrant orange and red with bold typography',
    colors: {
      primary: '#EA580C', // Orange 600
      secondary: '#DC2626', // Red 600
      accent: '#F97316', // Orange 500
      text: '#18181B', // Zinc 900
      textMuted: '#52525B', // Zinc 600
      background: '#FFFFFF',
      backgroundAlt: '#FFF7ED', // Orange 50
      border: '#FED7AA', // Orange 200
    },
    fonts: {
      heading: '"Montserrat", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    spacing: {
      pagePadding: '15mm',
      sectionGap: '2.5rem',
      elementGap: '1rem',
      compact: true,
    },
    borderRadius: {
      small: '0.5rem',
      medium: '0.75rem',
      large: '1rem',
      card: '1rem',
    },
    showTricolorLine: true,
    headingStyle: 'uppercase',
    tableStyle: 'striped',
    cardStyle: 'shadow',
  },
};

export const defaultTheme: ThemePreset = 'modern';

export const getThemeSettings = (preset: ThemePreset): ThemeSettings => {
  return themes[preset];
};
