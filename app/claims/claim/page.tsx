"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import ClaimList from "@/components/myClaims/ClaimList";
import ClaimDetails from "@/components/myClaims/ClaimDetails";

function ClaimInfo() {
  const searchParams = useSearchParams();
  const search = searchParams.get("name");

  return (
    <>
      <ClaimDetails/>
    </>
  );
}
export default ClaimInfo;
