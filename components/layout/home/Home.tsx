"use client";

import React from "react";
import Header from "@/components/layout/header/Header";
import HeroSection from "@/components/layout/heroSection/HeroSection";
import { useAtom } from "jotai";
import { isConnectedAtom } from "@/state/jotai";
import { useSignOut } from "@/hooks/signOut";

const Home = (children: { children: React.ReactNode }) => {
  const [clearStates]=useSignOut()
  const [isConnected, setConnected] = useAtom(isConnectedAtom);
  const singOutWallet = async () => {
    console.log("Signing Out......");
    setConnected(false);
    clearStates()

  };

  return (
    <>
      {isConnected ? (
        <Header {...children} signOut={singOutWallet} />
      ) : (
        <HeroSection />
      )}
    </>
  );
};

export default Home;
