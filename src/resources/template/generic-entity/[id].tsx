// @ts-nocheck
import { API_ROUTES } from '@/constants/api.routes.constants';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

interface Tag {
  id: string;
  tagCategory: string;
  tagName: string;
  tagType: string;
  tagColor?: string;
}

interface TagPageProps {
  tag: Tag;
}

const TagPage: React.FC<TagPageProps> = ({ tag }) => {
  const [modifiedTagName, setModifiedTagName] = useState(tag.tagName);

  const handleModifyTag = async () => {
    console.log('Modifying tag...');
    try {
      const response = await fetch(`${API_ROUTES.TAGS}/${tag.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagName: modifiedTagName }),
      });
  
      if (response.ok) {
        console.log('Tag modified successfully');
        tag.tagName = modifiedTagName;
      } else {
        console.error('Failed to modify tag:', response.statusText);
      }
    } catch (error) {
      console.error('Error modifying tag:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">{tag.tagName}</h1>
        <input
          type="text"
          value={modifiedTagName}
          onChange={(e) => setModifiedTagName(e.target.value)}
        />
        <button onClick={handleModifyTag}>Modify Tag Name</button>
        <p className="text-gray-600 mb-4">{tag.tagCategory}</p>
        <p className="text-gray-600 mb-4">{tag.tagType}</p>
        {tag.tagColor && (
          <p className="text-gray-600 mb-4">
            <strong>Color:</strong> {tag.tagColor}
          </p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const response = await fetch(`${API_ROUTES.TAGS}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }

  const tag = await response.json();

  return {
    props: {
      tag,
    },
  };
};

export default TagPage;
