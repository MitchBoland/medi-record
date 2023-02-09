import React, { useState, useEffect, useCallback } from "react";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";

import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Icon,
  Button,
} from "@chakra-ui/react";

export default function StaffList({ users }) {
  const [staffList, setStaffList] = useState(null);

  return (
    <Box
      backgroundColor="white"
      maxWidth="max-content"
      maxHeight="max-content"
      borderRadius="6px"
      boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"
      padding="1.25rem"
      textAlign="center"
    >
      Staff
    </Box>
  );
}

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.MEDI_RECORD_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  if (!user) {
    // no stock name, redirect back to home route
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const users = await prisma.user.findMany({
    select: { firstName: true, lastName: true, store: true, email: true },
  });

  return {
    props: { users },
  };
};
