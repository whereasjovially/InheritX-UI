import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const count = atomWithStorage<number>("count", 0);

export const navToggle = atom<boolean>(false);

// this atom storage is used to cross check session and localstorage connection to avoid state lost at reloads
export const isConnectedAtom = atomWithStorage("isConnected", false);
