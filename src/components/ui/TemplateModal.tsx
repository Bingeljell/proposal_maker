import React, { useState } from 'react';
import { X, FileText, Check, ChevronRight, LayoutTemplate } from 'lucide-react';
import { ProposalTemplate } from '../../types';
import { templates } from '../../data/templates';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadTemplate: (template: ProposalTemplate) => void;
}

const categoryColors: Record<string, string> = {
  'Creative': 'bg-purple-100 text-purple-800 border-purple-200',
  'Technical': 'bg-blue-100 text-blue-800 border-blue-200',
  'Business': 'bg-green-100 text-green-800 border-green-200',
  'Other': 'bg-gray-100 text-gray-800 border-gray-200',
};

export const TemplateModal: React.FC<TemplateModalProps> = ({
  isOpen,
  onClose,
  onLoadTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<ProposalTemplate | null>(null);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  
  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleApply = () => {
    if (previewTemplate) {
      onLoadTemplate(previewTemplate);
      setPreviewTemplate(null);
      onClose();
    }
  };

  if (previewTemplate) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${categoryColors[previewTemplate.category]?.split(' ')[0] || 'bg-gray-100'}`}>
                <FileText size={20} className={categoryColors[previewTemplate.category]?.split(' ')[1] || 'text-gray-600'} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{previewTemplate.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[previewTemplate.category] || 'bg-gray-100 border-gray-200 text-gray-800'}`}>
                  {previewTemplate.category}
                </span>
              </div>
            </div>
            <button
              onClick={() => setPreviewTemplate(null)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <p className="text-gray-600 dark:text-gray-300">{previewTemplate.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scope Preview */}
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        Scope Highlights
                    </h3>
                    <div className="space-y-3">
                        {previewTemplate.data.scope.slice(0, 3).map((section) => (
                        <div key={section.id}>
                            <h4 className="font-medium text-xs text-gray-700 dark:text-gray-300 uppercase tracking-wide">{section.name}</h4>
                            <ul className="mt-1 space-y-1">
                            {section.deliverables.slice(0, 3).map((del) => (
                                <li key={del.id} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {del.quantity}× {del.description}
                                </li>
                            ))}
                            {section.deliverables.length > 3 && (
                                <li className="text-xs text-gray-500 italic pl-3">
                                    + {section.deliverables.length - 3} more
                                </li>
                            )}
                            </ul>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Team & Costing Preview */}
                <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Team Structure</h3>
                        <div className="flex flex-wrap gap-2">
                            {previewTemplate.data.team.map((member) => (
                            <span
                                key={member.id}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                                {member.name}
                            </span>
                            ))}
                        </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                         <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Costing Structure</h3>
                         <ul className="space-y-1">
                            {previewTemplate.data.costing.map(c => (
                                <li key={c.id} className="text-sm text-gray-600 dark:text-gray-400">
                                    • {c.title} ({c.items.length} items)
                                </li>
                            ))}
                         </ul>
                    </div>
                </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3 text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Loading this template will replace your current proposal. Make sure to save any existing work first.
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Back to List
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              Load Template
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Load from Template</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-4 pt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                    ? 'bg-gray-800 dark:bg-gray-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                >
                {cat}
                </button>
            ))}
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setPreviewTemplate(template)}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${categoryColors[template.category]?.split(' ')[0] || 'bg-gray-100'}`}>
                        <FileText size={16} className={categoryColors[template.category]?.split(' ')[1] || 'text-gray-600'} />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{template.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{template.data.scope.length} sections</span>
                    <span>•</span>
                    <span>{template.data.team.length} team members</span>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          Click on a template to preview details
        </div>
      </div>
    </div>
  );
};
