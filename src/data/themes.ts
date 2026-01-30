import { ThemeConfig } from '../types';

export const predefinedThemes: ThemeConfig[] = [
  {
    id: 'modern',
    name: 'Modern Blue',
    primaryColor: '#2563eb', // blue-600
    headingFont: 'Inter, sans-serif',
    bodyFont: 'Inter, sans-serif',
  },
  {
    id: 'classic',
    name: 'Classic Navy',
    primaryColor: '#1e3a8a', // blue-900
    headingFont: 'Merriweather, serif',
    bodyFont: 'Inter, sans-serif',
  },
  {
    id: 'bold',
    name: 'Bold Black',
    primaryColor: '#000000',
    headingFont: 'Oswald, sans-serif',
    bodyFont: 'Open Sans, sans-serif',
  },
  {
    id: 'creative',
    name: 'Creative Purple',
    primaryColor: '#7c3aed', // violet-600
    headingFont: 'Poppins, sans-serif',
    bodyFont: 'Nunito, sans-serif',
  },
  {
    id: 'forest',
    name: 'Eco Forest',
    primaryColor: '#166534', // green-800
    headingFont: 'DM Serif Display, serif',
    bodyFont: 'Lato, sans-serif',
  },
];
