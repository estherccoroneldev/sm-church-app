import { Event } from '../@types/event';
import api from './api';

const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('[API] Error fetching events:', error);
    throw error;
  }
};

export default fetchEvents;
