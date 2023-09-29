"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import ClaimList from "@/components/myClaims/ClaimList";

function Claim() {
  const searchParams = useSearchParams();
  const search = searchParams.get("name");

  return (
    <>
      <ClaimList />
    </>
  );
}
export default Claim;
