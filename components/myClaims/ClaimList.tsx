"use client";
import React from "react";
import {
  AbsoluteCenter,
  Box,
  Icon,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsFillPatchExclamationFill } from "react-icons/bs";
import { IoIosExpand } from "react-icons/io";
import { principalAtom } from "@/state/jotai";
import { useAtom } from "jotai";
import { truncatePrincipal } from "@/utils/utils";
import { useHeirs } from "@/hooks/useWill/useHeirs";
function ClaimList() {
  //atoms
  const [principal, setPrincipal] = useAtom(principalAtom);

  //hooks
  const [heirsWills, isLoading, error] = useHeirs();

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
                    <Td>{index + 1}</Td> <Spacer />
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
