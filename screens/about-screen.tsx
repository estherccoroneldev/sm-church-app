import React from 'react';
import { useAuth } from 'store/auth-store';
import { Button, ButtonText } from 'tamagui';
import { ScreenContent } from '../components/ScreenContent';

const About: React.FC = () => {
  // TO DO: REMOVE THIS BUTTON and replace this later by firebase auth
  const signOut = useAuth((state) => state.signOut);
  const handlePress = () => {
    signOut();
  };

  return (
    <ScreenContent path="screens/about-screen" title="About Screen">
      <Button
        size="$4"
        onPress={handlePress}
        theme="alt1"
        backgroundColor="$background"
        color="$color"
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$2"
        padding="$2"
        margin="$2">
        <ButtonText>Logout</ButtonText>
      </Button>
    </ScreenContent>
  );
};

export default About;
