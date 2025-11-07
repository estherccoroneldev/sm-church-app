import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuthListener } from 'hooks/use-auth-listener';
import React from 'react';
import { initializeNotifications } from 'services/notifications';
import { Spinner } from 'tamagui';
import AuthNavigator from './auth-navigator';
import RootStack, { RootStackParamList } from './root-stack-navigator';

function AppNavigator() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const store = useAuthListener(navigation);

  React.useEffect(() => {
    const unsubscribe = initializeNotifications();

    return () => unsubscribe();
  }, []);

  if (store.initializing)
    return (
      <Spinner
        size="large"
        color={'#076CB5'}
        style={{ alignSelf: 'center', alignItems: 'center' }}
      />
    );

  return store.isAuthenticated ? <RootStack /> : <AuthNavigator />;
}

export default AppNavigator;
