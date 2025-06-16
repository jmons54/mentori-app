import { Link, Outlet, useNavigate } from 'react-router-dom';

export function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="https://mentori-club.com/wp-content/uploads/2024/11/cropped-Logo-rond-1-101x101.png"
            alt="Logo"
            className="h-8"
          />
          <span className="text-lg font-semibold">Admin - Mentori</span>
        </div>
        <div className="flex items-center space-x-8">
          <nav className="space-x-4">
            <Link to="/admin/news/create" className="hover:underline">
              Créer une news
            </Link>
            <Link to="/admin/news" className="hover:underline">
              Liste des news
            </Link>
          </nav>
          <button
            onClick={logout}
            className="text-sm bg-red-600 px-3 py-1 rounded"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="flex-grow p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
