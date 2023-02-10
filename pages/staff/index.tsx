import React from "react";
import {
  Avatar,
  Box,
  Table,
  TableContainer,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  TableCaption,
  Heading,
  Icon,
} from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";

import { FaUserEdit, FaUserMinus } from "react-icons/fa";

const StaffList = ({ users }) => {
  console.log(users);
  return (
    <Box
      backgroundColor="white"
      maxWidth="max-content"
      maxHeight="max-content"
      boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"
      padding="1.25rem"
      textAlign="center"
      display="block"
      margin="0 auto"
    >
      <TableContainer>
        <Heading size="lg" margin="10px 10px 20px 10px">
          Staff
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Location</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((e, i) => {
              return (
                <Tr>
                  <Td>
                    {" "}
                    <Avatar size="xs" src="" cursor="pointer" />
                  </Td>
                  <Td>
                    <Text>{e.firstName}</Text>
                  </Td>
                  <Td>{e.firstName}</Td>
                  <Td>{e.lastName}</Td>
                  <Td>{e.store}</Td>
                  <Td>{e.email}</Td>
                  <Td>
                    <Icon as={FaUserEdit} cursor="pointer" />
                  </Td>
                  <Td>
                    <Icon as={FaUserMinus} cursor="pointer" />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const getServerSideProps = async ({ req }) => {
  let user;

  try {
    user = validateToken(req.cookies.MEDI_RECORD_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  if (!user) {
    // no stock name, redirect back to home route
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const users = await prisma.user.findMany({
    select: { firstName: true, lastName: true, store: true, email: true },
  });

  return {
    props: { users },
  };
};

export default StaffList;
