import React from "react";
import {
  Avatar,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Switch,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { validateToken } from "../../lib/auth";
import { FaUserEdit } from "react-icons/fa";
import prisma from "../../lib/prisma";

const StaffList = ({ users }) => {
  return (
    <Box
      backgroundColor="white"
      height="max-content"
      maxWidth="max-content"
      maxHeight="100vh"
      boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"
      padding="24px"
      textAlign="center"
      display="block"
      margin="0 auto"
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <TableContainer>
        <Heading size="md" margin="12px 12px 24px 24px">
          Staff
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th />
              <Th textAlign="center">First Name</Th>
              <Th textAlign="center">Last Name</Th>
              <Th textAlign="center">Location</Th>
              <Th textAlign="center">Email</Th>
              <Th>Edit</Th>
              <Th>Active</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(({ firstName, lastName, store, email }) => {
              return (
                <Tr>
                  <Td>
                    {" "}
                    <Avatar size="xs" src="" cursor="pointer" />
                  </Td>
                  <Td>{firstName}</Td>
                  <Td>{lastName}</Td>
                  <Td>{store}</Td>
                  <Td>{email}</Td>
                  <Td>
                    <Icon as={FaUserEdit} cursor="pointer" ml="2" />
                  </Td>
                  <Td>
                    <Switch size="sm" pl="2" />
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
