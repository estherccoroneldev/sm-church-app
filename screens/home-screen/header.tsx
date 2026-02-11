import React from 'react';
import { Dimensions } from 'react-native';
import { H3, Image, YStack } from 'tamagui';
const { width } = Dimensions.get('window');

const Header = () => (
  <YStack mb="$4" gap="$1">
    <YStack backgroundColor={'$white'} px="$6" borderRadius={18} alignSelf="center">
      <Image
        source={require('../../assets/logo-sm-w-shadow.png')}
        style={{
          objectFit: 'contain',
          width: width * 0.5,
          height: 120,
          alignSelf: 'center',
        }}
        alt="Logo"
      />
    </YStack>

    <H3 aria-label="Welcome">{`Le damos la bienvenida!`}</H3>
  </YStack>
);

export default Header;
