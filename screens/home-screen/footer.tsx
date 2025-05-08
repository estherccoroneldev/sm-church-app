import React from 'react';
import { Linking } from 'react-native';
import { H3, XStack, YStack } from 'tamagui';
import { SocialMediaButton } from '../../components/SocialMediaButton';

const FACEBOOK_URL = 'https://www.facebook.com/sanmateohouston';
const IG_URL = 'https://www.instagram.com/sanmateohouston';
const YT_URL = 'https://www.youtube.com/channel/UCyGuJT26kWZ7XnUYJlYXk7g';

const openSocialMediaUrl = (url: string) => {
  Linking.openURL(url);
};

const Footer: React.FC = () => (
  <YStack my="$6">
    <H3 aria-label="Follow Us" mb="$6">
      Follow Us on Social Media
    </H3>
    <XStack justifyContent="space-around">
      <SocialMediaButton
        onPress={() => openSocialMediaUrl(FACEBOOK_URL)}
        name="facebook-square"
        color={'#3b5998'}
      />
      <SocialMediaButton
        onPress={() => openSocialMediaUrl(IG_URL)}
        name="instagram"
        color={'#d62976'}
      />
      <SocialMediaButton
        onPress={() => openSocialMediaUrl(YT_URL)}
        name="youtube"
        color={'#cd201f'}
      />
    </XStack>
  </YStack>
);

export default Footer;
