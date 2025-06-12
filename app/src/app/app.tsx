import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';
import { OpenAPI } from '@/client-api';
import { Register } from '../pages/register';
import { Members } from '../pages/members';
import { PrivateRoute } from './privateRoute';
import { ConnectedLayout } from './connectedLayout';
import { Profile } from '../pages/profil';

OpenAPI.BASE = process.env.REACT_APP_SERVER_URL as string;

export function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<ConnectedLayout />}>
          <Route path="/" element={<Members />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
