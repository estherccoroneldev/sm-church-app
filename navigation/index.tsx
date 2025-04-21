import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useAuth } from 'store/auth-store';
import AuthNavigator from './auth-navigator';
import RootStack from './root-stack-navigator';

// import auth from '@react-native-firebase/auth';

// TO DO: handle conditional for login functionality w firebase
function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const user = useAuth((state) => state.user);

  // TO DO: Remove this logic when using firebase
  React.useEffect(() => {
    const init = async () => {
      setTimeout(() => {
        setInitializing(false);
        if (initializing) setInitializing(false);
      }, 1000);
    };

    init();
  }, []);

  // React.useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   });
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <StatusBar />
      {user ? <RootStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default AppNavigator;
