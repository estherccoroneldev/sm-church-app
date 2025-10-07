import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, ListRenderItem, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H3, Separator, SizableText, Spinner, useTheme, XStack, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { Event } from '../@types/event';
import CardItem from '../components/CardItem';
import { TagFilter } from '../components/TagFilter';
import useEvents from '../hooks/use-events';
import { EventsParamList } from '../navigation/tab-navigator';
import months from '../utils/months';

type EventsScreenNavigationProp = NativeStackNavigationProp<EventsParamList, 'Events'>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const renderEmptyComponent = (loading: boolean) => () =>
  loading ? (
    <Spinner size="large" color={'#076CB5'} />
  ) : (
    <SizableText size={'$6'} alignSelf="center">
      No hay eventos en este mes.
    </SizableText>
  );

const EventsScreen: React.FC = () => {
  const theme = useTheme();
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

  const handlePressMonth = (index: number, item: string) => () => {
    if (index === 0) {
      setListStatus('all');
      setShowModal(false);
      return;
    }

    getEventsByMonth(item);
    setListStatus('by-month');
    setShowModal(false);
  };

  const renderModalItem: ListRenderItem<string> = ({ item, index }) => (
    <>
      <Button
        backgroundColor={'$background'}
        size="$6"
        fontFamily={'$heading'}
        onPress={handlePressMonth(index, item)}
        m="$2">
        {item}
      </Button>
      <Separator my={'$2'} />
    </>
  );

  const renderHeader = () => (
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
            backgroundColor={'$background'}>
            <YStack
              width="100%"
              height="70%"
              backgroundColor={'$background'}
              borderTopLeftRadius={20}
              borderTopRightRadius={20}
              padding={20}
              gap={'$4'}>
              <H3 mb="$4">Seleccione un mes</H3>
              <FlatList
                // TO DO: add intl for months
                // TO DO: add a better way to get the months
                data={months.spanish}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderModalItem}
              />
              <PrimaryButton onPress={() => setShowModal(!showMonthModal)}>Cancelar</PrimaryButton>
            </YStack>
          </YStack>
        </Modal>
      )}
    </YStack>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}
      edges={['left', 'right', 'bottom']}>
      <FlatList<Event>
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 24 + BOTTOM_TAB_HEIGHT,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent(loading)}
        data={data[listStatus]}
        renderItem={renderEventItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator
      />
    </SafeAreaView>
  );
};

export default EventsScreen;
