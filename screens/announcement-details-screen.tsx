import { RouteProp, useRoute } from '@react-navigation/native';
import { AnnouncementsParamList } from 'navigation/tab-navigator';
import React from 'react';
import DetailsLayout from '../components/DetailsLayout';

type AnnouncementDetailsRouteProp = RouteProp<AnnouncementsParamList, 'AnnouncementDetails'>;

const AnnouncementDetails: React.FC = () => {
  const { params } = useRoute<AnnouncementDetailsRouteProp>();
  const { imageUrl, contactName = '' } = params || {};

  return <DetailsLayout currentDetail={{ imageUrl, contactName, ...params }} />;
};

export default AnnouncementDetails;
