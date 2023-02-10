import React, { useState, FC } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Image,
  Box,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiUser, FiBriefcase } from "react-icons/fi";
import { useMe } from "../../../lib/hooks";
import { SidebarItems } from "../../Sidebar/SidebarItems";
import { SidebarRoutes } from "../../types/types";

type props = {
  trackCollapse: () => void;
};

const Sidebar: FC<props> = ({ trackCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // default the navbar to be expanded
  const { user } = useMe();

  const sideBarItems: SidebarRoutes[] = [
    {
      title: "Dashboard",
      icon: FiHome,
      route: "/",
    },
    {
      title: "Staff",
      icon: FiUser,
      route: "/staff",
    },
    {
      title: "Customers",
      icon: FiBriefcase,
      route: "/customers",
    },
  ];

  return (
    <Flex
      background="white"
      pos="relative"
      h="100vh"
      w={isCollapsed ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={isCollapsed ? "center" : "flex-start"}
        as="nav"
      >
        <Image
          src="/images/logo.svg"
          height={10}
          width={isCollapsed ? 55 : 80}
          left="0"
          right="0"
          ml="auto"
          mr="auto"
          marginTop="15px"
          marginBottom="10px"
          alt="1011010"
        />

        <IconButton
          aria-label={null}
          background="none"
          mt="5px"
          left="0"
          right="0"
          ml="auto"
          mr="auto"
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            trackCollapse();
            setIsCollapsed(!isCollapsed);
          }}
        />
        <Flex height="100%" marginLeft="auto" marginRight="auto">
          <SidebarItems isCollapsed={isCollapsed} navItems={sideBarItems} />
        </Flex>
      </Flex>

      <Flex
        flexDir="column"
        w="100%"
        alignItems={isCollapsed ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={isCollapsed ? "none" : "flex"} mb="10px" />
        <Avatar size="md" left="0" right="0" ml="auto" mr="auto" src="" />
        <Box display="block" margin="0 auto" mt="3" textAlign="center">
          <Flex flexDirection="column" align="center" justifyContent="center">
            <Heading as="h4" size="sm">
              {user?.firstName} {user?.lastName}
            </Heading>
            <Text color="gray" textAlign="center">
              {user.role}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
