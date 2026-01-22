import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { RichTextEditor } from '../ui/RichTextEditor';

export const SummaryForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();

  const handleSummaryChange = (value: string) => {
    updateSection('execSummary', { ...proposal.execSummary, summary: value });
  };

  const handleObjectivesChange = (value: string) => {
    updateSection('execSummary', { ...proposal.execSummary, objectives: value });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Executive Summary</label>
        </div>
        <div className="mt-1">
          <RichTextEditor
            value={proposal.execSummary.summary}
            onChange={handleSummaryChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          This is the primary text block that introduces the proposal to the client.
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Key Objectives</label>
        </div>
        <div className="mt-1">
          <RichTextEditor
            value={proposal.execSummary.objectives}
            onChange={handleObjectivesChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          List the specific goals this proposal aims to achieve.
        </p>
      </div>
    </div>
  );
};