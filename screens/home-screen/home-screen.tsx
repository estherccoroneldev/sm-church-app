import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { H3, SizableText } from 'tamagui';
import { useAuth } from '../../store/auth-store';

import { ListRenderItem } from 'react-native';
import Footer from 'screens/home-screen/footer';
import Header from 'screens/home-screen/header';
import { Event } from '../../@types/event';
import { Ministry } from '../../@types/ministry';
import CardItem from '../../components/CardItem';
import { Container } from '../../components/Container';
import HorizontalListSection from '../../components/HorizontalListSection';
import useEvents from '../../hooks/use-events';
import useMinistries from '../../hooks/use-ministries';
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
  const { ministries, loading, error } = useMinistries();

  const renderMinistryItem: ListRenderItem<Ministry> = ({ item }) => (
    <CardItem item={item} onPress={() => navigate('MinistryDetails', item)} />
  );

  const renderEventItem: ListRenderItem<Event> = ({ item }) => (
    <CardItem item={item} onPress={() => navigate('EventDetails', item)} />
  );

  return (
    <Container>
      {/* Header section */}
      <Header user={user} />
      {/* Announcements */}
      <H3 aria-label="Announcements" mb="$8">
        Anúncios
      </H3>

      {/* Upcoming Events section */}
      <HorizontalListSection<Event>
        // title="Upcoming Events"
        title="Próximas Actividades"
        data={upcomingEvents}
        renderItem={renderEventItem}
        loading={loadingEvents}
        error={eventsError}
        ListEmptyComponent={() => <SizableText size="$4">Aún no hay anúncios.</SizableText>}
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
