import { db } from 'config/firebase';
import { setFormattedDate } from 'utils/set-formatted-date';
import { Announcement } from '../@types/announcement';
import { Event } from '../@types/event';
import api from './api';

const fetchAnnouncements = async (): Promise<Event[]> => {
  try {
    const response = await api.get('/announcements');
    return response.data;
  } catch (error) {
    console.error('[API] Error fetching announcements:', error);
    throw error;
  }
};

async function getAnnouncementsFromFirestore(): Promise<Announcement[]> {
  try {
    const querySnapshot = await db.collection('announcements').get();
    const announcementsList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          startDate: setFormattedDate(doc.data().startDate),
          endDate: setFormattedDate(doc.data().endDate),
        }) as Announcement
    );

    return announcementsList;
  } catch (error) {
    console.error('[Firestore] Error fetching announcements:', error);
    throw error;
  }
}

const getData = getAnnouncementsFromFirestore;
// const getData = __DEV__ ? fetchAnnouncements : getAnnouncementsFromFirestore;

export { getData };
