import { useState } from 'react';

interface Member {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export function Members() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'Julien',
      email: '@',
    },
  ]);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Liste des membres</h1>
      <ul className="space-y-2">
        {members.map((member) => (
          <li key={member.id} className="border p-4 rounded shadow-sm">
            <strong>{member.name}</strong>
            <br />
            {member.email && <span>Email: {member.email}</span>}
            <br />
            {member.phone && <span>Téléphone: {member.phone}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
