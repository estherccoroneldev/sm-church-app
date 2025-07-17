import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
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
    const querySnapshot = await getDocs(collection(db, 'events'));
    const eventsList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Event
    );
    return eventsList;
  } catch (error) {
    console.error('[Firestore] Error fetching events:', error);
    throw error;
  }
}

const getData = __DEV__ ? fetchEvents : getEventsFromFirestore;

export { getData };
