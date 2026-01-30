import React, { useState, useCallback } from 'react';
import { X, Sparkles, RefreshCw, Check, AlertCircle, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import {
  generateContent,
  regenerateContent,
  formatForEditor,
  validateOptions,
  getGenerationPreview,
  ContentType,
  Tone,
  Length,
  ProjectType,
  contentTypeLabels,
  projectTypeLabels,
  toneLabels,
  lengthLabels,
  getProjectTypesForContentType,
} from '../../utils/aiWriter';

interface AIWritingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (content: string) => void;
  clientName?: string;
}

const contentTypes: ContentType[] = ['executive-summary', 'scope-description', 'objectives', 'team-description', 'custom'];
const tones: Tone[] = ['professional', 'casual', 'persuasive', 'technical'];
const lengths: Length[] = ['short', 'medium', 'long'];

export const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({
  isOpen,
  onClose,
  onInsert,
  clientName = '',
}) => {
  // Form state
  const [selectedContentType, setSelectedContentType] = useState<ContentType>('executive-summary');
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType>('general');
  const [selectedTone, setSelectedTone] = useState<Tone>('professional');
  const [selectedLength, setSelectedLength] = useState<Length>('medium');
  const [context, setContext] = useState('');
  const [clientNameInput, setClientNameInput] = useState(clientName);

  // Generation state
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Get available project types based on content type
  const availableProjectTypes = getProjectTypesForContentType(selectedContentType);

  // Reset project type when content type changes if current selection is not available
  React.useEffect(() => {
    if (!availableProjectTypes.includes(selectedProjectType)) {
      setSelectedProjectType('general');
    }
  }, [selectedContentType, availableProjectTypes, selectedProjectType]);

  // Handle generate button click
  const handleGenerate = useCallback(async () => {
    setError(null);
    setIsGenerating(true);

    // Simulate a brief delay for better UX (feels more like "AI processing")
    await new Promise((resolve) => setTimeout(resolve, 800));

    const options = {
      contentType: selectedContentType,
      projectType: selectedProjectType,
      tone: selectedTone,
      length: selectedLength,
      clientName: clientNameInput || 'your organization',
      context: context || undefined,
    };

    // Validate options
    const validationError = validateOptions(options);
    if (validationError) {
      setError(validationError);
      setIsGenerating(false);
      return;
    }

    const result = generateContent(options);

    if (result.success) {
      setGeneratedContent(result.content);
      setHasGenerated(true);
    } else {
      setError(result.error || 'Failed to generate content');
    }

    setIsGenerating(false);
  }, [selectedContentType, selectedProjectType, selectedTone, selectedLength, clientNameInput, context]);

  // Handle regenerate button click
  const handleRegenerate = useCallback(async () => {
    setError(null);
    setIsGenerating(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const options = {
      contentType: selectedContentType,
      projectType: selectedProjectType,
      tone: selectedTone,
      length: selectedLength,
      clientName: clientNameInput || 'your organization',
      context: context || undefined,
    };

    const result = regenerateContent(options);

    if (result.success) {
      setGeneratedContent(result.content);
    } else {
      setError(result.error || 'Failed to regenerate content');
    }

    setIsGenerating(false);
  }, [selectedContentType, selectedProjectType, selectedTone, selectedLength, clientNameInput, context]);

  // Handle insert button click
  const handleInsert = useCallback(() => {
    if (generatedContent) {
      const formattedContent = formatForEditor(generatedContent);
      onInsert(formattedContent);
      handleClose();
    }
  }, [generatedContent, onInsert]);

  // Handle close and reset state
  const handleClose = useCallback(() => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setGeneratedContent('');
      setHasGenerated(false);
      setError(null);
      setContext('');
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Writing Assistant</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Configuration Panel */}
            <div className="space-y-4">
              {/* Client Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Client Name
                </label>
                <input
                  type="text"
                  value={clientNameInput}
                  onChange={(e) => setClientNameInput(e.target.value)}
                  placeholder="Enter client name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Content Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Content Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {contentTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedContentType(type)}
                      className={clsx(
                        'px-3 py-2 rounded-md text-sm font-medium transition-all text-left',
                        selectedContentType === type
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-2 border-blue-500'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
                      )}
                    >
                      {contentTypeLabels[type]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Project Type
                </label>
                <select
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value as ProjectType)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {availableProjectTypes.map((type: ProjectType) => (
                    <option key={type} value={type}>
                      {projectTypeLabels[type]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Tone
                </label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={clsx(
                        'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                        selectedTone === tone
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      )}
                    >
                      {toneLabels[tone]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Length
                </label>
                <div className="flex gap-2">
                  {lengths.map((length) => (
                    <button
                      key={length}
                      onClick={() => setSelectedLength(length)}
                      className={clsx(
                        'flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                        selectedLength === length
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-2 ring-green-500'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      )}
                    >
                      {lengthLabels[length]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Context Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Context / Additional Details
                  <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(optional)</span>
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Add any specific details about what you want to include..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !clientNameInput.trim()}
                className={clsx(
                  'w-full py-2.5 px-4 rounded-md font-medium text-white transition-all flex items-center justify-center gap-2',
                  isGenerating || !clientNameInput.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg'
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Content
                  </>
                )}
              </button>

              {/* Preview Text */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {getGenerationPreview({
                  contentType: selectedContentType,
                  projectType: selectedProjectType,
                  tone: selectedTone,
                  length: selectedLength,
                })}
              </p>
            </div>

            {/* Preview Panel */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Generated Content
              </label>
              <div className="flex-1 min-h-[300px] border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900/50 p-4 overflow-y-auto">
                {error ? (
                  <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Generation failed</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                ) : hasGenerated ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {generatedContent.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-gray-800 dark:text-gray-200 mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                    <Sparkles className="w-10 h-10 mb-2 opacity-50" />
                    <p className="text-sm text-center">
                      Configure your preferences and click Generate to create content
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {hasGenerated && !error && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleRegenerate}
                    disabled={isGenerating}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <RefreshCw className={clsx('w-4 h-4', isGenerating && 'animate-spin')} />
                    Regenerate
                  </button>
                  <button
                    onClick={handleInsert}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Check className="w-4 h-4" />
                    Insert
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Content is generated using pre-written templates. No data is sent to external APIs.
          </p>
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
