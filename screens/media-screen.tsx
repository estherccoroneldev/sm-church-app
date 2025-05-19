import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useSermons from 'hooks/use-sermons';
import React from 'react';
import { FlatList, Linking, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem, Separator, SizableText, Spinner, Theme } from 'tamagui';
import { Sermon } from '../@types/sermon';

const Media: React.FC = () => {
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  // TO DO: Get videos from this API: GET https://www.googleapis.com/youtube/v3/videos, need API_KEY
  const { sermons, loading } = useSermons();
  const renderItem: ListRenderItem<Sermon> = ({ item }) => {
    return (
      <ListItem
        hoverTheme
        pressTheme
        title={item.title}
        size={'$7'}
        fontFamily={'$heading'}
        padding={0}
        paddingVertical={'$4'}
        paddingHorizontal={'$3'}
        subTitle={item.description}
        icon={<FontAwesome name="film" size={28} color="#C6233F" />}
        iconAfter={<FontAwesome name="chevron-right" size={16} color="gray" />}
        borderRadius={'$4'}
        onPress={() => Linking.openURL(item.videoUrl)}
      />
    );
  };

  const renderEmptyComponent = () =>
    loading ? (
      <Spinner size="large" color="#076CB5" />
    ) : (
      <SizableText size={'$6'} alignSelf="center">
        No videos.
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
        <FlatList<Sermon>
          style={{
            flex: 1,
          }}
          contentContainerStyle={{ paddingBottom: 24 + BOTTOM_TAB_HEIGHT, paddingHorizontal: 24 }}
          ListEmptyComponent={renderEmptyComponent}
          data={sermons}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator
          ItemSeparatorComponent={() => <Separator />}
        />
      </Theme>
    </SafeAreaView>
  );
};

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

export default Media;
