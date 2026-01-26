import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { RichTextEditor } from '../ui/RichTextEditor';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export const RateCardForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();

  // Ensure rateCard exists (migration safety)
  const rateCardData = proposal.rateCard || [];

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === rateCardData.length - 1)) return;
    
    const newRateCard = [...rateCardData];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newRateCard[index], newRateCard[swapIndex]] = [newRateCard[swapIndex], newRateCard[index]];
    
    updateSection('rateCard', newRateCard);
  };

  const addSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      items: [],
    };
    updateSection('rateCard', [...rateCardData, newSection]);
  };

  const removeSection = (id: string) => {
    updateSection('rateCard', rateCardData.filter((s) => s.id !== id));
  };

  const updateSectionData = (id: string, field: string, value: string) => {
    const updated = rateCardData.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    updateSection('rateCard', updated);
  };

  const addItem = (sectionId: string) => {
    const updated = rateCardData.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: [
            ...s.items,
            { 
              id: crypto.randomUUID(), 
              description: '', 
              comment: '',
              quantity: 1,
              unitCost: 0
            },
          ],
        };
      }
      return s;
    });
    updateSection('rateCard', updated);
  };

  const updateItem = (
    sectionId: string,
    itemId: string,
    field: string,
    value: string | number
  ) => {
    const updated = rateCardData.map((s) => {
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
    updateSection('rateCard', updated);
  };

  const removeItem = (sectionId: string, itemId: string) => {
    const updated = rateCardData.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.filter((i) => i.id !== itemId),
        };
      }
      return s;
    });
    updateSection('rateCard', updated);
  };

  const moveItem = (sectionIndex: number, itemIndex: number, direction: 'up' | 'down') => {
    const section = rateCardData[sectionIndex];
    if (!section) return;

    if ((direction === 'up' && itemIndex === 0) || (direction === 'down' && itemIndex === section.items.length - 1)) return;

    const newItems = [...section.items];
    const swapIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
    [newItems[itemIndex], newItems[swapIndex]] = [newItems[swapIndex], newItems[itemIndex]];

    const updated = rateCardData.map((s, i) => 
      i === sectionIndex ? { ...s, items: newItems } : s
    );
    updateSection('rateCard', updated);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Rate Card</h3>
          <p className="text-sm text-gray-500">Define your rates and deliverables.</p>
        </div>
        <button
          onClick={addSection}
          className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="space-y-6">
        {rateCardData.map((section, sectionIndex) => (
          <div
            key={section.id}
            className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <div className="flex flex-col gap-0.5 mr-2">
                  <button 
                    onClick={() => moveSection(sectionIndex, 'up')}
                    disabled={sectionIndex === 0}
                    className="text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button 
                    onClick={() => moveSection(sectionIndex, 'down')}
                    disabled={sectionIndex === rateCardData.length - 1}
                    className="text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
                <input
                  type="text"
                  value={section.name}
                  onChange={(e) => updateSectionData(section.id, 'name', e.target.value)}
                  placeholder="Category Name (e.g. Design Services)"
                  className="bg-transparent border-0 font-semibold text-gray-900 focus:ring-0 p-0 text-sm w-full"
                />
              </div>
              <button
                onClick={() => removeSection(section.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Description
                </label>
                <RichTextEditor
                  value={section.description}
                  onChange={(value) => updateSectionData(section.id, 'description', value)}
                  placeholder="Category description..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Rate Items
                  </label>
                  <button
                    onClick={() => addItem(section.id)}
                    className="text-xs text-blue-600 font-semibold hover:text-blue-800"
                  >
                    + Add Item
                  </button>
                </div>
                
                {/* Headers */}
                {section.items.length > 0 && (
                   <div className="grid grid-cols-12 gap-2 mb-2 px-1">
                      <div className="col-span-4 text-[10px] font-bold text-gray-400 uppercase">Deliverable</div>
                      <div className="col-span-3 text-[10px] font-bold text-gray-400 uppercase">Comment</div>
                      <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase text-right">Qty</div>
                      <div className="col-span-2 text-[10px] font-bold text-gray-400 uppercase text-right">Unit Cost</div>
                      <div className="col-span-1"></div>
                   </div>
                )}

                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.id} className="flex items-start gap-2">
                      <div className="flex flex-col gap-0.5 pt-2">
                         <button 
                          onClick={() => moveItem(sectionIndex, itemIndex, 'up')}
                          disabled={itemIndex === 0}
                          className="text-gray-300 hover:text-blue-600 disabled:opacity-20 disabled:hover:text-gray-300"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button 
                          onClick={() => moveItem(sectionIndex, itemIndex, 'down')}
                          disabled={itemIndex === section.items.length - 1}
                          className="text-gray-300 hover:text-blue-600 disabled:opacity-20 disabled:hover:text-gray-300"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>

                      <div className="grid grid-cols-11 gap-2 flex-1">
                         <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                            placeholder="Deliverable name"
                            className="col-span-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border"
                          />
                          <input
                            type="text"
                            value={item.comment}
                            onChange={(e) => updateItem(section.id, item.id, 'comment', e.target.value)}
                            placeholder="Comment/Clarifier"
                            className="col-span-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border"
                          />
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(section.id, item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="col-span-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border text-right"
                          />
                          <input
                            type="number"
                            value={item.unitCost}
                            onChange={(e) => updateItem(section.id, item.id, 'unitCost', parseInt(e.target.value) || 0)}
                            className="col-span-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border text-right"
                          />
                      </div>
                      
                      <button
                        onClick={() => removeItem(section.id, item.id)}
                        className="text-gray-300 hover:text-red-500 mt-2"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {section.items.length === 0 && (
                    <p className="text-xs text-gray-400 italic">No items added yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
