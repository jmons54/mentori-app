import { Link } from 'react-router-dom';
import { Users, Calendar, MessageCircle, Newspaper } from 'lucide-react';

const items = [
  {
    label: 'Membres',
    description: 'Annuaire des membres du club',
    icon: Users,
    color: 'bg-pastel-blue',
    to: '/members',
  },
  {
    label: 'Événements',
    description: 'Calendrier des événements à venir',
    icon: Calendar,
    color: 'bg-pastel-green',
    to: '/events',
  },
  {
    label: 'Messagerie',
    description: "Échangez avec d'autres membres",
    icon: MessageCircle,
    color: 'bg-pastel-pink',
    to: '/messagerie',
  },
  {
    label: "Fil d'actualité",
    description: 'Actualités du club et des membres',
    icon: Newspaper,
    color: 'bg-pastel-orange',
    to: '/news',
  },
];

export function Home() {
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-mentori-green mb-8">
        Bienvenue chez{' '}
        <span className="text-mentori-orange">Mentori Club Immo</span>
      </h1>

      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(({ label, description, icon: Icon, color, to }) => (
            <Link to={to} key={label} className="block">
              <div
                className={`rounded-xl p-5 h-full text-center shadow-sm hover:shadow-md transition-all duration-200 ease-in-out ${color}`}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow">
                    <Icon className="h-6 w-6 text-mentori-green" />
                  </div>
                  <h3 className="text-mentori-green font-semibold">{label}</h3>
                  <p className="text-xs text-mentori-green/80 hidden md:block">
                    {description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-mentori-green mb-4">
          Prochains événements
        </h2>
        <div className="space-y-4">
          {[
            {
              title: 'Conférence Investir dans les SCPI',
              date: '28 avril 2025 • Paris',
            },
            {
              title: 'Networking Investisseurs Bordelais',
              date: '5 mai 2025 • Bordeaux',
            },
          ].map((event) => (
            <div
              key={event.title}
              className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-mentori-green">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
                <button className="bg-mentori-orange text-white text-sm font-medium px-4 py-2 rounded hover:bg-mentori-orange/90 transition-colors">
                  Réserver
                </button>
              </div>
            </div>
          ))}

          <div className="text-center mt-4">
            <Link
              to="/events"
              className="text-sm text-mentori-orange hover:underline font-medium"
            >
              Voir tous les événements →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
