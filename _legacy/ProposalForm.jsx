import { useState } from 'react';

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    objective: '',
    services: [],
    commercial_proposal: [{ service: '', quantity: '', price: '', comments: '' }],
  });

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section === 'commercial_proposal') {
      const updated = [...formData.commercial_proposal];
      updated[index][name] = value;
      setFormData({ ...formData, commercial_proposal: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addCommercialRow = () => {
    setFormData({
      ...formData,
      commercial_proposal: [...formData.commercial_proposal, { service: '', quantity: '', price: '', comments: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to Flask API for JSON generation and LLM processing
    console.log('Submitting:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create New Proposal</h1>
      <form onSubmit={handleSubmit}>
        {/* Client Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Client Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={(e) => handleInputChange(e, 'client_details')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Objective</label>
            <textarea
              name="objective"
              value={formData.objective}
              onChange={(e) => handleInputChange(e, 'client_details')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            />
          </div>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Services</label>
            <select
              multiple
              name="services"
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: Array.from(e.target.selectedOptions, option => option.value) })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Social Media">Social Media</option>
              <option value="Performance Creatives">Performance Creatives</option>
              <option value="Branding">Branding</option>
              {/* Add other services */}
            </select>
          </div>
          {formData.services.includes('Social Media') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Social Media Platforms</label>
              <div className="mt-1 flex gap-4">
                <label><input type="checkbox" value="Facebook" /> Facebook</label>
                <label><input type="checkbox" value="Instagram" /> Instagram</label>
                <label><input type="checkbox" value="X" /> X</label>
              </div>
            </div>
          )}
        </div>

        {/* Commercial Proposal */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Commercial Proposal</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Service</th>
                <th className="border p-2 text-left">Quantity</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2 text-left">Comments</th>
              </tr>
            </thead>
            <tbody>
              {formData.commercial_proposal.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">
                    <select
                      name="service"
                      value={row.service}
                      onChange={(e) => handleInputChange(e, 'commercial_proposal', index)}
                      className="w-full border-gray-300 rounded-md"
                    >
                      <option value="">Select Service</option>
                      {formData.services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="quantity"
                      value={row.quantity}
                      onChange={(e) => handleInputChange(e, 'commercial_proposal', index)}
                      className="w-full border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="price"
                      value={row.price}
                      onChange={(e) => handleInputChange(e, 'commercial_proposal', index)}
                      className="w-full border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border p-2">
                    <textarea
                      name="comments"
                      value={row.comments}
                      onChange={(e) => handleInputChange(e, 'commercial_proposal', index)}
                      className="w-full border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addCommercialRow}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Service
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit Proposal
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProposalForm;