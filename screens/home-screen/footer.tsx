import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, StyleSheet } from 'react-native';
import { H3, H4, H5, XStack, YStack } from 'tamagui';
import { SocialMediaButton } from '../../components/SocialMediaButton';

const FACEBOOK_URL = 'https://www.facebook.com/sanmateohouston';
const IG_URL = 'https://www.instagram.com/sanmateohouston';
const YT_URL = 'https://www.youtube.com/channel/UCyGuJT26kWZ7XnUYJlYXk7g';
const PAYPAL_URL =
  'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=94JP94PZWK5X4&source=url';

const openExternalUrl = (url: string) => {
  Linking.openURL(url);
};

const Footer: React.FC = () => (
  <YStack my="$2">
    <YStack my="$6">
      <H4 textAlign="center">Tu donación nos ayuda a llevar este mensaje al mundo.</H4>
      <Pressable onPress={() => openExternalUrl(PAYPAL_URL)}>
        {({ pressed }) => (
          <XStack
            mt={'$4'}
            gap={'$4'}
            style={[
              styles.button,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <FontAwesome name="paypal" size={32} color="#2A3A7C" />
            <H5 color={'#076CB5'}>Donar con Paypal</H5>
          </XStack>
        )}
      </Pressable>
    </YStack>
    <YStack my="$4">
      <H3 aria-label="Follow Us" my="$6">
        Follow Us on Social Media
      </H3>
      <XStack justifyContent="space-around">
        <SocialMediaButton
          onPress={() => openExternalUrl(FACEBOOK_URL)}
          name="facebook-square"
          color={'#3b5998'}
        />
        <SocialMediaButton
          onPress={() => openExternalUrl(IG_URL)}
          name="instagram"
          color={'#d62976'}
        />
        <SocialMediaButton
          onPress={() => openExternalUrl(YT_URL)}
          name="youtube"
          color={'#cd201f'}
        />
      </XStack>
    </YStack>
  </YStack>
);

export default Footer;

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
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 'auto',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
