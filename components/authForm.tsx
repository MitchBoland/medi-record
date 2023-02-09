import React, { FC } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { SigninForm } from "./SigninForm";
import { SignupForm } from "./SignupForm";
import BackgroundImage from "./BackgroundImage/BackgroundImage";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const isSigninForm = mode === "signin";

  const formImage = () => (
    <Flex
      justify="center"
      align="center"
      flexDirection="row"
      marginTop="-24px"
      marginBottom="24px"
    >
      <Image
        src="./images/logo.svg"
        alt="site logo"
        width="80px"
        height="80px"
      />
    </Flex>
  );

  return (
    <Flex
      width="100vw"
      color="white"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <BackgroundImage image="/images/loginBackground.jpg" />
      <Flex
        justify="center"
        align="center"
        marginTop="24px"
        marginBottom="24px"
      >
        <Box
          padding="50px"
          bg="white"
          zIndex="1"
          borderRadius="6px"
          width="400px"
          maxWidth="calc(100vw - 48px)"
          borderTop=" 8px solid"
          borderColor="brand.800"
          boxShadow="0px 3px 9px rgba(0, 0, 0, 0.4)"
        >
          {formImage()}
          {isSigninForm ? <SigninForm /> : <SignupForm />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthForm;
