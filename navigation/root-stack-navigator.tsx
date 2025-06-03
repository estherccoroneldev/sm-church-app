import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Modal from '../screens/modal';
import TabNavigator, { TabParamList } from './tab-navigator';

export type RootStackParamList = {
  TabNavigator: TabParamList;
  Modal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerBackButtonDisplayMode: 'minimal',
          headerBackTitle: '',
        }}>
        <Stack.Screen name="Modal" component={Modal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
