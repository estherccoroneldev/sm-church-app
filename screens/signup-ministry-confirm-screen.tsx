import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from 'components/Container';
import { Alert } from 'react-native';
import { useAuth } from 'store/auth-store';
import { SizableText, useTheme } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { ConnectParamList } from '../navigation/tab-navigator';
import { signupUserToPendingMemberArray } from '../services/signup-pending-member';

type SignupMinistryConfirmScreenProps = NativeStackScreenProps<
  ConnectParamList,
  'SignupMinistryConfirm'
>;

const SignupMinistryConfirmScreen: React.FC<SignupMinistryConfirmScreenProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const { userId, ministryId, ministryName } = route.params;
  const user = useAuth((state) => state.user);
  const signOutAuth = useAuth((state) => state.signOut);

  const handleConfirmSignup = async () => {
    try {
      const result = await signupUserToPendingMemberArray(userId, ministryId);
      if (result.success) {
        Alert.alert(
          `¡Gracias por tu interés en unirte al ministerio ${ministryName}! Pronto nos pondremos en contacto contigo.`
        );

        // Alert.alert(
        //   'Nos alegra que te unas a nosotros!',
        //   `¡Te has inscrito exitosamente en el ministerio ${ministryName}! En breve nos comunicaremos contigo.`
        // );
        navigation.goBack();
      } else {
        console.error('Error', 'There was an issue signing you up. Please try again later.');
      }
    } catch (error) {
      console.error('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const handleRedirectToLogin = async () => {
    try {
      signOutAuth();
    } catch (error) {
      console.error('Error signing out:', JSON.stringify(error));
    }
  };

  return (
    <Container>
      {user && !user.isGuest ? (
        <>
          <SizableText fontSize="$7" marginBottom="$4" color={theme.foreground}>
            Confirmar inscripción al ministerio
          </SizableText>
          <SizableText fontSize="$6" marginBottom="$6" color={theme.foreground}>
            Usted está a punto de inscribirse en el ministerio {ministryName}. Por favor confirme su
            elección.
          </SizableText>
          <PrimaryButton
            size="$5"
            mt="$6"
            mb="$2"
            fontSize={'$6'}
            onPress={handleConfirmSignup}
            pressStyle={{ opacity: 0.9 }}>
            Confirmar
          </PrimaryButton>
        </>
      ) : (
        <>
          <SizableText fontSize="$6" marginBottom="$6" color={theme.foreground}>
            Por favor inicie sesión para inscribirse en el ministerio {ministryName}. Pero no se
            preocupe, es rápido y sencillo.
          </SizableText>
          <PrimaryButton
            size="$5"
            mt="$6"
            mb="$2"
            fontSize={'$6'}
            onPress={handleRedirectToLogin}
            pressStyle={{ opacity: 0.9 }}>
            Login
          </PrimaryButton>
        </>
      )}
    </Container>
  );
};

export default SignupMinistryConfirmScreen;
