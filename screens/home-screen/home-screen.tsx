import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { H3, SizableText } from 'tamagui';
import { useAuth } from '../../store/auth-store';

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
      {/* Header section */}
      <Header user={user} />
      <H3 aria-label="Announcements" mb="$4">
        Announcements
      </H3>

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

      {/* TO DO: adds the servings opportunities data */}
      <HorizontalListSection<Announcement>
        title="Serving Opportunities"
        data={announcements}
        renderItem={renderAnnouncementItem}
        loading={loading}
        error={error}
        ListEmptyComponent={() => (
          <SizableText size="$4">No serving opportunities yet.</SizableText>
        )}
        keyExtractor={keyExtractor}
      />

      {/* Footer Section */}
      <Footer />
    </Container>
  );
};

export default Home;
