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
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Liste des membres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((membre) => (
          <div
            key={membre.userId}
            className="border rounded-lg shadow-md p-4 flex gap-4 items-center"
          >
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              {membre.photo ? (
                <img
                  src={membre.photo}
                  alt={`${membre.firstName} ${membre.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
                  ?
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-mentori-green">
                {membre.firstName} {membre.lastName}
              </h3>
              <p className="text-sm text-gray-600">{membre.profession}</p>
              {membre.city && (
                <div className="mt-1 text-xs px-2 py-0.5 bg-pastel-blue inline-block rounded-full">
                  {membre.city}
                </div>
              )}
            </div>

            {canEdit && (
              <button
                onClick={() => handleEdit(membre)}
                className="text-sm text-blue-600 underline ml-2"
              >
                Modifier
              </button>
            )}
          </div>
        ))}
      </div>

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
