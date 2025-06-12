import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { auth } from 'config/firebase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from 'store/auth-store';
import { YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import CardItem from '../components/CardItem';
import { Container } from '../components/Container';
import { ConnectParamList } from '../navigation/tab-navigator';

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
  const signOutAuth = useAuth((state) => state.signOut);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      signOutAuth();
      Alert.alert('Signed Out', 'You have been successfully signed out.');
    } catch (error) {
      console.error('Error signing out:', JSON.stringify(error));
      // Alert.alert('Sign Out Error', JSON.stringify(error));
    }
  };

  const { navigate } = useNavigation<ConnectScreenNavigationProp>();

  const handlePress = (itemId: string) => () => {
    switch (itemId) {
      case 'item-1':
        return navigate('ConnectDetails');
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
      <YStack mt="$2">
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
      <PrimaryButton
        size="$5"
        mt="$6"
        mb="$2"
        onPress={handleSignOut}
        backgroundColor={'#C6233F'}
        pressStyle={{ opacity: 0.9 }}>
        {`Cerrar Sesión`}
      </PrimaryButton>
    </Container>
  );
};

export default Connect;
