import React, { useState } from 'react';
import { X, Sparkles, Loader2, ArrowRight, Wand2 } from 'lucide-react';
import { generateContent, getApiKey } from '../../services/ai';
import { marked } from 'marked';

interface AIWriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (content: string) => void;
}

export const AIWriterModal: React.FC<AIWriterModalProps> = ({ isOpen, onClose, onInsert }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const hasKey = !!getApiKey();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const text = await generateContent(prompt);
      // Convert Markdown to HTML (Gemini returns Markdown)
      const html = await marked.parse(text);
      setResult(html);
    } catch (err: any) {
      setError(err.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleInsert = () => {
    onInsert(result);
    onClose();
    setPrompt('');
    setResult('');
  };

  if (!hasKey) {
     return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Wand2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Writer Setup</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You need to configure your Gemini API Key before using the AI Writer.
                </p>
                <div className="flex gap-3 justify-center">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                    {/* The Sidebar settings button handles opening the settings modal, so we just close this one and let user find settings */}
                    <button onClick={onClose} className="px-4 py-2 bg-purple-600 text-white rounded-md">Okay</button>
                </div>
            </div>
        </div>
     )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Writer</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              What should I write?
            </label>
            <div className="relative">
                <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3 border min-h-[80px]"
                placeholder="e.g. Write a professional executive summary for a website redesign project focusing on SEO and speed."
                disabled={loading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white p-2 rounded-full transition-colors"
                    title="Generate"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Generated Content
                </label>
                <div 
                    className="prose prose-sm max-w-none p-4 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700 max-h-[300px] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: result }}
                />
            </div>
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
            disabled={!result}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md font-medium transition-colors"
          >
            Insert Text
          </button>
        </div>
      </div>
    </div>
  );
};
