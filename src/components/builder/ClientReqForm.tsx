import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Plus, Trash2 } from 'lucide-react';

export const ClientReqForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();

  const addItem = () => {
    updateSection('clientResponsibilities', [...proposal.clientResponsibilities, '']);
  };

  const removeItem = (index: number) => {
    updateSection('clientResponsibilities', proposal.clientResponsibilities.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...proposal.clientResponsibilities];
    updated[index] = value;
    updateSection('clientResponsibilities', updated);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Client Responsibilities</h3>
          <p className="text-sm text-gray-500">What do you need from the client to succeed?</p>
        </div>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <div className="space-y-3">
        {proposal.clientResponsibilities.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder="e.g. Brand guidelines and high-res logos"
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
        {proposal.clientResponsibilities.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-sm text-gray-400">No responsibilities added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
