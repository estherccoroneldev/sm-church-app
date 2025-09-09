import { Container } from 'components/Container';
import { auth } from 'config/firebase';
import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'store/auth-store';
import { SizableText, Theme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
// import { Platform } from 'react-native';
// import { InternalizationExample } from '../components/InternalizationExample';
// import { ScreenContent } from '../components/ScreenContent';

// <>
//   {/* <ScreenContent path="screens/modal.tsx" title="Modal"> */}
//   {/* <InternalizationExample /> */}
//   {/* </ScreenContent> */}
//   {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}

// </>

export default function Modal() {
  const signOutAuth = useAuth((state) => state.signOut);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      signOutAuth();
      Alert.alert('Cierre de Sesión', 'Ha cerrado sesión exitosamente.');
    } catch (error) {
      console.error('Error signing out:', JSON.stringify(error));
    }
  };

  const deleteAccount = async () => {
    try {
      if (auth.currentUser) {
        await auth.currentUser.delete();
        signOutAuth();
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 24,
      }}>
      <Theme name="light">
        <StatusBar style="auto" />
        <YStack flex={1} mt="$2" justifyContent="flex-end">
          <SizableText
            fontFamily="$body"
            fontSize="$6"
            color={'#C6233F'}
            textAlign="center"
            onPress={handlePressDeleteAccount}>
            Borrar Cuenta
          </SizableText>
        </YStack>
        <PrimaryButton
          size="$5"
          mt="$6"
          mb="$2"
          onPress={handleSignOut}
          backgroundColor={'#C6233F'}
          pressStyle={{ opacity: 0.9 }}>
          Cerrar Sesión
        </PrimaryButton>
      </Theme>
    </SafeAreaView>
  );
}
