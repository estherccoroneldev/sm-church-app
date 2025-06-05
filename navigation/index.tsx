import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { useAuth } from 'store/auth-store';
import { Spinner } from 'tamagui';
import { auth } from '../config/firebase';
import AuthNavigator from './auth-navigator';
import RootStack from './root-stack-navigator';

function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const user = useAuth((state) => state.user);
  const signIn = useAuth((state) => state.signIn);
  const signOut = useAuth((state) => state.signOut);

  React.useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (initializing) setInitializing(false);

      if (user) {
        // TO DO: handle the name's source, e.g., from user profile or firestore users collection
        signIn({ id: user.uid, name: user.displayName || 'Guest', isGuest: false });
      } else {
        signOut();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (initializing)
    return <Spinner size="large" color={'#076CB5'} style={{ alignSelf: 'center' }} />;

  return <NavigationContainer>{user ? <RootStack /> : <AuthNavigator />}</NavigationContainer>;
}

export default AppNavigator;
