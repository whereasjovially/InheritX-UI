import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { isConnectedAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { connectWallet } from "../../auth/auth";

export default function HeroSection() {
  const [, setConnected] = useAtom(isConnectedAtom);

  const connect = async () => {
    const connection = await connectWallet();
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
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
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
              A
            </Text>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              M{" "}
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            The project board is an exclusive resource for contract work. Its
            perfect for freelancers, agencies, and moonlighters.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              className="border-2 "
              onClick={connect}
              rounded={"full"}
              // bg={"white"}
              color={"black"}
              _hover={{
                bg: "blue.200",
              }}
            >
              Connect Wallet{" "}
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"contain"}
          src={`https://elements-cover-images-0.imgix.net/c243de7a-150c-4541-9d67-b4e16d078146?auto=compress%2Cformat&fit=max&w=900&s=c7cbb7cc81bb1744051ed82fef230c02`}
        />
      </Flex>
    </Stack>
  );
}
