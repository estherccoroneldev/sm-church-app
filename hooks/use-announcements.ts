import React from 'react';

import { Announcement } from '@types/announcement';
import { getData } from 'services/announcements';

export default function useAnnouncements() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAnnouncements = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await getData();

      setAnnouncements(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching Announcements');
      console.error('Error fetching Announcements:', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchAnnouncements();
  }, []);

  return React.useMemo(
    () => ({ announcements, loading, error, fetchAnnouncements }),
    [loading, error, announcements, fetchAnnouncements]
  );
}
