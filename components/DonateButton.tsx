// import * as Linking from 'expo-linking';
import React from 'react';
import { Alert, Image, Linking, Pressable, StyleSheet } from 'react-native';
import { H5, XStack } from 'tamagui';

// This is the official Zelle website. It explains Zelle, but doesn't
// allow direct payments from the browser. For actual donations, you'd
// need to provide your Zelle-registered email or phone number.
const ZELLE_WEBSITE_URL = 'https://www.zellepay.com/';
const DEFAULT_IMAGE = require('../assets/zelle-logo.png');

// TO DO: intl and accessibility
const ZelleDonateButton: React.FC = () => {
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(ZELLE_WEBSITE_URL);

      if (supported) {
        // TO DO: should copy the email to clipboard instead of going to the website?
        Alert.alert(
          'Donate with Zelle',
          `To donate, please open your banking app, find Zelle, and send money to [Zelle email of Church]. \n\nThis button will take you to the Zelle website for more info.`,
          [
            {
              text: 'OK',
              onPress: async () => await Linking.openURL(ZELLE_WEBSITE_URL),
            },
          ]
        );

        console.log('Successfully opened Zelle website.');
      } else {
        // Fallback for when the URL can't be opened (very rare on modern devices)
        Alert.alert(
          'Cannot Open Link',
          `Unable to open the Zelle website: ${ZELLE_WEBSITE_URL}. Please try again later or visit manually.`
        );
        console.error(`Cannot open Zelle website: ${ZELLE_WEBSITE_URL}`);
      }
    } catch (error) {
      // Catch any unexpected errors during the linking process
      Alert.alert(
        'Error',
        'An unexpected error occurred while trying to open the link. Please try again.'
      );
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
