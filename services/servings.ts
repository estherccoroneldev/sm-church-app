import { Serving } from '../@types/serving';
import api from './api';

const fetchServings = async (): Promise<Serving[]> => {
  try {
    const response = await api.get('/servings');
    return response.data;
  } catch (error) {
    console.error('Error fetching servings:', error);
    throw error;
  }
};

export default fetchServings;
