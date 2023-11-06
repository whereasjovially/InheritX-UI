import { useGetBTCBalance } from "@/hooks/useBTC/useGetBTCBalance";
import { useGetP2PKHAddress } from "@/hooks/useBTC/useGetP2PKHAddress";
import { identifierAtom, isWillFormOpenAtom } from "@/state/jotai";
import { Box, Button, Center, Icon } from "@chakra-ui/react";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { SiBitcoinsv } from "react-icons/si";

export default function DepositBTCForm({
  identifier,
}: {
  identifier: number | null;
}) {
  const router = useRouter();

  const [, setOpen] = useAtom(isWillFormOpenAtom);
  const [, setIdentifier] = useAtom(identifierAtom);

  const [isDisableButton, setDisableButton] = useState<boolean>(false);

  const [balance, getBTCBalance] = useGetBTCBalance();

  const [address, getP2PKHAddress] = useGetP2PKHAddress();

  const updateDelayStateAfterDelay = () => {
    setTimeout(() => {
      setDisableButton(false);
    }, 30000); // 30 seconds (30,000 milliseconds)
  };

  const copyText = () => {
    navigator.clipboard.writeText(address);
  };

  const getBalance = async () => {
    if (identifier) {
      console.log(
        "🚀 ~ file: DepositBTCForm.tsx:37 ~ getBalance ~ identifier:",
        identifier
      );
      setDisableButton(true);
      getBTCBalance();
      updateDelayStateAfterDelay();
    }
  };

  const getAddress = async () => {
    if (identifier) {
      setDisableButton(true);
      getP2PKHAddress();
      updateDelayStateAfterDelay();
    }
  };

  const goToHome = async () => {
    setOpen(false);
    setIdentifier(null);
    router.push("/wills");
  };
  useEffect(() => {
    getP2PKHAddress();
  }, []);
  return (
    <>
      <Box className="bg-transparent w-full sm:px-6">
        <Box className=" relative  md:px-10  py-[10%]  rounded-tl-lg rounded-tr-lg">
          <Center>
            <Box className="rounded-lg shadow">
              <Box className="p-6 text-center">
                <h1 className="font-serif text-4xl font-extrabold mb-5  text-gray-500 dark:text-gray-400">
                  Deposit{" "}
                </h1>
                <Icon
                  className="bg-transparent"
                  width={12}
                  height={12}
                  as={SiBitcoinsv}
                ></Icon>
                <br />
                <br />
                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  BTC Address (P2PKH){" "}
                </h3>
                <br />
                <h3 className="mb-0 text-lg font-normal text-gray-500 dark:text-gray-400">
                  <div className="flex w-full">
                    <div className="relative mb-3 w-full">{address}</div>
                  </div>
                </h3>
                <div>
                  <Button
                    onClick={copyText}
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Copy
                  </Button>{" "}
                  <Button
                    isDisabled={isDisableButton}
                    onClick={getAddress}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    <Icon as={FiRefreshCcw} />
                    &nbsp; Load
                  </Button>
                </div>
                <br />
                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  Balance
                </h3>
                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  {balance}
                </h3>

                <br />
                <Button
                  onClick={goToHome}
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Go Home
                </Button>
                <Button
                  isDisabled={isDisableButton}
                  onClick={getBalance}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  <Icon as={FiRefreshCcw} />
                  &nbsp; Refresh
                </Button>
              </Box>
            </Box>
          </Center>
        </Box>
      </Box>
    </>
  );
}
