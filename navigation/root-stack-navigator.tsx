import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import PhoneVerificationScreen from 'screens/phone-verification-screen';
import RegisterByPhone from 'screens/register-by-phone-screen';
import { UserProfileScreen } from 'screens/user-profile-screen';
import { useTheme } from 'tamagui';
import TabNavigator from './tab-navigator';

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
  MinistriesSelection: undefined;
  RegisterByPhone: { phoneNumber: string; userId: string };
  PhoneVerificationScreen: { phoneNumber: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const theme = useTheme();
  const headerTitleStyle = {
    fontSize: 24,
    fontFamily: 'Outfit_600SemiBold',
    color: theme.text.get() as string,
  };

  return (
    <Stack.Navigator initialRouteName={'TabNavigator'}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen
          name="PhoneVerificationScreen"
          component={PhoneVerificationScreen}
          options={{
            headerShown: true,
            headerTitle: 'Verificación',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerBackVisible: false,
            headerBackButtonDisplayMode: 'minimal',
            headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="RegisterByPhone"
          component={RegisterByPhone}
          options={{
            headerShown: true,
            headerTitle: 'Registro',
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerBackVisible: false,
            headerBackButtonDisplayMode: 'minimal',
            headerTitleStyle,
          }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: Platform.OS === 'ios' ? 'modal' : 'formSheet',
          headerBackButtonDisplayMode: 'minimal',
          headerBackTitle: '',
        }}>
        <Stack.Screen
          name="Modal"
          component={UserProfileScreen}
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
