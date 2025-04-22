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
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="Modal" component={Modal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
