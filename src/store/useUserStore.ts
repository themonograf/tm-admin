import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@tm-wear/api/types/auth";

type State = {
  userData?: User | null;
  userToken?: string | null;
};

type Action = {
  setUserData: (payload: User | null) => void;
  setUserToken: (token: string | null) => void;
  clearAll: () => void;
};

const initialFilter: State = {
  userData: null,
  userToken: null,
};

const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      ...initialFilter,
      setUserData: (payload) => set({ userData: payload }),
      setUserToken: (token) => set({ userToken: token }),
      clearAll: () => set({ ...initialFilter }),
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUserStore;
