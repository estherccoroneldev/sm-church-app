import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, SizableText, XStack, YStack } from 'tamagui';
import { useAuth } from '../../store/auth-store';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ListRenderItem } from 'react-native';
import Footer from 'screens/home-screen/footer';
import Header from 'screens/home-screen/header';
import { Announcement } from '../../@types/announcement';
import { Event } from '../../@types/event';
import CardItem from '../../components/CardItem';
import { Container } from '../../components/Container';
import HorizontalListSection from '../../components/HorizontalListSection';
import useAnnouncements from '../../hooks/use-announcements';
import useEvents from '../../hooks/use-events';
import { HomeParamList } from '../../navigation/tab-navigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeParamList, 'Home'>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

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
        {/* Header section */}
        <Header user={user} />

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
        <Footer />
      </ScrollView>
    </Container>
  );
};

export default Home;
