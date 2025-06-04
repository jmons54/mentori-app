import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthService } from '@/client-api';

export function Register() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await AuthService.register({
        ...form,
        birthdate: new Date(form.birthdate).toISOString(),
      });
      setSuccess(true);
    } catch {
      setError('Erreur d’inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-semibold">Créer un compte</h1>

      {success && <p className="text-green-600">Inscription réussie</p>}
      {error && <p className="text-red-500">{error}</p>}

      {step === 1 && (
        <>
          <input
            name="firstName"
            placeholder="Prénom"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
          <input
            name="lastName"
            placeholder="Nom"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
          <input
            name="birthdate"
            type="date"
            placeholder="Date de naissance"
            value={form.birthdate}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </>
      )}

      {step === 2 && (
        <>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </>
      )}

      {step === 3 && (
        <>
          <input
            name="city"
            placeholder="Ville"
            value={form.city}
            onChange={handleChange}
            className="w-full border p-2"
          />
          <input
            name="profession"
            placeholder="Profession"
            value={form.profession}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </>
      )}

      {step === 4 && (
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
      )}

      <div className="flex justify-between pt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Précédent
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            S'inscrire
          </button>
        )}
      </div>
    </form>
  );
}
