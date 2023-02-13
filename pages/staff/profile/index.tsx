import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  Avatar,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Th,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import prisma from "../../../lib/prisma";
import { validateToken } from "../../../lib/auth";

const index = ({ users }) => {
  const { id, firstName, lastName, email, role, store } = users;

  return (
    <Flex h="100vh" w="100vw" alignContent="center" justifyContent="center">
      {users && (
        <Card
          backgroundColor="white"
          height="max-content"
          minWidth="35vw"
          mt="6"
          borderTop=" 8px solid"
          borderColor="brand.800"
          overflowY="scroll"
          maxH="95vh"
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
              backgroundColor: `white`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `brand.800`,
            },
          }}
        >
          <CardHeader pb="2" pt="2">
            <Flex gap="18px" flexDirection="row" padding="24px">
              <Avatar size="xl" />
              <Flex gap="2px" flexDirection="column" mt="18px">
                <Heading size="md">
                  {firstName} {lastName}
                </Heading>
                <Text>Position</Text>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody pt="0">
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Email</Td>
                    <Td>{email}</Td>
                  </Tr>
                  <Tr>
                    <Td>Phone</Td>
                    <Td>0457852145</Td>
                  </Tr>
                  <Tr>
                    <Td>Store</Td>
                    <Td>{store}</Td>
                  </Tr>
                  <Tr>
                    <Td>Active From</Td>
                    <Td>17/02/23</Td>
                  </Tr>
                  <Tr>
                    <Td>Department</Td>
                    <Td>Health</Td>
                  </Tr>
                  <Tr>
                    <Td>Reports To</Td>
                    <Td>
                      <Avatar size="xs" />
                      &nbsp;Boss Name
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <TableContainer mt="6" bg="gray.100">
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Th>Personal Information</Th>
                  </Tr>
                  <Tr>
                    <Td w="200px">Home Address</Td>
                    <Td>742 Wallaby Street</Td>
                  </Tr>
                  <Tr>
                    <Td>Home Phone</Td>
                    <Td>0457852145</Td>
                  </Tr>
                  <Tr>
                    <Td>Gender</Td>
                    <Td>Male</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <TableContainer mt="6" bg="gray.100">
              <Table variant="simple">
                <Tbody>
                  <Th>Qualifications</Th>
                  <Tr>
                    <Td w="200px">First Aid Certificate</Td>
                    <Td>Expires : 02/23</Td>
                    <Td>
                      <FiDownload />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <TableContainer mt="6" bg="gray.100">
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Th>Emergency Contacts</Th>
                  </Tr>
                  <Tr>
                    <Td w="10%">John Smith</Td>
                    <Td>JohnSmith@gmail.com</Td>
                    <Td>0455626222</Td>
                  </Tr>
                  <Tr>
                    <Td>Mary White</Td>
                    <Td>MaryWhite@gmail.com</Td>
                    <Td>0488515111</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  let userEmail = query.email;

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
    // no user name, redirect back to home route
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const users = await prisma.user.findFirst({
    where: {
      email: {
        equals: userEmail,
      },
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      store: true,
    },
  });

  return {
    props: { users },
  };
};

export default index;
