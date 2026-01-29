import { useState, useEffect } from 'react';

const STORAGE_KEY = 'proposal_dark_mode';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return stored === 'true';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, String(isDarkMode));
  }, [isDarkMode]);

  const toggle = () => setIsDarkMode((prev) => !prev);
  const enable = () => setIsDarkMode(true);
  const disable = () => setIsDarkMode(false);

  return { isDarkMode, toggle, enable, disable };
};
