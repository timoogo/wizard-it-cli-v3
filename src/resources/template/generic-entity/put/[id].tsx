import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { API_ROUTES } from '@/constants/api.routes.constants';
import { FaCheck } from 'react-icons/fa';

export type TagFormData = {
  id: string;
  tagCategory: string;
  tagName: string;
  tagType: string;
  tagColor?: string;
};



const TAG_TYPES = ['offline', 'online', 'both'];
const TAG_CATEGORIES = ['GENERAL', 'SPECIFIC'];

interface PutTagProps {
  tag: TagFormData;
}

const PutTag: React.FC<PutTagProps> = ({ tag }) => {
  const router = useRouter();
  const [displayedTagName, setDisplayedTagName] = useState(tag.tagName);
  const [formData, setFormData] = useState<Omit<TagFormData, 'id'> & {
    tagCategory: string;
    tagType: string;
  }>({
    tagCategory: tag.tagCategory,
    tagName: tag.tagName,
    tagType: tag.tagType,
    tagColor: '',
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [fieldModifiedStatus, setFieldModifiedStatus] = useState<{
    tagName: boolean;
    tagColor: boolean;
    tagCategory: boolean;
    tagType: boolean;
  }>({
    tagName: false,
    tagColor: false,
    tagCategory: false,
    tagType: false,
  });
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  useEffect(() => {
    setDisplayedTagName(formData.tagName);

    if (formData.tagType && formData.tagCategory && formData.tagName) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData.tagName, formData.tagType, formData.tagCategory]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const isInputModified = value !== tag[name as keyof TagFormData];
    setFieldModifiedStatus((prev) => ({
      ...prev,
      [name]: isInputModified,
    }));
  };

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleColorPickerToggle = () => {
    setColorPickerOpen(!colorPickerOpen);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      tagColor: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      tagColor: formData.tagColor || randomColor(),
    };

    try {
      const response = await fetch(`http://localhost:3001/api/tags/${tag.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification du tag');
      }

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
      <h1 className="ml-16 text-3xl font-bold mb-4">
        Modify the Tag {displayedTagName}
      </h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Nom:
              </label>
              <input
                type="text"
                name="tagName"
                value={formData.tagName}
                onChange={handleChange}
                required
                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                  fieldModifiedStatus.tagName ? 'border-yellow-500' : ''
                }`}
              />
              {fieldModifiedStatus.tagName && (
                <FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
              )}
            </div>

            {/* Couleur Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Couleur:
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="tagColor"
                  value={formData.tagColor}
                  onChange={handleChange}
                  className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                    fieldModifiedStatus.tagColor ? 'border-yellow-500' : ''
                  }`}
                />
                <button
                  type="button"
                  className="ml-2 p-1 bg-blue-500 text-white rounded-md"
                  onClick={handleColorPickerToggle}
                >
                  Pick Color
                </button>
              </div>
              {colorPickerOpen && (
                <input
                  type="color"
                  value={formData.tagColor}
                  onChange={handleColorChange}
                  className="mt-1 block"
                />
              )}
              {fieldModifiedStatus.tagColor && (
                <FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
              )}
            </div>
            {/* Catégorie Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie:
              </label>
              <select
                name="tagCategory"
                value={formData.tagCategory}
                onChange={handleChange}
                required
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                  fieldModifiedStatus.tagCategory ? 'border-yellow-500' : ''
                }`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {TAG_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {fieldModifiedStatus.tagCategory && (
                <FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
              )}
            </div>

            {/* Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type:
              </label>
              <select
                name="tagType"
                value={formData.tagType}
                onChange={handleChange}
                required
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                  fieldModifiedStatus.tagType ? 'border-yellow-500' : ''
                }`}
              >
                <option value="" disabled>
                  Select a type
                </option>
                {TAG_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {fieldModifiedStatus.tagType && (
                <FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500" />
              )}
            </div>

            {/* Submit Button */}
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

export default PutTag;

// Get server-side props
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const response = await fetch(`${API_ROUTES.TAGS}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch tag');
  }

  const tag = await response.json();

  return {
    props: {
      tag,
    },
  };
};
