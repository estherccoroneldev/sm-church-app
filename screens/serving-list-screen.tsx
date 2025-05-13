import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SizableText, Spinner, Theme } from 'tamagui';
import { Event } from '../@types/event';
import CardItem from '../components/CardItem';
import useServings from '../hooks/use-servings';
import { ConnectParamList } from '../navigation/tab-navigator';

type ServingListScreenNavigationProp = NativeStackNavigationProp<
  ConnectParamList,
  'ServingDetails'
>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const ServingListScreen: React.FC = () => {
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  const { navigate } = useNavigation<ServingListScreenNavigationProp>();
  const { servings, loading } = useServings();

  const handlePressItem = (item: Event) => navigate('ServingDetails', item);
  const renderEventItem: ListRenderItem<Event> = ({ item }) => (
    <CardItem
      fullmode
      item={item}
      hasDateSection
      hasDescription
      onPress={() => handlePressItem(item)}
    />
  );

  const renderEmptyComponent = () =>
    loading ? (
      <Spinner size="large" />
    ) : (
      <SizableText size={'$6'} alignSelf="center">
        No servings.
      </SizableText>
    );

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
          contentContainerStyle={{
            paddingBottom: 24 + BOTTOM_TAB_HEIGHT,
            paddingHorizontal: 24,
            marginTop: 24,
          }}
          ListEmptyComponent={renderEmptyComponent}
          data={servings}
          renderItem={renderEventItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator
        />
      </Theme>
    </SafeAreaView>
  );
};

export default ServingListScreen;
