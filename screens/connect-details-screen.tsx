import React from 'react';
import DetailsLayout from '../components/DetailsLayout';
import StaticInfo from '../components/StaticInfo';

const CURRENT_DETAIL = {
  id: 'connect-with-us',
  date: new Date().toString(),
  imageUrl:
    'https://www.iglesiasanmateo.org/uploads/5/6/5/4/56543779/conferencia-lideres-hispanos-2023-2_1.jpg',
  title: `Queremos conocerte y compartir contigo un poco acerca de nuestra Fe.`,
  description: `Nuestra comunidad necesita voluntarios que estén dispuestos a ayudarnos en nuestras diferentes áreas de apoyo.`,
};

const ConnectDetailsScreen: React.FC = () => {
  return (
    <DetailsLayout
      hasDateSection={false}
      hasContactSection={false}
      hasLocationSection={false}
      currentDetail={CURRENT_DETAIL}>
      <StaticInfo />
    </DetailsLayout>
  );
};

export default ConnectDetailsScreen;
