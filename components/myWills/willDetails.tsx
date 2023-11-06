// import { useDeleteWill, useGetWill } from "@/hooks/will";
import { useBTCDeleteWill } from "@/hooks/useBTC/useBTCDeleteWill";
import { useDeleteWill } from "@/hooks/useWill/useDeleteWill";
import { useGetWill } from "@/hooks/useWill/useGetWill";
import { isDeleteDetailsCloseAtom } from "@/state/jotai";
import { e8sToHuman } from "@/utils/e8s";
import { ICRCASSETLIST, truncatePrincipal } from "@/utils/utils";
import { isP2PKHAddress } from "@/utils/validateP2PKHAddress";
import {
  AbsoluteCenter,
  Box,
  Button,
  Input,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function WillDetails() {
  //atoms
  const [isDeleteDetailsClose, setIsDeleteDetailsClose] = useAtom(
    isDeleteDetailsCloseAtom
  );
  //local states
  const [isDeleteButtonLoading, setDeleteButtonLoading] =
    useState<boolean>(false);

  //hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  const [will, fetchGetWill, isLoading, timeStamp] = useGetWill();
  const [deleteWillFunc, useDeleteWill_isLoading] = useDeleteWill();
  const [deleteBTCWill, useBTCDeleteWill_isLoading] = useBTCDeleteWill();

  const [address, setAddress] = useState<string | null>(null);
  const [isAddressValid, setValidAddress] = useState<boolean>(false);

  const identifier = searchParams.get("id");

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

  if (
    !will ||
    isLoading ||
    useDeleteWill_isLoading ||
    useBTCDeleteWill_isLoading
  ) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  const handleInputAddressChange = (event: any) => {
    try {
      const address = event.target.value;

      const isValid = isP2PKHAddress(address);
      if (isValid) {
        setAddress(address);
        setValidAddress(true);
      } else {
        console.log("Address Not Valid: ", address);
        setAddress(null);
        setValidAddress(false);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: willDetails.tsx:74 ~ handleInputAddressChange ~ error:",
        error
      );
      setAddress(null);
      setValidAddress(false);
    }
  };

  const deleteWill = () => {
    //check for ICRC
    if (will && will.identifier && ICRCASSETLIST.includes(will.tokenTicker)) {
      setDeleteButtonLoading(true);
      deleteWillFunc(will.identifier, "ICRC");
      setDeleteButtonLoading(false);
    } else if (
      will &&
      will.identifier &&
      will.tokenTicker === "BTC" &&
      address
    ) {
      setDeleteButtonLoading(true);
      deleteBTCWill(will.identifier, "BTC", address);
      setDeleteButtonLoading(false);
    } else {
      console.log("No will  or other error occured");
    }
  };
  return (
    <>
      <Box
        bg={useColorModeValue("gray.300", "gray.900")}
        className="shadow-lg border-2 flex flex-col justify-start items-start  w-full px-6 md:p-14"
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
            <Box as="p" className="text-lg text-black  leading-4 ">
              {will.willName}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Will Description
            </Box>
            <Box as="p" className="text-lg text-black  leading-4 ">
              {will.willDescription}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Will UID
            </Box>
            <Box as="p" className="text-lg text-black  leading-4 ">
              {will.identifier}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Testator
            </Box>
            <Box as="p" className="text-lg text-black  leading-4 ">
              {truncatePrincipal(will.testator.toString())}
            </Box>
          </Box>{" "}
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Heir
            </Box>
            <Box as="p" className="text-lg text-black  leading-4 ">
              {truncatePrincipal(will.heirs.toString())}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Date
            </Box>
            <Box as="p" className="text-lg text-black  leading-4 ">
              {String(timeStamp)}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Token Ticker
            </Box>
            <Box as="p" className="text-lg text-black  leading-4 ">
              {will.tokenTicker}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Address
            </Box>
            <Box as="p" className="text-lg text-black  leading-4 ">
              {e8sToHuman(will.value)}
            </Box>
          </Box>
          <Box className="flex justify-between w-full items-center">
            <Box as="p" className="text-lg text-black leading-4 ">
              Amount
            </Box>
            <Box as="p" className="text-lg text-black  leading-4 ">
              {e8sToHuman(will.value)}
            </Box>
          </Box>
        </Box>
        {ICRCASSETLIST.includes(will.tokenTicker) && (
          <Box className="flex mt-7 flex-col items-end w-full space-y-6">
            <Box className="flex justify-between w-full items-center mt-32">
              <Button
                isLoading={isDeleteButtonLoading}
                onClick={deleteWill}
                as="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
        {will.tokenTicker === "BTC" && (
          <Box className="flex mt-7 flex-col items-end w-full space-y-6">
            <Box className="flex justify-between w-full items-center mt-32">
              <Button
                isDisabled={!isAddressValid}
                isLoading={isDeleteButtonLoading}
                onClick={deleteWill}
                as="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Delete
              </Button>

              <Input
                onChange={handleInputAddressChange}
                color="teal"
                placeholder="Enter BTC Address (P2PKH)"
                _placeholder={{ color: "inherit" }}
                className="text-blue-700 border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2   "
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default WillDetails;
