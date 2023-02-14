import React, { useState } from "react";
import { Box, Flex, SlideFade, Spinner } from "@chakra-ui/react";
import { useMe } from "../../../lib/hooks";
import SideBar from "../SideBar/SideBar";
import { BackgroundImage } from "../../BackgroundImage";

export const SiteLayout = ({ children }) => {
  const { user, isLoading } = useMe();

  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  const collapseEvent = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box width="100%">
      <BackgroundImage image="/images/background_gradient.png">
        <Flex>
          <SlideFade offsetX="-50px" in>
            <SideBar trackCollapse={collapseEvent} />
          </SlideFade>
          <Flex
            width={isCollapsed ? "calc(100vw - 75px)" : "calc(100vw - 200px)"}
          >
            {children}
          </Flex>
        </Flex>
      </BackgroundImage>
    </Box>
  );
};
