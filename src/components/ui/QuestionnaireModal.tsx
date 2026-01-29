import React, { useState } from 'react';
import { X, CheckCircle, Send, ArrowRight, ArrowLeft, Package } from 'lucide-react';
import { Questionnaire, PackageTemplate } from '../../types';
import { usePackages } from '../../hooks/usePackages';
import questionnaireData from '../../data/defaultQuestionnaire.json';

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPackage: (pkg: PackageTemplate) => void;
}

export const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({
  isOpen,
  onClose,
  onApplyPackage,
}) => {
  const questionnaire = questionnaireData.questionnaire as Questionnaire;
  const { getPackageById } = usePackages();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedPackage, setRecommendedPackage] = useState<PackageTemplate | null>(null);

  if (!isOpen) return null;

  const currentQuestion = questionnaire.questions[currentStep];
  const isLastQuestion = currentStep === questionnaire.questions.length - 1;
  const progress = ((currentStep + 1) / questionnaire.questions.length) * 100;

  const handleAnswer = (answer: string | string[]) => {
    setResponses({ ...responses, [currentQuestion.id]: answer });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateRecommendation();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRecommendation = () => {
    // Simple scoring algorithm based on budget and services
    const budget = responses['q2'] as string;
    const services = responses['q3'] as string[] || [];
    const goal = responses['q1'] as string;

    let recommendedId = 'social-media-starter';

    // Budget-based logic
    if (budget === 'Over ₹200,000' || budget === '₹100,000 - ₹200,000') {
      recommendedId = 'full-service-premium';
    } else if (budget === '₹50,000 - ₹100,000') {
      if (services.includes('Paid Advertising') || services.includes('Video Production')) {
        recommendedId = 'digital-growth';
      } else {
        recommendedId = 'social-media-starter';
      }
    }

    // Goal-based override
    if (goal === 'Full digital transformation') {
      recommendedId = 'full-service-premium';
    } else if (goal === 'Grow existing digital presence' && budget !== 'Under ₹50,000') {
      recommendedId = 'digital-growth';
    }

    const pkg = getPackageById(recommendedId);
    setRecommendedPackage(pkg || null);
    setShowResults(true);
  };

  const handleApply = () => {
    if (recommendedPackage) {
      onApplyPackage(recommendedPackage);
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setCurrentStep(0);
    setResponses({});
    setShowResults(false);
    setRecommendedPackage(null);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Results View
  if (showResults && recommendedPackage) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recommendation Ready</h2>
            </div>
            <button
              onClick={resetAndClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Based on your responses, we recommend:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {recommendedPackage.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-3">
                  {formatPrice(recommendedPackage.estimatedPrice)}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> /month</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {recommendedPackage.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">What's Included:</h4>
              <div className="grid grid-cols-2 gap-3">
                {recommendedPackage.scope.map((section) => (
                  <div key={section.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <h5 className="font-medium text-sm text-gray-900 dark:text-gray-100">{section.name}</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {section.deliverables.length} deliverables
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              onClick={() => setShowResults(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Back to Questions
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              <Package size={18} />
              Apply This Package
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{questionnaire.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Question {currentStep + 1} of {questionnaire.questions.length}</p>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
          <div
            className="bg-blue-600 h-1 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            {currentQuestion.question}
            {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
          </h3>

          <div className="space-y-3">
            {currentQuestion.type === 'text' && (
              <textarea
                value={(responses[currentQuestion.id] as string) || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            )}

            {(currentQuestion.type === 'single_choice' || currentQuestion.type === 'budget' || currentQuestion.type === 'timeline') && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      responses[currentQuestion.id] === option
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={responses[currentQuestion.id] === option}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multiple_choice' && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option) => {
                  const selected = (responses[currentQuestion.id] as string[]) || [];
                  const isSelected = selected.includes(option);
                  
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleAnswer([...selected, option]);
                          } else {
                            handleAnswer(selected.filter((s) => s !== option));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{option}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestion.required && !responses[currentQuestion.id]}
            className="flex items-center gap-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
          >
            {isLastQuestion ? (
              <>
                <Send size={16} />
                Get Recommendation
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
