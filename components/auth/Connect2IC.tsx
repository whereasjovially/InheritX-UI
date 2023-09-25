// "use client";
// import { createClient } from "@connect2ic/core";
// import { NFID } from "@connect2ic/core/providers/nfid";
// import { InfinityWallet } from "@connect2ic/core/providers/infinity-wallet";
// import {
//   Connect2ICProvider,
//   ConnectButton,
//   ConnectDialog,
// } from "@connect2ic/react";
// import "@connect2ic/core/style.css";
// import { PlugWallet } from "@connect2ic/core/providers/plug-wallet";
// // import { CANISTER_WHITE_LIST } from "@/utils/canisters";

// const providerPlug = new PlugWallet({
//   // boolean
//   dev: true,
//   // whitelisted canisters
//   whitelist: ["ryjl3-tyaaa-aaaaa-aaaba-cai"],
//   // The host used for canisters
//   host: window.location.origin,
// });
// const providerInfinitySwap = new InfinityWallet({
//   // boolean
//   dev: true,
//   // whitelisted canisters
//   // whitelist: CANISTER_WHITE_LIST,
//   // The host used for canisters
//   host: window.location.origin,
// });

// const client = createClient({
//   //@ts-ignore
//   providers: [providerPlug, providerInfinitySwap],
// });

// function Connect2IC({ children }: { children: React.ReactNode }) {
//   return <Connect2ICProvider client={client}>{children}</Connect2ICProvider>;
// }

// export default Connect2IC;
