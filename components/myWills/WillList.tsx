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
import { truncatePrincipal } from "@/utils/utils";
import { useTestator } from "@/hooks/useWill/useTestator";
import { useUserInfo } from "@/hooks/useUser/useUserInfo";
function WillList() {
  //hooks
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
            &nbsp;&nbsp;<b>No Wills Found</b>
          </Box>
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
