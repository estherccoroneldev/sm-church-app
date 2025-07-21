// import { RouteProp, useRoute } from '@react-navigation/native';
// import { MediaParamList } from 'navigation/tab-navigator';
import React from 'react';
import { ScreenContent } from '../components/ScreenContent';

// type MediaDetailsRouteProp = RouteProp<MediaParamList, 'MediaDetails'>;

const MediaDetails: React.FC = () => {
  // const { params } = useRoute<MediaDetailsRouteProp>();

  // // Extract the eventId from params
  // const mediaId = params?.id;
  // // Log the eventId to verify it's being passed correctly
  // console.log('MEDIA ID:', mediaId);
  // const { title, description, date } = params || {};
  // console.log('Event Details:', { title, description, date });
  return <ScreenContent path="screens/media-details-screen" title="MediaDetails Screen" />;
};

export default MediaDetails;
