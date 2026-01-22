import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Plus, Trash2, IndianRupee } from 'lucide-react';

export const CostingForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();

  const addSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      title: '',
      items: [],
    };
    updateSection('costing', [...proposal.costing, newSection]);
  };

  const removeSection = (id: string) => {
    updateSection('costing', proposal.costing.filter((s) => s.id !== id));
  };

  const updateSectionTitle = (id: string, title: string) => {
    const updated = proposal.costing.map((s) =>
      s.id === id ? { ...s, title } : s
    );
    updateSection('costing', updated);
  };

  const addItem = (sectionId: string) => {
    const updated = proposal.costing.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: [
            ...s.items,
            { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 },
          ],
        };
      }
      return s;
    });
    updateSection('costing', updated);
  };

  const updateItem = (
    sectionId: string,
    itemId: string,
    field: string,
    value: string | number
  ) => {
    const updated = proposal.costing.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.map((i) =>
            i.id === itemId ? { ...i, [field]: value } : i
          ),
        };
      }
      return s;
    });
    updateSection('costing', updated);
  };

  const removeItem = (sectionId: string, itemId: string) => {
    const updated = proposal.costing.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.filter((i) => i.id !== itemId),
        };
      }
      return s;
    });
    updateSection('costing', updated);
  };

  const calculateSectionTotal = (section: typeof proposal.costing[0]) => {
    return section.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  };

  const grandTotal = proposal.costing.reduce(
    (acc, section) => acc + calculateSectionTotal(section),
    0
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Commercial Proposal</h3>
          <p className="text-sm text-gray-500">Break down the costs by category.</p>
        </div>
        <button
          onClick={addSection}
          className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Cost Category
        </button>
      </div>

      <div className="space-y-10">
        {proposal.costing.map((section) => (
          <div key={section.id} className="relative">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                placeholder="Category Title (e.g. Website Development)"
                className="text-lg font-bold text-gray-900 border-0 p-0 focus:ring-0 w-full placeholder:text-gray-300"
              />
              <button
                onClick={() => removeSection(section.id)}
                className="text-gray-400 hover:text-red-500 ml-4"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-2 text-left text-xs font-bold text-gray-500 uppercase">Item Description</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 uppercase w-24">Qty</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 uppercase w-32">Rate (INR)</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 uppercase w-32">Total</th>
                  <th className="pl-3 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <tr key={item.id} className="group">
                    <td className="py-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                        placeholder="Item name or description"
                        className="w-full text-sm border-0 p-0 focus:ring-0 text-gray-700 placeholder:text-gray-300"
                      />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(section.id, item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full text-sm border-0 p-0 text-right focus:ring-0 text-gray-700"
                      />
                    </td>
                    <td className="px-3 py-3 text-right">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(section.id, item.id, 'rate', parseInt(e.target.value) || 0)}
                        className="w-full text-sm border-0 p-0 text-right focus:ring-0 text-gray-700 font-mono"
                      />
                    </td>
                    <td className="px-3 py-3 text-right text-sm font-semibold text-gray-900 font-mono">
                      {(item.quantity * item.rate).toLocaleString('en-IN')}
                    </td>
                    <td className="pl-3 py-3 text-right">
                      <button
                        onClick={() => removeItem(section.id, item.id)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="py-2">
                    <button
                      onClick={() => addItem(section.id)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      + Add Line Item
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="pt-4 text-right text-sm font-bold text-gray-500 uppercase">Category Total</td>
                  <td className="pt-4 text-right text-sm font-bold text-blue-600 font-mono">
                    {calculateSectionTotal(section).toLocaleString('en-IN')}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

      {proposal.costing.length > 0 && (
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-white flex justify-between items-center shadow-lg">
          <div>
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Monthly Retainer</h4>
            <p className="text-3xl font-extrabold flex items-center gap-2">
              <IndianRupee size={24} className="text-blue-400" />
              {grandTotal.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-right text-xs text-gray-400">
            <p>* All prices are excluding applicable taxes.</p>
            <p>Calculated automatically based on categories above.</p>
          </div>
        </div>
      )}
    </div>
  );
};
