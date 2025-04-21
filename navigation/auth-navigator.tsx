import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from '../screens/forgot-password-screen';
import Login from '../screens/login-screen';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
