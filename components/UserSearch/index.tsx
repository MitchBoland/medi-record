import React from "react";
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

export const UserSearch = () => {
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
              <Input ml="2" mb="6" size="sm" w="240px"></Input>
            </Flex>
          </WrapItem>

          <WrapItem>
            <Flex flexDir="column">
              <FormLabel mt="1" ml="2" fontSize="12px">
                Last Name
              </FormLabel>
              <Input ml="2" mb="6" size="sm" w="240px"></Input>
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
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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

      <Stack direction="row" align="center" gap={2}>
        <Button variant="submit">Search</Button>
        <Button variant="submit">Reset</Button>
      </Stack>
    </Box>
  );
};

export default UserSearch;
