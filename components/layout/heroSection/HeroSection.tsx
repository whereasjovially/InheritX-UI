import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { isConnectedAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { connectWallet } from "../../auth/auth";
import { useSignOut } from "@/hooks/signOut";
import { useRouter } from "next/navigation";
import PlugConnectIcon from "@/icon";
import { showToast } from "@/utils/toast";

export default function HeroSection() {
  const router = useRouter();
  const toast = useToast();

  const [, setConnected] = useAtom(isConnectedAtom);
  const [clearStates] = useSignOut();

  const PlugLogo = <PlugConnectIcon h="40px" />;
  const connect = async () => {
    console.log("clearing states......");
    clearStates();
    const connection = await connectWallet();
    if (connection) {
      router.push("/");
    } else {
      showToast(
        toast,
        "Wallet Not Found",
        "Click here: https://plugwallet.ooo/",
        "error",
        "top"
      );
    }
    console.log(
      "🚀 ~ file: HeroSection.tsx:23 ~ connectWallet ~ connection:",
      connection
    );
    setConnected(connection);
  };

  return (
    <Stack
      bg={useColorModeValue("gray.300", "gray.900")}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Center className={`sm:visible`}>
            {" "}
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                className="italic"
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Inherit
              </Text>
              <Text
                className="shadow shadow-transparent"
                color={"blue.400"}
                as={"span"}
              >
                X{" "}
              </Text>{" "}
            </Heading>
          </Center>
          <Center className={`sm:visible`}>
            <Text
              className="italic"
              fontSize={{ base: "md", lg: "lg" }}
              color={"gray.700"}
            >
              Empowering Your Digital Asset Succession{" "}
            </Text>{" "}
          </Center>

          <Center className={`sm:visible`}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rightIcon={PlugLogo}
                // shadow={"xl"}
                className=" shadow hover:shadow-lg text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                // className="shadow hover:shadow-lg border-2 border-transparent border-blue	"
                onClick={connect}
                rounded={"lg"}
                color={"black"}
                _hover={{
                  bg: "blue.200",
                }}
              >
                Connect &nbsp;{" "}
              </Button>
            </Stack>
          </Center>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"contain"}
          src="https://digitalwill.com/images/wishes.png"
          // src={`https://elements-cover-images-0.imgix.net/c243de7a-150c-4541-9d67-b4e16d078146?auto=compress%2Cformat&fit=max&w=900&s=c7cbb7cc81bb1744051ed82fef230c02`}
        />
      </Flex>
    </Stack>
  );
}
