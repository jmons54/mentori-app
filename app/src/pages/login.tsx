import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, OpenAPI } from '@/client-api';
import { GoogleLogin } from '@react-oauth/google';

export function Login() {
  const navigate = useNavigate();
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
      .then(({ accessToken }) => {
        OpenAPI.TOKEN = accessToken;
        localStorage.setItem('jwt', accessToken);
        navigate('/');
      })
      .catch(() => {
        setError('Identifiants invalides');
      });
  };

  const handleLoginGoogle = (idToken: string) => {
    setError('');
    AuthService.googleAuth({
      idToken,
    })
      .then(({ accessToken }) => {
        OpenAPI.TOKEN = accessToken;
        localStorage.setItem('jwt', accessToken);
        navigate('/');
      })
      .catch(() => {
        setError('Une erreur est survenue');
      });
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl mb-4">Connexion</h1>
      <GoogleLogin
        onSuccess={({ credential }) => {
          handleLoginGoogle(credential as string);
        }}
        onError={() => {
          setError('Impossible de se connecter');
        }}
      />
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
