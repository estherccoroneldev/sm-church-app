import { Sermon } from '../@types/sermon';
// import api from './api';

const sermons = [
  {
    id: '1',
    title: 'Hossana',
    description: 'Descripción del video 1',
    date: '2025-05-03T00:00:00Z',
    author: 'Rev. Janssen Gutierrez',
    thumbnail: null,
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/watch?v=ZTm4wIoZT8M',
    downloadUrl: null,
  },
  {
    id: '2',
    title: 'Una palabra de Fe en Viernes Santo',
    description: 'Descripción del video 2',
    date: '2025-05-03T00:00:00Z',
    author: 'Autor del video 2',
    thumbnail: null,
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/watch?v=xtlVUf6wB5I',
    downloadUrl: null,
  },
  {
    id: '3',
    title: 'La deuda de Amor',
    description: 'Descripción del video 3',
    date: '2025-05-03T00:00:00Z',
    author: 'Autor del video 3',
    thumbnail: null,
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/watch?v=dABFDuN1CG0',
    downloadUrl: null,
  },
  {
    id: '4',
    title: 'Resucitó',
    description: 'Descripción del video 4',
    date: '2025-05-03T00:00:00Z',
    author: 'Autor del video 4',
    thumbnail: null,
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/watch?v=PNbTJgCvQBU',
    downloadUrl: null,
  },
  {
    id: '5',
    title: 'Canto de Alabanza: Vengo a Ti',
    description: 'Descripción del video 5',
    date: '2025-05-03T00:00:00Z',
    author: 'Autor del video 5',
    thumbnail: null,
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/watch?v=bNVkJzTbHbo',
    downloadUrl: null,
  },
  {
    id: '6',
    title: 'Tres Claves para alcanzar tus metas',
    description: 'Descripción del video 6',
    date: '2025-05-03T00:00:00Z',
    author: 'Autor del video 6',
    thumbnail: null,
    imageUrl: null,
    videoUrl: 'https://www.youtube.com/watch?v=dRucZQKPZFQ',
    downloadUrl: null,
  },
];

const fetchSermons = async (): Promise<Sermon[]> => {
  try {
    // const response = await api.get('/sermons');
    // return response.data;

    // TO DO: Remove this hardcoded data when the API is ready
    // For now, I return the hardcoded sermons data
    return [...new Set(sermons.map((sermon) => JSON.stringify(sermon)))].map((sermon) =>
      JSON.parse(sermon)
    ) as Sermon[];
  } catch (error) {
    console.error('Error fetching sermons:', error);
    throw error;
  }
};

export default fetchSermons;
