import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Theme } from 'tamagui';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      edges={['left', 'right']}>
      <Theme name="light">
        <ScrollView
          flex={1}
          paddingHorizontal="$4"
          contentContainerStyle={{ paddingBottom: 24 + BOTTOM_TAB_HEIGHT, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </Theme>
    </SafeAreaView>
  );
};
