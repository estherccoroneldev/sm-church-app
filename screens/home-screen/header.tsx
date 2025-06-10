import React from 'react';
import { Dimensions } from 'react-native';
import { User } from 'store/auth-store';
import { H3, Image, YStack } from 'tamagui';
const { width } = Dimensions.get('window');

interface Props {
  user: User | null;
}

const Header: React.FC<Props> = ({ user }) => (
  <YStack mt="$4" mb="$8" gap="$1">
    <Image
      source={require('../../assets/logo-sm-w-shadow.png')}
      style={{
        objectFit: 'contain',
        width: width * 0.65,
        height: 140,
        alignSelf: 'center',
      }}
      alt="Logo"
    />
    <H3 aria-label="Welcome">{`Le damos la bienvenida!`}</H3>
  </YStack>
);

export default Header;
