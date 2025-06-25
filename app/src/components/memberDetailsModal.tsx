import { type UserDto } from '@/client-api';
import { Mail, Phone } from 'lucide-react';
import { Modal } from './modal';

export function MemberDetailsModal({
  member,
  onClose,
  onSendMessage,
}: {
  member: UserDto | null;
  onClose: () => void;
  onSendMessage?: (member: UserDto) => void;
}) {
  if (!member) return null;

  const initials = (member.firstName?.[0] || '') + (member.lastName?.[0] || '');

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center text-center p-4">
        <div className="h-24 w-24 rounded-full overflow-hidden mb-4 shadow-sm bg-gray-100">
          {member.photo ? (
            <img
              src={member.photo}
              alt={`${member.firstName} ${member.lastName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-500 text-xl font-semibold uppercase">
              {initials}
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold text-mentori-green mb-1">
          {member.firstName} {member.lastName}
        </h2>

        {member.profession && (
          <p className="text-gray-800 mb-2">{member.profession}</p>
        )}

        {member.city && (
          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full mb-3">
            {member.city}
          </span>
        )}

        <div className="w-full mt-4 space-y-2 text-sm">
          {member.email && (
            <div className="flex items-center justify-center text-gray-900">
              <Mail size={16} className="mr-2" />
              {member.email}
            </div>
          )}

          {member.phone && (
            <div className="flex items-center justify-center text-gray-900">
              <Phone size={16} className="mr-2" />
              {member.phone}
            </div>
          )}
        </div>

        {onSendMessage && (
          <button
            onClick={() => onSendMessage(member)}
            className="mt-6 w-full bg-orange-400 text-white font-medium py-2 px-4 rounded-md hover:bg-orange-500 transition-colors"
          >
            Envoyer un message
          </button>
        )}
      </div>
    </Modal>
  );
}
