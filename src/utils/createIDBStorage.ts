import { get, set, del, clear, createStore } from "idb-keyval";
import {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";

const customStore = createStore(`tmware-db`, "tmware-store");

export const createIDBStorage = (idbValidKey: IDBValidKey = "tmwareClient") => {
  return {
    persistClient: async (client: PersistedClient) => {
      set(idbValidKey, client, customStore);
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey, customStore);
    },
    removeClient: async () => {
      await del(idbValidKey, customStore);
    },
  } as Persister;
};

export const clearIDBStore = async () => {
  await clear(customStore);
};

export const removeAllDatabases = async () => {
  const dbs = await indexedDB.databases();
  if (dbs && dbs?.length > 0) {
    for (let i = 0; i < dbs.length; i++) {
      await indexedDB.deleteDatabase(dbs[i].name as string);
    }
  }
};
