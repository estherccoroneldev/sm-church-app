import React from 'react';
import { H3, SizableText, XStack, YStack } from 'tamagui';
import { SocialMediaButton } from '../../components/SocialMediaButton';

const Footer: React.FC = () => (
  <YStack marginBottom="$6">
    <H3 aria-label="Follow Us" mb="$6">
      Follow Us on Social Media
    </H3>
    <XStack justifyContent="space-around">
      <SocialMediaButton name="facebook-square" color={'#3b5998'} />
      <SocialMediaButton name="instagram" color={'#d62976'} />
      <SocialMediaButton name="youtube" color={'#cd201f'} />
    </XStack>
  </YStack>
);

export default Footer;
