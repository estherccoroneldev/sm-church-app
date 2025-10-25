import { db } from 'config/firebase';
import { Ministry } from '../@types/ministry';
// import api from './api';

// export const fetchMinistryDetailsById = async (ministryId: string): Promise<Ministry | null> => {
//   try {
//     const response = await api.get(`/ministries/${ministryId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching ministry details:', error);
//     throw error;
//   }
// };

export async function fetchMinistryDetailsByIdGCP(
  ministryId: Ministry['id']
): Promise<Ministry | null> {
  try {
    const docRef = db.collection('ministries').doc(ministryId);
    const docSnap = await docRef.get();

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Ministry;
    } else {
      console.warn('No such ministry with ID:', ministryId);
      return null;
    }
  } catch (error) {
    console.error('[Firestore] Error fetching ministry details:', error);
    throw error;
  }
}

// Function to determine which fetch function to use based on the environment
const getMinistryDetailsById = fetchMinistryDetailsByIdGCP;
// const getMinistryDetailsById = __DEV__ ? fetchMinistryDetailsById : fetchMinistryDetailsByIdGCP;

export { getMinistryDetailsById };
