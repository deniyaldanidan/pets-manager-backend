/*
  Warnings:

  - You are about to drop the column `petId` on the `Pet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Pet_petId_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "petId";
