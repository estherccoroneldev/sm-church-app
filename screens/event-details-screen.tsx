import { RouteProp, useRoute } from '@react-navigation/native';
import { EventsParamList } from 'navigation/tab-navigator';
import React from 'react';
import { ScreenContent } from '../components/ScreenContent';

type EventDetailsRouteProp = RouteProp<EventsParamList, 'EventDetails'>;

const EventDetails: React.FC = () => {
  const { params } = useRoute<EventDetailsRouteProp>();

  // Extract the eventId from params
  const eventId = params?.id;
  // Log the eventId to verify it's being passed correctly
  console.log('Event ID:', eventId);
  const { title, description, date } = params || {};
  console.log('Event Details:', { title, description, date });

  return <ScreenContent path="screens/event-details-screen" title="EventDetails Screen" />;
};

export default EventDetails;
