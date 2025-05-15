import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import DetailsLayout from '../components/DetailsLayout';
import StaticInfo from '../components/StaticInfo';
import { HomeParamList } from '../navigation/tab-navigator';

type ServingDetailsRouteProp = RouteProp<HomeParamList, 'ServingDetails'>;

const ServingDetails: React.FC = () => {
  const { params } = useRoute<ServingDetailsRouteProp>();
  const { imageUrl, contactName = 'Gary Oldman' } = params || {};

  return (
    <DetailsLayout
      currentDetail={{ imageUrl, contactName, ...params }}
      hasDateSection={false}
      hasContactSection={false}
      hasLocationSection={false}>
      <StaticInfo {...params} />
    </DetailsLayout>
  );
};

export default ServingDetails;
