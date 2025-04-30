import './translation';

import 'react-native-gesture-handler';

import { Outfit_300Light, Outfit_600SemiBold, useFonts } from '@expo-google-fonts/outfit';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

import AppNavigator from 'navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import config from './tamagui.config';
SplashScreen.preventAutoHideAsync();

// TO DO: Add accessibility labels to all components
export default function App() {
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
      <TamaguiProvider config={config}>
        <AppNavigator />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
