import React from 'react';

import { Sermon } from '../@types/sermon';
import fetchSermons from '../services/sermons';

export default function useSermons() {
  const [sermons, setSermons] = React.useState<Sermon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const getSermons = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchSermons();

      setSermons(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching sermons');
      console.error('Error fetching sermons:', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getSermons();
  }, [getSermons]);

  return React.useMemo(
    () => ({ sermons, loading, error, getSermons }),
    [loading, error, sermons, getSermons]
  );
}
