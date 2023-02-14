import React from "react";
import { Flex } from "@chakra-ui/react";

export const BackgroundImage = ({ children, image }) => {
  return (
    <Flex
      backgroundImage={image}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      width="100%"
      height="100vh"
    >
      {children}
    </Flex>
  );
};
