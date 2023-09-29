"use client";
import React, { useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsFillPatchExclamationFill } from "react-icons/bs";
import { IoIosExpand } from "react-icons/io";
import { useTestator } from "@/hooks/will";
import { principalAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { truncatePrincipal } from "@/utils/utils";
import { useUser, useUserInfo } from "@/hooks/user";
function WillList() {
  const [testatorWills, isLoading, error] = useTestator();
  const [principal] = useUserInfo();

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  } else if (testatorWills?.length === 0 || !testatorWills) {
    return (
      <>
        <AbsoluteCenter>
          <p className="text-sm font-medium leading-none text-white">
            <Icon
              fontSize="16"
              color={"white"}
              as={BsFillPatchExclamationFill}
            />
            No Wills Found
          </p>
        </AbsoluteCenter>
      </>
    );
  } else if (testatorWills.length > 0 && testatorWills) {
    return (
      <>
        <Box className="mt-0 shadow">
          <TableContainer>
            <Table colorScheme="teal">
              {/* <TableCaption>List of Asset In a Given Portfolio</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>Sno</Th>
                  <Spacer />
                  <Th>UID</Th>
                  <Spacer />
                  <Th>Principal</Th>
                </Tr>
              </Thead>
              <Tbody>
                {testatorWills.map((item, index) => (
                  <Tr key={index + 1}>
                    {" "}
                    <Td>
                      {/* <Link href={`/asset?name=${item.name}&asset_name=${item.asset_name}`}> */}
                      {index + 1}
                      {/* </Link> */}
                    </Td>{" "}
                    <Spacer />
                    <Td>{item}</Td> <Spacer />
                    <Td>{truncatePrincipal(principal!, 5)}</Td> <Spacer />
                    <Td>
                      <Link href={`/wills/will?id=${item}`}>
                        <Icon as={IoIosExpand} />
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

export default WillList;
