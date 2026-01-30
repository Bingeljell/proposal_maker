import React, { useState, useEffect } from 'react';
import { ProposalOutcome, OutcomeDetails, Currency } from '../../types';
import { 
  X, 
  Trophy, 
  Frown, 
  PauseCircle, 
  RotateCcw, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  Building2,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface OutcomeTrackerProps {
  currentOutcome: ProposalOutcome | undefined;
  outcomeDetails: OutcomeDetails | undefined;
  currency: Currency;
  onOutcomeChange: (outcome: ProposalOutcome, details?: OutcomeDetails) => void;
  onClose: () => void;
  isOpen: boolean;
}

const lossReasons = [
  { id: 'price', label: 'Price too high', description: 'Client found the pricing too expensive' },
  { id: 'timeline', label: 'Timeline', description: 'Project timeline did not meet client needs' },
  { id: 'scope', label: 'Scope mismatch', description: 'Scope of work did not align with requirements' },
  { id: 'competitor', label: 'Went with competitor', description: 'Client chose a different vendor/agency' },
  { id: 'other', label: 'Other', description: 'Other reason not listed above' },
];

const formatCurrency = (amount: number, currency: Currency): string => {
  const locales: Record<Currency, string> = {
    INR: 'en-IN',
    USD: 'en-US',
    EUR: 'en-EU',
    GBP: 'en-GB',
    AUD: 'en-AU',
    CAD: 'en-CA',
    SGD: 'en-SG',
    AED: 'en-AE',
  };

  return new Intl.NumberFormat(locales[currency], {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (isoString: string | undefined): string => {
  if (!isoString) return 'Not set';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const OutcomeTracker: React.FC<OutcomeTrackerProps> = ({
  currentOutcome = 'pending',
  outcomeDetails,
  currency,
  onOutcomeChange,
  onClose,
  isOpen,
}) => {
  const [selectedOutcome, setSelectedOutcome] = useState<ProposalOutcome>(currentOutcome);
  const [details, setDetails] = useState<OutcomeDetails>(outcomeDetails || {});
  const [viewMode, setViewMode] = useState<'select' | 'view'>('select');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Sync with props when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOutcome(currentOutcome);
      setDetails(outcomeDetails || {});
      setViewMode(currentOutcome !== 'pending' ? 'view' : 'select');
      setShowConfirmReset(false);
    }
  }, [isOpen, currentOutcome, outcomeDetails]);

  const handleOutcomeSelect = (outcome: ProposalOutcome) => {
    setSelectedOutcome(outcome);
    if (outcome !== 'pending') {
      // Set default date if not set
      setDetails(prev => ({
        ...prev,
        dateDecided: prev.dateDecided || new Date().toISOString().split('T')[0],
      }));
    }
  };

  const handleSave = () => {
    if (selectedOutcome === 'pending') {
      onOutcomeChange('pending', undefined);
    } else {
      onOutcomeChange(selectedOutcome, details);
    }
    setViewMode('view');
  };

  const handleReset = () => {
    setSelectedOutcome('pending');
    setDetails({});
    setShowConfirmReset(false);
    onOutcomeChange('pending', undefined);
    setViewMode('select');
  };

  const getOutcomeIcon = (outcome: ProposalOutcome) => {
    switch (outcome) {
      case 'won':
        return <Trophy size={24} />;
      case 'lost':
        return <Frown size={24} />;
      case 'on-hold':
        return <PauseCircle size={24} />;
      default:
        return <RotateCcw size={24} />;
    }
  };

  const getOutcomeColor = (outcome: ProposalOutcome) => {
    switch (outcome) {
      case 'won':
        return {
          bg: 'bg-green-500',
          bgDark: 'dark:bg-green-500',
          bgLight: 'bg-green-50',
          bgLightDark: 'dark:bg-green-900/20',
          border: 'border-green-500',
          borderDark: 'dark:border-green-500',
          text: 'text-green-700',
          textDark: 'dark:text-green-300',
          ring: 'ring-green-200',
          ringDark: 'dark:ring-green-900/30',
        };
      case 'lost':
        return {
          bg: 'bg-red-500',
          bgDark: 'dark:bg-red-500',
          bgLight: 'bg-red-50',
          bgLightDark: 'dark:bg-red-900/20',
          border: 'border-red-500',
          borderDark: 'dark:border-red-500',
          text: 'text-red-700',
          textDark: 'dark:text-red-300',
          ring: 'ring-red-200',
          ringDark: 'dark:ring-red-900/30',
        };
      case 'on-hold':
        return {
          bg: 'bg-amber-500',
          bgDark: 'dark:bg-amber-500',
          bgLight: 'bg-amber-50',
          bgLightDark: 'dark:bg-amber-900/20',
          border: 'border-amber-500',
          borderDark: 'dark:border-amber-500',
          text: 'text-amber-700',
          textDark: 'dark:text-amber-300',
          ring: 'ring-amber-200',
          ringDark: 'dark:ring-amber-900/30',
        };
      default:
        return {
          bg: 'bg-gray-500',
          bgDark: 'dark:bg-gray-500',
          bgLight: 'bg-gray-50',
          bgLightDark: 'dark:bg-gray-800',
          border: 'border-gray-500',
          borderDark: 'dark:border-gray-500',
          text: 'text-gray-700',
          textDark: 'dark:text-gray-300',
          ring: 'ring-gray-200',
          ringDark: 'dark:ring-gray-700',
        };
    }
  };

  if (!isOpen) return null;

  const colors = getOutcomeColor(selectedOutcome);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Track Outcome
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Record the result of this proposal
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* View Mode Toggle */}
          {currentOutcome !== 'pending' && (
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode('view')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  viewMode === 'view'
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setViewMode('select')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  viewMode === 'select'
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Edit
              </button>
            </div>
          )}

          {/* View Mode - Show Summary */}
          {viewMode === 'view' && currentOutcome !== 'pending' && (
            <div className="space-y-6">
              {/* Outcome Badge */}
              <div className={`p-6 rounded-xl ${colors.bgLight} ${colors.bgLightDark} border-2 ${colors.border} ${colors.borderDark}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${colors.bg} ${colors.bgDark} flex items-center justify-center text-white shadow-lg`}>
                    {getOutcomeIcon(currentOutcome)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                      Proposal {currentOutcome === 'on-hold' ? 'On Hold' : currentOutcome}
                    </p>
                    {outcomeDetails?.dateDecided && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                        <Calendar size={14} />
                        Decided on {formatDate(outcomeDetails.dateDecided)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Won Details */}
              {currentOutcome === 'won' && outcomeDetails?.valueWon !== undefined && (
                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                    <TrendingUp size={18} />
                    <span className="font-semibold">Deal Value</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {formatCurrency(outcomeDetails.valueWon, currency)}
                  </p>
                </div>
              )}

              {/* Lost Details */}
              {currentOutcome === 'lost' && (
                <div className="space-y-4">
                  {outcomeDetails?.lossReason && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300 mb-2">
                        <TrendingDown size={18} />
                        <span className="font-semibold">Loss Reason</span>
                      </div>
                      <p className="text-red-800 dark:text-red-200">
                        {lossReasons.find(r => r.id === outcomeDetails.lossReason)?.label || outcomeDetails.lossReason}
                      </p>
                      {outcomeDetails.lossReason === 'other' && outcomeDetails.lossReasonOther && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          {outcomeDetails.lossReasonOther}
                        </p>
                      )}
                    </div>
                  )}

                  {outcomeDetails?.competitor && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                        <Building2 size={18} />
                        <span className="font-semibold">Competitor</span>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200">
                        {outcomeDetails.competitor}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Notes (for any outcome) */}
              {outcomeDetails?.notes && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                    <MessageSquare size={18} />
                    <span className="font-semibold">Notes</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {outcomeDetails.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Select Mode - Edit Form */}
          {(viewMode === 'select' || currentOutcome === 'pending') && (
            <div className="space-y-6">
              {/* Outcome Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Select Outcome
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['won', 'lost', 'on-hold', 'pending'] as ProposalOutcome[]).map((outcome) => {
                    const outcomeColors = getOutcomeColor(outcome);
                    const isSelected = selectedOutcome === outcome;
                    return (
                      <button
                        key={outcome}
                        onClick={() => handleOutcomeSelect(outcome)}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                          ${isSelected 
                            ? `${outcomeColors.border} ${outcomeColors.borderDark} ${outcomeColors.bgLight} ${outcomeColors.bgLightDark} ring-2 ${outcomeColors.ring} ${outcomeColors.ringDark}` 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }
                        `}
                      >
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-white
                          ${outcomeColors.bg} ${outcomeColors.bgDark}
                        `}>
                          {getOutcomeIcon(outcome)}
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold capitalize ${isSelected ? outcomeColors.text + ' ' + outcomeColors.textDark : 'text-gray-700 dark:text-gray-300'}`}>
                            {outcome === 'on-hold' ? 'On Hold' : outcome}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Won - Value Input */}
              {selectedOutcome === 'won' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                  <label className="block text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    Actual Value Won
                  </label>
                  <p className="text-xs text-green-600 dark:text-green-400 mb-3">
                    The final deal value (may differ from proposal)
                  </p>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400" />
                    <input
                      type="number"
                      value={details.valueWon || ''}
                      onChange={(e) => setDetails({ ...details, valueWon: parseFloat(e.target.value) || 0 })}
                      placeholder="Enter value"
                      className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Lost - Reason Selection */}
              {selectedOutcome === 'lost' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Loss Reason
                    </label>
                    <div className="space-y-2">
                      {lossReasons.map((reason) => (
                        <button
                          key={reason.id}
                          onClick={() => setDetails({ ...details, lossReason: reason.id })}
                          className={`
                            w-full p-3 rounded-lg border-2 text-left transition-all
                            ${details.lossReason === reason.id
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }
                          `}
                        >
                          <p className={`font-medium ${details.lossReason === reason.id ? 'text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}`}>
                            {reason.label}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {reason.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Other reason text input */}
                  {details.lossReason === 'other' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Please specify
                      </label>
                      <input
                        type="text"
                        value={details.lossReasonOther || ''}
                        onChange={(e) => setDetails({ ...details, lossReasonOther: e.target.value })}
                        placeholder="Enter reason"
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Competitor name */}
                  {details.lossReason === 'competitor' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Competitor Name
                      </label>
                      <div className="relative">
                        <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={details.competitor || ''}
                          onChange={(e) => setDetails({ ...details, competitor: e.target.value })}
                          placeholder="Who did they choose?"
                          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Date Picker */}
              {selectedOutcome !== 'pending' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Date Decided
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={details.dateDecided || ''}
                      onChange={(e) => setDetails({ ...details, dateDecided: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedOutcome !== 'pending' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={details.notes || ''}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    placeholder="Add any additional notes..."
                    rows={3}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              )}

              {/* Reset Confirmation */}
              {showConfirmReset && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                        Reset Outcome?
                      </h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                        This will clear all outcome data and reset to pending.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={handleReset}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Yes, Reset
                        </button>
                        <button
                          onClick={() => setShowConfirmReset(false)}
                          className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentOutcome !== 'pending' && viewMode === 'select' && (
                <button
                  onClick={() => setShowConfirmReset(true)}
                  className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium rounded-lg transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {viewMode === 'view' ? (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      if (currentOutcome !== 'pending') {
                        setViewMode('view');
                      } else {
                        onClose();
                      }
                    }}
                    className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Save Outcome
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutcomeTracker;
