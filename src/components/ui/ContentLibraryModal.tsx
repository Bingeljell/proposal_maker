import React, { useState } from 'react';
import { X, BookOpen, Search } from 'lucide-react';
import { ContentSnippet, ContentSnippetCategory } from '../../types';
import { useContentLibrary } from '../../hooks/useContentLibrary';

interface ContentLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (content: string) => void;
}

const categoryLabels: Record<ContentSnippetCategory, string> = {
  scope: 'Scope of Work',
  rate: 'Rate Card',
  testimonial: 'Testimonials',
  general: 'General',
};

const categoryColors: Record<ContentSnippetCategory, string> = {
  scope: 'bg-blue-100 text-blue-800',
  rate: 'bg-green-100 text-green-800',
  testimonial: 'bg-purple-100 text-purple-800',
  general: 'bg-gray-100 text-gray-800',
};

export const ContentLibraryModal: React.FC<ContentLibraryModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const { snippets, getCategories } = useContentLibrary();
  const [selectedCategory, setSelectedCategory] = useState<ContentSnippetCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState<ContentSnippet | null>(null);

  if (!isOpen) return null;

  const categories = getCategories();

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      snippet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInsert = () => {
    if (selectedSnippet) {
      onInsert(selectedSnippet.content);
      setSelectedSnippet(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Content Library</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 pt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-gray-800 dark:bg-gray-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Snippet List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredSnippets.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No snippets found. Try adjusting your search or category filter.
            </div>
          ) : (
            filteredSnippets.map((snippet) => (
              <div
                key={snippet.id}
                onClick={() => setSelectedSnippet(snippet)}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedSnippet?.id === snippet.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{snippet.name}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                      categoryColors[snippet.category]
                    }`}
                  >
                    {categoryLabels[snippet.category]}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{snippet.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!selectedSnippet}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Insert Snippet
          </button>
        </div>
      </div>
    </div>
  );
};
