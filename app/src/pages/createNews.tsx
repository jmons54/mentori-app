import { ChangeEvent, FormEvent, useState } from 'react';
import { NewsService, CreateNewsDto } from '@/client-api';

export function CreateNews() {
  const [form, setForm] = useState<CreateNewsDto>({
    title: '',
    content: '',
    published: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = () => {
    setForm((prev) => ({ ...prev, published: !prev.published }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);

    try {
      await NewsService.create({
        ...form,
        media: file ? new Blob([file], { type: file.type }) : undefined,
      });
      setSuccess(true);
      setForm({ title: '', content: '', published: false });
    } catch (err) {
      console.error('Erreur API :', err);
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Créer une actualité</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Titre</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />

        <label className="block mb-2 font-medium">Contenu</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded mb-4 h-40"
        />

        <label className="block mb-2 font-medium">
          Image ou vidéo (optionnel)
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={form.published}
            onChange={handleCheckbox}
          />
          <span>Publier immédiatement</span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? 'Création en cours...' : 'Créer'}
        </button>

        {success === true && (
          <p className="mt-4 text-green-600">News créée avec succès !</p>
        )}
        {success === false && (
          <p className="mt-4 text-red-600">
            Une erreur est survenue lors de la création.
          </p>
        )}
      </form>
    </div>
  );
}
