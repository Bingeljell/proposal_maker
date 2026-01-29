import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { RichTextEditor } from '../ui/RichTextEditor';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { PageBreakTargetType } from '../../types';

export const ScopeForm: React.FC = () => {
  const { proposal, updateSection, updateProposal } = useProposal();

  const hasPageBreak = (targetType: PageBreakTargetType, targetId: string) =>
    proposal.pageBreaks?.some((b) => b.targetType === targetType && b.targetId === targetId);

  const togglePageBreak = (targetType: PageBreakTargetType, targetId: string) => {
    const pageBreaks = proposal.pageBreaks || [];
    const existing = pageBreaks.find((b) => b.targetType === targetType && b.targetId === targetId);
    const updated = existing
      ? pageBreaks.filter((b) => b.id !== existing.id)
      : [...pageBreaks, { id: crypto.randomUUID(), targetType, targetId }];
    updateProposal({ pageBreaks: updated });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === proposal.scope.length - 1)) return;
    
    const newScope = [...proposal.scope];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newScope[index], newScope[swapIndex]] = [newScope[swapIndex], newScope[index]];
    
    updateSection('scope', newScope);
  };

  const addSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      deliverables: [],
    };
    updateSection('scope', [...proposal.scope, newSection]);
  };

  const removeSection = (id: string) => {
    updateSection('scope', proposal.scope.filter((s) => s.id !== id));
  };

  const updateSectionData = (id: string, field: string, value: string) => {
    const updated = proposal.scope.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    updateSection('scope', updated);
  };

  const addDeliverable = (sectionId: string) => {
    const updated = proposal.scope.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          deliverables: [
            ...s.deliverables,
            { id: crypto.randomUUID(), description: '', quantity: 1 },
          ],
        };
      }
      return s;
    });
    updateSection('scope', updated);
  };

  const updateDeliverable = (
    sectionId: string,
    delId: string,
    field: string,
    value: string | number
  ) => {
    const updated = proposal.scope.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          deliverables: s.deliverables.map((d) =>
            d.id === delId ? { ...d, [field]: value } : d
          ),
        };
      }
      return s;
    });
    updateSection('scope', updated);
  };

    const moveDeliverable = (sectionIndex: number, delIndex: number, direction: 'up' | 'down') => {

      const section = proposal.scope[sectionIndex];

      if (!section) return;

  

      if ((direction === 'up' && delIndex === 0) || (direction === 'down' && delIndex === section.deliverables.length - 1)) return;

  

      const newDeliverables = [...section.deliverables];

      const swapIndex = direction === 'up' ? delIndex - 1 : delIndex + 1;

      [newDeliverables[delIndex], newDeliverables[swapIndex]] = [newDeliverables[swapIndex], newDeliverables[delIndex]];

  

      const updated = proposal.scope.map((s, i) => 

        i === sectionIndex ? { ...s, deliverables: newDeliverables } : s

      );

      updateSection('scope', updated);

    };

  

    const removeDeliverable = (sectionId: string, delId: string) => {

      const updated = proposal.scope.map((s) => {

        if (s.id === sectionId) {

          return {

            ...s,

            deliverables: s.deliverables.filter((d) => d.id !== delId),

          };

        }

        return s;

      });

      updateSection('scope', updated);

    };

  

    return (

      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h3 className="text-lg font-medium text-gray-900">Scope of Work</h3>

            <p className="text-sm text-gray-500">Define your services and specific outputs.</p>

          </div>

          <button

            onClick={addSection}

            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"

          >

            <Plus size={16} />

            Add Service Category

          </button>

        </div>

  

        <div className="space-y-6">

          {proposal.scope.map((section, index) => (

            <div

              key={section.id}

              className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"

            >

              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">

                <div className="flex items-center gap-2 flex-1">

                  <div className="flex flex-col gap-0.5 mr-2">

                    <button 

                      onClick={() => moveSection(index, 'up')}

                      disabled={index === 0}

                      className="text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400"

                    >

                      <ArrowUp size={14} />

                    </button>

                    <button 

                      onClick={() => moveSection(index, 'down')}

                      disabled={index === proposal.scope.length - 1}

                      className="text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400"

                    >

                      <ArrowDown size={14} />

                    </button>

                    <button

                      onClick={() => togglePageBreak('scope-category', section.id)}

                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${hasPageBreak('scope-category', section.id) ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-400 border-gray-200 hover:text-blue-600'}`}

                      title="Page break before this category"

                    >

                      PB

                    </button>

                  </div>

                  <input

                    type="text"

                    value={section.name}

                    onChange={(e) => updateSectionData(section.id, 'name', e.target.value)}

                    placeholder="Service Category (e.g. Social Media, Tech)"

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

                    High-level Description

                  </label>

                  <RichTextEditor

                    value={section.description}

                    onChange={(value) => updateSectionData(section.id, 'description', value)}

                    placeholder="What does this service entail?"

                  />

                </div>

  

                <div>

                  <div className="flex justify-between items-center mb-2">

                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">

                      Quantified Deliverables

                    </label>

                    <button

                      onClick={() => addDeliverable(section.id)}

                      className="text-xs text-blue-600 font-semibold hover:text-blue-800"

                    >

                      + Add Deliverable

                    </button>

                  </div>

                  <div className="space-y-2">

                    {section.deliverables.map((del, dIndex) => (

                      <div key={del.id} className="flex items-center gap-2">

                        <div className="flex flex-col gap-0.5">

                          <button 

                            onClick={() => moveDeliverable(index, dIndex, 'up')}

                            disabled={dIndex === 0}

                            className="text-gray-300 hover:text-blue-600 disabled:opacity-20 disabled:hover:text-gray-300"

                          >

                            <ArrowUp size={12} />

                          </button>

                          <button 

                            onClick={() => moveDeliverable(index, dIndex, 'down')}

                            disabled={dIndex === section.deliverables.length - 1}

                            className="text-gray-300 hover:text-blue-600 disabled:opacity-20 disabled:hover:text-gray-300"

                          >

                            <ArrowDown size={12} />

                          </button>

                          <button

                            onClick={() => togglePageBreak('scope-deliverable', del.id)}

                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${hasPageBreak('scope-deliverable', del.id) ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-300 border-gray-200 hover:text-blue-600'}`}

                            title="Page break before this deliverable"

                          >

                            PB

                          </button>

                        </div>

                        <input

                          type="text"

                          value={del.description}

                          onChange={(e) => updateDeliverable(section.id, del.id, 'description', e.target.value)}

                          placeholder="e.g. Social Media Posts"

                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border"

                        />

                        <input

                          type="number"

                          value={del.quantity}

                          onChange={(e) => updateDeliverable(section.id, del.id, 'quantity', parseInt(e.target.value) || 0)}

                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border"

                        />

                        <button

                          onClick={() => removeDeliverable(section.id, del.id)}

                          className="text-gray-300 hover:text-red-500 ml-1"

                        >

                          <Trash2 size={14} />

                        </button>

                      </div>

                    ))}

                    {section.deliverables.length === 0 && (

                      <p className="text-xs text-gray-400 italic">No deliverables added yet.</p>

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

  
