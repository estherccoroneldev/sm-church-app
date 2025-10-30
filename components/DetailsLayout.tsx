import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Dimensions } from 'react-native';
import { H3, Image, SizableText, useTheme, XStack, YStack } from 'tamagui';
import { Announcement } from '../@types/announcement';
import { Container } from './Container';

interface Props<T extends Announcement> {
  currentDetail: T;
  hasDateSection?: boolean;
  hasContactSection?: boolean;
  children?: React.ReactNode;
}

const DEFAULT_IMAGE = require('../assets/church-placeholder.png');
const { height } = Dimensions.get('window');

const DetailsLayout = <T extends Announcement>({
  currentDetail,
  hasDateSection = true,
  hasContactSection = true,
  children,
}: Props<T>) => {
  const theme = useTheme();
  const { imageUrl, title, startDate, contactName, description, place } = currentDetail;

  return (
    <Container>
      <Image
        source={imageUrl ? { uri: imageUrl } : DEFAULT_IMAGE}
        width="100%"
        height={height * 0.35}
        borderRadius="$6"
        marginBottom="$2"
        alt={title}
        aria-label={title}
      />
      <YStack marginVertical="$4">
        <H3>{title}</H3>
        {hasDateSection && startDate ? <SizableText>{startDate.toUpperCase()}</SizableText> : null}
      </YStack>

      <SizableText fontFamily={'$body'} fontSize="$7">
        {description}
      </SizableText>

      {/* Contact Section */}
      {hasContactSection ? (
        <YStack mt="$8" gap="$4">
          <SizableText size="$4">{'Contacto'.toUpperCase()}</SizableText>

          {contactName ? (
            <XStack flex={1} alignItems="center" gap="$4">
              {/* <Avatar circular size="$6">
                <Avatar.Image
                  accessibilityLabel="Cam"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                />

                <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
              </Avatar> */}

              <FontAwesome name="user-circle-o" size={28} color={theme.text.get()} />
              <SizableText size="$6">{contactName}</SizableText>
            </XStack>
          ) : (
            <SizableText size="$6">Miembro desconocido</SizableText>
          )}
        </YStack>
      ) : null}

      {/* Location Section */}
      <YStack marginVertical="$4" gap="$4">
        <SizableText size="$4">{'Lugar'.toUpperCase()}</SizableText>
        <SizableText size="$6">{place}</SizableText>
      </YStack>
      {children}
    </Container>
  );
};

export default DetailsLayout;
