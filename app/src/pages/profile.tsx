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
    <div className="max-w-xl mx-auto mt-4 sm:mt-8 px-2 sm:px-4">
      <h1 className="text-2xl font-semibold text-center text-mentori-green mb-4 sm:mb-6">
        Mon Profil
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-5 sm:p-6 space-y-5 border border-gray-200"
      >
        {success && (
          <div className="bg-green-100 text-green-800 border border-green-300 rounded px-4 py-2 text-sm">
            ✅ Profil mis à jour
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 border border-red-300 rounded px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="Prénom"
            value={form.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mentori-green"
          />
          <input
            name="lastName"
            placeholder="Nom"
            value={form.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mentori-green"
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mentori-green"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Téléphone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mentori-green"
        />

        <input
          name="city"
          placeholder="Ville"
          value={form.city}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mentori-green"
        />

        <input
          name="profession"
          placeholder="Profession"
          value={form.profession}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mentori-green"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo de profil
          </label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {form.previewUrl && (
            <img
              src={form.previewUrl}
              alt="Aperçu"
              className="mt-4 max-h-40 rounded-md object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-mentori-green text-white py-2 px-4 rounded hover:bg-mentori-green/90 transition"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
