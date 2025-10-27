import { getMinistryDetailsById } from 'services/get-ministry-details-by-id';
import { create } from 'zustand';
import { Ministry } from '../@types/ministry';

interface MinistryState {
  ministries: Record<string, Ministry | undefined>;
  setMinistries: (mints: Ministry[]) => void;
  fetchAndStoreMinistry: (id: string) => Promise<Ministry | undefined>;
  getMinistry: (id: string) => Ministry | undefined;
}

export const useMinistryStore = create<MinistryState>((set, get) => ({
  ministries: {},

  setMinistries: (mints) => {
    const ministryMap = mints.reduce(
      (acc, ministry) => {
        acc[ministry.id] = ministry;
        return acc;
      },
      {} as Record<string, Ministry>
    );

    set((state) => ({
      ministries: { ...state.ministries, ...ministryMap },
    }));
    console.info(`Store Hydrated: ${mints.length} ministries loaded/merged.`);
  },

  fetchAndStoreMinistry: async (id) => {
    const currentState = get();

    const cachedDept = currentState.ministries[id];
    if (cachedDept) {
      console.info(`Cache Hit: Ministry ${id} retrieved from store (Fast).`);
      return cachedDept;
    }

    console.info(`Cache Miss: Fetching Ministry ${id} from Firestore (Required network call).`);

    try {
      const ministryData = await getMinistryDetailsById(id);

      set((state) => ({
        ministries: {
          ...state.ministries,
          [id]: ministryData,
        },
      }));

      return ministryData;
    } catch (error) {
      console.error(`Error fetching Ministry ${id}:`, error);
      throw error;
    }
  },

  getMinistry: (id) => {
    return get().ministries[id];
  },
}));
