import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { FlatList, Linking, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H5, Image, SizableText, Spinner, useTheme, XStack, YStack } from 'tamagui';
import { YouTubeVideo } from '../@types/ytvideo';
import useSermons from '../hooks/use-sermons';

// const sermons = [
//   {
//     etag: '1',
//     id: {
//       videoId: 'ZTm4wIoZT8M',
//     },
//     snippet: {
//       title: 'Hossana',
//       description: 'Descripción del video 1',
//       thumbnails: {
//         high: {
//           url: 'https://i.ytimg.com/vi/ZTm4wIoZT8M/hqdefault.jpg',
//         },
//       },
//     },
//   },
//   {
//     etag: '2',

//     id: {
//       videoId: 'xtlVUf6wB5I',
//     },
//     snippet: {
//       title: 'Una palabra de Fe en Viernes Santo',
//       description: 'Descripción del video 2',
//       thumbnails: {
//         high: {
//           url: 'https://i.ytimg.com/vi/xtlVUf6wB5I/hqdefault.jpg',
//         },
//       },
//     },
//   },
//   {
//     etag: '3',

//     id: {
//       videoId: 'dABFDuN1CG0',
//     },
//     snippet: {
//       title: 'La deuda de Amor',
//       description: 'Descripción del video 3',
//       thumbnails: {
//         high: {
//           url: 'https://i.ytimg.com/vi/dABFDuN1CG0/hqdefault.jpg',
//         },
//       },
//     },
//   },
// ];
const handlePressVideo = (videoId: string) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  Linking.openURL(youtubeUrl).catch((err) => console.error("Couldn't open URL:", err));
};

const renderVideoItem = ({ item }: { item: YouTubeVideo }) => (
  <Pressable onPress={() => handlePressVideo(item.id.videoId)}>
    <XStack mb="$3" px="$3" alignItems="center">
      <Image
        width={'50%'}
        borderRadius={'$4'}
        source={{ uri: item.snippet.thumbnails.high.url, width: 120, height: 110 }}
      />
      <YStack flex={1} ov="visible" p="$2" gap="$1">
        <H5 flexShrink={1} numberOfLines={2} color={'$text'}>
          {item.snippet.title}
        </H5>
        <SizableText
          flexShrink={1}
          fontFamily="$body"
          fontSize="$5"
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
        // Load more when reaching the end of the list
        onEndReached={getSermons}
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
