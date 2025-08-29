import axios from 'axios';
import { YouTubeApiResponse } from '../@types/ytvideo';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const CHANNEL_ID = process.env.EXPO_PUBLIC_YT_CHANNEL_ID;
const url = `https://www.googleapis.com/youtube/v3/search`;

const fetchVideos = async (pageToken: string = ''): Promise<YouTubeApiResponse | null> => {
  try {
    const response = await axios.get<YouTubeApiResponse>(url, {
      params: {
        key: API_KEY,
        channelId: CHANNEL_ID,
        part: 'snippet',
        order: 'date',
        maxResults: 10,
        type: 'video',
        pageToken: pageToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching videos with Axios:', JSON.stringify(error));
    return null;
  }
};

export { fetchVideos };
