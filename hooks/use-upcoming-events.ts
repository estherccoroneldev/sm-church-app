import React from 'react';
import { getData } from 'services/events';
import { useUpcomingEventsStore } from 'store/upcoming-events-store';
import { Event } from '../@types/event';
import months from '../utils/months';
import { parseDate } from '../utils/parseDate';
import sortByDate from '../utils/sortBydate';

export default function useUpcomingEvents() {
  const setUpcomingEvents = useUpcomingEventsStore((state) => state.setUpcomingEvents);
  const [eventsByMonth, setEventsByMonth] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>('');

  const getEvents = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getData();
      setUpcomingEvents(data);
    } catch (error) {
      setError('Error fetching events');
      console.error('Error fetching events: ', JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getEvents();
  }, []);

  const upcomingEvents = useUpcomingEventsStore((state) => state.upcomingEvents);
  const events =
    Object.values(upcomingEvents).filter((event): event is Event => event !== undefined) ?? [];

  const recentEvents = sortByDate([...events].slice(0, 6), 'desc');

  const getEventsByMonth = (monthLabel: string) => {
    // TO DO: remove this entire logic when implementing the intl month picker, pleeeeease. It's a mess
    if (monthLabel === 'Todos') {
      setEventsByMonth(events);
      return;
    }
    const indexES = months.spanish.findIndex((month) => month === monthLabel);
    const monthLabelEN = months.english[indexES];
    const monthIndex = parseDate(`${monthLabelEN} 1, 2000, 11:00:00 AM`).getMonth();

    setEventsByMonth(
      [...events].filter((eventItem) => {
        const eventDate = parseDate(eventItem.startDate);
        return eventDate.getMonth() === monthIndex;
      })
    );
  };

  return React.useMemo(
    () => ({
      events: sortByDate([...events], 'desc'),
      recentEvents,
      eventsByMonth,
      getEventsByMonth,
      loading,
      error,
      getEvents,
    }),
    [events, upcomingEvents, loading, error, eventsByMonth, getEventsByMonth, getEvents]
  );
}
