import React from 'react';

import { getMinistries } from 'services/ministry';
import { Ministry } from '../@types/ministry';

export default function useMinistries() {
  const [ministries, setMinistries] = React.useState<Ministry[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchMinistries = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMinistries();

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
    fetchMinistries();
  }, [fetchMinistries]);

  return React.useMemo(
    () => ({ ministries, loading, error, fetchMinistries }),
    [loading, error, ministries, fetchMinistries]
  );
}
