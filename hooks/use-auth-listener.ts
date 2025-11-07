import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/root-stack-navigator';
import { useEffect } from 'react';
import { UserProfile } from '../@types/user';
import { useAuthStore } from '../store/auth-store';

export const useAuthListener = (navigation: NavigationProp<RootStackParamList>) => {
  const store = useAuthStore();

  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged((user) => {
      store.setAuthUser(user);

      if (store.initializing) {
        store.setInitializing(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!store.user) {
      store.setUserData(null);
      return;
    }

    const userDocRef = firestore().collection('users').doc(store.user.uid);

    const unsubscribeFirestore = userDocRef.onSnapshot((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile | undefined;

        if (data) {
          if (data.phoneNumber && !data.isPhoneVerified) {
            if (
              navigation.getState().routes[navigation.getState().index]?.name !==
              'PhoneVerificationScreen'
            ) {
              navigation.navigate('PhoneVerificationScreen', {
                phoneNumber: data.phoneNumber,
              });
            }
          } else {
            store.signIn(data);
          }
        }
      } else if (store.user?.phoneNumber && !store.userData) {
        if (navigation.getState().routes[navigation.getState().index]?.name !== 'RegisterByPhone') {
          navigation.navigate('RegisterByPhone', {
            phoneNumber: store.user.phoneNumber,
            userId: store.user.uid,
          });
        }
      } else {
        // Default fallback for other states (e.g., if Firestore is down, profile isn't ready)
        store.setUserData(null);
      }
    });

    return () => unsubscribeFirestore();
  }, [store.user]);

  return store;
};
