import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { YouTubeVideo } from '@types/ytvideo';
import React from 'react';
import { FlatList, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H5, Image, SizableText, Spinner, Theme } from 'tamagui';
import useSermons from '../hooks/use-sermons';

const handlePressVideo = (videoId: string) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  Linking.openURL(youtubeUrl).catch((err) => console.error("Couldn't open URL:", err));
};

const renderVideoItem = ({ item }: { item: YouTubeVideo }) => (
  <TouchableOpacity onPress={() => handlePressVideo(item.id.videoId)} style={styles.videoItem}>
    <Image style={styles.thumbnail} source={{ uri: item.snippet.thumbnails.high.url }} />
    <View style={styles.videoDetails}>
      <H5 numberOfLines={2}>{item.snippet.title}</H5>
      <SizableText fontFamily="$body" fontSize="$5" numberOfLines={3}>
        {item.snippet.description}
      </SizableText>
    </View>
  </TouchableOpacity>
);
const Media: React.FC = () => {
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  const { sermons, loading, getSermons } = useSermons();

  const renderEmptyComponent = () =>
    !loading && (
      <SizableText size={'$6'} alignSelf="center">
        No videos.
      </SizableText>
    );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Theme name="light">
        <FlatList<YouTubeVideo>
          style={styles.container}
          contentContainerStyle={{
            paddingTop: 24,
            paddingBottom: 24 + BOTTOM_TAB_HEIGHT,
            paddingHorizontal: 16,
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
      </Theme>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 100,
  },
  videoDetails: {
    flex: 1,
    padding: 12,
  },
});

export default Media;
