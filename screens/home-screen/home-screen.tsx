import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SizableText } from 'tamagui';

import useAnnouncements from 'hooks/use-announcements';
import useMinistries from 'hooks/use-ministries';
import { ListRenderItem } from 'react-native';
import Footer from 'screens/home-screen/footer';
import Header from 'screens/home-screen/header';
import { useAuthStore } from 'store/auth-store';
import { Announcement } from '../../@types/announcement';
import { Event } from '../../@types/event';
import { Ministry } from '../../@types/ministry';
import CardItem from '../../components/CardItem';
import { Container } from '../../components/Container';
import HorizontalListSection from '../../components/HorizontalListSection';
import { default as useUpcomingEvents } from '../../hooks/use-upcoming-events';
import { HomeParamList } from '../../navigation/tab-navigator';
import { registerForPushNotificationsAsync } from '../../services/notifications';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeParamList, 'Home'>;

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const store = useAuthStore();

  React.useEffect(() => {
    if (store.user && !store.isGuest && store.user.uid) {
      registerForPushNotificationsAsync(store.user.uid);
    }
  }, [store.user]);

  const { recentEvents, loading: loadingEvents, error: eventsError } = useUpcomingEvents();
  const { ministries, loading, error } = useMinistries();
  const {
    announcements,
    loading: loadingAnnouncements,
    error: announcementsError,
  } = useAnnouncements();

  const handleGoToMinistry = (id: string) => navigation.navigate('MinistryDetails', { id });
  const renderMinistryItem: ListRenderItem<Ministry> = ({ item }) => (
    <CardItem item={item} onPress={() => handleGoToMinistry(item.id)} />
  );

  const handleGoToEvent = (eventId: string) => navigation.navigate('EventDetails', { eventId });
  const renderEventItem: ListRenderItem<Event> = ({ item }) => (
    <CardItem item={item} onPress={() => handleGoToEvent(item.id)} />
  );

  const handleGoToAnnouncement = (announcementId: string) =>
    navigation.navigate('AnnouncementDetails', { announcementId });
  const renderAnnouncementItem: ListRenderItem<Announcement> = ({ item }) => (
    <CardItem item={item} onPress={() => handleGoToAnnouncement(item.id)} />
  );

  return (
    <Container>
      {/* Header section */}
      <Header />

      {/* Announcements */}
      <HorizontalListSection<Announcement>
        title="Anúncios"
        data={announcements}
        renderItem={renderAnnouncementItem}
        loading={loadingAnnouncements}
        error={announcementsError}
        ListEmptyComponent={() => <SizableText size="$4">Aún no hay anúncios.</SizableText>}
        keyExtractor={keyExtractor}
      />

      {/* Upcoming Events section */}
      <HorizontalListSection<Event>
        // title="Upcoming Events"
        title="Próximas Actividades"
        data={recentEvents}
        renderItem={renderEventItem}
        loading={loadingEvents}
        error={eventsError}
        ListEmptyComponent={() => <SizableText size="$4">Aún no hay eventos.</SizableText>}
        keyExtractor={keyExtractor}
      />

      {/* ministries opportunities  section */}
      <HorizontalListSection<Ministry>
        // title="Ministry Opportunities"
        title="Oportunidades de Servicio"
        data={ministries}
        renderItem={renderMinistryItem}
        loading={loading}
        error={error}
        ListEmptyComponent={() => (
          <SizableText size="$4">Aún no hay oportunidades de servicio.</SizableText>
        )}
        keyExtractor={keyExtractor}
      />

      {/* Footer Section */}
      <Footer />
    </Container>
  );
};

export default Home;
