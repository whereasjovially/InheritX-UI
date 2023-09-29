import { useDeleteWill, useGetWill } from "@/hooks/will";
import { isDeleteDetailsCloseAtom } from "@/state/jotai";
import { e8sToHuman } from "@/utils/e8s";
import { ICRCASSETLIST } from "@/utils/utils";
import {
  AbsoluteCenter,
  Box,
  Button,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function WillDetails() {
  const router = useRouter();

  const [isDeleteButtonLoading, setDeleteButtonLoading] =
    useState<boolean>(false);

  const [isDeleteDetailsClose, setIsDeleteDetailsClose] = useAtom(
    isDeleteDetailsCloseAtom
  );
  const searchParams = useSearchParams();
  const identifier = searchParams.get("id");

  const [will, fetchGetWill, isLoading] = useGetWill();
  const [deleteWillFunc, useDeleteWill_isLoading] = useDeleteWill();
  useEffect(() => {
    if (identifier) {
      console.log("parseInt(identifier!)", parseInt(identifier!));
      fetchGetWill(parseInt(identifier!));
    }
  }, []);
  if (isDeleteDetailsClose) {
    setIsDeleteDetailsClose(false);
    router.push("/wills");
  }

  if (!will || isLoading || useDeleteWill_isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  const deleteWill = () => {
    //check for ICRC
    if (will && will.identifier && ICRCASSETLIST.includes(will.tokenTicker)) {
      setDeleteButtonLoading(true);
      deleteWillFunc(will.identifier, "ICRC");
      setDeleteButtonLoading(false);
    } else {
      console.log("No will  or other error occured");
    }
  };
  return (
    <>
      {" "}
      <Box
        bg={useColorModeValue("gray.300", "gray.900")}
        className="shadow-lg border-2 flex flex-col justify-start items-start  w-full p-6 md:p-14"
      >
        <Box>
          <h1 className="text-2xl  text-black font-semibold leading-6 ">
            Will Details
          </h1>
        </Box>
        <Box className="flex mt-7 flex-col items-end w-full space-y-6">
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Will Title
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              {will.willName}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Will Description
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              {will.willDescription}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Will UID
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              {will.identifier}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Testator
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              {will.testator.toString()}
            </Box>
          </Box>{" "}
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Heir
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              {will.heirs.toString()}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Date
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              {will.timeStamp as unknown as string}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Token Ticker
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              {will.tokenTicker}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Amount
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              {e8sToHuman(will.value)}
            </Box>
          </Box>
          {/* <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Date
            </Box>
            <Box as="p" className="text-lg text-black font-semibold leading-4 ">
              20
            </Box>
          </Box> */}
        </Box>
        <Box className="flex justify-between w-full items-center mt-32">
          <Button
            isLoading={isDeleteButtonLoading}
            onClick={deleteWill}
            as="button"
            className="text-xl text-black font-semibold leading-4 "
          >
            Delete
          </Button>
          <Box
            as="p"
            className="text-lg text-black bg-red-800 font-semibold leading-4 "
          >
            {/* $2900 */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default WillDetails;
