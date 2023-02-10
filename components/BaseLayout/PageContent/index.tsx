import React from "react";
import { Flex } from "@chakra-ui/react";

export const PageContent = ({ children }) => {
  return (
    <Flex width="100%" height="100%">
      <Flex justifyContent="center" alignItems="center" width="100%">
        {children}
      </Flex>
    </Flex>
  );
};
