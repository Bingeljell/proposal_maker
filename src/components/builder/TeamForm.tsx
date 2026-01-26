import React from 'react';
import { useProposal } from '../../hooks/useProposal';
import { Plus, Trash2, User, Upload, ArrowUp, ArrowDown } from 'lucide-react';

export const TeamForm: React.FC = () => {
  const { proposal, updateSection, updateProposal } = useProposal();

  const hasPageBreak = (targetType: string, targetId: string) =>
    proposal.pageBreaks?.some((b) => b.targetType === targetType && b.targetId === targetId);

  const togglePageBreak = (targetType: string, targetId: string) => {
    const pageBreaks = proposal.pageBreaks || [];
    const existing = pageBreaks.find((b) => b.targetType === targetType && b.targetId === targetId);
    const updated = existing
      ? pageBreaks.filter((b) => b.id !== existing.id)
      : [...pageBreaks, { id: crypto.randomUUID(), targetType, targetId }];
    updateProposal({ pageBreaks: updated });
  };

  const moveMember = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === proposal.team.length - 1)) return;
    
    const newTeam = [...proposal.team];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newTeam[index], newTeam[swapIndex]] = [newTeam[swapIndex], newTeam[index]];
    
    updateSection('team', newTeam);
  };

  const addMember = () => {
    const newMember = {
      id: crypto.randomUUID(),
      name: '',
      role: '',
      allocation: 100,
      description: '',
      image: null,
    };
    updateSection('team', [...proposal.team, newMember]);
  };

  const removeMember = (id: string) => {
    updateSection('team', proposal.team.filter((m) => m.id !== id));
  };

  const updateMember = (id: string, field: string, value: string | number | null) => {
    const updated = proposal.team.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    );
    updateSection('team', updated);
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateMember(id, 'image', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Proposed Team Structure</h3>
          <p className="text-sm text-gray-500">Resource allocation and roles.</p>
        </div>
        <button
          onClick={addMember}
          className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {proposal.team.map((member, index) => (
          <div key={member.id} className="border border-gray-200 rounded-lg p-6 bg-white relative group shadow-sm flex gap-6 items-start">
             {/* Ordering Column */}
             <div className="flex flex-col gap-1 pt-2">
                <button 
                  onClick={() => moveMember(index, 'up')}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 p-1 bg-gray-50 rounded"
                >
                  <ArrowUp size={14} />
                </button>
                <button 
                  onClick={() => moveMember(index, 'down')}
                  disabled={index === proposal.team.length - 1}
                  className="text-gray-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-400 p-1 bg-gray-50 rounded"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  onClick={() => togglePageBreak('team-member', member.id)}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${hasPageBreak('team-member', member.id) ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-400 border-gray-200 hover:text-blue-600'}`}
                  title="Page break before this member"
                >
                  PB
                </button>
             </div>

             {/* Image Column */}
            <div className="flex-shrink-0 relative">
              {member.image ? (
                <img src={member.image} alt={member.name} className="h-24 w-24 rounded-full object-cover border border-gray-200" />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                  <User size={40} />
                </div>
              )}
              <label className="absolute -bottom-1 -right-1 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm cursor-pointer hover:bg-gray-50">
                <Upload size={14} className="text-gray-600" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(member.id, e)}
                />
              </label>
            </div>
            
            {/* Fields Column */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                    placeholder="Full Name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => updateMember(member.id, 'role', e.target.value)}
                    placeholder="e.g. Senior Copywriter"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Time Allocation (%)</label>
                <div className="flex items-center gap-4">
                   <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={member.allocation}
                    onChange={(e) => updateMember(member.id, 'allocation', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">{member.allocation}%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Role Description</label>
                <textarea
                  value={member.description}
                  onChange={(e) => updateMember(member.id, 'description', e.target.value)}
                  placeholder="Key responsibilities..."
                  rows={2}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <button
              onClick={() => removeMember(member.id)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {proposal.team.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-sm text-gray-400">No team members added yet.</p>
        </div>
      )}
    </div>
  );
};
