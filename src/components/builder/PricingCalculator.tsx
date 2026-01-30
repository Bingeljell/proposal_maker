import React, { useState } from 'react';
import { useProposal } from '../../hooks/useProposal';
import { PricingVariable } from '../../types';
import { Calculator, Plus, Trash2, Variable, Info, X } from 'lucide-react';

interface PricingCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  isOpen,
  onClose,
}) => {
  const { proposal, updateProposal } = useProposal();
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableKey, setNewVariableKey] = useState('');
  const [newVariableValue, setNewVariableValue] = useState('');
  const [keyError, setKeyError] = useState('');

  const variables = proposal.pricingVariables || [];

  const validateKey = (key: string): boolean => {
    if (!key) {
      setKeyError('Key is required');
      return false;
    }
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
      setKeyError('Key must start with a letter or underscore, followed by letters, numbers, or underscores');
      return false;
    }
    if (variables.some((v) => v.key === key)) {
      setKeyError('Key already exists');
      return false;
    }
    setKeyError('');
    return true;
  };

  const generateKeyFromName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9_\s]/g, '')
      .replace(/\s+/g, '_')
      .replace(/^[0-9]/, '_$&');
  };

  const handleNameChange = (name: string) => {
    setNewVariableName(name);
    if (!newVariableKey || keyError) {
      const generatedKey = generateKeyFromName(name);
      setNewVariableKey(generatedKey);
      if (generatedKey) {
        validateKey(generatedKey);
      }
    }
  };

  const handleKeyChange = (key: string) => {
    setNewVariableKey(key);
    validateKey(key);
  };

  const addVariable = () => {
    if (!newVariableName.trim()) return;
    if (!validateKey(newVariableKey)) return;

    const value = parseFloat(newVariableValue);
    if (isNaN(value)) return;

    const newVariable: PricingVariable = {
      id: crypto.randomUUID(),
      name: newVariableName.trim(),
      key: newVariableKey,
      value,
    };

    updateProposal({
      pricingVariables: [...variables, newVariable],
    });

    setNewVariableName('');
    setNewVariableKey('');
    setNewVariableValue('');
    setKeyError('');
  };

  const updateVariable = (id: string, field: keyof PricingVariable, value: string | number) => {
    const updated = variables.map((v) => {
      if (v.id === id) {
        if (field === 'value') {
          return { ...v, [field]: typeof value === 'string' ? parseFloat(value) || 0 : value };
        }
        return { ...v, [field]: value };
      }
      return v;
    });
    updateProposal({ pricingVariables: updated });
  };

  const removeVariable = (id: string) => {
    updateProposal({
      pricingVariables: variables.filter((v) => v.id !== id),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addVariable();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pricing Variables
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Define variables for dynamic pricing formulas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Info Banner */}
          <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Variables can be used in line item formulas like{' '}
              <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded text-xs">
                {'{videos} * 5000'}
              </code>
              . Changing a variable value will automatically recalculate all
              dependent costs.
            </p>
          </div>

          {/* Add New Variable */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Plus size={16} />
              Add New Variable
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={newVariableName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., Number of Videos"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Variable Key{' '}
                    <span className="text-gray-400 font-normal">(for formulas)</span>
                  </label>
                  <div className="relative">
                    <Variable className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={newVariableKey}
                      onChange={(e) => handleKeyChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="videos"
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono ${
                        keyError
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                  </div>
                  {keyError && (
                    <p className="mt-1 text-xs text-red-500">{keyError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    value={newVariableValue}
                    onChange={(e) => setNewVariableValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <button
                onClick={addVariable}
                disabled={!newVariableName || !newVariableKey || !!keyError}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
              >
                Add Variable
              </button>
            </div>
          </div>

          {/* Variables List */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Current Variables ({variables.length})
            </h3>
            {variables.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Variable className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No variables defined yet</p>
                <p className="text-xs mt-1">
                  Add variables above to use them in pricing formulas
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {variables.map((variable) => (
                  <div
                    key={variable.id}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg group"
                  >
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={variable.name}
                        onChange={(e) =>
                          updateVariable(variable.id, 'name', e.target.value)
                        }
                        className="w-full text-sm font-medium text-gray-900 dark:text-white bg-transparent border-0 p-0 focus:ring-0"
                      />
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 font-mono">
                          {'{' + variable.key + '}'}
                        </code>
                      </div>
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        value={variable.value}
                        onChange={(e) =>
                          updateVariable(variable.id, 'value', e.target.value)
                        }
                        className="w-full text-sm text-right border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <button
                      onClick={() => removeVariable(variable.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove variable"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Usage Examples */}
          {variables.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Example Formulas
              </h4>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 font-mono">
                {variables.slice(0, 3).map((v) => (
                  <div key={v.id}>
                    {'{' + v.key + '}'} × 1000 = {v.value * 1000}
                  </div>
                ))}
                {variables.length > 1 && (
                  <div className="pt-1 text-gray-400">
                    {'{' + variables[0]?.key + '}'} × 5000 + {'{' + variables[1]?.key + '}'} × 1000
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {variables.length} variable{variables.length !== 1 ? 's' : ''} defined
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white text-sm font-medium rounded-md transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
