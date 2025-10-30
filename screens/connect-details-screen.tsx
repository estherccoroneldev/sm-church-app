import React from 'react';
import { Dimensions } from 'react-native';
import { H3, Image, SizableText, YStack } from 'tamagui';
import { Container } from '../components/Container';
import StaticInfo from '../components/StaticInfo';

const CURRENT_DETAIL = {
  id: 'connect-with-us',
  date: new Date().toString(),
  imageUrl:
    'https://www.iglesiasanmateo.org/uploads/5/6/5/4/56543779/conferencia-lideres-hispanos-2023-2_1.jpg',
  title: `Queremos conocerte y compartir contigo un poco acerca de nuestra Fe.`,
  description: `Nuestra comunidad necesita voluntarios que estén dispuestos a ayudarnos en nuestras diferentes áreas de apoyo.`,
};
const { height } = Dimensions.get('window');
const DEFAULT_IMAGE = require('../assets/church-placeholder.png');
const ConnectDetailsScreen: React.FC = () => {
  return (
    <Container>
      <Image
        source={CURRENT_DETAIL.imageUrl ? { uri: CURRENT_DETAIL.imageUrl } : DEFAULT_IMAGE}
        width="100%"
        height={height * 0.35}
        borderRadius="$6"
        marginBottom="$2"
        alt={CURRENT_DETAIL.title}
        aria-label={CURRENT_DETAIL.title}
      />
      <YStack marginVertical="$4">
        <H3>{CURRENT_DETAIL.title}</H3>
      </YStack>

      <SizableText fontFamily={'$body'} fontSize="$7">
        {CURRENT_DETAIL.description}
      </SizableText>
      <StaticInfo />
    </Container>
  );
};

export default ConnectDetailsScreen;
