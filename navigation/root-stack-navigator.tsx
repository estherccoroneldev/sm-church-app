import { createStackNavigator } from '@react-navigation/stack';

import Modal from '../screens/modal';
import TabNavigator, { TabParamList } from './tab-navigator';

export type RootStackParamList = {
  TabNavigator: TabParamList;
  Modal: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          // headerShown: false,
        }}>
        <Stack.Screen name="Modal" component={Modal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
