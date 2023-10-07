// @ts-nocheck
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DropdownMenu from '@/components/Dropdowns/DropdownMenu';
import Link from 'next/link';
import Paginator from '@/components/Paginators/Paginator';
import { DropdownOption } from '@/types/Options';
import { PencilAltIcon, XCircleIcon } from '@heroicons/react/solid';
import { API_ROUTES } from '@/constants/api.routes.constants';
import Chip from '@/components/Chip/chip';
import { getContrastingTextColor, randomColor } from '@/utils/Colors.utils';

// Define a generic Entity type
interface Entity {
  id: number;
  name: string;
  category: string;
  type: string;
  color?: string;
}

interface EntityPageProps<T> {
  entities: T[];
}

const EntitiesPage = <T extends Entity>({ entities }: EntityPageProps<T>) => {
  const router = useRouter();

  const handleEdit = (entityId: number) => {
    router.push(`/entities/put/${entityId}`);
  };

  const findEntityName = (entityId: number, entities: T[]) => {
    const entity = entities.find((e) => e.id === entityId);

    if (entity) {
      return entity.name;
    } else {
      return "Entity not found";
    }
  };

  const [currententities, setCurrententities] = useState(entities);

  const handleDelete = async (entityId: number) => {
    try {
      const response = await fetch(`${API_ROUTES.ENTITY_NAME}/${entityId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`${findEntityName(entityId, entities)} with ID ${entityId} deleted successfully.`);
        setCurrententities(currententities.filter(tag => tag.id !== entityId));
      } else {
        console.error(`Error deleting ${findEntityName(entityId, entities)} with ID ${entityId}.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
          console.error(`Error deleting ${findEntityName(entityId, entities)} with ID ${entityId}: ${error.message}`);
      } else {
          console.error(`An unexpected error occurred.`);
      }
    }
  };

  const options = (entityId: number): DropdownOption[] => [
    // @ts-ignore
    {
      text: 'Modifier',
      Icon: PencilAltIcon,
      color: '#3490dc',
      action: () => handleEdit(entityId),
    },
    {
      text: 'Supprimer',
      Icon: XCircleIcon,
      color: '#e3342f',
      action: () => handleDelete(entityId),
    },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(currententities.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const indexOfLastTag = currentPage * itemsPerPage;
  const indexOfFirstTag = indexOfLastTag - itemsPerPage;
  const displayedentities = currententities.slice(indexOfFirstTag, indexOfLastTag);

  const renderTableHeaders = () => {
    if (displayedentities.length > 0) {
      const entityKeys = ['id', 'tagName', 'tagCategory', 'tagType', 'tagColor'];
      return (
        <tr className="border-b border-gray-200 text-center">
          {entityKeys.map((key) => (
            <th
              className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle"
              key={key}
            >
              {key}
            </th>
          ))}
          <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
            Actions
          </th>
        </tr>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-end">
        <Link
          href="/entities/post"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Créer un {findEntityName(1, entities)}
        </Link>
      </div>
      {entities.length === 0 ? (
        <div className='flex justify-center mt-5'>
          <p className="text-gray-500 text-lg">No entities found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {renderTableHeaders()}
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {displayedentities.map((entity) => (
                <tr key={entity.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center align-middle">{entity.id}</td>
                  <td className="px-6 py-4  text-center align-middle">{entity.name}</td>
                  <td className="px-6 py-4 text-center align-middle"> {entity.type} </td>
                  <td className="px-6 py-4 text-center align-middle"> {entity.category} </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {entity.color && (
                      <Chip backgroungColor={randomColor.toString()} textContent={getContrastingTextColor(entity.name)} />
                    )}
                  </td>
                  <td className="px-6 py-4 align-middle text-center">
                    <DropdownMenu options={options(entity.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {entities.length > itemsPerPage && (
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                items={entities}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EntitiesPage;

export const getServerSideProps = async () => {
  // Fetch the entities data from your API or source
  const res = await fetch(`${API_ROUTES.ENTITY_NAME}`);
  const entities: Entity[] = await res.json();

  return {
    props: {
      entities,
    },
  };
};
