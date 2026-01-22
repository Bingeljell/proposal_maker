import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Plus, Trash2 } from 'lucide-react';

export const OutOfScopeForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();

  const addItem = () => {
    updateSection('outOfScope', [...proposal.outOfScope, '']);
  };

  const removeItem = (index: number) => {
    updateSection('outOfScope', proposal.outOfScope.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...proposal.outOfScope];
    updated[index] = value;
    updateSection('outOfScope', updated);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Out of Scope</h3>
          <p className="text-sm text-gray-500">Clearly define what is NOT included.</p>
        </div>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Exclusion
        </button>
      </div>

      <div className="space-y-3">
        {proposal.outOfScope.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder="e.g. Paid media budget or ad spends"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
            <button
              onClick={() => removeItem(index)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {proposal.outOfScope.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-sm text-gray-400">No exclusions added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
