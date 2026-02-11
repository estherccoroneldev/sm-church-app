import uniqBy from 'lodash/uniqBy';
import React from 'react';

import { fetchVideos } from 'services/ytvideos';
import { YouTubeVideo } from '../@types/ytvideo';

const useSermons = () => {
  const [sermons, setSermons] = React.useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [nextPageToken, setNextPageToken] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const isFetching = React.useRef(false);

  const getSermons = React.useCallback(async () => {
    if (isFetching.current) return;

    if (sermons.length > 0 && !nextPageToken) return;

    try {
      isFetching.current = true;
      setLoading(true);
      setError(null);

      const data = await fetchVideos(nextPageToken);

      if (data) {
        setSermons((prev) => uniqBy([...prev, ...data.items], 'id.videoId'));
        setNextPageToken(data.nextPageToken || null);
      }
    } catch (err) {
      setError('Error fetching sermons');
      console.error(err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [nextPageToken, sermons.length]);

  React.useEffect(() => {
    getSermons();
  }, []);

  return React.useMemo(
    () => ({ sermons, loading, error, getSermons }),
    [sermons, loading, error, getSermons]
  );
};

export default useSermons;
