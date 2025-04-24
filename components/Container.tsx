import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme, YStack } from 'tamagui';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      edges={['left', 'right']}>
      <Theme name="light">
        <YStack flex={1} paddingHorizontal="$6" backgroundColor="$white">
          {children}
        </YStack>
      </Theme>
    </SafeAreaView>
  );
};
