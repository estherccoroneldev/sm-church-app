import { Sermon } from '../@types/sermon';
import api from './api';

const fetchSermons = async (): Promise<Sermon[]> => {
  try {
    const response = await api.get('/sermons');
    return response.data;
  } catch (error) {
    console.error('Error fetching sermons:', error);
    throw error;
  }
};

export default fetchSermons;
