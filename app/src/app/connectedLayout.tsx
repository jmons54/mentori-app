import { Link, Outlet, useNavigate } from 'react-router-dom';

export function ConnectedLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="https://mentori-club.com/wp-content/uploads/2024/11/cropped-Logo-rond-1-101x101.png"
            alt="Logo"
            className="h-8"
          />
          <span>Mentori</span>
        </div>
        <div className="flex items-center space-x-8">
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">
              Membres
            </Link>
            <Link to="/events" className="hover:underline">
              Événements
            </Link>
            <Link to="/messagerie" className="hover:underline">
              Messages
            </Link>
            <Link to="/profile" className="hover:underline">
              Profil
            </Link>
          </nav>
          <button
            onClick={logout}
            className="text-sm bg-red-500 px-3 py-1 rounded"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
