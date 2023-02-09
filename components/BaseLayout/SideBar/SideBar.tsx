import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { signout } from "../../../lib/mutations";
import { useMe } from "../../../lib/hooks";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Image,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiUser,
  FiBriefcase,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import NavItem from "../NavItem/NavItem";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("small");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useMe();
  const router = useRouter();

  const handleLogOutEvent = useCallback(async () => {
    setIsLoading(true);
    await signout();
    setIsLoading(false);
    router.push("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openStaffList = () => {
    router.push("/stafflist");
  };

  return (
    <Flex
      background="white"
      pos="relative"
      h="100vh"
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      zIndex="999"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Image
          src="/images/logo.svg"
          height={10}
          width={10}
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
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <NavItem navSize={navSize} icon={FiHome} title="Dashboard" />
        <NavItem
          navSize={navSize}
          icon={FiUser}
          title="Staff"
          clickFunction={() => {
            router.push("/stafflist");
          }}
        />
        <NavItem navSize={navSize} icon={FiUser} title="Clients" />
        <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
        <NavItem navSize={navSize} icon={FiSettings} title="Settings" />

        <NavItem
          navSize={navSize}
          icon={FiLogOut}
          title="Log Out"
          clickFunction={openStaffList}
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} mb="10px" />
        <Avatar size="md" left="0" right="0" ml="auto" mr="auto" src="" />
        <Flex mt={4} align="center">
          <Flex
            flexDir="column"
            ml="1.8vw"
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h4" size="sm">
              {user.firstName} {user.lastName}
            </Heading>
            <Text color="gray" textAlign="center">
              Role
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
