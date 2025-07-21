import React from 'react';
import { Dimensions } from 'react-native';
import { Avatar, H3, Image, SizableText, XStack, YStack } from 'tamagui';
import { Event } from '../@types/event';
import { Container } from './Container';

interface Props<T extends Event> {
  currentDetail: T;
  hasDateSection?: boolean;
  hasContactSection?: boolean;
  hasLocationSection?: boolean;
  children?: React.ReactNode;
}

const DEFAULT_IMAGE = require('../assets/church-placeholder.png');
const { height } = Dimensions.get('window');

const DetailsLayout = <T extends Event>({
  currentDetail,
  hasDateSection = true,
  hasContactSection = true,
  hasLocationSection = true,
  children,
}: Props<T>) => {
  const { imageUrl, name, date, contactName, description } = currentDetail;

  return (
    <Container>
      <Image
        source={imageUrl ? { uri: imageUrl } : DEFAULT_IMAGE}
        width="100%"
        height={height * 0.35}
        borderRadius="$6"
        marginBottom="$2"
        alt={name}
        aria-label={name}
      />
      <YStack marginVertical="$4">
        <H3>{name}</H3>
        {hasDateSection && date ? <SizableText>{date.toUpperCase()}</SizableText> : null}
      </YStack>

      <SizableText fontFamily={'$body'} fontSize="$7">
        {description}
      </SizableText>

      {/* Contact Section */}
      {hasContactSection ? (
        <YStack mt="$8" gap="$4">
          <SizableText size="$4">{'Contacto'.toUpperCase()}</SizableText>

          {/* Avatar Section */}
          {contactName ? (
            <XStack flex={1} alignItems="center" gap="$4">
              <Avatar circular size="$6">
                {/* TO DO: replace real image later, add to the DB structure */}
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />
                {/* TO DO: change this color later according to the theme */}
                <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
              </Avatar>
              {/* TO DO: add contact to the DB */}
              <SizableText size="$6">{contactName}</SizableText>
            </XStack>
          ) : (
            <SizableText size="$6">Miembro desconocido</SizableText>
          )}
        </YStack>
      ) : null}

      {/* Location Section */}
      {hasLocationSection ? (
        <YStack marginVertical="$4" gap="$4">
          <SizableText size="$4">{'Lugar'.toUpperCase()}</SizableText>
          <SizableText size="$6">Houston</SizableText>
        </YStack>
      ) : null}
      {children}
    </Container>
  );
};

export default DetailsLayout;
