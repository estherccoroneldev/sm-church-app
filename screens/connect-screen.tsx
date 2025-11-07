import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import { HeaderButton } from 'components/HeaderButton';
import React from 'react';
import { Alert, Linking } from 'react-native';
import { useAuthStore } from 'store/auth-store';
import { Sheet, SizableText, useTheme, XStack, YStack } from 'tamagui';
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

const TERMS_LINK = 'https://www.iglesiasanmateo.org/app-terms-and-privacy-policy.html';
const PRIVACY_LINK = 'https://www.iglesiasanmateo.org/pp-de-la-app-de-san-mateo.html';
const Connect: React.FC = () => {
  const theme = useTheme();
  const { navigate } = useNavigation<ConnectScreenNavigationProp>();
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState(0);

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

  const signOutAuth = useAuthStore((state) => state.signOut);
  const handleSignOut = async () => {
    try {
      signOutAuth();
      Alert.alert('Cierre de Sesión', 'Ha cerrado sesión exitosamente.');
    } catch (error) {
      Alert.alert('Error signing out:', JSON.stringify(error));
      console.error('Error signing out:', JSON.stringify(error));
    }
  };

  const deleteAccount = async () => {
    try {
      // TO DO: migrate to delete user data from Firestore
      if (auth().currentUser) {
        await auth().currentUser?.delete();
        handleSignOut();
        Alert.alert('Cuenta Borrada', 'Su cuenta ha sido borrada exitosamente.');
      } else {
        Alert.alert(
          'Acción requerida',
          'Por favor, inicie sesión nuevamente para borrar su cuenta.'
        );
        handleSignOut();
      }
    } catch (error: Error | any) {
      if (error.code === 'auth/requires-recent-login') {
        // Handle the re-authentication flow here
        Alert.alert(
          'Re-authentication Required',
          'Por favor, inicie sesión nuevamente para borrar su cuenta.'
        );
        handleSignOut();
      } else {
        Alert.alert(
          'Error',
          'Hubo un error al borrar su cuenta. Por favor, intente nuevamente más tarde.'
        );
        console.error('Error deleting account:', JSON.stringify(error));
      }
    }
  };

  const handlePressDeleteAccount = () => {
    Alert.alert(
      'Borrar Cuenta',
      '¿Estás seguro de que deseas borrar tu cuenta? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: deleteAccount,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Container>
      <YStack mt="$2">
        <XStack flex={1} justifyContent="space-between" py="$4" mb="$2">
          <SizableText fontFamily={'$heading'} fontSize={'$8'}>
            Conéctate
          </SizableText>
          <HeaderButton onPress={() => setOpen((prev) => !prev)} />
        </XStack>
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
      <Sheet
        modal
        forceRemoveScrollEnabled={open}
        open={open}
        onOpenChange={setOpen}
        snapPointsMode={'fit'}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="lazy">
        <Sheet.Overlay />
        <YStack flex={1} backgroundColor={theme.background.get() as string}>
          <SizableText
            fontFamily={'$heading'}
            fontSize={'$8'}
            alignSelf="center"
            px="$4"
            py="$4"
            mb="$8">
            Settings
          </SizableText>
          <XStack my="$6" mx="$6" justifyContent="space-between" alignItems="center">
            <SizableText
              fontFamily={'$heading'}
              fontSize="$5"
              color="#076CB5"
              textDecorationLine="underline"
              onPress={() => {
                // Open terms of service link
                Linking.openURL(TERMS_LINK);
              }}>
              Términos de Servicio
            </SizableText>
            {/* <Separator mx="$2" vertical /> */}
            <SizableText
              fontFamily={'$heading'}
              fontSize="$5"
              color="#076CB5"
              textDecorationLine="underline"
              onPress={() => {
                // Open privacy policy link
                Linking.openURL(PRIVACY_LINK);
              }}>
              Políticas de Privacidad
            </SizableText>
          </XStack>
          <YStack flex={1} mt="$2" p="$8" justifyContent="flex-end">
            <SizableText
              fontFamily="$body"
              fontSize="$6"
              color={'#C6233F'}
              textAlign="center"
              onPress={handlePressDeleteAccount}>
              Eliminar Cuenta
            </SizableText>
            <PrimaryButton
              size="$5"
              mt="$6"
              mb="$2"
              fontSize={'$6'}
              onPress={handleSignOut}
              backgroundColor={'#076CB5'}
              pressStyle={{ opacity: 0.9 }}>
              Cerrar Sesión
            </PrimaryButton>
          </YStack>
        </YStack>
      </Sheet>
    </Container>
  );
};

export default Connect;
