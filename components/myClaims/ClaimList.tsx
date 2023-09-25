"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlineDelete } from "react-icons/md";
function ClaimList() {
  const [show, setShow] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box className="mt-0 shadow">
        <TableContainer>
          <Table colorScheme="teal">
            {/* <TableCaption>List of Asset In a Given Portfolio</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>TIcker</Th>
                <Th>Price</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Link
                    href={`/asset?name=${"portfolio_1"}&asset_name=${"ICP"}`}
                  >
                    Internet Computer
                  </Link>
                </Td>
                <Td>ICP</Td>
                <Td>30.48</Td>
                <Td>
                  <Icon as={MdOutlineDelete} />
                </Td>
              </Tr>
            </Tbody>
            {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ClaimList;
