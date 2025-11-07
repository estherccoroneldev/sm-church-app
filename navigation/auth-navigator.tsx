import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneVerificationScreen from 'screens/phone-verification-screen';
import RegisterByPhone from 'screens/register-by-phone-screen';
import Register from 'screens/register-screen';
import SignInScreen from 'screens/signin-screen';
import SignInWithPhoneNumberScreen from 'screens/signin-with-phone';
import Welcome from 'screens/welcome-screen';
import { useTheme } from 'tamagui';
import ForgotPassword from '../screens/forgot-password-screen';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
  Register: undefined;
  SignIn: undefined;
  SignInWithPhoneNumber: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const theme = useTheme();
  const headerTitleStyle = {
    fontSize: 24,
    fontFamily: 'Outfit_600SemiBold',
    color: theme.text.get() as string,
  };
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.background.get() as string,
        },
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: true,
          headerTitle: 'Iniciar Sesión',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="SignInWithPhoneNumber"
        component={SignInWithPhoneNumberScreen}
        options={{
          headerShown: true,
          headerTitle: 'Iniciar Sesión',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTitle: 'Registro',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle,
        }}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
}
