import './translation';

import 'react-native-gesture-handler';

import { Outfit_300Light, Outfit_600SemiBold, useFonts } from '@expo-google-fonts/outfit';
import messaging from '@react-native-firebase/messaging';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from 'navigation';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.info('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    Outfit_600SemiBold,
    Outfit_300Light,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme={theme}>
        <StatusBar style={'light'} translucent={false} />
        <AppNavigator />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
