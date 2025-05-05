import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, ListRenderItem, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, SizableText, Spinner, styled, Theme, XStack, YStack } from 'tamagui';
import { Event } from '../@types/event';
import CardItem from '../components/CardItem';
import useEvents from '../hooks/use-events';
import { EventsParamList } from '../navigation/tab-navigator';

type EventsScreenNavigationProp = NativeStackNavigationProp<EventsParamList, 'Events'>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const TagFilter = styled(Button, {
  variant: 'outlined',
  size: '$3',
});

const EventsScreen: React.FC = () => {
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();

  const [showMonthModal, setShowModal] = useState(false);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const { navigate } = useNavigation<EventsScreenNavigationProp>();
  const handlePressItem = (item: Event) => navigate('EventDetails', item);
  const { events, loading, eventsByMonth, getEventsByMonthName } = useEvents();
  const [listStatus, setListStatus] = useState<'all' | 'by-month'>('all');

  // TO DO: type this later
  const data = {
    all: events,
    'by-month': eventsByMonth,
  };

  const renderEventItem: ListRenderItem<Event> = ({ item }) => (
    <CardItem
      fullmode
      item={item}
      hasDateSection
      hasDescription
      onPress={() => handlePressItem(item)}
    />
  );

  const renderHeader = () => {
    return (
      <YStack gap="$4">
        <H2 mb={'$5'}>Calendar</H2>
        <XStack gap={'$4'}>
          <SizableText>Filter:</SizableText>
          <TagFilter>Ministry</TagFilter>
          <TagFilter onPress={() => setShowModal(true)}>Month</TagFilter>
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
                height="60%"
                backgroundColor="white"
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                padding={20}>
                <SizableText fontWeight="bold" fontSize={20} mb="$4">
                  Select a Month
                </SizableText>
                <FlatList
                  data={months}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Button
                      backgroundColor={item}
                      size="$4"
                      borderRadius={9999}
                      onPress={() => {
                        getEventsByMonthName(item);
                        setListStatus('by-month');
                        setShowModal(false);
                      }}
                      m="$2"
                    />
                  )}
                />
                <Button onPress={() => setShowModal(false)}>Close</Button>
              </YStack>
            </YStack>
          </Modal>
        )}
      </YStack>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      edges={['left', 'right']}>
      <Theme name="light">
        <FlatList<Event>
          style={{
            flex: 1,
          }}
          contentContainerStyle={{ paddingBottom: 24 + BOTTOM_TAB_HEIGHT, paddingHorizontal: 24 }}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={loading ? <Spinner size="large" /> : undefined}
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
