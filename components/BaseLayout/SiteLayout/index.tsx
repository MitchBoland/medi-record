import React from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useMe } from "../../../lib/hooks";

export const SiteLayout = ({ children }) => {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box width="100%">
      <Flex>
        <Box padding="48px" width="100%" height="100vh">
          <Text>testing we have the user + {user?.firstName}</Text>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
