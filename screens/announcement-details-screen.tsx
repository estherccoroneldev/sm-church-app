import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Container } from 'components/Container';
import { AnnouncementsParamList } from 'navigation/tab-navigator';
import React from 'react';
import { Alert, Pressable } from 'react-native';
import { addEventToCalendar } from 'services/calendar-service';
import { useAnnouncementsStore } from 'store/announcements-store';
import { SizableText, useTheme, XStack, YStack } from 'tamagui';
import { Announcement } from '../@types/announcement';
import DetailsLayout from '../components/DetailsLayout';

type AnnouncementDetailsRouteProp = RouteProp<AnnouncementsParamList, 'AnnouncementDetails'>;

const AnnouncementDetails: React.FC = () => {
  const theme = useTheme();
  const { params } = useRoute<AnnouncementDetailsRouteProp>();
  const { announcementId } = params || {};
  const getAnnouncement = useAnnouncementsStore((state) => state.getAnnouncement);
  const announcement = getAnnouncement(announcementId);

  const handleAddToCalendar = async () => {
    if (!announcement) {
      return;
    }

    const result = await addEventToCalendar(announcement);
    if (result) {
      Alert.alert('Anuncio agregado al calendario');
    }
  };

  // const handleAddReminder = async () => {
  //   if (!announcement) {
  //     return;
  //   }

  //   const result = await setEventReminder(announcement);
  //   if (result) {
  //     Alert.alert('Reminder agregado');
  //   }
  // };

  if (!announcement) {
    return (
      <Container>
        <SizableText>No se encontraron detalles para este anúncio.</SizableText>
      </Container>
    );
  }

  return (
    <DetailsLayout currentDetail={announcement as Announcement}>
      <YStack py="$4">
        <SizableText textTransform="uppercase" fontFamily={'$body'} size={'$4'}>
          Acciones
        </SizableText>
        {/* <Pressable onPress={handleAddReminder}>
          {({ pressed }) => (
            <XStack
              gap="$4"
              alignItems="center"
              justifyContent="flex-start"
              my="$4"
              opacity={pressed ? 0.5 : 1}>
              <FontAwesome name="clock-o" size={28} color={theme.text.get()} />
              <SizableText fontFamily={'$body'} fontSize={'$6'}>
                Recordarme
              </SizableText>
            </XStack>
          )}
        </Pressable> */}
        <Pressable onPress={handleAddToCalendar}>
          {({ pressed }) => (
            <XStack
              gap="$4"
              alignItems="center"
              justifyContent="flex-start"
              my="$4"
              opacity={pressed ? 0.5 : 1}>
              <FontAwesome name="calendar-plus-o" size={28} color={theme.text.get()} />
              <SizableText fontFamily={'$body'} fontSize={'$6'}>
                Agregar a mi Calendario
              </SizableText>
            </XStack>
          )}
        </Pressable>
      </YStack>
    </DetailsLayout>
  );
};

export default AnnouncementDetails;
