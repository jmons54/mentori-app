import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';
import { OpenAPI } from '@/client-api';
import { Register } from '../pages/register';
import { Members } from '../pages/members';
import { PrivateRoute } from './privateRoute';

OpenAPI.BASE = process.env.REACT_APP_SERVER_URL as string;
console.log(process.env.REACT_APP_SERVER_URL);

export function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Members />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
