import { createStore } from "zustand/vanilla";

type Participant = {
  id: number;
  videoIsOn?: boolean;
};

type ParticipantStore = {
  participants: Participant[];
  addParticipant: (participant: Participant) => void;
  removeParticipant: (participantId: number) => void;
  turnVideoOn: (participantId: number) => void;
  turnVideoOff: (participantId: number) => void;
};

export const participantStore = createStore<ParticipantStore>((set) => ({
  participants: [],
  addParticipant: (participant) =>
    set((state) => ({ participants: [...state.participants, participant] })),
  removeParticipant: (participantId) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== participantId),
    })),
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
}));
