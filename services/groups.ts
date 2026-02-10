import { Group } from '@types/group';
import { db } from 'config/firebase';
import { Ministry } from '../@types/ministry';
import api from './api';

export const fetchGroups = async (): Promise<Ministry[]> => {
  try {
    const response = await api.get('/groups');
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

export async function fetchGroupsGCP(): Promise<Ministry[]> {
  try {
    const querySnapshot = await db.collection('groups').get();
    const groupsList = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Group
    );
    return groupsList;
  } catch (error) {
    console.error('[Firestore] Error fetching groups:', error);
    throw error;
  }
}

// Function to determine which fetch function to use based on the environment
// const getGroups = fetchGroupsGCP;
const getGroups = __DEV__ ? fetchGroups : fetchGroupsGCP;
export { getGroups };
