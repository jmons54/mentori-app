import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, OpenAPI } from '@/client-api';
import logo from '../assets/logo-1.png';

export function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    AuthService.auth({ identifier, password })
      .then(({ accessToken }) => {
        OpenAPI.TOKEN = accessToken;
        localStorage.setItem('jwt', accessToken);
        navigate('/');
      })
      .catch(() => {
        setError('Identifiants invalides');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-400 rounded px-4 py-2 mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email ou identifiant
          </label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="@email.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
