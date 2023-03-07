import { create } from "zustand";
import {
  ProductStoreState as State,
  ProductStoreAction as Action,
} from "./types";

const initialFilter: State = {
  filter: {
    limit: 10,
    page: 0,
    keyword: "",
    is_sold: 0,
  },
};

const useProductStore = create<State & Action>()((set) => ({
  ...initialFilter,
  setFilter: (payload) =>
    set((state) => ({ filter: { ...state.filter, ...payload } })),
  clearAll: () => set({ ...initialFilter }),
}));

export default useProductStore;
