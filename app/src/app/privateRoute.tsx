import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OpenAPI, UserService } from '@/client-api';

export function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    OpenAPI.TOKEN = token;

    UserService.me()
      .then((user) => {
        setAuthenticated(true);
        localStorage.setItem('userId', user.userId.toString());
      })
      .catch(() => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
