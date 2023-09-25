"use client ";

import { useUser } from "@/hooks/user";
import { isProfileFormOpen, isUserExistsAtom } from "@/state/jotai";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { PiUserPlus } from "react-icons/pi";
import { ProfileForm } from "./ProfileForm";

function CreateProfile() {
  const [isOpen, setOpen] = useAtom(isProfileFormOpen);

  const openForm = () => {
    setOpen(true);
  };
  return isOpen ? (
    <Box>
      <ProfileForm />
    </Box>
  ) : (
    <Box>
      <AbsoluteCenter>
        <Button
          onClick={openForm}
          className="text-white items-center shadow-lg shadow-indigo-500/40 rounded inline-flex sm:ml-3  sm:mt-0 sm:m-0 justify-between px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none"
        >
          <Icon fontSize="16" color={"white"} as={PiUserPlus} />
          &nbsp;Create Profile
        </Button>
      </AbsoluteCenter>
    </Box>
  );
}

function EditInformation({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useAtom(isProfileFormOpen);

  const openForm = () => {
    setOpen(true);
  };
  return isOpen ? (
    <Box>
      <ProfileForm />
    </Box>
  ) : (
    <Box className=" w-full sm:px-6">
      <Box className=" px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
        <Box className="flex items-center justify-between">
          <Box> </Box>
          <Box>
            <Button
              onClick={openForm}
              className="shadow-lg shadow-indigo-500/40 rounded inline-flex sm:ml-3  sm:mt-0 sm:m-0 items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none "
            >
              <p className="text-sm font-medium leading-none text-white">
                <Icon fontSize="16" color={"white"} as={FaUserEdit} /> Edit
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

function ProfileNav({ children }: { children: React.ReactNode }) {
  const [isUserExists, isLoading, error] = useUser();

  return isLoading ? (
    <AbsoluteCenter>
      <Spinner size="xl" />
    </AbsoluteCenter>
  ) : isUserExists ? (
    <EditInformation children={children} />
  ) : (
    <CreateProfile />
  );
}

export default ProfileNav;
