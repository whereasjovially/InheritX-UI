"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import WillList from "@/components/MyWills/WillList";

function Portfolio() {
  const searchParams = useSearchParams();
  const search = searchParams.get("name");

  return (
    <>
      <WillList />
    </>
  );
}
export default Portfolio;
