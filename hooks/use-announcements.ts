import React from 'react';

import { getData } from 'services/announcements';
import { useAnnouncementsStore } from 'store/announcements-store';
import { Announcement } from '../@types/announcement';

export default function useAnnouncements() {
  const setAnnouncements = useAnnouncementsStore((state) => state.setAnnouncements);
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

  const announcements = useAnnouncementsStore((state) => state.announcements);
  return React.useMemo(
    () => ({
      announcements:
        Object.values(announcements).filter(
          (announcement): announcement is Announcement => announcement !== undefined
        ) ?? [],
      loading,
      error,
      fetchAnnouncements,
    }),
    [loading, error, announcements, fetchAnnouncements]
  );
}
