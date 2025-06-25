import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthService } from '@/client-api';
import logo from '../assets/logo-1.png';

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

const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const getStrengthLabel = (score: number) => {
  switch (score) {
    case 0:
    case 1:
      return { label: 'Faible', color: 'bg-red-500', width: 'w-1/4' };
    case 2:
      return { label: 'Moyen', color: 'bg-yellow-500', width: 'w-1/2' };
    case 3:
      return { label: 'Bon', color: 'bg-blue-500', width: 'w-3/4' };
    case 4:
      return { label: 'Fort', color: 'bg-green-500', width: 'w-full' };
    default:
      return { label: '', color: 'bg-gray-300', width: 'w-0' };
  }
};

export function Register() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    password: '',
    avatar: null as File | null,
  });

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const isStepValid = () => {
    const value = form[current.key as keyof typeof form];

    if (current.key === 'avatar') {
      return !!form.avatar;
    }

    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return false;
    }

    if (current.key === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string);
    }

    return true;
  };

  const nextStep = () => {
    if (!isStepValid()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    AuthService.register({
      ...form,
      avatar: form.avatar || undefined,
    })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setErrorMessage(
          err.body?.message || err.message || 'Erreur inattendue'
        );
      });
  };

  const isFormValid = () => {
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.phone.trim() &&
      form.city.trim() &&
      form.profession.trim() &&
      form.password.trim() &&
      form.avatar !== null
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 px-6 py-8 bg-white rounded shadow-md text-center"
    >
      <div className="flex justify-center mb-6">
        <img src={logo} alt="Logo" className="h-16 w-auto" />
      </div>

      {/* Stepper */}
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

      {success && <p className="text-green-500 mb-4">Inscription réussie !</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {/* Champ animé */}
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
            <>
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
                    if (step < steps.length - 1 && isStepValid()) {
                      nextStep();
                    }
                  }
                }}
                className="w-full border border-gray-300 p-2 rounded"
              />

              {current.key === 'password' &&
                (() => {
                  const score = getPasswordStrength(form.password);
                  const { label, color, width } = getStrengthLabel(score);
                  return (
                    <div className="mt-3 text-left">
                      <div className="h-2 rounded bg-gray-200 w-full overflow-hidden">
                        <div
                          className={`h-2 ${color} ${width} transition-all duration-300 rounded`}
                        />
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>{label}</strong>
                      </p>
                    </div>
                  );
                })()}
            </>
          )}
        </motion.div>
      </AnimatePresence>

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
            disabled={!isStepValid()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isFormValid()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            S’inscrire
          </button>
        )}
      </div>
    </form>
  );
}
