"use client";

import Home from "@/components/Layout/Home/Home";
import React from "react";

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Home>{props.children}</Home>
    </>
  );
}

export default Layout;
