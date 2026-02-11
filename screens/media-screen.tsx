import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { FlatList, Linking, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H6, Image, Separator, SizableText, Spinner, useTheme, XStack, YStack } from 'tamagui';
import { YouTubeVideo } from '../@types/ytvideo';
import useSermons from '../hooks/use-sermons';

const handlePressVideo = (videoId: string) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  Linking.openURL(youtubeUrl).catch((err) => console.error("Couldn't open URL:", err));
};

const renderVideoItem = ({ item }: { item: YouTubeVideo }) => (
  <Pressable onPress={() => handlePressVideo(item.id.videoId)}>
    <XStack my="$2" px="$2">
      <Image
        width={'50%'}
        borderRadius={'$4'}
        source={{ uri: item.snippet.thumbnails.high.url, height: 100 }}
      />
      <YStack flex={1} ov="visible" px="$2">
        <H6 flexShrink={1} numberOfLines={2} color={'$text'}>
          {item.snippet.title}
        </H6>
        <SizableText
          flexShrink={1}
          fontFamily="$body"
          fontSize="$4"
          numberOfLines={2}
          color={'$text'}>
          {item.snippet.description}
        </SizableText>
      </YStack>
    </XStack>
  </Pressable>
);

const Media: React.FC = () => {
  const theme = useTheme();
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  const { sermons, loading, getSermons } = useSermons();

  const renderEmptyComponent = () =>
    !loading && (
      <SizableText size={'$6'} alignSelf="center">
        No videos.
      </SizableText>
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}
      edges={['left', 'right']}>
      <FlatList<YouTubeVideo>
        style={{
          flex: 1,
          backgroundColor: theme.background.get() as string,
        }}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 24 + BOTTOM_TAB_HEIGHT,
        }}
        ListEmptyComponent={renderEmptyComponent}
        data={sermons}
        renderItem={renderVideoItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator
        ItemSeparatorComponent={() => <Separator />}
        // Load more when reaching the end of the list
        onEndReached={() => getSermons()}
        onEndReachedThreshold={0.7}
        ListFooterComponent={sermons.length > 9 && loading ? <Spinner size="large" /> : null}
      />
    </SafeAreaView>
  );
};

function keyExtractor(item: YouTubeVideo, index: number): string {
  if (item.id && item.id.videoId) {
    return item.id.videoId;
  }
  if (item.etag) {
    return item.etag;
  }
  return index.toString();
}

export default Media;
