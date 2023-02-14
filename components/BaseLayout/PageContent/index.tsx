import React from "react";
import { Flex } from "@chakra-ui/react";

export const PageContent = ({ children }) => {
  return (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <Flex
        width="100%"
        maxWidth="calc(100% - 48px)"
        alignItems="flex-start"
        height="100%"
        padding="24px"
        overflow="hidden"
        flexDirection="column"
      >
        {children}
      </Flex>
    </Flex>
  );
};
