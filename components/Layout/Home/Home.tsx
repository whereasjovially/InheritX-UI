"use client";

import React from "react";
import Header from "@/components/Layout/Header/Header";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import { useAtom } from "jotai";
import { isConnectedAtom } from "@/state/jotai";

const Home = (children: { children: React.ReactNode }) => {
  const [isConnected, setConnected] = useAtom(isConnectedAtom);
  const singOutWallet = async () => {
    console.log("Signing Out......");
    setConnected(false);
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
