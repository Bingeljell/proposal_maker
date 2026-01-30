import React, { useState } from 'react';
import { ProposalStatus, StatusHistoryItem } from '../../types';
import { FileText, Eye, CheckCircle, Send, X, ChevronRight, Clock, User, AlertTriangle } from 'lucide-react';

interface StatusWorkflowProps {
  currentStatus: ProposalStatus;
  statusHistory?: StatusHistoryItem[];
  onStatusChange: (newStatus: ProposalStatus) => void;
  onClose: () => void;
  isOpen: boolean;
}

interface StepConfig {
  id: ProposalStatus;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  darkColor: string;
}

const workflowSteps: StepConfig[] = [
  {
    id: 'draft',
    label: 'Draft',
    description: 'Proposal is being created and edited',
    icon: <FileText size={20} />,
    color: 'bg-gray-500',
    darkColor: 'dark:bg-gray-400',
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Proposal is under internal review',
    icon: <Eye size={20} />,
    color: 'bg-amber-500',
    darkColor: 'dark:bg-amber-400',
  },
  {
    id: 'final',
    label: 'Final',
    description: 'Proposal is approved and ready to send',
    icon: <CheckCircle size={20} />,
    color: 'bg-blue-500',
    darkColor: 'dark:bg-blue-400',
  },
  {
    id: 'sent',
    label: 'Sent',
    description: 'Proposal has been sent to the client',
    icon: <Send size={20} />,
    color: 'bg-green-500',
    darkColor: 'dark:bg-green-400',
  },
];

const getStepIndex = (status: ProposalStatus): number => {
  return workflowSteps.findIndex((step) => step.id === status);
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const StatusWorkflow: React.FC<StatusWorkflowProps> = ({
  currentStatus,
  statusHistory = [],
  onStatusChange,
  onClose,
  isOpen,
}) => {
  const [confirmingStatus, setConfirmingStatus] = useState<ProposalStatus | null>(null);
  const currentStepIndex = getStepIndex(currentStatus);

  const handleStepClick = (stepId: ProposalStatus) => {
    if (stepId === currentStatus) return;
    setConfirmingStatus(stepId);
  };

  const confirmStatusChange = () => {
    if (confirmingStatus) {
      onStatusChange(confirmingStatus);
      setConfirmingStatus(null);
    }
  };

  const cancelConfirmation = () => {
    setConfirmingStatus(null);
  };

  const getTimestampForStatus = (status: ProposalStatus): string | null => {
    const historyItem = statusHistory.find((h) => h.status === status);
    return historyItem ? historyItem.timestamp : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Approval Workflow
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage proposal status and approvals
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-2">
            {workflowSteps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isPending = index > currentStepIndex;
              const timestamp = getTimestampForStatus(step.id);

              return (
                <div
                  key={step.id}
                  onClick={() => !isPending && handleStepClick(step.id)}
                  className={`
                    relative flex items-start gap-4 p-4 rounded-lg border-2 transition-all duration-200
                    ${isCurrent
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : isCompleted
                      ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                    }
                    ${!isPending ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed opacity-60'}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white
                      transition-all duration-200
                      ${isCurrent
                        ? `${step.color} ${step.darkColor} ring-4 ring-blue-200 dark:ring-blue-900/30`
                        : isCompleted
                        ? 'bg-green-500 dark:bg-green-400'
                        : 'bg-gray-300 dark:bg-gray-600'
                      }
                    `}
                  >
                    {isCompleted && !isCurrent ? (
                      <CheckCircle size={20} />
                    ) : (
                      step.icon
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`
                          font-semibold
                          ${isCurrent
                            ? 'text-blue-900 dark:text-blue-100'
                            : isCompleted
                            ? 'text-green-900 dark:text-green-100'
                            : 'text-gray-700 dark:text-gray-300'
                          }
                        `}
                      >
                        {step.label}
                      </h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {step.description}
                    </p>
                    {timestamp && (
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {formatDate(timestamp)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Arrow for non-last items */}
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute -bottom-3 left-7 z-10">
                      <ChevronRight
                        size={16}
                        className="rotate-90 text-gray-300 dark:text-gray-600"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Confirmation Dialog */}
          {confirmingStatus && (
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                    Confirm Status Change
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Change status from <strong>{workflowSteps[currentStepIndex].label}</strong> to{' '}
                    <strong>{workflowSteps[getStepIndex(confirmingStatus)].label}</strong>?
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={confirmStatusChange}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Confirm Change
                    </button>
                    <button
                      onClick={cancelConfirmation}
                      className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status History */}
          {statusHistory && statusHistory.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <Clock size={16} />
                Status History
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {statusHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          w-2 h-2 rounded-full
                          ${item.status === 'draft' ? 'bg-gray-400' : ''}
                          ${item.status === 'review' ? 'bg-amber-500' : ''}
                          ${item.status === 'final' ? 'bg-blue-500' : ''}
                          ${item.status === 'sent' ? 'bg-green-500' : ''}
                        `}
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                      {item.changedBy && (
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {item.changedBy}
                        </span>
                      )}
                      <span>{formatDate(item.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current status: <strong className="text-gray-700 dark:text-gray-300 capitalize">{currentStatus}</strong>
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusWorkflow;
