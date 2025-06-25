import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type UserDto, UserService } from '@/client-api';
import { isAdmin } from '../utils/auth';
import { EditMemberModal } from '../components/editMemberModal';
import { MemberDetailsModal } from '../components/memberDetailsModal';
import { Pencil } from 'lucide-react';

export function Members() {
  const [members, setMembers] = useState<UserDto[]>([]);
  const [selectedMember, setSelectedMember] = useState<UserDto | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const canEdit = isAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    UserService.findAll().then(setMembers);
  }, []);

  const handleEdit = (member: UserDto) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleCardClick = (member: UserDto) => {
    setSelectedMember(member);
    setShowEditModal(false);
  };

  const handleRedirectToMessages = (member: UserDto) => {
    navigate(`/messagerie?userId=${member.userId}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-mentori-green mb-8">
        Liste des membres
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((membre) => (
          <div
            key={membre.userId}
            onClick={() => handleCardClick(membre)}
            className="group border rounded-xl p-5 bg-white shadow-sm transition hover:ring-2 hover:ring-mentori-green cursor-pointer flex items-center gap-4"
          >
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 shadow-inner">
              {membre.photo ? (
                <img
                  src={membre.photo}
                  alt={`${membre.firstName} ${membre.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-gray-500 font-semibold text-lg uppercase">
                  {(membre.firstName?.[0] || '') + (membre.lastName?.[0] || '')}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-mentori-green leading-tight">
                {membre.firstName} {membre.lastName}
              </h3>
              <p className="text-sm text-gray-600">{membre.profession}</p>
              {membre.city && (
                <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {membre.city}
                </span>
              )}
            </div>

            {canEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(membre);
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="Modifier"
              >
                <Pencil className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        ))}
      </div>

      {showEditModal && selectedMember && (
        <EditMemberModal
          member={selectedMember}
          onClose={() => setShowEditModal(false)}
          onSave={() => {
            setShowEditModal(false);
            UserService.findAll().then(setMembers);
          }}
        />
      )}

      {selectedMember && !showEditModal && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onSendMessage={handleRedirectToMessages}
        />
      )}
    </div>
  );
}
