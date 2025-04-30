import { RouteProp, useRoute } from '@react-navigation/native';
import { EventsParamList } from 'navigation/tab-navigator';
import React from 'react';
import DetailsLayout from '../components/DetailsLayout';

type EventDetailsRouteProp = RouteProp<EventsParamList, 'EventDetails'>;

const EventDetails: React.FC = () => {
  const { params } = useRoute<EventDetailsRouteProp>();
  const { imageUrl, contact = 'Gary Oldman' } = params || {};

  return <DetailsLayout currentDetail={{ imageUrl, contact, ...params }} />;
};

export default EventDetails;
