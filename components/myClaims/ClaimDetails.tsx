import {
  useCheckDeath,
  useClaimWill,
  useDeleteWill,
  useGetWill,
  useReportDeath,
} from "@/hooks/will";
import { isClaimDetailsCloseAtom } from "@/state/jotai";
import { e8sToHuman } from "@/utils/e8s";
import { ICRCASSETLIST } from "@/utils/utils";
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
  const router = useRouter();

  const [isClaimDetailsClose, setIsClaimDetailsClose] = useAtom(
    isClaimDetailsCloseAtom
  );
  const [isReportDeathInput, setReportDeathInput] = useState<boolean>(false);
  console.log(
    "🚀 ~ file: ClaimDetails.tsx:24 ~ ClaimDetails ~ isReportDeathInput:",
    isReportDeathInput
  );
  const [base64Id, setBase64Id] = useState<string | null>(null);
  const [isClaimButtonLoading, setClaimButtonLoading] =
    useState<boolean>(false);

  const [isReportDeathButtonLoading, setReportDeathButtonLoading] =
    useState<boolean>(false);

  const searchParams = useSearchParams();
  const identifier = searchParams.get("id");

  const [will, fetchGetWill, isLoading] = useGetWill();
  const [claimWillFunc, useClaimWill_isLoading] = useClaimWill();
  const [isDied, reportDeathFunc, useReportDeath_isLoading] = useReportDeath();
  console.log(
    "🚀 ~ file: ClaimDetails.tsx:32 ~ ClaimDetails ~ isDied:",
    isDied
  );
  const [checkIsDied, checkDeath] = useCheckDeath();
  console.log(
    "🚀 ~ file: ClaimDetails.tsx:33 ~ ClaimDetails ~ checkIsDied:",
    checkIsDied
  );

  const toast = useToast();

  useEffect(() => {
    if (identifier) {
      console.log("parseInt(identifier!)", parseInt(identifier!));
      fetchGetWill(parseInt(identifier!));
      checkDeath(parseInt(identifier!));
    }
  }, []);

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
      });
    }
  };

  if (isClaimDetailsClose) {
    setIsClaimDetailsClose(false);

    router.push("/claims");
  }
  if (!will || isLoading || useClaimWill_isLoading) {
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
            isLoading={isClaimButtonLoading}
            onClick={claimWill}
            as="button"
            // isLoading={}
            // isDisabled={!isDied || !checkIsDied}
            className="text-xl text-black  bg-green-800 font-semibold leading-4 "
          >
            Claim
          </Button>
          <>
            <Input
              isInvalid={!isReportDeathInput}
              placeholder="https://deces.matchid.io/id/rg_7nG6UoI_Y"
              onChange={handleReportDeathInput}
              isDisabled={isDied || checkIsDied}
              // htmlSize={4}
              width="auto"
            />{" "}
            <Button
              isLoading={isReportDeathButtonLoading}
              onClick={reportDeath}
              isDisabled={isDied || checkIsDied}
              className="text-lg text-black bg-red-800 font-semibold leading-4 "
            >
              Report Death
            </Button>
          </>
        </Box>
      </Box>
    </>
  );
}

export default ClaimDetails;
