import { useState } from 'react';
import { type UserDto, AdminUserService } from '@/client-api';

export function EditMemberModal({
  member,
  onClose,
  onSave,
}: {
  member: UserDto;
  onClose: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState(member.name);

  const handleSubmit = async () => {
    console.log(member);
    await AdminUserService.update(member.userId, { name });
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modifier le membre</h2>
        <input
          className="w-full border rounded p-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
