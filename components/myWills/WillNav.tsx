import { useUser } from "@/hooks/user";
import { isWillFormOpenAtom } from "@/state/jotai";
import { AbsoluteCenter, Box, Button, Icon, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { PiPlus } from "react-icons/pi";
import { WillForm } from "./WillForm";
import { useWillIdentifier } from "@/hooks/will";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function CreateWill({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isOpen, setOpen] = useAtom(isWillFormOpenAtom);
  const [identifier, requestWillIdentifier, isLoading, error] =
    useWillIdentifier();
  const [isUserExists] = useUser();

  //if user not exists in canister push to profile route
  useEffect(() => {
    if (!isUserExists) {
      router.push("/profile");
    }
  });

  const createWill = async () => {
    await requestWillIdentifier();
    setOpen(true);
  };
  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return isOpen && identifier ? (
    <Box>{<WillForm />}</Box>
  ) : (
    <Box className=" w-full sm:px-6">
      <Box className=" px-4 md:px-10 py-4 md:py-7  rounded-tl-lg rounded-tr-lg">
        <Box className="flex items-center justify-between">
          <Box> </Box>
          <Box>
            <Button
              onClick={createWill}
              className="shadow-lg shadow-indigo-500/40 rounded inline-flex sm:ml-3  sm:mt-0 sm:m-0 items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none "
            >
              <p className="text-sm font-medium leading-none text-white">
                <Icon fontSize="16" color={"white"} as={PiPlus} />
                Create Will
              </p>
            </Button>
          </Box>
        </Box>
      </Box>
      {children}
    </Box>
  );
}

function WillNav({ children }: { children: React.ReactNode }) {
  const [isUserExists, isLoading, error] = useUser();

  return isLoading ? (
    <AbsoluteCenter>
      <Spinner size="xl" />
    </AbsoluteCenter>
  ) : (
    <CreateWill children={children} />
  );
}

export default WillNav;
