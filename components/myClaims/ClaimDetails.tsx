import { useBTCClaimWill } from "@/hooks/useBTC/useBTCClaimWill";
import { useCheckDeath } from "@/hooks/useWill/useCheckDeath";
import { useClaimWill } from "@/hooks/useWill/useClaimWill";
import { useGetWill } from "@/hooks/useWill/useGetWill";
import { useReportDeath } from "@/hooks/useWill/useReportDeath";
import { isClaimDetailsCloseAtom } from "@/state/jotai";
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
  useToast,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ClaimDetails() {
  //atoms
  const [isClaimDetailsClose, setIsClaimDetailsClose] = useAtom(
    isClaimDetailsCloseAtom
  );

  //local states

  const [address, setAddress] = useState<string | null>(null);
  const [isAddressValid, setValidAddress] = useState<boolean>(false);
  const [isReportDeathInput, setReportDeathInput] = useState<boolean>(false);
  const [base64Id, setBase64Id] = useState<string | null>(null);
  const [isClaimButtonLoading, setClaimButtonLoading] =
    useState<boolean>(false);
  const [isReportDeathButtonLoading, setReportDeathButtonLoading] =
    useState<boolean>(false);

  //hooks
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();

  const [will, fetchGetWill, isLoading,timeStamp] = useGetWill();
  const [claimWillFunc, useClaimWill_isLoading] = useClaimWill();
  const [claimBTCWill, useClaimBTCWill_isLoading] = useBTCClaimWill();
  const [isDied, reportDeathFunc, useReportDeath_isLoading] = useReportDeath();
  const [checkIsDied, checkDeath] = useCheckDeath();

  const identifier = searchParams.get("id");

  useEffect(() => {
    if (identifier) {
      console.log("parseInt(identifier!)", parseInt(identifier!));
      fetchGetWill(parseInt(identifier!));
      checkDeath(parseInt(identifier!));
    }
  }, []);

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

  const handleReportDeathInput = (event: { target: { value: string } }) => {
    const url = event.target.value;
    if (
      typeof url === "string" &&
      url.includes("https://deces.matchid.io/id/")
    ) {
      // Use a regular expression to capture everything after "id/"
      const match = url.match(/\/id\/(.+)/);

      if (match && match[1]) {
        // match[1] contains the desired portion of the URL
        const desiredPart = match[1];
        console.log(
          "🚀 ~ file: ClaimDetails.tsx:53 ~ handleReportDeathInput ~ desiredPart:",
          desiredPart
        );

        if (desiredPart.length === 12) {
          setReportDeathInput(true);
          setBase64Id(desiredPart);
        } else {
          setReportDeathInput(false);
        }
      } else {
        setReportDeathInput(false);
        console.log("URL format not recognized");
      }
    } else {
      setReportDeathInput(false);
    }
  };
  const reportDeath = () => {
    if (identifier && base64Id) {
      setReportDeathButtonLoading(true);
      reportDeathFunc(parseInt(identifier!), base64Id);
      setReportDeathButtonLoading(false);
    } else {
      toast({
        title: "Error occured.",
        description: JSON.stringify({ identifier, isReportDeathInput }),
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (isClaimDetailsClose) {
    setIsClaimDetailsClose(false);

    router.push("/claims");
  }
  if (
    !will ||
    isLoading ||
    useClaimWill_isLoading ||
    useClaimBTCWill_isLoading
  ) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  const claimWill = () => {
    //check for ICRC
    if (will && will.identifier && ICRCASSETLIST.includes(will.tokenTicker)) {
      setClaimButtonLoading(true);
      claimWillFunc(will.identifier, "ICRC");
      setClaimButtonLoading(false);
    } else if (
      will &&
      will.identifier &&
      will.tokenTicker === "BTC" &&
      address
    ) {
      setClaimButtonLoading(true);
      claimBTCWill(will.identifier, "BTC", address);
      setClaimButtonLoading(false);
    } else {
      console.log("No will or other error occured");
    }
  };
  return (
    <>
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
        <Box className="flex justify-between w-full items-center mt-32">
          {checkIsDied && ICRCASSETLIST.includes(will.tokenTicker) && (
            <Button
              isLoading={isClaimButtonLoading}
              onClick={claimWill}
              as="button"
              isDisabled={!isDied || !checkIsDied}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Claim
            </Button>
          )}

          {checkIsDied && will.tokenTicker === "BTC" && (
            <Button
              onChange={handleInputAddressChange}
              isLoading={isClaimButtonLoading}
              onClick={claimWill}
              as="button"
              isDisabled={!isAddressValid}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Claim BTC
            </Button>
          )}
          {!checkIsDied && (
            <>
              <Input
                isInvalid={!isReportDeathInput}
                placeholder="https://deces.matchid.io/id/rg_7nG6UoI_Y"
                onChange={handleReportDeathInput}
                isDisabled={isDied || checkIsDied}
                // htmlSize={4}
                width="auto"
              />
              <Button
                isLoading={isReportDeathButtonLoading}
                onClick={reportDeath}
                isDisabled={isDied || checkIsDied}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              >
                Report User
              </Button>
            </>
          )}
          {checkIsDied && (
            <>
              <Input
                onChange={handleInputAddressChange}
                color="teal"
                placeholder="Enter BTC Address (P2PKH)"
                _placeholder={{ color: "inherit" }}
                className="text-blue-700 border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2   "
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ClaimDetails;
