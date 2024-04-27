import { createStore } from "zustand/vanilla";

type Participant = {
  id: number;
  videoIsOn?: boolean;
};

type ParticipantStore = {
  participants: Participant[];
  isAllVideoOn: boolean;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (participantId: number) => void;
  randomizeParticipants: () => void;
  turnVideoOn: (participantId: number) => void;
  turnVideoOff: (participantId: number) => void;
  turnAllVideoOn: () => void;
  turnAllVideoOff: () => void;
};

export const participantStore = createStore<ParticipantStore>((set) => ({
  participants: [],
  isAllVideoOn: false,
  addParticipant: (participant) =>
    set((state) => ({ participants: [...state.participants, participant] })),
  removeParticipant: (participantId) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== participantId),
    })),
  randomizeParticipants: () =>
    set((state) => {
      const random = Math.floor(Math.random() * 3);
      if (random === 0 || random === 1) {
        if (state.participants.length >= 49) {
          return state;
        }
        const newParticipant = {
          id: Math.random(),
          videoIsOn: state.isAllVideoOn === true,
        };
        return { participants: [...state.participants, newParticipant] };
      } else if (random === 2) {
        if (state.participants.length > 0) {
          return { participants: state.participants.slice(0, -1) };
        }
      }
      return state;
    }),
  turnVideoOn: (participantId) =>
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === participantId ? { ...p, videoIsOn: true } : p
      ),
    })),
  turnVideoOff: (participantId) =>
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === participantId ? { ...p, videoIsOn: false } : p
      ),
    })),
  turnAllVideoOn: () =>
    set((state) => ({
      participants: state.participants.map((p) => ({ ...p, videoIsOn: true })),
      isAllVideoOn: true,
    })),
  turnAllVideoOff: () =>
    set((state) => ({
      participants: state.participants.map((p) => ({ ...p, videoIsOn: false })),
      isAllVideoOn: false,
    })),
}));
