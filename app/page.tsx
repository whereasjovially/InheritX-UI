"use client";

import { plugPrincipal } from "@/components/auth/provider/Plug";
import { useUser, useUserInfo } from "@/hooks/user";
import { Box, Icon, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { SiAcclaim } from "react-icons/si";
import { TbJewishStar } from "react-icons/tb";

export default function Home() {
  const [principal, setPrincipal] = useState<string>("");

  useEffect(() => {
    const requestPlugPrincipal = async () => {
      setPrincipal(await plugPrincipal());
    };
    requestPlugPrincipal();
  }, []);
  return (
    <Box bg={useColorModeValue("gray.300", "gray.900")}>
      <Box className="pb-20">
        <Box className="mx-auto bg-gradient-to-l  h-96">
          <Box className="mx-auto container w-full flex flex-col justify-center items-center">
            <Box className="flex justify-center items-center flex-col">
              <Box className="mt-20">
                <h3 className="lg:text-6xl md:text-5xl text-4xl font-black leading-10 italic text-black">
                  Welcome Home
                </h3>
              </Box>
              <Box className="mt-6 mx-2 md:mx-0 text-center">
                <p className="lg:text-lg md:text-base leading-6 text-sm  text-black">
                  {principal && <>Principal : {principal}</>}
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="mx-auto container md:-mt-28 -mt-20 flex justify-center items-center">
          <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-x-2 gap-y-2 lg:gap-x-6 md:gap-x-6 md:gap-y-6">
            <Box
              bg={useColorModeValue("gray.300", "gray.900")}
              className="shadow-lg flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56  rounded-2xl"
            >
              <Link href={"/profile"}>
                <h2 className="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                  <Icon as={CgProfile} />
                </h2>
                <p className="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                  {" "}
                  Profile
                </p>
              </Link>{" "}
            </Box>
            <Box
              bg={useColorModeValue("gray.300", "gray.900")}
              className="shadow-lg flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56  rounded-2xl"
            >
              <Link href={"/wills"}>
                <h2 className="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                  <Icon as={TbJewishStar} />
                </h2>
                <p className="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                  {" "}
                  Wills
                </p>
              </Link>
            </Box>
            <Box
              bg={useColorModeValue("gray.300", "gray.900")}
              className="shadow-lg flex justify-center flex-col items-center w-36 h-36 md:w-44 md:h-48 lg:w-56 lg:h-56  rounded-2xl"
            >
              <Link href={"/claims"}>
                <h2 className="lg:text-5xl md:text-4xl text-2xl font-extrabold leading-10 text-center text-gray-800">
                  <Icon as={SiAcclaim} />
                </h2>
                <p className="mt-4 text-sm md:text-base lg:text-lg leading-none text-center text-gray-600">
                  {" "}
                  Claims
                </p>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
