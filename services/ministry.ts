import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Ministry } from '../@types/ministry';
import api from './api';

export const fetchMinistries = async (): Promise<Ministry[]> => {
  try {
    const response = await api.get('/ministries');
    return response.data;
  } catch (error) {
    console.error('Error fetching ministries:', error);
    throw error;
  }
};

export async function fetchMinistriesGCP(): Promise<Ministry[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'ministries'));
    const ministriesList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Ministry
    );
    return ministriesList;
  } catch (error) {
    console.error('[Firestore] Error fetching ministries:', error);
    throw error;
  }
}

// Function to determine which fetch function to use based on the environment
// const getMinistries = fetchMinistriesGCP;
const getMinistries = __DEV__ ? fetchMinistries : fetchMinistriesGCP;
export { getMinistries };
