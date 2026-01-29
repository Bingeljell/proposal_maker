import { useState, useEffect, useCallback } from 'react';
import { ContentSnippet, ContentSnippetCategory } from '../types';
import defaultSnippetsData from '../data/defaultContentSnippets.json';

const STORAGE_KEY = 'proposal_content_library';

interface UseContentLibraryReturn {
  snippets: ContentSnippet[];
  addSnippet: (snippet: Omit<ContentSnippet, 'id'>) => void;
  updateSnippet: (id: string, updates: Partial<ContentSnippet>) => void;
  deleteSnippet: (id: string) => void;
  getSnippetsByCategory: (category: ContentSnippetCategory) => ContentSnippet[];
  getCategories: () => ContentSnippetCategory[];
}

export const useContentLibrary = (): UseContentLibraryReturn => {
  const [snippets, setSnippets] = useState<ContentSnippet[]>([]);

  // Initialize from localStorage or load defaults
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSnippets(parsed);
      } catch (e) {
        console.error('Failed to parse content library', e);
        loadDefaults();
      }
    } else {
      loadDefaults();
    }
  }, []);

  const loadDefaults = () => {
    const defaults: ContentSnippet[] = defaultSnippetsData.snippets.map(s => ({
      ...s,
      category: s.category as ContentSnippetCategory
    }));
    setSnippets(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  };

  // Persist to localStorage whenever snippets change
  useEffect(() => {
    if (snippets.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    }
  }, [snippets]);

  const addSnippet = useCallback((snippet: Omit<ContentSnippet, 'id'>) => {
    const newSnippet: ContentSnippet = {
      ...snippet,
      id: crypto.randomUUID(),
    };
    setSnippets((prev) => [...prev, newSnippet]);
  }, []);

  const updateSnippet = useCallback((id: string, updates: Partial<ContentSnippet>) => {
    setSnippets((prev) =>
      prev.map((snippet) =>
        snippet.id === id ? { ...snippet, ...updates } : snippet
      )
    );
  }, []);

  const deleteSnippet = useCallback((id: string) => {
    setSnippets((prev) => prev.filter((snippet) => snippet.id !== id));
  }, []);

  const getSnippetsByCategory = useCallback(
    (category: ContentSnippetCategory) => {
      return snippets.filter((snippet) => snippet.category === category);
    },
    [snippets]
  );

  const getCategories = useCallback((): ContentSnippetCategory[] => {
    const categories = new Set(snippets.map((s) => s.category));
    return Array.from(categories).sort() as ContentSnippetCategory[];
  }, [snippets]);

  return {
    snippets,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    getSnippetsByCategory,
    getCategories,
  };
};
