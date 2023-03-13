import { create } from "zustand";
import { ResellerState as State, ResellerAction as Action } from "./types";

const initialFilter: State = {
  filter: {
    limit: 10,
    page: 0,
    keyword: "",
  },
};

const useReseller = create<State & Action>()((set) => ({
  ...initialFilter,
  setFilter: (payload) =>
    set((state) => ({ filter: { ...state.filter, ...payload } })),
  clearAll: () => set({ ...initialFilter }),
}));

export default useReseller;
