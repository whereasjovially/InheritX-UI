"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

function Portfolio() {
  const searchParams = useSearchParams();
  const search = searchParams.get("name");

  return <></>;
}
export default Portfolio;
