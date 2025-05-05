import { RouteProp, useRoute } from '@react-navigation/native';
import DetailsLayout from 'components/DetailsLayout';
import React from 'react';
import { HomeParamList } from '../navigation/tab-navigator';

type ServingDetailsRouteProp = RouteProp<HomeParamList, 'ServingDetails'>;

const ServingDetails: React.FC = () => {
  const { params } = useRoute<ServingDetailsRouteProp>();
  const { imageUrl, contactName = 'Gary Oldman' } = params || {};

  return (
    <DetailsLayout currentDetail={{ imageUrl, contactName, ...params }} hasDateSection={false} />
  );
};

export default ServingDetails;
