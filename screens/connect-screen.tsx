import React from 'react';
// import { useAuth } from 'store/auth-store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConnectParamList } from 'navigation/tab-navigator';
import { YStack } from 'tamagui';
import CardItem from '../components/CardItem';
import { Container } from '../components/Container';

const connectItems = [
  {
    id: 'item-1',
    title: 'Conéctate con nosotros',
    description: 'Haznos saber cómo podemos apoyarte.',
    imageUrl: 'https://www.iglesiasanmateo.org/uploads/5/6/5/4/56543779/dsc-4296_orig.jpg',
  },
  {
    id: 'item-2',
    title: 'Encuentra un grupo',
    description: 'Encuentra tu lugar uniéndote a uno de nuestros grupos',
    imageUrl:
      'https://www.iglesiasanmateo.org/uploads/5/6/5/4/56543779/conferencia-lideres-hispanos-2023-2_1.jpg',
  },
  {
    id: 'item-3',
    title: 'Oportunidades de Servicio',
    description: 'Encuentra tu lugar sirviendo en la iglesia, en la ciudad o en el mundo',
    imageUrl: 'https://www.iglesiasanmateo.org/uploads/5/6/5/4/56543779/dsc-8256_orig.jpg',
  },
  {
    id: 'item-4',
    title: 'Sobre nosotros',
    description: '',
    // TO DO: replace this image by the actual church front
    imageUrl:
      'https://www.iglesiasanmateo.org/uploads/5/6/5/4/56543779/background-images/936258497.jpg',
  },
];

type ConnectScreenNavigationProp = NativeStackNavigationProp<ConnectParamList, 'ConnectTab'>;

const Connect: React.FC = () => {
  // TO DO: REMOVE THIS BUTTON and replace this later by firebase auth
  // const signOut = useAuth((state) => state.signOut);
  // const handlePress = () => {
  //   signOut();
  // };

  const { navigate } = useNavigation<ConnectScreenNavigationProp>();

  const handlePress = (itemId: string) => () => {
    switch (itemId) {
      case 'item-3':
        return navigate('ServingList');
      case 'item-4':
        return navigate('AboutUs');
      default:
        // TO DO: SHould show the Toast Message here
        undefined;
    }
  };
  return (
    <Container>
      <YStack px="$2" mt="$2">
        {connectItems.map((item) => (
          <CardItem
            key={item.id}
            fullmode
            item={item}
            hasDateSection
            hasDescription
            onPress={handlePress(item.id)}
          />
        ))}
      </YStack>
    </Container>
  );
};

export default Connect;
