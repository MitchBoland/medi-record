/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Prescription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Pharmacy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customerId]` on the table `Prescription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_doctorId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pharmacy" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "doctorId";

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_email_key" ON "Pharmacy"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prescription_customerId_key" ON "Prescription"("customerId");
