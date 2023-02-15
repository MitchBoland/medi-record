import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Select,
  FormLabel,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { searchStaff } from "../../lib/mutations";

export const UserSearch = ({ setResults, setError, setLoading }) => {
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [store, setStore] = useState(" ");

  useEffect(() => {
    setLoading(true);
    const searchUser = async () => {
      try {
        const searchData = await searchStaff({
          firstName,
          lastName,
          store,
        });
        setResults(searchData.users);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    const timeOut = setTimeout(() => searchUser(), 3000);
    return () => clearTimeout(timeOut);
  }, [firstName, lastName, store, setResults, setError, setLoading]);

  return (
    <Box
      position="relative"
      p="4"
      bg="gray.100"
      h="max-content"
      mb="6"
      maxW="100vw"
    >
      <Flex justifyContent="start" alignItems="center" gap="18px">
        <Wrap>
          <WrapItem>
            <Flex flexDir="column">
              <FormLabel mt="1" ml="2" fontSize="12px">
                First Name
              </FormLabel>
              <Input
                ml="2"
                mb="6"
                size="sm"
                w="240px"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Flex>
          </WrapItem>

          <WrapItem>
            <Flex flexDir="column">
              <FormLabel mt="1" ml="2" fontSize="12px">
                Last Name
              </FormLabel>
              <Input
                ml="2"
                mb="6"
                size="sm"
                w="240px"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Flex>
          </WrapItem>

          <WrapItem>
            <Flex flexDir="column">
              <FormLabel mt="1" ml="2" fontSize="12px">
                Location
              </FormLabel>
              <Select
                ml="2"
                mr="2"
                mb="6"
                size="sm"
                w="240px"
                h="34px"
                placeholder="Select option"
                onChange={(e) => setStore(e.target.value)}
              >
                <option value="keperra">keperra</option>
                <option value="bundaberg">bundaberg</option>
                <option value="alexandra hills">alexandra hills</option>
              </Select>
            </Flex>
          </WrapItem>

          <WrapItem>
            <Flex flexDir="column">
              <FormLabel mt="1" ml="2" fontSize="12px">
                Position
              </FormLabel>
              <Select
                ml="2"
                mr="2"
                mb="6"
                size="sm"
                w="240px"
                h="34px"
                placeholder="Select option"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Flex>
          </WrapItem>
        </Wrap>
      </Flex>

      <Stack direction="row" align="flex-end" justifyContent="flex-end" mr="6">
        <Button variant="submit">Reset</Button>
      </Stack>
    </Box>
  );
};

export default UserSearch;
