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

  // TO DO: filter servings by ministry
  // const filterServings = React.useCallback(
  //   (servings: Serving[], ministry: string) => {
  //     return servings.filter((serving) => serving.ministry === ministry);
  //   },
  //   [servings]
  // );
  // const filteredServings = React.useMemo(() => {
  //   return filterServings(servings, ministry);
  // }, [filterServings, servings, ministry]);
  // const getFilteredServings = React.useCallback(() => {
  //   setServings(filteredServings);
  // }, [filteredServings]);

  React.useEffect(() => {
    getServings();
  }, [getServings]);

  return React.useMemo(
    () => ({ servings, loading, error, getServings }),
    [loading, error, servings, getServings]
  );
}
