import React from "react";
import { Flex } from "@chakra-ui/react";

export const BackgroundImage = ({ children, image }) => {
  return (
    <Flex backgroundImage={image} width="100%" height="100vh">
      {children}
    </Flex>
  );
};
