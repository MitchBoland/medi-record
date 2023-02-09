import React from "react";
import { Box, Flex, SlideFade, Spinner } from "@chakra-ui/react";
import { useMe } from "../../../lib/hooks";
import SideBar from "../SideBar/SideBar";
import BackgroundImage from "../../BackgroundImage/BackgroundImage";

export const SiteLayout = ({ children }) => {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box width="100%">
      <BackgroundImage image="/images/loginBackground.jpg" />
      <Flex>
        <SlideFade offsetX="-50px" in>
          <SideBar />
        </SlideFade>
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
        >
          <Box padding="48px">{children}</Box>
        </Flex>
      </Flex>
    </Box>
  );
};
