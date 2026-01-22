import React from 'react';
import { useProposal } from '../../hooks/useProposal';

export const SignOffForm: React.FC = () => {
  const { proposal, updateSection } = useProposal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    updateSection('signOff', { ...proposal.signOff, [e.target.name]: value });
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Final Page Details</h3>
        <div className="space-y-6">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              id="showSignatures"
              name="showSignatures"
              checked={proposal.signOff.showSignatures}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showSignatures" className="text-sm font-semibold text-gray-900">
              Include Signature Blocks
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Disclaimer</label>
            <textarea
              name="disclaimer"
              rows={3}
              value={proposal.signOff.disclaimer}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="e.g. This proposal is confidential..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Agency Website</label>
              <input
                type="text"
                name="website"
                value={proposal.signOff.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="www.agency.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Social Handles</label>
              <input
                type="text"
                name="socials"
                value={proposal.signOff.socials}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                placeholder="@agency"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
