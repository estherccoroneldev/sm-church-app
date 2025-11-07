import { getAuth, PhoneAuthProvider, verifyPhoneNumber } from '@react-native-firebase/auth';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import TextField from 'components/TextField';
import { db } from 'config/firebase';
import { RootStackParamList } from 'navigation/root-stack-navigator';
import React from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from 'store/auth-store';
import { SizableText, useTheme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';

const timeoutInMilliseconds = 60000;
type PhoneVerificationScreenRouteProp = RouteProp<RootStackParamList, 'PhoneVerificationScreen'>;

const PhoneVerificationScreen: React.FC = () => {
  const { params } = useRoute<PhoneVerificationScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const signIn = useAuthStore((state) => state.signIn);

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
        const userDocRef = db.collection('users').doc(currentUser.uid);
        const userCredential = await currentUser.linkWithCredential(credential);
        await userDocRef.set(
          {
            isPhoneVerified: true,
            phoneNumber: userCredential.user.phoneNumber,
          },
          { merge: true }
        );
        const userDoc = await userDocRef.get();

        signIn({
          ...userDoc.data(),
        } as any);
      } else {
        console.log('No current user found.');
      }
    } catch (error: Error | any) {
      if (error.code == 'auth/invalid-verification-code') {
        Alert.alert('Código inválido.');
      } else if (error.code == 'auth/credential-already-in-use') {
        Alert.alert('Error de vinculación de cuenta', error.message);
      } else {
        Alert.alert('Error al verificar el código', error.message);
      }
      console.error('Error confirming code:', error);
    } finally {
      navigation.navigate('TabNavigator');
    }
  }

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding={20}
      backgroundColor={theme.background}>
      <SizableText
        fontSize={'$8'}
        textAlign="center"
        lineHeight={'$8'}
        marginBottom={20}
        color={theme.text.get()}>
        Vamos a verificar su número de teléfono
      </SizableText>

      {!confirm ? (
        <>
          <SizableText
            fontSize={'$6'}
            textAlign="center"
            marginBottom={40}
            color={theme.text.get()}>
            Se enviará un código a su número de teléfono: {params.phoneNumber}.
          </SizableText>
          <PrimaryButton px="$8" onPress={() => handlePhoneNumberVerification(params.phoneNumber)}>
            Enviar Código
          </PrimaryButton>
        </>
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
          <PrimaryButton
            px="$8"
            onPress={confirmCode}
            disabled={confirm === null || code.length === 0}>
            Confirmar Código
          </PrimaryButton>
        </YStack>
      )}
    </YStack>
  );
};

export default PhoneVerificationScreen;
