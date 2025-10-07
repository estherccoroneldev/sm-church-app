import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, useTheme } from 'tamagui';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}
      edges={['left', 'right', 'bottom']}>
      <ScrollView
        flex={1}
        paddingHorizontal="$4"
        contentContainerStyle={{ paddingBottom: 24 + BOTTOM_TAB_HEIGHT, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
