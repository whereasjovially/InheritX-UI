"use client";
import React, { ReactNode } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Link from "next/link";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link as ChakraLink,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiPieChart,
} from "react-icons/fi";
import { TbJewishStar } from "react-icons/tb";
import { SiAcclaim } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { PiSignOutBold } from "react-icons/pi";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, path: "/" },
  { name: "Profile", icon: CgProfile, path: "/profile" },
  { name: "My Wills", icon: TbJewishStar, path: "/wills" },
  { name: "My Claims", icon: SiAcclaim, path: "/claims" },
  // { name: "Favourites", icon: FiStar, path: "/about" },
  // { name: "Settings", icon: FiSettings, path: "/about" },
];

interface SidebarWithHeaderProps {
  signOut(): void;
  children: ReactNode;
}
export default function SidebarWithHeader({
  children,
  signOut,
}: SidebarWithHeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.300", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} signOut={signOut} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("grey.500", "gray.900")}
      borderRight="0px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          textColor={"black"}
        >
          A M
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: ReactText;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <ChakraLink
      as={Link}
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  signOut(): void;
}
const MobileNav = ({ signOut, onOpen, ...rest }: MobileProps) => {
  const promptAlert: React.CSSProperties = {
    // display: 'flex',
    // flexDirection: 'column'
    backgroundColor: "white",
    fontWeight: "bold",
    color: "black",
    borderRadius: "lg",
    padding: "10px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
    fontSize: "16px",
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("grey.500", "gray.900")}
      borderBottomWidth="2px"
      borderBottomColor={useColorModeValue("white.100", "gray.900")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        textColor={"black"}
      >
        A M
      </Text>

      <Button
        onClick={signOut}
        rightIcon={<PiSignOutBold />}
        colorScheme="blue"
        variant="outline"
      >
        Sign out
      </Button>
    </Flex>
  );
};
