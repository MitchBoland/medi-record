import React, { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
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
            Log in
          </Button>
        </Box>
        <Box width="100%">
          <Button
            color="#5643fa"
            size="md"
            width="100%"
            variant="link"
            onClick={handleRegisterAccount}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};
