import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { navigate } from 'navigation/root-navigation';
import { db } from '../config/firebase';

export function initializeNotifications() {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log('FCM Message received in the foreground!', remoteMessage);

    const { notification, data } = remoteMessage;

    Notifications.scheduleNotificationAsync({
      content: {
        title: notification?.title,
        body: notification?.body,
        data,
      },
      trigger: null,
    });
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data;

    if (data.ministryId) {
      navigate('MinistryDetails', {
        id: data.ministryId,
        changeType: data.changeType,
      } as any);
    }
  });

  // This handles the case where the app is opened from a notification (background/closed state).
  Notifications.getLastNotificationResponseAsync().then((response) => {
    if (response) {
      const data = response.notification.request.content.data;
      console.log('App opened from notification with data:', data);

      setTimeout(() => {
        if (data.ministryId) {
          navigate('MinistryDetails', {
            id: data.ministryId,
            changeType: data.changeType,
          } as any);
        }
      }, 500);
    }
  });

  return unsubscribe;
}

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

      const userRef = db.collection('users').doc(userId);
      await userRef.set({ pushToken: token }, { merge: true });
    } else {
      console.info('Must use a physical device for Push Notifications');
    }

    return token;
  } catch (error) {
    console.error(error);
  }
}
