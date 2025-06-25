import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { type UserDto, UserService } from '@/client-api';

export function Profile() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    avatar: null as File | null,
    previewUrl: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    UserService.me().then((user) => {
      setUser(user);
      setForm({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        birthdate: user.birthdate ? user.birthdate.substring(0, 10) : '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        city: user.city ?? '',
        profession: user.profession ?? '',
        avatar: null,
        previewUrl: user.photo ?? '',
      });
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files?.[0]) {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        avatar: file,
        previewUrl: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!user) return;

    try {
      await UserService.updateMe({
        ...form,
        birthdate: form.birthdate
          ? new Date(form.birthdate).toISOString()
          : null,
        avatar: form.avatar || undefined,
      });
      setSuccess(true);
      const updated = await UserService.me();
      setUser(updated);
    } catch {
      setError('Erreur lors de la mise à jour du profil.');
    }
  };

  if (!user) return <p>Chargement du profil...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-2 space-y-4">
      {success && (
        <div className="bg-green-100 text-green-700 border border-green-400 rounded px-4 py-2 text-sm">
          Profil mis à jour
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 rounded px-4 py-2 text-sm">
          {error}
        </div>
      )}

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
        type="tel"
        placeholder="Téléphone"
        value={form.phone}
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
      <input
        name="profession"
        placeholder="Profession"
        value={form.profession}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <label className="block">Photo de profil</label>
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleChange}
        className="w-full border p-2"
      />
      {form.previewUrl && (
        <img
          src={form.previewUrl}
          alt="Aperçu"
          className="mt-2 max-h-40 rounded"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enregistrer
      </button>
    </form>
  );
}
