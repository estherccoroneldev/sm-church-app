import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Group } from '@types/group';
import useGroups from 'hooks/use-groups';
import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SizableText, Spinner, useTheme } from 'tamagui';
import CardItem from '../components/CardItem';
import { ConnectParamList } from '../navigation/tab-navigator';

type GroupsListScreenNavigationProp = NativeStackNavigationProp<ConnectParamList, 'GroupsList'>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const GroupsListScreen: React.FC = () => {
  const theme = useTheme();
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  const { navigate } = useNavigation<GroupsListScreenNavigationProp>();
  const { groups, loading } = useGroups();

  const handlePressItem = (group: Group) => navigate('GroupDetails', { group });
  const renderGroupItem: ListRenderItem<Group> = ({ item }) => (
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
      <Spinner size="large" color={'#076CB5'} />
    ) : (
      <SizableText size={'$6'} alignSelf="center">
        No hay grupos disponibles.
      </SizableText>
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}
      edges={['left', 'right']}>
      <FlatList<Group>
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 24 + BOTTOM_TAB_HEIGHT,
          paddingHorizontal: 24,
          marginTop: 24,
        }}
        ListEmptyComponent={renderEmptyComponent}
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator
      />
    </SafeAreaView>
  );
};

export default GroupsListScreen;
