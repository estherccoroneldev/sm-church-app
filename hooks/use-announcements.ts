import React from 'react';

import { Announcement } from '../@types/announcement';
import fetchAnnouncements from '../services/announcements';

export default function useAnnouncements() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const getAnnouncements = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAnnouncements();

      setAnnouncements(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching announcements');
      console.error('Error fetching announcements:', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]);

  return React.useMemo(
    () => ({ announcements, loading, error, getAnnouncements }),
    [loading, error, announcements, getAnnouncements]
  );
}
