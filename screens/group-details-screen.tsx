import { RouteProp, useRoute } from '@react-navigation/native';
import { Container } from 'components/Container';
import { Image } from 'expo-image';
import React from 'react';
import { Alert, Dimensions, Linking } from 'react-native';
import { H3, SizableText, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { ConnectParamList } from '../navigation/tab-navigator';

const DEFAULT_IMAGE = require('../assets/church-placeholder.png');
const { height } = Dimensions.get('window');

type GroupDetailsRouteProp = RouteProp<ConnectParamList, 'GroupDetails'>;

const GroupDetails: React.FC = () => {
  const { params } = useRoute<GroupDetailsRouteProp>();
  const { group } = params;

  const [image, setImage] = React.useState(
    group.imageUrl ? { uri: group.imageUrl } : DEFAULT_IMAGE
  );

  if (!group) {
    return (
      <Container>
        <SizableText>No se encontraron detalles para este grupo.</SizableText>
      </Container>
    );
  }

  const handleJoinWhatsAppGroup = () => {
    const whatsappGroupLink = group.groupLink ?? 'https://chat.whatsapp.com/';
    Linking.openURL(whatsappGroupLink).catch(() => {
      Alert.alert(
        'Error',
        'No se pudo abrir el enlace de WhatsApp. Por favor, asegúrate de tener la aplicación instalada.'
      );
    });
  };

  return (
    <Container>
      <YStack marginBottom="$4">
        <Image
          source={image}
          placeholder={DEFAULT_IMAGE}
          style={{
            width: '100%',
            height: height * 0.35,
            borderRadius: 16,
            marginBottom: 4,
          }}
          key={group.id}
          contentFit="cover"
          alt={group.title}
          aria-label={group.title}
          accessibilityRole="image"
          transition={200}
          cachePolicy="disk"
          onError={(event) => {
            if (event.error) {
              console.error('Error loading image', event.error);
              setImage(DEFAULT_IMAGE);
            }
          }}
        />
        <YStack marginVertical="$4">
          <H3>{group.title}</H3>
        </YStack>
        <SizableText fontFamily={'$body'} fontSize="$7">
          {group.description}
        </SizableText>
        {group.contactName ? (
          <YStack mt="$8">
            <SizableText mb="$4" size="$4">
              {'Contacto'.toUpperCase()}
            </SizableText>

            <SizableText fontFamily={'$body'} fontSize="$7">
              {group.contactName}
            </SizableText>
          </YStack>
        ) : null}
        {group.contactPhone ? (
          <YStack mt="$8">
            <SizableText mb="$4" size="$4">
              {'Número de Contacto'.toUpperCase()}
            </SizableText>

            <SizableText fontFamily={'$body'} fontSize="$7">
              {group.contactPhone}
            </SizableText>
          </YStack>
        ) : null}

        {group.groupLink && (
          <>
            <SizableText fontSize="$5" textAlign="center" marginTop="$2" color="$green10">
              Puede solicitar unirse al grupo de WhatsApp del ministerio a través del botón a
              continuación.
            </SizableText>
            <PrimaryButton
              size="$5"
              mt="$6"
              mb="$2"
              fontSize={'$6'}
              onPress={handleJoinWhatsAppGroup}
              pressStyle={{ opacity: 0.9 }}>
              Unirse
            </PrimaryButton>
          </>
        )}
      </YStack>
    </Container>
  );
};

export default GroupDetails;
