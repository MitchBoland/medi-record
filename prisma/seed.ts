import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { customerData } from "./customerData";
import { userData } from "./userData";

const prisma = new PrismaClient();

const run = async () => {
  // seeding the fake customer data
  await Promise.all(
    customerData.map(async (customer, index) => {
      return prisma.customer.upsert({
        where: { email: customer.email },
        update: {},
        create: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          address: customer.address,
          comments: customer?.comments,
          phone: customer?.phone,
          prescriptions: {
            create: {
              totalRefills: index,
              refillsRemaining: index,
              refillFrequency: 30,
              lastRefillDate: new Date(),
              nextRefillDate: new Date(),
              products: {
                create: {
                  name: `celebrate ${index}`,
                  description: `description for ${index}`,
                },
              },
            },
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  await Promise.all(
    userData.map(
      async ({
        email,
        password,
        userDetails: {
          firstName,
          lastName,
          store,
          phone,
          department,
          homeAddress,
          emergencyContactPrimary,
          emergencyContactSecondary,
        },
      }) => {
        return prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            password: bcrypt.hashSync(password, salt),
            userDetails: {
              create: {
                firstName,
                lastName,
                store,
                phone,
                department,
                homeAddress,
                emergencyContactPrimary,
                emergencyContactSecondary,
              },
            },
          },
        });
      }
    )
  );

  await prisma.user.upsert({
    where: { email: "mitch@test.com" },
    update: {},
    create: {
      email: "mitch@test.com",
      password: bcrypt.hashSync("Password123!", salt),
      userDetails: {
        create: {
          firstName: "mitch",
          lastName: "boland",
          store: "alexandra hills",
          phone: "61455215211",
          department: "pharmacy",
          homeAddress: "123 fake street",
          emergencyContactPrimary: "Greg Johnston 0455215222",
          emergencyContactSecondary: "Fred Macklemore 0488596552",
        },
      },
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
