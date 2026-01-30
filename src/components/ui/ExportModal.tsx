import React, { useState } from 'react';
import { Proposal } from '../../types';
import { exportToWord } from '../../utils/exportWord';
import { 
  X, 
  Printer, 
  FileText,
  Download, 
  FileJson,
  CheckCircle
} from 'lucide-react';

interface ExportModalProps {
  proposal: Proposal;
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
  onExportJSON: () => void;
}

type ExportFormat = 'pdf' | 'word' | 'json';

interface ExportOption {
  id: ExportFormat;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  darkColor: string;
  darkBgColor: string;
  darkBorderColor: string;
}

const exportOptions: ExportOption[] = [
  {
    id: 'pdf',
    label: 'PDF (Print)',
    description: 'Best for sharing and printing. Opens print dialog.',
    icon: <Printer size={24} />,
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    darkColor: 'dark:text-gray-200',
    darkBgColor: 'dark:bg-gray-800',
    darkBorderColor: 'dark:border-gray-700',
  },
  {
    id: 'word',
    label: 'Word Document',
    description: 'Editable .docx format with all proposal content.',
    icon: <FileText size={24} />,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    darkColor: 'dark:text-blue-300',
    darkBgColor: 'dark:bg-blue-900/20',
    darkBorderColor: 'dark:border-blue-800',
  },
  {
    id: 'json',
    label: 'JSON Data',
    description: 'Raw proposal data for backup or import.',
    icon: <FileJson size={24} />,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    darkColor: 'dark:text-purple-300',
    darkBgColor: 'dark:bg-purple-900/20',
    darkBorderColor: 'dark:border-purple-800',
  },
];

export const ExportModal: React.FC<ExportModalProps> = ({
  proposal,
  isOpen,
  onClose,
  onPrint,
  onExportJSON,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      if (selectedFormat === 'pdf') {
        onPrint();
      } else if (selectedFormat === 'word') {
        await exportToWord(proposal);
      } else if (selectedFormat === 'json') {
        onExportJSON();
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Export Proposal
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose your preferred export format
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Export Options */}
        <div className="p-6 space-y-3">
          {exportOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedFormat(option.id)}
              className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${selectedFormat === option.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <div className={`p-2 rounded-lg ${option.bgColor} ${option.darkBgColor}`}>
                <span className={option.color}>{option.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${option.color} ${option.darkColor}`}>
                  {option.label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {option.description}
                </p>
              </div>
              {selectedFormat === option.id && (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-white" />
                </div>
              )}
            </button>
          ))}

          {/* Coming Soon Note */}
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              <strong>Coming Soon:</strong> PowerPoint (.pptx) and Excel (.xlsx) exports
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Exporting...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle size={16} />
                  Done!
                </>
              ) : (
                <>
                  <Download size={16} />
                  Export
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
