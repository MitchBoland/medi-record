import React, { useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Table,
  Button,
  TableContainer,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  Switch,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import router from "next/router";
import { UserSearch } from "../../components/UserSearch";

const StaffList = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Box
      backgroundColor="white"
      pos="relative"
      height="100%"
      maxWidth="calc(100% - 24px)"
      maxHeight="100vh"
      boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"
      borderTop=" 8px solid"
      borderColor="brand.800"
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
      <Button variant="submit" pos="absolute" top="2" right="6" w="48px">
        <Icon as={FiUserPlus} h="5" w="5" />
      </Button>
      <Heading size="sm" margin="0px 12px 24px 24px" textAlign="left" w="100%">
        Staff at Company Name
      </Heading>

      <UserSearch
        setResults={setResults}
        setError={setError}
        setLoading={setLoading}
      />

      <TableContainer>
        <Table variant="simple">
          {!loading && !error && (
            <Thead>
              <Tr>
                <Th />
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Location</Th>
                <Th>Email</Th>
                <Th>Edit</Th>
                <Th>Active</Th>
              </Tr>
            </Thead>
          )}

          <Tbody>
            {results &&
              !error &&
              !loading &&
              results.map(
                ({
                  uuid,
                  email,
                  userDetails: { firstName, lastName, store },
                }) => {
                  return (
                    <Tr key={uuid}>
                      <Td>
                        <Avatar
                          size="xs"
                          src=""
                          cursor="pointer"
                          onClick={() => {
                            router.push({
                              pathname: "/staff/profile/[id]",
                              query: { id: uuid },
                            });
                          }}
                        />
                      </Td>
                      <Td>{firstName}</Td>
                      <Td>{lastName}</Td>
                      <Td>{store}</Td>
                      <Td>{email}</Td>
                      <Td>
                        <Icon
                          as={FaUserEdit}
                          cursor="pointer"
                          ml="2"
                          onClick={() => {
                            router.push({
                              pathname: "/staff/profile/[id]",
                              query: { id: uuid },
                            });
                          }}
                        />
                      </Td>
                      <Td>
                        <Switch size="sm" pl="2" />
                      </Td>
                    </Tr>
                  );
                }
              )}
            {loading && <CircularProgress isIndeterminate color="brand.800" />}
            {error && (
              <Text
                pos="absolute"
                fontSize="18px"
                left="0"
                right="0"
                mx="auto"
                mt="48px"
              >
                An Error Has Occured
              </Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffList;
