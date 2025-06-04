import { useEffect, useState } from 'react';
import { type UserDto, UserService } from '@/client-api';

export function Members() {
  const [members, setMembers] = useState<UserDto[]>([]);

  useEffect(() => {
    UserService.findAll().then((response) => {
      setMembers(response);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Liste des membres</h1>
      <ul className="space-y-2">
        {members.map((member) => (
          <li key={member.userId} className="border p-4 rounded shadow-sm">
            <strong>{member.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
