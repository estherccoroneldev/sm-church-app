import { getAuth, PhoneAuthProvider, verifyPhoneNumber } from '@react-native-firebase/auth';
import { RouteProp, useRoute } from '@react-navigation/native';
import TextField from 'components/TextField';
import { AuthStackParamList } from 'navigation/auth-navigator';
import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from 'store/auth-store';
import { Button, SizableText, useTheme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';

const timeoutInMilliseconds = 60000;
type PhoneVerificationScreenRouteProp = RouteProp<AuthStackParamList, 'PhoneVerificationScreen'>;

const PhoneVerificationScreen: React.FC = () => {
  const { params } = useRoute<PhoneVerificationScreenRouteProp>();
  const theme = useTheme();
  const signIn = useAuth((state) => state.signIn);

  const [confirm, setConfirm] = React.useState<any | null>(null);
  const [code, setCode] = React.useState('');

  async function handlePhoneNumberVerification(phoneNumber: string) {
    const confirmation = await verifyPhoneNumber(getAuth(), phoneNumber, timeoutInMilliseconds);

    setConfirm(confirmation);
    Alert.alert('Code sent', 'A verification code has been sent to your phone.');
  }

  async function confirmCode() {
    try {
      const credential = PhoneAuthProvider.credential(confirm.verificationId, code);
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        let userData = await currentUser.linkWithCredential(credential);

        signIn({
          id: userData.user.uid,
          name: `${userData.user.displayName ?? ''}`,
          role: 'member',
          isGuest: false,
        });
      } else {
        console.log('No current user found.');
      }
    } catch (error: Error | any) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
      }
    }
  }

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding={20}
      backgroundColor={theme.background}>
      <SizableText fontSize={24} marginBottom={20} color={theme.color}>
        Verificación de Teléfono
      </SizableText>
      <SizableText fontSize={16} textAlign="center" marginBottom={40} color={theme.color}>
        Se enviará un código de verificación a su número de teléfono: {params.phoneNumber}.
      </SizableText>

      {!confirm ? (
        <PrimaryButton onPress={() => handlePhoneNumberVerification(params.phoneNumber)}>
          Enviar Código
        </PrimaryButton>
      ) : (
        <YStack flex={1} alignItems="center" gap={'$4'}>
          <SizableText fontSize={16} marginBottom={20} color={theme.color}>
            Ingrese el código de verificación recibido:
          </SizableText>
          <TextField
            label=""
            value={code}
            onChangeText={setCode}
            placeholder="123456"
            keyboardType="numeric"
            maxLength={6}
            style={{ letterSpacing: 12, textAlign: 'center', fontSize: 32 }}
            variant="primary"
          />
          <PrimaryButton onPress={confirmCode} disabled={confirm === null || code.length === 0}>
            Confirmar Código
          </PrimaryButton>
        </YStack>
      )}
    </YStack>
  );
};

export default PhoneVerificationScreen;
