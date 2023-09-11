"use client ";

import { Box, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";

function ProfileNav({ children }: { children: React.ReactNode }) {
  return (
    <Box className="w-full sm:px-6">
      <Box className="px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
        <Box className="flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Profile
          </p>
          <Box>
            <Button className="shadow-lg shadow-indigo-500/40 rounded inline-flex sm:ml-3  sm:mt-0 sm:m-0 items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none ">
              <p className="text-sm font-medium leading-none text-white">
                <Icon fontSize="16" color={"white"} as={FiPlus} /> Add
                Information
              </p>
            </Button>
          </Box>
        </Box>
      </Box>
      {children}
    </Box>
  );
}

export default ProfileNav;
