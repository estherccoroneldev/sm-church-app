import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Container } from 'components/Container';
import { EventsParamList } from 'navigation/tab-navigator';
import React from 'react';
import { Alert, Pressable } from 'react-native';
import { addEventToCalendar } from 'services/calendar-service';
import { useUpcomingEventsStore } from 'store/upcoming-events-store';
import { SizableText, useTheme, XStack, YStack } from 'tamagui';
import { Event } from '../@types/event';
import DetailsLayout from '../components/DetailsLayout';

type EventDetailsRouteProp = RouteProp<EventsParamList, 'EventDetails'>;

const EventDetails: React.FC = () => {
  const theme = useTheme();
  const { params } = useRoute<EventDetailsRouteProp>();
  const getEvent = useUpcomingEventsStore((state) => state.getUpcomingEvent);
  const eventDetails = getEvent(params.eventId);

  // const handleAddReminder = async () => {
  //   if (!eventDetails) {
  //     return;
  //   }

  //   const result = await setEventReminder(eventDetails);
  //   if (result) {
  //     Alert.alert('Reminder agregado');
  //   }
  // };

  const handleAddToCalendar = async () => {
    if (!eventDetails) {
      return;
    }

    const result = await addEventToCalendar(eventDetails);
    if (result) {
      Alert.alert('Evento agregado al calendario');
    }
  };

  if (!eventDetails) {
    return (
      <Container>
        <SizableText>No se encontraron detalles para este evento.</SizableText>
      </Container>
    );
  }

  return (
    <DetailsLayout currentDetail={eventDetails as Event}>
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

export default EventDetails;
