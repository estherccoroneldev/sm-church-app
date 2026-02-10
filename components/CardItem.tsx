import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import { H3, H5, SizableText, YStack } from 'tamagui';
const { width } = Dimensions.get('window');

interface BaseItem {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  place?: string;
  downloadUrl?: string;
  isActive?: boolean;
}

interface CardItemProps<T extends BaseItem> {
  item: T;
  onPress: () => void;
  fullmode?: boolean;
  hasDateSection?: boolean;
  hasDescription?: boolean;
}

// TO DO: split out and exports, change the fontSize
const Subtitle = ({ text }: { text: string }) => {
  return (
    <SizableText textTransform="uppercase" fontFamily="$heading" fontSize="$4">
      {text}
    </SizableText>
  );
};

const DEFAULT_IMAGE = require('../assets/church-placeholder.png');

const CardItem = <T extends BaseItem>({
  item,
  onPress,
  fullmode = false,
  hasDescription = false,
  hasDateSection = false,
}: CardItemProps<T>) => {
  const [image, setImage] = React.useState(item.imageUrl ? { uri: item.imageUrl } : DEFAULT_IMAGE);
  const Title = fullmode ? H3 : H5;

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <YStack
          marginRight={fullmode ? undefined : '$4'}
          maxWidth={fullmode ? width : undefined}
          width={fullmode ? undefined : width * 0.8}
          borderRadius={fullmode ? '$6' : undefined}
          borderWidth={fullmode ? 1 : undefined}
          borderColor={fullmode ? '$borderColor' : undefined}
          elevation={fullmode ? 4 : undefined}
          marginBottom={fullmode ? '$4' : undefined}
          backgroundColor={fullmode ? '$background' : undefined}
          opacity={pressed ? 0.5 : 1}>
          <YStack flex={1}>
            <Image
              source={image}
              style={{
                width: '100%',
                height: fullmode ? 220 : 180,
                borderRadius: 16,
                marginBottom: 4,
              }}
              contentFit="cover"
              key={item.id}
              alt={item.title}
              aria-label={item.title}
              onError={(event) => {
                if (event.error) {
                  console.error('Error loading image', event.error);
                  setImage(DEFAULT_IMAGE);
                }
              }}
              transition={200}
              cachePolicy="disk"
              accessibilityRole="image"
            />

            {fullmode ? (
              <YStack padding={'$4'} gap="$2" overflow="hidden">
                <YStack>
                  <Title numberOfLines={1}>{item.title}</Title>
                  {hasDateSection && item.startDate ? <Subtitle text={item.startDate} /> : null}
                </YStack>
                {hasDescription && item.description ? (
                  <SizableText fontSize={'$6'} numberOfLines={3}>
                    {item.description}
                  </SizableText>
                ) : null}
              </YStack>
            ) : (
              <Title numberOfLines={1}>{item.title}</Title>
            )}
          </YStack>
        </YStack>
      )}
    </Pressable>
  );
};

export default CardItem;
