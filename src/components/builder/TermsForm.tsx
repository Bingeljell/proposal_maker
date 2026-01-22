import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { RichTextEditor } from '../ui/RichTextEditor';

export const TermsForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Terms & Conditions</h3>
        <p className="text-sm text-gray-500 mb-4">Finalize the legal and operational terms.</p>
        <RichTextEditor
          value={proposal.terms}
          onChange={(value) => updateSection('terms', value)}
          className="min-h-[400px]"
        />
      </div>
    </div>
  );
};
