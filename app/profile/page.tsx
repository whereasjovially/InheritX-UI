"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ProfileDetails from "@/components/myProfile/ProfileDetails";

function Portfolio() {
  const searchParams = useSearchParams();
  const search = searchParams.get("name");

  return <><ProfileDetails/></>;
}
export default Portfolio;
