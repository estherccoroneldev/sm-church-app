import React from 'react';
import { TouchableOpacity } from 'react-native';
import { H5, Image, SizableText, YStack } from 'tamagui';

interface CardItemProps<T> {
  item: T;
  onPress: () => void;
}

interface BaseItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  imageUrl?: string;
  place?: string;
  department?: string;
  downloadUrl?: string;
  isActive?: boolean;
}

interface CardItemProps<T extends BaseItem> {
  item: T;
  onPress: () => void;
  fullmode?: boolean;
}

const DEFAULT_IMAGE = require('../assets/church-placeholder.jpg');

const CardItem = <T extends BaseItem>({ item, onPress, fullmode = false }: CardItemProps<T>) => {
  const [image, setImage] = React.useState(item.imageUrl ? { uri: item.imageUrl } : DEFAULT_IMAGE);

  return (
    <TouchableOpacity onPress={onPress}>
      <YStack
        marginRight="$4"
        width={280}
        borderRadius="$6"
        borderWidth={1}
        borderColor="$borderColor"
        elevation={4}
        marginBottom="$4"
        backgroundColor="#fff">
        <YStack flex={1}>
          <Image
            source={image}
            defaultSource={DEFAULT_IMAGE}
            width="100%"
            height={160}
            borderRadius="$6"
            marginBottom="$2"
            alt={item.title}
            aria-label={item.title}
            onError={(event) => {
              if (event.nativeEvent.error) {
                console.error('Error loading image', event.nativeEvent.error);
                setImage(DEFAULT_IMAGE);
              }
            }}
            accessibilityRole="image"
          />
          <YStack paddingHorizontal="$2" paddingVertical="$4" gap="$2" overflow="hidden">
            <H5>{item.title}</H5>
          </YStack>
          {fullmode ? (
            <>
              {item.description ? (
                <SizableText numberOfLines={3}>{item.description}</SizableText>
              ) : null}
              {item.date ? <SizableText>{item.date}</SizableText> : null}

              {/* TO DO: Maybe in a next version */}
              {/* {item.place ? <SizableText>{item.place}</SizableText> : null}
            {item.department ? <SizableText>{item.department}</SizableText> : null}
            {item.linkUrl ? (
              <SizableText color="$blue10" fontWeight="bold">
                {item.linkUrl}
              </SizableText>
            ) : null}
            {item.isActive ? (
              <SizableText color="$green10" fontWeight="bold">
                Active
              </SizableText>
            ) : (
              <SizableText color="$red10" fontWeight="bold">
                Inactive
              </SizableText>
            )} */}
            </>
          ) : null}
        </YStack>
      </YStack>
    </TouchableOpacity>
  );
};

export default CardItem;
