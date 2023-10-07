// @ts-nocheck
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

export type TagFormData = {
  id: string;
  tagCategory: string;
  tagName: string;
  tagType: string;
  tagColor?: string;
};

// Options pour les sélecteurs
const TAG_TYPES = ['offline', 'online', 'both'];
const TAG_CATEGORIES = ['GENERAL', 'SPECIFIC'];

const PostTag: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<
    Omit<TagFormData, 'id'> & { tagCategory: string; tagType: string }
  >({
    tagCategory: TAG_CATEGORIES[0] as string,
    tagName: '',
    tagType: TAG_TYPES[0] as string,
    tagColor: '',
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Vérifiez si toutes les données requises sont remplies.
    // Dans cet exemple, je suppose que tagType et tagCategory sont les seules données requises.
    // Si ce n'est pas le cas, ajustez cette logique en conséquence.
    if (formData.tagType && formData.tagCategory && formData.tagName) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      tagColor: formData.tagColor || randomColor(),
    };

    try {
      const response = await fetch('http://localhost:3001/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du tag');
      }

      // Redirection vers la page d'accueil (index)
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Une erreur inattendue s'est produite.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
<h1 className='ml-16 text-3xl font-bold mb-4'>Create a Tag</h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom:
              </label>
              <input
                type="text"
                name="tagName"
                value={formData.tagName}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Couleur:
              </label>
              <input
                type="text"
                name="tagColor"
                value={formData.tagColor}
                onChange={handleChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie:
              </label>
              <select
                name="tagCategory"
                value={formData.tagCategory}
                onChange={handleChange}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                {TAG_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type:
              </label>
              <select
                name="tagType"
                value={formData.tagType}
                onChange={handleChange}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected>
                  Select a type
                </option>
                {TAG_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isFormComplete}
                className={`px-6 py-2 rounded-md text-white transition duration-200 ease-in-out ${
                  isFormComplete
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTag;
