import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H3, Separator, SizableText, Spinner, Theme, XStack, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { Event } from '../@types/event';
import CardItem from '../components/CardItem';
import { TagFilter } from '../components/TagFilter';
import useEvents from '../hooks/use-events';
import { EventsParamList } from '../navigation/tab-navigator';

type EventsScreenNavigationProp = NativeStackNavigationProp<EventsParamList, 'Events'>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const useGetIntlMonths = () => {
  const { i18n } = useTranslation();
  const months = new Array(12)
    .fill(0) // fill the array with 0s to avoid undefined values
    .map((_, i) => {
      const date = new Date(0); // explicitly set the date to 0 to avoid timezone issues
      date.setMonth(i);
      console.log('i18n.language', i18n.language); // Check the current language
      console.log('date', date); // Check the date being formatted

      return {
        label: format(date, 'MMMM', { locale: enUS }),
        index: i,
      };
    });
  return months;
};

const EventsScreen: React.FC = () => {
  const months = useGetIntlMonths();
  console.log('months', months);

  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  const { navigate } = useNavigation<EventsScreenNavigationProp>();
  const { events, loading, eventsByMonth, getEventsByMonth } = useEvents();

  const [showMonthModal, setShowModal] = useState(false);
  // TO DO: change this typing to enum later
  const [listStatus, setListStatus] = useState<'all' | 'by-month'>('all');

  // TO DO: type this later
  const data = {
    all: events,
    'by-month': eventsByMonth,
  };

  const handlePressItem = (item: Event) => navigate('EventDetails', item);
  const renderEventItem: ListRenderItem<Event> = ({ item }) => (
    <CardItem
      fullmode
      item={item}
      hasDateSection
      hasDescription
      onPress={() => handlePressItem(item)}
    />
  );

  const renderModalItem: ListRenderItem<string> = ({ item, index }) => (
    <>
      <Button
        backgroundColor={'white'}
        size="$6"
        fontFamily={'$heading'}
        onPress={() => {
          if (index === 0) {
            setListStatus('all');
            setShowModal(false);
            return;
          }

          getEventsByMonth(item);
          setListStatus('by-month');
          setShowModal(false);
        }}
        m="$2">
        {item}
      </Button>
      <Separator my={'$2'} />
    </>
  );

  const renderHeader = () => {
    return (
      <YStack gap="$2" mb={'$4'}>
        <XStack gap={'$4'} alignItems="center">
          <SizableText fontSize={'$6'}>Filtrar lista:</SizableText>
          {/* <TagFilter disabled>Ministry</TagFilter> */}
          <TagFilter onPress={() => setShowModal(true)}>Por mes</TagFilter>
        </XStack>
        {showMonthModal && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showMonthModal}
            onRequestClose={() => {
              setShowModal(!showMonthModal);
            }}>
            <YStack
              flex={1}
              justifyContent="flex-end"
              alignItems="center"
              backgroundColor={'rgba(0,0,0,0.5)'}>
              <YStack
                width="100%"
                height="70%"
                backgroundColor="white"
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                padding={20}
                gap={'$4'}>
                <H3 mb="$4">Seleccione un mes</H3>
                <FlatList
                  data={[]}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderModalItem}
                />
                <PrimaryButton onPress={() => setShowModal(false)}>Cerrar</PrimaryButton>
              </YStack>
            </YStack>
          </Modal>
        )}
      </YStack>
    );
  };

  const renderEmptyComponent = () =>
    loading ? (
      <Spinner size="large" color={'#076CB5'} />
    ) : (
      <SizableText size={'$6'} alignSelf="center">
        No hay eventos
      </SizableText>
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      edges={['left', 'right', 'bottom']}>
      <Theme name="light">
        <FlatList<Event>
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: 24 + BOTTOM_TAB_HEIGHT,
            paddingHorizontal: 24,
            paddingTop: 16,
          }}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent}
          data={data[listStatus]}
          renderItem={renderEventItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator
        />
      </Theme>
    </SafeAreaView>
  );
};

export default EventsScreen;
