import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthService } from '@/client-api';

export function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    AuthService.register(form)
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setError('Erreur d’inscription');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-xl">Créer un compte</h1>

      {success && <p className="text-green-600">Inscription réussie</p>}
      {error && <p className="text-red-500">{error}</p>}

      <input
        name="name"
        type="text"
        placeholder="Nom"
        value={form.name}
        onChange={handleChange}
        required
        minLength={3}
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
        name="password"
        type="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <button type="submit" className="w-full bg-blue-500 text-white p-2">
        S'inscrire
      </button>
    </form>
  );
}
