import { useEffect, useState } from 'react';
import { type UserDto, UserService } from '@/client-api';
import { EditMemberModal } from '../components/editMemberModal';
import { isAdmin } from '../utils/auth';

export function Members() {
  const [members, setMembers] = useState<UserDto[]>([]);
  const [selectedMember, setSelectedMember] = useState<UserDto | null>(null);
  const [showModal, setShowModal] = useState(false);

  const canEdit = isAdmin();

  useEffect(() => {
    UserService.findAll().then(setMembers);
  }, []);

  const handleEdit = (member: UserDto) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Liste des membres</h1>
      <ul className="space-y-2">
        {members.map((member) => (
          <li
            key={member.userId}
            className="border p-4 rounded shadow-sm flex justify-between items-center"
          >
            <strong>{member.name}</strong>
            {canEdit && (
              <button
                onClick={() => handleEdit(member)}
                className="text-blue-600 underline text-sm"
              >
                Modifier
              </button>
            )}
          </li>
        ))}
      </ul>

      {showModal && selectedMember && (
        <EditMemberModal
          member={selectedMember}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            UserService.findAll().then(setMembers);
          }}
        />
      )}
    </div>
  );
}
