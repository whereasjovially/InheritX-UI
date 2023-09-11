"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import ClaimList from "@/components/MyClaims/ClaimList";

function Portfolio() {
  const searchParams = useSearchParams();
  const search = searchParams.get("name");

  return (
    <>
      <ClaimList />
    </>
  );
}
export default Portfolio;
