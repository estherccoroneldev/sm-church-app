import React from 'react';
import { Event } from '../@types/event';
import fetchEvents from '../services/events';
import sortByDate from '../utils/sortBydate';

export default function useEvents() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [eventsByMonth, setEventsByMonth] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>('');

  const getEvents = React.useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      setError('Error fetching events');
      console.error('Error fetching events: ', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getEvents();
  }, [getEvents]);

  const upcomingEvents = sortByDate(events, 'desc');

  // TO DO: add the functionality to filter by ministry, when working on the calendar tab
  // const ministry = 'Ministry of Health'; // Example ministry, should be an Entity in DB?
  // const eventsByMinistry = [...(events ?? [])].filter(event => event.department === ministry)

  const getEventsByMonthName = (monthName: string) => {
    const monthIndex = new Date(`${monthName} 1, 2000`).getMonth();
    setEventsByMonth(
      [...events].filter((eventItem) => new Date(eventItem.date).getMonth() === monthIndex)
    );
  };

  return React.useMemo(
    () => ({
      events,
      upcomingEvents,
      eventsByMonth,
      getEventsByMonthName,
      loading,
      error,
      getEvents,
    }),
    [events, upcomingEvents, loading, error, getEvents]
  );
}
