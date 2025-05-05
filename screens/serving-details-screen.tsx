import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScreenContent } from '../components/ScreenContent';
import { HomeParamList } from '../navigation/tab-navigator';

type ServingDetailsRouteProp = RouteProp<HomeParamList, 'ServingDetails'>;

const ServingDetails: React.FC = () => {
  const { params } = useRoute<ServingDetailsRouteProp>();

  // Extract the eventId from params
  const ServingId = params?.id;
  // Log the ServingId to verify it's being passed correctly
  console.log('Event ID:', ServingId);
  const { title, description } = params || {};
  console.log('Event Details:', { title, description });
  return <ScreenContent path="screens/serving-details-screen" title="ServingDetails Screen" />;
};

export default ServingDetails;
