import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { customerData } from "./customerData";

const prisma = new PrismaClient();

const run = async () => {
  // seeding the fake customer data
  await Promise.all(
    customerData.map(async (customer, index) => {
      const customerAccount = await prisma.customer.upsert({
        where: { email: customer.email },
        update: {},
        create: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          address: customer.address,
          phoneNumber: customer.phoneNumber,
          preferredContactMethod: customer.preferredContactMethod,
          prescription: {
            create: {
              totalRefills: 5,
              refillsRemaining: 5,
              lastRefillDate: new Date(),
              nextRefillDate: new Date(),
              refillFrequency: 30,
              product: {
                create: {
                  name: `Random Product ${index}`,
                }
              }
            },
          },
        },
      });

      return customerAccount;
    })
  );

  const salt = bcrypt.genSaltSync();
  await prisma.user.upsert({
    where: { email: "mitch@test.com" },
    update: {},
    create: {
      email: "mitch@test.com",
      password: bcrypt.hashSync("Password123!", salt),
      role: "god",
      firstName: "Mitch",
      lastName: "CoolKid",
      store: "Brisbane Store",
    },
  });
};

run()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
