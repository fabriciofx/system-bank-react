import { create } from 'zustand';

type State = {
  access: string;
  refresh: string;
};

type Actions = {
  setAccess: (token: string) => void;
  setRefresh: (token: string) => void;
};

type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>((set) => ({
  access: '',
  refresh: '',
  setAccess: (token: string) => set({ access: token }),
  setRefresh: (token: string) => set({ refresh: token })
}));
