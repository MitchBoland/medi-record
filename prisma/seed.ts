import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const run = async () => {
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
