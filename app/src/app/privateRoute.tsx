import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OpenAPI, UserService } from '@/client-api';

export function PrivateRoute({ isAdmin = false }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

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
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        setUserIsAdmin(user.roles.includes('admin'));
      })
      .catch(() => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAdmin]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && !userIsAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
