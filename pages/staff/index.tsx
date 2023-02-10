import React from "react";
import { Flex, Heading, Card } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import { PageContent } from "../../components/BaseLayout/PageContent";

const StaffList = ({ users }) => {
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
          Staff Refords
        </Heading>
        <Card backgroundColor="white" width="100%" padding="24px">
          <ul>
            {users.map((user) => (
              <li key={`${user.firstName}-${user.lastName}`}>
                hello {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        </Card>
      </Flex>
    </PageContent>
  );
};

export const getServerSideProps = async ({ req }) => {
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

export default StaffList;
