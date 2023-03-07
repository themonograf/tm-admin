import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  loader: boolean;
  errorPage: number;
};

type Action = {
  setErrorPage: (statusCode: number) => void;
  toggleLoader: () => void;
  clearLayoutStore: () => void;
};

const initialFilter: State = {
  loader: false,
  errorPage: 0,
};

const useLayoutStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ...initialFilter,
      setErrorPage: (statusCode) => set({ errorPage: statusCode }),
      toggleLoader: () => set({ loader: !get().toggleLoader }),
      clearLayoutStore: () => set({ ...initialFilter }),
    }),
    {
      name: "layout-storage",
      partialize: (state) => ({ errorPage: state.errorPage }),
    },
  ),
);

export default useLayoutStore;
