import React from 'react';

import { getMinistries } from 'services/ministry';
import { useMinistryStore } from 'store/ministries-store';
import { Ministry } from '../@types/ministry';

export default function useMinistries() {
  const setMinistries = useMinistryStore((state) => state.setMinistries);
  const ministries = useMinistryStore((state) =>
    Object.values(state.ministries).filter(
      (ministry): ministry is Ministry => ministry !== undefined
    )
  );
  const [loading, setLoading] = React.useState<boolean>(true);
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

  return React.useMemo(
    () => ({ ministries: ministries ?? [], loading, error, fetchMinistries }),
    [loading, error, ministries, fetchMinistries]
  );
}
