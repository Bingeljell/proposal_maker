import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Save, BookOpen } from 'lucide-react';
import { ContentSnippet, ContentSnippetCategory } from '../../types';
import { useContentLibrary } from '../../hooks/useContentLibrary';

interface ContentLibraryManagerProps {
  isOpen: boolean;
  onClose: () => void;
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

export const ContentLibraryManager: React.FC<ContentLibraryManagerProps> = ({
  isOpen,
  onClose,
}) => {
  const { snippets, addSnippet, updateSnippet, deleteSnippet } = useContentLibrary();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    name: string;
    content: string;
    category: ContentSnippetCategory;
  }>({
    name: '',
    content: '',
    category: 'general',
  });

  if (!isOpen) return null;

  const handleAdd = () => {
    if (formData.name.trim() && formData.content.trim()) {
      addSnippet(formData);
      setFormData({ name: '', content: '', category: 'general' });
      setIsAdding(false);
    }
  };

  const handleEdit = (snippet: ContentSnippet) => {
    setEditingId(snippet.id);
    setFormData({
      name: snippet.name,
      content: snippet.content,
      category: snippet.category,
    });
  };

  const handleUpdate = () => {
    if (editingId && formData.name.trim() && formData.content.trim()) {
      updateSnippet(editingId, formData);
      setEditingId(null);
      setFormData({ name: '', content: '', category: 'general' });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', content: '', category: 'general' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this snippet?')) {
      deleteSnippet(id);
    }
  };

  const renderForm = () => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Social Media Package Description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value as ContentSnippetCategory })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Enter the snippet content here..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={editingId ? handleUpdate : handleAdd}
          disabled={!formData.name.trim() || !formData.content.trim()}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {editingId ? 'Update Snippet' : 'Save Snippet'}
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-1.5 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Manage Content Library</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Add Button */}
          {!isAdding && !editingId && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Snippet
            </button>
          )}

          {/* Form */}
          {(isAdding || editingId) && renderForm()}

          {/* Snippet List */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Your Snippets</h3>
            {snippets.length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                No custom snippets yet. Add your first one above!
              </div>
            ) : (
              snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 truncate">{snippet.name}</h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                            categoryColors[snippet.category]
                          }`}
                        >
                          {categoryLabels[snippet.category]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{snippet.content}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(snippet)}
                        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(snippet.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
