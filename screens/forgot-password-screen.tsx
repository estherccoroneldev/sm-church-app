import React from 'react';
import { Button, ButtonText } from 'tamagui';
import { ScreenContent } from '../components/ScreenContent';

const ForgotPassword: React.FC = () => {
  const handlePress = () => {
    // Handle the button press event here
    console.log('Button pressed');
  };

  return (
    <ScreenContent path="screens/forgot-possword/index.tsx" title="Forgot Password Screen">
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
        <ButtonText>Forgot Password</ButtonText>
      </Button>
    </ScreenContent>
  );
};

export default ForgotPassword;
