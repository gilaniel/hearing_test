import { createContext, useContext } from "react";

import { RootStore } from "./root";

export const rootStore = new RootStore();

const StoreContext = createContext<RootStore>(rootStore);
const useStore = (): RootStore => useContext(StoreContext);

export { RootStore, StoreContext, useStore };
