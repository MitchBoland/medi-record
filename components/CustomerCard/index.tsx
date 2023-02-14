import React, { useState } from "react";
import {
  Flex,
  Heading,
  Card,
  Text,
  SlideFade,
  Box,
  Collapse,
  Button,
} from "@chakra-ui/react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdModeEditOutline,
  MdOutlineAdd,
} from "react-icons/md";

export const CustomerCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Box width="100%">
      <SlideFade offsetY="100px" in>
        <Card
          backgroundColor="white"
          width="100%"
          borderTop="5px solid"
          borderTopColor="brand.800"
        >
          <Flex flexDirection="column" padding="12px">
            <Flex pb="12px" justifyContent="space-between">
              <Flex>
                <Text pr="6px">Name:</Text>
                <Heading size="md">FirstName LastName</Heading>
              </Flex>
              <Flex>
                <Box mr="6px">
                  <Button
                    colorScheme="green"
                    onClick={() => {
                      setIsExpanded(!isExpanded);
                    }}
                    rightIcon={<MdOutlineAdd />}
                  >
                    Add Prescription
                  </Button>
                </Box>
                <Box>
                  <Button
                    colorScheme="gray"
                    onClick={() => {
                      setIsExpanded(!isExpanded);
                    }}
                    rightIcon={<MdModeEditOutline />}
                  >
                    Edit User
                  </Button>
                </Box>
              </Flex>
            </Flex>
            <Flex pb="12px">
              <Text pr="6px">Address:</Text>
              <Heading size="md">Address</Heading>
            </Flex>
            <Flex pb="12px">
              <Text pr="6px">Phone:</Text>
              <Heading size="md">Phone</Heading>
            </Flex>
            <Flex pb="12px">
              <Text pr="6px">Comments:</Text>
              <Heading size="md">Comments</Heading>
            </Flex>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Flex marginLeft="auto" marginRight="auto">
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                  }}
                  width="100%"
                  rightIcon={
                    isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                  }
                >
                  View Prescriptions
                </Button>
              </Flex>
              <Collapse in={isExpanded} animateOpacity>
                <Box>
                  <Text>this is the details</Text>
                </Box>
              </Collapse>
            </Flex>
          </Flex>
        </Card>
      </SlideFade>
    </Box>
  );
};
