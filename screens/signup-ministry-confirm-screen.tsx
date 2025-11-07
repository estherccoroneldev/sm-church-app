import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from 'components/Container';
import { Alert } from 'react-native';
import { useAuthStore } from 'store/auth-store';
import { useMinistryStore } from 'store/ministries-store';
import { SizableText, useTheme } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { UserProfile } from '../@types/user';
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
  const user = useAuthStore((state) => state.userData);
  const signOutAuth = useAuthStore((state) => state.signOut);
  const isGuest = useAuthStore((state) => state.isGuest);
  const updateMinistry = useMinistryStore((state) => state.updateMinistry);
  const getMinistry = useMinistryStore((state) => state.getMinistry);
  const ministry = getMinistry(ministryId);

  const handleConfirmSignup = async () => {
    try {
      const result = await signupUserToPendingMemberArray(userId, ministryId);
      if (result.success) {
        Alert.alert(
          `¡Gracias por su interés en unirse al ministerio ${ministryName}! Pronto nos pondremos en contacto con ustedes.`
        );

        updateMinistry({
          ministryId,
          newData: {
            pendingMembers: [...(ministry?.pendingMembers || []), user as UserProfile],
          },
        });

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
      {user && !isGuest ? (
        <>
          <SizableText fontSize="$7" py="$4" color={theme.foreground} textAlign="center">
            Confirmar inscripción al ministerio
          </SizableText>
          <SizableText fontSize="$6" py="$2" color={theme.foreground} textAlign="center">
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
