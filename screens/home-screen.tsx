import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Image, ScrollView, SizableText, XStack, YStack } from 'tamagui';
import { useAuth } from '../store/auth-store';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SocialMediaButton } from 'components/SocialMediaButton';
import { ListRenderItem } from 'react-native';
import { Announcement } from '../@types/announcement';
import { Event } from '../@types/event';
import CardItem from '../components/CardItem';
import { Container } from '../components/Container';
import HorizontalListSection from '../components/HorizontalListSection';
import useAnnouncements from '../hooks/use-announcements';
import useEvents from '../hooks/use-events';
import { HomeParamList } from '../navigation/tab-navigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeParamList, 'Home'>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const logoStyle = {
  width: '100%',
  aspectRatio: 2,
  alignSelf: 'center',
  tintColor: '#242424',
  resizeMode: 'contain',
} as const;

const Home: React.FC = () => {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight();
  const user = useAuth((state) => state.user);
  // TO DO: need to be in the store, when working on the calendar tab
  const { upcomingEvents, loading: loadingEvents, error: eventsError } = useEvents();
  const { announcements, loading, error } = useAnnouncements();

  const renderAnnouncementItem: ListRenderItem<Announcement> = ({ item }) => (
    <CardItem item={item} onPress={() => navigate('AnnouncementDetails', item)} />
  );

  const renderEventItem: ListRenderItem<Event> = ({ item }) => (
    <CardItem item={item} onPress={() => navigate('EventDetails', item)} />
  );

  return (
    <Container>
      <ScrollView
        flex={1}
        paddingHorizontal="$4"
        contentContainerStyle={{ paddingBottom: 24 + BOTTOM_TAB_HEIGHT }}
        showsVerticalScrollIndicator={false}>
        <YStack marginBottom="$6" gap="$4">
          <Image source={require('../assets/logo-episcosanmateo.png')} style={logoStyle} />
          <SizableText
            size="$8"
            aria-label="Welcome">{`Welcome, ${user?.name || 'Guest'}!`}</SizableText>
        </YStack>

        {/* Announcements section */}
        <HorizontalListSection<Announcement>
          title="Announcements"
          data={announcements}
          renderItem={renderAnnouncementItem}
          loading={loading}
          error={error}
          ListEmptyComponent={() => <SizableText size="$4">No announcements yet.</SizableText>}
          keyExtractor={keyExtractor}
        />

        {/* Upcoming Events section */}
        <HorizontalListSection<Event>
          title="Upcoming Events"
          data={upcomingEvents}
          renderItem={renderEventItem}
          loading={loadingEvents}
          error={eventsError}
          ListEmptyComponent={() => <SizableText size="$4">No events yet.</SizableText>}
          keyExtractor={keyExtractor}
        />

        {/* Footer Section */}
        <YStack marginBottom="$6">
          <SizableText size="$8" aria-label="Follow Us" mb="$6">
            Follow Us on Social Media
          </SizableText>
          <XStack justifyContent="space-around">
            <SocialMediaButton name="facebook-square" size={32} color={'#3b5998'} />
            <SocialMediaButton name="instagram" size={32} color={'#d62976'} />
            <SocialMediaButton name="youtube" size={32} color={'#cd201f'} />
          </XStack>
        </YStack>
      </ScrollView>
    </Container>
  );
};

export default Home;
