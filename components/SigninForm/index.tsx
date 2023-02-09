import React, { useState } from "react";
import { Box, Input, Button, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signinAuth } from "../../lib/mutations";

export const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signinAuth({ email, password });
    router.push("/");
    setIsLoading(false);
  };

  const handleRegisterAccount = () => {
    router.push("/signup");
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
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

        <Flex
          width="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button type="submit" variant="submit" isLoading={isLoading}>
            Log in
          </Button>

          <Button variant="submit" onClick={handleRegisterAccount}>
            Register
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
