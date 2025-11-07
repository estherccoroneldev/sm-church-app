import uniqBy from 'lodash/uniqBy';
import React from 'react';

import { fetchVideos } from 'services/ytvideos';
import { YouTubeVideo } from '../@types/ytvideo';

export default function useSermons() {
  const [sermons, setSermons] = React.useState<YouTubeVideo[]>([]);
  const [nextPageToken, setNextPageToken] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const getSermons = React.useCallback(async () => {
    if (loading || (!nextPageToken && sermons.length > 0)) return;
    try {
      setLoading(true);

      const data = await fetchVideos(nextPageToken);

      if (data) {
        // Prevent duplicates
        setSermons((prevSermons) => uniqBy([...prevSermons, ...data.items], 'id.videoId'));

        setNextPageToken(data.nextPageToken);
      }
    } catch (error) {
      setError('Error fetching sermons');
      console.error('Error fetching sermons:', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getSermons();
  }, []);

  return React.useMemo(
    () => ({ sermons, loading, error, getSermons }),
    [loading, error, sermons, getSermons]
  );
}
