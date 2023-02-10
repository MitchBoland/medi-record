import React, { FC, useCallback, useState } from "react";
import {
  Button,
  Flex,
  Text,
  List,
  LinkBox,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { SidebarRoutes } from "../../types/types";
import { signout } from "../../../lib/mutations";

type props = {
  navItems: SidebarRoutes[];
  isCollapsed: boolean;
};

export const SidebarItems: FC<props> = ({ navItems, isCollapsed }) => {
  const router = useRouter();

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const handleLogOutEvent = useCallback(async () => {
    setIsLogoutLoading(true);
    await signout();
    setIsLogoutLoading(false);
    router.push("/signin");
  }, [router]);

  return (
    <Flex flexDirection="column" width="100%" marginTop="24px">
      <List spacing={5}>
        {navItems.map(({ title, icon, route }) => (
          <ListItem fontSize={isCollapsed ? "24px" : "20px"} key={title}>
            <LinkBox>
              <NextLink href={route} passHref>
                <Flex
                  alignItems="center"
                  justifyContent={isCollapsed ? "flex-start" : "center"}
                >
                  <ListIcon as={icon} marginRight="0px" />
                  {!isCollapsed && <Text marginLeft="12px">{title}</Text>}
                </Flex>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
      </List>
      <Flex marginTop="48px">
        {isCollapsed ? (
          <></>
        ) : (
          <Button
            colorScheme="blue"
            isLoading={isLogoutLoading}
            onClick={handleLogOutEvent}
            width="100%"
            leftIcon={<FiLogOut />}
          >
            Log Out
          </Button>
        )}
      </Flex>

      {/* <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        marginY="24px"
      >
        
      </Flex> */}
    </Flex>
  );
};
