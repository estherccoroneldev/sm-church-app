import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container } from 'components/Container';
import { RedirectItemPress } from 'components/RedirectItem';
import { Image } from 'expo-image';
import { useGetMinistry } from 'hooks/use-get-ministry';
import React from 'react';
import { Alert, Dimensions, Linking } from 'react-native';
import { useAuthStore } from 'store/auth-store';
import { H3, Separator, SizableText, Spinner, useTheme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { HomeParamList } from '../navigation/tab-navigator';

const DEFAULT_IMAGE = require('../assets/church-placeholder.png');
const { height } = Dimensions.get('window');

type MinistryDetailsRouteProp = RouteProp<HomeParamList, 'MinistryDetails'>;
type MinistryDetailsScreenNavigationProp = NativeStackNavigationProp<
  HomeParamList,
  'MinistryDetails'
>;

const MinistryDetails: React.FC = () => {
  const { navigate } = useNavigation<MinistryDetailsScreenNavigationProp>();
  const { params } = useRoute<MinistryDetailsRouteProp>();
  const theme = useTheme();
  const user = useAuthStore((state) => state.userData);
  const ministryId = params.id;
  const { ministry, isLoading } = useGetMinistry(ministryId);

  if (isLoading) {
    return (
      <Container>
        <Spinner size="large" color={theme.primary.get()} style={{ alignSelf: 'center' }} />
      </Container>
    );
  }

  if (!ministry) {
    return (
      <Container>
        <SizableText>No se encontraron detalles para este ministerio.</SizableText>
      </Container>
    );
  }

  const handleGoToConfirmationScreen = () => {
    navigate('SignupMinistryConfirm', {
      userId: user?.uid || '',
      ministryId: ministry.id,
      ministryName: ministry.title,
    });
  };

  const handleGoToMembersListScreen = () => {
    navigate('MinistryMembersList', {
      id: ministry.id,
    });
  };

  const handleGoToUpdateGroupLinkScreen = () => {
    navigate('UpdateMinistryGroupLink', {
      ministryId: ministry.id,
      currentGroupLink: ministry.groupLink,
    });
  };

  const handleJoinWhatsAppGroup = () => {
    const whatsappGroupLink = ministry.groupLink ?? 'https://chat.whatsapp.com/';
    Linking.openURL(whatsappGroupLink).catch(() => {
      Alert.alert(
        'Error',
        'No se pudo abrir el enlace de WhatsApp. Por favor, asegúrate de tener la aplicación instalada.'
      );
    });
  };

  const handleSelectCoordinator = () => {
    navigate('SelectMinistryCoordinator', {
      ministryId: ministry.id,
    });
  };

  const FooterComponent = () => {
    const memberIsAccepted = ministry.acceptedMembers?.some((member) => member.uid === user?.uid);
    const memberIsPending = ministry.pendingMembers?.some((member) => member.uid === user?.uid);
    const shouldShowCoordinatorSection = user?.uid === ministry.coordinatorId;
    const shouldShowAdminSection = user?.role === 'admin' && user?.uid !== ministry.coordinatorId;

    if (shouldShowAdminSection) {
      return (
        <>
          <RedirectItemPress
            title="Abrir lista de Miembros"
            onPress={handleGoToMembersListScreen}
          />
          <RedirectItemPress title="Seleccionar Coordinador" onPress={handleSelectCoordinator} />
        </>
      );
    }

    if (shouldShowCoordinatorSection) {
      return (
        <>
          <RedirectItemPress
            title="Actualizar link del Grupo de WhatsApp"
            onPress={handleGoToUpdateGroupLinkScreen}
          />
          <RedirectItemPress
            title="Abrir lista de Miembros"
            onPress={handleGoToMembersListScreen}
          />
        </>
      );
    }

    if (memberIsAccepted) {
      return (
        <>
          <SizableText fontSize="$5" textAlign="center" color="$green10">
            Su solicitud ha sido aprobada! Le damos la bienvenida al ministerio. Estamos muy
            contentos de tenerle con nosotros.
          </SizableText>
          {ministry.groupLink && (
            <>
              <SizableText fontSize="$5" textAlign="center" marginTop="$2" color="$green10">
                Puede unirse al grupo de WhatsApp del ministerio a través del botón a continuación.
              </SizableText>
              <PrimaryButton
                size="$5"
                mt="$6"
                mb="$2"
                fontSize={'$6'}
                onPress={handleJoinWhatsAppGroup}
                pressStyle={{ opacity: 0.9 }}>
                Unirse al Grupo de WhatsApp
              </PrimaryButton>
            </>
          )}
        </>
      );
    }

    if (memberIsPending) {
      return (
        <YStack marginVertical="$4">
          <SizableText fontFamily={'$body'} fontSize="$6" textAlign="center" color="$color11">
            Su solicitud está siendo revisada. Le contactaremos en breve. Gracias por su paciencia!
          </SizableText>
        </YStack>
      );
    }

    return (
      <YStack marginVertical="$4">
        <SizableText fontFamily={'$body'} fontSize="$6" textAlign="center" color="$color11">
          Gracias por su interés en formar parte de este ministerio. Por favor, pulse el botón
          "Solicitar Inscripción" para enviar su solicitud. El coordinador del ministerio revisará
          su solicitud y se pondrá en contacto con usted a la brevedad.
        </SizableText>
        <PrimaryButton
          size="$5"
          mt="$6"
          mb="$2"
          fontSize={'$6'}
          onPress={handleGoToConfirmationScreen}
          pressStyle={{ opacity: 0.9 }}>
          Solicitar Inscripción
        </PrimaryButton>
      </YStack>
    );
  };

  return (
    <Container>
      <YStack marginBottom="$4">
        <Image
          source={ministry.imageUrl ? { uri: ministry.imageUrl } : DEFAULT_IMAGE}
          placeholder={DEFAULT_IMAGE}
          style={{
            width: '100%',
            height: height * 0.35,
            borderRadius: 16,
            marginBottom: 4,
          }}
          contentFit="cover"
          alt={ministry.title}
          aria-label={ministry.title}
          accessibilityRole="image"
        />
        <YStack marginVertical="$4">
          <H3>{ministry.title}</H3>
        </YStack>
        <SizableText fontFamily={'$body'} fontSize="$7">
          {ministry.description}
        </SizableText>
      </YStack>

      <Separator borderColor={theme.text.get()} my="$6" />

      <FooterComponent />
    </Container>
  );
};

export default MinistryDetails;
