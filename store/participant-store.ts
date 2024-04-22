import { createStore } from "zustand/vanilla";

type Participant = {
  id: number;
};

type ParticipantStore = {
  participants: Participant[];
  addParticipant: (participant: Participant) => void;
  removeParticipant: (participantId: number) => void;
};

export const participantStore = createStore<ParticipantStore>((set) => ({
  participants: [],
  addParticipant: (participant) =>
    set((state) => ({ participants: [...state.participants, participant] })),
  removeParticipant: (participantId) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== participantId),
    })),
}));
