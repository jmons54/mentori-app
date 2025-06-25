import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';
import { OpenAPI } from '@/client-api';
import { Register } from '../pages/register';
import { Members } from '../pages/members';
import { PrivateRoute } from './privateRoute';
import { ConnectedLayout } from './connectedLayout';
import { Profile } from '../pages/profil';
import { Messageries } from '../pages/messageries';
import { Events } from '../pages/events';
import { AdminLayout } from './adminLayout';
import { CreateNews } from '../pages/createNews';
import { News } from '../pages/news';
import { Home } from '../pages/home';

OpenAPI.BASE = process.env.REACT_APP_SERVER_URL as string;

export function App() {
  return (
    <Routes>
      <Route path="/admin" element={<PrivateRoute isAdmin={true} />}>
        <Route element={<AdminLayout />}>
          <Route path="news/create" element={<CreateNews />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<ConnectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/messagerie" element={<Messageries />} />
          <Route path="/news" element={<News />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
