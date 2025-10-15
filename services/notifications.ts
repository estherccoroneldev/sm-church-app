import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function registerForPushNotificationsAsync(userId: string) {
  let token;
  try {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.info('Failed to get push token for push notification!');
        return;
      }

      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      // token = (await Notifications.getDevicePushTokenAsync()).data;
      // token = (await Notifications.getExpoPushTokenAsync()).data;
      // TO DO: remove this out
      // console.log(token);
      console.log('FCM Token:', token);

      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { pushToken: token }, { merge: true });
    } else {
      console.info('Must use a physical device for Push Notifications');
    }

    return token;
  } catch (error) {
    console.error(error);
  }
}
