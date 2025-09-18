import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Platform } from 'react-native';
// import Modal from '../screens/modal';
import MinistriesSelectionScreen from 'screens/ministries-selection-screen';
import { useAuth } from 'store/auth-store';
import TabNavigator from './tab-navigator';

export type RootStackParamList = {
  TabNavigator: undefined;
  Modal: undefined;
  MinistriesSelection: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const authUser = useAuth((state) => state.user);

  return (
    <Stack.Navigator initialRouteName={'TabNavigator'}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        {authUser?.hasSelectedMinistries === 'no' && authUser?.role === 'member' ? (
          <Stack.Screen
            name="MinistriesSelection"
            component={MinistriesSelectionScreen}
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
        ) : (
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        )}
      </Stack.Group>
      {/* <Stack.Group
        screenOptions={{
          presentation: Platform.OS === 'ios' ? 'modal' : 'formSheet',
          headerBackButtonDisplayMode: 'minimal',
          headerBackTitle: '',
        }}>
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={{
            title: 'Settings',
            headerTitleStyle: {
              fontSize: 24,
              fontFamily: 'Outfit_600SemiBold',
            },
            headerShadowVisible: false,
          }}
        />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}
