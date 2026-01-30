import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Check, 
  LayoutTemplate, 
  ChevronRight,
  Briefcase,
  IndianRupee,
  Users,
  FileSignature,
  Layers,
  Star,
  Save,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { ProposalTemplate, TemplateCategory, Proposal } from '../../types';
import { useTemplates } from '../../hooks/useTemplates';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: ProposalTemplate, sections?: string[]) => void;
  currentProposal?: Proposal;
}

const categoryIcons: Record<TemplateCategory, React.ElementType> = {
  full: Layers,
  scope: Briefcase,
  ratecard: IndianRupee,
  team: Users,
  terms: FileSignature,
};

const categoryColors: Record<TemplateCategory, string> = {
  full: 'bg-purple-100 text-purple-800 border-purple-200',
  scope: 'bg-blue-100 text-blue-800 border-blue-200',
  ratecard: 'bg-green-100 text-green-800 border-green-200',
  team: 'bg-orange-100 text-orange-800 border-orange-200',
  terms: 'bg-gray-100 text-gray-800 border-gray-200',
};

const categoryLabels: Record<TemplateCategory, string> = {
  full: 'Full Proposal',
  scope: 'Scope Only',
  ratecard: 'Rate Card',
  team: 'Team Structure',
  terms: 'Terms & Conditions',
};

const availableSections = [
  { id: 'execSummary', label: 'Executive Summary', icon: FileText },
  { id: 'scope', label: 'Scope of Work', icon: Briefcase },
  { id: 'clientResponsibilities', label: 'Client Responsibilities', icon: Check },
  { id: 'outOfScope', label: 'Out of Scope', icon: AlertCircle },
  { id: 'team', label: 'Proposed Team', icon: Users },
  { id: 'costing', label: 'Commercials', icon: IndianRupee },
  { id: 'rateCard', label: 'Rate Card', icon: LayoutTemplate },
  { id: 'terms', label: 'Terms & Conditions', icon: FileSignature },
  { id: 'signOff', label: 'Sign-off', icon: FileSignature },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
  currentProposal,
}) => {
  const { 
    templates, 
    customTemplates, 
    getTemplatesByCategory, 
    deleteCustomTemplate,
    saveCurrentProposalAsTemplate 
  } = useTemplates();
  
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [previewTemplate, setPreviewTemplate] = useState<ProposalTemplate | null>(null);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveFormData, setSaveFormData] = useState({
    name: '',
    description: '',
    category: 'scope' as TemplateCategory,
  });

  if (!isOpen) return null;

  const allTemplates = [...templates, ...customTemplates];

  const filteredTemplates = selectedCategory === 'all' 
    ? allTemplates 
    : getTemplatesByCategory(selectedCategory);

  const handleApply = () => {
    if (previewTemplate) {
      // For full templates, apply everything
      // For partial templates, let user choose sections or apply all available
      const sectionsToApply = previewTemplate.category === 'full' 
        ? undefined 
        : (selectedSections.length > 0 ? selectedSections : undefined);
      
      onApplyTemplate(previewTemplate, sectionsToApply);
      setPreviewTemplate(null);
      setSelectedSections([]);
      onClose();
    }
  };

  const toggleSection = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSaveTemplate = () => {
    if (currentProposal && saveFormData.name && saveFormData.description) {
      saveCurrentProposalAsTemplate(
        saveFormData.name,
        saveFormData.description,
        saveFormData.category,
        currentProposal
      );
      setShowSaveDialog(false);
      setSaveFormData({ name: '', description: '', category: 'scope' });
      alert('Template saved successfully!');
    }
  };

  const handleDeleteCustomTemplate = (e: React.MouseEvent, template: ProposalTemplate) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${template.name}"?`)) {
      deleteCustomTemplate(template.id);
    }
  };

  // Get sections available in a template
  const getAvailableTemplateSections = (template: ProposalTemplate): string[] => {
    const sections: string[] = [];
    if (template.execSummary) sections.push('execSummary');
    if (template.scope && template.scope.length > 0) sections.push('scope');
    if (template.clientResponsibilities && template.clientResponsibilities.length > 0) sections.push('clientResponsibilities');
    if (template.outOfScope && template.outOfScope.length > 0) sections.push('outOfScope');
    if (template.team && template.team.length > 0) sections.push('team');
    if (template.costing && template.costing.length > 0) sections.push('costing');
    if (template.rateCard && template.rateCard.length > 0) sections.push('rateCard');
    if (template.terms) sections.push('terms');
    if (template.signOff) sections.push('signOff');
    return sections;
  };

  // Preview Mode
  if (previewTemplate) {
    const templateSections = getAvailableTemplateSections(previewTemplate);
    const Icon = categoryIcons[previewTemplate.category];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${categoryColors[previewTemplate.category].split(' ')[0]}`}>
                <Icon size={20} className={categoryColors[previewTemplate.category].split(' ')[1]} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{previewTemplate.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[previewTemplate.category]}`}>
                  {categoryLabels[previewTemplate.category]}
                </span>
                {previewTemplate.isCustom && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    Custom
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setPreviewTemplate(null);
                setSelectedSections([]);
              }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <p className="text-gray-600 dark:text-gray-300">{previewTemplate.description}</p>

            {/* Section Selection for non-full templates */}
            {previewTemplate.category !== 'full' && templateSections.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Select Sections to Apply
                </h3>
                <div className="flex flex-wrap gap-2">
                  {templateSections.map(sectionId => {
                    const sectionInfo = availableSections.find(s => s.id === sectionId);
                    if (!sectionInfo) return null;
                    const SectionIcon = sectionInfo.icon;
                    const isSelected = selectedSections.includes(sectionId);
                    return (
                      <button
                        key={sectionId}
                        onClick={() => toggleSection(sectionId)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500'
                        }`}
                      >
                        <SectionIcon size={14} />
                        {sectionInfo.label}
                        {isSelected && <Check size={14} />}
                      </button>
                    );
                  })}
                </div>
                {selectedSections.length === 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Click sections above to select what to apply. If none selected, all available sections will be applied.
                  </p>
                )}
              </div>
            )}

            {/* Scope Preview */}
            {previewTemplate.scope && previewTemplate.scope.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Briefcase size={16} className="text-blue-500" />
                  Scope of Work ({previewTemplate.scope.length} sections)
                </h3>
                <div className="space-y-3">
                  {previewTemplate.scope.slice(0, 3).map((section) => (
                    <div key={section.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{section.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{section.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {section.deliverables.length} deliverables
                      </p>
                    </div>
                  ))}
                  {previewTemplate.scope.length > 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{previewTemplate.scope.length - 3} more sections
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Rate Card Preview */}
            {previewTemplate.rateCard && previewTemplate.rateCard.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <IndianRupee size={16} className="text-green-500" />
                  Rate Card ({previewTemplate.rateCard.length} categories)
                </h3>
                <div className="space-y-2">
                  {previewTemplate.rateCard.slice(0, 3).map((section) => (
                    <div key={section.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{section.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{section.items.length} items</span>
                    </div>
                  ))}
                  {previewTemplate.rateCard.length > 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{previewTemplate.rateCard.length - 3} more categories
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Team Preview */}
            {previewTemplate.team && previewTemplate.team.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <Users size={16} className="text-orange-500" />
                  Proposed Team ({previewTemplate.team.length} members)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.team.map((member) => (
                    <span
                      key={member.id}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {member.name} - {member.role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Terms Preview */}
            {previewTemplate.terms && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <FileSignature size={16} className="text-gray-500" />
                  Terms & Conditions
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg max-h-32 overflow-y-auto">
                  <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-line line-clamp-5">
                    {previewTemplate.terms}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              onClick={() => {
                setPreviewTemplate(null);
                setSelectedSections([]);
              }}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Back to Templates
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              Apply Template
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Save Template Dialog
  if (showSaveDialog) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Save className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Save as Template</h2>
            </div>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Template Name
              </label>
              <input
                type="text"
                value={saveFormData.name}
                onChange={(e) => setSaveFormData({ ...saveFormData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., My Standard Rate Card"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={saveFormData.description}
                onChange={(e) => setSaveFormData({ ...saveFormData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Brief description of what this template includes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={saveFormData.category}
                onChange={(e) => setSaveFormData({ ...saveFormData, category: e.target.value as TemplateCategory })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="full">Full Proposal</option>
                <option value="scope">Scope Only</option>
                <option value="ratecard">Rate Card</option>
                <option value="team">Team Structure</option>
                <option value="terms">Terms & Conditions</option>
              </select>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                This will save your current proposal as a custom template that you can reuse in future proposals.
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
            <button
              onClick={() => setShowSaveDialog(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTemplate}
              disabled={!saveFormData.name || !saveFormData.description}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main List View
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Choose a Template</h2>
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
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-gray-800 dark:bg-gray-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Templates
          </button>
          {(['full', 'scope', 'ratecard', 'team', 'terms'] as const).map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon size={14} />
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>

        {/* Save Current Button */}
        {currentProposal && (
          <div className="px-4 pt-3">
            <button
              onClick={() => setShowSaveDialog(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
            >
              <Save size={16} />
              Save Current Proposal as Template
            </button>
          </div>
        )}

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <LayoutTemplate size={48} className="mx-auto mb-4 opacity-50" />
              <p>No templates found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => {
                const Icon = categoryIcons[template.category];
                const isCustom = template.isCustom;
                return (
                  <div
                    key={template.id}
                    onClick={() => setPreviewTemplate(template)}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${categoryColors[template.category].split(' ')[0]}`}>
                          <Icon size={16} className={categoryColors[template.category].split(' ')[1]} />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{template.name}</h3>
                        {isCustom && (
                          <Star size={12} className="text-blue-500 fill-blue-500" />
                        )}
                      </div>
                      {isCustom && (
                        <button
                          onClick={(e) => handleDeleteCustomTemplate(e, template)}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete custom template"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className={`px-2 py-0.5 rounded-full border ${categoryColors[template.category]}`}>
                        {categoryLabels[template.category]}
                      </span>
                      {template.scope && <span>{template.scope.length} scope sections</span>}
                      {template.team && <span>• {template.team.length} team members</span>}
                      {template.rateCard && <span>• {template.rateCard.length} rate categories</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {customTemplates.length > 0 && (
              <span className="flex items-center gap-1">
                <Star size={12} className="text-blue-500 fill-blue-500" />
                {customTemplates.length} custom template{customTemplates.length !== 1 ? 's' : ''}
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click on a template to preview and apply
          </p>
        </div>
      </div>
    </div>
  );
};
