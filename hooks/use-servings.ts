import React from 'react';

import { Serving } from '../@types/serving';
import fetchServings from '../services/servings';

export default function useServings() {
  const [servings, setServings] = React.useState<Serving[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const getServings = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchServings();

      setServings(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching Servings');
      console.error('Error fetching Servings:', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getServings();
  }, [getServings]);

  return React.useMemo(
    () => ({ servings, loading, error, getServings }),
    [loading, error, servings, getServings]
  );
}
