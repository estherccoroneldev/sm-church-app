import { create } from 'zustand';
import { Event } from '../@types/event';

interface UpcomingEventState {
  upcomingEvents: Record<string, Event | undefined>;
  setUpcomingEvents: (events: Event[]) => void;
  //   TO DO: Implement it when sending notifications about upcoming events
  //   fetchAndStoreUpcEvent: (id: string) => Promise<Event | undefined>;
  getUpcomingEvent: (id: string) => Event | undefined;
}

export const useUpcomingEventsStore = create<UpcomingEventState>((set, get) => ({
  upcomingEvents: {},

  setUpcomingEvents: (events) => {
    const upcomingEventsMap = events.reduce(
      (acc, event) => {
        acc[event.id] = event;
        return acc;
      },
      {} as Record<string, Event>
    );

    set((state) => ({
      upcomingEvents: { ...state.upcomingEvents, ...upcomingEventsMap },
    }));
    console.info(`Store Hydrated: ${events.length} UpcomingEvents loaded/merged.`);
  },

  //   fetchAndStoreUpcEvent: async (id) => {
  //     const currentState = get();
  //     const cachedDept = currentState.upcomingEvents[id];
  //     if (cachedDept) {
  //       console.info(`Cache Hit: Event ${id} retrieved from store (Fast).`);
  //       return cachedDept;
  //     }

  //     console.info(`Cache Miss: Fetching Event ${id} from Firestore (Required network call).`);

  //     try {
  //       const eventData = await getUpcomingEventDetailsById(id);

  //       set((state) => ({
  //         upcomingEvents: {
  //           ...state.upcomingEvents,
  //           [id]: eventData,
  //         },
  //       }));

  //       return eventData;
  //     } catch (error) {
  //       console.error(`Error fetching Event ${id}:`, error);
  //       throw error;
  //     }
  //   },

  getUpcomingEvent: (id) => {
    return get().upcomingEvents[id];
  },
}));
