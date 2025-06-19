import React from 'react';

import { Ministry } from '../@types/ministry';
import fetchMinistries from '../services/ministry';

export default function useMinistries() {
  const [ministries, setMinistries] = React.useState<Ministry[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const getMinistries = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMinistries();

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
