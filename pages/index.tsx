import React from "react";
import { Fade, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useMe } from "../lib/hooks";

// This is the home screen body content
const Home = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useMe();

  const getGreeting = () => {
    const myDate = new Date();
    const hours = myDate.getHours();
    let greeting = "Welcome";
    if (hours < 12) {
      greeting = "Good Morning";
      return greeting;
    } else if (hours >= 12 && hours <= 17) {
      greeting = "Good Afternoon";
      return greeting;
    } else if (hours >= 17 && hours <= 24) {
      greeting = "Good Evening";
      return greeting;
    }
  };

  return (
    <Flex width="100%" height="100%">
      <Flex justifyContent="center" alignItems="center" width="100%">
        <Fade in={!isOpen}>
          <Flex
            marginTop="-250px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg="#FFFFFFE6"
            gap="30px"
            padding="50px 65px 50px 65px"
            border="1px solid white"
            borderRadius="6px"
            boxShadow="5px 5px 5px #FFFFFF4D"
          >
            <Image src="./images/logo.svg" alt="site logo" height="160px" />
            <Text fontFamily="14px">
              {`${getGreeting()} ${user.firstName}`}
            </Text>
          </Flex>
        </Fade>
      </Flex>
    </Flex>
  );
};

Home.homePage = true;

export default Home;
