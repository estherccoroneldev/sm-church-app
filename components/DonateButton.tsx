import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet } from 'react-native';
import { H5, XStack } from 'tamagui';

// This is the official Zelle website. It explains Zelle, but doesn't
// allow direct payments from the browser. For actual donations, you'd
// need to provide your Zelle-registered email or phone number.
// const ZELLE_WEBSITE_URL = 'https://www.zellepay.com/';

const DEFAULT_IMAGE = require('../assets/zelle-logo.png');
const CHURCH_ZELLE_EMAIL = 'oficina.iesm@gmail.com';

// TO DO: intl and accessibility
const ZelleDonateButton: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = React.useState('');

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedEmail(text);
    Alert.alert('Copied to Clipboard', `Email ${text} copied to clipboard.`);
  };

  const handlePress = async () => {
    try {
      Alert.alert(
        'Donar con Zelle',
        `To donate, please open your banking app, find Zelle, and send money to ${CHURCH_ZELLE_EMAIL}. \n\nThis button will copy the email to your clipboard for easy pasting.\n\nYou can also visit the Zelle website for more information.`,
        [
          {
            text: 'Copy Email',
            onPress: async () => await copyToClipboard(CHURCH_ZELLE_EMAIL),
          },
        ]
      );
    } catch (error) {
      // Catch any unexpected errors during the linking process
      console.error('Error opening Zelle link:', error);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <XStack
          mt={'$4'}
          gap={'$4'}
          style={[
            styles.button,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}>
          <H5 mr={-8} color={'#673ab7'}>
            Donar con
          </H5>
          <Image
            source={DEFAULT_IMAGE}
            style={styles.logo}
            onError={(e) => console.error('Failed to load Zelle logo:', e.nativeEvent.error)}
          />
        </XStack>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 2,
    paddingHorizontal: 32,
    marginHorizontal: 'auto',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 55,
    resizeMode: 'cover',
  },
});

export default ZelleDonateButton;
