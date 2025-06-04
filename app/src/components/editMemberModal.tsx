import { ChangeEvent, useState } from 'react';
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
  const [form, setForm] = useState({
    lastName: member.lastName ?? '',
    firstName: member.firstName ?? '',
    email: member.email ?? '',
    phone: member.phone ?? '',
    birthdate: member.birthdate ?? '',
    profession: member.profession ?? '',
    city: member.city ?? '',
    isActive: member.isActive ?? true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    await AdminUserService.update(member.userId, form);
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modifier le membre</h2>

        <div className="space-y-3">
          <input
            name="firstName"
            placeholder="Prénom"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <input
            name="lastName"
            placeholder="Nom"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <input
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <input
            name="birthdate"
            type="date"
            placeholder="Date de naissance"
            value={form.birthdate}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <input
            name="profession"
            placeholder="Profession"
            value={form.profession}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <input
            name="city"
            placeholder="Ville"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Actif
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-4">
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
