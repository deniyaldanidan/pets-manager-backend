/*
  Warnings:

  - A unique constraint covering the columns `[petId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `petId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "petId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pet_petId_key" ON "Pet"("petId");
