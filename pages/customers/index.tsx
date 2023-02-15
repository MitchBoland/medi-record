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
    setMatchingCustomers([]);
    const validateName = setTimeout(async () => {
      if (!name || name.length < 4) return;
      const matchingCustomerData = await searchCustomers({ name });
      setMatchingCustomers(matchingCustomerData.customers);
    }, 1000);
    // destroy instance of useEffect hook with return
    return () => clearTimeout(validateName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const [selectedAccount, setSelectedAccount] = useState<any>({});

  useEffect(() => {
    if (selectedAccount?.firstName) {
      console.log("selected is ", selectedAccount);
    }
  }, [selectedAccount]);

  return (
    <PageContent>
      <Card
        backgroundColor="white"
        borderTop="5px solid"
        borderTopColor="brand.800"
        width="100%"
        padding="24px"
        maxWidth="800px"
        marginLeft="auto"
        marginRight="auto"
      >
        <Flex flexDirection="column">
          <Heading size="lg">Customer Lookup</Heading>
          <Flex
            width="500px"
            maxWidth="calc(100% - 24px)"
            paddingTop="24px"
            justifyContent="center"
            alignItems="center"
            marginLeft="auto"
            marginRight="auto"
            flexDirection="column"
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

            {matchingCustomers.length > 0 && (
              <Card
                width="100%"
                borderTopRightRadius="0"
                borderTopLeftRadius="0"
              >
                <Flex flexDirection="column">
                  {matchingCustomers.map(
                    ({ uuid, firstName, lastName, address, phone }, index) => (
                      <Flex
                        key={uuid}
                        py="6px"
                        borderBottom={
                          index < matchingCustomers.length - 1 &&
                          "1px solid gray"
                        }
                        flexDirection="column"
                        padding="12px"
                        _hover={{
                          bg: "blue.500",
                          color: " white",
                          cursor: "pointer",
                        }}
                        _active={{
                          bg: "blue.200",
                          color: " white",
                          cursor: "pointer",
                        }}
                        _focus={{ boxShadow: "outline" }}
                        onClick={() => {
                          setSelectedAccount(matchingCustomers[index]);
                        }}
                      >
                        <Text>{`${firstName} ${lastName}`}</Text>
                        <Flex justifyContent="space-between">
                          <Text>{address}</Text>
                          <Text>{phone}</Text>
                        </Flex>
                      </Flex>
                    )
                  )}
                </Flex>
              </Card>
            )}
          </Flex>
        </Flex>
      </Card>
      <CustomerCard />
    </PageContent>
  );
};

export default CustomerList;
