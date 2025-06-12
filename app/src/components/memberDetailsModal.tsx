import { Modal } from './modal';
import { type UserDto } from '@/client-api';
import { Mail, Phone } from 'lucide-react';

export function MemberDetailsModal({
  member,
  onClose,
}: {
  member: UserDto | null;
  onClose: () => void;
}) {
  if (!member) return null;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
          {member.photo ? (
            <img
              src={member.photo}
              alt={`${member.firstName} ${member.lastName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm bg-gray-100">
              ?
            </div>
          )}
        </div>

        <h2 className="text-xl font-futura text-mentori-green mb-1">
          {member.firstName} {member.lastName}
        </h2>

        {member.profession && (
          <p className="text-sm text-gray-600 mb-2">{member.profession}</p>
        )}

        {member.city && (
          <span className="text-xs px-2 py-0.5 bg-pastel-blue rounded-full mb-2">
            {member.city}
          </span>
        )}

        <div className="w-full mt-6 space-y-2">
          {member.email && (
            <div className="flex items-center text-sm">
              <Mail size={16} className="mr-2 text-mentori-green" />
              <span>{member.email}</span>
            </div>
          )}

          {member.phone && (
            <div className="flex items-center text-sm">
              <Phone size={16} className="mr-2 text-mentori-green" />
              <span>{member.phone}</span>
            </div>
          )}
        </div>

        <button className="mentori-btn mt-6 w-full">Envoyer un message</button>
      </div>
    </Modal>
  );
}
