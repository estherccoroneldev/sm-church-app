import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthStackParamList } from 'navigation/auth-navigator';
import React from 'react';
import { Dimensions } from 'react-native';
import { H3, Image, SizableText, YStack } from 'tamagui';
import { Container, PrimaryButton } from 'tamagui.config';
import { useAuth } from '../store/auth-store';

const { width, height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
const Welcome: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  // TO DO: replace this later by firebase auth
  const signInAsGuest = useAuth((state) => state.signInAsGuest);
  // const user = await auth().signInAnonymously();

  const signIn = useAuth((state) => state.signIn);
  // const user = await auth().signInWithEmailAndPassword(email, password);

  const handleSignInAsGuest = () => {
    signInAsGuest();
  };

  const handlePressRegister = () => {
    navigation.navigate('Register');
  };

  const handlePressSignIn = () => {
    // TO DO: replace this later by firebase auth
    const dummyUser = {
      id: '1234',
      name: 'Rev',
      isGuest: false,
    };

    signIn(dummyUser);
  };

  const handleGoToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <>
      <StatusBar translucent hideTransitionAnimation="fade" />
      <YStack justifyContent="center" alignItems="center" flex={1.5}>
        <Image
          source={require('../assets/background-welcome.png')}
          alt="Logo"
          width={width}
          height={height * 0.5}
          resizeMethod="scale"
        />
      </YStack>

      <YStack
        flex={2}
        justifyContent="center"
        borderTopRightRadius={30}
        borderTopLeftRadius={30}
        mt={-30}
        pt={30}
        backgroundColor="$background"
        padding="$4">
        <Container>
          {/* Welcome to San Mateo Episcopal Church */}
          <H3 textAlign="center" marginBottom="$4">
            Le damos la bienvenida a la Iglesia Episcopal San Mateo
          </H3>
          {/* Join us in our mission to serve the community and grow in faith. */}
          <SizableText fontFamily={'$body'} fontSize="$6" textAlign="center" marginBottom="$6">
            Únase a nosotros en nuestra misión de servir a la comunidad y crecer en la fe.
          </SizableText>

          {/* TO DO: this button should route or change state to Welcome Input */}
          <PrimaryButton size="$5" mt="$6" mb="$2" onPress={handlePressSignIn}>
            Iniciar Sesión
          </PrimaryButton>
          <SizableText
            disabled // TO DO: remove this when the register screen is ready
            fontFamily={'$heading'}
            fontSize="$5"
            textAlign="right"
            marginBottom="$6"
            onPress={handleGoToForgotPassword}
            opacity={0.7}
            pressStyle={{ opacity: 0.5 }}
            color="$blue10">
            Olvidó su contraseña?
          </SizableText>
        </Container>
        <Container justifyContent="flex-end">
          <SizableText
            fontFamily={'$body'}
            fontSize="$5"
            textAlign="center"
            marginBottom="$2"
            onPress={handleSignInAsGuest}
            opacity={0.7}
            hoverStyle={{ opacity: 1 }}
            pressStyle={{ opacity: 0.5 }}>
            Continuar como{' '}
            <SizableText fontFamily={'$heading'} fontSize="$5" color="$blue10">
              Invitado
            </SizableText>
          </SizableText>
          <SizableText
            fontFamily={'$body'}
            fontSize="$5"
            textAlign="center"
            marginBottom="$2"
            onPress={handlePressRegister}
            opacity={0.7}
            hoverStyle={{ opacity: 1 }}
            pressStyle={{ opacity: 0.5 }}>
            No tiene una cuenta?{' '}
            <SizableText fontFamily={'$heading'} fontSize="$5" color="$blue10">
              Crear cuenta
            </SizableText>
          </SizableText>
        </Container>
      </YStack>
    </>
  );
};

export default Welcome;
