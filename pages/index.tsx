import React, { useCallback, useState } from "react";
import { Button, Flex, Heading, SlideFade } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signout } from "../lib/mutations";
import { PageContent } from "../components/BaseLayout/PageContent";

// This is the home screen body content
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogOutEvent = useCallback(async () => {
    setIsLoading(true);
    await signout();
    setIsLoading(false);
    router.push("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContent>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Heading
          as="h1"
          size="2xl"
          noOfLines={2}
          textAlign="center"
          padding="24px"
          bg="white"
          borderRadius="20px"
        >
          Welcome to Medi Records
        </Heading>
        <SlideFade offsetY="50px" in>
          <Flex
            marginLeft="auto"
            marginRight="auto"
            justifyContent="center"
            alignItems="center"
            padding="24px"
          >
            <Button
              variant="submit"
              isLoading={isLoading}
              onClick={handleLogOutEvent}
            >
              Log Out
            </Button>
          </Flex>
        </SlideFade>
      </Flex>
    </PageContent>
  );
};

Home.homePage = true;

export default Home;
