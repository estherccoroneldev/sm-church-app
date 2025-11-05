import auth from '@react-native-firebase/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from 'navigation/auth-navigator';
import React from 'react';
import { Alert } from 'react-native';
import { SizableText, Spinner, useTheme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { formatPhoneNumber } from 'utils/formatPhoneNumber';
import TextField from '../components/TextField';

const SignInWithPhoneNumberScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const theme = useTheme();
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [confirmation, setConfirmation] = React.useState<any>(null);

  const sendVerification = async () => {
    if (!phone) return Alert.alert('Phone required', 'Please enter your phone number.');

    if (!auth) {
      console.error('Firebase services are not initialized. Please wait');
      return;
    }

    const formattedNumber = formatPhoneNumber(phone);
    if (!formattedNumber) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    console.log('formattedNumber', formattedNumber);

    setLoading(true);
    try {
      const confirmationResult = await auth().signInWithPhoneNumber(formattedNumber);

      setConfirmation(confirmationResult);
      Alert.alert('Code sent', 'A verification code has been sent to your phone.');
    } catch (err: any) {
      console.warn('sendVerification error', err);
      Alert.alert('Failed to send verification', err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = async () => {
    if (!confirmation)
      return Alert.alert('No verification requested', 'Please request a verification code first.');
    if (!code)
      return Alert.alert('Code required', 'Please enter the verification code you received.');
    setLoading(true);

    try {
      await confirmation.confirm(code.trim());
    } catch (err: any) {
      console.warn('confirmCode error', err);
      Alert.alert('Verification failed', err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoToEmailSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding={'$4'}
      gap={'$4'}
      backgroundColor={theme.background}>
      <SizableText fontFamily={'$body'} fontSize="$6" textAlign="center" my="$6" mx="$4">
        {!confirmation
          ? 'Por favor ingrese su número de teléfono para continuar.'
          : 'Ingrese el código de verificación que recibió.'}
      </SizableText>
      {!confirmation ? (
        <YStack flex={1} gap="$4" px="$4">
          <TextField
            label=""
            // placeholder="Número de Teléfono"
            keyboardType="phone-pad"
            returnKeyType="done"
            value={phone}
            onChangeText={setPhone}
            variant="primary"
            style={{ letterSpacing: 8, fontSize: 32 }}
          />
          <PrimaryButton
            onPress={sendVerification}
            backgroundColor={theme.primary.get()}
            px="$12"
            icon={loading ? <Spinner size="small" color="$white" /> : undefined}
            color={theme.white.get()}>
            {'Enviar código'}
          </PrimaryButton>
          <SizableText
            fontFamily={'$heading'}
            fontSize="$6"
            textAlign="right"
            my="$6"
            onPress={handleGoToEmailSignIn}
            opacity={0.7}
            pressStyle={{ opacity: 0.5 }}
            color="$blue10">
            Iniciar Sesión con email
          </SizableText>
        </YStack>
      ) : (
        <YStack flex={1} gap="$4" px="$4">
          <TextField
            label=""
            placeholder="123456"
            keyboardType="number-pad"
            returnKeyType="done"
            value={code}
            onChangeText={setCode}
            variant="primary"
            maxLength={6}
            style={{ letterSpacing: 12, textAlign: 'center', fontSize: 32 }}
          />
          <PrimaryButton
            onPress={confirmCode}
            backgroundColor={theme.primary.get()}
            px={'$7'}
            icon={loading ? <Spinner size="small" color="$white" /> : undefined}
            color={theme.white.get()}>
            Confirmar código
          </PrimaryButton>
        </YStack>
      )}
    </YStack>
  );
};

export default SignInWithPhoneNumberScreen;
