import React, { useState } from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Plus, Trash2, IndianRupee, Calculator, AlertCircle, FunctionSquare } from 'lucide-react';
import { PageBreakTargetType, CostItem } from '../../types';
import { PricingCalculator } from './PricingCalculator';
import {
  calculateItemRate,
  extractFormulaVariables,
  validateFormulaSyntax,
} from '../../utils/pricingEngine';

export const CostingForm: React.FC = () => {
  const { proposal, updateSection, updateProposal } = useProposal();
  const [showPricingCalculator, setShowPricingCalculator] = useState(false);
  

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
    value: string | number | boolean
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

  const toggleFormulaMode = (sectionId: string, itemId: string) => {
    const updated = proposal.costing.map((s) => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.map((i) => {
            if (i.id === itemId) {
              const newUseFormula = !i.useFormula;
              // If turning on formula mode, set a default formula
              const newFormula = newUseFormula && !i.formula
                ? proposal.pricingVariables?.[0]
                  ? `{${proposal.pricingVariables[0].key}} * 1000`
                  : '{videos} * 1000'
                : i.formula;
              return { ...i, useFormula: newUseFormula, formula: newFormula };
            }
            return i;
          }),
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

  const getItemDisplayRate = (item: CostItem): number => {
    if (item.useFormula && item.formula) {
      const result = calculateItemRate(item, proposal.pricingVariables || []);
      return result.rate;
    }
    return item.rate;
  };

  const calculateSectionTotal = (section: typeof proposal.costing[0]) => {
    return section.items.reduce((acc, item) => {
      const rate = getItemDisplayRate(item);
      return acc + item.quantity * rate;
    }, 0);
  };

  const grandTotal = proposal.costing.reduce(
    (acc, section) => acc + calculateSectionTotal(section),
    0
  );

  const getUsedVariables = (formula: string): string[] => {
    return extractFormulaVariables(formula);
  };

  const getVariableValue = (key: string): number => {
    const variable = proposal.pricingVariables?.find((v) => v.key === key);
    return variable?.value ?? 0;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Commercial Proposal</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Break down the costs by category.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPricingCalculator(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Calculator size={16} />
            Pricing Variables
          </button>
          <button
            onClick={addSection}
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Cost Category
          </button>
        </div>
      </div>

      <div className="space-y-10">
        {proposal.costing.map((section) => (
          <div key={section.id} className="relative">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                placeholder="Category Title (e.g. Website Development)"
                className="text-lg font-bold text-gray-900 dark:text-white border-0 p-0 focus:ring-0 w-full placeholder:text-gray-300 dark:placeholder:text-gray-600 bg-transparent"
              />
              <button
                onClick={() => togglePageBreak('costing-category', section.id)}
                className={`text-[10px] font-bold px-2 py-1 rounded border mr-2 ${hasPageBreak('costing-category', section.id) ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-400 border-gray-200 hover:text-blue-600'}`}
                title="Page break before this category"
              >
                PB
              </button>
              <button
                onClick={() => removeSection(section.id)}
                className="text-gray-400 hover:text-red-500 ml-4"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="py-2 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Item Description</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase w-20">Qty</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase w-40">Rate (INR)</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase w-32">Total</th>
                  <th className="pl-3 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {section.items.map((item) => {
                  const displayRate = getItemDisplayRate(item);
                  const validation = item.formula ? validateFormulaSyntax(item.formula) : { valid: true };
                  const usedVars = item.formula ? getUsedVariables(item.formula) : [];
                  

                  return (
                    <tr key={item.id} className="group">
                      <td className="py-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                          placeholder="Item name or description"
                          className="w-full text-sm border-0 p-0 focus:ring-0 text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 bg-transparent"
                        />
                        {/* Formula indicator */}
                        {item.useFormula && item.formula && (
                          <div className="mt-1 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] rounded">
                              <FunctionSquare size={10} />
                              Formula
                            </span>
                            {!validation.valid && (
                              <span className="text-[10px] text-red-500 flex items-center gap-1">
                                <AlertCircle size={10} />
                                {validation.error}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(section.id, item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-full text-sm border-0 p-0 text-right focus:ring-0 text-gray-700 dark:text-gray-200 bg-transparent"
                        />
                      </td>
                      <td className="px-3 py-3">
                        {item.useFormula ? (
                          <div className="space-y-2">
                            {/* Formula Input */}
                            <div className="relative">
                              <input
                                type="text"
                                value={item.formula || ''}
                                onChange={(e) => updateItem(section.id, item.id, 'formula', e.target.value)}
                                
                                placeholder="{videos} * 5000"
                                className={`w-full text-xs font-mono border rounded px-2 py-1.5 ${
                                  validation.valid
                                    ? 'border-purple-200 dark:border-purple-800 focus:border-purple-500 focus:ring-purple-500'
                                    : 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                } dark:bg-gray-700 dark:text-gray-200`}
                              />
                              <FunctionSquare className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-purple-400" />
                            </div>
                            
                            {/* Variable badges */}
                            {usedVars.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {usedVars.map((varKey) => {
                                  const varValue = getVariableValue(varKey);
                                  const variable = proposal.pricingVariables?.find((v) => v.key === varKey);
                                  return (
                                    <span
                                      key={varKey}
                                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                                        variable
                                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                      }`}
                                      title={variable ? `${variable.name} = ${varValue}` : 'Variable not defined'}
                                    >
                                      {'{' + varKey + '}'} = {varValue}
                                    </span>
                                  );
                                })}
                              </div>
                            )}

                            {/* Calculated result */}
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end gap-2">
                              <span>Calculated:</span>
                              <span className="font-mono font-semibold text-purple-600 dark:text-purple-400">
                                {displayRate.toLocaleString('en-IN')}
                              </span>
                            </div>

                            {/* Toggle to manual */}
                            <button
                              onClick={() => toggleFormulaMode(section.id, item.id)}
                              className="text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
                            >
                              Switch to manual entry
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateItem(section.id, item.id, 'rate', parseInt(e.target.value) || 0)}
                              className="w-full text-sm border-0 p-0 text-right focus:ring-0 text-gray-700 dark:text-gray-200 font-mono bg-transparent"
                            />
                            {/* Toggle to formula */}
                            <button
                              onClick={() => toggleFormulaMode(section.id, item.id)}
                              className="text-[10px] text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
                            >
                              <FunctionSquare size={10} />
                              Use formula
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white font-mono">
                        {(item.quantity * displayRate).toLocaleString('en-IN')}
                      </td>
                      <td className="pl-3 py-3 text-right">
                        <button
                          onClick={() => togglePageBreak('costing-item', item.id)}
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded border mr-2 ${hasPageBreak('costing-item', item.id) ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-300 border-gray-200 hover:text-blue-600'}`}
                          title="Page break before this item"
                        >
                          PB
                        </button>
                        <button
                          onClick={() => removeItem(section.id, item.id)}
                          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} className="py-2">
                    <button
                      onClick={() => addItem(section.id)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                    >
                      + Add Line Item
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="pt-4 text-right text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">Category Total</td>
                  <td className="pt-4 text-right text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
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
        <div className="mt-12 bg-gray-900 dark:bg-gray-800 rounded-xl p-8 text-white flex justify-between items-center shadow-lg">
          <div>
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Cost</h4>
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

      {/* Pricing Calculator Modal */}
      <PricingCalculator
        isOpen={showPricingCalculator}
        onClose={() => setShowPricingCalculator(false)}
      />
    </div>
  );
};
