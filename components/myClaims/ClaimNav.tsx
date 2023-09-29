import { useUser } from "@/hooks/user";
import { isWillFormOpenAtom } from "@/state/jotai";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { PiPlus } from "react-icons/pi";
// import { WillForm } from "./WillForm";
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
  // useEffect(() => {
  //   if (!isUserExists) {
  //     router.push("/profile");
  //   }
  // });

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
    <Box></Box>
  ) : (
    <Box className=" w-full sm:px-6">
      <Box className="flex items-center justify-between"></Box>
      {children}
    </Box>
  );
}

function ClaimNav({ children }: { children: React.ReactNode }) {
  const [isUserExists, isLoading, error] = useUser();

  return isLoading ? (
    <AbsoluteCenter>
      <Spinner size="xl" />
    </AbsoluteCenter>
  ) : (
    <CreateWill children={children} />
  );
}

export default ClaimNav;
