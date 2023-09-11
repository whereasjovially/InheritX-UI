"use client";
import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

function loading() {
  return (
    <>
      <Center h="100px" >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </>
  );
}

export default loading;
