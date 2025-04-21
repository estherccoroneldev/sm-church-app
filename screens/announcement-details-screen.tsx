import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeParamList } from 'navigation/tab-navigator';
import React from 'react';
import { ScreenContent } from '../components/ScreenContent';

type AnnouncementDetailsRouteProp = RouteProp<HomeParamList, 'AnnouncementDetails'>;

const AnnouncementDetails: React.FC = () => {
  const { params } = useRoute<AnnouncementDetailsRouteProp>();

  // Extract the eventId from params
  const announcementId = params?.id;
  // Log the announcementId to verify it's being passed correctly
  console.log('Event ID:', announcementId);
  const { title, description, date } = params || {};
  console.log('Event Details:', { title, description, date });
  return (
    <ScreenContent path="screens/announcement-details-screen" title="AnnouncementDetails Screen" />
  );
};

export default AnnouncementDetails;
