import { db } from 'config/firebase';
import { format } from 'date-fns';
import { collection, getDocs } from 'firebase/firestore';
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

const setFormattedDate = (docData: any): string => {
  const firebaseTimestamp = docData.date;

  let formattedDate = 'N/A';
  if (firebaseTimestamp && typeof firebaseTimestamp.toDate === 'function') {
    const jsDate = firebaseTimestamp.toDate();
    formattedDate = format(jsDate, 'MMMM d, yyyy');
  }

  return formattedDate;
};

async function getAnnouncementsFromFirestore(): Promise<Event[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'announcements'));
    const announcementsList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          date: setFormattedDate(doc.data()),
        }) as Event
    );

    return announcementsList;
  } catch (error) {
    console.error('[Firestore] Error fetching announcements:', error);
    throw error;
  }
}

// const getData = getAnnouncementsFromFirestore;
const getData = __DEV__ ? fetchAnnouncements : getAnnouncementsFromFirestore;

export { getData };
