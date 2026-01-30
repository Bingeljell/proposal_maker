import React, { useState, useEffect } from 'react';
import { X, Key, Check, ExternalLink } from 'lucide-react';
import { getApiKey, setApiKey } from '../../services/ai';

interface AISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISettingsModal: React.FC<AISettingsModalProps> = ({ isOpen, onClose }) => {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKey(getApiKey() || '');
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(key);
    setSaved(true);
    setTimeout(() => {
        onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-600" />
            AI Settings
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            To use the AI writing features, you need a Google Gemini API Key. 
            The key is stored locally in your browser.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
              placeholder="AIzaSy..."
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
            >
                Get a free API Key <ExternalLink size={10} />
            </a>
          </div>

          <button
            onClick={handleSave}
            className={`w-full py-2 rounded-md font-medium text-white transition-colors flex items-center justify-center gap-2 ${
                saved ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {saved ? <><Check size={18} /> Saved!</> : 'Save API Key'}
          </button>
        </div>
      </div>
    </div>
  );
};
