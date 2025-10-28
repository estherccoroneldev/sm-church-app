import { getMinistryDetailsById } from 'services/get-ministry-details-by-id';
import { create } from 'zustand';
import { Ministry } from '../@types/ministry';
import { UserProfile } from '../@types/user';

interface MemberActionPayload {
  userId: UserProfile['uid'];
  ministryId: Ministry['id'];
}

interface MinistryState {
  ministries: Record<string, Ministry | undefined>;
  setMinistries: (mints: Ministry[]) => void;
  fetchAndStoreMinistry: (id: string) => Promise<Ministry | undefined>;
  getMinistry: (id: string) => Ministry | undefined;
  acceptMember: (payload: MemberActionPayload) => void;
  rejectMember: (payload: MemberActionPayload) => void;
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

  rejectMember: ({ userId, ministryId }) => {
    set((state) => ({
      ministries: {
        ...state.ministries,
        [ministryId]: {
          ...state.ministries[ministryId],
          pendingMembers: (() => {
            const existing = state.ministries[ministryId]?.pendingMembers ?? [];
            return existing.filter((m) => m.uid !== userId);
          })(),
        } as Ministry,
      },
    }));
  },

  acceptMember: ({ userId, ministryId }) => {
    set((state) => ({
      ministries: {
        ...state.ministries,
        [ministryId]: {
          ...state.ministries[ministryId],
          acceptedMembers: (() => {
            const existing = state.ministries[ministryId]?.acceptedMembers ?? [];

            const member = (state.ministries[ministryId]?.pendingMembers ?? []).find(
              (m) => m.uid === userId
            );

            if (!member) {
              console.warn(
                `Member with ID ${userId} not found in pendingMembers of ministry ${ministryId}.`
              );
              return existing;
            }

            const exists = existing.some((m) => m.uid === member.uid);

            if (!exists) {
              return [...existing, member];
            }

            return existing;
          })(),
          pendingMembers: (() => {
            const existing = state.ministries[ministryId]?.pendingMembers ?? [];
            return existing.filter((m) => m.uid !== userId);
          })(),
        } as Ministry,
      },
    }));
  },
}));
