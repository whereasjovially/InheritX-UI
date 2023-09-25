import { useUserInfo } from "@/hooks/user";
import {
  AbsoluteCenter,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, {  } from "react";

function ProfileDetails() {
  const [
    principal,
    firstNames,
    lastName,
    sex,
    birthDate,
    birthLocationCode,
    isLoading,
    error,
  ] = useUserInfo();

  return isLoading ? (
    <AbsoluteCenter>
      <Spinner size="xl" />
    </AbsoluteCenter>
  ) : (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          {" "}
          <Tr>
            <Th></Th>
            <Th isNumeric></Th>
          </Tr>
        </Thead>
        <Tbody>
          <br />{" "}
          <Tr>
            <Td className="font-bold">Principal</Td>
            <Td isNumeric>{principal}</Td>
          </Tr>
          <br />{" "}
          <Tr>
            <Td className="font-bold">First Name(s)</Td>
            <Td isNumeric>{firstNames}</Td>
          </Tr>
          <br />
          <Tr>
            <Td className="font-bold">Last Name</Td>
            <Td isNumeric> {lastName}</Td>
          </Tr>
          <br />
          <Tr>
            <Td className="font-bold">Sex</Td>
            <Td isNumeric>{sex}</Td>
          </Tr>
          <br />
          <Tr>
            <Td className="font-bold">Birth Date</Td>
            <Td isNumeric>{birthDate}</Td>
          </Tr>
          <br />
          <Tr>
            <Td className="font-bold">Birth Postal Code</Td>
            <Td isNumeric>{birthLocationCode}</Td>
          </Tr>
          <br />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProfileDetails;
