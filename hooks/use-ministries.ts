import React from 'react';

import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Ministry } from '../@types/ministry';
import fetchMinistries from '../services/ministry';

async function fetchMinistriesGCP(): Promise<Ministry[]> {
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
const getData = __DEV__ ? fetchMinistries : fetchMinistriesGCP;

export default function useMinistries() {
  const [ministries, setMinistries] = React.useState<Ministry[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const getMinistries = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await getData();

      setMinistries(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching Ministries');
      console.error('Error fetching Ministries:', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getMinistries();
  }, [getMinistries]);

  return React.useMemo(
    () => ({ ministries, loading, error, getMinistries }),
    [loading, error, ministries, getMinistries]
  );
}
