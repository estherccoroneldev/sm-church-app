import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from 'screens/register-screen';
import Welcome from 'screens/welcome-screen';
import ForgotPassword from '../screens/forgot-password-screen';
import Login from '../screens/login-screen';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
  Register: undefined;
  RegisterWithPhone: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
