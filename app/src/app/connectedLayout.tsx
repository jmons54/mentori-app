import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, MessageSquare, Users } from 'lucide-react';
import logo from '../assets/logo-3.png';

export function ConnectedLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const logout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-6" />
        </div>

        <div className="flex items-center space-x-6">
          <nav className="space-x-4 hidden md:block">
            <Link to="/members" className="hover:underline">
              Membres
            </Link>
            <Link to="/events" className="hover:underline">
              Événements
            </Link>
            <Link to="/messagerie" className="hover:underline">
              Messages
            </Link>
          </nav>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-sm font-medium uppercase">
                  {(user.firstName?.[0] || '') + (user.lastName?.[0] || '') ||
                    '?'}
                </div>
              )}
              <ChevronDown className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profil
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 pb-20 md:pb-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-100 bg-white border-t border-gray-200 flex justify-around items-center py-2 shadow-md md:hidden">
        <Link
          to="/members"
          className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
        >
          <Users className="h-5 w-5 mb-1" />
          Membres
        </Link>
        <Link
          to="/events"
          className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
        >
          <Calendar className="h-5 w-5 mb-1" />
          Événements
        </Link>
        <Link
          to="/messagerie"
          className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600"
        >
          <MessageSquare className="h-5 w-5 mb-1" />
          Messages
        </Link>
      </nav>
    </div>
  );
}
