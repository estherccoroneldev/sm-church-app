import auth from '@react-native-firebase/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { initializeNotifications } from 'services/notifications';
import { useAuth, User } from 'store/auth-store';
import { Spinner } from 'tamagui';
import { db } from '../config/firebase';
import AuthNavigator, { AuthStackParamList } from './auth-navigator';
import RootStack from './root-stack-navigator';

function AppNavigator() {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [initializing, setInitializing] = useState(true);
  const authUser = useAuth((state) => state.user);
  const signIn = useAuth((state) => state.signIn);
  const signOut = useAuth((state) => state.signOut);

  React.useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = db.collection('users').doc(user.uid);
        const userData: User = {
          id: user.uid,
          name: user.displayName || 'Invitado',
          role: 'guest' as const,
          isGuest: true,
        };

        const docSnap = await userDocRef.get();
        if (docSnap.exists()) {
          const data = docSnap.data()!;
          console.info('User data exists');

          if (!data.isPhoneVerified) {
            navigation.navigate('PhoneVerificationScreen', {
              phoneNumber: data.phoneNumber,
            });
            return;
          }

          userData.name = data.firstName || 'Invitado';
          userData.role = data.role || 'member';
          userData.isGuest = false;

          signIn({
            ...userData,
          });
        } else if (!!user.phoneNumber && user.phoneNumber.length > 0) {
          navigation.navigate('RegisterByPhone', {
            phoneNumber: user.phoneNumber,
            userId: user.uid,
          });
        }
      } else {
        signOut();
      }

      if (initializing) setInitializing(false);
    });

    return () => unsubscribeAuth();
  }, []);

  React.useEffect(() => {
    const unsubscribe = initializeNotifications();

    return () => unsubscribe();
  }, []);

  if (initializing)
    return (
      <Spinner
        size="large"
        color={'#076CB5'}
        style={{ alignSelf: 'center', alignItems: 'center' }}
      />
    );

  return authUser ? <RootStack /> : <AuthNavigator />;
}

export default AppNavigator;
