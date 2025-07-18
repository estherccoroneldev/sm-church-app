import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from 'screens/register-screen';
import SignInScreen from 'screens/signin-screen';
import Welcome from 'screens/welcome-screen';
import ForgotPassword from '../screens/forgot-password-screen';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
  Register: undefined;
  RegisterWithPhone: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: true,
          headerTitle: 'Ingreso',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: 'Outfit_600SemiBold',
          },
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
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: 'Outfit_600SemiBold',
          },
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
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: 'Outfit_600SemiBold',
          },
        }}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
}
