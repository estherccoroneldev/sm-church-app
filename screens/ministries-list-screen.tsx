import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useMinistries from 'hooks/use-ministries';
import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SizableText, Spinner, useTheme } from 'tamagui';
import { Ministry } from '../@types/ministry';
import CardItem from '../components/CardItem';
import { ConnectParamList } from '../navigation/tab-navigator';

type MinistriesListScreenNavigationProp = NativeStackNavigationProp<
  ConnectParamList,
  'MinistryDetails'
>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const MinistriesListScreen: React.FC = () => {
  const theme = useTheme();
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  const { navigate } = useNavigation<MinistriesListScreenNavigationProp>();
  const { ministries, loading } = useMinistries();

  const handlePressItem = (ministryId: Ministry['id']) =>
    navigate('MinistryDetails', { id: ministryId });
  const renderEventItem: ListRenderItem<Ministry> = ({ item }) => (
    <CardItem
      fullmode
      item={item}
      hasDateSection
      hasDescription
      onPress={() => handlePressItem(item.id)}
    />
  );

  const renderEmptyComponent = () =>
    loading ? (
      <Spinner size="large" color={'#076CB5'} />
    ) : (
      <SizableText size={'$6'} alignSelf="center">
        Aún no hay oportunidades de servicio disponibles.
      </SizableText>
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}
      edges={['left', 'right']}>
      <FlatList<Ministry>
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 24 + BOTTOM_TAB_HEIGHT,
          paddingHorizontal: 24,
          marginTop: 24,
        }}
        ListEmptyComponent={renderEmptyComponent}
        data={ministries}
        renderItem={renderEventItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator
      />
    </SafeAreaView>
  );
};

export default MinistriesListScreen;
