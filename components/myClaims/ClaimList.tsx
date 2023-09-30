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
import { useHeirs, useTestator } from "@/hooks/will";
import { principalAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { truncatePrincipal } from "@/utils/utils";
function ClaimList() {
  const [heirsWills, isLoading, error] = useHeirs();
  const [principal, setPrincipal] = useAtom(principalAtom);

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  } else if (heirsWills?.length === 0 || !heirsWills) {
    return (
      <>
        <AbsoluteCenter>
          <Box
            as={"p"}
            fontSize="30"
            className="text-sm  leading-none text-black"
          >
            <Icon
              fontSize="40"
              color={"black"}
              as={BsFillPatchExclamationFill}
            />
            &nbsp;&nbsp;<b>No Wills To Claim</b>
          </Box>
        </AbsoluteCenter>
      </>
    );
  } else if (heirsWills?.length > 0 && heirsWills) {
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
                {heirsWills.map((item, index) => (
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
                      <Link href={`/claims/claim?id=${item}`}>
                        <Icon as={IoIosExpand} />
                      </Link>{" "}
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

export default ClaimList;
