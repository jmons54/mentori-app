import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthService } from '@/client-api';

const steps = [
  { key: 'firstName', question: 'Quel est ton prénom ?', type: 'text' },
  { key: 'lastName', question: 'Et ton nom de famille ?', type: 'text' },
  { key: 'email', question: 'Ton adresse email ?', type: 'email' },
  { key: 'phone', question: 'Ton numéro de téléphone ?', type: 'tel' },
  { key: 'city', question: 'Dans quelle ville habites-tu ?', type: 'text' },
  { key: 'profession', question: 'Quelle est ta profession ?', type: 'text' },
  { key: 'password', question: 'Choisis un mot de passe', type: 'password' },
  { key: 'avatar', question: 'Ajoute une photo de profil', type: 'file' },
];

export function Register() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    password: '',
    avatar: null as File | null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const current = steps[step];
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files?.[0]) {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await AuthService.register({
        ...form,
        birthdate: new Date(form.birthdate).toISOString(),
        avatar: form.avatar || undefined,
      });
      setSuccess(true);
    } catch {
      setError('Erreur d’inscription');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 px-6 py-8 bg-white rounded shadow-md text-center"
    >
      {/* Stepper par traits */}
      <div className="flex justify-center gap-2 mb-10">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index <= step ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            style={{ width: `${100 / steps.length - 2}%` }}
          />
        ))}
      </div>

      {/* Question animée */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={() => inputRef.current?.focus()}
          className="mb-6"
        >
          <label
            htmlFor={current.key}
            className="block text-lg text-gray-800 mb-3"
          >
            {current.question}
          </label>

          {current.type === 'file' ? (
            <>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {form.avatar && (
                <img
                  src={URL.createObjectURL(form.avatar)}
                  alt="Aperçu"
                  className="mt-4 h-32 rounded object-cover mx-auto"
                />
              )}
            </>
          ) : (
            <input
              ref={inputRef}
              type={current.type}
              name={current.key}
              value={(form as never)[current.key]}
              onChange={handleChange}
              required={current.key !== 'avatar'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (step < steps.length - 1) {
                    nextStep();
                  }
                }
              }}
              className="w-full border border-gray-300 p-2 rounded"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Inscription réussie !</p>}

      {/* Navigation */}
      <div className="flex justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Retour
          </button>
        ) : (
          <div />
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            S’inscrire
          </button>
        )}
      </div>
    </form>
  );
}
