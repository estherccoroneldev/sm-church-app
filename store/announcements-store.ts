import { create } from 'zustand';
import { Event } from '../@types/event';

interface AnnouncementState {
  announcements: Record<string, Event | undefined>;
  setAnnouncements: (events: Event[]) => void;
  getAnnouncement: (id: string) => Event | undefined;
}

export const useAnnouncementsStore = create<AnnouncementState>((set, get) => ({
  announcements: {},

  setAnnouncements: (events) => {
    const announcementsMap = events.reduce(
      (acc, event) => {
        acc[event.id] = event;
        return acc;
      },
      {} as Record<string, Event>
    );

    set((state) => ({
      announcements: { ...state.announcements, ...announcementsMap },
    }));
    console.info(`Store Hydrated: ${events.length} Announcements loaded/merged.`);
  },

  getAnnouncement: (id) => {
    return get().announcements[id];
  },
}));
