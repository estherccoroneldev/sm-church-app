import { db } from 'config/firebase';
import { format } from 'date-fns';
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

const setFormattedDate = (docData: any): string => {
  const firebaseTimestamp = docData.date;

  let formattedDate = 'N/A';
  if (firebaseTimestamp && typeof firebaseTimestamp.toDate === 'function') {
    const jsDate = firebaseTimestamp.toDate();
    formattedDate = format(jsDate, 'MMMM d, yyyy');
  }

  return formattedDate;
};

async function getEventsFromFirestore(): Promise<Event[]> {
  try {
    const querySnapshot = await db.collection('events').get();
    const eventsList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          date: setFormattedDate(doc.data()),
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
