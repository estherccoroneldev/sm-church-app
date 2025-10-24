import auth from '@react-native-firebase/auth';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { useAuth } from 'store/auth-store';
import { Spinner } from 'tamagui';
import { db } from '../config/firebase';
import AuthNavigator from './auth-navigator';
import RootStack from './root-stack-navigator';

function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const authUser = useAuth((state) => state.user);
  const signIn = useAuth((state) => state.signIn);
  const signOut = useAuth((state) => state.signOut);

  React.useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = db.collection('users').doc(user.uid);
        const userData = {
          id: user.uid,
          name: user.displayName || 'Invitado',
          role: 'guest' as const,
        };

        const docSnap = await userDocRef.get();
        if (docSnap.exists()) {
          const data = docSnap.data()!;

          userData.name = data.firstName || 'Invitado';
          userData.role = data.role || 'member';
        }
        signIn({
          ...userData,
          isGuest: false,
        });
      } else {
        signOut();
      }

      if (initializing) setInitializing(false);
    });

    return () => unsubscribeAuth();
  }, []);

  if (initializing)
    return <Spinner size="large" color={'#076CB5'} style={{ alignSelf: 'center' }} />;

  return <NavigationContainer>{authUser ? <RootStack /> : <AuthNavigator />}</NavigationContainer>;
}

export default AppNavigator;
