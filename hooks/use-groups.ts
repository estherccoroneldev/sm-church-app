import React from 'react';

import { Group } from '@types/group';
import { fetchGroups } from 'services/groups';

export default function useGroups() {
  const [groups, setGroups] = React.useState<Group[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const getGroups = React.useCallback(async () => {
    try {
      setLoading(true);

      const data = await fetchGroups();

      if (data) {
        setGroups(data);
      }
    } catch (error) {
      setError('Error fetching groups');
      console.error('Error fetching groups:', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getGroups();
  }, []);

  return React.useMemo(
    () => ({ groups, loading, error, getGroups }),
    [loading, error, groups, getGroups]
  );
}
