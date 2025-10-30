import { db } from 'config/firebase';
import { setFormattedDate } from 'utils/set-formatted-date';
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

async function getEventsFromFirestore(): Promise<Event[]> {
  try {
    const querySnapshot = await db.collection('events').get();
    const eventsList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          startDate: setFormattedDate(doc.data().startDate),
          endDate: setFormattedDate(doc.data().endDate),
        }) as Event
    );

    return eventsList;
  } catch (error) {
    console.error('[Firestore] Error fetching events:', error);
    throw error;
  }
}

// const getData = getEventsFromFirestore;
const getData = __DEV__ ? fetchEvents : getEventsFromFirestore;

export { getData };
