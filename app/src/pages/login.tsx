import { FormEvent, useState } from 'react';
import { AuthService } from '@/client-api';

export function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    AuthService.auth({
      identifier,
      password,
    })
      .then(() => {
        window.location.href = '/dashboard'; // à adapter
      })
      .catch((err) => {
        setError(err.message || 'Identifiants invalides');
      });
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl mb-4">Connexion</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Email ou identifiant"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Se connecter
      </button>
    </form>
  );
}
