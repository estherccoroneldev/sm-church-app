import React from 'react';
import { useMinistryStore } from 'store/ministries-store';
import { Ministry } from '../@types/ministry';

export const useGetMinistry = (ministryId: string) => {
  const getMinistry = useMinistryStore((state) => state.getMinistry);
  const fetchAndStoreMinistry = useMinistryStore((state) => state.fetchAndStoreMinistry);

  const initialMinistry = getMinistry(ministryId);
  const [ministry, setMinistry] = React.useState<Ministry | undefined>(initialMinistry);
  const [isLoading, setIsLoading] = React.useState(!initialMinistry);

  const loadMinistry = async () => {
    setIsLoading(true);
    try {
      const fetchedMinistry = await fetchAndStoreMinistry(ministryId);
      setMinistry(fetchedMinistry);
    } catch (error) {
      // Handle error display
      console.info('Error loading ministry details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (initialMinistry) {
      return;
    }

    loadMinistry();
  }, []);

  return { ministry, isLoading };
};
