import React, { useState, useEffect } from "react";
import { Flex, Heading, Card, Input, Text } from "@chakra-ui/react";
import { PageContent } from "../../components/BaseLayout/PageContent";
import { CustomerCard } from "../../components/CustomerCard";
import { searchCustomers } from "../../lib/mutations";

const CustomerList = () => {
  const [name, setName] = useState("");
  const [matchingCustomers, setMatchingCustomers] = useState([]);

  useEffect(() => {
    /**
     * We only want to validate 1 second after user finishes typing for performance improvement
     */
    const validateName = setTimeout(async () => {
      if (!name || name.length < 4) return;
      const matchingCustomerData = await searchCustomers({ name });
      setMatchingCustomers(matchingCustomerData.customers);
    }, 1000);
    // destroy instance of useEffect hook with return
    return () => clearTimeout(validateName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {}, [matchingCustomers]);

  return (
    <PageContent>
      <Card
        backgroundColor="white"
        borderTop="5px solid"
        borderTopColor="brand.800"
        width="100%"
        padding="24px"
      >
        <Flex flexDirection="column">
          <Heading size="lg">Customer Lookup</Heading>
          <Flex
            width="500px"
            paddingTop="24px"
            justifyContent="center"
            alignItems="center"
            marginLeft="auto"
            marginRight="auto"
          >
            <Flex flexDirection="column" width="100%">
              <Text color="gray.800" fontWeight="600">
                Customer Name
              </Text>
              <Input
                placeholder="email"
                type="email"
                onChange={(e) => setName(e.target.value)}
                borderColor="gray.900"
                color="gray.900"
              />
            </Flex>
          </Flex>
          {matchingCustomers.length > 0 && (
            <ul>
              {matchingCustomers.map(({ uuid, firstName, lastName }) => (
                <li key={uuid}>{`hello ${firstName} ${lastName} ${uuid}`}</li>
              ))}
            </ul>
          )}
        </Flex>
      </Card>
      <CustomerCard />
    </PageContent>
  );
};

export default CustomerList;
