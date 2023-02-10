import React, { useState, useEffect } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMe } from "../lib/hooks";

// This is the home screen body content
const Home = () => {
  const [greeting, setGreeting] = useState("Welcome");
  const { user } = useMe();

  const getGreeting = async () => {
    var myDate = new Date();
    var hours = myDate.getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours <= 17) {
      setGreeting("Good Afternoon");
    } else if (hours >= 17 && hours <= 24) {
      setGreeting("Good Evening");
    }
  };

  useEffect(() => {
    getGreeting();
  }, [greeting]);

  return (
    <Flex width="100%" height="100%">
      <Flex justifyContent="center" alignItems="center" width="100%">
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
            {greeting} {user.firstName}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

Home.homePage = true;

export default Home;
