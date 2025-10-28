import React from 'react';

import { getMinistries } from 'services/ministry';
import { useMinistryStore } from 'store/ministries-store';
import { Ministry } from '../@types/ministry';

export default function useMinistries(): {
  ministries: Ministry[];
  loading: boolean;
  error: string | null;
  fetchMinistries: () => Promise<void>;
} {
  const setMinistries = useMinistryStore((state) => state.setMinistries);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchMinistries = React.useCallback(async () => {
    try {
      setLoading(true);
      const ministriesData = await getMinistries();

      setMinistries(ministriesData);
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

  const ministries = useMinistryStore((state) => state.ministries);

  return React.useMemo(
    () => ({
      ministries:
        Object.values(ministries).filter(
          (ministry): ministry is Ministry => ministry !== undefined
        ) ?? [],
      loading,
      error,
      fetchMinistries,
    }),
    [loading, error, ministries, fetchMinistries]
  );
}
