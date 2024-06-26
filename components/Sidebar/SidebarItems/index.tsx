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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexDirection="column" width="100%" marginTop="12px">
      <List spacing={5}>
        {navItems.map(({ title, icon, route }) => (
          <ListItem fontSize={isCollapsed ? "22px" : "18px"} key={title}>
            <LinkBox pt="12px">
              <NextLink href={route} passHref>
                <Flex
                  alignItems="center"
                  justifyContent={isCollapsed ? "center" : "flex-start"}
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
    </Flex>
  );
};
