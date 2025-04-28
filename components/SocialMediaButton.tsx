import FontAwesome from '@expo/vector-icons/FontAwesome';
import { forwardRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface SocialMediaButtonProps extends React.ComponentProps<typeof FontAwesome> {
  onPress?: () => void;
}

export const SocialMediaButton = forwardRef<typeof Pressable, SocialMediaButtonProps>(
  ({ onPress, name, size, color }, _ref) => {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome
            name={name}
            size={size}
            color={color}
            style={[
              styles.button,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          />
        )}
      </Pressable>
    );
  }
);

export const styles = StyleSheet.create({
  button: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 50,
  },
});
