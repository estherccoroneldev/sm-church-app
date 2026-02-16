import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { AuthStackParamList } from 'navigation/auth-navigator';
import React from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from 'store/auth-store';
import { H4, SizableText, useTheme, YStack } from 'tamagui';
import { Container, PrimaryButton } from 'tamagui.config';

const { width, height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
const Welcome: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const signInAsGuest = useAuthStore((state) => state.signInAsGuest);
  const handleSignInAsGuest = async () => {
    try {
      await auth().signInAnonymously();
      const user = auth().currentUser;
      signInAsGuest(user!);
    } catch (error: Error | any) {
      // Handle each firebase auth error
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  const handlePressRegister = () => {
    navigation.navigate('Register');
  };

  const handlePressSignIn = () => {
    // navigation.navigate('SignIn');
    navigation.navigate('SignInWithPhoneNumber');
  };

  const handleGoToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}
      edges={['left', 'right', 'bottom']}>
      <StatusBar style="light" translucent hideTransitionAnimation="fade" />
      <YStack justifyContent="center" alignItems="center" flex={1.6}>
        <Image
          source={require('../assets/welcome-to-church.jpeg')}
          style={{
            width: '100%',
            height: height * 0.5,
          }}
          contentFit="cover"
          contentPosition="top"
          alt="Logo"
          transition={200}
          cachePolicy="disk"
          accessibilityRole="image"
        />
      </YStack>

      <YStack
        flex={2}
        justifyContent="center"
        borderTopRightRadius={30}
        borderTopLeftRadius={30}
        mt={-30}
        pt={20}
        backgroundColor="$background"
        px="$4">
        <Container>
          {/* Welcome to San Mateo Episcopal Church */}
          <H4 textAlign="center">Le damos la bienvenida!</H4>
          {/* Join us in our mission to serve the community and grow in faith. */}
          <SizableText fontFamily={'$body'} fontSize="$5" textAlign="center" my="$4">
            Únase a nosotros en nuestra misión de servir a la comunidad y crecer en la fe.
          </SizableText>

          <YStack
            minWidth={width * 0.9}
            py="$8"
            px="$6"
            justifyContent="center"
            alignSelf="center"
            gap="$2">
            <PrimaryButton onPress={handlePressSignIn}>Iniciar Sesión</PrimaryButton>
            <SizableText
              fontFamily={'$heading'}
              fontSize="$4"
              textAlign="right"
              onPress={handleGoToForgotPassword}
              opacity={0.7}
              pressStyle={{ opacity: 0.5 }}
              color="$blue10">
              Olvidó su contraseña?
            </SizableText>
          </YStack>
        </Container>
        <Container justifyContent="flex-end" gap="$1">
          <SizableText
            fontFamily={'$body'}
            fontSize="$4"
            textAlign="center"
            onPress={handleSignInAsGuest}
            opacity={0.7}
            hoverStyle={{ opacity: 1 }}
            pressStyle={{ opacity: 0.5 }}>
            Continuar como{' '}
            <SizableText fontFamily={'$heading'} fontSize="$4" color="$blue10">
              Invitado
            </SizableText>
          </SizableText>
          <SizableText
            fontFamily={'$body'}
            fontSize="$4"
            textAlign="center"
            onPress={handlePressRegister}
            opacity={0.7}
            hoverStyle={{ opacity: 1 }}
            pressStyle={{ opacity: 0.5 }}>
            No tiene una cuenta?{' '}
            <SizableText fontFamily={'$heading'} fontSize="$4" color="$blue10">
              Crear cuenta
            </SizableText>
          </SizableText>
        </Container>
      </YStack>
    </SafeAreaView>
  );
};

export default Welcome;
