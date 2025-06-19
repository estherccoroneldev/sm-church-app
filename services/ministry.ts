import { Ministry } from '../@types/ministry';
import api from './api';

const fetchMinistries = async (): Promise<Ministry[]> => {
  try {
    const response = await api.get('/ministries');
    return response.data;
  } catch (error) {
    console.error('Error fetching ministries:', error);
    throw error;
  }
};

export default fetchMinistries;
