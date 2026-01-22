import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Plus, Trash2 } from 'lucide-react';

export const HistoryForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();

  const addVersion = () => {
    const newItem = {
      id: crypto.randomUUID(),
      version: (proposal.versionHistory.length + 1).toFixed(1),
      date: new Date().toISOString().split('T')[0],
      author: '',
      notes: '',
    };
    updateSection('versionHistory', [...proposal.versionHistory, newItem]);
  };

  const removeVersion = (id: string) => {
    updateSection('versionHistory', proposal.versionHistory.filter(v => v.id !== id));
  };

  const updateVersion = (id: string, field: string, value: string) => {
    const updated = proposal.versionHistory.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    );
    updateSection('versionHistory', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Version History</h3>
        <button
          onClick={addVersion}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Version
        </button>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-24">Version</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-32">Date</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-48">Author</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 w-12">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {proposal.versionHistory.map((item) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  <input
                    type="text"
                    value={item.version}
                    onChange={(e) => updateVersion(item.id, 'version', e.target.value)}
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => updateVersion(item.id, 'date', e.target.value)}
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <input
                    type="text"
                    value={item.author}
                    onChange={(e) => updateVersion(item.id, 'author', e.target.value)}
                    placeholder="Name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  />
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  <input
                    type="text"
                    value={item.notes}
                    onChange={(e) => updateVersion(item.id, 'notes', e.target.value)}
                    placeholder="Description of changes"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  />
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => removeVersion(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
