import FontAwesome from '@expo/vector-icons/FontAwesome';
import { forwardRef } from 'react';
import { Pressable } from 'react-native';
import { SizableText, useTheme, XStack } from 'tamagui';

export const RedirectItemPress = forwardRef<
  typeof Pressable,
  { onPress?: () => void; title: string }
>(({ onPress, title }, _ref) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <XStack
          justifyContent="space-between"
          alignItems="center"
          my="$2"
          px="$4"
          py="$3"
          opacity={pressed ? 0.8 : 1}>
          <SizableText fontFamily={'$heading'} fontSize="$5" color={'$primary'}>
            {title}
          </SizableText>
          <FontAwesome name="arrow-right" size={20} color={theme.primary.get()} />
        </XStack>
      )}
    </Pressable>
  );
});
