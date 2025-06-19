import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import DetailsLayout from '../components/DetailsLayout';
import StaticInfo from '../components/StaticInfo';
import { HomeParamList } from '../navigation/tab-navigator';

type MinistryDetailsRouteProp = RouteProp<HomeParamList, 'MinistryDetails'>;

const MinistryDetails: React.FC = () => {
  const { params } = useRoute<MinistryDetailsRouteProp>();
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

export default MinistryDetails;
