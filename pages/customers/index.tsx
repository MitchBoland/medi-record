import React from "react";
import { Flex, Heading, Card } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import { PageContent } from "../../components/BaseLayout/PageContent";

const CustomerList = ({ customers }) => {
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
          customer Records
        </Heading>

        <Card backgroundColor="white" width="100%" padding="24px">
          <ul>
            {customers.map((customer) => (
              <li key={`${customer.firstName}-${customer.lastName}`}>
                hello {customer.firstName} {customer.lastName}
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
    // No user, so return home
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const customers = await prisma.customer.findMany({
    select: {
      firstName: true,
      lastName: true,
      email: true,
      prescriptions: true,
      phone: true,
      comments: true,
    },
  });

  return {
    props: { customers },
  };
};

export default CustomerList;
