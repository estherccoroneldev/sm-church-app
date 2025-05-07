import { getMonth } from 'date-fns';
import React from 'react';
import { Event } from '../@types/event';
import fetchEvents from '../services/events';
import { parseDate } from '../utils/parseDate';
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

  const upcomingEvents = sortByDate([...events].slice(0, 6), 'desc');

  // TO DO: add a safe, efficient, and idiomatic timeout to set loading when filtering out
  const getEventsByMonth = (monthLabel: string) => {
    const monthIndex = getMonth(parseDate(`${monthLabel} 1, 2000`));
    setEventsByMonth(
      [...events].filter((eventItem) => new Date(eventItem.date).getMonth() === monthIndex)
    );
  };

  return React.useMemo(
    () => ({
      events,
      upcomingEvents,
      eventsByMonth,
      getEventsByMonth,
      loading,
      error,
      getEvents,
    }),
    [events, upcomingEvents, loading, error, eventsByMonth, getEventsByMonth, getEvents]
  );
}
