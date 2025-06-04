import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';
import { OpenAPI } from '@/client-api';
import { Register } from '../pages/register';
import { Members } from '../pages/members';

OpenAPI.BASE = process.env.REACT_APP_SERVER_URL as string;

export function App() {
  console.log(process.env.REACT_APP_SERVER_URL);
  return (
    <Routes>
      <Route path="/" element={<Members />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
