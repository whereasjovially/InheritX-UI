import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const count = atomWithStorage<number>("count", 0);

export const navToggle = atom<boolean>(false);

// this atom storage is used to cross check session and localstorage connection to avoid state lost at reloads
export const isConnectedAtom = atomWithStorage("isConnected", false);

// atom to check the current logged user is exists in a canister database
export const isUserExistsAtom = atom<boolean>(false);

//atom to check whether form is open or closed
export const isProfileFormOpen = atom<boolean>(false);

export const principalAtom = atom<string | null>(null);
export const firstNamesAtom = atom<string | null>(null);
export const lastNameAtom = atom<string | null>(null);
export const sexAtom = atom<string | null>(null);
export const birthDateAtom = atom<string | null>(null);
export const birthLocationCodeAtom = atom<string | null>(null);
