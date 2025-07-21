import { getMonth } from 'date-fns';
import React from 'react';
import { getData } from 'services/events';
import { Event } from '../@types/event';
import months from '../utils/months';
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
      const data = await getData();
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

  const getEventsByMonth = (monthLabel: string) => {
    // TO DO: remove this entire logic when implementing the intl month picker, pleeeeease. It's a mess
    if (monthLabel === 'Todos') {
      setEventsByMonth(events);
      return;
    }
    const indexES = months.spanish.findIndex((month) => month === monthLabel);
    const monthLabelEN = months.english[indexES];
    // TO DO: remove this entire logic when implementing the intl month picker, pleeeeease. It's a mess

    const monthIndex = getMonth(parseDate(`${monthLabelEN} 1, 2000`));

    setEventsByMonth(
      [...events].filter((eventItem) => {
        const eventDate = parseDate(eventItem.date);
        return eventDate.getMonth() === monthIndex;
      })
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
