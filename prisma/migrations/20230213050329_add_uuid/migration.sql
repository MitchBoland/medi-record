/*
  Warnings:

  - The required column `uuid` was added to the `Customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uuid" TEXT NOT NULL;