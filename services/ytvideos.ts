import { YouTubeApiResponse } from '../@types/ytvideo';
// import api from './api';
// const sermons = [
//   {
//     etag: '1',
//     id: {
//       videoId: 'ZTm4wIoZT8M',
//     },
//     snippet: {
//       title: 'Hossana',
//       description: 'Descripción del video 1',
//       thumbnails: {
//         high: {
//           url: 'https://i.ytimg.com/vi/ZTm4wIoZT8M/hqdefault.jpg',
//         },
//       },
//     },
//   },
//   {
//     etag: '2',

//     id: {
//       videoId: 'xtlVUf6wB5I',
//     },
//     snippet: {
//       title: 'Una palabra de Fe en Viernes Santo',
//       description: 'Descripción del video 2',
//       thumbnails: {
//         high: {
//           url: 'https://i.ytimg.com/vi/xtlVUf6wB5I/hqdefault.jpg',
//         },
//       },
//     },
//   },
//   {
//     etag: '3',

//     id: {
//       videoId: 'dABFDuN1CG0',
//     },
//     snippet: {
//       title: 'La deuda de Amor',
//       description: 'Descripción del video 3',
//       thumbnails: {
//         high: {
//           url: 'https://i.ytimg.com/vi/dABFDuN1CG0/hqdefault.jpg',
//         },
//       },
//     },
//   },
// ];
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const CHANNEL_ID = process.env.EXPO_PUBLIC_YT_CHANNEL_ID;
const url = `https://www.googleapis.com/youtube/v3/search`;

const fetchVideos = async (pageToken: string | null = ''): Promise<YouTubeApiResponse | null> => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      channelId: CHANNEL_ID,
      part: 'snippet',
      order: 'date',
      maxResults: '10',
      type: 'video',
      pageToken: pageToken || '',
    } as any);

    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data: YouTubeApiResponse = await response.json();

    return data;
  } catch (error) {
    console.error(
      'Error fetching videos with Fetch:',
      error instanceof Error ? error.message : JSON.stringify(error)
    );
    return null;
  }
};

export { fetchVideos };
