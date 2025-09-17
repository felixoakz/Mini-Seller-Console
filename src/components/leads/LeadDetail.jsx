import { useState, useEffect } from 'react';
import { useData } from '../../hooks/useData';

const LeadDetail = ({ lead, onClose }) => {
  const { dispatch } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(lead);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(lead);
    setError('');
    setIsEditing(false);
  }, [lead]);

  if (!lead) return null;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSave = async () => {
    if (!validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    const originalLead = lead;
    const updatedLead = formData;

    // Optimistic update
    dispatch({ type: 'UPDATE_LEAD', payload: updatedLead });
    onClose();

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simulate a random failure
      if (Math.random() < 0.2) {
        throw new Error('Failed to save lead.');
      }
      // On success, the optimistic update is already correct.
    } catch (error) {
      // Rollback on failure
      dispatch({ type: 'UPDATE_LEAD', payload: originalLead });
      // Here you would typically show a notification to the user
      console.error(error.message);
    }
  };

  const handleCancel = () => {
    setFormData(lead);
    setIsEditing(false);
    onClose();
  };

  const handleConvert = () => {
    dispatch({ type: 'CONVERT_LEAD', payload: lead });
    onClose();
  };

  return (
    <div>
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold mb-4">{lead.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <p>{lead.company}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{lead.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          {isEditing ? (
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              {/* Assuming some statuses */}
              {['New', 'Contacted', 'Qualified', 'Unqualified'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          ) : (
            <p>{lead.status}</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleConvert}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          disabled={isEditing}
        >
          Convert Lead
        </button>
        <div className="space-x-4">

          {isEditing ? (
            <>
              <button onClick={handleCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </>
          ) : (
            <button onClick={handleEditToggle} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
          )}

        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
