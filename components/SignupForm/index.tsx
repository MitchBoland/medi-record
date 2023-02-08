import React, { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signupAuth } from "../../lib/mutations";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await signupAuth({ firstName, lastName, email, password });
    router.push("/");
    setIsLoading(false);
  };

  const handleSigninAccount = () => {
    router.push("/signin");
  };

  return (
    <Box>
      <Text
        color="gray.800"
        // textAlign="center"
        mb="24px"
        fontSize="1xl"
        fontWeight="500"
      >
        Enter your details below to register with Cyndi Stock.
      </Text>
      <form onSubmit={handleSubmit}>
        <Box paddingBottom="24px">
          <Text color="gray.800" fontWeight="600">
            First Name
          </Text>
          <Input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            borderColor="gray.900"
            color="gray.900"
          />
        </Box>
        <Box paddingBottom="24px">
          <Text color="gray.800" fontWeight="600">
            Family Name
          </Text>
          <Input
            placeholder="Family Name"
            onChange={(e) => setLastName(e.target.value)}
            borderColor="gray.900"
            color="gray.900"
          />
        </Box>
        <Box paddingBottom="24px">
          <Text color="gray.800" fontWeight="600">
            Email
          </Text>
          <Input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            borderColor="gray.900"
            color="gray.900"
          />
        </Box>
        <Box paddingBottom="24px">
          <Text color="gray.800" fontWeight="600">
            Password
          </Text>
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            borderColor="gray.900"
            color="gray.900"
          />
        </Box>
        <Box width="100%" paddingBottom="24px">
          <Button
            type="submit"
            bg="#5643fa"
            isLoading={isLoading}
            size="md"
            width="100%"
            sx={{
              "&:hover": {
                bg: " #2998ff",
              },
            }}
          >
            Sign up
          </Button>
        </Box>
        <Box width="100%">
          <Button
            color="#5643fa"
            size="md"
            width="100%"
            variant="link"
            onClick={handleSigninAccount}
          >
            Already Registered?
          </Button>
        </Box>
      </form>
    </Box>
  );
};
