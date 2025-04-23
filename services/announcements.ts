import { Announcement } from '../@types/announcement';
import api from './api';

const fetchAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const response = await api.get('/announcements');
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

export default fetchAnnouncements;
